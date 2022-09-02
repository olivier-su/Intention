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

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Total Calories For The Week",
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

const fake = [1, 2, 3, 4, 5, 6, 7];
const data = {
  labels,
  datasets: [
    {
      data: fake.map((element) => element),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const CaloriesChart = () => {
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
