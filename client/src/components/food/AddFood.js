import styled from "styled-components";
import { useState } from "react";
import BarcodeForm from "./BarcodeForm";
import { useAuth0 } from "@auth0/auth0-react";

const AddFood = ({ date, submitFoodPressed, setSubmitFoodPressed }) => {
  const { user } = useAuth0();
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
        user: `${user.email}`,
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
    <AddFoodContainer>
      <p className="addFoodMessage">Add Food</p>
      <BarcodeForm setName={setName} setCalories={setCalories} />
      <ManualFormWrapper onSubmit={(e) => handleSubmitFood(e, name, calories)}>
        <div className="foodNameContainer">
          <label htmlFor="foodName">Food Name</label>
          <input
            type="text"
            id="foodName"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            required={true}
            maxLength="50"
          />
        </div>
        <div className="caloriesContainer">
          <label htmlFor="calories">Calories</label>
          <input
            type="number"
            id="calories"
            onChange={(e) => {
              setCalories(e.target.value);
            }}
            value={calories}
            required={true}
            max="9999"
          />
        </div>

        <input className="addButton" type="submit" value="Add" />
      </ManualFormWrapper>
    </AddFoodContainer>
  );
};

const AddFoodContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;

  .addFoodMessage {
    font-weight: bold;
  }
`;

const ManualFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;

  .foodNameContainer {
    display: flex;
    justify-content: space-between;
  }

  .caloriesContainer {
    display: flex;
    justify-content: space-between;
  }

  .addButton {
    background-color: white;
    border-radius: 5%;
    border-width: 1px;
  }
`;

export default AddFood;
