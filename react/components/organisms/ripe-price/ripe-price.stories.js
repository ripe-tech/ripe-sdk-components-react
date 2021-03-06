import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, number } from "@storybook/addon-knobs";
import { Ripe } from "ripe-sdk";

import { RipePrice } from "./ripe-price";

storiesOf("Components/Organisms/Ripe Price", module)
    .addDecorator(withKnobs)
    .add("Ripe Price", () => {
        const brand = text("Brand", "dummy");
        const model = text("Model", "cube");
        const version = number("Version", 52);
        const parts = {
            side: {
                color: "black",
                material: "crocodile_cbe",
                face: "side"
            },
            shadow: {
                color: "default",
                hidden: true,
                material: "default"
            },
            top0_bottom: {
                color: "fuchsia",
                face: "side",
                material: "suede_cbe"
            }
        };
        const currency = text("Currency", "USD");
        const ripe = new Ripe();

        return (
            <RipePrice
                brand={brand}
                model={model}
                version={version}
                parts={parts}
                currency={currency}
                ripe={ripe}
                config={true}
            />
        );
    });
