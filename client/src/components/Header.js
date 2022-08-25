import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  return (
    <Wrapper>
      <Link to="/">Intention</Link>
      <PageContainer>
        <NavLink to="/food">Food</NavLink>
        <NavLink to="/exercise">Exercise</NavLink>
        <NavLink to="/spending">Spending</NavLink>
      </PageContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 15px;
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
`;

const PageContainer = styled.div`
  display: flex;
  gap: 20px;
  padding-right: 20px;
`;
export default Header;
