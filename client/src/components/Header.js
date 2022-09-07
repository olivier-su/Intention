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
        <p className="welcomeMessage">Welcome {user.name}</p>
        <LogoutButton />
      </WelcomeWrapper>
      <PageContainer>
        <NavLink to="/food">Food</NavLink>
        <NavLink to="/task">Task</NavLink>
        <NavLink to="/exercise">Exercise</NavLink>
        <NavLink to="/finance">Finance</NavLink>
      </PageContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 15px;
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  margin-bottom: 50px;

  a {
    background-image: linear-gradient(to right, #6b705c, #6b705c 50%, #000 50%);
    background-size: 200% 100%;
    background-position: -100%;
    display: inline-block;
    padding: 5px 0;
    position: relative;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.3s ease-in-out;
  }

  a:before {
    content: "";
    background: #6b705c;
    display: block;
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 0;
    height: 3px;
    transition: all 0.3s ease-in-out;
  }

  a:hover {
    background-position: 0;
  }

  a:hover::before {
    width: 100%;
  }
`;

const WelcomeWrapper = styled.div`
  display: flex;
  gap: 15px;

  .welcomeMessage {
    font-size: 1.3em;
  }
`;

const PageContainer = styled.div`
  display: flex;
  gap: 20px;
  padding-right: 20px;
`;
export default Header;
