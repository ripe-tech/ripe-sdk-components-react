import "../../base";
import React from "react";
import assert from "assert";
import sinon from "sinon";
import { mount } from "enzyme";

import { RipeImageZoom } from "../../../components";

describe("RipeImageZoom", () => {
    it("should instantiate the component", () => {
        const onLoading = sinon.fake();
        mount(
            <RipeImageZoom
                brand={"dummy"}
                model={"cube"}
                version={52}
                size={1000}
                zoom={100}
                pivot={{ x: 0, y: 0 }}
                onLoading={onLoading}
                onLoaded={() => {}}
            />
        );

        assert.strictEqual(onLoading.called, true);
    });
});
