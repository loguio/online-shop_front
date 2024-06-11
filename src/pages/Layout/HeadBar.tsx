// import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import styled, { css } from "styled-components";
import React from "react";
interface ReactNodeProps {
  children: React.ReactNode;
}
const HeadBar = (props: ReactNodeProps) => {
  const navigate = useNavigate();
  return (
    <>
      <Background>
        <Button onClick={() => navigate("/")} buttonType="primary">
          Accueil
        </Button>
        Online SHOP
        <RightContainer>
          <Button buttonType="primary" onClick={() => navigate("/login")}>
            Se connecter
          </Button>
          <Button buttonType="primary" onClick={() => navigate("/login")}>
            S'inscrire
          </Button>
          <Button buttonType="primary" onClick={() => navigate("/profil")}>
            Profil
          </Button>
        </RightContainer>
      </Background>
      <div style={{ minHeight: "100%" }}>{props.children}</div>
    </>
  );
};
export default HeadBar;

const Background = styled.div`
  height: 15vh;
  border-bottom: 2px solid;
  color: black;
  display: flex;
  align-items: center;
  padding-left: 50px;
  background-color: #f29898;
`;

const RightContainer = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  padding-right: 5vh;
  justify-content: space-between;
  /* width: 10%; */
`;
interface StyleProps {
  buttonType: "primary" | "secondary" | "blue" | "white" | "green" | "red";
  disabled?: boolean;
}
const buttonStyles = css<StyleProps>`
  border: 1px solid;
  border-color: ${(props: StyleProps) => {
    switch (props.buttonType) {
      case "secondary":
        return "#000000";
      case "white":
        return "#ffffff";
      default:
        return "transparent";
    }
  }};
  border-radius: ${(props: StyleProps) => {
    switch (props.buttonType) {
      case "primary":
        return "5px";
      case "secondary":
        return "0px";
      default:
        return "8px";
    }
  }};
  display: flex;
  margin-right: 10vh;
  justify-content: center;
  align-items: center;
  padding: 8px;
  height: 5vh;

  min-width: 15vh;
  background-color: ${(props: StyleProps) => {
    switch (props.buttonType) {
      case "primary":
        return "#000000";
      case "secondary":
        return "transparent";
      case "white":
        return "#ffffff";
      default:
        return "#000000";
    }
  }};
  color: ${(props: StyleProps) => {
    switch (props.buttonType) {
      case "secondary":
        return "#000000";
      case "white":
        return "#076F94";
      default:
        return "#ffffff";
    }
  }};
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};

  &:hover {
    opacity: ${(props) => (props.disabled ? 0.4 : 0.65)};
  }
`;

const Button = styled.button<StyleProps>`
  ${buttonStyles}
`;
