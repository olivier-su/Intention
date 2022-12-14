import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const TotalCalories = ({
  formattedDate,
  deleteFoodPressed,
  submitFoodPressed,
}) => {
  const [totalCalories, setTotalCalories] = useState(null);
  const { user } = useAuth0();

  //Fetch total calories
  useEffect(() => {
    fetch("/api/calories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: `${user.email}`, date: formattedDate }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result.length > 0) {
          setTotalCalories(data.result[0].calories);
        } else {
          setTotalCalories(0);
        }
      });
  }, [formattedDate, submitFoodPressed, deleteFoodPressed, user.email]);

  return (
    <>
      {totalCalories !== null ? (
        <TotalCaloriesMessage>
          Total Calories for the day: {totalCalories}
        </TotalCaloriesMessage>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

const TotalCaloriesMessage = styled.p`
  font-weight: bold;
`;

export default TotalCalories;
