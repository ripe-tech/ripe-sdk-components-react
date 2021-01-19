import "../../base";
import React from "react";
import assert from "assert";
import sinon from "sinon";
import { mount } from "enzyme";

import { Ripe } from "ripe-sdk";

import { TEST_TIMEOUT } from "../../config";

import { RipePickers } from "../../../components";

describe("RipePickers", function() {
    this.timeout(TEST_TIMEOUT);

    it("should instantiate the component", () => {
        const onLoading = sinon.fake();
        const ripe = new Ripe("dummy", "cube", {
            version: 52
        });

        mount(<RipePickers ripe={ripe} onLoading={onLoading} />);

        assert.strictEqual(onLoading.called, true);
    });
});
