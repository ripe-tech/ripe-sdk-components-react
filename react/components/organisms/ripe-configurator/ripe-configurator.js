import React, { Component } from "react";
import PropTypes from "prop-types";
import { ripe } from "ripe-sdk";
import { mix } from "yonius";

import { LogicMixin } from "../../../mixins";
import { Loader } from "../../atoms";

import "ripe-sdk/src/css/ripe.css";
import "./ripe-configurator.css";

export class RipeConfigurator extends mix(Component).with(LogicMixin) {
    static get propTypes() {
        return {
            ...this._propTypes,
            /**
             * The name of the frame to be shown in the configurator using
             * the normalized frame format (eg: side-1).
             */
            frame: PropTypes.string,
            /**
             * The size (in pixels) of the configurator.
             */
            size: PropTypes.number,
            /**
             * If the loader indicator should be shown whenever a configurator
             * related loading operation is being performed.
             */
            loader: PropTypes.bool,
            /**
             * Part of the model that is currently selected (eg: side).
             */
            selectedPart: PropTypes.string,
            /**
             * Part of the model that is currently highlighted (eg:side).
             * Only possible if the usage of masks is enabled.
             */
            highlightedPart: PropTypes.string,
            /**
             * Configurator rotation sensitivity to the user mouse drag
             * action. The bigger the number, more sensible it is.
             */
            sensitivity: PropTypes.number,
            /**
             * Usage of masks in the current model, necessary for
             * the part highlighting action.
             */
            useMasks: PropTypes.bool,
            /**
             * The duration in milliseconds that the configurator frame
             * transition should take.
             */
            duration: PropTypes.number,
            /**
             * The configurator animation style: 'simple' (fade in),
             * 'cross' (crossfade) or 'null'.
             */
            animation: PropTypes.string,
            /**
             * The format of the configurator image, (eg: png, jpg, svg, etc.).
             */
            format: PropTypes.string,
            /**
             * Callback called when the frame in the configurator is changed,
             * both by the user dragging the configurator or when a new
             * frame prop is provided.
             */
            onUpdateFrame: PropTypes.func,
            /**
             * Callback when a part of the model in the configurator is selected.
             */
            onUpdateSelectedPart: PropTypes.func,
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
            frame: null,
            size: null,
            loader: true,
            selectedPart: null,
            highlightedPart: null,
            sensitivity: null,
            useMasks: true,
            duration: null,
            animation: null,
            format: null,
            onUpdateFrame: frame => {},
            onUpdateSelectedPart: part => {},
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
             * The frame that is currently being shown in the
             * configurator.
             */
            frameData: props.frame,
            /**
             * Part of the model that is currently selected.
             */
            selectedPartData: props.selectedPart,
            /**
             * Part of the model that is currently highlighted.
             */
            highlightedPartData: props.highlightedPart
        };
    }

    async componentDidMount() {
        this.props.onLoading();

        await this.setupRipe();

        this.configurator = this.state.ripeData.bindConfigurator(this.configuratorRef, {
            view: this.state.frameData ? this.state.frameData.split("-")[0] : null,
            position: this.state.frameData ? this.state.frameData.split("-")[1] : null,
            duration: this.props.duration,
            animation: this.props.animation,
            useMasks: this.props.useMasks,
            sensitivity: this.props.sensitivity
        });

        this.onPreConfigEvent = this.state.ripeData.bind("pre_config", () => {
            this.setState({ loading: true }, () => this.props.onLoading());
        });

        this.state.ripeData.bind("selected_part", part => {
            if (this.state.selectedPartData === part) return;
            this.setState({ selectedPartData: part }, () => this.props.onUpdateSelectedPart(part));
        });

        this.configurator.bind("changed_frame", frame => {
            this.setState({ frameData: frame }, () => this.props.onUpdateFrame(frame));
        });

        this.configurator.bind("loaded", () => {
            const frame = `${this.configurator.view}-${this.configurator.position}`;

            this.setState({ frameData: frame, loading: false }, () => {
                this.props.onUpdateFrame(frame);
                this.props.onLoaded();
            });
        });

        this.configurator.bind("not_loaded", () => {
            this.setState({ loading: false }, () => this.props.onLoaded());
        });

        this.configurator.bind("highlighted_part", part => {
            if (this.state.highlightedPartData === part) return;
            this.setState({ highlightedPartData: part }, () =>
                this.props.onUpdateHighlightedPart(part)
            );
        });

        this._resize(this.props.size);
    }

