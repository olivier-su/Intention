import styled from "styled-components";
import { useState, useContext } from "react";
import { AddFoodContext } from "../../contexts/food/AddFoodContext";

const ManuallyAddFood = ({ date }) => {
  const { submitFoodPressed, setSubmitFoodPressed } =
    useContext(AddFoodContext);
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");

  const handleSubmitFood = (e, name, calories) => {
    e.preventDefault();
    //The calories that we get from the input is a string so we typecast it to a number
    calories = Number(calories);

    fetch("/api/food", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        calories,
        date,
        user: "yo",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSubmitFoodPressed(submitFoodPressed + 1);
        setName("");
        setCalories("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <p>Add Food</p>
      <FormWrapper onSubmit={(e) => handleSubmitFood(e, name, calories)}>
        <label htmlFor="foodName">Food Name</label>
        <input
          type="text"
          id="foodName"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          required={true}
        ></input>
        <label htmlFor="calories">Calories</label>
        <input
          type="number"
          id="calories"
          onChange={(e) => {
            setCalories(e.target.value);
          }}
          value={calories}
          required={true}
        ></input>
        <input type="submit" value="Add" />
      </FormWrapper>
    </div>
  );
};

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
`;

export default ManuallyAddFood;
