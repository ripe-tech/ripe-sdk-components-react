import React, { Component } from "react";
import PropTypes from "prop-types";
import { Ripe } from "ripe-sdk";

export class RipePickers extends Component {
    static get propTypes() {
        return {
            /**
             * An initialized RIPE instance form the RIPE SDK, if not defined,
             * a new SDK instance will be initialized.
             */
            ripe: PropTypes.object,
            /**
             * Callback when a part of the model in the configurator is highlighted,
             * normally with a mouse hover of by changing the prop. Only functional
             * when masks are enabled.
             */
            onUpdateHighlightedPart: PropTypes.func,
            /**
             * Callback when parts of the model are changed, meaning that a new
             * customization was made.
             */
            onUpdateParts: PropTypes.func,
            /**
             * Callback when the configurator is loading.
             */
            onLoading: PropTypes.func,
            /**
             * Callback when the configurator has finished loading,
             * when it is possible to visualize it or when an error occurred.
             */
            onLoaded: PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            ripe: null,
            onUpdateHighlightedPart: part => {},
            onUpdateParts: parts => {},
            onLoading: () => {},
            onLoaded: () => {}
        };
    }

    constructor(props) {
        super(props);

        this.state = {
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
            selectedColor: null,
            /**
             * Model's customization options, which contains parts, materials
             * and colors.
             */
            options: {},
            /**
             * Flag that controls if the initial loading process for
             * the price is still running.
             */
            loading: true,
            /**
             * Ripe SDK instance, which can be later initialized
             * if the given prop is not defined.
             */
            ripeData: this.props.ripe
        };
    }

    async componentDidMount() {
        this.props.onLoading();

        await this._setupRipe();

        this.state.ripeData.bind("pre_config", () => {
            this.setState(
                {
                    loading: true,
                    selectedPart: null,
                    selectedMaterial: null,
                    selectedColor: null
                },
                () => {
                    this.props.onLoading();
                }
            );
        });

        this.state.ripeData.bind("post_config", () => {
            this.setState(
                {
                    loading: false,
                    options: this._filteredOptions()
                },
                () => {
                    this.props.onLoaded();
                }
            );
        });
    }

    /**
     * Initializes RIPE instance if it does not exists and
     * configures it with the given brand, model, version
     * and parts. If a RIPE instance is provided, it will
     * be used without further configuration.
     */
    async _setupRipe() {
        if (!this.state.ripeData) {
            this.setState(
                { ripeData: new Ripe() },
                async () => await this.state.ripeData.isReady()
            );
        } else {
            await this.state.ripeData.isReady();
        }

        this.setState({ loading: false, options: this._filteredOptions() }, () =>
            this.props.onLoaded()
        );

        if (global.ripe) return;
        global.ripe = this.state.ripeData;
    }

    _filteredOptions() {
        const choices = {};

        for (const [part, partValue] of Object.entries(this.state.ripeData.choices)) {
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
        this.setState({ selectedPart: value, selectedMaterial: null, selectedColor: null }, () =>
            this.props.onUpdateHighlightedPart(value)
        );
    }

    _onSelectMaterialChange(value) {
        this.setState({ selectedMaterial: value });
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

        this.props.onUpdateParts(this.state.ripeData.options.parts);
        this.setState({
            selectedPart: null,
            selectedMaterial: null,
            selectedColor: null
        });
    }

    render() {
        return (
            <div className="ripe-pickers">
                <select
                    value={this.state.selectedPart ? this.state.selectedPart : ""}
                    onChange={event => this._onSelectPartChange(event.target.value)}
                >
                    <option value="" disabled>
                        Parts
                    </option>
                    {Object.keys(this.state.options).map((part, index) => (
                        <option value={part} key={`part-${index}`}>
                            {this._normalize(part)}
                        </option>
                    ))}
                </select>
                <select
                    value={this.state.selectedMaterial ? this.state.selectedMaterial : ""}
                    onChange={event => this._onSelectMaterialChange(event.target.value)}
                >
                    <option value="" disabled>
                        Materials
                    </option>
                    {this.state.selectedPart &&
                        Object.keys(this.state.options[this.state.selectedPart]).map(material => (
                            <option value={material} key={material}>
                                {this._normalize(material)}
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
                        this.state.options[this.state.selectedPart][
                            this.state.selectedMaterial
                        ].map(color => (
                            <option value={color} key={color}>
                                {this._normalize(color)}
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
