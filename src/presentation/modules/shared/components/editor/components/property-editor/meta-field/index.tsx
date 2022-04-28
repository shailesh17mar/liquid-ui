import {
  EuiFlexGroup,
  EuiButtonEmpty,
  EuiFlexItem,
  EuiComboBoxOptionOption,
} from "@elastic/eui";
import { Control, Controller, UseFieldArrayUpdate } from "react-hook-form";
import React, { useState } from "react";
import {
  ComboBoxOption,
  ComplexValue,
  PrimitiveValue,
  FIELD_TYPES,
  MetaProperty,
  SCHEMA,
  SelectOption,
  FormValues,
} from "../types";
import { MetaFieldValue } from "./meta-field-value";
import { FieldSelect } from "../field-select";

export interface FieldProps {
  form: {
    control: Control<
      {
        properties: MetaProperty[];
      },
      object
    >;
    update: UseFieldArrayUpdate<FormValues, "properties">;
    remove: () => void;
  };
  property: MetaProperty;
  name?: string;
  index: number;
  value?: string;
}
export const MetaField: React.FC<FieldProps> = ({
  property,
  form: { control, update, remove },
  index,
}) => {
  const [isInEditMode, setEditMode] = useState<boolean>(false);
  const [value, setValue] = useState<
    string | number | ComboBoxOption[] | undefined
  >(property.selectedOptions || property.value);
  const [options, setOptions] = useState<ComboBoxOption[]>(
    (property.options as ComboBoxOption[]) || []
  );
  const fieldType = property.type || FIELD_TYPES.TEXT;
  const fieldSchema = SCHEMA[fieldType];
  const MetaFieldEditor = fieldSchema.component;
  const props =
    fieldType === FIELD_TYPES.MULTI_SELECT ||
    fieldType === FIELD_TYPES.COMPANY ||
    fieldType === FIELD_TYPES.SELECT
      ? ({
          options: property.options as ComboBoxOption[],
          selectedOptions: property.selectedOptions || [],
          onChange: (selectedOptions: ComboBoxOption[]) => {
            update(index, {
              ...property,
              selectedOptions,
            });
          },
          onCreateOption:
            fieldType !== FIELD_TYPES.COMPANY
              ? (
                  searchValue: string,
                  flattenedOptions: EuiComboBoxOptionOption[] = []
                ) => {
                  const normalizedSearchValue = searchValue
                    .trim()
                    .toLowerCase();

                  if (!normalizedSearchValue) {
                    return;
                  }

                  const newOption = {
                    label: searchValue,
                    value: searchValue,
                  };

                  // Create the option if it doesn't exist.
                  const allOptions =
                    flattenedOptions.findIndex(
                      (option) =>
                        option.label.trim().toLowerCase() ===
                        normalizedSearchValue
                    ) === -1
                      ? [...options, newOption]
                      : options;

                  setOptions(allOptions);
                  // Select the option.
                  const selectedOptions =
                    fieldType === FIELD_TYPES.MULTI_SELECT && value
                      ? [...(value as ComboBoxOption[]), newOption]
                      : [newOption];
                  setValue(selectedOptions);
                  update(index, {
                    ...property,
                    selectedOptions,
                    options: allOptions,
                  });
                }
              : undefined,
          onBlur: () => {
            setEditMode(false);
          },
        } as ComplexValue)
      : ({
          options: property.options as SelectOption[],
          value: value,
          onChange: (e) => {
            const value = e.target ? e.target.value : e;
            setValue(value);
            if (fieldType === FIELD_TYPES.DATE)
              update(index, {
                ...property,
                label: property.label,
                value: value,
              });
          },
          onBlur: (e) => {
            update(index, {
              ...property,
              label: property.label,
              value: typeof e === "object" ? e.target.value : e,
              selectedIndex: typeof e === "object" && e.target.selectedIndex,
            });
            setEditMode(false);
          },
        } as PrimitiveValue);

  const onValueButtonClick = () => {
    setEditMode(true);
  };

  return (
    <EuiFlexGroup direction="row">
      <EuiFlexItem grow={false} style={{ minWidth: 200 }}>
        <EuiFlexGroup alignItems="flexStart">
          <FieldSelect
            onRemove={remove}
            label={property.label}
            type={property.type}
            onChange={(label: string, type: FIELD_TYPES) => {
              update(index, {
                ...property,
                type,
                label,
              });
            }}
          />
        </EuiFlexGroup>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiFlexGroup alignItems="flexStart">
          {isInEditMode ? (
            <Controller
              name={`properties.${index}.value`}
              control={control}
              render={({ field }) => <MetaFieldEditor {...props} />}
            />
          ) : (
            <EuiButtonEmpty onClick={onValueButtonClick}>
              <MetaFieldValue property={property} />
            </EuiButtonEmpty>
          )}
        </EuiFlexGroup>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
