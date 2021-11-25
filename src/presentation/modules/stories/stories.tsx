import { DropResult, EuiCard, htmlIdGenerator } from "@elastic/eui";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  EuiDragDropContext,
  EuiDraggable,
  EuiDroppable,
  EuiButtonIcon,
  EuiPanel,
  euiDragDropMove,
  euiDragDropReorder,
} from "@elastic/eui";

const makeId = htmlIdGenerator();

interface IList {
  content: string;
  id: string;
}

const makeList = (number: number, start: number = 1) =>
  Array.from({ length: number }, (v, k) => k + start).map((el) => {
    return {
      content: `Item ${el}`,
      id: makeId(),
    } as unknown as IList;
  });

export const Stories: React.FC = () => {
  const [list, setList] = useState<number[]>([1, 2]);
  const [list1, setList1] = useState<IList[]>(makeList(3));
  const [list2, setList2] = useState<IList[]>(makeList(3, 4));
  const lists = {
    COMPLEX_DROPPABLE_PARENT: list,
    COMPLEX_DROPPABLE_AREA_1: list1,
    COMPLEX_DROPPABLE_AREA_2: list2,
  } as unknown as { [key: string]: IList[] };
  const actions = {
    COMPLEX_DROPPABLE_PARENT: setList,
    COMPLEX_DROPPABLE_AREA_1: setList1,
    COMPLEX_DROPPABLE_AREA_2: setList2,
  } as unknown as {
    [key: string]: Dispatch<SetStateAction<number[] | IList[]>>;
  };
  const onDragEnd = ({ source, destination }: DropResult) => {
    if (source && destination) {
      if (source.droppableId === destination.droppableId) {
        const items = euiDragDropReorder(
          lists[destination.droppableId],
          source.index,
          destination.index
        ) as unknown as IList[] | number[];

        actions[destination.droppableId](items);
      } else {
        const sourceId = source.droppableId;
        const destinationId = destination.droppableId;
        const result = euiDragDropMove(
          lists[sourceId],
          lists[destinationId],
          source,
          destination
        );

        actions[sourceId](result[sourceId]);
        actions[destinationId](result[destinationId]);
      }
    }
  };
  return (
    <EuiDragDropContext onDragEnd={onDragEnd}>
      <EuiDroppable
        droppableId="COMPLEX_DROPPABLE_PARENT"
        type="MACRO"
        direction="horizontal"
        spacing="l"
        style={{ display: "flex" }}
      >
        {list.map((did, didx) => (
          <EuiDraggable
            key={did}
            index={didx}
            draggableId={`COMPLEX_DRAGGABLE_${did}`}
            spacing="l"
            disableInteractiveElementBlocking // Allows button to be drag handle
          >
            {(provided) => (
              <EuiPanel color="subdued" paddingSize="s">
                <EuiButtonIcon
                  iconType="grab"
                  aria-label="Drag Handle"
                  {...provided.dragHandleProps}
                />
                <EuiDroppable
                  droppableId={`COMPLEX_DROPPABLE_AREA_${did}`}
                  type="MICRO"
                  spacing="m"
                  style={{ flex: "1 0 50%" }}
                >
                  {lists[`COMPLEX_DROPPABLE_AREA_${did}`].map(
                    ({ content, id }: IList, idx) => (
                      <EuiDraggable
                        key={id}
                        index={idx}
                        draggableId={id}
                        spacing="m"
                        style={
                          {
                            width:'306px',
                            height:'324px'
                          }
                        }
                      >
                        <EuiCard
                          textAlign="left"
                          image={
                            <div>
                              <img
                                src="https://source.unsplash.com/400x200/?Nature"
                                alt="Nature"
                              />
                            </div>
                          }
                          title="Elastic in Nature"
                          description="Example of a card's description. Stick to one or two sentences."
                        />
                      </EuiDraggable>
                    )
                  )}
                </EuiDroppable>
              </EuiPanel>
            )}
          </EuiDraggable>
        ))}
      </EuiDroppable>
    </EuiDragDropContext>
  );
};
