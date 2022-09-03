import { useEffect, useState } from "react";
import FoodJournal from "../components/food/FoodJournal";
import AddFood from "../components/food/AddFood";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import CaloriesChart from "../components/food/CaloriesChart";
import { startOfISOWeek, format, addDays } from "date-fns";
import { useAuth0 } from "@auth0/auth0-react";

const FoodPage = () => {
  const [submitFoodPressed, setSubmitFoodPressed] = useState(0);
  const [deleteFoodPressed, setDeleteFoodPressed] = useState(0);
  const { user } = useAuth0();
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState(
    new Date().toLocaleDateString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  );

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
    }, [date, setMethod, submitFoodPressed, formattedDate, deleteFoodPressed]);
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

  const dateHandler = (element) => {
    setFormattedDate(
      element.toLocaleDateString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    );
    setDate(element);
  };

  return (
    <FoodPageContainer>
      <ContentContainer>
        <CalendarContainer>
          <Calendar onChange={dateHandler} value={date} />
          <p>Currently Viewing: {formattedDate}</p>
        </CalendarContainer>
        <DailyJournalContainer>
          <FoodJournal
            formattedDate={formattedDate}
            deleteFoodPressed={deleteFoodPressed}
            setDeleteFoodPressed={setDeleteFoodPressed}
            submitFoodPressed={submitFoodPressed}
          />
          <AddFood
            date={formattedDate}
            submitFoodPressed={submitFoodPressed}
            setSubmitFoodPressed={setSubmitFoodPressed}
          />
        </DailyJournalContainer>
      </ContentContainer>
      <CaloriesChart weeklyCalories={weeklyCalories} />
    </FoodPageContainer>
  );
};

//Removing the yellow background on today's tile also adding the active to overwrite the color
const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  .react-calendar__tile--now {
    background: white;
    color: black;
  }
  .react-calendar__tile--active {
    background: #006edc;
    color: white;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const FoodPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const DailyJournalContainer = styled.div`
  display: flex;
  gap: 50px;
`;

export default FoodPage;
