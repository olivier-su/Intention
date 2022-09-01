import { FiTrash2 } from "react-icons/fi";
import styled from "styled-components";

const FoodItem = ({ food, deleteFoodPressed, setDeleteFoodPressed, date }) => {
  const handleDeleteFood = () => {
    fetch("/api/food", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: food._id,
        date,
        user: "yo",
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
        <p>{food.name}</p>
        <p>Calories: {food.calories}</p>
      </FoodItemDetail>
      <FiTrash2 className="trash" onClick={handleDeleteFood} />
    </FoodItemContainer>
  );
};

const FoodItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border: 2px solid black;
  margin: 5px 0;
  padding: 5px;

  .trash {
    cursor: pointer;
  }
`;
const FoodItemDetail = styled.div``;

export default FoodItem;
