import React, { Component } from "react";
import PropTypes from "prop-types";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, select } from "@storybook/addon-knobs";
import { Ripe } from "ripe-sdk";

import { RipeConfigurator } from "./ripe-configurator";
import { RipeImage } from "./ripe-image";
import { RipePrice } from "./ripe-price";
import { RipePickers } from "./ripe-pickers";

class Wrapper extends Component {
    static get propTypes() {
        return {
            brand: PropTypes.string,
            model: PropTypes.string,
            version: PropTypes.number,
            parts: PropTypes.object,
            initials: PropTypes.string,
            engraving: PropTypes.string,
            currency: PropTypes.string,
            frame: PropTypes.string,
            ripe: PropTypes.object
        };
    }

    static get defaultProps() {
        return {
            brand: null,
            model: null,
            version: null,
            parts: null,
            initials: null,
            engraving: null,
            currency: null,
            frame: null,
            ripe: null
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            structureData: {
                brand: props.brand,
                model: props.model,
                version: props.version,
                parts: props.parts,
                initials: props.initials,
                engraving: props.engraving
            },
            currencyData: props.currency,
            frameData: props.frame,
            ripeData: props.ripe
        };
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.brand !== this.props.brand ||
            prevProps.model !== this.props.model ||
            prevProps.version !== this.props.version ||
            prevProps.initials !== this.props.initials ||
            prevProps.engraving !== this.props.engraving ||
            prevProps.currency !== this.props.currency ||
            prevProps.frame !== this.props.frame
        ) {
            this.setState({
                structureData: {
                    brand: this.props.brand,
                    model: this.props.model,
                    version: this.props.version,
                    parts: this.props.parts,
                    initials: this.props.initials,
                    engraving: this.props.engraving
                },
                currencyData: this.props.currency,
                frameData: this.props.frame
            });
        }
    }

    render() {
        return (
            <div>
                <RipeConfigurator
                    structure={this.state.structureData}
                    currency={this.state.currencyData}
                    size={400}
                    ripe={this.state.ripeData}
                    config={true}
                    style={{ display: "inline-block" }}
                />
                <RipeImage
                    frame={this.state.frameData}
                    showInitials={true}
                    size={400}
                    ripe={this.state.ripeData}
                />
                <RipePrice ripe={this.state.ripeData} />
                <RipePickers ripe={this.state.ripeData} />
            </div>
        );
    }
}

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("Interaction Structure", () => {
        const brand = select(
            "Model",
            {
                Cube: {
                    brand: "dummy",
                    model: "cube",
                    version: 52
                },
                "Sergio Rossi": {
                    brand: "sergio_rossi",
                    model: "sr1_pump075"
                }
            },
            {
                brand: "dummy",
                model: "cube",
                version: 52
            }
        );
        const initials = text("Initials", "RIPE");
        const engraving = text("Engraving", "style:black");
        const currency = text("Currency", "EUR");
        const frame = text("Frame", "side-0");
        const ripe = new Ripe();

        return (
            <div>
                <Wrapper
                    brand={brand.brand}
                    model={brand.model}
                    version={brand.version}
                    parts={null}
                    initials={initials}
                    engraving={engraving}
                    currency={currency}
                    frame={frame}
                    ripe={ripe}
                />
            </div>
        );
    });
