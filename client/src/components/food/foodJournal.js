import { useEffect, useState, useContext } from "react";
import { AddFoodContext } from "../../contexts/food/AddFoodContext";
import FoodItem from "./FoodItem";
import styled from "styled-components";
import TotalCalories from "./TotalCalories";
import { CircularProgress } from "@mui/material";

const FoodJournal = ({ formattedDate }) => {
  const { submitFoodPressed } = useContext(AddFoodContext);
  const [deleteFoodPressed, setDeleteFoodPressed] = useState(0);
  const [food, setFood] = useState(null);

  //Fetch food info
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
        //Reversing what we get in the db so that we have the most recent food at the top
        setFood(data.result.reverse());
      });
  }, [formattedDate, submitFoodPressed, deleteFoodPressed]);

  return (
    <JournalContainer>
      <p>Daily Journal</p>
      <TotalCalories
        formattedDate={formattedDate}
        deleteFoodPressed={deleteFoodPressed}
      />
      {food !== null ? (
        food.length > 0 ? (
          <>
            {food.map((element) => {
              return (
                <FoodItem
                  food={element}
                  key={element._id}
                  deleteFoodPressed={deleteFoodPressed}
                  setDeleteFoodPressed={setDeleteFoodPressed}
                  date={formattedDate}
                />
              );
            })}
          </>
        ) : (
          <p>Add food</p>
        )
      ) : (
        <CircularProgress />
      )}
    </JournalContainer>
  );
};

const JournalContainer = styled.div``;

export default FoodJournal;
