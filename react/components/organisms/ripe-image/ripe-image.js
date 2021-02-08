import React, { Component } from "react";
import PropTypes from "prop-types";
import { mix } from "yonius";

import { LogicMixin } from "../../../mixins";

import "./ripe-image.css";

export class RipeImage extends mix(Component).with(LogicMixin) {
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
             * of the image (eg: base, rust, etc.), if not provided the best available
             * is going to be used for the composition process.
             */
            engine: PropTypes.string,
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
             * Overrides the profiles viewport. Viewport is a window
             * (specified by [x, y, width, height]) that defines a region
             * to be shown with a zoom. It is used to showcase the initials.
             */
            initialsViewport: PropTypes.array,
            /**
             * Overrides the profiles color to be applied to the initials.
             */
            initialsColor: PropTypes.string,
            /**
             * Overrides the profiles opacity to be applied to the initials.
             * This value ranges from 0 to 1.
             */
            initialsOpacity: PropTypes.number,
            /**
             * Overrides the profiles orientation of the initials to be applied.
             * This field can be left, right or center.
             */
            initialsAlign: PropTypes.string,
            /**
             * Overrides the profiles vertical alignment on the initials.
             * This field can be top, bottom or middle.
             */
            initialsVertical: PropTypes.string,
            /**
             * Overrides the profiles embossing type of the initials. The available
             * options vary with each model.
             */
            initialsEmbossing: PropTypes.string,
            /**
             * Overrides the profiles rotation angle, in degrees, to be applied to
             * the initials.
             */
            initialsRotation: PropTypes.number,
            /**
             * Initials' z-index value to be using when composing, ensuring proper
             * layering of the rendered image.
             */
            initialsZindex: PropTypes.number,
            /**
             * Algorithm to be used for initials (defaults to 'mask_top').
             */
            initialsAlgorithm: PropTypes.string,
            /**
             * The background color to be used in the generation of the antialiasing
             * (defaults to '000000').
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
            lineBreaking: PropTypes.string,
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
             * Name of the image.
             */
            name: PropTypes.string,
            /**
             * Style to be applied to the image, used for zoom application.
             */
            style: PropTypes.object
        };
    }

    static get defaultProps() {
        return {
            ...this._defaultProps,
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
            name: null,
            style: {}
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
        }
    }

    async componentDidMount() {
        this.props.onLoading();

        await this.setupRipe();

        this.image = this.state.ripeData.bindImage(this.imageRef, {
            frame: this.props.frame,
            size: this.props.size || undefined,
            format: this.props.format,
            crop: this.props.crop,
            showInitials: this.props.showInitials,
            initialsGroup: this.props.initialsGroup,
            initialsBuilder: this.props.initialsBuilder,
            rotation: this.props.rotation,
            flip: this.props.flip,
            mirror: this.props.mirror,
            boundingBox: this.props.boundingBox,
            algorithm: this.props.algorithm,
            background: this.props.background,
            engine: this.props.engine,
            initialsX: this.props.initialsX,
            initialsY: this.props.initialsY,
            initialsWidth: this.props.initialsWidth,
            initialsHeight: this.props.initialsHeight,
            initialsViewport: this.props.initialsViewport,
            initialsColor: this.props.initialsColor,
            initialsOpacity: this.props.initialsOpacity,
            initialsAlign: this.props.initialsAlign,
            initialsVertical: this.props.initialsVertical,
            initialsEmbossing: this.props.initialsEmbossing,
            initialsRotation: this.props.initialsRotation,
            initialsZindex: this.props.initialsZindex,
            initialsAlgorithm: this.props.initialsAlgorithm,
            initialsBlendColor: this.props.initialsBlendColor,
            initialsPattern: this.props.initialsPattern,
            initialsTexture: this.props.initialsTexture,
            initialsExclusion: this.props.initialsExclusion,
            initialsInclusion: this.props.initialsInclusion,
            initialsImageRotation: this.props.initialsImageRotation,
            initialsImageFlip: this.props.initialsImageFlip,
            initialsImageMirror: this.props.initialsImageMirror,
            debug: this.props.debug,
            fontFamily: this.props.fontFamily,
            fontWeight: this.props.fontWeight,
            fontSize: this.props.fontSize,
            fontSpacing: this.props.fontSpacing,
            fontTrim: this.props.fontTrim,
            fontMask: this.props.fontMask,
            fontMode: this.props.fontMode,
            lineHeight: this.props.lineHeight,
            lineBreaking: this.props.lineBreaking,
            shadow: this.props.shadow,
            shadowColor: this.props.shadowColor,
            shadowOffset: this.props.shadowOffset,
            offsets: this.props.offsets,
            curve: this.props.curve
        });

        if (this.state.ripeData.brand) {
            await this.image.update({
                initials: this.state.initialsData,
                engraving: this.state.engravingData,
                initialsExtra: this.state.initialsExtraData || {}
            });
        }
    }

    async componentDidUpdate(prevProps) {
        await this._componentDidUpdate(prevProps);

        if (!this.image) return;

        if (prevProps.size !== this.props.size) {
            this.setState({ loading: true });
            this.image.resize(this.props.size);
        }
        if (prevProps.frame !== this.props.frame) {
            this.setState({ loading: true });
            this.image.setFrame(this.props.frame);
        }
        if (prevProps.showInitials !== this.props.showInitials) {
            this.image.setShowInitials(this.props.showInitials);
        }
        if (prevProps.initialsBuilder !== this.props.initialsBuilder) {
            this.image.setInitialsBuilder(this.props.initialsBuilder);
        }
        await this._updateImage(this.props, prevProps);
    }

    async componentWillUnmount() {
        if (this.image) await this.state.ripeData.unbindImage(this.image);
        this.image = null;
    }

    async _updateImage(props, prevProps) {
        if (
            prevProps.format !== props.format ||
            prevProps.crop !== props.crop ||
            prevProps.initialsGroup !== props.initialsGroup ||
            prevProps.initialsBuilder !== props.initialsBuilder ||
            prevProps.rotation !== props.rotation ||
            prevProps.flip !== props.flip ||
            prevProps.mirror !== props.mirror ||
            prevProps.boundingBox !== props.boundingBox ||
            prevProps.algorithm !== props.algorithm ||
            prevProps.background !== props.background ||
            prevProps.engine !== props.engine ||
            prevProps.initialsX !== props.initialsX ||
            prevProps.initialsY !== props.initialsY ||
            prevProps.initialsWidth !== props.initialsWidth ||
            prevProps.initialsHeight !== props.initialsHeight ||
            prevProps.initialsViewport !== props.initialsViewport ||
            prevProps.initialsColor !== props.initialsColor ||
            prevProps.initialsOpacity !== props.initialsOpacity ||
            prevProps.initialsAlign !== props.initialsAlign ||
            prevProps.initialsVertical !== props.initialsVertical ||
            prevProps.initialsEmbossing !== props.initialsEmbossing ||
            prevProps.initialsRotation !== props.initialsRotation ||
            prevProps.initialsZindex !== props.initialsZindex ||
            prevProps.initialsAlgorithm !== props.initialsAlgorithm ||
            prevProps.initialsBlendColor !== props.initialsBlendColor ||
            prevProps.initialsPattern !== props.initialsPattern ||
            prevProps.initialsTexture !== props.initialsTexture ||
            prevProps.initialsExclusion !== props.initialsExclusion ||
            prevProps.initialsInclusion !== props.initialsInclusion ||
            prevProps.initialsImageRotation !== props.initialsImageRotation ||
            prevProps.initialsImageFlip !== props.initialsImageFlip ||
            prevProps.initialsImageMirror !== props.initialsImageMirror ||
            prevProps.debug !== props.debug ||
            prevProps.fontFamily !== props.fontFamily ||
            prevProps.fontWeight !== props.fontWeight ||
            prevProps.fontSize !== props.fontSize ||
            prevProps.fontSpacing !== props.fontSpacing ||
            prevProps.fontTrim !== props.fontTrim ||
            prevProps.fontMask !== props.fontMask ||
            prevProps.fontMode !== props.fontMode ||
            prevProps.lineHeight !== props.lineHeight ||
            prevProps.lineBreaking !== props.lineBreaking ||
            prevProps.shadow !== props.shadow ||
            prevProps.shadowColor !== props.shadowColor ||
            prevProps.shadowOffset !== props.shadowOffset ||
            JSON.stringify(prevProps.offsets) !== JSON.stringify(props.offsets) ||
            prevProps.curve !== props.curve
        ) {
            await this.image.updateOptions({
                frame: this.props.frame,
                size: this.props.size || undefined,
                format: this.props.format,
                crop: this.props.crop,
                showInitials: this.props.showInitials,
                initialsGroup: this.props.initialsGroup,
                initialsBuilder: this.props.initialsBuilder,
                rotation: this.props.rotation,
                flip: this.props.flip,
                mirror: this.props.mirror,
                boundingBox: this.props.boundingBox,
                algorithm: this.props.algorithm,
                background: this.props.background,
                engine: this.props.engine,
                initialsX: this.props.initialsX,
                initialsY: this.props.initialsY,
                initialsWidth: this.props.initialsWidth,
                initialsHeight: this.props.initialsHeight,
                initialsViewport: this.props.initialsViewport,
                initialsColor: this.props.initialsColor,
                initialsOpacity: this.props.initialsOpacity,
                initialsAlign: this.props.initialsAlign,
                initialsVertical: this.props.initialsVertical,
                initialsEmbossing: this.props.initialsEmbossing,
                initialsRotation: this.props.initialsRotation,
                initialsZindex: this.props.initialsZindex,
                initialsAlgorithm: this.props.initialsAlgorithm,
                initialsBlendColor: this.props.initialsBlendColor,
                initialsPattern: this.props.initialsPattern,
                initialsTexture: this.props.initialsTexture,
                initialsExclusion: this.props.initialsExclusion,
                initialsInclusion: this.props.initialsInclusion,
                initialsImageRotation: this.props.initialsImageRotation,
                initialsImageFlip: this.props.initialsImageFlip,
                initialsImageMirror: this.props.initialsImageMirror,
                debug: this.props.debug,
                fontFamily: this.props.fontFamily,
                fontWeight: this.props.fontWeight,
                fontSize: this.props.fontSize,
                fontSpacing: this.props.fontSpacing,
                fontTrim: this.props.fontTrim,
                fontMask: this.props.fontMask,
                fontMode: this.props.fontMode,
                lineHeight: this.props.lineHeight,
                lineBreaking: this.props.lineBreaking,
                shadow: this.props.shadow,
                shadowColor: this.props.shadowColor,
                shadowOffset: this.props.shadowOffset,
                offsets: this.props.offsets,
                curve: this.props.curve
            });
        }
    }

    _onLoaded() {
        this.setState({ loading: false }, () => this.props.onLoaded());
    }

    render() {
        return (
            <img
                className="ripe-image"
                alt={this.props.name || this.props.model}
                ref={ref => (this.imageRef = ref)}
                onLoad={() => this._onLoaded()}
                style={this.props.style}
            />
        );
    }
}

export default RipeImage;
