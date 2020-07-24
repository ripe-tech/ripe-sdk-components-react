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
            ripe: null,
            onUpdateFrame: frame => {},
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
            position: this.state.frameData ? this.state.frameData.split("-")[1] : null
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
            this._changeFrame(this.props.frame);
        }
    }

    async componentWillUnmount() {
        if (this.configurator) await this.state.ripeData.unbindConfigurator(this.configurator);
        this.configurator = null;
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

    async _configRipe() {
        this.setState({ loading: true });

        try {
            await this.state.ripeData.config(this.props.brand, this.props.model, {
                version: this.props.version,
                parts: this.props.parts
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
    async _changeFrame(value) {
        // in case the configurator is not currently ready
        // then avoids the operation (returns control flow)
        if (!this.configurator || !this.configurator.ready) return;

        // runs the frame changing operation (possible animation)
        // according to the newly changed frame value
        await this.configurator.changeFrame(value);

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

    render() {
        return (
            <div className="ripe-configurator">
                {this.props.loader && this.state.loading && (
                    <Loader className="loader-container" loaderStyle={this._loaderStyle()} />
                )}
                <div className={`configurator-wrapper ${this.loading ? "loading" : ""}`}>
                    <div className="config" ref={ref => (this.configuratorRef = ref)} />
                </div>
            </div>
        );
    }
}

export default RipeConfigurator;
