import React, { useState, useCallback, ReactElement } from "react";
import { fake } from "faker";

import {
  EuiDataGrid,
  EuiAvatar,
  EuiDataGridStyle,
} from "@elastic/eui";

const columns = [
  {
    id: "avatar",
    initialWidth: 100,
  },
  {
    id: "name",
  },
  {
    id: "email",
  },
  {
    id: "city",
  },
  {
    id: "country",
  },
  {
    id: "account",
  },
];

interface IHighlight {
  avatar: ReactElement;
  name: string;
  email: string;
  city: string;
  country: string;
  account: string;
  [key: string]: string | ReactElement | null;
}
const data: IHighlight[] = [];

for (let i = 1; i < 100; i++) {
  data.push({
    avatar: (
      <EuiAvatar
        size="s"
        name={fake("{{name.lastName}}, {{name.firstName}}")}
      />
    ),
    name: fake("{{name.lastName}}, {{name.firstName}} {{name.suffix}}"),
    email: fake("{{internet.email}}"),
    city: fake("{{address.city}}"),
    country: fake("{{address.country}}"),
    account: fake("{{finance.account}}"),
  } as IHighlight);
}

// const footerCellValues = {
//   avatar: "5 accounts",
// };

// footerCellValues[columnId] || null;

export const Highlights: React.FC = () => {
  const [borderSelected, setBorderSelected] = useState("none");
  const [fontSizeSelected, setFontSizeSelected] = useState("s");
  const [cellPaddingSelected, setCellPaddingSelected] = useState("s");
  const [stripesSelected, setStripesSelected] = useState(true);
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
    pageSize: 5,
  });
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map(({ id }) => id)
  );

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
    showStyleSelector: showStyleSelector,
    showSortSelector: showSortSelector,
    showFullScreenSelector: showFullScreenSelector,
  };

  let toolbarConfig;

  if (toolbarPropTypeIsBoolean) {
    toolbarConfig = showToolbar;
  } else {
    toolbarConfig = toolbarVisibilityOptions;
  }

  return (
    <EuiDataGrid
      aria-label="Top EUI contributors"
      columns={columns}
      columnVisibility={{
        visibleColumns: visibleColumns,
        setVisibleColumns: handleVisibleColumns,
      }}
      rowCount={data.length}
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
        pageSizeOptions: [5, 10, 25],
        onChangeItemsPerPage: setPageSize,
        onChangePage: setPageIndex,
      }}
    />
  );
};
