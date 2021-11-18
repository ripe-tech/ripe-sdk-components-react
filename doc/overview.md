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
| currency                | `String`   | `false`  | The `ISO 4217` currency code being used for the price of the model.                                                                                                |
| parts                   | `Object`   | `false`  | The model's customization.                                                                                                                                         |
| initials                | `String`   | `false`  | The initials value to be used in the RIPE instance.                                                                                                                |
| engraving               | `String`   | `false`  | The engraving value to be used in the RIPE instance.                                                                                                               |
| initialsExtra           | `Object`   | `false`  | The set of (initials, engraving) per initials group to be used in the RIPE instance.                                                                               |
| structure               | `Object`   | `false`  | The normalized structure that uniquely represents the configuration "situation".                                                                                   |
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
| onUpdateBrand           | `Function` | `false`  | Callback called when the brand of the model is changed.                                                                                                            |
| onUpdateModel           | `Function` | `false`  | Callback called when the model is changed.                                                                                                                         |
| onUpdateVersion         | `Function` | `false`  | Callback called when the version is changed.                                                                                                                       |
| onUpdateParts           | `Function` | `false`  | Callback called when the parts of the model are changed. This can be due to restrictions and rules of the model when applying a certain customization.             |
| onUpdateInitials        | `Function` | `false`  | Callback called when the initials of the model are changed.                                                                                                        |
| onUpdateEngraving       | `Function` | `false`  | Callback called when the engraving of the model are changed.                                                                                                       |
| onUpdateInitialsExtra   | `Function` | `false`  | Callback called when the initials extra of the model are changed.                                                                                                  |
| onUpdateCurrency        | `Function` | `false`  | Callback called when the currency of the model is changed.                                                                                                         |
| onUpdateStructure       | `Function` | `false`  | Callback called when the structure is changed.                                                                                                                     |
| onLoading               | `Function` | `false`  | Callback called when the configurator is loading.                                                                                                                  |
| onConfiguring           | `Function` | `false`  | Callback when the RIPE instance is configuring.                                                                                                                    |
| onLoaded                | `Function` | `false`  | Callback when the configurator or image has finished loading, when it is possible to visualize it or when an error occurred.                                       |
| onConfigured            | `Function` | `false`  | Callback when the RIPE instance ends its configuration.                                                                                                            |

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

