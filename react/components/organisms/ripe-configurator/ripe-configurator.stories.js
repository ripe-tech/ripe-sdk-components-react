import React, { Component } from "react";
import PropTypes from "prop-types";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, number, boolean } from "@storybook/addon-knobs";
import { Ripe } from "ripe-sdk";

import { RipeConfigurator } from "./ripe-configurator";

class Wrapper extends Component {
    static get propTypes() {
        return {
            brand: PropTypes.string,
            model: PropTypes.string,
            version: PropTypes.number,
            frame: PropTypes.string,
            size: PropTypes.number,
            loader: PropTypes.bool,
            selectedPart: PropTypes.string,
            highlightedPart: PropTypes.string,
            sensitivity: PropTypes.number,
            useMasks: PropTypes.bool,
            duration: PropTypes.number,
            animation: PropTypes.string,
            format: PropTypes.string,
            ripe: PropTypes.object
        };
    }

    static get defaultProps() {
        return {
            brand: null,
            model: null,
            version: null,
            frame: null,
            size: null,
            loader: null,
            selectedPart: null,
            highlightedPart: null,
            sensitivity: null,
            useMasks: null,
            duration: null,
            animation: null,
            format: null,
            ripe: null
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            frameData: props.frame,
            highlightedPartData: props.highlightedPart
        };
    }

    onUpdateFrame = frame => {
        this.setState({ frameData: frame });
    };

    onUpdateHighlightedPart = highlightedPart => {
        this.setState({ highlightedPartData: highlightedPart });
    };

    render() {
        return (
            <div>
                <RipeConfigurator
                    brand={this.props.brand}
                    model={this.props.model}
                    version={this.props.version}
                    frame={this.props.frame}
                    size={this.props.size}
                    loader={this.props.loader}
                    selectedPart={this.state.selectedPartData}
                    highlightedPart={this.state.highlightedPartData}
                    sensitivity={this.props.sensitivity}
                    useMasks={this.props.useMasks}
                    duration={this.props.duration}
                    animation={this.props.animation}
                    format={this.props.format}
                    ripe={this.props.ripe}
                    config={true}
                    onUpdateFrame={this.onUpdateFrame}
                    onUpdateHighlightedPart={this.onUpdateHighlightedPart}
                />
                <p>Frame: {this.state.frameData}</p>
                <p>Highlighted Part: {this.state.highlightedPartData}</p>
            </div>
        );
    }
}

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("RipeConfigurator", () => {
        const brand = text("Brand", "dummy");
        const model = text("Model", "cube");
        const version = number("Version", 52);
        const frame = text("Frame", "side-4");
        const size = number("Size", 400);
        const loader = boolean("Loader", true);
        const selectedPart = text("Selected Part", "side");
        const highlightedPart = text("Highlighted Part", "side");
        const sensitivity = number("Sensitivity", 40);
        const useMasks = boolean("Use Masks", true);
        const duration = number("Duration", 1000);
        const animation = text("Animation", "cross");
        const format = text("Format", "png");
        const ripe = new Ripe();

        return (
            <Wrapper
                brand={brand}
                model={model}
                version={version}
                frame={frame}
                size={size}
                loader={loader}
                selectedPart={selectedPart}
                highlightedPart={highlightedPart}
                sensitivity={sensitivity}
                useMasks={useMasks}
                duration={duration}
                animation={animation}
                format={format}
                ripe={ripe}
                config={true}
            />
        );
    });
