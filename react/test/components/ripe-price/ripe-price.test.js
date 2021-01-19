import "../../base";
import React from "react";
import assert from "assert";
import sinon from "sinon";
import { mount } from "enzyme";

import { TEST_TIMEOUT } from "../../config";

import { RipePrice } from "../../../components";

describe("RipePrice", function() {
    this.timeout(TEST_TIMEOUT);

    it("should instantiate the component", () => {
        const onLoading = sinon.fake();
        mount(
            <RipePrice
                brand={"dummy"}
                model={"cube"}
                version={52}
                currency={"USD"}
                onLoading={onLoading}
                onLoaded={() => {}}
            />
        );

        assert.strictEqual(onLoading.called, true);
    });
});
