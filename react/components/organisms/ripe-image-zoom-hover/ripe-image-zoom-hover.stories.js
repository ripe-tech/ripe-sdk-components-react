import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, number, boolean } from "@storybook/addon-knobs";
import { Ripe } from "ripe-sdk";

import { RipeImageZoomHover } from "./ripe-image-zoom-hover";

storiesOf("Components/Organisms/Ripe Image Zoom Hover", module)
    .addDecorator(withKnobs)
    .add("Ripe Image Zoom Hover", () => {
        const brand = text("Brand", "dummy");
        const model = text("Model", "cube");
        const version = number("Version", 52);
        const frame = text("Frame", "side-0");
        const size = number("Size", 1000);
        const format = text("Format", "png");
        const crop = boolean("Crop", true);
        const showInitials = boolean("Show Initials", true);
        const zoom = number("Zoom", 140);
        const maxZoom = number("Max Zoom", 500);
        const minZoom = number("Min Zoom", 10);
        const scrollZoom = boolean("Enable Scroll Zoom", true);
        const scrollSensitivity = number("Scroll Zoom Sensitivity", 1);
        const zoomOut = boolean("Enable Zoom Out", false);
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
            <RipeImageZoomHover
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
                maxZoom={maxZoom}
                minZoom={minZoom}
                scrollZoom={scrollZoom}
                scrollSensitivity={scrollSensitivity}
                zoomOut={zoomOut}
            />
        );
    });
