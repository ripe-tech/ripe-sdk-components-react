import React, { Component } from "react";
import PropTypes from "prop-types";

import RipeImage from "../ripe-image/ripe-image";

import "./ripe-image-zoom.css";

export class RipeImageZoom extends Component {
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
             * Zoom percentage that controls the level of zoom over the original image.
             */
            zoom: PropTypes.number,
            /**
             * The z and y coordinates of the pivot point where the zoom will be applied to.
             */
            pivot: PropTypes.object,
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
            zoom: 100,
            pivot: null,
            onUpdateParts: parts => {},
            onLoading: () => {},
            onLoaded: () => {}
        };
    }

    constructor(props) {
        super(props);

        this.state = {};
    }

    _zoomStyle() {
        const base = { transform: `scale(${this.props.zoom / 100})` };
        if (this.props.pivot) {
            base.transform += ` translate(${-1 * this.props.pivot.x}px, ${
                -1 * this.props.pivot.y
            }px)`;
        }
        return base;
    }

    render() {
        return (
            <div className="ripe-image-zoom">
                <RipeImage
                    brand={this.props.brand}
                    model={this.props.model}
                    version={this.props.version}
                    frame={this.props.frame}
                    size={this.props.size}
                    format={this.props.format}
                    crop={this.props.crop}
                    showInitials={this.props.showInitials}
                    initialsGroup={this.props.initialsGroup}
                    initialsBuilder={this.props.initialsBuilder}
                    state={this.props.state}
                    ripe={this.props.ripe}
                    name={this.props.name}
                    style={this._zoomStyle()}
                    onUpdateParts={this.props.onUpdateParts}
                    onLoading={this.props.onLoading}
                    onLoaded={this.props.onLoaded}
                />
            </div>
        );
    }
}

export default RipeImageZoom;
