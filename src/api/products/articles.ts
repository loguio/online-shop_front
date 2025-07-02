import axiosI from "../../axiosInterceptor";
import Product from "../../types/product";

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

export const getArticlesApi = async (): Promise<Product[]> => {
  const res = await axiosI.get(`/article`);
  return res.data as Product[];
};
export const getArticleApi = async (id: string): Promise<Product> => {
  const res = await axiosI.get(`/article/${id}`);
  return res.data as Product;
};
