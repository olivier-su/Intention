import { useEffect, useState } from "react";
import FoodItem from "./FoodItem";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

const FoodPage = () => {
  const [food, setFood] = useState(null);
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

  useEffect(() => {
    //Change user when we have auth0 setup
    fetch(`/api/dailyFood`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: "yo", date: formattedDate }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.result);
        setFood(data.result);
      });
  }, [formattedDate]);

  return (
    <div>
      <CalendarContainer>
        <Calendar onChange={dateHandler} value={date} />
      </CalendarContainer>

      {food ? (
        food.map((element) => {
          return <FoodItem food={element} key={element._id} />;
        })
      ) : (
        <p>Add food</p>
      )}
    </div>
  );
};

//Removing the yellow background on today's tile also adding the active to overwrite the color
const CalendarContainer = styled.div`
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
