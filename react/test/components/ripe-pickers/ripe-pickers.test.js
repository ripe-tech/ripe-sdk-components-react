import React from "react";
import assert from "assert";
import sinon from "sinon";
import { render, waitFor } from "@testing-library/react";
import { Ripe } from "ripe-sdk";

import { RipePickers } from "../../../components";
import { TEST_TIMEOUT } from "../../config";

const _parts = {
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
};
const _choices = {
    side: {
        available: true,
        materials: {
            crocodile_cbe: {
                available: true,
                colors: { black: { available: true }, chestnut: { available: true } }
            },
            leather_cbe: {
                available: true,
                colors: {
                    black: { available: true },
                    blue: { available: true },
                    brown: { available: true },
                    red: { available: true }
                }
            },
            suede_cbe: {
                available: true,
                colors: {
                    blue: { available: true },
                    fuchsia: { available: true },
                    red: { available: true }
                }
            }
        }
    },
    top0_bottom: {
        available: true,
        materials: {
            crocodile_cbe: {
                available: true,
                colors: { black: { available: true }, chestnut: { available: true } }
            },
            leather_cbe: {
                available: true,
                colors: {
                    black: { available: true },
                    blue: { available: true },
                    brown: { available: true },
                    red: { available: true }
                }
            },
            suede_cbe: {
                available: true,
                colors: {
                    blue: { available: true },
                    fuchsia: { available: true },
                    red: { available: true }
                }
            }
        }
    },
    patch: {
        available: true,
        materials: {
            patch_cbe: {
                available: true,
                colors: { smiley: { available: true }, egg: { available: true } }
            }
        }
    }
};

describe("RipePickers", function() {
    this.timeout(TEST_TIMEOUT);

    it("should instantiate the component", async () => {
        const ripeInstance = new Ripe("dummy", "cube", {
            version: 52,
            parts: _parts
        });

        const onLoading = sinon.fake();
        const component = render(<RipePickers ripe={ripeInstance} onLoading={onLoading} />);

        assert.strictEqual(onLoading.called, true);

        await ripeInstance.isReady();
        ripeInstance.setChoices(_choices);

        // waits for the component to rerender and re-calculate
        // the picker options
        await waitFor(() => component.getByText("Side"));

        assert.strictEqual(component.container.getElementsByClassName("select-parts").length, 1);
        assert.strictEqual(
            component.container.getElementsByClassName("select-materials").length,
            1
        );
        assert.strictEqual(component.container.getElementsByClassName("select-colors").length, 1);
        assert.strictEqual(component.container.querySelectorAll(".select-parts option").length, 4);
        assert.strictEqual(
            component.container.querySelectorAll(".select-materials option").length,
            1
        );
        assert.strictEqual(component.container.querySelectorAll(".select-colors option").length, 1);
    });

    it("should sync selects options", async () => {
        const ripeInstance = new Ripe("dummy", "cube", {
            version: 52,
            parts: _parts
        });
        const ref = React.createRef();
        const onLoading = sinon.fake();
        const component = render(
            <RipePickers ripe={ripeInstance} onLoading={onLoading} ref={ref} />
        );

        assert.strictEqual(onLoading.called, true);

        await ripeInstance.isReady();
        ripeInstance.setChoices(_choices);

        // waits for the component to rerender and re-calculate
        // the picker options
        await waitFor(() => component.getByText("Side"));

        assert.strictEqual(component.container.querySelectorAll(".select-parts option").length, 4);
        assert.strictEqual(
            component.container.querySelectorAll(".select-materials option").length,
            1
        );
        assert.strictEqual(component.container.querySelectorAll(".select-colors option").length, 1);

        await ref.current._onSelectPartChange("patch");
        assert.strictEqual(component.container.querySelectorAll(".select-parts option").length, 4);
        assert.strictEqual(
            component.container.querySelectorAll(".select-materials option").length,
            2
        );
        assert.strictEqual(component.container.querySelectorAll(".select-colors option").length, 3);

        await ref.current._onSelectPartChange("top0_bottom");
        assert.strictEqual(component.container.querySelectorAll(".select-parts option").length, 4);
        assert.strictEqual(
            component.container.querySelectorAll(".select-materials option").length,
            4
        );
        assert.strictEqual(component.container.querySelectorAll(".select-colors option").length, 1);

        await ref.current._onSelectPartChange("side");
        await ref.current._onSelectMaterialChange("crocodile_cbe");
        assert.strictEqual(component.container.querySelectorAll(".select-parts option").length, 4);
        assert.strictEqual(
            component.container.querySelectorAll(".select-materials option").length,
            4
        );
        assert.strictEqual(component.container.querySelectorAll(".select-colors option").length, 3);

        await ref.current._onSelectPartChange("side");
        await ref.current._onSelectMaterialChange("leather_cbe");
        assert.strictEqual(component.container.querySelectorAll(".select-parts option").length, 4);
        assert.strictEqual(
            component.container.querySelectorAll(".select-materials option").length,
            4
        );
        assert.strictEqual(component.container.querySelectorAll(".select-colors option").length, 5);

        await ref.current._onSelectPartChange("top0_bottom");
        await ref.current._onSelectMaterialChange("leather_cbe");
        assert.strictEqual(component.container.querySelectorAll(".select-parts option").length, 4);
        assert.strictEqual(
            component.container.querySelectorAll(".select-materials option").length,
            4
        );
        assert.strictEqual(component.container.querySelectorAll(".select-colors option").length, 5);

        await ref.current._onSelectPartChange("top0_bottom");
        await ref.current._onSelectMaterialChange("suede_cbe");
        assert.strictEqual(component.container.querySelectorAll(".select-parts option").length, 4);
        assert.strictEqual(
            component.container.querySelectorAll(".select-materials option").length,
            4
        );
        assert.strictEqual(component.container.querySelectorAll(".select-colors option").length, 4);
    });
});