    async componentDidUpdate(prevProps) {
        await this._componentDidUpdate(prevProps);

        if (prevProps.size !== this.props.size) {
            this._resize(this.props.size);
        }
        if (prevProps.frame !== this.props.frame) {
            this._changeFrame(this.props.frame, prevProps.frame);
        }
        if (prevProps.selectedPart !== this.props.selectedPart) {
            this.state.ripeData.selectPart(this.props.selectedPart);
        }
        if (prevProps.highlightedPart !== this.props.highlightedPart) {
            this._highlightPart(this.props.highlightedPart, prevProps.highlightedPart);
        }
        if (prevProps.useMasks !== this.props.useMasks) {
            this._updateUseMasks(this.props.useMasks);
        }
        await this._updateConfigurator(this.props, prevProps);
    }

    async componentWillUnmount() {
        if (this.configurator) await this.state.ripeData.unbindConfigurator(this.configurator);
        if (this.onPreConfigEvent && this.state.ripeData) {
            this.state.ripeData.unbind("pre_config", this.onPreConfigEvent);
        }
        this.configurator = null;
    }

    /**
     * Updates the configurator, showing the provided frame
     * with possible animation.
     *
     * @param {String} value The current frame.
     * @param {String} previous The previous frame.
     */
    async _changeFrame(value, previous) {
        // in case the configurator is not currently ready
        // then avoids the operation (returns control flow)
        if (!this.configurator || !this.configurator.ready) return;

        // extracts the view part of both the previous and the
        // current frame to be used for change view comparison
        const previousView = previous ? ripe.parseFrameKey(previous)[0] : "";
        const view = ripe.parseFrameKey(value)[0];

        // runs the frame changing operation (possible animation)
        // according to the newly changed frame value
        await this.configurator.changeFrame(value, {
            type: view === previousView ? false : this.props.animation,
            revolutionDuration: view === previousView ? this.props.duration : null,
            duration: this.props.duration
        });

        // only the visible instance of this component
        // should be sending events it's considered to
        // be the main/master one
        if (this._isElementDisplayed()) {
            this.props.onUpdateFrame(value);
        }
    }

    /**
     * Verifies if values changed an, if so, updates
     * the configurator with the given options.
     *
     * @param {Object} props Current props.
     * @param {Object} prevProps Previous props.
     */
    async _updateConfigurator(props, prevProps) {
        if (
            prevProps.sensitivity !== props.sensitivity ||
            prevProps.duration !== props.duration ||
            prevProps.animation !== props.animation ||
            prevProps.format !== props.format
        ) {
            await this.configurator.updateOptions({
                sensitivity: this.props.sensitivity,
                duration: this.props.duration,
                animation: this.props.animation,
                format: this.props.format
            });
        }
    }

    /**
     * Re-sizes the configurator according to the current
     * available container size (defined by parent).
     *
     * @param {*} size The configurator size (in pixels).
     */
    _resize(size) {
        if (!size || !this.configurator) return;
        this.configurator.resize(size);
    }

    /**
     * Removes the highlight of the previous part and
     * highlights the chosen part.
     *
     * @param {String} part The part to be highlighted.
     * @param {String} previousPart The part to be removed the highlight.
     */
    _highlightPart(part, previousPart) {
        this.configurator.lowlight(previousPart);
        this.configurator.highlight(part);
    }

    /**
     * Updates the masks activation with the given value.
     *
     * @param {Boolean} useMasks Value that represents the
     * activation or disabling of masks.
     */
    _updateUseMasks(useMasks) {
        if (!this.configurator) return;
        if (useMasks) this.configurator.enableMasks();
        else this.configurator.disableMasks();
    }

    _isElementDisplayed() {
        if (!this.configurator) return false;
        return getComputedStyle(this.configurator.element).display !== "none";
    }

    _loaderStyle() {
        return {
            top: this.props.size ? `${this.props.size / 2}px` : "calc(50%)"
        };
    }

    render() {
        return (
            <div className="ripe-configurator">
                {this.props.loader && this.state.loading && (
                    <div className="loader-container" style={this._loaderStyle()}>
                        <Loader className="loader" loader="ball-scale-multiple" />
                    </div>
                )}
                <div className={`configurator-wrapper ${this.loading ? "loading" : ""}`}>
                    <div className="config" ref={ref => (this.configuratorRef = ref)} />
                </div>
            </div>
        );
    }
}

export default RipeConfigurator;
