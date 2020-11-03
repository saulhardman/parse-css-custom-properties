# Parse CSS Custom Properties

[![Release Actions Status](https://github.com/saulhardman/parse-css-custom-properties/workflows/Release/badge.svg)](https://github.com/saulhardman/parse-css-custom-properties/actions)

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
import parseCssCustomProperties, {
  sync as parseCustomCssPropertiesSync,
} from '@saulhardman/parse-css-custom-properties';

(async () => {
  const customProperties = await parseCssCustomProperties(['input.css']);

  console.log(customProperties);
  // { '--example-custom-property': '2rem' }
})();

const customProperties = parseCustomCssPropertiesSync(['input.css']);

console.log(customProperties);
// { '--example-custom-property': '2rem' }
```

## Installation

Configure npm client:

```npmrc
# .npmrc
@saulhardman:registry=https://npm.pkg.github.com
```

```
# .yarnrc
"@saulhardman:registry" "https://npm.pkg.github.com"
```

**Note**: If you'd like this package to be available via the
[npm package registry](https://npmjs.com/) as well as the
[GitHub Package Registry](https://github.com/features/packages) then please
[create an issue](https://github.com/saulhardman/parse-css-custom-properties/issues/new).

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
