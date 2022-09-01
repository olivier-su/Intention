import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "../GlobalStyles";
import Header from "./Header";
import styled from "styled-components";
import HomePage from "../pages/HomePage";
import FoodPage from "../pages/FoodPage";
import ExercisePage from "../pages/ExercisePage";
import SpendingPage from "../pages/SpendingPage";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/food" element={<FoodPage />} />
          <Route path="/exercise" element={<ExercisePage />} />
          <Route path="/spending" element={<SpendingPage />} />
        </Routes>
      </Main>
    </BrowserRouter>
  );
};

const Main = styled.div``;
export default App;
