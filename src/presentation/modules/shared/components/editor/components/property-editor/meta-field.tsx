import {
  EuiFlexGroup,
  EuiButtonEmpty,
  EuiFlexItem,
  EuiFieldText,
  useGeneratedHtmlId,
  EuiSpacer,
  EuiContextMenuItem,
  EuiPopover,
  EuiContextMenuPanel,
  EuiComboBox,
  EuiDatePicker,
  EuiFieldNumber,
  EuiSelect,
  EuiTextColor,
  EuiText,
  EuiBadge,
  EuiFormRow,
  EuiIcon,
} from "@elastic/eui";
import { Control, Controller } from "react-hook-form";
import React, { useCallback, useEffect, useState } from "react";
import {
  ComboBoxOption,
  FIELD_TYPES,
  MetaProperty,
  SelectOption,
} from "./types";
import { Moment } from "moment";
import moment from "moment";
import { string } from "prop-types";
import { profileEnd } from "console";
import { CompanyFinder } from "./company-finder";

interface PrimitiveValue {
  value?: string | number;
  selectedOption?: SelectOption;
  onChange: (...event: any[]) => void;
  onBlur: (...event: any[]) => void;
  options?: SelectOption[];
}

export interface ComplexValue {
  selectedOptions?: ComboBoxOption[];
  onChange: (values: ComboBoxOption[]) => void;
  onBlur: (...event: any[]) => void;
  options?: ComboBoxOption[];
}

export interface FIELD_FORM {
  icon: string;
  label: string;
  placeholder: string;
  component: React.FC<PrimitiveValue | ComplexValue>;
}

const SCHEMA: {
  [key in FIELD_TYPES]: FIELD_FORM;
} = {
  [FIELD_TYPES.TEXT]: {
    icon: "editorAlignLeft",
    label: "Text",
    placeholder: "Property",
    component: (props) => (
      <EuiFieldText autoFocus fullWidth {...(props as PrimitiveValue)} />
    ),
  },
  [FIELD_TYPES.NUMBER]: {
    icon: "number",
    label: "Number",
    placeholder: "Property",
    component: (props) => (
      <EuiFieldNumber autoFocus fullWidth {...(props as PrimitiveValue)} />
    ),
  },
  [FIELD_TYPES.SELECT]: {
    icon: "arrowDown",
    label: "Select",
    placeholder: "Property",
    component: ({ options, ...props }) => (
      <EuiSelect
        autoFocus
        fullWidth
        {...(props as PrimitiveValue)}
        options={options as SelectOption[]}
      />
    ),
  },
  [FIELD_TYPES.MULTI_SELECT]: {
    icon: "list",
    label: "Multi-select",
    placeholder: "Property",
    component: (props) => {
      const { options, selectedOptions, onChange, onBlur } =
        props as ComplexValue;
      return (
        <EuiComboBox
          autoFocus
          fullWidth
          options={options}
          selectedOptions={selectedOptions}
          onChange={(values) => onChange(values as ComboBoxOption[])}
          onBlur={onBlur}
        />
      );
    },
  },
  [FIELD_TYPES.COMPANY]: {
    icon: "list",
    label: "Company",
    placeholder: "Property",
    component: (props) => {
      return <CompanyFinder {...(props as ComplexValue)} />;
    },
  },
  [FIELD_TYPES.URL]: {
    icon: "link",
    label: "URL",
    placeholder: "Property",
    component: (props) => (
      <EuiFieldText
        fullWidth
        autoFocus
        {...(props as PrimitiveValue)}
        type="url"
      />
    ),
  },
  [FIELD_TYPES.EMAIL]: {
    icon: "email",
    label: "Email",
    placeholder: "Property",
    component: (props) => (
      <EuiFieldText
        fullWidth
        autoFocus
        {...(props as PrimitiveValue)}
        type="email"
      />
    ),
  },
  [FIELD_TYPES.DATE]: {
    icon: "calendar",
    label: "Date",
    placeholder: "Date Done",
    component: (props) => {
      const { value, onChange, onBlur } = props as PrimitiveValue;
      return (
        <EuiDatePicker
          fullWidth={true}
          autoFocus
          selected={moment(value as string)}
          onChange={(date: Moment, e) => {
            onChange(date.toISOString());
            onBlur();
          }}
          onClickOutside={onBlur}
          onBlur={onBlur}
        />
      );
    },
  },
};

export interface FieldProps {
  form: {
    control: Control<
      {
        properties: MetaProperty[];
      },
      object
    >;
    update: (index: number, value: Partial<MetaProperty>) => void;
    remove: () => void;
  };
  property: MetaProperty;
  name?: string;
  index: number;
  value?: string;
}

