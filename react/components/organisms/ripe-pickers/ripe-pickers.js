import React, { Component } from "react";
import PropTypes from "prop-types";
import { mix } from "yonius";

import { LogicMixin } from "../../../mixins";

export class RipePickers extends mix(Component).with(LogicMixin) {
    static get propTypes() {
        return {
            ...this._propTypes,
            /**
             * Callback when a part of the model in the configurator is highlighted,
             * normally with a mouse hover of by changing the prop. Only functional
             * when masks are enabled.
             */
            onUpdateHighlightedPart: PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            ...this._defaultProps,
            onUpdateHighlightedPart: part => {}
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            /**
             * RIPE instance, which can be later initialized
             * if the given prop is not defined.
             */
            ripeData: props.ripe,
            /**
             * Brand to be used for the internal sync operation.
             */
            brandData: props.brand,
            /**
             * Model to be used for the internal sync operation.
             */
            modelData: props.model,
            /**
             * 3DB version to be used for the internal sync operation.
             */
            versionData: props.version,
            /**
             * Currency to be used for the internal sync operation.
             */
            currencyData: props.currency,
            /**
             * Reflects whether this component should apply
             * configuration changes to the associated RIPE SDK.
             */
            configData: props.config,
            /**
             * Parts of the model to be used for the internal sync
             * operation.
             */
            partsData: props.parts,
            /**
             * Initials to be used for the internal sync operation.
             */
            initialsData: props.initials,
            /**
             * Engraving to be used for the internal sync operation.
             */
            engravingData: props.engraving,
            /**
             * Initials extra to be used for the internal sync operation.
             */
            initialsExtraData: props.initialsExtra,
            /**
             * Structure to be used for the internal sync operation.
             */
            structureData: props.structure,
            /**
             * Flag that controls if the initial loading process for
             * the configurator is still running.
             */
            loading: true,
            /**
             * Flag that controls if the configuring process is
             * still running.
             */
            configuring: false,
            /**
             * The object containing the complete set of part names
             * associated with their current availability and available
             * materials (which in turn should have the equivalent relation
             * with the colors).
             */
            choices: {},
            /**
             * Part of the model currently selected in the dropdown and
             * highlighted in a possible existing configurator.
             */
            selectedPart: null,
            /**
             * Material selected for the currently selected part of the model.
             */
            selectedMaterial: null,
            /**
             * Color selected for the currently selected part and of the model.
             */
            selectedColor: null
        };
    }

    async componentDidMount() {
        this.props.onLoading();

        await this.setupRipe();

        console.log("pickers", this.props.ripe.brand);
        console.log("pickers state", this.state.ripeData.brand);

        this.onChoices = this.state.ripeData.bind("choices", choices => {
            this.setState({ choices: choices });
        });

        this.onPreConfig = this.state.ripeData.bind("pre_config", () => {
            // reset the current selection state
            // every time the config changes
            this.setState({
                selectedPart: null,
                selectedMaterial: null,
                selectedColor: null
            });
        });

        this.setState({ choices: this.state.ripeData.choices }, () => {
            this.props.onLoaded();
            console.log(this.state.ripeData.choices);
        });
    }

    async componentDidUpdate(prevProps) {
        this._componentDidUpdate(prevProps);
    }

    async componentWillUnmount() {
        if (this.onPreConfig) this.state.ripeData.unbind("pre_config", this.onPreConfigEvent);
        if (this.onChoices) this.state.ripeData.unbind("choices", this.onChoices);
    }

    _filteredOptions() {
        const choices = {};

        for (const [part, partValue] of Object.entries(this.state.choices || {})) {
            if (!partValue.available) continue;

            const materials = {};

            for (const [material, materialValue] of Object.entries(partValue.materials)) {
                if (!materialValue.available) continue;

                const colors = [];

                for (const [color, colorValue] of Object.entries(materialValue.colors)) {
                    if (!colorValue.available) continue;
                    colors.push(color);
                }

                if (Object.keys(colors).length === 0) continue;
                materials[material] = colors;
            }

            if (Object.keys(materials).length === 0) continue;
            choices[part] = materials;
        }
        return choices;
    }

    _partsOptions() {
        return Object.keys(this._filteredOptions()).map(part => ({
            label: this._normalize(part),
            value: part
        }));
    }

    _materialOptions() {
        if (!this.state.selectedPart) return [];

        return Object.keys(this._filteredOptions()[this.state.selectedPart]).map(material => ({
            label: this._normalize(material),
            value: material
        }));
    }

    _colorOptions() {
        if (!this.state.selectedMaterial) return [];

        return this._filteredOptions()[this.state.selectedPart][this.state.selectedMaterial].map(
            color => ({
                label: this._normalize(color),
                value: color
            })
        );
    }

    _normalize(value) {
        return value
            .split("_")
            .map(v => v[0].toUpperCase() + v.slice(1))
            .join(" ");
    }

    _isConfigurationIncomplete() {
        return (
            !this.state.selectedPart || !this.state.selectedMaterial || !this.state.selectedColor
        );
    }

    _onSelectPartChange(value) {
        if (!value) return;

        const materialOptions = this._materialOptions();
        const selectedMaterial = materialOptions.length === 1 ? materialOptions[0].value : null;
        this.setState(
            { selectedPart: value, selectedMaterial: selectedMaterial, selectedColor: null },
            () => this.props.onUpdateHighlightedPart(value)
        );
    }

    _onSelectMaterialChange(value) {
        if (!value) return;

        const colorOptions = this._colorOptions();
        const selectedColor = colorOptions.length === 1 ? colorOptions[0].value : null;
        this.setState({ selectedMaterial: value, selectedColor: selectedColor });
    }

    _onSelectColorChange(value) {
        this.setState({ selectedColor: value });
    }

    async _onConfirmCustomization() {
        if (this._isConfigurationIncomplete()) return;

        await this.state.ripeData.setPart(
            this.state.selectedPart,
            this.state.selectedMaterial,
            this.state.selectedColor
        );

        this.setState({
            selectedPart: null,
            selectedMaterial: null,
            selectedColor: null
        });
    }

    render() {
        return (
            <div className="ripe-pickers">
                {this._partsOptions().length > 0 && (
                    <select
                        value={this.state.selectedPart ? this.state.selectedPart : ""}
                        onChange={event => this._onSelectPartChange(event.target.value)}
                    >
                        <option value="" disabled>
                            Parts
                        </option>
                        {this._partsOptions().map((part, index) => (
                            <option value={part.value} key={`part-${index}`}>
                                {part.label}
                            </option>
                        ))}
                    </select>
                )}
                <select
                    value={this.state.selectedMaterial ? this.state.selectedMaterial : ""}
                    onChange={event => this._onSelectMaterialChange(event.target.value)}
                >
                    <option value="" disabled>
                        Materials
                    </option>
                    {this.state.selectedPart &&
                        this._materialOptions().map((material, index) => (
                            <option value={material.value} key={`material-${index}`}>
                                {material.label}
                            </option>
                        ))}
                </select>
                <select
                    value={this.state.selectedColor ? this.state.selectedColor : ""}
                    onChange={event => this._onSelectColorChange(event.target.value)}
                >
                    <option value="" disabled>
                        Colors
                    </option>
                    {this.state.selectedMaterial &&
                        this._colorOptions().map((color, index) => (
                            <option value={color.value} key={`color-${index}`}>
                                {color.label}
                            </option>
                        ))}
                </select>
                <button
                    disabled={this._isConfigurationIncomplete()}
                    onClick={() => this._onConfirmCustomization()}
                >
                    Confirm
                </button>
            </div>
        );
    }
}

export default RipePickers;
