import { useState, useEffect, useContext } from "react";
import { AddFoodContext } from "../../contexts/food/AddFoodContext";
import { CircularProgress } from "@mui/material";

const TotalCalories = ({ formattedDate, deleteFoodPressed }) => {
  const [totalCalories, setTotalCalories] = useState(null);
  const { submitFoodPressed } = useContext(AddFoodContext);

  //Fetch total calories
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
  }, [formattedDate, submitFoodPressed, deleteFoodPressed]);

  return (
    <>
      {totalCalories !== null ? (
        <p>Total Calories for the day: {totalCalories}</p>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default TotalCalories;
