import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import LogoutButton from "./authentication/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { user } = useAuth0();

  return (
    <Wrapper>
      <WelcomeWrapper>
        <Link to="/">Intention</Link>
        <p>Welcome {user.name}</p>
        <LogoutButton />
      </WelcomeWrapper>
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

const WelcomeWrapper = styled.div`
  display: flex;
  gap: 15px;
`;

const PageContainer = styled.div`
  display: flex;
  gap: 20px;
  padding-right: 20px;
`;
export default Header;
