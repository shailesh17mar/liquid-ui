import {
  EuiFieldText,
  EuiSpacer,
  EuiContextMenuItem,
  EuiIcon,
  EuiContextMenuPanel,
  EuiPopover,
  EuiButtonEmpty,
  useGeneratedHtmlId,
} from "@elastic/eui";
import { button } from "aws-amplify";
import { update, property, remove } from "lodash";
import { useState, useMemo, useEffect } from "react";
import { Controller } from "react-hook-form";
import { FIELD_FORM, FIELD_TYPES, SCHEMA } from "./types";

interface FieldSelectProps {
  label: string;
  type: FIELD_TYPES;
  onRemove: () => void;
  onChange: (label: string, type: FIELD_TYPES) => void;
}

export const FieldSelect: React.FC<FieldSelectProps> = ({
  label,
  type,
  onRemove,
  onChange,
}) => {
  const [fieldLabel, setFieldLabel] = useState<string>(label);
  const [fieldType, setFieldType] = useState<FIELD_TYPES>(type);
  const [isPopoverOpen, setPopover] = useState<boolean>(false);
  const contextMenuId = useGeneratedHtmlId({
    prefix: "contextMenuId",
  });

  const items = [
    ...Object.keys(SCHEMA).map((key) => {
      const value = SCHEMA[key as unknown as FIELD_TYPES] as FIELD_FORM;
      return (
        <EuiContextMenuItem
          key={key}
          icon={<EuiIcon type={value.icon} />}
          onClick={() => {
            const fieldType = parseInt(key);
            setFieldType(fieldType);
          }}
        >
          {value.label}
        </EuiContextMenuItem>
      );
    }),
    <hr />,
    <EuiContextMenuItem icon={"trash"} onClick={onRemove}>
      Delete Property
    </EuiContextMenuItem>,
  ];

  const handleMenuButtonClick = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    onChange(fieldLabel, fieldType);
    setPopover(false);
  };

  const button = (
    <EuiButtonEmpty
      style={{ fontWeight: 600 }}
      color="text"
      iconType={SCHEMA[fieldType].icon}
      onClick={handleMenuButtonClick}
    >
      {fieldLabel}
    </EuiButtonEmpty>
  );

  return (
    <EuiPopover
      id={contextMenuId}
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      panelPaddingSize="s"
      anchorPosition="downLeft"
    >
      <EuiFieldText
        value={fieldLabel}
        maxLength={40}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            closePopover();
          }
        }}
        onChange={(e) => {
          setFieldLabel(e.target.value);
        }}
      />
      <EuiContextMenuPanel
        style={{
          width: 300,
          padding: 16,
        }}
        size="s"
        items={items}
      />
    </EuiPopover>
  );
};
