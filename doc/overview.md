# Documentation - Overview

## Configurator

The configurator component provides an interactive configuration experience inside a DOM. The user can interact with a model by rotating, highlighting and selecting it.

The configurator can receive the following parameters:

| Prop                    | Type       | Required | Description                                                                                                                                                        |
| ----------------------- | ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| brand                   | `String`   | `false`  | The brand of the model.                                                                                                                                            |
| model                   | `String`   | `false`  | The name of the model.                                                                                                                                             |
| version                 | `Number`   | `false`  | The version of the build.                                                                                                                                          |
| config                  | `Boolean`  | `false`  | Indicates that the component should apply the config internally on component initialization.                                                                       |
| parts                   | `Object`   | `false`  | The model's customization.                                                                                                                                         |
| frame                   | `String`   | `false`  | The name of the frame to be shown in the configurator. For example, frame `1` on `side` would be `side-1`, and a `top` frame would be `top-1`.                     |
| size                    | `Number`   | `false`  | The size (in pixels) of the configurator. If not defined, the configurator will use all the screen space available.                                                |
| loader                  | `Boolean`  | `false`  | Flag for showing a loader when the configurator is loading.                                                                                                        |
| selectedPart            | `String`   | `false`  | Part of the model that is currently selected (eg: side).                                                                                                           |
| highlightedPart         | `String`   | `false`  | Part of the model that is currently highlighted (eg:side). Only possible if the usage of masks is enabled.                                                         |
| sensitivity             | `Number`   | `false`  | Configurator rotation sensitivity to the user mouse drag action. The bigger the number, more sensible it is.                                                       |
| useMasks                | `Boolean`  | `false`  | Usage of masks in the current model, necessary for the part highlighting action.                                                                                   |
| duration                | `Number`   | `false`  | The duration in milliseconds that the configurator frame transition should take.                                                                                   |
| animation               | `String`   | `false`  | The configurator animation style: 'simple' (fade in), 'cross' (crossfade) or 'null'.                                                                               |
| format                  | `String`   | `false`  | The format of the configurator image, (eg: png, jpg, svg, etc.).                                                                                                   |
| ripe                    | `Number`   | `false`  | Instance of Ripe SDK initialized, if not defined, the global Ripe SDK instance will be used.                                                                       |
| onUpdateFrame           | `Function` | `false`  | Callback called when the frame in the configurator is changed.                                                                                                     |
| onUpdateParts           | `Function` | `false`  | Callback called when the parts of the model are changed. This can be due to restrictions and rules of the model when applying a certain customization.             |
| onUpdateSelectedPart    | `Function` | `false`  | Callback when a part of the model in the configurator is selected.                                                                                                 |
| onUpdateHighlightedPart | `Function` | `false`  | Callback when a part of the model in the configurator is highlighted, normally with a mouse hover of by changing the prop. Only functional when masks are enabled. |
| onLoading               | `Function` | `false`  | Callback called when the configurator is loading.                                                                                                                  |
| onLoaded                | `Function` | `false`  | Callback called when the configurator has loaded.                                                                                                                  |

An example of an instantiation and the correspondent view:

```javascript static
<RipeConfigurator
    brand={"dummy"}
    model={"cube"}
    version={52}
    size={1000}
    onUpdateFrame={frame => {}}
    onUpdateParts={parts => {}}
    onLoading={() => {}}
    onLoaded={() => {}}
/>
```

![Configurator Example](/res/images/configurator.gif)

The frame can be controlled externally to the component, by changing the prop `frame`:

```javascript static
<RipeConfigurator
    brand={"dummy"}
    model={"cube"}
    version={52}
    size={1000}
    frame={"top-0"}
    onUpdateFrame={frame => {}}
    onUpdateParts={parts => {}}
    onLoading={() => {}}
    onLoaded={() => {}}
/>
```

![Configurator with Frame Example](/res/images/configurator-frame.gif)

The customization of the model can also be provided, with the prop `parts`:

