import { Button, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { createArticle } from "../../api/articles";
import ErrorMessage from "../../components/errorMessage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface IFormInput {
  name: string;
  price: number;
}

const ArticleCreation = () => {
  const [error, setError] = useState<string>();
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setError("");
    const article = await createArticle({ ...data, image: "" });
    if (article?.error) {
      setError(article.message);
      return;
    }

    reset();
    toast.success("Article Ajouté");
  };

  return (
    <>
      <Button
        onClick={() => navigate("/articles")}
        variant="contained"
        style={{
          backgroundColor: "black",
        }}
      >
        Liste des articles
      </Button>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("name", { required: true, maxLength: 20 })}
          label="Nom du produit"
        />
        <TextField
          {...register("price", { pattern: /^[0-9]*$/i, required: true })}
          type="number"
          placeholder="Prix"
        />
        {error ? <ErrorMessage message={error} /> : <></>}
        <Button type="submit" variant="contained">
          Envoyer
        </Button>
      </Form>
    </>
  );
};

export default ArticleCreation;

const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
