import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import HomePage from "../pages/HomePage";
import FoodPage from "../pages/FoodPage";
import ExercisePage from "../pages/ExercisePage";
import SpendingPage from "../pages/SpendingPage";
import TaskPage from "../pages/TaskPage";
import { useAuth0 } from "@auth0/auth0-react";
import LoginScreen from "./authentication/LoginScreen";
import { CircularProgress } from "@mui/material";

const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <>
      {isAuthenticated ? (
        <BrowserRouter>
          <Header />
          <Main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/food" element={<FoodPage />} />
              <Route path="/task" element={<TaskPage />} />
              <Route path="/exercise" element={<ExercisePage />} />
              <Route path="/spending" element={<SpendingPage />} />
            </Routes>
          </Main>
        </BrowserRouter>
      ) : (
        <LoginScreen />
      )}
    </>
  );
};

const Main = styled.div``;
export default App;