```javascript static
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
    onUpdateParts={parts => {}}
    onLoading={() => {}}
    onLoaded={() => {}}
/>
```

![Configurator with Parts Example](/res/images/configurator-parts.gif)

The sensitivity, duration and other configurator attributes when first building the component. This attributes in addition to brand, model and version can later be changed, causing the configurator to load again.
It is also possible to define the highlighted part of the configurator, which will use masks to identify it. However, this highlighted part will only show after the first build of the configurator.

```javascript static
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
    onUpdateParts={parts => {}}
    onUpdateSelectedPart={part => {}}
    onUpdateHighlightedPart={part => {}}
    onLoading={() => {}}
    onLoaded={() => {}}
/>
```

![Configurator with Increased Sensitivity](/res/images/configurator-sensitivity.gif)

There can be more than one configurator using the same instance of Ripe SDK:

```javascript static
<RipeConfigurator
    brand={"dummy"}
    model={"cube"}
    version={52}
    size={500}
    ripe={this.ripe}
    onUpdateFrame={frame => {}}
    onUpdateParts={parts => {}}
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
    onUpdateParts={parts => {}}
    onLoading={() => {}}
    onLoaded={() => {}}
/>
```

Which uses a Ripe SDK instance that can be initialized like this:

```javascript static
this.ripe = new Ripe();
await this.ripe.config("dummy", "cube", {
    version: 52
});
```

![Multiple Configurators](/res/images/configurator-multiple.gif)

## Image

The image component allows for the visualization of a given model.

The image can receive the following parameters:

| Prop            | Type       | Required | Description                                                                                                                                                                                                |
| --------------- | ---------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| brand           | `String`   | `false`  | The brand of the model.                                                                                                                                                                                    |
| model           | `String`   | `false`  | The name of the model.                                                                                                                                                                                     |
| version         | `Number`   | `false`  | The version of the build.                                                                                                                                                                                  |
| config          | `Boolean`  | `false`  | Indicates that the component should apply the config internally on component initialization.                                                                                                               |
| parts           | `Object`   | `false`  | The model's customization.                                                                                                                                                                                 |
| frame           | `String`   | `false`  | The name of the frame to be shown in the configurator. For example, frame `1` on `side` would be `side-1`, and a `top` frame would be `top-1`.                                                             |
| size            | `Number`   | `false`  | The size (in pixels) of the configurator. If not defined, the configurator will use all the screen space available.                                                                                        |
| format          | `String`   | `false`  | The format of the image, (eg: png, jpg, svg, etc.). Defaults to 'png'.                                                                                                                                     |
| crop            | `Boolean`  | `false`  | Indicates that the image composition is to be cropped. Crops the current image according to the minimal possible bounding box in both x and y axis.                                                        |
| showInitials    | `Boolean`  | `false`  | Indicates if the personalization should be shown. Defaults to `false`.                                                                                                                                     |
| initialsGroup   | `String`   | `false`  | The group in which the image initials belongs to.                                                                                                                                                          |
| initialsBuilder | `Function` | `false`  | A function that receives the initials and engraving as strings and the img element that will be used and returns a map with the initials and a profile list.                                               |
| state           | `Object`   | `false`  | An object containing the state of the personalization. For each group of the model it can contain the initials and the corresponding engraving (eg. { main: { initials: "AB", engraving: "style:grey" }}). |
| ripe            | `Number`   | `false`  | Instance of Ripe SDK initialized, if not defined, the global Ripe SDK instance will be used.                                                                                                               |
| onUpdateParts   | `Function` | `false`  | Callback called when the parts of the model are changed. This can be due to restrictions and rules of the model when applying a certain customization.                                                     |
| onLoading       | `Function` | `false`  | Callback called when the configurator is loading.                                                                                                                                                          |
| onLoaded        | `Function` | `false`  | Callback called when the configurator has loaded.                                                                                                                                                          |

An example of an instantiation and the correspondent view:

```javascript static
<RipeImage
    brand={"dummy"}
    model={"cube"}
    version={52}
    size={500}
    onUpdateParts={parts => {}}
    onLoading={() => {}}
    onLoaded={() => {}}
/>
```

