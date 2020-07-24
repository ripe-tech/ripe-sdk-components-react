import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, number } from "@storybook/addon-knobs";

import { Loader } from "./loader";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Loader", () => {
        const loader = text("Loader", "ball-pulse");
        const count = number("Count", 3);
        return <Loader loader={loader} count={count} />;
    });
