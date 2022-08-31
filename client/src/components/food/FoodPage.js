import { useEffect, useState } from "react";
import FoodJournal from "./foodJournal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

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
    <div>
      <CalendarContainer>
        <Calendar onChange={dateHandler} value={date} />
        <p>Currently viewing: {formattedDate}</p>
      </CalendarContainer>
      <FoodJournal formattedDate={formattedDate} />
    </div>
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

export default FoodPage;
