import { useAnalytics } from "core/modules/analytics/hooks/use-analytics";
import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BarChart,
  Treemap,
  Bar,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";
import {
  EuiButton,
  EuiTitle,
  EuiLink,
  EuiImage,
  EuiPanel,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiButtonGroup,
  useGeneratedHtmlId,
} from "@elastic/eui";
import {
  AiOutlineRadarChart,
  AiOutlinePieChart,
  AiOutlineBarChart,
} from "react-icons/ai";
import { MdOutlineTableChart } from "react-icons/md";
import { HIGHLIGHT_TYPES } from "../shared/components/editor/components/highlight-control/color-picker";
import { EmptyPrompt, Header } from "./analytics.styles";

const Rectangle = (props: any) => {
  const { depth, x, y, width, height, name, color, value } = props;
  debugger;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: depth < 2 ? color : "none",
          stroke: "#fff",
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {depth === 1 ? (
        <text
          x={x + width / 2}
          y={y + height / 2 + 7}
          textAnchor="middle"
          fill="#fff"
          fontSize={14}
        >
          {name} ({value})
        </text>
      ) : null}
    </g>
  );
};

const colors = Object.values(HIGHLIGHT_TYPES).map(
  (value: any) => value.color
) as string[];
let TOTAL_COLORS = colors.length;

