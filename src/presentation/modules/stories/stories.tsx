import {
  DropResult,
  EuiButton,
  EuiCard,
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
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
import { AvatarStack } from "../shared/components/avatar-stack/avatar-stack";
import { useAuth } from "presentation/context/auth-context";
import { StoriesQueryController } from "core/modules/stories/usecases/story-query-controller";
import { StoryMutationController } from "core/modules/stories/usecases/story-mutation-controller";
import { CategoryMutationController } from "core/modules/categories/usecases/category-mutation-controller";
import { CategoriesQueryController } from "core/modules/categories/usecases/category-query-controller";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Categories, Stories as Story } from "models";
import { ModelInit } from "@aws-amplify/datastore";
import {
  useCategories,
  useCreateCategory,
} from "core/modules/categories/hooks";
import { useCreateStory, useStories } from "core/modules/stories/hooks";
import { CreateStoriesInput } from "API";

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

//TODO: Think of better way of props her
// interface Props {
//   storiesQueryController: StoriesQueryController;
//   storyMutationController: StoryMutationController;
//   categoryMutationController: CategoryMutationController;
//   categoriesQueryController: CategoriesQueryController;
// }
export const Stories: React.FC = () => {
  const navigate = useNavigate();
  const [isSeeding, setIsSeeding] = useState(false);
  const { user } = useAuth();
  const { id } = useParams() as { id: string };
  const { data: categories } = useCategories(id);
  const categoryMutation = useCreateCategory();
  const storyMutation = useCreateStory((story: Story) => {
    navigate(`/stories/${story.id}`);
  });
  const { data: stories } = useStories(id, categories && categories.length > 0);

  useEffect(() => {
    if (!isSeeding && categories && categories.length === 0) {
      categoryMutation.mutate({ name: "Get started", projectsID: id });
      setIsSeeding(true);
    }
  }, [categories, categoryMutation, id, isSeeding]);

  // const { data: stories } = useQuery(
  //   ["stories", id],
  //   async () => {
  //     return await storiesQueryController.getAllByProjectId(id);
  //   },
  //   {
  //     enabled: categories && categories.length > 0,
  //   }
  // );

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

  const handleAddStory = (categoryId: string) => {
    storyMutation.mutate({
      title: "Untitled",
      type: "Unknown",
      projectsID: id,
      categoriesID: categoryId,
    } as CreateStoriesInput);
    //Make a call to create story and then redirect
  };
  return categories && stories && categories.length > 0 ? (
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
                draggableId={`COMPLEX_DRAGGABLE_${category.id}`}
                spacing="l"
                disableInteractiveElementBlocking // Allows button to be drag handle
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
                    <EuiButton
                      size="s"
                      color="text"
                      fullWidth
                      onClick={() => handleAddStory(category.id)}
                    >
                      Add Story
                    </EuiButton>

                    <EuiDroppable
                      droppableId={`COMPLEX_DROPPABLE_AREA_${category.id}`}
                      grow
                      type="MICRO"
                      spacing="s"
                      style={{ flex: "1 0 50%", marginTop: "1rem" }}
                    >
                      {stories
                        .filter((story) => story.categoriesID === category.id)
                        .map((story, idx) => (
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
                            <EuiCard
                              hasBorder
                              layout="horizontal"
                              icon={
                                <EuiIcon
                                  size="xxl"
                                  type={"//logo.clearbit.com/spotify.com"}
                                />
                              }
                              onClick={() => {
                                navigate(`/stories/${story.id}`);
                              }}
                              titleSize="xs"
                              title={story.title}
                              description={
                                <AvatarStack
                                  maxAvatars={2}
                                  users={[user, user]}
                                />
                              }
                            />
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
          <EuiButton color="primary" fill={false} size="s" fullWidth>
            New Group
          </EuiButton>
        </EuiPanel>
      </EuiFlexItem>
    </EuiFlexGroup>
  ) : null;
};
