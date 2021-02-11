import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, select } from "@storybook/addon-knobs";
import { Ripe } from "ripe-sdk";

import { RipeConfigurator } from "./ripe-configurator";
import { RipeImage } from "./ripe-image";
import { RipePrice } from "./ripe-price";
import { RipePickers } from "./ripe-pickers";

storiesOf("Components/Organisms/Interaction", module)
    .addDecorator(withKnobs)
    .add("Interaction", () => {
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
                <RipeConfigurator
                    brand={brand.brand}
                    model={brand.model}
                    version={brand.version}
                    initials={initials}
                    engraving={engraving}
                    currency={currency}
                    size={400}
                    ripe={ripe}
                    config={true}
                    style={{ display: "inline-block" }}
                />
                <RipeImage frame={frame} showInitials={true} size={400} ripe={ripe} />
                <RipePrice ripe={ripe} />
                <RipePickers ripe={ripe} />
            </div>
        );
    });
