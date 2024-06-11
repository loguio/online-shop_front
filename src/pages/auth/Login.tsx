import { Button } from "@mui/material";
import styled from "styled-components";

export const Login = () => {
  console.log("la ?");
  return (
    <Body>
      <Container>
        <ContainerLogin>
          <Title>Account Login</Title>
          <InputText type="text" placeholder="login"></InputText>
          <InputText type="text" placeholder="password"></InputText>
          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: "6vh" }}
          >
            Login
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
  /* top: 20px; */
  display: flex;
  /* position: relative; */
`;
const Container = styled.div`
  display: flex;
  width: 70vh;
  height: 60vh;
  background-color: #ffffff;
  border-radius: 8px;
  /* padding: 30px; */
  flex-direction: column;
  gap: 20px;
`;
const ContainerLogin = styled.div`
  padding: 11vh;
  justify-content: center;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
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
