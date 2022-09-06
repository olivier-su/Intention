import CaloriesChart from "../components/food/CaloriesChart";
import ToDoList from "../components/task/ToDoList";
import Water from "../components/homePage/Water";

const formattedDate = new Date().toLocaleDateString(undefined, {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const HomePage = () => {
  return (
    <>
      <div>Welcome to the home page</div>
      <CaloriesChart />
      <ToDoList formattedDate={formattedDate} homePage={true} />
      <Water />
    </>
  );
};

export default HomePage;
