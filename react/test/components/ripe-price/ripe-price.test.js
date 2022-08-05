import React from "react";
import assert from "assert";
import sinon from "sinon";
import { render } from "@testing-library/react";
import { Ripe } from "ripe-sdk";

import { RipePrice } from "../../../components";
import { TEST_TIMEOUT } from "../../config";

describe("RipePrice", function() {
    this.timeout(TEST_TIMEOUT);

    it("should instantiate the component", () => {
        const ripeInstance = new Ripe();
        const onLoading = sinon.fake();

        render(
            <RipePrice
                ripe={ripeInstance}
                currency={"USD"}
                onLoading={onLoading}
                onLoaded={() => {}}
            />
        );

        assert.strictEqual(onLoading.called, true);
    });
});
