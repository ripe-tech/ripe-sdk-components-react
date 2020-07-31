import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, number } from "@storybook/addon-knobs";

import { RipePrice } from "./ripe-price";

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("RipePrice", () => {
        const brand = text("Brand", "dummy");
        const model = text("Model", "cube");
        const version = number("Version", 52);
        const currency = text("Currency", "USD");
        return (
            <RipePrice
                brand={brand}
                model={model}
                version={version}
                currency={currency}
                parts={{
                    side: {
                        color: "black",
                        material: "leather_cbe",
                        face: "side"
                    },
                    shadow: {
                        color: "default",
                        hidden: true,
                        material: "default"
                    },
                    top0_bottom: {
                        color: "black",
                        face: "side",
                        material: "leather_cbe"
                    }
                }}
            />
        );
    });