| Prop                  | Type               | Required | Description                                                                                                                                                                                                                                                                                                                           |
| --------------------- | ------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| brand                 | `String`           | `false`  | The brand of the model.                                                                                                                                                                                                                                                                                                               |
| model                 | `String`           | `false`  | The name of the model.                                                                                                                                                                                                                                                                                                                |
| version               | `Number`           | `false`  | The version of the build.                                                                                                                                                                                                                                                                                                             |
| config                | `Boolean`          | `false`  | Indicates that the component should apply the config internally on component initialization.                                                                                                                                                                                                                                          |
| currency              | `String`           | `false`  | The `ISO 4217` currency code being used for the price of the model.                                                                                                                                                                                                                                                                   |
| parts                 | `Object`           | `false`  | The model's customization.                                                                                                                                                                                                                                                                                                            |
| initials              | `String`           | `false`  | The initials value to be used in the RIPE instance.                                                                                                                                                                                                                                                                                   |
| engraving             | `String`           | `false`  | The engraving value to be used in the RIPE instance.                                                                                                                                                                                                                                                                                  |
| initialsExtra         | `Object`           | `false`  | The set of (initials, engraving) per initials group to be used in the RIPE instance.                                                                                                                                                                                                                                                  |
| structure             | `Object`           | `false`  | The normalized structure that uniquely represents the configuration "situation".                                                                                                                                                                                                                                                      |
| frame                 | `String`           | `false`  | The name of the frame to be shown in the configurator. For example, frame `1` on `side` would be `side-1`, and a `top` frame would be `top-1`.                                                                                                                                                                                        |
| size                  | `Number`           | `false`  | The size (in pixels) of the configurator. If not defined, the configurator will use all the screen space available.                                                                                                                                                                                                                   |
| format                | `String`           | `false`  | The format of the image, (eg: png, jpg, svg, etc.). Defaults to 'png'.                                                                                                                                                                                                                                                                |
| crop                  | `Boolean`          | `false`  | Indicates that the image composition is to be cropped. Crops the current image according to the minimal possible bounding box in both x and y axis.                                                                                                                                                                                   |
| showInitials          | `Boolean`          | `false`  | Indicates if the personalization should be shown. Defaults to `false`.                                                                                                                                                                                                                                                                |
| initialsGroup         | `String`           | `false`  | The group in which the image initials belongs to.                                                                                                                                                                                                                                                                                     |
| initialsBuilder       | `Function`         | `false`  | A function that receives the initials and engraving as strings and the img element that will be used and returns a map with the initials and a profile list.                                                                                                                                                                          |
| rotation              | `Number`           | `false`  | The angle in degrees of the rotation to apply on the model.                                                                                                                                                                                                                                                                           |
| flip                  | `Boolean`          | `false`  | If set flips the current image vertically, this operation is going to be performed before rotation.                                                                                                                                                                                                                                   |
| mirror                | `Boolean`          | `false`  | If set mirrors the current image horizontally, this operation is going to be performed before rotation.                                                                                                                                                                                                                               |
| boundingBox           | `Array`            | `false`  | Tuple that defines the target width and height (only one dimension is required) for the "inside" image to be generated, note that if both dimensions are defined image deformation may occur. Example: [100, 100].                                                                                                                    |
| algorithm             | `String`           | `false`  | The name of the blending algorithm that is going to be used in the blending of the multiple part layers.                                                                                                                                                                                                                              |
| background            | `String`           | `false`  | String that defines the color to be applied to the background in the `RRGGBB` hexadecimal format. Example: `ffffff`.                                                                                                                                                                                                                  |
| engine                | `String`           | `false`  | The name of the engine that is going to be used for the composition of the image (eg: base, rust, etc.), if not provided the best available is going to be used for the composition process.                                                                                                                                          |
| initialsX             | `Number`           | `false`  | Overrides the profiles position on the x axis.                                                                                                                                                                                                                                                                                        |
| initialsY             | `Number`           | `false`  | Overrides the profiles position on the y axis.                                                                                                                                                                                                                                                                                        |
| initialsWidth         | `Number`           | `false`  | Overrides the profiles width.                                                                                                                                                                                                                                                                                                         |
| initialsHeight        | `Number`           | `false`  | Overrides the profiles height.                                                                                                                                                                                                                                                                                                        |
| initialsViewport      | `Array`            | `false`  | Overrides the profiles viewport. Viewport is a window (specified by `[x, y, width, height]`) that defines a region to be shown with a zoom. It is used to showcase the initials.                                                                                                                                                      |
| initialsColor         | `String`           | `false`  | Overrides the profiles color to be applied to the initials.                                                                                                                                                                                                                                                                           |
| initialsOpacity       | `Number`           | `false`  | Overrides the profiles opacity to be applied to the initials. This value ranges from `0` to `1`.                                                                                                                                                                                                                                      |
| initialsAlign         | `String`           | `false`  | Overrides the profiles orientation of the initials to be applied. This field can be `left`, `right` or `center`.                                                                                                                                                                                                                      |
| initialsVertical      | `String`           | `false`  | Overrides the profiles vertical alignment on the initials. This field can be top, bottom or middle.                                                                                                                                                                                                                                   |
| initialsEmbossing     | `String`           | `false`  | Overrides the profiles embossing type of the initials. The available options vary with each model.                                                                                                                                                                                                                                    |
| initialsRotation      | `Number`           | `false`  | Overrides the profiles rotation angle, in degrees, to be applied to the initials.                                                                                                                                                                                                                                                     |
| initialsZindex        | `Number`           | `false`  | Initials' z-index value to be using when composing, ensuring proper layering of the rendered image.                                                                                                                                                                                                                                   |
| initialsAlgorithm     | `String`           | `false`  | Algorithm to be used for initials (defaults to `mask_top`).                                                                                                                                                                                                                                                                           |
| initialsBlendColor    | `String`           | `false`  | The background color to be used in the generation of the anti-aliasing (defaults to `000000`).                                                                                                                                                                                                                                        |
| initialsPattern       | `String`           | `false`  | Pattern to be used when tiling.                                                                                                                                                                                                                                                                                                       |
| initialsTexture       | `String`           | `false`  | Texture image to be used when filling the initials.                                                                                                                                                                                                                                                                                   |
| initialsExclusion     | `Array`            | `false`  | Parts to exclude when applying the initials.                                                                                                                                                                                                                                                                                          |
| initialsInclusion     | `Array`            | `false`  | Parts to include when applying the initials.                                                                                                                                                                                                                                                                                          |
| initialsImageRotation | `Number`           | `false`  | Overrides the profile's rotation angle, in degrees, to be applied to the initials image.                                                                                                                                                                                                                                              |
| initialsImageFlip     | `Boolean`          | `false`  | Flip the initials image around the X axis.                                                                                                                                                                                                                                                                                            |
| initialsImageMirror   | `Boolean`          | `false`  | Mirror the initials image around the Y axis.                                                                                                                                                                                                                                                                                          |
| debug                 | `Boolean`          | `false`  | Displays the debug information box.                                                                                                                                                                                                                                                                                                   |
| fontFamily            | `String`           | `false`  | Overrides the profiles font to be applied on the initials.                                                                                                                                                                                                                                                                            |
| fontWeight            | `[String, Number]` | `false`  | Overrides the profiles font weight to be applied on the initials.                                                                                                                                                                                                                                                                     |
| fontSize              | `Number`           | `false`  | Overrides the profiles font size to be applied on the initials.                                                                                                                                                                                                                                                                       |
| fontSpacing           | `Number`           | `false`  | Overrides the profiles spacing between each letter.                                                                                                                                                                                                                                                                                   |
| fontTrim              | `Boolean`          | `false`  | Overrides the profiles font trim, which defines if the initials are trimmed.                                                                                                                                                                                                                                                          |
| fontMask              | `String`           | `false`  | Mask strategy when using raster fonts: `self` means that the alpha channel of the letter image is going to be used to defined both which pixels are going to be passed in the paste operation and the intensity; 'simple' means that just the pixels with a valid alpha value (greater than zero) will be passed to the target image. |
| fontMode              | `String`           | `false`  | Forces a specific font mode, may improve text render (vector fonts) - it's used by some graphics drivers to indicate what mode the driver prefers; usually when the font uses anti-aliasing the mode `L` shall improve rendering.                                                                                                     |
| lineHeight            | `Number`           | `false`  | Overrides the profiles line height, which defines the initials line height.                                                                                                                                                                                                                                                           |
| lineBreaking          | `String`           | `false`  | Line break, is optional and can have one of the the following values: `normal` and `word_break`.                                                                                                                                                                                                                                      |
| shadow                | `Boolean`          | `false`  | Overrides the profiles shadow, which defines if the initials have a shadow.                                                                                                                                                                                                                                                           |
| shadowColor           | `Boolean`          | `false`  | Overrides the profiles color of the shadow to be used.                                                                                                                                                                                                                                                                                |
| shadowOffset          | `Boolean`          | `false`  | Overrides the profiles offset to be applied on the shadow.                                                                                                                                                                                                                                                                            |
| offsets               | `Object`           | `false`  | Overrides the profiles offset to be applied on the initials (e.g. `{ 0: [0, 6], 1: [0, -10], 2: [0, 10] }`)                                                                                                                                                                                                                           |
| curve                 | `Array`            | `false`  | Bezier curve control points, must contain four (e.g. `[[0.2, 0.2], [0.7, 0.2], [0.2, 0.5], [0.7, 0.5]]`).                                                                                                                                                                                                                             |
| name                  | `String`           | `false`  | Name of the image.                                                                                                                                                                                                                                                                                                                    |
| state                 | `Object`           | `false`  | An object containing the state of the personalization. For each group of the model it can contain the initials and the corresponding engraving (eg. { main: { initials: "AB", engraving: "style:grey" }}).                                                                                                                            |
| ripe                  | `Number`           | `false`  | Instance of Ripe SDK initialized, if not defined, the global Ripe SDK instance will be used.                                                                                                                                                                                                                                          |
| onError               | `Function`         | `false`  | Callback called when an error occurs while loading the image.                                                                                                                                                                                                                                                                         |
| onUpdateBrand         | `Function`         | `false`  | Callback called when the brand of the model is changed.                                                                                                                                                                                                                                                                               |
| onUpdateModel         | `Function`         | `false`  | Callback called when the model is changed.                                                                                                                                                                                                                                                                                            |
| onUpdateVersion       | `Function`         | `false`  | Callback called when the version is changed.                                                                                                                                                                                                                                                                                          |
| onUpdateParts         | `Function`         | `false`  | Callback called when the parts of the model are changed. This can be due to restrictions and rules of the model when applying a certain customization.                                                                                                                                                                                |
| onUpdateInitials      | `Function`         | `false`  | Callback called when the initials of the model are changed.                                                                                                                                                                                                                                                                           |
| onUpdateEngraving     | `Function`         | `false`  | Callback called when the engraving of the model are changed.                                                                                                                                                                                                                                                                          |
| onUpdateInitialsExtra | `Function`         | `false`  | Callback called when the initials extra of the model are changed.                                                                                                                                                                                                                                                                     |
| onUpdateCurrency      | `Function`         | `false`  | Callback called when the currency of the model is changed.                                                                                                                                                                                                                                                                            |
| onUpdateStructure     | `Function`         | `false`  | Callback called when the structure is changed.                                                                                                                                                                                                                                                                                        |
| onLoading             | `Function`         | `false`  | Callback called when the configurator is loading.                                                                                                                                                                                                                                                                                     |
| onConfiguring         | `Function`         | `false`  | Callback when the RIPE instance is configuring.                                                                                                                                                                                                                                                                                       |
| onLoaded              | `Function`         | `false`  | Callback when the configurator or image has finished loading, when it is possible to visualize it or when an error occurred.                                                                                                                                                                                                          |
| onConfigured          | `Function`         | `false`  | Callback when the RIPE instance ends its configuration.                                                                                                                                                                                                                                                                               |

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

