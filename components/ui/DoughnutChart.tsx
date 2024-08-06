import { Doughnut } from "react-chartjs-2";

const data = {
  labels: ["Fiction", "Self Help", "Business"],
  datasets: [
    {
      label: "Available Books",
      data: [54, 20, 26],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
};

const DoughnutChart = () => {
  return <Doughnut data={data} />;
};

export default DoughnutChart;
