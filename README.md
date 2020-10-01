# Parse CSS Custom Properties

A JavaScript module to parse CSS Custom Properties from CSS files into a
JavaScript Object.

## Example Usage

```css
/* input.css */
:root {
  --example-custom-property: 2rem;
}
```

```js
import parseCssCustomProperties from 'parse-css-custom-properties';

(async () => {
  const props = await parseCssCustomProperties(['input.css']);

  console.log(props);
  // { '--example-custom-property': '2rem' }
})();
```

## Installation

Configure npm client:

```.npmrc
@saulhardman:registry=https://npm.pkg.github.com
```

Using npm:

```shell
> npm install --save-dev @saulhardman/parse-css-custom-properties
```

Using Yarn:

```shell
> yarn add --dev @saulhardman/parse-css-custom-properties
```

## Arguments

### `patterns`

Type: `Array` Default: `[]`

An array of [`glob`][node-glob] patterns that match the CSS files to parse.

### `options`

Type: `Object` Default: `{ globOptions: undefined }`

## Options

### `globOptions`

Type: `Object` Default: `undefined`

Options passed to [`glob`][node-glob].

## License

MIT © Saul Hardman

[node-glob]: https://github.com/isaacs/node-glob
