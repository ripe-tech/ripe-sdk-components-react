import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, number, boolean } from "@storybook/addon-knobs";
import { Ripe } from "ripe-sdk";

import { RipeConfigurator } from "./ripe-configurator";

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("RipeConfigurator", () => {
        const brand = text("Brand", "dummy");
        const model = text("Model", "cube");
        const version = number("Version", 52);
        const frame = text("Frame", "side-4");
        const size = number("Size", 1000);
        const loader = boolean("Loader", true);
        const selectedPart = text("Selected Part", "side");
        const highlightedPart = text("Highlighted Part", "side");
        const sensitivity = number("Sensitivity", 40);
        const useMasks = boolean("Use Masks", true);
        const duration = number("Duration", 1000);
        const animation = text("Animation", "cross");
        const format = text("Format", "png");
        const ripe = new Ripe();

        return (
            <RipeConfigurator
                brand={brand}
                model={model}
                version={version}
                frame={frame}
                size={size}
                loader={loader}
                selectedPart={selectedPart}
                highlightedPart={highlightedPart}
                sensitivity={sensitivity}
                useMasks={useMasks}
                duration={duration}
                animation={animation}
                format={format}
                ripe={ripe}
                config={true}
            />
        );
    });
