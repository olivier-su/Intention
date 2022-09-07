import { FiTrash2 } from "react-icons/fi";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const FoodItem = ({ food, deleteFoodPressed, setDeleteFoodPressed, date }) => {
  const { user } = useAuth0();
  const handleDeleteFood = () => {
    fetch("/api/food", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: food._id,
        date,
        user: `${user.email}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setDeleteFoodPressed(deleteFoodPressed + 1);
      })
      .catch((err) => console.log(err));
  };

  return (
    <FoodItemContainer>
      <FoodItemDetail>
        <p className="food">{food.name}</p>
        <p>Calories: {food.calories}</p>
      </FoodItemDetail>
      <FiTrash2 className="trash" onClick={handleDeleteFood} />
    </FoodItemContainer>
  );
};

const FoodItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  padding: 5px;
  border-radius: 8%;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;

  .food {
    max-width: 300px;
    word-wrap: break-word;
  }
  .trash {
    cursor: pointer;

    :hover {
      color: red;
    }
  }
`;
const FoodItemDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export default FoodItem;
