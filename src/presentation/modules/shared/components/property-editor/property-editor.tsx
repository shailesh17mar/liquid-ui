import {
  EuiFlexGroup,
  euiPaletteColorBlind,
  euiPaletteColorBlindBehindText,
} from "@elastic/eui";
import { useForm, useFieldArray } from "react-hook-form";
import React from "react";
import { FIELD_TYPES, MetaProperty } from "./types";
import { MetaField } from "./meta-field";

interface FormValues {
  properties: MetaProperty[];
}

const colors = euiPaletteColorBlindBehindText();

export const PropertiesEditor: React.FC = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      properties: [
        {
          type: FIELD_TYPES.TEXT,
        },
        {
          type: FIELD_TYPES.NUMBER,
        },
        {
          type: FIELD_TYPES.DATE,
        },
        {
          type: FIELD_TYPES.EMAIL,
        },
        {
          type: FIELD_TYPES.URL,
        },
        {
          type: FIELD_TYPES.SELECT,
          options: [
            { value: "option_one", text: "Option one" },
            { value: "option_two", text: "Option two" },
            { value: "option_three", text: "Option three" },
          ],
        },
        {
          type: FIELD_TYPES.MULTI_SELECT,
          options: [
            { value: "option_one", label: "Option one", color: colors[0] },
            { value: "option_two", label: "Option two", color: colors[1] },
            { value: "option_three", label: "Option three", color: colors[2] },
          ],
        },
      ] as MetaProperty[],
    },
    mode: "onBlur",
  });
  const { fields, update } = useFieldArray({
    name: "properties",
    control,
  });

  const onSubmit = (data: FormValues) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <EuiFlexGroup direction="column">
        {fields.map((field, index) => (
          <MetaField
            form={{ control, update }}
            key={index}
            index={index}
            property={field}
          />
        ))}
      </EuiFlexGroup>
    </form>
  );
};
