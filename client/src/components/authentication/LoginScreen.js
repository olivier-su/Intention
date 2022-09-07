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
          <QuoteContainer>
            <p>
              ''Every action you take is a vote for the type of person you wish
              to become.''
            </p>
            <p>- James Clear</p>
            <p>Atomic Habits</p>
          </QuoteContainer>
        </div>
      </LogInContainer>
    </>
  );
};

const QuoteContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
