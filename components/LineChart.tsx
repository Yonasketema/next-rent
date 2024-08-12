"use client";

import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const income = [
  {
    month: "2023-05",
    total_income: 39.66,
  },
  {
    month: "2023-07",
    total_income: 220.35000000000002,
  },
  {
    month: "2023-08",
    total_income: 206.32,
  },
  {
    month: "2023-09",
    total_income: 163.10000000000002,
  },
  {
    month: "2024-05",
    total_income: 54.99,
  },
  {
    month: "2024-06",
    total_income: 96.44,
  },
  {
    month: "2024-07",
    total_income: 279.62,
  },
  {
    month: "2024-08",
    total_income: 1212.56,
  },
  {
    month: "2024-09",
    total_income: 170.57,
  },
];

function groupByYearWithMonth(data) {
  const groupedData = {};

  data.forEach((item) => {
    const [year, month] = item.month.split("-");

    if (!groupedData[year]) {
      groupedData[year] = {};
    }

    groupedData[year][month] = item.total_income;
  });

  return groupedData;
}

const data = groupByYearWithMonth(income);

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];

const oneData = {};

export default function SimpleLineChart() {
  return (
    <LineChart
      width={500}
      height={300}
      series={[
        { data: pData, label: "Last Year" },
        { data: uData, label: "This Year" },
      ]}
      xAxis={[{ scaleType: "point", data: xLabels }]}
    />
  );
}
