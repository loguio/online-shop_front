import axiosI from "../axiosInterceptor";
import { Article } from "../types/article";

export const createArticle = async (data: {
  name: string;
  price: number;
  image: string;
}) => {
  try {
    await axiosI.post("/article", { ...data });
    return null;
  } catch (e) {
    return { error: true, message: e.response.data.message as string };
  }
};

export const getArticlesApi = async (): Promise<Article[]> => {
  const res = await axiosI.get(`/article`);
  return res.data as Article[];
};
export const getArticleApi = async (
  id: string
): Promise<Article | Article[]> => {
  const res = await axiosI.get(`/article/${id}`);
  return res.data as Article;
};
