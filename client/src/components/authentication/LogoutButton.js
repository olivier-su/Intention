import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styled from "styled-components";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <LogoutBtn onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </LogoutBtn>
  );
};

const LogoutBtn = styled.button`
  background-color: white;
  border-width: 1px;
  border-radius: 10%;
`;

export default LogoutButton;