interface MetaFieldValueProps {
  property: MetaProperty;
}
const MetaFieldValue: React.FC<MetaFieldValueProps> = ({ property }) => {
  const type = property.type;
  const hasValue =
    type === FIELD_TYPES.MULTI_SELECT || type === FIELD_TYPES.COMPANY
      ? property.selectedOptions && property.selectedOptions?.length > 0
      : Boolean(property.value);
  const value = hasValue ? property.value : "Empty";
  if (!hasValue) return <EuiTextColor color="subdued">{value}</EuiTextColor>;
  switch (type) {
    case FIELD_TYPES.DATE:
      return (
        <EuiTextColor color="text">
          {moment(value).format("MMMM DD, YYYY")}
        </EuiTextColor>
      );
    case FIELD_TYPES.MULTI_SELECT:
      return (
        <EuiFlexGroup wrap responsive={false} gutterSize="xs">
          {property.selectedOptions?.map((option, index) => (
            <EuiFlexItem key={index} grow={false}>
              <EuiBadge color={option.color}>{option.label}</EuiBadge>
            </EuiFlexItem>
          ))}
        </EuiFlexGroup>
      );
    case FIELD_TYPES.COMPANY:
      const company = property.selectedOptions && property.selectedOptions[0];
      return (
        <EuiFlexGroup gutterSize="xs">
          {company?.value && (
            <EuiFlexItem grow={false}>
              <img
                style={{
                  width: "25px",
                  height: "auto",
                }}
                alt="company-logo"
                src={`https://logo.clearbit.com/${company?.value}`}
              />
            </EuiFlexItem>
          )}
          <EuiFlexItem
            grow={false}
            style={{
              color: "#69707D",
              fontWeight: 400,
            }}
          >
            {company?.label || "Select company"}
          </EuiFlexItem>
        </EuiFlexGroup>
      );
    case FIELD_TYPES.URL:
    case FIELD_TYPES.EMAIL:
      return (
        <EuiTextColor
          style={{
            textDecoration: "underline",
          }}
        >
          {value}
        </EuiTextColor>
      );
    case FIELD_TYPES.SELECT:
      return (
        <EuiTextColor>
          {(property.options as SelectOption[])[property.selectedIndex!!].text}
        </EuiTextColor>
      );
    default:
      return <EuiTextColor>{value}</EuiTextColor>;
  }
};
export const MetaField: React.FC<FieldProps> = ({
  property,
  form: { control, update, remove },
  index,
}) => {
  const [isPopoverOpen, setPopover] = useState<boolean>(false);
  const [isInEditMode, setEditMode] = useState<boolean>(false);
  const [fieldLabel, setFieldLabel] = useState<string | undefined>(
    property.label
  );
  const [value, setValue] = useState<
    string | number | ComboBoxOption[] | undefined
  >(property.selectedOptions || property.value);
  const [fieldType, setFieldType] = useState<FIELD_TYPES>(
    property.type || FIELD_TYPES.TEXT
  );
  const fieldSchema = SCHEMA[fieldType];
  const MetaFieldEditor = fieldSchema.component;
  const props =
    property.type === FIELD_TYPES.MULTI_SELECT ||
    property.type === FIELD_TYPES.COMPANY
      ? ({
          options: property.options as ComboBoxOption[],
          selectedOptions: property.selectedOptions,
          onChange: (selectedOptions: ComboBoxOption[]) => {
            update(index, {
              ...property,
              selectedOptions,
            });
          },
        } as ComplexValue)
      : ({
          options: property.options as SelectOption[],
          value: property.value,
          onChange: (e) => {
            update(index, {
              ...property,
              value: typeof e === "object" ? e.target.value : e,
              selectedIndex: typeof e === "object" && e.target.selectedIndex,
            });
          },
        } as PrimitiveValue);
  const smallContextMenuPopoverId = useGeneratedHtmlId({
    prefix: "smallContextMenuPopover",
  });

  const onButtonClick = () => {
    setPopover(!isPopoverOpen);
  };
  const onValueButtonClick = () => {
    setEditMode(true);
  };
  const closePopover = () => {
    update(index, { ...property, label: fieldLabel, type: fieldType });
    setPopover(false);
  };
  const items = [
    <Controller
      name={`properties.${index}.label`}
      control={control}
      render={({ field }) => (
        <EuiFieldText
          {...field}
          maxLength={40}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              closePopover();
            }
          }}
          onChange={(e) => {
            setFieldLabel(e.target.value);
            field.onChange(e.target.value);
          }}
        />
      )}
    />,
    <EuiSpacer />,
    ...Object.keys(SCHEMA).map((key) => {
      const value = SCHEMA[key as unknown as FIELD_TYPES] as FIELD_FORM;
      return (
        <EuiContextMenuItem
          key={key}
          icon={value.icon}
          onClick={() => {
            setFieldType(key as unknown as FIELD_TYPES);
            closePopover();
          }}
        >
          {value.label}
        </EuiContextMenuItem>
      );
    }),
    <hr />,
    <EuiContextMenuItem icon={"trash"} onClick={remove}>
      Delete Property
    </EuiContextMenuItem>,
  ];
  const button = (
    <EuiButtonEmpty
      style={{ fontWeight: 600 }}
      color="text"
      iconType={fieldSchema.icon}
      onClick={onButtonClick}
    >
      {fieldLabel || fieldSchema.placeholder}
    </EuiButtonEmpty>
  );
  return (
    <EuiFlexGroup direction="row">
      <EuiFlexItem grow={false} style={{ minWidth: 200 }}>
        <EuiFlexGroup alignItems="flexStart">
          <EuiPopover
            id={smallContextMenuPopoverId}
            button={button}
            isOpen={isPopoverOpen}
            closePopover={closePopover}
            panelPaddingSize="none"
            anchorPosition="downLeft"
          >
            <EuiContextMenuPanel
              style={{
                width: 300,
                padding: 16,
              }}
              onSelect={(e) => {
                console.log(e);
              }}
              size="m"
              items={items}
            />
          </EuiPopover>
        </EuiFlexGroup>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiFlexGroup alignItems="flexStart">
          {isInEditMode ? (
            <Controller
              name={`properties.${index}.value`}
              control={control}
              render={({ field }) => (
                <MetaFieldEditor
                  {...props}
                  onBlur={() => {
                    setEditMode(false);
                  }}
                />
              )}
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
