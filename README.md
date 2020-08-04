# RIPE SDK Components for React.js

React components for [RIPE SDK](https://github.com/ripe-tech/ripe-sdk).

## Configurator

The configurator component provides an interactive configuration experience inside a DOM. The user can interact with a model by rotating, highlighting and selecting it.

The configurator can receive the following parameters:

| Prop                    | Type       | Required | Description                                                                                                                                                        |
| ----------------------- | ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| brand                   | `String`   | `true`   | The brand of the model.                                                                                                                                            |
| model                   | `String`   | `true`   | The name of the model.                                                                                                                                             |
| version                 | `Number`   | `true`   | The version of the build.                                                                                                                                          |
| parts                   | `Object`   | `false`  | The model's customization.                                                                                                                                         |
| frame                   | `String`   | `false`  | The name of the frame to be shown in the configurator. For example, frame `1` on `side` would be `side-1`, and a `top` frame would be `top-1`.                     |
| size                    | `Number`   | `false`  | The size (in pixels) of the configurator. If not defined, the configurator will use all the screen space available.                                                |
| loader                  | `Boolean`  | `false`  | Flag for showing a loader when the configurator is loading.                                                                                                        |
| selectedPart            | `String`   | `false`  | Part of the model that is currently selected (eg: side).                                                                                                           |
| highlightedPart         | `String`   | `false`  | Part of the model that is currently highlighted (eg:side). Only possible if the usage of masks is enabled.                                                         |
| sensitivity             | `Number`   | `false`  | Configurator rotation sensitivity to the user mouse drag action. The bigger the number, more sensible it is.                                                       |
| useMasks                | `Boolean`  | `false`  | Usage of masks in the current model, necessary for the part highlighting action.                                                                                   |
| duration                | `Number`   | `false`  | The duration in milliseconds that the configurator frame transition should take.                                                                                   |
| animation           | `String`   | `false`  | The configurator animation style: 'simple' (fade in), 'cross' (crossfade) or 'null'.                                                                               |
| format                  | `String`   | `false`  | The format of the configurator image, (eg: png, jpg, svg, etc.).                                                                                                   |
| ripe                    | `Number`   | `false`  | Instance of Ripe SDK initialized, if not defined, the global Ripe SDK instance will be used.                                                                       |
| onUpdateFrame           | `Function` | `false`  | Callback called when the frame in the configurator is changed.                                                                                                     |
| onUpdateSelectedPart    | `Function` | `false`  | Callback when a part of the model in the configurator is selected.                                                                                                 |
| onUpdateHighlightedPart | `Function` | `false`  | Callback when a part of the model in the configurator is highlighted, normally with a mouse hover of by changing the prop. Only functional when masks are enabled. |
| onLoading               | `Function` | `false`  | Callback called when the configurator is loading.                                                                                                                  |
| onLoaded                | `Function` | `false`  | Callback called when the configurator has loaded.                                                                                                                  |

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
            color: "blue",
            material: "leather_cbe",
            face: "side"
        },
        shadow: {
            color: "default",
            hidden: true,
            material: "default"
        },
        top0_bottom: {
            color: "red",
            face: "side",
            material: "leather_cbe"
        }
    }}
    onUpdateFrame={frame => {}}
    onLoading={() => {}}
    onLoaded={() => {}}
/>
```

![Configurator with Parts Example](res/images/configurator-parts.gif)

The sensitivity, duration and other configurator attributes when first building the component. This attributes in addition to brand, model and version can later be changed, causing the configurator to load again.
It is also possible to define the highlighted part of the configurator, which will use masks to identify it. However, this highlighted part will only show after the first build of the configurator.

```javascript
<RipeConfigurator
    brand={"dummy"}
    model={"cube"}
    version={52}
    size={500}
    loader={true}
    selectedPart={"side"}
    highlightedPart={"side"}
    sensitivity={1000}
    useMasks={true}
    duration={1000}
    animation={"cross"}
    format={"png"}
    onUpdateFrame={frame => {}}
    onUpdateSelectedPart={part => {}}
    onUpdateHighlightedPart={part => {}}
    onLoading={() => {}}
    onLoaded={() => {}}
/>
```

![Configurator with Increased Sensitivity](res/images/configurator-sensitivity.gif)

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

## Image

The image component allows for the visualization of a given model.

The image can receive the following parameters:

| Prop      | Type       | Required | Description                                                                                                                                    |
| --------- | ---------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| brand     | `String`   | `true`   | The brand of the model.                                                                                                                        |
| model     | `String`   | `true`   | The name of the model.                                                                                                                         |
| version   | `Number`   | `true`   | The version of the build.                                                                                                                      |
| parts     | `Object`   | `false`  | The model's customization.                                                                                                                     |
| frame     | `String`   | `false`  | The name of the frame to be shown in the configurator. For example, frame `1` on `side` would be `side-1`, and a `top` frame would be `top-1`. |
| size      | `Number`   | `false`  | The size (in pixels) of the configurator. If not defined, the configurator will use all the screen space available.                            |
| ripe      | `Number`   | `false`  | Instance of Ripe SDK initialized, if not defined, the global Ripe SDK instance will be used.                                                   |
| onLoading | `Function` | `false`  | Callback called when the configurator is loading.                                                                                              |
| onLoaded  | `Function` | `false`  | Callback called when the configurator has loaded.                                                                                              |

An example of an instantiation and the correspondent view:

```javascript
<RipeImage
    brand={"dummy"}
    model={"cube"}
    version={52}
    size={500}
    onLoading={() => {}}
    onLoaded={() => {}}
