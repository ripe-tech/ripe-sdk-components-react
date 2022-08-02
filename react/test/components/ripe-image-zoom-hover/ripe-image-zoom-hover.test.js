import React from "react";
import assert from "assert";
import sinon from "sinon";
import { render } from "@testing-library/react";
import { Ripe } from "ripe-sdk";

import { RipeImageZoomHover } from "../../../components";
import { TEST_TIMEOUT } from "../../config";

describe("RipeImageZoomHover", function() {
    this.timeout(TEST_TIMEOUT);

    it("should instantiate the component", () => {
        const ripeInstance = new Ripe();
        const onLoading = sinon.fake();

        render(
            <RipeImageZoomHover
                ripe={ripeInstance}
                size={1000}
                zoom={100}
                scrollZoom={true}
                scrollSensitivity={1}
                onLoading={onLoading}
                onLoaded={() => {}}
            />
        );

        assert.strictEqual(onLoading.called, true);
    });
});
