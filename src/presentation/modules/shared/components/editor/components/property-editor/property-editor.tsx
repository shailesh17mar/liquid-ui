import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  euiPaletteColorBlindBehindText,
  EuiDraggable,
  EuiDragDropContext,
  EuiDroppable,
  EuiPanel,
  EuiIcon,
} from "@elastic/eui";
import { useForm, useFieldArray } from "react-hook-form";
import React, { useCallback, useEffect } from "react";
import { FIELD_TYPES, MetaProperty } from "./types";
import { MetaField } from "./meta-field";
import { DraggableLocation } from "@elastic/eui/src/components/drag_and_drop";
import { DragHandle, Dragula } from "./property-editor.styles";
import { useDebouncedCallback } from "use-debounce";

export interface FormValues {
  properties: MetaProperty[];
}

const colors = euiPaletteColorBlindBehindText();

/*
Default person field
When name is provided create an entry
*/
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

  const { fields, update, append, remove, move } = useFieldArray({
    name: "properties",
    control,
  });

  const handleSave = useCallback(
    (properties: any) => {
      if (properties) onChange(properties);
    },
    [onChange]
  );
  const handleSaveDebounced = useDebouncedCallback(handleSave, 1000);
  useEffect(() => {
    const subscription = watch((value) =>
      handleSaveDebounced(value.properties)
    );
    return () => subscription.unsubscribe();
  }, [handleSaveDebounced, watch]);

  const onAddButtonClick = () => {
    append({
      type: FIELD_TYPES.TEXT,
    });
  };
  const onDragEnd = ({
    source,
    destination,
  }: {
    source?: DraggableLocation;
    destination?: DraggableLocation;
  }) => {
    if (source && destination) {
      move(source.index, destination.index);
    }
  };

  const onSubmit = (data: FormValues) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <EuiFlexGroup direction="column">
        <EuiDragDropContext onDragEnd={onDragEnd}>
          <EuiDroppable droppableId="CUSTOM_HANDLE_DROPPABLE_AREA" spacing="l">
            {fields.map((field, index) => (
              <EuiDraggable
                spacing="m"
                key={field.id}
                index={index}
                draggableId={field.id}
                customDragHandle={true}
              >
                {(provided) => (
                  <EuiPanel hasShadow={false} paddingSize="s">
                    <Dragula>
                      <EuiFlexItem grow={false}>
                        <DragHandle
                          {...provided.dragHandleProps}
                          aria-label="Drag Handle"
                        >
                          <EuiIcon size="m" type="grab" title="Drag to move" />
                        </DragHandle>
                      </EuiFlexItem>
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
                    </Dragula>
                  </EuiPanel>
                )}
              </EuiDraggable>
            ))}
          </EuiDroppable>
        </EuiDragDropContext>
      </EuiFlexGroup>
      <EuiSpacer />
      <EuiButton
        size="s"
        fullWidth={false}
        color="primary"
        onClick={onAddButtonClick}
        style={{ marginLeft: 32 }}
      >
        Add a field
      </EuiButton>
    </form>
  );
};