/>
```

![Image Example](res/images/image.png)

Similar to the configurator, the frame can be controlled externally to the component, by changing the prop `frame`:

```javascript
<RipeImage
    brand={"dummy"}
    model={"cube"}
    version={52}
    size={1000}
    frame={"top-0"}
    onLoading={() => {}}
    onLoaded={() => {}}
/>
```

![Image with Frame Example](res/images/image-frame.png)

The customization of the model can also be provided, with the `prop` parts:

```javascript
<RipeImage
    brand={"dummy"}
    model={"cube"}
    version={52}
    size={1000}
    frame={"side-4"}
    parts={{
        side: {
            color: "blue",
            material: "leather_cbe",
            face: "side"
        },
        shadow: {
            color: "default",
            hidden: true,
            material: "default"
        },
        top0_bottom: {
            color: "red",
            face: "side",
            material: "leather_cbe"
        }
    }}
    onLoading={() => {}}
    onLoaded={() => {}}
/>
```

![Image with Parts Example](res/images/image-parts.png)

There can be more than one image using the same instance of Ripe SDK:

```javascript
<RipeImage
    brand={"dummy"}
    model={"cube"}
    version={52}
    size={500}
    ripe={this.ripe}
    onLoading={() => {}}
    onLoaded={() => {}}
/>
<RipeImage
    brand={"dummy"}
    model={"cube"}
    version={52}
    size={500}
    frame={"side-10"}
    ripe={this.ripe}
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

![Multiple Images](res/images/multiple-images.png)

## Pickers

The pickers component allows for the customization of a model, by choosing materials and colors for its parts.

The pickers can receive the following parameters:

| Prop                    | Type       | Required | Description                                                                                                                                                        |
| ----------------------- | ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ripe                    | `Object`   | `true`   | Instance of Ripe SDK initialized.                                                                                                                                  |
| onUpdateHighlightedPart | `Function` | `false`  | Callback when a part of the model in the configurator is highlighted, normally with a mouse hover of by changing the prop. Only functional when masks are enabled. |
| onUpdateParts           | `Function` | `false`  | Callback when parts of the model are changed, meaning that a new customization was made.                                                                           |
| onLoading               | `Function` | `false`  | Callback called when the configurator is loading.                                                                                                                  |
| onLoaded                | `Function` | `false`  | Callback called when the configurator has loaded.                                                                                                                  |

The pickers component will wait for the RIPE configuration to be completed in order to have access to its parts and materials.

An example of an instantiation and the correspondent view:

```javascript
this.ripe = new Ripe();
await this.ripe.config("dummy", "cube", {
    version: 52
});
```

```javascript
<RipePickers ripe={ripe} />
```

![Pickers Example](res/images/pickers.gif)

The pickers can interact with an existing configurator, by using the same RIPE instance:

![Pickers with Configurator Example](res/images/pickers_configurator.gif)

## Price

The price component allows for the visualization of the price of a model, according to the currency provided.

The price can receive the following parameters:

| Prop          | Type       | Required | Description                                                                                                                |
| ------------- | ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| brand         | `String`   | `true`   | The brand of the model.                                                                                                    |
| model         | `String`   | `true`   | The name of the model.                                                                                                     |
| version       | `Number`   | `true`   | The version of the build.                                                                                                  |
| parts         | `Object`   | `false`  | The model's customization.                                                                                                 |
| currency      | `String`   | `true`   | The `ISO 4217` currency code in which the price will be displayed.                                                         |
| ripe          | `Number`   | `false`  | Instance of Ripe SDK initialized, if not defined, the global Ripe SDK instance will be used.                               |
| onUpdatePrice | `Function` | `false`  | Callback when the price of the model changes. It can be triggered when the currency is changed or the model and its parts. |
| onLoading     | `Function` | `false`  | Callback called when the configurator is loading.                                                                          |
| onLoaded      | `Function` | `false`  | Callback called when the configurator has loaded.                                                                          |

An example of an instantiation and the correspondent view:

```javascript
<RipePrice brand={"dummy"} model={"cube"} version={52} currency={"USD"} />
```

![Price Example](res/images/price.png)

Different customizations can result in different prices. Below is an example of a more expensive customization in both dollars and euros:

```javascript
<RipePrice
    brand={"dummy"}
    model={"cube"}
    version={52}
    currency={"EUR"}
    parts={{
        side: {
            color: "black",
            material: "crocodile_cbe",
            face: "side"
        },
        shadow: {
            color: "default",
            hidden: true,
            material: "default"
        },
        top0_bottom: {
            color: "fuchsia",
            face: "side",
            material: "suede_cbe"
        }
    }}
/>
```

```javascript
<RipePrice
    brand={"dummy"}
    model={"cube"}
    version={52}
    currency={"USD"}
    parts={{
        side: {
            color: "black",
            material: "crocodile_cbe",
            face: "side"
        },
        shadow: {
            color: "default",
            hidden: true,
            material: "default"
        },
        top0_bottom: {
            color: "fuchsia",
            face: "side",
            material: "suede_cbe"
        }
    }}
/>
```

![Price Complex Example EUR](res/images/price-complex-eur.png)
![Price Complex Example USD](res/images/price-complex-usd.png)