![Image Example](/res/images/image.png)

Similar to the configurator, the frame can be controlled externally to the component, by changing the prop `frame`:

```javascript static
<RipeImage
    brand={"dummy"}
    model={"cube"}
    version={52}
    size={1000}
    frame={"top-0"}
    onUpdateParts={parts => {}}
    onLoading={() => {}}
    onLoaded={() => {}}
/>
```

![Image with Frame Example](/res/images/image-frame.png)

The customization of the model can also be provided, with the `prop` parts:

```javascript static
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
    onUpdateParts={parts => {}}
    onLoading={() => {}}
    onLoaded={() => {}}
/>
```

![Image with Parts Example](/res/images/image-parts.png)

The Image component support more complex logic and attributes, such as different formats, crops and personalization options.
By setting the `show-initials` to `true` and providing an `initials-group` and `state`, it is possible to show initials in the model.

A `state` example:

```javascript static
const state = {
    initialsExtra: {
        main: {
            initials: "A",
            engraving: "style:white"
        }
    }
};
```

```javascript static
<RipeImage
    brand={"dummy"}
    model={"cube"}
    version={52}
    frame={"side-0"}
    size={500}
    format={"png"}
    crop={true}
    showInitials={true}
    initialsGroup={"main"}
    state={state}
/>
```

![Image with Personalization](/res/images/image-personalization.png)

It is also possible to provide a `initialsBuilder` function, that allows for a more custom logic in the translation from initials and engraving into initials and profiles.

There can be more than one image using the same instance of Ripe SDK:

```javascript static
<RipeImage
    brand={"dummy"}
    model={"cube"}
    version={52}
    size={500}
    ripe={this.ripe}
    onUpdateParts={parts => {}}
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
    onUpdateParts={parts => {}}
    onLoading={() => {}}
    onLoaded={() => {}}
/>
```

Which uses a Ripe SDK instance that can be initialized like this:

```javascript static
this.ripe = new Ripe();
await this.ripe.config("dummy", "cube", {
    version: 52
});
```

![Multiple Images](/res/images/multiple-images.png)

### Image with Zoom

In cases where it is necessary to see details in the image, it is possible to use the `RipeImageZoom`, which applies a given zoom value to the image, centered on a pivot point.

The image with zoom can receive the following parameters:

| Prop            | Type       | Required | Description                                                                                                                                                                                                |
| --------------- | ---------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| brand           | `String`   | `false`  | The brand of the model.                                                                                                                                                                                    |
| model           | `String`   | `false`  | The name of the model.                                                                                                                                                                                     |
| version         | `Number`   | `false`  | The version of the build.                                                                                                                                                                                  |
| config          | `Boolean`  | `false`  | Indicates that the component should apply the config internally on component initialization.                                                                                                               |
| parts           | `Object`   | `false`  | The model's customization.                                                                                                                                                                                 |
| frame           | `String`   | `false`  | The name of the frame to be shown in the configurator. For example, frame `1` on `side` would be `side-1`, and a `top` frame would be `top-1`.                                                             |
| size            | `Number`   | `false`  | The size (in pixels) of the configurator. If not defined, the configurator will use all the screen space available.                                                                                        |
| format          | `String`   | `false`  | The format of the image, (eg: png, jpg, svg, etc.). Defaults to 'png'.                                                                                                                                     |
| crop            | `Boolean`  | `false`  | Indicates that the image composition is to be cropped. Crops the current image according to the minimal possible bounding box in both x and y axis.                                                        |
| showInitials    | `Boolean`  | `false`  | Indicates if the personalization should be shown. Defaults to `false`.                                                                                                                                     |
| initialsGroup   | `String`   | `false`  | The group in which the image initials belongs to.                                                                                                                                                          |
| initialsBuilder | `Function` | `false`  | A function that receives the initials and engraving as strings and the img element that will be used and returns a map with the initials and a profile list.                                               |
| zoom            | `Number`   | `false`  | Zoom percentage that controls the level of zoom over the original image, defaults to `100`.                                                                                                                |
| pivot           | `Object`   | `false`  | The x and y coordinates of the pivot point where the zoom will be applied to, e.g. `{ x: 100, y: 100 }`.                                                                                                   |
| state           | `Object`   | `false`  | An object containing the state of the personalization. For each group of the model it can contain the initials and the corresponding engraving (eg. { main: { initials: "AB", engraving: "style:grey" }}). |
| ripe            | `Number`   | `false`  | Instance of Ripe SDK initialized, if not defined, the global Ripe SDK instance will be used.                                                                                                               |
| onUpdateParts   | `Function` | `false`  | Callback called when the parts of the model are changed. This can be due to restrictions and rules of the model when applying a certain customization.                                                     |
| onLoading       | `Function` | `false`  | Callback called when the configurator is loading.                                                                                                                                                          |
| onLoaded        | `Function` | `false`  | Callback called when the configurator has loaded.                                                                                                                                                          |