## Image with Zoom

In cases where it is necessary to see details in the image, it is possible to use the `RipeImageZoom`, which applies a given zoom value to the image, centered on a pivot point.

The image with zoom can receive the same parameters from `ripe-image` as well as the following parameters:

| Prop  | Type     | Required | Description                                                                                              |
| ----- | -------- | -------- | -------------------------------------------------------------------------------------------------------- |
| zoom  | `Number` | `false`  | Zoom percentage that controls the level of zoom over the original image, defaults to `100`.              |
| pivot | `Object` | `false`  | The x and y coordinates of the pivot point where the zoom will be applied to, e.g. `{ x: 100, y: 100 }`. |

The zoom value is in percentage, and will not go under the `10%` value, which is the minimum to get a visible image. Below is a comparison between the normal image component and one with zoom.

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

## Image with Zoom on Hover

To allow a more interactive experience with zoom, it is possible to use the `RipeImageZoomHover`, which applies a given zoom value to the image when hovering above it, centering it one the mouse position.
It is also possible to enable the scroll wheel to increase and decrease the zoom value.

The image with zoom can receive the same parameters from `ripe-image` as well as the following parameters:

| Prop              | Type      | Required | Description                                                                                      |
| ----------------- | --------- | -------- | ------------------------------------------------------------------------------------------------ |
| zoom              | `Number`  | `false`  | Zoom percentage that controls the level of zoom over the original image, defaults to `100`.      |
| maxZoom           | `Number`  | `false`  | The maximum zoom percentage allowed over the original image. Defaults to `300`.                  |
| minZoom           | `Number`  | `false`  | The minimum zoom percentage allowed over the original image. Defaults to `10`.                   |
| scrollZoom        | `Boolean` | `false`  | Enable changing the zoom value with the mouse wheel scroll. Defaults to `false`.                 |
| scrollSensitivity | `Number`  | `false`  | Scroll sensitivity when controlling the zoom value with the mouse wheel scroll. Defaults to `1`. |
| zoomOut           | `Boolean` | `false`  | Enables zooming out of the image with the mouse scroll. Defaults to `false`.                     |

