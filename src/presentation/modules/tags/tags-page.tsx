import {
  DropResult,
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiFlexGroup,
  EuiFlexItem,
  euiPaletteColorBlindBehindText,
  EuiPopover,
  useGeneratedHtmlId,
} from "@elastic/eui";
import { useEffect, useState } from "react";
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
import { CreateTagsInput } from "API";
import { CategoryMenu } from "./components/tag-category-menu";
import {
  useCreateTagCategory,
  useTagCategories,
} from "core/modules/tag-categories/hooks";
import { useCreateTag, useTags, useUpdateTag } from "core/modules/tags/hooks";
import { NewTag } from "./components/new-tag";
import { Card } from "./tags.styles";
import { DEFAULT_COLOR_MODE } from "@elastic/eui/src/services/theme/utils";

interface IList {
  content: any;
  id: string;
}

interface Category {
  id: number;
  title: string;
}

const DEFAULT_CATEGORY = "default";
export const TagsPage = () => {
  const navigate = useNavigate();
  const [isSeeding, setIsSeeding] = useState(false);
  const [lists, setLists] = useState<{ [id: string]: IList[] }>();
  const { id } = useParams() as { id: string };
  const { data: categories } = useTagCategories(id);
  const createCategoryMutation = useCreateTagCategory();
  const updateTagMutation = useUpdateTag();
  const createTagMutation = useCreateTag();
  const { data: tags } = useTags(id, categories && categories.length > 0);

  useEffect(() => {
    if (!isSeeding && categories && categories.length === 0) {
      createCategoryMutation.mutate({ name: "Uncategorized", projectsID: id });
      setIsSeeding(true);
    }
  }, [categories, createCategoryMutation, id, isSeeding]);

  useEffect(() => {
    const lists = categories?.reduce((acc: any, category) => {
      acc[category.id] = tags
        ?.filter((story) => story && story.tagCategoryID === category.id)
        .map((tag) => {
          return {
            content: getTagCard(tag),
            id: tag?.id,
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

  const handleCreateTag = (categoryId: string, label: string) => {
    createTagMutation.mutateAsync({
      label,
      projectsID: id,
      tagCategoryID: categoryId,
    } as CreateTagsInput);
    //Make a call to create story and then redirect
  };

  const getTagCard = (story: any) => (
    <Card
      hasBorder
      paddingSize="s"
      layout="horizontal"
      onClick={() => {
        navigate(`/stories/${story.id}`);
      }}
      titleSize="xs"
      title={story.label}
      description={""}
    />
  );
  return categories && lists && categories.length > 0 ? (
    <EuiFlexGroup responsive={false} gutterSize="none">
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
                {() => (
                  <EuiPanel
                    hasShadow={false}
                    hasBorder={false}
                    paddingSize="s"
                    style={{
                      width: 320,
                      height: "100%",
                      borderRight: "1px solid #D3DAE6",
                    }}
                  >
                    <EuiFlexGroup
                      responsive={false}
                      gutterSize="s"
                      alignItems="center"
                    >
                      <EuiFlexItem grow={false}>
                        <EuiTitle size="xxs">
                          <h1 color={visColorsBehindText[didx]}>
                            {category.name}
                          </h1>
                        </EuiTitle>
                      </EuiFlexItem>
                      <EuiFlexItem></EuiFlexItem>
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
                        handleCreateTag(category.id, label)
                      }
                    />

                    <EuiDroppable
                      droppableId={category.id}
                      grow
                      type="MICRO"
                      spacing="s"
                      style={{ flex: "1 0 50%", marginTop: "1rem" }}
                    >
                      {(lists[category.id] || []).map((story, idx) => (
                        <EuiDraggable
                          key={story.id}
                          index={idx}
                          draggableId={story.id}
                          spacing="none"
                          style={{
                            // width: "306px",
                            marginBottom: "1rem",
                          }}
                        >
                          {story.content}
                        </EuiDraggable>
                      ))}
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
          <CategoryMenu />
        </EuiPanel>
      </EuiFlexItem>
    </EuiFlexGroup>
  ) : null;
};
