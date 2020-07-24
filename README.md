# RIPE SDK Components for React.js

React components for [RIPE SDK](https://github.com/ripe-tech/ripe-sdk).

## Configurator

The configurator component provides an interactive configuration experience inside a DOM. The user can interact with a model by rotating, highlighting and selecting it.

The configurator can receive the following parameters:

| Prop          | Type       | Required | Description                                                                                                                                    |
| ------------- | ---------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| brand         | `String`   | `true`   | The brand of the model.                                                                                                                        |
| model         | `String`   | `true`   | The name of the model.                                                                                                                         |
| version       | `Number`   | `true`   | The version of the build.                                                                                                                      |
| parts         | `Object`   | `false`  | The model's customization.                                                                                                                     |
| frame         | `String`   | `false`  | The name of the frame to be shown in the configurator. For example, frame `1` on `side` would be `side-1`, and a `top` frame would be `top-1`. |
| size          | `Number`   | `false`  | The size (in pixels) of the configurator. If not defined, the configurator will use all the screen space available.                            |
| loader        | `Boolean`  | `false`  | Flag for showing a loader when the configurator is loading.                                                                                    |
| ripe          | `Number`   | `false`  | Instance of Ripe SDK initialized, if not defined, the global Ripe SDK instance will be used.                                                   |
| onUpdateFrame | `Function` | `false`  | Callback called when the frame in the configurator is changed.                                                                                 |
| onLoading     | `Function` | `false`  | Callback called when the configurator is loading.                                                                                              |
| onLoaded      | `Function` | `false`  | Callback called when the configurator has loaded.                                                                                              |

An example of an instantiation and the correspondent view:

```javascript
<RipeConfigurator
    brand={"dummy"}
    model={"cube"}
    version={52}
    size={1000}
    onUpdateFrame={frame => {}}
    onLoading={() => {}}
    onLoaded={() => {}}
/>
```

![Configurator Example](res/images/configurator.gif)

The frame can be controlled externally to the component, by changing the prop `frame`:

```javascript
<RipeConfigurator
    brand={"dummy"}
    model={"cube"}
    version={52}
    size={1000}
    frame={"top-0"}
    onUpdateFrame={frame => {}}
    onLoading={() => {}}
    onLoaded={() => {}}
/>
```

![Configurator with Frame Example](res/images/configurator-frame.gif)

The customization of the model can also be provided, with the prop `parts`:

```javascript
<RipeConfigurator
    brand={"dummy"}
    model={"cube"}
    version={52}
    size={1000}
    frame={"side-4"}
    parts={{
        side: {
            color: 'blue',
            material: 'leather_cbe',
            face: 'side'
        },
        shadow: {
            color: 'default',
            hidden: true,
            material: 'default'
        },
        top0_bottom: {
            color: 'red',
            face: 'side',
            material: 'leather_cbe'
        }
    }}
    onUpdateFrame={frame => {}}
    onLoading={() => {}}
    onLoaded={() => {}}
/>
```

![Configurator with Parts Example](res/images/configurator-parts.gif)

There can be more than one configurator using the same instance of Ripe SDK:

```javascript
<RipeConfigurator
    brand={"dummy"}
    model={"cube"}
    version={52}
    size={500}
    ripe={this.ripe}
    onUpdateFrame={frame => {}}
    onLoading={() => {}}
    onLoaded={() => {}}
/>
<RipeConfigurator
    brand={"dummy"}
    model={"cube"}
    version={52}
    size={500}
    frame={"side-10"}
    ripe={this.ripe}
    onUpdateFrame={frame => {}}
    onLoading={() => {}}
    onLoaded={() => {}}
/>
```

Which uses a Ripe SDK instance that can be initialized like this:

```javascript
this.ripe = new Ripe();
await this.ripe.config("dummy", "cube", {
    version: 52
});
```

![Multiple Configurators](res/images/configurator-multiple.gif)