import { useEffect, useState } from "react";
import { getArticlesApi } from "../../api/articles";
import { Article } from "../../types/article";
import styled from "styled-components";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    const getArticle = async () => {
      try {
        const result = await getArticlesApi();
        setArticles(result);
      } catch (e) {
        setError("Erreur au chargement des articles.");
      }
    };
    getArticle();
  }, []);
  return (
    <>
      <Button
        onClick={() => navigate("/admin")}
        variant="contained"
        style={{ backgroundColor: "black" }}
      >
        Ajouter un article
      </Button>
      <Container>
        {articles.map((article) => (
          <Item>
            <div>{article.name}</div>
            <div>Prix : {article.price}€</div>
          </Item>
        ))}
      </Container>
    </>
  );
};

export default ArticleList;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5em;
  margin: 5em;
`;

const Item = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: solid;
  border-width: 2px;
  border-color: black;
  align-items: center;
`;
