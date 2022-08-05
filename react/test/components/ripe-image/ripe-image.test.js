import React from "react";
import assert from "assert";
import sinon from "sinon";
import { cleanup, render } from "@testing-library/react";
import { Ripe } from "ripe-sdk";

import { RipeImage } from "../../../components";
import { TEST_TIMEOUT } from "../../config";

afterEach(() => cleanup());

describe("RipeImage", function() {
    this.timeout(TEST_TIMEOUT);

    it("should instantiate the component", () => {
        const ripeInstance = new Ripe();
        const onLoading = sinon.fake();

        render(
            <RipeImage ripe={ripeInstance} size={1000} onLoading={onLoading} onLoaded={() => {}} />
        );

        assert.strictEqual(onLoading.called, true);
    });
});
