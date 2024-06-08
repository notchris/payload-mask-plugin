import React, { useRef } from "react";
import { useField } from "payload/components/forms";
import i18next from "i18next";
import { getTranslation } from "payload/utilities";

import { IMaskInput } from "react-imask";

type Props = {
  name: string;
  path: string;
  label?: Record<string, string> | false | string;
  required?: boolean;
  mask?: string;
  placeholder?: string;
  radix?: string;
  showValue?: boolean;
};

export const TextFieldInputMask: React.FC<Props> = ({
  name,
  path,
  label,
  required,
  mask,
  placeholder,
  radix,
  showValue,
}) => {
  // use ref to get access to internal "masked = ref.current.maskRef"
  const ref = useRef(null);
  const inputRef = useRef(null);
  const { value, setValue } = useField<string>({ path });

  return (
    <div className="field-type text">
      {label && (
        <label htmlFor={"field-" + name} className="field-label">
          {getTranslation(label, i18next)}
          {required && <span className="required">*</span>}
        </label>
      )}
      <div className="input-wrapper">
        <IMaskInput
          mask={[{ mask: "" }, { mask }]}
          radix={radix}
          value={value}
          unmask={true}
          ref={ref}
          lazy={false}
          inputRef={inputRef}
          onAccept={(value) => setValue(value)}
          placeholder={placeholder}
        />
        {showValue && <div>{value}</div>}
      </div>
    </div>
  );
};
