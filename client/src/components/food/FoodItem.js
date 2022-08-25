const FoodItem = ({ food }) => {
  return (
    <>
      <p>{food.name}</p>
      <p>{food.calories}</p>
      <img src={food.image} alt={food.name} />
    </>
  );
};

export default FoodItem;
