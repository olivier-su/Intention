import styled from "styled-components";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
const WaterForm = ({ date, setWaterPressed, waterPressed }) => {
  const { user } = useAuth0();
  const [quantity, setQuantity] = useState(0);
  console.log(quantity);
  const handleSubmitWater = (e, quantity) => {
    e.preventDefault();
    quantity = Number(quantity);

    fetch("/api/water", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity,
        date,
        user: `${user.email}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setWaterPressed(waterPressed + 1);
        setQuantity("");
      })
      .catch((err) => console.log(err));
  };
  return (
    <WaterFormContainer onSubmit={(e) => handleSubmitWater(e, quantity)}>
      <label htmlFor="waterForm">
        How much water did you drink today (mL)?
      </label>
      <div className="inputContainer">
        <input
          type="number"
          id="waterForm"
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
          value={quantity}
          required={true}
        />
        <input className="addBtn" type="submit" value="Add" />
      </div>
    </WaterFormContainer>
  );
};

const WaterFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  .inputContainer {
    display: flex;
    gap: 3px;
  }

  .addBtn {
    background-color: white;
    border-radius: 10%;
    border-width: 1px;
  }
`;

export default WaterForm;
