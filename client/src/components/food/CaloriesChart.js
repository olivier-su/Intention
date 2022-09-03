import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const CaloriesChart = ({ weeklyCalories }) => {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Total Calories For The Current Week",
      },
    },
  };

  const labels = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const data = {
    labels,
    datasets: [
      {
        data: weeklyCalories.map((element) => element),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <ChartWrapper>
      <Bar options={options} data={data} />
    </ChartWrapper>
  );
};

const ChartWrapper = styled.div`
  width: 500px;
`;

export default CaloriesChart;
