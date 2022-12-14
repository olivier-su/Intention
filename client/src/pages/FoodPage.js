import { useState } from "react";
import FoodJournal from "../components/food/FoodJournal";
import AddFood from "../components/food/AddFood";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import CaloriesChart from "../components/food/CaloriesChart";

const FoodPage = () => {
  const [submitFoodPressed, setSubmitFoodPressed] = useState(0);
  const [deleteFoodPressed, setDeleteFoodPressed] = useState(0);
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState(
    new Date().toLocaleDateString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  );

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
          <p className="currentlyViewingMessage">
            Currently Viewing: {formattedDate}
          </p>
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
      <CaloriesChart
        submitFoodPressed={submitFoodPressed}
        deleteFoodPressed={deleteFoodPressed}
      />
    </FoodPageContainer>
  );
};

//Removing the yellow background on today's tile also adding the active to overwrite the color
const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  .currentlyViewingMessage {
    font-weight: bold;
  }
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
