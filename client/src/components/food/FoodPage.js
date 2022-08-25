import { useEffect, useState } from "react";
import FoodItem from "./FoodItem";
const FoodPage = () => {
  const [food, setFood] = useState(null);
  const [foodSearch, setFoodSearch] = useState(null);

  //Use https://openfoodfacts.github.io/api-documentation/ to get data on a product in this case it's muffinmax
  useEffect(() => {
    fetch("https://world.openfoodfacts.org/api/v2/search?code=064042553207")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFoodSearch(data);
      });
  }, []);

  useEffect(() => {
    fetch("/api/food")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.result);
        setFood(data.result);
      });
  }, []);

  return (
    <div>
      {food ? (
        food.map((element) => {
          return <FoodItem food={element} key={element._id} />;
        })
      ) : (
        <p>Add food</p>
      )}
    </div>
  );
};

export default FoodPage;
