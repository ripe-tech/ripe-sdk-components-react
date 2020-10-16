import React, { Component } from "react";
import PropTypes from "prop-types";

import RipeImageZoom from "../ripe-image-zoom/ripe-image-zoom";

import "./ripe-image-zoom-hover.css";

export class RipeImageZoomHover extends Component {
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
             * Enable changing the zoom value with the mouse wheel scroll.
             */
            scrollZoom: PropTypes.bool,
            /**
             * Scroll sensitivity when controlling the zoom value with the mouse wheel scroll.
             */
            scrollSensitivity: PropTypes.number,
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
            scrollZoom: false,
            scrollSensitivity: 1,
            onUpdateParts: parts => {},
            onLoading: () => {},
            onLoaded: () => {}
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
        target = document.querySelector(".ripe-image-zoom-hover");
        const pivotCoordinates = this._getPivotCoordinates(event, target);
        if (
            pivotCoordinates.x > target.offsetWidth / 2 ||
            pivotCoordinates.y > target.offsetHeight / 2
        ) {
            this.endHover();
            return;
        }

        this.setState({
            hover: true,
            pivot: pivotCoordinates,
            zoomData: this.props.zoom
        });
    }

    moveHover(event, target) {
        target = document.querySelector(".ripe-image-zoom-hover");
        if (!this.state.hover) return;

        const pivotCoordinates = this._getPivotCoordinates(event, target);
        if (
            pivotCoordinates.x > target.offsetWidth / 2 ||
            pivotCoordinates.y > target.offsetHeight / 2
        ) {
            this.endHover();
            return;
        }

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
        if (!this.state.hover || !this.props.scrollZoom) return;
        const updatedZoom = this.state.zoomData + -1 * this.props.scrollSensitivity * event.deltaY;
        this.setState({
            zoomData: updatedZoom
        });
    }

    onMouseEnter = event => {
        this.startHover(event, event.target);
    };

    onMouseMove = event => {
        this.moveHover(event, event.target);
    };

    onMouseWheel = event => {
        this.zoomScroll(event);
    };

    onEndHover = event => {
        this.endHover(event, event.target);
    };

    _getPivotCoordinates(event, target) {
        const x = event.pageX - target.offsetLeft - target.offsetWidth / 2;
        const y = event.pageY - target.offsetTop - target.offsetHeight / 2;
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
                onMouseLeave={this.onEndHover}
                onWheel={this.onMouseWheel}
            >
                <RipeImageZoom
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
                    zoom={this._zoomApplied()}
                    pivot={this.state.pivot}
                    onUpdateParts={this.props.onUpdateParts}
                    onLoading={this.props.onLoading}
                    onLoaded={this.props.onLoaded}
                />
            </div>
        );
    }
}

export default RipeImageZoomHover;
