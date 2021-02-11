import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, number, boolean } from "@storybook/addon-knobs";
import { Ripe } from "ripe-sdk";

import { RipeImage } from "./ripe-image";

storiesOf("Components/Organisms/Ripe Image", module)
    .addDecorator(withKnobs)
    .add("Ripe Image", () => {
        const brand = text("Brand", "dummy");
        const model = text("Model", "cube");
        const version = number("Version", 52);
        const parts = {
            side: {
                color: "blue",
                material: "leather_cbe",
                face: "side"
            },
            shadow: {
                color: "default",
                hidden: true,
                material: "default"
            },
            top0_bottom: {
                color: "red",
                face: "side",
                material: "leather_cbe"
            }
        };
        const initials = text("Initials", "");
        const engraving = text("Engraving", "style:black");
        const frame = text("Frame", "side-0");
        const size = number("Size", 1000);
        const format = text("Format", "png");
        const crop = boolean("Crop", true);
        const showInitials = boolean("Show Initials", true);
        const ripe = new Ripe();

        return (
            <RipeImage
                brand={brand}
                model={model}
                version={version}
                parts={parts}
                initials={initials}
                engraving={engraving}
                frame={frame}
                size={size}
                format={format}
                crop={crop}
                showInitials={showInitials}
                initialsGroup={"main"}
                ripe={ripe}
                config={true}
            />
        );
    });
