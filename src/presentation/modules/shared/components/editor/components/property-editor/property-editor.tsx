import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiPanel,
} from "@elastic/eui";
import { useForm, useFieldArray } from "react-hook-form";
import React, { useCallback, useEffect } from "react";
import { FIELD_TYPES, FormValues, MetaProperty, SCHEMA } from "./types";
import { MetaField } from "./meta-field";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  properties: MetaProperty[];
  onChange: (properties: MetaProperty[]) => void;
}
export const PropertiesEditor: React.FC<Props> = ({ properties, onChange }) => {
  const { control, watch, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      properties: properties,
    },
  });

  const { fields, update, append, remove } = useFieldArray({
    name: "properties",
    control,
  });

  const handleSave = useCallback(
    (properties: any) => {
      if (properties) onChange(properties);
    },
    [onChange]
  );

  const handleSaveDebounced = useDebouncedCallback(handleSave, 500);

  useEffect(() => {
    const subscription = watch((value) => {
      handleSaveDebounced(value.properties);
    });
    return () => subscription.unsubscribe();
  }, [handleSaveDebounced, watch]);

  const handleAddProperty = () => {
    append({
      type: FIELD_TYPES.TEXT,
      label: `${SCHEMA[FIELD_TYPES.TEXT].placeholder} ${fields.length}`,
      position: fields.length,
    });
  };

  const onSubmit = (data: FormValues) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <EuiFlexGroup direction="column">
        {fields.map((field, index) => (
          <EuiPanel key={field.id} hasShadow={false} paddingSize="m">
            <EuiFlexItem>
              <MetaField
                form={{
                  control,
                  update,
                  remove: () => remove(index),
                }}
                index={index}
                property={field}
              />
            </EuiFlexItem>
          </EuiPanel>
        ))}
      </EuiFlexGroup>
      <EuiSpacer />
      <EuiButton
        size="s"
        fullWidth={false}
        color="primary"
        onClick={handleAddProperty}
      >
        Add a field
      </EuiButton>
    </form>
  );
};
