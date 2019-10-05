<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## rotate

Rotate the output image by either an explicit angle
or auto-orient based on the EXIF `Orientation` tag.

If an angle is provided, it is converted to a valid positive degree rotation.
For example, `-450` will produce a 270deg rotation.

When rotating by an angle other than a multiple of 90,
the background colour can be provided with the `background` option.

If no angle is provided, it is determined from the EXIF data.
Mirroring is supported and may infer the use of a flip operation.

The use of `rotate` implies the removal of the EXIF `Orientation` tag, if any.

Method order is important when both rotating and extracting regions,
for example `rotate(x).extract(y)` will produce a different result to `extract(y).rotate(x)`.

### Parameters

-   `angle` **[Number][1]** angle of rotation. (optional, default `auto`)
-   `options` **[Object][2]?** if present, is an Object with optional attributes.
    -   `options.background` **([String][3] \| [Object][2])** parsed by the [color][4] module to extract values for red, green, blue and alpha. (optional, default `"#000000"`)

### Examples

```javascript
const pipeline = sharp()
  .rotate()
  .resize(null, 200)
  .toBuffer(function (err, outputBuffer, info) {
    // outputBuffer contains 200px high JPEG image data,
    // auto-rotated using EXIF Orientation tag
    // info.width and info.height contain the dimensions of the resized image
  });
readableStream.pipe(pipeline);
```

-   Throws **[Error][5]** Invalid parameters

Returns **Sharp** 

## flip

Flip the image about the vertical Y axis. This always occurs after rotation, if any.
The use of `flip` implies the removal of the EXIF `Orientation` tag, if any.

### Parameters

-   `flip` **[Boolean][6]**  (optional, default `true`)

Returns **Sharp** 

## flop

Flop the image about the horizontal X axis. This always occurs after rotation, if any.
The use of `flop` implies the removal of the EXIF `Orientation` tag, if any.

### Parameters

-   `flop` **[Boolean][6]**  (optional, default `true`)

Returns **Sharp** 

## sharpen

Sharpen the image.
When used without parameters, performs a fast, mild sharpen of the output image.
When a `sigma` is provided, performs a slower, more accurate sharpen of the L channel in the LAB colour space.
Separate control over the level of sharpening in "flat" and "jagged" areas is available.

### Parameters

-   `sigma` **[Number][1]?** the sigma of the Gaussian mask, where `sigma = 1 + radius / 2`.
-   `flat` **[Number][1]** the level of sharpening to apply to "flat" areas. (optional, default `1.0`)
-   `jagged` **[Number][1]** the level of sharpening to apply to "jagged" areas. (optional, default `2.0`)


-   Throws **[Error][5]** Invalid parameters

Returns **Sharp** 

## median

Apply median filter.
When used without parameters the default window is 3x3.

### Parameters

-   `size` **[Number][1]** square mask size: size x size (optional, default `3`)


-   Throws **[Error][5]** Invalid parameters

Returns **Sharp** 

## blur

Blur the image.
When used without parameters, performs a fast, mild blur of the output image.
When a `sigma` is provided, performs a slower, more accurate Gaussian blur.

### Parameters

-   `sigma` **[Number][1]?** a value between 0.3 and 1000 representing the sigma of the Gaussian mask, where `sigma = 1 + radius / 2`.


-   Throws **[Error][5]** Invalid parameters

Returns **Sharp** 

## flatten

Merge alpha transparency channel, if any, with a background.

### Parameters

-   `options` **[Object][2]?** 
    -   `options.background` **([String][3] \| [Object][2])** background colour, parsed by the [color][4] module, defaults to black. (optional, default `{r:0,g:0,b:0}`)

Returns **Sharp** 

## gamma

Apply a gamma correction by reducing the encoding (darken) pre-resize at a factor of `1/gamma`
then increasing the encoding (brighten) post-resize at a factor of `gamma`.
This can improve the perceived brightness of a resized image in non-linear colour spaces.
JPEG and WebP input images will not take advantage of the shrink-on-load performance optimisation
when applying a gamma correction.

Supply a second argument to use a different output gamma value, otherwise the first value is used in both cases.

### Parameters

-   `gamma` **[Number][1]** value between 1.0 and 3.0. (optional, default `2.2`)
-   `gammaOut` **[Number][1]?** value between 1.0 and 3.0. (optional, defaults to same as `gamma`)


