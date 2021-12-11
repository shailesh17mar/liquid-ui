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
import React from "react";
import { FIELD_TYPES, MetaProperty } from "./types";
import { MetaField } from "./meta-field";
import { DraggableLocation } from "@elastic/eui/src/components/drag_and_drop";
import { DragHandle, Dragula } from "./property-editor.styles";

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
  });
  const { fields, update, append, remove, move } = useFieldArray({
    name: "properties",
    control,
  });

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
        color="text"
        onClick={onAddButtonClick}
        style={{ marginLeft: 32 }}
      >
        Add a field
      </EuiButton>
    </form>
  );
};
