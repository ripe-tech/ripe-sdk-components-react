import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, number, boolean } from "@storybook/addon-knobs";
import { Ripe } from "ripe-sdk";

import { RipeImageZoom } from "./ripe-image-zoom";

storiesOf("Components/Organisms/Ripe Image Zoom", module)
    .addDecorator(withKnobs)
    .add("Ripe Image Zoom", () => {
        const brand = text("Brand", "dummy");
        const model = text("Model", "cube");
        const version = number("Version", 52);
        const frame = text("Frame", "side-0");
        const size = number("Size", 1000);
        const format = text("Format", "png");
        const crop = boolean("Crop", true);
        const showInitials = boolean("Show Initials", true);
        const zoom = number("Zoom", 100);
        const pivotX = number("Pivot X (pixels)", 100);
        const pivotY = number("Pivot Y (pixels)", 100);
        const state = {
            initialsExtra: {
                main: {
                    initials: "A",
                    engraving: "style:white"
                }
            }
        };
        const ripe = new Ripe();

        return (
            <RipeImageZoom
                brand={brand}
                model={model}
                version={version}
                frame={frame}
                size={size}
                format={format}
                crop={crop}
                showInitials={showInitials}
                initialsGroup={"main"}
                ripe={ripe}
                config={true}
                state={state}
                zoom={zoom}
                pivot={{ x: pivotX, y: pivotY }}
            />
        );
    });
