import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { Ripe } from "ripe-sdk";

import { RipePickers } from "./ripe-pickers";

const ripe = new Ripe("dummy", "cube", {
    version: 52
});

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("RipePickers", () => {
        return <RipePickers ripe={ripe} />;
    });
