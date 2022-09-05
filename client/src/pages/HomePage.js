import CaloriesChart from "../components/food/CaloriesChart";
import ToDoList from "../components/task/ToDoList";

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
    </>
  );
};

export default HomePage;