The zoom value is in percentage, and will not go under the `10%` value, which is the minimum to get a visible image. Below is a comparison between the normal image component and one with zoom.

```javascript static
<RipeImageZoom
    brand={"dummy"}
    model={"cube"}
    version={52}
    size={1000}
    frame={"top-0"}
    onUpdateParts={parts => {}}
    onLoading={() => {}}
    onLoaded={() => {}}
/>
<RipeImageZoom
    brand={"dummy"}
    model={"cube"}
    version={52}
    size={1000}
    frame={"top-0"}
    zoom={140}
    pivot={{ x: 40, y: 30 }}
    onUpdateParts={parts => {}}
    onLoading={() => {}}
    onLoaded={() => {}}
/>
```

![Comparison between image with and without zoom](/res/images/image-zoom.png)

## Price

The price component allows for the visualization of the price of a model, according to the currency provided.

The price can receive the following parameters:

| Prop          | Type       | Required | Description                                                                                                                                            |
| ------------- | ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| brand         | `String`   | `false`  | The brand of the model.                                                                                                                                |
| model         | `String`   | `false`  | The name of the model.                                                                                                                                 |
| version       | `Number`   | `false`  | The version of the build.                                                                                                                              |
| config        | `Boolean`  | `false`  | Indicates that the component should apply the config internally on component initialization.                                                           |
| parts         | `Object`   | `false`  | The model's customization.                                                                                                                             |
| currency      | `String`   | `true`   | The `ISO 4217` currency code in which the price will be displayed.                                                                                     |
| ripe          | `Number`   | `false`  | Instance of Ripe SDK initialized, if not defined, the global Ripe SDK instance will be used.                                                           |
| onUpdateParts | `Function` | `false`  | Callback called when the parts of the model are changed. This can be due to restrictions and rules of the model when applying a certain customization. |
| onUpdatePrice | `Function` | `false`  | Callback when the price of the model changes. It can be triggered when the currency is changed or the model and its parts.                             |
| onLoading     | `Function` | `false`  | Callback called when the configurator is loading.                                                                                                      |
| onLoaded      | `Function` | `false`  | Callback called when the configurator has loaded.                                                                                                      |

An example of an instantiation and the correspondent view:

```javascript static
<RipePrice brand={"dummy"} model={"cube"} version={52} currency={"USD"} />
```

![Price Example](/res/images/price.png)

Different customizations can result in different prices. Below is an example of a more expensive customization in both dollars and euros:

```javascript static
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

```javascript static
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

![Price Complex Example EUR](/res/images/price-complex-eur.png)
![Price Complex Example USD](/res/images/price-complex-usd.png)

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

```javascript static
this.ripe = new Ripe();
await this.ripe.config("dummy", "cube", {
    version: 52
});
```

```javascript static
<RipePickers ripe={ripe} />
```

![Pickers Example](/res/images/pickers.gif)

The pickers can interact with an existing configurator, by using the same RIPE instance:

![Pickers with Configurator Example](/res/images/pickers_configurator.gif)
