import React, { useState, ReactElement, useMemo } from "react";

import {
  EuiDataGrid,
  EuiDataGridStyle,
  EuiBadge,
  transparentize,
  EuiCheckbox,
  EuiPanel,
} from "@elastic/eui";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useHighlights } from "core/modules/highlights/hooks";
import { useTags } from "core/modules/tags/hooks";
import {
  HIGHLIGHT_COLORS,
  HIGHLIGHT_TYPES,
} from "../shared/components/editor/components/highlight-control/color-picker";

const columns = [
  {
    id: "content",
    displayAsText: "Content",
    initialWidth: 300,
  },
  {
    id: "tags",
    displayAsText: "Tags",
  },
  {
    id: "note",
    displayAsText: "Note",
  },
  {
    id: "created",
    displayAsText: "Created at",
  },
  {
    id: "updated",
    displayAsText: "Updated at",
  },
  // {
  //   id: "name",
  //   displayAsText: "Name",
  // },
  // {
  //   id: "role",
  //   displayAsText: "Role",
  // },
];

// Link to the story
interface IHighlight {
  content: ReactElement;
  tags: ReactElement;
  note: string;
  created: string;
  updated: string;
  name: string;
  // role: string;
  // companySize: string;
  // annualSpend: string;
  [key: string]: string | ReactElement | null;
}

const SelectionHeaderCell = () => (
  <EuiCheckbox
    id="selection-toggle"
    aria-label="Select all rows"
    onChange={() => {}}
  />
);
const SelectionRowCell = ({ rowIndex }: { rowIndex: number }) => (
  <EuiCheckbox id={`${rowIndex}`} onChange={() => {}} />
);
export const Highlights: React.FC = () => {
  const { id } = useParams() as { id: string };
  const [borderSelected] = useState("all");
  const [fontSizeSelected] = useState("l");
  const [cellPaddingSelected] = useState("l");
  const [stripesSelected] = useState(false);
  const [rowHoverSelected] = useState("none");
  const [headerSelected] = useState("shade");
  const [footerSelected] = useState("overline");
  const { data: tags } = useTags();
  const { data: highlights } = useHighlights({
    projectId: id,
  });
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map(({ id }) => id)
  );

  const leadingControlColumns = [
    {
      id: "selection",
      width: 32,
      headerCellRender: SelectionHeaderCell,
      rowCellRender: SelectionRowCell,
    },
  ];

  const data = useMemo(() => {
    const rows: IHighlight[] = [];
    (highlights || []).forEach((highlight, index) => {
      const tagIds = highlight.Tags || [];
      const user = highlight.user && JSON.parse(highlight.user);
      const highlightTags = (tags || []).filter((tag) =>
        tagIds.includes(tag.id!!)
      );
      const highlightType =
        HIGHLIGHT_TYPES[highlight.color as HIGHLIGHT_COLORS];
      if (highlightType)
        rows.push({
          content: (
            <>
              <span
                style={{
                  backgroundColor: transparentize(
                    HIGHLIGHT_TYPES[highlight.color as HIGHLIGHT_COLORS].color,
                    0.3
                  ),
                  paddingTop: "4px",
                }}
              >
                {highlight.text}
              </span>
            </>
          ),
          tags: (
            <>
              {highlightTags.map((tag) => (
                <EuiBadge
                  color={
                    HIGHLIGHT_TYPES[tag.color as HIGHLIGHT_COLORS].color ||
                    "default"
                  }
                  key={`${tag.id}.${index}`}
                >
                  {tag.label}
                </EuiBadge>
              ))}
            </>
          ),
          note: user ? user.name : "Anonymous",
          created: moment(highlight.createdAt).fromNow(),
          updated: moment(highlight.updatedAt).fromNow(),
        } as IHighlight);
    });
    return rows;
  }, [tags, highlights]);

  const handleVisibleColumns = (visibleColumns: string[]) =>
    setVisibleColumns(visibleColumns);

  const toolbarVisibilityOptions = {
    showStyleSelector: false,
    showSortSelector: false,
    showFullScreenSelector: true,
  };

  return (
    <EuiPanel grow={false} hasShadow={false}>
      <EuiDataGrid
        aria-label="Highlights"
        columns={columns}
        columnVisibility={{
          visibleColumns: visibleColumns,
          setVisibleColumns: handleVisibleColumns,
        }}
        rowCount={data.length}
        rowHeightsOptions={{
          defaultHeight: "auto",
        }}
        gridStyle={
          {
            border: borderSelected,
            fontSize: fontSizeSelected,
            cellPadding: cellPaddingSelected,
            stripes: stripesSelected,
            rowHover: rowHoverSelected,
            header: headerSelected,
          } as EuiDataGridStyle
        }
        toolbarVisibility={false}
        renderCellValue={({ rowIndex, columnId }) => data[rowIndex][columnId]}
      />
    </EuiPanel>
  );
};
