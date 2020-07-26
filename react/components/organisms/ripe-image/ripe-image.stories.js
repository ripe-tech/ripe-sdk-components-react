import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, number } from "@storybook/addon-knobs";

import { RipeImage } from "./ripe-image";

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("RipeImage", () => {
        const brand = text("Brand", "dummy");
        const model = text("Model", "cube");
        const version = number("Version", 52);
        const frame = text("Frame", "side-4");
        const size = number("Size", 1000);
        return (
            <RipeImage brand={brand} model={model} version={version} frame={frame} size={size} />
        );
    });
