import React, { Component } from "react";
import PropTypes from "prop-types";

import RipeImage from "../ripe-image/ripe-image";

import "./ripe-image-zoom.css";

export class RipeImageZoom extends Component {
    static get propTypes() {
        return {
            /**
             * Zoom percentage that controls the level of zoom over the original image.
             */
            zoom: PropTypes.number,
            /**
             * The x and y coordinates of the pivot point where the zoom will be applied to.
             */
            pivot: PropTypes.object
        };
    }

    static get defaultProps() {
        return {
            zoom: 100,
            pivot: null
        };
    }

    _zoomStyle() {
        const base = {
            transformOrigin: "0px 0px 0px",
            transform: `scale(${this.props.zoom / 100})`
        };
        if (this.props.pivot) {
            // revert the translate after scaling the image so that the scaling
            // appears centered on the pivot
            base.transform = `translate(${this.props.pivot.x}px, ${this.props.pivot.y}px) ${
                base.transform
            } translate(${-1 * this.props.pivot.x}px, ${-1 * this.props.pivot.y}px)`;
        }
        return base;
    }

    render() {
        return (
            <div className="ripe-image-zoom">
                <RipeImage {...this.props} style={this._zoomStyle()} />
            </div>
        );
    }
}

export default RipeImageZoom;
