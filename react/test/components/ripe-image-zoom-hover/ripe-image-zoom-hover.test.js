import "../../base";
import React from "react";
import assert from "assert";
import sinon from "sinon";
import { mount } from "enzyme";

import { RipeImageZoomHover } from "../../../components";

describe("RipeImageZoomHover", () => {
    it("should instantiate the component", () => {
        const onLoading = sinon.fake();
        mount(
            <RipeImageZoomHover
                brand={"dummy"}
                model={"cube"}
                version={52}
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