export const Analytics: React.FC = () => {
  const { id } = useParams() as { id: string };
  const chartButtonPrefix = useGeneratedHtmlId({
    prefix: "chartButton",
  });
  const [selectedChartId, setSelectedChartId] = useState(
    `${chartButtonPrefix}__0`
  );

  const [showSampleData, setShowSampleData] = useState(false);
  const { isLoading } = useAnalytics(id);
  const chartOptions = [
    {
      id: `${chartButtonPrefix}__0`,
      label: "Bar chart",
      iconType: AiOutlineBarChart,
    },
    {
      id: `${chartButtonPrefix}__1`,
      label: "Pie chart",
      iconType: AiOutlinePieChart,
    },
    {
      id: `${chartButtonPrefix}__2`,
      label: "Tree map",
      iconType: MdOutlineTableChart,
    },
    {
      id: `${chartButtonPrefix}__3`,
      label: "Radar chart",
      iconType: AiOutlineRadarChart,
    },
  ];

  const data = useMemo(
    () => [
      {
        name: "Working with other roles",
        value: 5,
        color: colors[Math.floor(Math.random() * TOTAL_COLORS)],
      },
      {
        name: "Working with people",
        value: 2,
        color: colors[Math.floor(Math.random() * TOTAL_COLORS)],
      },
      {
        name: "Impact of technology",
        value: 5,

        color: colors[Math.floor(Math.random() * TOTAL_COLORS)],
      },
      {
        name: "Opportunity of technology",
        value: 3,

        color: colors[Math.floor(Math.random() * TOTAL_COLORS)],
      },
      {
        name: "Focus time",
        value: 3,
        color: colors[Math.floor(Math.random() * TOTAL_COLORS)],
      },
      {
        name: "Planning",
        value: 1,
        color: colors[Math.floor(Math.random() * TOTAL_COLORS)],
      },
      {
        name: "Chat tools",
        value: 7,
        color: colors[Math.floor(Math.random() * TOTAL_COLORS)],
      },
      {
        name: "Scheduling",
        value: 5,

        color: colors[Math.floor(Math.random() * TOTAL_COLORS)],
      },
      {
        name: "Progressing work",
        value: 5,
        color: colors[Math.floor(Math.random() * TOTAL_COLORS)],
      },
      {
        name: "People skills",
        value: 4,
        color: colors[Math.floor(Math.random() * TOTAL_COLORS)],
      },
      {
        name: "Meetings",
        value: 5,
        color: colors[Math.floor(Math.random() * TOTAL_COLORS)],
      },
      {
        name: "Feature development",
        value: 3,
        color: colors[Math.floor(Math.random() * TOTAL_COLORS)],
      },
      {
        name: "Stand up meeting",
        value: 2,
        color: colors[Math.floor(Math.random() * TOTAL_COLORS)],
      },
      {
        name: "Planning and tracking",
        value: 1,
        color: colors[Math.floor(Math.random() * TOTAL_COLORS)],
      },
      {
        name: "Email",
        value: 5,
        color: colors[Math.floor(Math.random() * TOTAL_COLORS)],
      },
      {
        name: "Tracking work",
        value: 5,
        color: colors[Math.floor(Math.random() * TOTAL_COLORS)],
      },
      {
        name: "Gathering feedback",
        value: 3,
        color: colors[Math.floor(Math.random() * TOTAL_COLORS)],
      },
      {
        name: "Working with teams",
        value: 5,
        color: colors[Math.floor(Math.random() * TOTAL_COLORS)],
      },
      {
        name: "Breaks from work",
        value: 4,
        color: colors[Math.floor(Math.random() * TOTAL_COLORS)],
      },
      {
        name: "One on one meetings",
        value: 4,
        color: colors[Math.floor(Math.random() * TOTAL_COLORS)],
      },
      {
        name: "Documentation tools",
        value: 4,
        color: colors[Math.floor(Math.random() * TOTAL_COLORS)],
      },
      {
        name: "Video calling",
        value: 4,
        color: colors[Math.floor(Math.random() * TOTAL_COLORS)],
      },
      {
        name: "Design tools",
        value: 4,
        color: colors[Math.floor(Math.random() * TOTAL_COLORS)],
      },
      {
        name: "Setting context",
        value: 4,
        color: colors[Math.floor(Math.random() * TOTAL_COLORS)],
      },
      {
        name: "Defining problems",
        value: 4,
        color: colors[Math.floor(Math.random() * TOTAL_COLORS)],
      },
      {
        name: "Learning new things",
        value: 4,
        color: colors[Math.floor(Math.random() * TOTAL_COLORS)],
      },
      {
        name: "Measuring work",
        value: 4,
        color: colors[Math.floor(Math.random() * TOTAL_COLORS)],
      },
      {
        name: "Product discovery",
        value: 4,
        color: colors[Math.floor(Math.random() * TOTAL_COLORS)],
      },
      {
        name: "Time tracking",
        value: 4,
        color: colors[Math.floor(Math.random() * TOTAL_COLORS)],
      },
      {
        name: "Project management",
        value: 4,
        color: colors[Math.floor(Math.random() * TOTAL_COLORS)],
      },
      {
        name: "Scheduling meetings",
        value: 4,
        color: colors[Math.floor(Math.random() * TOTAL_COLORS)],
      },
    ],
    []
  );

  const getBarChart = useCallback(
    () => (
      <BarChart layout="vertical" data={data}>
        <XAxis hide />
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis width={240} type="category" dataKey="name" />
        <Bar dataKey="value" fill="#8884d8">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    ),
    [data]
  );

  const getTreeMap = useCallback(
    () => (
      <Treemap
        width={400}
        height={200}
        data={data}
        dataKey="value"
        stroke="#fff"
        fill="#8884d8"
        content={<Rectangle />}
      ></Treemap>
    ),
    []
  );

  const getRadarChart = useCallback(
    () => (
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis />
        <Radar
          dataKey="value"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Tooltip />
      </RadarChart>
    ),
    []
  );

  const getPieChart = useCallback(
    () => (
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          label={({
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            value,
            index,
          }) => {
            const RADIAN = Math.PI / 180;
            // eslint-disable-next-line
            const radius = 25 + innerRadius + (outerRadius - innerRadius);
            // eslint-disable-next-line
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            // eslint-disable-next-line
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <text
                x={x}
                y={y}
                fill="#8884d8"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
              >
                {data[index].name} ({value})
              </text>
            );
          }}
        >
          {data.map((entry) => (
            <Cell fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    ),
    []
  );

  const chart = () => {
    switch (selectedChartId) {
      case `${chartButtonPrefix}__0`:
        return getBarChart();
      case `${chartButtonPrefix}__1`:
        return getPieChart();
      case `${chartButtonPrefix}__2`:
        return getTreeMap();
      case `${chartButtonPrefix}__3`:
        return getRadarChart();
      default:
        return getBarChart();
    }
  };
  const handleChartSelected = (optionId: string) => {
    setSelectedChartId(optionId);
  };
  return (
    <>
      <Header>
        <EuiHeaderSection grow></EuiHeaderSection>
        <EuiHeaderSection side="right" grow={false}>
          <EuiHeaderSectionItem>
            <EuiButtonGroup
              name="chart type"
              legend="This is a basic group"
              options={chartOptions}
              idSelected={selectedChartId}
              onChange={(id) => handleChartSelected(id)}
              buttonSize="compressed"
            />
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
      </Header>
      <EuiPanel paddingSize="none">
        {showSampleData ? (
          <ResponsiveContainer width="100%" height="100%">
            {chart()}
          </ResponsiveContainer>
        ) : (
          <EmptyPrompt
            icon={
              <EuiImage
                size="fullWidth"
                src="https://elastic.github.io/eui/images/bb68cce79d5e28fcd85dce0eca39c112-illustration.svg"
                alt=""
              />
            }
            title={<h2>Visualize your tags and tag groups</h2>}
            layout="horizontal"
            color="warning"
            body={
              <>
                <p>There isn't sufficient data to display charts.</p>
                <p>
                  Once we have sufficient data, you can visualize your tags and
                  tag groups as a bar chart, pie chart, treemap, or radar chart.
                </p>
              </>
            }
            actions={
              <EuiButton
                color="primary"
                fill
                onClick={() => setShowSampleData(true)}
              >
                Explore sample data
              </EuiButton>
            }
            footer={
              <>
                <EuiTitle size="xxs">
                  <span>Want to learn more?</span>
                </EuiTitle>{" "}
                <EuiLink href="#" target="_blank">
                  Read the docs
                </EuiLink>
              </>
            }
          />
        )}
      </EuiPanel>
    </>
  );
};
