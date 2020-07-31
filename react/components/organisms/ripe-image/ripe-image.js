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
             * The format of the configurator image, (eg: png, jpg, svg, etc.).
             */
            format: PropTypes.string,
            /**
             * Indicates that the image composition is to be cropped.
             * Crops the current image according to the minimal possible
             * bounding box in both x and y axis
             */
            crop: PropTypes.bool,
            /**
             * Indicates if the personalization should be shown.
             */
            showInitials: PropTypes.bool,
            /**
             * The group in which the image initials belongs to.
             */
            initialsGroup: PropTypes.string,
            /**
             * A function that receives the initials and engraving as strings
             * and the img element that will be used and returns a map with
             * the initials and a profile list.
             */
            initialsBuilder: PropTypes.func,
            /**
             * An object containing the state of the personalization. For each
             * group of the model it can contain the initials and the corresponding
             * engraving (eg. { main: { initials: "AB", engraving: "style:grey" }}).
             */
            state: PropTypes.object,
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
            format: null,
            crop: null,
            showInitials: false,
            initialsGroup: null,
            initialsBuilder: null,
            state: {},
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

        this.image = this.state.ripeData.bindImage(this.imageRef, {
            frame: this.props.frame,
            size: this.props.size || undefined,
            format: this.props.format,
            crop: this.props.crop,
            showInitials: this.props.showInitials,
            initialsGroup: this.props.initialsGroup,
            initialsBuilder: this.props.initialsBuilder
        });
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.size !== this.props.size) {
            this.image.resize(this.props.size);
        }
        if (prevProps.frame !== this.props.frame) {
            this.image.setFrame(this.props.frame);
        }
        if (JSON.stringify(prevProps.parts) !== JSON.stringify(this.props.parts)) {
            this._updateParts(this.props.parts);
        }
        if (prevProps.showInitials !== this.props.showInitials) {
            this.image.setShowInitials(this.props.showInitials);
        }
        if (prevProps.initialsBuilder !== this.props.initialsBuilder) {
            this.image.setInitialsBuilder(this.props.initialsBuilder);
        }
        if (JSON.stringify(prevProps.state) !== JSON.stringify(this.props.state)) {
            await this.image.update(this.props.state);
        }
        this._updateConfiguration(this.props, prevProps);
        this._updateConfigurator(this.props, prevProps);
    }

    async componentWillUnmount() {
        if (this.image) await this.state.ripeData.unbindImage(this.image);
        this.setState({ image: null });
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

        if (global.ripe) return;
        global.ripe = this.state.ripeData;
    }

    _updateParts(parts) {
        this.setState(
            {
                partsData: parts
            },
            async () => await this._configRipe()
        );
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
            prevProps.format !== props.format ||
            prevProps.crop !== props.crop ||
            prevProps.initialsGroup !== props.initialsGroup
        ) {
            this.setState(
                {
                    partsData: null
                },
                async () => {
                    await this.image.updateOptions(
                        {
                            format: this.props.format,
                            crop: this.props.crop,
                            initialsGroup: this.props.initialsGroup
                        },
                        false
                    );
                    await this.image.update(this.props.state);
                }
            );
        }
    }

    _onLoad() {
        // updates the image if there is an initial state provided,
        // showing initials when the image is first rendered. This
        // only executes after rendering the component the first time.
        if (this.props.state && this.state.loading) this.image.update(this.props.state);

        this.setState({ loading: false }, () => this.props.onLoaded());
    }

    render() {
        return (
            <img
                className="ripe-image"
                alt={this.props.name || this.props.model}
                ref={ref => (this.imageRef = ref)}
                onLoad={() => this._onLoad()}
            />
        );
    }
}

export default RipeImage;
