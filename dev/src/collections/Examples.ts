import { CollectionConfig } from "payload/types";

const Examples: CollectionConfig = {
  slug: "examples",
  fields: [
    {
      type: "text",
      name: "example_mask",
      label: "Input Mask Example",

      custom: {
        mask: "+{1}(000)000-00-00",
        showValue: true,
      },
    },
  ],
};

export default Examples;
