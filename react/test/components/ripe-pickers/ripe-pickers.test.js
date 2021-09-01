import "../../base";
import React from "react";
import assert from "assert";
import sinon from "sinon";
import { mount } from "enzyme";

import { Ripe } from "ripe-sdk";

import { TEST_TIMEOUT } from "../../config";

import { RipePickers } from "../../../components";

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
        const component = mount(<RipePickers ripe={ripeInstance} onLoading={onLoading} />);

        assert.strictEqual(onLoading.called, true);

        await component.instance().componentDidMount();
        await ripeInstance.isReady();
        ripeInstance.setChoices(_choices);

        component.update();

        assert.strictEqual(component.find(".select-parts").exists(), true);
        assert.strictEqual(component.find(".select-materials").exists(), true);
        assert.strictEqual(component.find(".select-colors").exists(), true);
        assert.strictEqual(component.find(".select-parts").find("option").length, 4);
        assert.strictEqual(component.find(".select-materials").find("option").length, 1);
        assert.strictEqual(component.find(".select-colors").find("option").length, 1);
    });

    it("should sync selects options", async () => {
        const ripeInstance = new Ripe("dummy", "cube", {
            version: 52,
            parts: _parts
        });
        const onLoading = sinon.fake();
        const component = mount(<RipePickers ripe={ripeInstance} onLoading={onLoading} />);

        assert.strictEqual(onLoading.called, true);

        await component.instance().componentDidMount();
        await ripeInstance.isReady();
        ripeInstance.setChoices(_choices);

        component.update();

        await component.instance()._onSelectPartChange("side");
        component.update();
        assert.strictEqual(component.find(".select-parts").find("option").length, 4);
        assert.strictEqual(component.find(".select-materials").find("option").length, 4);
        assert.strictEqual(component.find(".select-colors").find("option").length, 1);

        await component.instance()._onSelectPartChange("patch");
        component.update();
        assert.strictEqual(component.find(".select-parts").find("option").length, 4);
        assert.strictEqual(component.find(".select-materials").find("option").length, 2);
        assert.strictEqual(component.find(".select-colors").find("option").length, 3);

        await component.instance()._onSelectPartChange("top0_bottom");
        component.update();
        assert.strictEqual(component.find(".select-parts").find("option").length, 4);
        assert.strictEqual(component.find(".select-materials").find("option").length, 4);
        assert.strictEqual(component.find(".select-colors").find("option").length, 1);

        await component.instance()._onSelectPartChange("side");
        await component.instance()._onSelectMaterialChange("crocodile_cbe");
        component.update();
        assert.strictEqual(component.find(".select-parts").find("option").length, 4);
        assert.strictEqual(component.find(".select-materials").find("option").length, 4);
        assert.strictEqual(component.find(".select-colors").find("option").length, 3);

        await component.instance()._onSelectPartChange("side");
        await component.instance()._onSelectMaterialChange("leather_cbe");
        component.update();
        assert.strictEqual(component.find(".select-parts").find("option").length, 4);
        assert.strictEqual(component.find(".select-materials").find("option").length, 4);
        assert.strictEqual(component.find(".select-colors").find("option").length, 5);

        await component.instance()._onSelectPartChange("top0_bottom");
        await component.instance()._onSelectMaterialChange("leather_cbe");
        component.update();
        assert.strictEqual(component.find(".select-parts").find("option").length, 4);
        assert.strictEqual(component.find(".select-materials").find("option").length, 4);
        assert.strictEqual(component.find(".select-colors").find("option").length, 5);

        await component.instance()._onSelectPartChange("top0_bottom");
        await component.instance()._onSelectMaterialChange("suede_cbe");
        component.update();
        assert.strictEqual(component.find(".select-parts").find("option").length, 4);
        assert.strictEqual(component.find(".select-materials").find("option").length, 4);
        assert.strictEqual(component.find(".select-colors").find("option").length, 4);
    });
});
