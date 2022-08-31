import { useEffect, useState } from "react";
import FoodItem from "./FoodItem";
import styled from "styled-components";

const FoodJournal = ({ formattedDate }) => {
  const [food, setFood] = useState([]);

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
    <JournalContainer>
      {food.length > 0 ? (
        <>
          <p>Daily Journal</p>
          <p>Total Calories for the day: </p>
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
