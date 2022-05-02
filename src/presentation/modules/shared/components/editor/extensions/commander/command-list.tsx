import {
  useGeneratedHtmlId,
  EuiAvatar,
  EuiPopover,
  EuiSelectable,
  EuiSelectableOption,
  EuiIcon,
  EuiPopoverTitle,
} from "@elastic/eui";
import { Editor } from "@tiptap/react";
import { Range } from "@tiptap/core";
import { useState } from "react";
import { CommandContainer } from "./command-list.styles";

interface CommandItem {
  title: string;
  command: ({ editor, range }: { editor: Editor; range: Range }) => void;
  icon?: string;
}

export const CommandList = (props: Record<string, any>) => {
  const selectItem = (index: number) => {
    const item = props.items[index];

    if (item) {
      props.command(item);
    }
  };

  const [isPopoverOpen, setPopover] = useState(true);
  const smallContextMenuPopoverId = useGeneratedHtmlId({
    prefix: "commandsPalette",
  });

  const closePopover = () => {
    setPopover(false);
  };

  const onSelect = (options: any) => {
    const selected = options.filter(
      (option: EuiSelectableOption) => option.checked === "on"
    )[0];
    selectItem(selected.id);
    closePopover();
  };

  const items = props.items.map(
    ({ title, icon }: CommandItem, index: number) => {
      return {
        label: title,
        id: index,
        prepend: icon ? (
          <EuiIcon type={icon} />
        ) : (
          <EuiAvatar color="#e1e2e5" size="s" type="space" name={title} />
        ),
        showIcons: false,
      };
    }
  );

  return (
    <CommandContainer>
      <EuiPopover
        id={smallContextMenuPopoverId}
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        panelPaddingSize="none"
        anchorPosition="downLeft"
      >
        <EuiSelectable
          searchable
          searchProps={{
            placeholder: "Start typing...",
            compressed: true,
          }}
          height={300}
          listProps={{ bordered: false }}
          singleSelection={true}
          onChange={(options: any) => onSelect(options)}
          options={items}
        >
          {(list, search) => (
            <div style={{ width: 248, minHeight: 300 }}>
              <EuiPopoverTitle paddingSize="m">{search}</EuiPopoverTitle>
              {list}
            </div>
          )}
        </EuiSelectable>
      </EuiPopover>
    </CommandContainer>
  );
};
