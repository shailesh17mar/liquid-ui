import React, { useState } from "react";
import {
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiContextMenuPanel,
  EuiFormControlLayout,
  EuiPopover,
  useGeneratedHtmlId,
} from "@elastic/eui";
import { useParams } from "react-router-dom";
import { useCreateCategory } from "core/modules/categories/hooks";

export const CategoryMenu: React.FC = () => {
  const [isPopoverOpen, setPopover] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const inputId = useGeneratedHtmlId({ prefix: "readOnlyInput" });
  const customContextMenuPopoverId = useGeneratedHtmlId({
    prefix: "customContextMenuPopover",
  });
  const { id } = useParams() as { id: string };
  const categoryMutation = useCreateCategory();

  const handleOpenPopover = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };

  const button = (
    <EuiButtonIcon
      aria-label="New category"
      onClick={handleOpenPopover}
      display="fill"
      iconType="plus"
      color="primary"
    >
      New Category
    </EuiButtonIcon>
  );
  const handleCreateCategory = () => {
    categoryMutation.mutate({
      name: categoryName,
      projectsID: id,
    });
    closePopover();
  };
  return (
    <EuiPopover
      id={customContextMenuPopoverId}
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      panelPaddingSize="s"
      anchorPosition="downLeft"
    >
      <EuiContextMenuPanel
        style={{
          width: 300,
        }}
      >
        <EuiFormControlLayout
          append={
            <EuiButtonEmpty
              disabled={!Boolean(categoryName) || categoryName.length < 3}
              size="xs"
              onClick={handleCreateCategory}
            >
              Done
            </EuiButtonEmpty>
          }
        >
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="euiFieldText euiFieldText--inGroup"
            id={inputId}
          />
        </EuiFormControlLayout>
      </EuiContextMenuPanel>
    </EuiPopover>
  );
};
