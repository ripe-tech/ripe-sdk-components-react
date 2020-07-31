import React, { Component } from "react";
import PropTypes from "prop-types";
import { Ripe } from "ripe-sdk";

import { Loader } from "../../atoms";

import "ripe-sdk/src/css/ripe.css";
import "./ripe-configurator.css";

export class RipeConfigurator extends Component {
    static get propTypes() {
        return {
            /**
             * The brand of the model.
             */
            brand: PropTypes.string.isRequired,
            /**
             * The name of the model.
             */
            model: PropTypes.string.isRequired,
            /**
             * The version of the build.
             */
            version: PropTypes.number.isRequired,
            /**
             * The parts of the customized build as a dictionary mapping the
             * name of the part to an object of material and color.
             */
            parts: PropTypes.object,
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
            configAnimate: PropTypes.string,
            /**
             * The format of the configurator image, (eg: png, jpg, svg, etc.).
             */
            format: PropTypes.string,
            /**
             * An initialized RIPE instance form the RIPE SDK, if not defined,
             * a new SDK instance will be initialized.
             */
            ripe: PropTypes.object,
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
            onUpdateHighlightedPart: PropTypes.func,
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
            brand: null,
            model: null,
            version: null,
            parts: null,
            frame: null,
            size: null,
            loader: true,
            selectedPart: null,
            highlightedPart: null,
            sensitivity: null,
            useMasks: true,
            duration: null,
            configAnimate: null,
            format: null,
            ripe: null,
            onUpdateFrame: frame => {},
            onUpdateSelectedPart: part => {},
            onUpdateHighlightedPart: part => {},
            onLoading: () => {},
            onLoaded: () => {}
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            /**
             * The frame that is currently being shown in the
             * configurator.
             */
            frameData: this.props.frame,
            /**
             * Flag that controls if the initial loading process for
             * the configurator is still running.
             */
            loading: true,
            /**
             * Part of the model that is currently selected.
             */
            selectedPartData: this.props.selectedPart,
            /**
             * Part of the model that is currently highlighted.
             */
            highlightedPartData: this.props.highlightedPart,
            /**
             * Parts of the model.
             */
            partsData: this.props.parts,
            /**
             * RIPE instance, which can be later initialized
             * if the given prop is not defined.
             */
            ripeData: this.ripe
        };
    }

    async componentDidMount() {
        this.props.onLoading();

        await this._setupRipe();

        this.configurator = this.state.ripeData.bindConfigurator(this.configuratorRef, {
            view: this.state.frameData ? this.state.frameData.split("-")[0] : null,
            position: this.state.frameData ? this.state.frameData.split("-")[1] : null,
            duration: this.props.duration,
            configAnimate: this.props.configAnimate,
            useMasks: this.props.useMasks,
            sensitivity: this.props.sensitivity
        });

        this.state.ripeData.bind("selected_part", part => {
            if (this.state.selectedPartData === part) return;
            this.setState({ selectedPartData: part }, () => this.props.onUpdateSelectedPart(part));
        });

        this.configurator.bind("highlighted_part", part => {
            if (this.state.highlightedPartData === part) return;
            this.setState({ highlightedPartData: part }, () =>
                this.props.onUpdateHighlightedPart(part)
            );
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

        this._resize(this.props.size);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.size !== this.props.size) {
            this._resize(this.props.size);
        }
        if (prevProps.frame !== this.props.frame) {
            this._changeFrame(this.props.frame, prevProps.frame);
        }
        if (JSON.stringify(prevProps.parts) !== JSON.stringify(this.props.parts)) {
            this._updateParts(this.props.parts);
        }
        if (prevProps.selectedPart !== this.props.selectedPart) {
            this.state.ripeData.selectPart(this.props.selectedPart);
        }
        if (prevProps.highlightedPart !== this.props.highlightedPart) {
            this._highlightPart(this.props.highlightedPart, prevProps.highlightedPart);
        }
        if (prevProps.useMasks !== this.props.useMasks) {
            if (!this.configurator) return;
            this._updateUseMasks(this.props.useMasks);
        }
        this._updateConfiguration(this.props, prevProps);
        this._updateConfigurator(this.props, prevProps);
    }

    async componentWillUnmount() {
        if (this.configurator) await this.state.ripeData.unbindConfigurator(this.configurator);
        this.configurator = null;
    }

    async _configRipe() {
        this.setState({ loading: true });

        try {
            await this.state.ripeData.config(this.props.brand, this.props.model, {
                version: this.props.version,
                parts: this.state.partsData
            });
        } catch (error) {
            this.setState({ loading: false }, () => {
                this.props.onLoaded();
            });
        }
    }

    /**
     * Initializes RIPE instance if it does not exists and
     * configures it with the given brand, model, version
     * and parts. If a RIPE instance is provided, it will
     * be used without further configuration.
     */
    async _setupRipe() {
        if (!this.state.ripeData) {
            this.setState({ ripeData: new Ripe() }, async () => await this._configRipe());
        } else {
            await this._configRipe();
        }

        if (!global.ripe) {
            global.ripe = this.state.ripeData;
        }
    }

    /**
     * Updates the configurator, showing the provided frame
     * with possible animation.
     */
    async _changeFrame(value, oldValue) {
        // in case the configurator is not currently ready
        // then avoids the operation (returns control flow)
        if (!this.configurator || !this.configurator.ready) return;

        const currentView = oldValue ? oldValue.split("-")[0] : "";
        const newView = value.split("-")[0];

        // runs the frame changing operation (possible animation)
        // according to the newly changed frame value
        await this.configurator.changeFrame(value, {
            type: currentView === newView ? false : this.props.configAnimate,
            revolutionDuration: currentView === newView ? this.props.duration : null,
            duration: this.props.duration
        });

        // only the visible instance of this component
        // should be sending events it's considered to
        // be the main/master one
        if (this._elementDisplayed()) {
            this.props.onUpdateFrame(value);
        }
    }

    /**
     * Re-sizes the configurator according to the current
     * available container size (defined by parent).
     */
    _resize(size) {
        if (!size || !this.configurator) return;
        this.configurator.resize(size);
    }

    _updateParts(parts) {
        this.setState(
            {
                partsData: parts
            },
            async () => await this._configRipe()
        );
    }

    _highlightPart(part, previousPart) {
        this.configurator.lowlight(previousPart);
        this.configurator.highlight(part);
    }

    _updateUseMasks(useMasks) {
        if (useMasks) this.configurator.enableMasks();
        else this.configurator.disableMasks();
    }

    _updateConfiguration(props, prevProps) {
        if (
            prevProps.brand !== props.brand ||
            prevProps.model !== props.model ||
            prevProps.version !== props.version
        ) {
            this.setState(
                {
                    partsData: null
                },
                async () => await this._configRipe()
            );
        }
    }

    _updateConfigurator(props, prevProps) {
        if (
            prevProps.sensitivity !== props.sensitivity ||
            prevProps.duration !== props.duration ||
            prevProps.configAnimate !== props.configAnimate ||
            prevProps.format !== props.format
        ) {
            this.setState(
                {
                    partsData: null
                },
                async () =>
                    await this.configurator.updateOptions({
                        sensitivity: this.props.sensitivity,
                        duration: this.props.duration,
                        configAnimate: this.props.configAnimate,
                        format: this.props.format
                    })
            );
        }
    }

    _elementDisplayed() {
        if (!this.configurator) {
            return false;
        }
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
