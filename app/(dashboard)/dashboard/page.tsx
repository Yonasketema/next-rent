"use client";

import { Box, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import BasicTable from "@/components/Table";
import SimpleLineChart from "@/components/Linechart";
import SouthIcon from "@mui/icons-material/South";

const Dashboard = () => {
  return (
    <>
      <Box sx={{ display: "flex", gap: 3, marginTop: 3, width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexDirection: "column",
            backgroundColor: "white",
            p: 2,
            width: 350,
            borderRadius: 3,
          }}
        >
          <Box>
            <Typography variant="h5" color="#555">
              This Month Statistics
            </Typography>
            <Typography variant="h6" fontSize={12}>
              Tue, 14 Nov, 2024, 11:30 AM
            </Typography>
          </Box>
          <Box
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",

              borderRadius: 3,
              boxShadow: "0px 8px 24px 0px #4545501A",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom={0.7}
            >
              <Typography variant="h6">Income</Typography>
              <Box
                sx={{
                  backgroundColor: "#9999991A",
                  p: 0.3,
                  textAlign: "center",
                  borderRadius: 1.2,
                }}
              >
                <Typography variant="subtitle2" fontSize={12}>
                  This Month
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Typography
              variant="h4"
              component="div"
              color="#1A1919"
              gutterBottom
            >
              ETB 9460.00{" "}
              <Typography component="span" color="error">
                <SouthIcon sx={{ color: "red", height: 0.3 }} /> 1.5%
              </Typography>
            </Typography>
            <Typography variant="body2">
              Compared to ETB8940 last month
            </Typography>
            <Typography
              variant="body2"
              component="div"
              color="#555"
              display="flex"
              gap={2}
            >
              <span>Last Month Income</span> <span>ETB 25658.00</span>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: 500,
              boxShadow: "0px 8px 24px 0px #4545501A",
              boxSizing: "border-box",
              py: 2,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom={0.7}
              width="100%"
              px={2}
            >
              <Typography variant="h6">Available Books</Typography>
              <Box
                sx={{
                  backgroundColor: "#9999991A",
                  p: 0.3,
                  textAlign: "center",
                  borderRadius: 1.2,
                }}
              >
                <Typography variant="subtitle2" fontSize={12}>
                  Today
                </Typography>
              </Box>
            </Box>

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
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexDirection: "column",
            borderRadius: 3,
            width: "70%",
          }}
        >
          <Box
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              borderRadius: 3,
            }}
          >
            <Typography variant="h6">Live Book Status</Typography>
            <BasicTable />
          </Box>
          <Box
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              borderRadius: 3,
            }}
          >
            <Typography variant="h6">Earning Summary</Typography>
            <SimpleLineChart />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
