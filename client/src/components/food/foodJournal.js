import { useEffect, useState, useContext } from "react";
import { AddFoodContext } from "../../contexts/food/AddFoodContext";
import FoodItem from "./FoodItem";
import styled from "styled-components";

const FoodJournal = ({ formattedDate }) => {
  const { submitFoodPressed } = useContext(AddFoodContext);
  const [food, setFood] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    fetch("/api/calories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: "yo", date: formattedDate }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result.length > 0) {
          setTotalCalories(data.result[0].calories);
        } else {
          setTotalCalories(0);
        }
      });
  }, [formattedDate, submitFoodPressed]);

  useEffect(() => {
    //Change user when we have auth0 setup
    fetch("/api/dailyFood", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: "yo", date: formattedDate }),
    })
      .then((response) => response.json())
      .then((data) => {
        setFood(data.result);
      });
  }, [formattedDate, submitFoodPressed]);

  return (
    <JournalContainer>
      <p>Daily Journal</p>
      <p>Total Calories for the day: {totalCalories}</p>
      {food.length > 0 ? (
        <>
          {food.map((element) => {
            return <FoodItem food={element} key={element._id} />;
          })}
        </>
      ) : (
        <p>Add food</p>
      )}
    </JournalContainer>
  );
};

const JournalContainer = styled.div``;

export default FoodJournal;
