# Payload Mask Plugin
#### Adds input masking to [Payload](https://payloadcms.com/).

![image](https://github.com/notchris/payload-mask-plugin/blob/main/example.gif?raw=true)

### Features:

- Input masking using  [IMask](https://github.com/uNmAnNeR/imaskjs/tree/master?tab=readme-ov-file)


## Basic Usage

Install the plugin and use on a text field in a Collection or Global.

## Installation

```bash
yarn add payload-mask-plugin
```


```ts
// payload.config.ts
import { maskPlugin } from 'payload-mask-plugin'

export default buildConfig({
  ...
  plugins: [maskPlugin({ enabled: true })],
})
```

```ts
// Add to a text field on a Collection or Global

const Examples: CollectionConfig = {
  slug: "examples",
  fields: [
    {
      type: "text",
      name: "example_mask",
      label: "Input Mask Example",
      placeholder: "Enter a US phone number"

      custom: {
        mask: "+{1}(000)000-00-00",
        showValue: true,
        saveMaskedValue: false
      },
    },
  ],
};

export default Examples;
```
