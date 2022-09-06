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
import { startOfISOWeek, format, addDays } from "date-fns";
import { useAuth0 } from "@auth0/auth0-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const date = new Date();

const CaloriesChart = ({ submitFoodPressed, deleteFoodPressed }) => {
  const { user } = useAuth0();
  const formatDay = (day) => {
    return format(day, "MM/dd/yyyy");
  };

  const useCalories = (date, setMethod) => {
    useEffect(() => {
      fetch("/api/calories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: `${user.email}`, date: date }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result.length > 0) {
            setMethod(data.result[0].calories);
          } else {
            setMethod(0);
          }
        });
    }, [date, setMethod, submitFoodPressed, deleteFoodPressed]);
  };

  //First day is just so that we can format all the other days with formatDay
  //These are states for now because eventually we will make it dynamic
  const [firstDay, setFirstDay] = useState(startOfISOWeek(date));
  //Formatting all the days in MM/dd/YYYY format
  const [monday, setMonday] = useState(formatDay(firstDay));
  const [tuesday, setTuesday] = useState(formatDay(addDays(firstDay, 1)));
  const [wednesday, setWednesday] = useState(formatDay(addDays(firstDay, 2)));
  const [thursday, setThursday] = useState(formatDay(addDays(firstDay, 3)));
  const [friday, setFriday] = useState(formatDay(addDays(firstDay, 4)));
  const [saturday, setSaturday] = useState(formatDay(addDays(firstDay, 5)));
  const [sunday, setSunday] = useState(formatDay(addDays(firstDay, 6)));

  //This is used to store the calories of each day
  const [mondayCalories, setMondayCalories] = useState(0);
  const [tuesdayCalories, setTuesdayCalories] = useState(0);
  const [wednesdayCalories, setWednesdayCalories] = useState(0);
  const [thursdayCalories, setThursdayCalories] = useState(0);
  const [fridayCalories, setFridayCalories] = useState(0);
  const [saturdayCalories, setSaturdayCalories] = useState(0);
  const [sundayCalories, setSundayCalories] = useState(0);

  //Calling the useEffect function and fetching 7 times, this feels very wrong to do
  useCalories(monday, setMondayCalories);
  useCalories(tuesday, setTuesdayCalories);
  useCalories(wednesday, setWednesdayCalories);
  useCalories(thursday, setThursdayCalories);
  useCalories(friday, setFridayCalories);
  useCalories(saturday, setSaturdayCalories);
  useCalories(sunday, setSundayCalories);

  let weeklyCalories = [
    mondayCalories,
    tuesdayCalories,
    wednesdayCalories,
    thursdayCalories,
    fridayCalories,
    saturdayCalories,
    sundayCalories,
  ];
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Total Calories Consumed For The Current Week",
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
