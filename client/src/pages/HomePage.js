import CaloriesChart from "../components/food/CaloriesChart";
import ToDoList from "../components/task/ToDoList";
import Water from "../components/homePage/Water";
import styled from "styled-components";

const HomePage = () => {
  const formattedDate = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return (
    <HomePageContainer>
      <CaloriesChart />
      <ToDoList formattedDate={formattedDate} homePage={true} />
      <Water />
    </HomePageContainer>
  );
};

const HomePageContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  min-height: 100vh;
`;

export default HomePage;
