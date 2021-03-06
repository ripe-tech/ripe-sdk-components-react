import React, { Component } from "react";
import PropTypes from "prop-types";

import RipeImageZoom from "../ripe-image-zoom/ripe-image-zoom";

import "./ripe-image-zoom-hover.css";

export class RipeImageZoomHover extends Component {
    static get propTypes() {
        return {
            /**
             * Zoom percentage that controls the level of zoom over the original image.
             */
            zoom: PropTypes.number,
            /**
             * The maximum zoom percentage allowed over the original image.
             */
            maxZoom: PropTypes.number,
            /**
             * The minimum zoom percentage allowed over the original image.
             */
            minZoom: PropTypes.number,
            /**
             * Enable changing the zoom value with the mouse wheel scroll.
             */
            scrollZoom: PropTypes.bool,
            /**
             * Scroll sensitivity when controlling the zoom value with the mouse wheel scroll.
             */
            scrollSensitivity: PropTypes.number,
            /**
             * Enables zooming out of the image with the mouse scroll.
             */
            zoomOut: PropTypes.bool
        };
    }

    static get defaultProps() {
        return {
            zoom: 140,
            maxZoom: 300,
            minZoom: 10,
            scrollZoom: false,
            scrollSensitivity: 1,
            zoomOut: false
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            hover: false,
            zoomData: this.props.zoom,
            pivot: null
        };
    }

    startHover(event, target) {
        const pivotCoordinates = this._getPivotCoordinates(event, target);
        this.setState({
            hover: true,
            pivot: pivotCoordinates,
            zoomData: this.props.zoom
        });
    }

    moveHover(event, target) {
        if (!this.state.hover) return;

        const pivotCoordinates = this._getPivotCoordinates(event, target);
        this.setState({
            pivot: pivotCoordinates
        });
    }

    endHover() {
        this.setState({
            hover: false,
            pivot: null,
            zoomData: this.props.zoom
        });
    }

    zoomScroll(event) {
        // checks if zooming on hover is enabled or if the mouse is
        // hovering the image
        if (!this.state.hover || !this.props.scrollZoom) return;

        // computes the new zoom value using the delta in Y of the mouse
        // and the currently defined scroll sensitivity
        const zoomValue = this.state.zoomData + -1 * this.props.scrollSensitivity * event.deltaY;

        // checks if the zooming out feature is disabled, if so only
        // allow zooming out until the base scaling of the image (100%)
        if (!this.props.zoomOut && zoomValue <= 100) {
            this.setState({
                zoomData: 100
            });
            return;
        }

        // does not allow values that exceed the minimum and maximum
        // zoom values provided
        this.setState({
            zoomData: Math.min(Math.max(this.props.minZoom, zoomValue), this.props.maxZoom)
        });
    }

    onMouseEnter = event => {
        this.startHover(event, event.target);
    };

    onMouseMove = event => {
        this.moveHover(event, event.target);
    };

    onMouseLeave = () => {
        this.endHover();
    };

    onMouseWheel = event => {
        event.stopPropagation();
        this.zoomScroll(event);
    };

    _getPivotCoordinates(event, target) {
        const x = event.pageX - target.offsetLeft;
        const y = event.pageY - target.offsetTop;
        return { x: x, y: y };
    }

    _zoomApplied() {
        return this.state.hover ? this.state.zoomData : 100;
    }

    render() {
        return (
            <div
                className="ripe-image-zoom-hover"
                onMouseEnter={this.onMouseEnter}
                onMouseMove={this.onMouseMove}
                onMouseLeave={this.onMouseLeave}
                onWheel={this.onMouseWheel}
            >
                <RipeImageZoom
                    {...this.props}
                    zoom={this._zoomApplied()}
                    pivot={this.state.pivot}
                />
            </div>
        );
    }
}

export default RipeImageZoomHover;
