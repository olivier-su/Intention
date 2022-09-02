import LoginButton from "./LoginButton";
import styled from "styled-components";
const LoginScreen = () => {
  return (
    <>
      <LogInContainer>
        <p>Welcome To Intention</p>
        <p>Please Log In To Use The Application</p>
        <LoginButton />
      </LogInContainer>
    </>
  );
};

const LogInContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;
export default LoginScreen;