```javascript static
<RipeImageZoomHover
    brand={"dummy"}
    model={"cube"}
    version={52}
    size={1000}
    frame={"top-0"}
    zoom={140}
    maxZoom={300}
    minZoom={10}
    scrollZoom={true}
    scrollSensitivity={2}
    zoomOut={true}
    onUpdateParts={parts => {}}
    onLoading={() => {}}
    onLoaded={() => {}}
/>
```

![Zoom on hover](/res/images/image-zoom-hover.gif)

## Price

The price component allows for the visualization of the price of a model, according to the currency provided.

The price can receive the following parameters:

| Prop                  | Type       | Required | Description                                                                                                                                            |
| --------------------- | ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| brand                 | `String`   | `false`  | The brand of the model.                                                                                                                                |
| model                 | `String`   | `false`  | The name of the model.                                                                                                                                 |
| version               | `Number`   | `false`  | The version of the build.                                                                                                                              |
| config                | `Boolean`  | `false`  | Indicates that the component should apply the config internally on component initialization.                                                           |
| currency              | `String`   | `false`  | The `ISO 4217` currency code being used for the price of the model.                                                                                    |
| parts                 | `Object`   | `false`  | The model's customization.                                                                                                                             |
| initials              | `String`   | `false`  | The initials value to be used in the RIPE instance.                                                                                                    |
| engraving             | `String`   | `false`  | The engraving value to be used in the RIPE instance.                                                                                                   |
| initialsExtra         | `Object`   | `false`  | The set of (initials, engraving) per initials group to be used in the RIPE instance.                                                                   |
| structure             | `Object`   | `false`  | The normalized structure that uniquely represents the configuration "situation".                                                                       |
| ripe                  | `Number`   | `false`  | Instance of Ripe SDK initialized, if not defined, the global Ripe SDK instance will be used.                                                           |
| onUpdatePrice         | `Function` | `false`  | Callback when the price of the model changes. It can be triggered when the currency is changed or the model and its parts.                             |
| onUpdateBrand         | `Function` | `false`  | Callback called when the brand of the model is changed.                                                                                                |
| onUpdateModel         | `Function` | `false`  | Callback called when the model is changed.                                                                                                             |
| onUpdateVersion       | `Function` | `false`  | Callback called when the version is changed.                                                                                                           |
| onUpdateParts         | `Function` | `false`  | Callback called when the parts of the model are changed. This can be due to restrictions and rules of the model when applying a certain customization. |
| onUpdateInitials      | `Function` | `false`  | Callback called when the initials of the model are changed.                                                                                            |
| onUpdateEngraving     | `Function` | `false`  | Callback called when the engraving of the model are changed.                                                                                           |
| onUpdateInitialsExtra | `Function` | `false`  | Callback called when the initials extra of the model are changed.                                                                                      |
| onUpdateCurrency      | `Function` | `false`  | Callback called when the currency of the model is changed.                                                                                             |
| onUpdateStructure     | `Function` | `false`  | Callback called when the structure is changed.                                                                                                         |
| onLoading             | `Function` | `false`  | Callback called when the configurator is loading.                                                                                                      |
| onConfiguring         | `Function` | `false`  | Callback when the RIPE instance is configuring.                                                                                                        |
| onLoaded              | `Function` | `false`  | Callback when the configurator or image has finished loading, when it is possible to visualize it or when an error occurred.                           |
| onConfigured          | `Function` | `false`  | Callback when the RIPE instance ends its configuration.                                                                                                |

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

