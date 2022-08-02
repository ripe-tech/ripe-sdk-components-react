import React from "react";
import assert from "assert";
import sinon from "sinon";
import { cleanup, render } from "@testing-library/react";
import { Ripe } from "ripe-sdk";

import { RipeConfigurator } from "../../../components";
import { TEST_TIMEOUT } from "../../config";

describe("RipeConfigurator", function() {
    afterEach(() => cleanup());
    this.timeout(TEST_TIMEOUT);

    it("should instantiate the component", () => {
        const ripeInstance = new Ripe();
        const onLoading = sinon.fake();

        const { container } = render(
            <RipeConfigurator
                size={1000}
                loader={true}
                ripe={ripeInstance}
                onUpdateFrame={frame => {}}
                onLoading={onLoading}
                onLoaded={() => {}}
            />
        );
        const loaders = container.getElementsByClassName("loader");

        assert.strictEqual(loaders.length, 1);
        assert.strictEqual(onLoading.called, true);
    });
});
