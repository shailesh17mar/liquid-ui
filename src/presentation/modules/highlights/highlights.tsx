import React, { useState, useCallback, ReactElement } from "react";
import { fake } from "faker";

import {
  EuiDataGrid,
  EuiDataGridStyle,
  EuiBadge,
  euiPaletteColorBlindBehindText,
  transparentize,
  EuiCheckbox,
} from "@elastic/eui";
import moment from "moment";

const visColorsBehindText = euiPaletteColorBlindBehindText();
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
  {
    id: "name",
    displayAsText: "Name",
  },
  {
    id: "role",
    displayAsText: "Role",
  },
  {
    id: "companySize",
    displayAsText: "Company Size",
  },
  {
    id: "annualSpend",
    displayAsText: "Annual Spend",
  },
];

interface IHighlight {
  content: ReactElement;
  tags: ReactElement;
  note: string;
  created: string;
  updated: string;
  name: string;
  role: string;
  companySize: string;
  annualSpend: string;
  [key: string]: string | ReactElement | null;
}
const data: IHighlight[] = [];

for (let i = 1; i < 100; i++) {
  const color: string = visColorsBehindText[Math.floor(Math.random() * 7)];
  data.push({
    content: (
      <>
        <span
          style={{
            backgroundColor: transparentize(color, 0.3),
            paddingTop: "4px",
          }}
        >
          {fake("{{lorem.lines}}")}
        </span>
      </>
    ),
    tags: (
      <>
        <EuiBadge color={color}>{fake("{{lorem.words}}")}</EuiBadge>
        <EuiBadge color={color}>{fake("{{lorem.words}}")}</EuiBadge>
        <EuiBadge color={color}>{fake("{{lorem.words}}")}</EuiBadge>
      </>
    ),
    note: fake("{{name.firstName}} {{name.lastName}}"),
    created: moment(fake("{{date.past}}")).fromNow(),
    updated: moment(fake("{{date.recent}}")).fromNow(),
    name: fake("{{name.firstName}} {{name.lastName}}"),
    role: fake("{{music.genre}}"),
    companySize: fake("{{datatype.number}}"),
    annualSpend: fake("{{finance.amount}}"),
  } as IHighlight);
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
  const [borderSelected, setBorderSelected] = useState("none");
  const [fontSizeSelected, setFontSizeSelected] = useState("m");
  const [cellPaddingSelected, setCellPaddingSelected] = useState("m");
  const [stripesSelected, setStripesSelected] = useState(false);
  const [rowHoverSelected, setRowHoverSelected] = useState("none");
  const [headerSelected, setHeaderSelected] = useState("underline");
  const [footerSelected] = useState("overline");
  const [showSortSelector, setShowSortSelector] = useState(true);
  const [showStyleSelector] = useState(true);
  const [showFullScreenSelector, setShowFullScreenSelector] = useState(true);
  const [showToolbar, setShowToolbar] = useState(true);
  const [toolbarPropTypeIsBoolean, setToolbarPropTypeIsBoolean] =
    useState(true);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
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

  const setPageIndex = useCallback(
    (pageIndex) => {
      setPagination({ ...pagination, pageIndex });
    },
    [pagination, setPagination]
  );

  const setPageSize = useCallback(
    (pageSize) => {
      setPagination({ ...pagination, pageSize, pageIndex: 0 });
    },
    [pagination, setPagination]
  );

  const handleVisibleColumns = (visibleColumns: string[]) =>
    setVisibleColumns(visibleColumns);

  const toolbarVisibilityOptions = {
    showStyleSelector: false,
    showSortSelector: false,
    showFullScreenSelector: true,
  };

  let toolbarConfig = toolbarVisibilityOptions;

  return (
    <EuiDataGrid
      aria-label="Highlights"
      columns={columns}
      columnVisibility={{
        visibleColumns: visibleColumns,
        setVisibleColumns: handleVisibleColumns,
      }}
      leadingControlColumns={leadingControlColumns}
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
          footer: footerSelected,
        } as EuiDataGridStyle
      }
      toolbarVisibility={toolbarConfig}
      renderCellValue={({ rowIndex, columnId }) => data[rowIndex][columnId]}
      pagination={{
        ...pagination,
        pageSizeOptions: [5, 10, 25, 50, 100],
        onChangeItemsPerPage: setPageSize,
        onChangePage: setPageIndex,
      }}
    />
  );
};
