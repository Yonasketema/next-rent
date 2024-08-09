"use client";

import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

function AppPieChart() {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: "series A" },
            { id: 1, value: 15, label: "series B" },
            { id: 2, value: 20, label: "series C" },
          ],
          innerRadius: 75,
          outerRadius: 100,
          paddingAngle: 0,
          cornerRadius: 0,
          startAngle: -90,
          endAngle: 361,
          cx: 150,
          cy: 150,
        },
      ]}
      slotProps={{
        legend: {
          direction: "column",
          position: { vertical: "bottom", horizontal: "middle" },
          padding: 0,
        },
      }}
    />
  );
}

export default AppPieChart;