-   Throws **[Error][5]** Invalid parameters

Returns **Sharp** 

## negate

Produce the "negative" of the image.

### Parameters

-   `negate` **[Boolean][6]**  (optional, default `true`)

Returns **Sharp** 

## normalise

Enhance output image contrast by stretching its luminance to cover the full dynamic range.

### Parameters

-   `normalise` **[Boolean][6]**  (optional, default `true`)

Returns **Sharp** 

## normalize

Alternative spelling of normalise.

### Parameters

-   `normalize` **[Boolean][6]**  (optional, default `true`)

Returns **Sharp** 

## convolve

Convolve the image with the specified kernel.

### Parameters

-   `kernel` **[Object][2]** 
    -   `kernel.width` **[Number][1]** width of the kernel in pixels.
    -   `kernel.height` **[Number][1]** width of the kernel in pixels.
    -   `kernel.kernel` **[Array][7]&lt;[Number][1]>** Array of length `width*height` containing the kernel values.
    -   `kernel.scale` **[Number][1]** the scale of the kernel in pixels. (optional, default `sum`)
    -   `kernel.offset` **[Number][1]** the offset of the kernel in pixels. (optional, default `0`)

### Examples

```javascript
sharp(input)
  .convolve({
    width: 3,
    height: 3,
    kernel: [-1, 0, 1, -2, 0, 2, -1, 0, 1]
  })
  .raw()
  .toBuffer(function(err, data, info) {
    // data contains the raw pixel data representing the convolution
    // of the input image with the horizontal Sobel operator
  });
```

-   Throws **[Error][5]** Invalid parameters

Returns **Sharp** 

## threshold

Any pixel value greather than or equal to the threshold value will be set to 255, otherwise it will be set to 0.

### Parameters

-   `threshold` **[Number][1]** a value in the range 0-255 representing the level at which the threshold will be applied. (optional, default `128`)
-   `options` **[Object][2]?** 
    -   `options.greyscale` **[Boolean][6]** convert to single channel greyscale. (optional, default `true`)
    -   `options.grayscale` **[Boolean][6]** alternative spelling for greyscale. (optional, default `true`)


-   Throws **[Error][5]** Invalid parameters

Returns **Sharp** 

## boolean

Perform a bitwise boolean operation with operand image.

This operation creates an output image where each pixel is the result of
the selected bitwise boolean `operation` between the corresponding pixels of the input images.

### Parameters

-   `operand` **([Buffer][8] \| [String][3])** Buffer containing image data or String containing the path to an image file.
-   `operator` **[String][3]** one of `and`, `or` or `eor` to perform that bitwise operation, like the C logic operators `&`, `|` and `^` respectively.
-   `options` **[Object][2]?** 
    -   `options.raw` **[Object][2]?** describes operand when using raw pixel data.
        -   `options.raw.width` **[Number][1]?** 
        -   `options.raw.height` **[Number][1]?** 
        -   `options.raw.channels` **[Number][1]?** 


-   Throws **[Error][5]** Invalid parameters

Returns **Sharp** 

## linear

Apply the linear formula a \* input + b to the image (levels adjustment)

### Parameters

-   `a` **[Number][1]** multiplier (optional, default `1.0`)
-   `b` **[Number][1]** offset (optional, default `0.0`)


-   Throws **[Error][5]** Invalid parameters

Returns **Sharp** 

## recomb

Recomb the image with the specified matrix.

### Parameters

-   `inputMatrix`  
-   `3x3` **[Array][7]&lt;[Array][7]&lt;[Number][1]>>** Recombination matrix

### Examples

```javascript
sharp(input)
  .recomb([
   [0.3588, 0.7044, 0.1368],
   [0.2990, 0.5870, 0.1140],
   [0.2392, 0.4696, 0.0912],
  ])
  .raw()
  .toBuffer(function(err, data, info) {
    // data contains the raw pixel data after applying the recomb
    // With this example input, a sepia filter has been applied
  });
```

-   Throws **[Error][5]** Invalid parameters

Returns **Sharp** 

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[4]: https://www.npmjs.org/package/color

[5]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error

[6]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[7]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[8]: https://nodejs.org/api/buffer.html