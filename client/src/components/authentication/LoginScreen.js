import LoginButton from "./LoginButton";
import styled from "styled-components";
const LoginScreen = () => {
  return (
    <>
      <LogInContainer>
        <img
          className="intentionLogo"
          src="../../../images/intentionLogo.png"
          alt="intention logo"
        />
        <div className="logInContainer">
          <p className="welcomeMessage">Set Your Intentions For The Day</p>
          <LoginButton />
        </div>
      </LogInContainer>
      <QuoteContainer>
        <p>''Successful people are simply those with successful habits.''</p>
        <p>- Brian Tracy</p>
      </QuoteContainer>
    </>
  );
};

const QuoteContainer = styled.div`
  position: absolute;
  bottom: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const LogInContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  .logInContainer {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: -150px;
    align-items: center;

    .welcomeMessage {
      font-weight: bold;
    }

    button {
      width: 60px;
      background-color: #b7b7a4;
      border-radius: 10%;
      border: none;
      padding: 5px;
      color: white;
      box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
        rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
      cursor: pointer;
    }
  }

  .intentionLogo {
    margin-top: -180px;
    margin-left: 50px;
    width: 500px;
  }
`;
export default LoginScreen;
