import type { Config, Plugin } from "payload/config";

import { onInitExtension } from "./onInitExtension";
import type { PluginTypes } from "./types";
import {
  CollectionConfig,
  Field,
  GlobalConfig,
} from "payload/dist/exports/types";
import { TextFieldInputMask } from "./TextFieldInputMask";

const addMaskInputs = (collectionOrGlobal: CollectionConfig | GlobalConfig) => {
  const traverseFields = (fields: Field[]) => {
    fields.forEach((field) => {
      if (field.type === "text" && field.custom?.mask) {
        field.admin = field.admin ?? {};
        field.admin.components = {
          ...(field.admin?.components ?? {}),

          Field: (props) =>
            TextFieldInputMask({
              ...props,
              mask: field.custom?.mask,
              placeholder: field.admin?.placeholder,
              radix: field.custom?.radix,
              showValue: field.custom?.showValue,
            }),
        };
      }

      if ("fields" in field) {
        traverseFields(field.fields);
      }

      if ("blocks" in field) {
        field.blocks.forEach((block) => traverseFields(block.fields));
      }

      if ("tabs" in field) {
        field.tabs.forEach((tab) => traverseFields(tab.fields));
      }
    });
  };

  traverseFields(collectionOrGlobal.fields);
};

export const maskPlugin =
  (pluginOptions: PluginTypes): Plugin =>
  (incomingConfig) => {
    let config = { ...incomingConfig };

    config.admin = {
      ...(config.admin || {}),

      components: {
        ...(config.admin?.components || {}),
      },
    };

    if (pluginOptions.enabled === false) {
      return config;
    }

    config.collections = [...(config.collections || [])];
    config.globals = [...(config.globals || [])];

    if (config.collections !== undefined) {
      config.collections.forEach((collection) => {
        addMaskInputs(collection);
      });
    }

    if (config.globals !== undefined) {
      config.globals.forEach((global) => {
        addMaskInputs(global);
      });
    }

    config.onInit = async (payload) => {
      if (incomingConfig.onInit) await incomingConfig.onInit(payload);
      onInitExtension(pluginOptions, payload);
    };

    return config;
  };
