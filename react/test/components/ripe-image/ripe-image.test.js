import "../../base";
import React from "react";
import assert from "assert";
import sinon from "sinon";
import { mount } from "enzyme";

import { RipeImage } from "../../../components";

describe("RipeImage", () => {
    it("should instantiate the component", () => {
        const onLoading = sinon.fake();
        mount(
            <RipeImage
                brand={"dummy"}
                model={"cube"}
                version={52}
                size={1000}
                onLoading={onLoading}
                onLoaded={() => {}}
            />
        );

        assert.strictEqual(onLoading.called, true);
    });
});
