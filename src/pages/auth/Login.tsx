import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { AuthStatus, useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { authStatusToString } from "../../utils/utils";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorMessage from "../../components/errorMessage";
interface IFormInput {
  email: string;
  password: string;
}
export const Login = ({ signin }: { signin: boolean }) => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const { submitLogin, submitRegister } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => submit(data);

  useEffect(() => {
    setErrorMessage("");
  }, []);
  const submit = async (data: IFormInput) => {
    if (!signin) {
      const status = await submitLogin({ ...data });
      if (status != AuthStatus.OK) {
        setErrorMessage(authStatusToString(status));
        return;
      }
      navigate("/profil");
    } else {
      const status = await submitRegister({ ...data });
      if (status != AuthStatus.OK) {
        setErrorMessage(authStatusToString(status));
        return;
      }
      navigate("/profil");
    }
  };
  return (
    <Body>
      <Container>
        <ContainerLogin>
          <Title>Account </Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputText
              autoFocus
              type="text"
              placeholder="email"
              {...register("email")}
            ></InputText>
            <InputText
              type="password"
              placeholder="password"
              {...register("password")}
            ></InputText>
            <Button
              type="submit"
              variant="contained"
              style={{ marginTop: "6vh" }}
            >
              {signin ? "Signin" : "Login"}
            </Button>
            {errorMessage && (
              <ErrorMessage message={errorMessage}></ErrorMessage>
            )}
          </form>
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
