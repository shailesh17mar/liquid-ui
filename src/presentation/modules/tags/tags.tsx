import {
  DropResult,
  EuiFieldText,
  EuiColorPicker,
  EuiColorPickerSwatch,
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiTextArea,
  EuiFlexGroup,
  EuiFlexItem,
  EuiOutsideClickDetector,
  euiPaletteColorBlindBehindText,
  EuiPopover,
  transparentize,
  useGeneratedHtmlId,
} from "@elastic/eui";
import { useEffect, useMemo, useReducer, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { CreateTagsInput, Tags as Tag } from "API";
import { CategoryMenu } from "./components/tag-category-menu";
import {
  useCreateTagCategory,
  useTagCategories,
  useUpdateTagCategory,
} from "core/modules/tag-categories/hooks";
import { useCreateTag, useTags, useUpdateTag } from "core/modules/tags/hooks";
import { NewTag } from "./components/new-tag";
import { Card } from "./tags.styles";
import { DEFAULT_COLOR_MODE } from "@elastic/eui/src/services/theme/utils";
import {
  HIGHLIGHT_COLORS,
  HIGHLIGHT_TYPES,
} from "../shared/components/editor/components/highlight-control/color-picker";
import { useDebouncedCallback } from "use-debounce";
import { setPropsForRestrictedPageWidth } from "@elastic/eui/src/components/page/_restrict_width";

interface IList {
  content: any;
  color: string;
  id: string;
}

interface Category {
  id: number;
  title: string;
}

const DEFAULT_CATEGORY = "default";

export const Tags = () => {
  const navigate = useNavigate();
  const [isSeeding, setIsSeeding] = useState(false);
  const [hasUpdates, setHasUpdates] = useState(true);
  const [lists, setLists] = useState<{ [id: string]: IList[] }>();
  const [editingTitle, setEditingTitle] = useState<number>(-1);
  const { id } = useParams() as { id: string };
  const { data: categories } = useTagCategories(id);
  const createCategoryMutation = useCreateTagCategory();
  const updateCategoryMutation = useUpdateTagCategory();
  const updateTagMutation = useUpdateTag();
  const createTagMutation = useCreateTag();
  const { data: tags } = useTags(id, categories && categories.length > 0);

  const swatches = useMemo(
    () => Object.values(HIGHLIGHT_TYPES).map((highlight) => highlight.color),
    []
  );
  useEffect(() => {
    if (!isSeeding && categories && categories.length === 0) {
      createCategoryMutation.mutate({
        name: "Uncategorized",
        projectsID: id,
        color: "",
      });
      setIsSeeding(true);
    }
  }, [categories, createCategoryMutation, id, isSeeding]);

  const handleCategoryUpdate = async (
    id: string,
    name: string,
    color: string
  ) => {
    updateCategoryMutation.mutateAsync({
      id,
      name,
      color,
    });
  };

  useEffect(() => {
    const lists = (categories || []).reduce((acc: any, category) => {
      acc[category.id] = tags
        ?.filter((story) => story && story.tagCategory.id === category.id)
        .map((tag) => {
          return {
            content: getTagCard(tag),
            id: tag?.id,
            color: tag?.color,
          };
        });
      return acc;
    }, {});

    setLists(lists);
  }, [categories, tags]);
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
  const onDragEnd = async ({ source, destination }: DropResult) => {
    if (!lists) return;
    const actions = Object.keys(lists).reduce((acc: any, id: string) => {
      acc[id] = (list: IList[]) =>
        setLists({
          ...lists,
          [id]: list,
        });
      return acc;
    }, {});
    if (source && destination) {
      if (source.droppableId === destination.droppableId) {
        const items = euiDragDropReorder(
          //@ts-ignore
          lists[destination.droppableId],
          source.index,
          destination.index
        ) as unknown as IList[] | Category[];

        actions[destination.droppableId](items);
      } else {
        const sourceId = source.droppableId;
        const destinationId = destination.droppableId;
        const result = euiDragDropMove(
          //@ts-ignore
          lists[sourceId],
          //@ts-ignore
          lists[destinationId],
          source,
          destination
        );
        const story = lists[sourceId][source.index];
        updateTagMutation.mutate({
          id: story.id,
          tagCategoryID: destinationId,
        });
        setLists({
          ...lists,
          [sourceId]: result[sourceId],
          [destinationId]: result[destinationId],
        });

        //update the category of these stories
      }
    }
  };

  const handleCreateTag = (
    categoryId: string,
    color: string,
    label: string
  ) => {
    createTagMutation.mutateAsync({
      label,
      projectsID: id,
      tagCategoryID: categoryId,
      color: color,
    } as CreateTagsInput);
    //Make a call to create story and then redirect
  };

  const handleTagUpdate = useDebouncedCallback((id: string, label: string) => {
    updateTagMutation.mutate({
      id,
      label,
    });
  }, 500);

  const getTagCard = (story: Required<Tag>) => {
    const value = story.label;
    return (
      <Card
        paddingSize="s"
        layout="horizontal"
        onClick={() => {
          // navigate(`/stories/${story.id}`);
        }}
        titleSize="xs"
        title={""}
        color={
          HIGHLIGHT_TYPES[
            (story.tagCategory.color || story.color) as HIGHLIGHT_COLORS
          ].color
        }
        description={""}
      >
        <input
          defaultValue={story.label}
          size={value.length}
          onChange={(e) => {
            handleTagUpdate(story.id, e.target.value);
          }}
        />
      </Card>
    );
  };
  const getColor = (color: string) =>
    Object.keys(HIGHLIGHT_TYPES).find(
      (highlightType) =>
        HIGHLIGHT_TYPES[highlightType as HIGHLIGHT_COLORS].color === color
    )!!;
  return categories && lists && categories.length > 0 ? (
    <EuiFlexGroup gutterSize="none" style={{ overflowX: "auto" }}>
      <EuiFlexGroup gutterSize="none">
        <EuiFlexItem grow={false}>
          <EuiDragDropContext onDragEnd={onDragEnd}>
            <EuiDroppable
              droppableId="COMPLEX_DROPPABLE_PARENT"
              type="MACRO"
              direction="horizontal"
              spacing="l"
              grow
              style={{ display: "flex" }}
            >
              {categories.map((category, didx) => (
                <EuiDraggable
                  key={category.id}
                  index={didx}
                  draggableId={category.id}
                  spacing="l"
                >
                  {() => {
                    const categoryColor = category.color
                      ? HIGHLIGHT_TYPES[category.color as HIGHLIGHT_COLORS]
                          .color
                      : HIGHLIGHT_TYPES[HIGHLIGHT_COLORS.GREY].color;
                    return (
                      <EuiPanel
                        paddingSize="s"
                        // color="subdued"
                        hasBorder={false}
                        hasShadow={false}
                        style={{
                          width: 320,
                          height: "100%",
                          background: transparentize(categoryColor, 0.3),
                          border: `solid 1px ${categoryColor}`,
                        }}
                      >
                        <EuiFlexGroup
                          responsive={false}
                          alignItems="center"
                          gutterSize="s"
                        >
                          <EuiFlexItem>
                            {editingTitle === didx ? (
                              <EuiOutsideClickDetector
                                onOutsideClick={() => {
                                  setEditingTitle(-1);
                                }}
                              >
                                <EuiFieldText
                                  placeholder={category.name}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault();
                                      handleCategoryUpdate(
                                        category.id,
                                        //@ts-ignore
                                        e.target.value,
                                        getColor(categoryColor)
                                      );
                                      setEditingTitle(-1);
                                    }
                                  }}
                                />
                              </EuiOutsideClickDetector>
                            ) : (
                              <EuiTitle size="xs">
                                <h2
                                  onClick={() => didx && setEditingTitle(didx)}
                                >
                                  {category.name}
                                </h2>
                              </EuiTitle>
                            )}
                          </EuiFlexItem>
                          {
                            <EuiFlexItem grow={false}>
                              <EuiColorPicker
                                disabled={!Boolean(didx)}
                                style={{ margin: 0 }}
                                mode="swatch"
                                swatches={swatches}
                                onChange={(color: string) =>
                                  handleCategoryUpdate(
                                    category.id,
                                    category.name,
                                    getColor(color)
                                  )
                                }
                                color={categoryColor}
                                button={
                                  <EuiColorPickerSwatch
                                    color={categoryColor}
                                    aria-label="Select a new color"
                                  />
                                }
                              />
                            </EuiFlexItem>
                          }
                          {/* <EuiFlexItem grow={false}>
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
                      </EuiFlexItem> */}
                        </EuiFlexGroup>
                        <EuiSpacer />
                        <NewTag
                          onCreate={(label: string) =>
                            handleCreateTag(category.id, category.color, label)
                          }
                        />

                        <EuiDroppable
                          droppableId={category.id}
                          grow
                          type="MICRO"
                          spacing="s"
                          style={{
                            flex: "1 0 50%",
                            marginTop: "1rem",
                          }}
                        >
                          {(lists[category.id] || []).map((story, idx) => (
                            <EuiDraggable
                              key={story.id}
                              index={idx}
                              draggableId={story.id}
                              spacing="none"
                              style={{
                                background: story.color,
                                // width: "306px",
                                marginBottom: "1rem",
                              }}
                            >
                              {story.content}
                            </EuiDraggable>
                          ))}
                        </EuiDroppable>
                      </EuiPanel>
                    );
                  }}
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
            hasShadow={false}
            grow={false}
            paddingSize="s"
          >
            <CategoryMenu />
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFlexGroup>
  ) : null;
};
