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
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import WaterForm from "./WaterForm";

const Water = () => {
  const date = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const { user } = useAuth0();
  const [waterPressed, setWaterPressed] = useState(0);
  const [water, setWater] = useState(0);
  useEffect(() => {
    fetch("/api/get-water", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: `${user.email}`, date: date }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result.length > 0) {
          setWater(data.result[0].quantity);
        } else {
          setWater(0);
        }
      });
  }, [water, waterPressed]);
  const options = {
    responsive: true,
    scales: {
      y: {
        grid: {
          display: false,
        },
        max: 2000,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Water Intake (2000 mL Recommended Daily)",
      },
    },
  };
  const labels = ["Today"];
  const data = {
    labels,
    datasets: [
      {
        data: [water],
        backgroundColor: "#bde0fe",
      },
    ],
  };
  return (
    <div>
      <Bar options={options} data={data} />{" "}
      <WaterForm
        date={date}
        waterPressed={waterPressed}
        setWaterPressed={setWaterPressed}
      />
    </div>
  );
};

export default Water;
