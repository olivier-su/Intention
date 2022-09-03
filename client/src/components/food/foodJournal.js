import { useEffect, useState, useContext } from "react";
import FoodItem from "./FoodItem";
import styled from "styled-components";
import TotalCalories from "./TotalCalories";
import { CircularProgress } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

const FoodJournal = ({
  formattedDate,
  deleteFoodPressed,
  setDeleteFoodPressed,
  submitFoodPressed,
}) => {
  const [food, setFood] = useState(null);
  const { user } = useAuth0();

  //Fetch food info
  useEffect(() => {
    fetch("/api/dailyFood", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: `${user.email}`, date: formattedDate }),
    })
      .then((response) => response.json())
      .then((data) => {
        //Reversing what we get in the db so that we have the most recent food at the top
        setFood(data.result.reverse());
      });
  }, [formattedDate, submitFoodPressed, deleteFoodPressed, user.email]);

  return (
    <JournalContainer>
      <p>Daily Journal</p>
      <TotalCalories
        formattedDate={formattedDate}
        deleteFoodPressed={deleteFoodPressed}
        submitFoodPressed={submitFoodPressed}
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
