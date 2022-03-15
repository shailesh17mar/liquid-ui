import {
  DropResult,
  EuiButton,
  EuiCard,
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiOutsideClickDetector,
  euiPaletteColorBlindBehindText,
  EuiPopover,
  htmlIdGenerator,
  useGeneratedHtmlId,
} from "@elastic/eui";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { useAuth } from "presentation/context/auth-context";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
} from "core/modules/categories/hooks";
import {
  useCreateStory,
  useStories,
  useUpdateStory,
} from "core/modules/stories/hooks";
import { CreateStoriesInput } from "API";
import { CategoryMenu } from "./components/category-menu/category-menu";

const makeId = htmlIdGenerator();

interface IList {
  content: any;
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
  const navigate = useNavigate();
  const [isSeeding, setIsSeeding] = useState(false);
  const [lists, setLists] = useState<{ [id: string]: IList[] }>();
  const { user } = useAuth();
  const { id } = useParams() as { id: string };
  const { data: categories } = useCategories(id);
  const [editingTitle, setEditingTitle] = useState<number>(-1);
  const categoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();
  const storyUpdateMutation = useUpdateStory();
  const storyMutation = useCreateStory((story) => {
    navigate(`/stories/${story.id}`);
  });
  const { data: stories } = useStories(id, categories && categories.length > 0);

  useEffect(() => {
    if (!isSeeding && categories && categories.length === 0) {
      categoryMutation.mutate({ name: "Get started", projectsID: id });
      setIsSeeding(true);
    }
  }, [categories, categoryMutation, id, isSeeding]);

  useEffect(() => {
    const lists = categories?.reduce((acc: any, category) => {
      acc[category.id] = stories
        ?.filter((story) => story && story.categoriesID === category.id)
        .map((story) => {
          return {
            content: getStoryCard(story),
            id: story?.id,
          };
        });
      return acc;
    }, {});

    setLists(lists);
  }, [categories, stories]);
  const handleCategoryUpdate = async (id: string, name: string) => {
    updateCategoryMutation.mutateAsync({
      id,
      name,
    });
  };
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
  // const lists = {
  //   COMPLEX_DROPPABLE_PARENT: list,
  //   COMPLEX_DROPPABLE_AREA_1: list1,
  //   COMPLEX_DROPPABLE_AREA_2: list2,
  // } as unknown as { [key: string]: IList[] };
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

        storyUpdateMutation.mutate({
          id: story.id,
          categoriesID: destinationId,
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

  const handleAddStory = (categoryId: string) => {
    storyMutation.mutate({
      title: "Untitled",
      type: "Unknown",
      projectsID: id,
      categoriesID: categoryId,
    } as CreateStoriesInput);
    //Make a call to create story and then redirect
  };

  const handleAddCategory = () => {
    categoryMutation.mutate({ name: "Get started", projectsID: id });
  };

  const getStoryCard = (story: any) => {
    const business =
      story.participants &&
      story.participants.business &&
      JSON.parse(story.participants.business)[0];

    return (
      <EuiCard
        hasBorder
        layout="horizontal"
        icon={
          <EuiIcon
            size="xxl"
            color="text"
            type={
              business
                ? `//logo.clearbit.com/${business.value}`
                : "/business.svg"
            }
          />
        }
        onClick={() => {
          navigate(`/stories/${story.id}`);
        }}
        titleSize="xs"
        title={story.title}
        description=""
        // description={<AvatarStack maxAvatars={2} users={[user, user]} />}
      />
    );
  };
  return categories && lists && categories.length > 0 ? (
    <>
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
                        background: "#F5F7FA",
                        border: "1px solid #D3DAE6",
                      }}
                    >
                      <EuiFlexGroup
                        responsive={false}
                        gutterSize="s"
                        alignItems="center"
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
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleCategoryUpdate(
                                      category.id,
                                      //@ts-ignore
                                      e.target.value
                                    );
                                    setEditingTitle(-1);
                                  }
                                }}
                              />
                            </EuiOutsideClickDetector>
                          ) : (
                            <EuiTitle size="xs">
                              <h2 onClick={() => didx && setEditingTitle(didx)}>
                                {category.name}
                              </h2>
                            </EuiTitle>
                          )}
                        </EuiFlexItem>
                        <EuiFlexItem grow={false}></EuiFlexItem>
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
                      <EuiButton
                        size="s"
                        color="text"
                        fullWidth
                        onClick={() => handleAddStory(category.id)}
                      >
                        Add Story
                      </EuiButton>
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
    </>
  ) : null;
};
