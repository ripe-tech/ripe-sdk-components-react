import "../../base";
import React from "react";
import assert from "assert";
import sinon from "sinon";
import { mount } from "enzyme";

import { RipeConfigurator } from "../../../components";

describe("RipeConfigurator", () => {
    it("should instantiate the component", () => {
        const onLoading = sinon.fake();
        const component = mount(
            <RipeConfigurator
                brand={"dummy"}
                model={"cube"}
                version={52}
                size={1000}
                loader={true}
                onUpdateFrame={frame => {}}
                onLoading={onLoading}
                onLoaded={() => {}}
            />
        );
        const loader = component.find(".loader");

        assert.strictEqual(loader.exists(), true);
        assert.strictEqual(onLoading.called, true);
    });
});
