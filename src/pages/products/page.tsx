"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Product from "../../types/product";
import axiosI from "../../axiosInterceptor";

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");

  const fetchProducts = async (searchQuery: string = "") => {
    setLoading(true);
    try {
      const url = searchQuery
        ? `${
            import.meta.env.NEXT_PUBLIC_BACKEND_URL
          }/products/search?keyword=${encodeURIComponent(searchQuery)}`
        : `${import.meta.env.NEXT_PUBLIC_BACKEND_URL}/products`;

      const response = await axiosI.get(url, {
        headers: {},
      });

      setProducts(response.data);
    } catch (err) {
      console.error(err);
      const error = err as Error;
      setError(error.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchProducts(query);
  };

  if (loading)
    return <p className="text-center mt-5">Chargement des produits...</p>;
  if (error)
    return <p className="text-danger text-center mt-5">Erreur : {error}</p>;

  return (
    <div className="container py-5">
      <h1 className="display-5 fw-bold text-center mb-4">Nos Produits</h1>

      {/* Barre de recherche */}
      <form
        onSubmit={handleSearch}
        className="d-flex justify-content-center mb-5"
      >
        <input
          type="text"
          className="form-control w-50 me-2"
          placeholder="Rechercher un produit..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="btn btn-dark">
          Chercher
        </button>
      </form>

      <div className="row g-4">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-md-6 col-lg-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
