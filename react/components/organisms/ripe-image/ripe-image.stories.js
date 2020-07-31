import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, number, boolean } from "@storybook/addon-knobs";

import { RipeImage } from "./ripe-image";

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("RipeImage", () => {
        const brand = text("Brand", "dummy");
        const model = text("Model", "cube");
        const version = number("Version", 52);
        const frame = text("Frame", "side-0");
        const size = number("Size", 1000);
        const format = text("Format", "png");
        const crop = boolean("Crop", true);
        const showInitials = boolean("Show Initials", true);
        const state = {
            initialsExtra: {
                main: {
                    initials: "A",
                    engraving: "style:white"
                }
            }
        };

        return (
            <RipeImage
                brand={brand}
                model={model}
                version={version}
                frame={frame}
                size={size}
                format={format}
                crop={crop}
                showInitials={showInitials}
                initialsGroup={"main"}
                state={state}
            />
        );
    });