| Prop                  | Type       | Required | Description                                                                                                                                            |
| --------------------- | ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| brand                 | `String`   | `false`  | The brand of the model.                                                                                                                                |
| model                 | `String`   | `false`  | The name of the model.                                                                                                                                 |
| version               | `Number`   | `false`  | The version of the build.                                                                                                                              |
| config                | `Boolean`  | `false`  | Indicates that the component should apply the config internally on component initialization.                                                           |
| currency              | `String`   | `false`  | The `ISO 4217` currency code being used for the price of the model.                                                                                    |
| parts                 | `Object`   | `false`  | The model's customization.                                                                                                                             |
| initials              | `String`   | `false`  | The initials value to be used in the RIPE instance.                                                                                                    |
| engraving             | `String`   | `false`  | The engraving value to be used in the RIPE instance.                                                                                                   |
| initialsExtra         | `Object`   | `false`  | The set of (initials, engraving) per initials group to be used in the RIPE instance.                                                                   |
| structure             | `Object`   | `false`  | The normalized structure that uniquely represents the configuration "situation".                                                                       |
| ripe                  | `Object`   | `true`   | Instance of Ripe SDK initialized.                                                                                                                      |
| onUpdateBrand         | `Function` | `false`  | Callback called when the brand of the model is changed.                                                                                                |
| onUpdateModel         | `Function` | `false`  | Callback called when the model is changed.                                                                                                             |
| onUpdateVersion       | `Function` | `false`  | Callback called when the version is changed.                                                                                                           |
| onUpdateParts         | `Function` | `false`  | Callback called when the parts of the model are changed. This can be due to restrictions and rules of the model when applying a certain customization. |
| onUpdateInitials      | `Function` | `false`  | Callback called when the initials of the model are changed.                                                                                            |
| onUpdateEngraving     | `Function` | `false`  | Callback called when the engraving of the model are changed.                                                                                           |
| onUpdateInitialsExtra | `Function` | `false`  | Callback called when the initials extra of the model are changed.                                                                                      |
| onUpdateCurrency      | `Function` | `false`  | Callback called when the currency of the model is changed.                                                                                             |
| onUpdateStructure     | `Function` | `false`  | Callback called when the structure is changed.                                                                                                         |
| onLoading             | `Function` | `false`  | Callback called when the configurator is loading.                                                                                                      |
| onConfiguring         | `Function` | `false`  | Callback when the RIPE instance is configuring.                                                                                                        |
| onLoaded              | `Function` | `false`  | Callback when the configurator or image has finished loading, when it is possible to visualize it or when an error occurred.                           |
| onConfigured          | `Function` | `false`  | Callback when the RIPE instance ends its configuration.                                                                                                |

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
