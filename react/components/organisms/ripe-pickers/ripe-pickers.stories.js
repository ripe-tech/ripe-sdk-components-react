import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { Ripe } from "ripe-sdk";

import { RipePickers } from "./ripe-pickers";

const ripe = new Ripe("dummy", "cube", {
    version: 52,
    parts: {
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
    }
});

storiesOf("Components/Organisms/RipePickers", module)
    .addDecorator(withKnobs)
    .add("RipePickers", () => {
        return <RipePickers ripe={ripe} />;
    });
