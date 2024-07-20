import React, { useRef } from "react";
import { useField } from "payload/components/forms";
import { useTranslation } from 'react-i18next';

import { getTranslation } from "payload/utilities";

import { IMaskInput } from "react-imask";

type Props = {
  name: string;
  path: string;
  label?: Record<string, string> | false | string
  required?: boolean;
  mask?: string;
  placeholder?: string;
  radix?: string;
  showValue?: boolean;
  saveMaskedValue?: boolean;
};

export const TextFieldInputMask: React.FC<Props> = (props) => {

  const {
    name,
    path,
    label,
    required,
    mask,
    placeholder,
    radix,
    showValue,
    saveMaskedValue
  } = props

  // use ref to get access to internal "masked = ref.current.maskRef"
  const ref = useRef(null);
  const inputRef = useRef(null);
  const { value, setValue } = useField<string>({ path });
  
  const { i18n } = useTranslation()

  return (
    <div className="field-type text">
      {label && (
        <label htmlFor={"field-" + name} className="field-label">
          {getTranslation(label, i18n)}
          {required && <span className="required">*</span>}
        </label>
      )}
      <div className="inp{getTranslation(label, i18n)}ut-wrapper">
        <IMaskInput
          mask={[{ mask: "" }, { mask }]}
          radix={radix}
          value={value}
          unmask={!saveMaskedValue}
          ref={ref}
          lazy={false}
          inputRef={inputRef}
          onAccept={newValue => newValue !== value && setValue(newValue)}
          placeholder={placeholder}
        />
        {showValue && <div>{value}</div>}
      </div>
    </div>
  );
};
