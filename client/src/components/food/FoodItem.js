const FoodItem = ({ food }) => {
  return (
    <>
      <p>{food.name}</p>
      <p>{food.calories}</p>
    </>
  );
};

export default FoodItem;
