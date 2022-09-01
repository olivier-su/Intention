import { useEffect, useState } from "react";
import FoodJournal from "../components/food/FoodJournal";
import ManuallyAddFood from "../components/food/ManuallyAddFood";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import { AddFoodProvider } from "../contexts/food/AddFoodContext";

const FoodPage = () => {
  const [foodSearch, setFoodSearch] = useState(null);
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

  //Use https://openfoodfacts.github.io/api-documentation/ to get data on a product in this case it's muffinmax
  useEffect(() => {
    fetch("https://world.openfoodfacts.org/api/v2/search?code=064042553207")
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setFoodSearch(data);
      });
  }, []);

  return (
    <AddFoodProvider>
      <FoodPageContainer>
        <CalendarContainer>
          <Calendar onChange={dateHandler} value={date} />
          <p>Currently Viewing: {formattedDate}</p>
        </CalendarContainer>
        <DailyJournalContainer>
          <FoodJournal formattedDate={formattedDate} />
          <ManuallyAddFood date={formattedDate} />
        </DailyJournalContainer>
      </FoodPageContainer>
    </AddFoodProvider>
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

const FoodPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const DailyJournalContainer = styled.div`
  display: flex;
  gap: 50px;
`;

export default FoodPage;
