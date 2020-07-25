import React, { Component } from "react";
import PropTypes from "prop-types";
import { Ripe } from "ripe-sdk";

import "./ripe-image.css";

export class RipeImage extends Component {
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
             * An initialized RIPE instance form the RIPE SDK, if not defined,
             * a new SDK instance will be initialized.
             */
            ripe: PropTypes.object,
            /**
             * Name of the image.
             */
            name: PropTypes.string,
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
            ripe: null,
            name: null,
            onLoading: () => {},
            onLoaded: () => {}
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            /**
             * The image created by the Ripe SDK, currently being shown.
             */
            image: null,
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

        const image = this.state.ripeData.bindImage(this.imageRef, {
            frame: this.props.frame,
            size: this.props.size || undefined
        });
        this.setState({ image: image });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.size !== this.props.size) {
            this.state.image.resize(this.props.size);
        }
        if (prevProps.frame !== this.props.frame) {
            this.state.image.setFrame(this.props.frame);
        }
    }

    async componentWillUnmount() {
        if (this.state.image) await this.state.ripeData.unbindImage(this.state.image);
        this.setState({ image: null });
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

    _onLoad() {
        this.setState({ loading: false }, () => this.props.onLoaded());
    }

    render() {
        return (
            <img
                className="ripe-image"
                alt={this.props.name || this.props.model}
                ref={ref => (this.imageRef = ref)}
                onLoad={this.onLoad}
            />
        );
    }
}

export default RipeImage;
