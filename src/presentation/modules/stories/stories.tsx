import {
  DropResult,
  EuiAvatar,
  EuiBadge,
  EuiButton,
  EuiCard,
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiFlexGroup,
  EuiFlexItem,
  euiPaletteColorBlindBehindText,
  EuiPopover,
  htmlIdGenerator,
  useGeneratedHtmlId,
} from "@elastic/eui";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  EuiDragDropContext,
  EuiDraggable,
  EuiDroppable,
  EuiButtonIcon,
  EuiPanel,
  euiDragDropMove,
  euiDragDropReorder,
  EuiTitle,
  EuiSpacer,
} from "@elastic/eui";

const makeId = htmlIdGenerator();

interface IList {
  content: string;
  id: string;
}

interface Category {
  id: number;
  title: string;
}

const makeList = (number: number, start: number = 1) =>
  Array.from({ length: number }, (v, k) => k + start).map((el) => {
    return {
      content: `Item ${el}`,
      id: makeId(),
    } as unknown as IList;
  });

export const Stories: React.FC = () => {
  const [list, setList] = useState<Category[]>([
    { id: 1, title: "B2B Interviews" },
    { title: "B2C Interviews", id: 2 },
  ]);
  const [list1, setList1] = useState<IList[]>(makeList(3));
  const [list2, setList2] = useState<IList[]>(makeList(3, 4));
  const [isPopoverOpen, setPopover] = useState(false);
  const smallContextMenuPopoverId = useGeneratedHtmlId({
    prefix: "smallContextMenuPopover",
  });

  const onButtonClick = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };
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
    [key: string]: Dispatch<SetStateAction<Category[] | IList[]>>;
  };
  const items = [
    <EuiContextMenuItem key="copy" icon="copy" onClick={closePopover}>
      Copy
    </EuiContextMenuItem>,
    <EuiContextMenuItem key="edit" icon="pencil" onClick={closePopover}>
      Edit
    </EuiContextMenuItem>,
    <EuiContextMenuItem key="share" icon="share" onClick={closePopover}>
      Share
    </EuiContextMenuItem>,
  ];
  const button = (
    <EuiButtonIcon
      iconType="boxesHorizontal"
      aria-label="Category Menu"
      onClick={onButtonClick}
    />
  );
  const visColorsBehindText = euiPaletteColorBlindBehindText();
  const onDragEnd = ({ source, destination }: DropResult) => {
    if (source && destination) {
      if (source.droppableId === destination.droppableId) {
        const items = euiDragDropReorder(
          lists[destination.droppableId],
          source.index,
          destination.index
        ) as unknown as IList[] | Category[];

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
    <EuiFlexGroup responsive={false} gutterSize="s">
      <EuiFlexItem grow={false}>
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
                key={did.id}
                index={didx}
                draggableId={`COMPLEX_DRAGGABLE_${did.id}`}
                spacing="l"
                disableInteractiveElementBlocking // Allows button to be drag handle
              >
                {(provided) => (
                  <EuiPanel
                    style={{
                      backgroundColor: "#f2f2f3",
                    }}
                    hasShadow={false}
                    hasBorder={false}
                    paddingSize="s"
                  >
                    <EuiFlexGroup
                      responsive={false}
                      gutterSize="s"
                      alignItems="center"
                    >
                      <EuiFlexItem grow={false}>
                        <EuiTitle size="xxxs">
                          <EuiBadge color={visColorsBehindText[didx]}>
                            {did.title}
                          </EuiBadge>
                        </EuiTitle>
                      </EuiFlexItem>
                      <EuiFlexItem></EuiFlexItem>
                      <EuiFlexItem grow={false}>
                        <EuiPopover
                          id={smallContextMenuPopoverId}
                          button={button}
                          isOpen={isPopoverOpen}
                          closePopover={closePopover}
                          panelPaddingSize="none"
                          anchorPosition="downRight"
                        >
                          <EuiContextMenuPanel size="s" items={items} />
                        </EuiPopover>
                      </EuiFlexItem>
                    </EuiFlexGroup>
                    <EuiSpacer />
                    <EuiButton size="s" color="accent" fullWidth>
                      Add Story
                    </EuiButton>

                    <EuiDroppable
                      droppableId={`COMPLEX_DROPPABLE_AREA_${did.id}`}
                      type="MICRO"
                      spacing="s"
                      style={{ flex: "1 0 50%", marginTop: "1rem" }}
                    >
                      {lists[`COMPLEX_DROPPABLE_AREA_${did.id}`].map(
                        ({ content, id }: IList, idx) => (
                          <EuiDraggable
                            key={id}
                            index={idx}
                            draggableId={id}
                            spacing="none"
                            style={{
                              width: "306px",
                              height: "324px",
                            }}
                          >
                            <EuiCard
                              textAlign="left"
                              hasBorder
                              onClick={() => {}}
                              image={
                                <div>
                                  <img
                                    src={`https://source.unsplash.com/400x200/?business-work&sig=${
                                      Math.random() * 1000
                                    }`}
                                    alt="Nature"
                                  />
                                </div>
                              }
                              title={`Interview ${idx} `}
                              description={`Interview ${idx} `}
                              footer={
                                <>
                                  <EuiAvatar
                                    size="m"
                                    name="Person 1"
                                    imageUrl={`https://source.unsplash.com/400x200/?people&sig=${Math.random()}`}
                                  />
                                  &nbsp;
                                  <EuiAvatar
                                    size="m"
                                    name="Person 2"
                                    imageUrl={`https://source.unsplash.com/400x200/?people&sig=${Math.random()}`}
                                  />
                                </>
                              }
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
      </EuiFlexItem>
      <EuiFlexItem
        style={{
          width: "306px",
          height: "324px",
          padding: "16px 0",
        }}
        grow={false}
      >
        <EuiPanel
          style={{
            backgroundColor: "#f2f2f3",
          }}
          grow={false}
          hasShadow={false}
          hasBorder={false}
          paddingSize="s"
        >
          <EuiButton color="primary" fill={false} size="s" fullWidth>
            New Group
          </EuiButton>
        </EuiPanel>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
