import React, { Component } from "react";
import PropTypes from "prop-types";
import { mix } from "yonius";

import { LogicMixin } from "../../../mixins";

import "./ripe-image.css";

export class RipeImage extends mix(Component).with(LogicMixin) {
    static get propTypes() {
        return {
            /**
             * The brand of the model.
             */
            brand: PropTypes.string,
            /**
             * The name of the model.
             */
            model: PropTypes.string,
            /**
             * The version of the build.
             */
            version: PropTypes.number,
            /**
             * Indicates that the component should apply the config internally.
             */
            config: PropTypes.bool,
            /**
             * The parts of the customized build as a dictionary mapping the
             * name of the part to an object of material and color.
             */
            parts: PropTypes.object,
            /**
             * The initials value to be used in the Ripe instance.
             */
            initials: PropTypes.string,
            /**
             * The engraving value to be used in the Ripe instance.
             */
            engraving: PropTypes.string,
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
             * The angle in degrees of the rotation to apply on the model.
             */
            rotation: PropTypes.number,
            /**
             * If set flips the current image vertically, this operation is going
             * to be performed before rotation.
             */
            flip: PropTypes.bool,
            /**
             * If set mirrors the current image horizontally, this operation is going
             * to be performed before rotation.
             */
            mirror: PropTypes.bool,
            /**
             * Tuple that defines the target width and height (only one dimension is required)
             * for the "inside" image to be generated, note that if both dimensions are defined
             * image deformation may occur. Example: [100, 100].
             */
            boundingBox: PropTypes.array,
            /**
             * The name of the blending algorithm that is going to be
             * used in the blending of the multiple part layers.
             */
            algorithm: PropTypes.string,
            /**
             * String that defines the color to be applied to the background
             * in the "RRGGBB" hexadecimal format. Example: "ffffff".
             */
            background: PropTypes.string,
            /**
             * The name of the engine that is going to be used for the composition
             * of the image (eg: base, rust, etc.), if not provided the best available is going
             * to be used for the composition process.
             */
            engine: PropTypes.string,
            /**
             * A list with the names of the profiles to be used. A profile what what defines a pre-made
             * configuration in a specific product. The configuration can set the values such as the
             * font type, color and size, the initials position and rotation. This supports the use of
             * namespacing.
             */
            profiles: PropTypes.array,
            /**
             * Overrides the profiles position on the x axis.
             */
            initialsX: PropTypes.number,
            /**
             * Overrides the profiles position on the y axis.
             */
            initialsY: PropTypes.number,
            /**
             * Overrides the profiles width.
             */
            initialsWidth: PropTypes.number,
            /**
             * Overrides the profiles height.
             */
            initialsHeight: PropTypes.number,
            /**
             * Overrides the profiles viewport. Viewport is a window (specified by [x, y, width, height])
             * that defines a region to be shown with a zoom. It is used to showcase the initials.
             */
            initialsViewport: PropTypes.array,
            /**
             * Overrides the profiles color to be applied to the initials.
             */
            initialsColor: PropTypes.string,
            /**
             * Overrides the profiles opacity to be applied to the initials. This value ranges from
             * 0 to 1.
             */
            initialsOpacity: PropTypes.number,
            /**
             * Overrides the profiles orientation of the initials to be applied. This field can be
             * left, right or center.
             */
            initialsAlign: PropTypes.string,
            /**
             * Overrides the profiles vertical alignment on the initials. This field can be top,
             * bottom or middle.
             */
            initialsVertical: PropTypes.string,
            /**
             * Overrides the profiles embossing type of the initials. The available options
             * vary with each model.
             */
            initialsEmbossing: PropTypes.string,
            /**
             * Overrides the profiles rotation angle, in degrees, to be applied to the initials.
             */
            initialsRotation: PropTypes.number,
            /**
             * Initials' z-index value to be using when composing, ensuring proper layering of the
             * rendered image.
             */
            initialsZindex: PropTypes.number,
            /**
             * Algorithm to be used for initials (defaults to 'mask_top').
             */
            initialsAlgorithm: PropTypes.string,
            /**
             * The background color to be used in the generation of the antialiasing (defaults to '000000').
             */
            initialsBlendColor: PropTypes.string,
            /**
             * Pattern to be used when tiling.
             */
            initialsPattern: PropTypes.string,
            /**
             * Texture image to be used when filling the initials.
             */
            initialsTexture: PropTypes.string,
            /**
             * Parts to exclude when applying the initials.
             */
            initialsExclusion: PropTypes.array,
            /**
             * Parts to include when applying the initials.
             */
            initialsInclusion: PropTypes.array,
            /**
             * Overrides the profile's rotation angle, in degrees, to be applied to image.
             */
            initialsImageRotation: PropTypes.number,
            /**
             * Flip the image around the X axis.
             */
            initialsImageFlip: PropTypes.bool,
            /**
             * Mirror the image around the Y axis.
             */
            initialsImageMirror: PropTypes.bool,
            /**
             * Displays the Debug information box.
             */
            debug: PropTypes.bool,
            /**
             * Overrides the profiles font to be applied on the initials.
             */
            fontFamily: PropTypes.string,
            /**
             * Overrides the profiles font weight to be applied on the initials.
             */
            fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            /**
             * Overrides the profiles font size to be applied on the initials.
             */
            fontSize: PropTypes.number,
            /**
             * Overrides the profiles spacing between each letter.
             */
            fontSpacing: PropTypes.number,
            /**
             * Overrides the profiles font trim, which defines if the initials are trimmed.
             */
            fontTrim: PropTypes.bool,
            /**
             * Mask strategy when using raster fonts: 'self' means that the alpha channel of the
             * letter image is going to be used to defined both which pixels are going to be passed
             * in the paste operation and the intensity; 'simple' means that just the pixels with
             * a valid alpha value (greater than zero) will be passed to the target image.
             */
            fontMask: PropTypes.string,
            /**
             * Forces a specific font mode, may improve text render (vector fonts) - it's used by
             * some graphics drivers to indicate what mode the driver prefers; usually when the
             * font uses antialiasing the mode 'L' shall improve rendering.
             */
            fontMode: PropTypes.string,
            /**
             * Overrides the profiles line height, which defines the initials line height.
             */
            lineHeight: PropTypes.number,
            /**
             * Line break, is optional and can have one of (normal and word_break).
             */
            lineBreaking: PropTypes.bool,
            /**
             * Overrides the profiles shadow, which defines if the initials have a shadow.
             */
            shadow: PropTypes.bool,
            /**
             * Overrides the profiles color of the shadow to be used.
             */
            shadowColor: PropTypes.string,
            /**
             * Overrides the profiles offset to be applied on the shadow.
             */
            shadowOffset: PropTypes.string,
            /**
             * Overrides the profiles offset to be applied on the initials. Example:
             * {
             *   0: [0, 6],
             *   1: [0, -10],
             *   2: [0, 10]
             * }.
             */
            offsets: PropTypes.object,
            /**
             * Bezier curve control points, must contain four (e.g. [[0.2, 0.2], [0.7, 0.2],
             * [0.2, 0.5], [0.7, 0.5]]).
             */
            curve: PropTypes.array,

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
             * Style to be applied to the image, used for zoom application.
             */
            style: PropTypes.object,
            /**
             * Callback called when the parts of the model are changed. This
             * can be due to restrictions and rules of the model when applying
             * a certain customization.
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
            brand: null,
            model: null,
            version: null,
            config: true,
            parts: null,
            initials: null,
            engraving: null,
            frame: null,
            size: null,
            format: null,
            crop: null,
            showInitials: false,
            initialsGroup: null,
            initialsBuilder: null,
            rotation: null,
            flip: null,
            mirror: null,
            boundingBox: null,
            algorithm: null,
            background: null,
            engine: null,
            profiles: null,
            initialsX: null,
            initialsY: null,
            initialsWidth: null,
            initialsHeight: null,
            initialsViewport: null,
            initialsColor: null,
            initialsOpacity: null,
            initialsAlign: null,
            initialsVertical: null,
            initialsEmbossing: null,
            initialsRotation: null,
            initialsZindex: null,
            initialsAlgorithm: null,
            initialsBlendColor: null,
            initialsPattern: null,
            initialsTexture: null,
            initialsExclusion: null,
            initialsInclusion: null,
            initialsImageRotation: null,
            initialsImageFlip: null,
            initialsImageMirror: null,
            debug: null,
            fontFamily: null,
            fontWeight: null,
            fontSize: null,
            fontSpacing: null,
            fontTrim: null,
            fontMask: null,
            fontMode: null,
            lineHeight: null,
            lineBreaking: null,
            shadow: null,
            shadowColor: null,
            shadowOffset: null,
            offsets: null,
            curve: null,
            state: {},
            ripe: null,
            name: null,
            style: {},
            onUpdateParts: parts => {},
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

        // saves the model parts after the RIPE configuration so that
        // possible changes due to restrictions can be communicated
        // to the parent component
        this.setState({ partsData: Object.assign({}, this.state.ripeData.parts) }, () =>
            this.props.onUpdateParts(this.state.ripeData.parts)
        );

        this.partsBind = this.state.ripeData.bind("parts", parts => {
            if (this._equalParts(parts, this.state.partsData)) return;
            this.setState({ partsData: parts }, () => this.props.onUpdateParts(parts));
        });

        this.image = this.state.ripeData.bindImage(this.imageRef, {
            frame: this.props.frame,
            size: this.props.size || undefined,
            format: this.props.format,
            crop: this.props.crop,
            showInitials: this.props.showInitials,
            initialsGroup: this.props.initialsGroup,
            initialsBuilder: this.props.initialsBuilder
        });
        this.image.update(this.props.state);
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.size !== this.props.size) {
            this.image.resize(this.props.size);
        }
        if (prevProps.frame !== this.props.frame) {
            this.image.setFrame(this.props.frame);
        }
        if (!this._equalParts(prevProps.parts, this.props.parts)) {
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
        await this._updateConfiguration(this.props, prevProps);
        await this._updateConfigurator(this.props, prevProps);
    }

    async componentWillUnmount() {
        if (this.image) await this.state.ripeData.unbindImage(this.image);
    }

    _updateParts(parts) {
        this.setState(
            {
                partsData: parts
            },
            async () => {
                await this.props.onUpdateParts(parts);
                await this._setPartsRipe(parts);
            }
        );
    }

    async _updateConfiguration(props, prevProps) {
        if (
            prevProps.brand !== props.brand ||
            prevProps.model !== props.model ||
            prevProps.version !== props.version
        ) {
            if (props.config) await this._configRipe();
        }
    }

    async _updateConfigurator(props, prevProps) {
        if (
            prevProps.format !== props.format ||
            prevProps.crop !== props.crop ||
            prevProps.initialsGroup !== props.initialsGroup
        ) {
            await this.image.updateOptions({
                format: this.props.format,
                crop: this.props.crop,
                initialsGroup: this.props.initialsGroup
            });
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
                onLoad={() => this._onLoad()}
                style={this.props.style}
            />
        );
    }
}

export default RipeImage;
