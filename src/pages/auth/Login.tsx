import { Button } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = (props: { signin: boolean }) => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(userName, password);

    e.preventDefault();
    await login({ userName, password });
    navigate("/profil");
  };
  return (
    <Body>
      <Container>
        <ContainerLogin>
          <Title>Account </Title>
          <InputText
            type="text"
            placeholder="login"
            onChange={(val) => setUserName(val.target.value)}
          ></InputText>
          <InputText
            type="password"
            placeholder="password"
            onChange={(val) => setPassword(val.target.value)}
          ></InputText>
          <Button
            type="submit"
            onClick={(e) => submit(e)}
            variant="contained"
            style={{ marginTop: "6vh" }}
          >
            {props.signin ? "Signin" : "Login"}
          </Button>
        </ContainerLogin>
      </Container>
    </Body>
  );
};
const Body = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
`;
const Title = styled.span`
  font-size: 20px;
  font-weight: 700;
  display: flex;
`;
const Container = styled.div`
  display: flex;
  width: 70vh;
  height: 60vh;
  background-color: #ffffff;
  border-radius: 8px;
  flex-direction: column;
  gap: 20px;
`;
const ContainerLogin = styled.div`
  padding: 11vh;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const InputText = styled.input`
  display: flex;
  height: 5vh;
  border: 1px solid #bbb;
  padding: 0 0 0 10px;
  font-size: 16px;
  &:focus {
    border: 1px solid #3498db;
  }
  margin-top: 3vh;
`;
