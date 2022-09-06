import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import WaterForm from "./WaterForm";
import { Fireworks } from "fireworks/lib/react";
import styled from "styled-components";

const Water = () => {
  const date = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const { user } = useAuth0();
  const [waterPressed, setWaterPressed] = useState(0);
  const [water, setWater] = useState(0);
  const [goalReached, setGoalReached] = useState(false);
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
          if (water >= 2000) {
            setGoalReached(true);
          }
        } else {
          setWater(0);
        }
      });
  }, [water, waterPressed, date, user.email]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGoalReached(false);
    }, 3000);
    return () => clearInterval(interval);
  }, [goalReached]);

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
        text: "Water Intake (Goal: 2000 mL Daily)",
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
  let fxProps = {
    count: 3,
    interval: 500,
    colors: ["yellow", "blue", "gold"],
    bubbleSizeMinimum: 9,
    bubbleSizeMaximum: 9,
    calc: (props, i) => ({
      ...props,

      y: 200 + Math.random() * 100 - 50 + (i === 2 ? -80 : 0),
    }),
  };
  return (
    <WaterContainer>
      <Bar options={options} data={data} />
      <WaterForm
        date={date}
        waterPressed={waterPressed}
        setWaterPressed={setWaterPressed}
      />
      {water >= 2000 && goalReached && <Fireworks {...fxProps} />}
      {water >= 2000 && (
        <p className="waterGoalMessage">
          Congratulations! Daily Water Goal Reached!
        </p>
      )}
    </WaterContainer>
  );
};

const WaterContainer = styled.div`
  .waterGoalMessage {
    margin-top: 5px;
    text-align: center;
    font-weight: bold;
  }
`;

export default Water;
