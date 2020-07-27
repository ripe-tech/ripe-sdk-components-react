import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, number, boolean } from "@storybook/addon-knobs";

import { RipeConfigurator } from "./ripe-configurator";

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("RipeConfigurator", () => {
        const brand = text("Brand", "dummy");
        const model = text("Model", "cube");
        const version = number("Version", 52);
        const frame = text("Frame", "side-4");
        const size = number("Size", 1000);
        const loader = boolean("Show loader", true);
        return (
            <RipeConfigurator
                brand={brand}
                model={model}
                version={version}
                frame={frame}
                size={size}
                loader={loader}
            />
        );
    });
