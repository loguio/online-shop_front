"use client";

import { useEffect, useState } from "react";
import CartItem from "../../types/cartItem";
import { getCart, RemoveItemToCart } from "../../api/cart/cart";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchCart = async () => {
      try {
        const response = await getCart();
        if (response && response.cartItems) {
          setCartItems(response.cartItems);
        } else {
          setCartItems([]);
        }
      } catch (err) {
        console.error(err);
        setError("Impossible de récupérer le panier.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [token]);

  const handleRemoveItem = async (itemId: number) => {
    if (!token) return;

    try {
      await RemoveItemToCart({ id: itemId });
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
    } catch (err) {
      console.error("Erreur lors de la suppression de l'article", err);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  if (loading)
    return <div className="p-5 text-center">Chargement du panier...</div>;
  if (error) return <div className="p-5 text-center text-danger">{error}</div>;

  return (
    <div className="container py-5">
      <h2 className="mb-4">Votre panier</h2>

      {cartItems.length === 0 ? (
        <div className="alert alert-info">Votre panier est vide.</div>
      ) : (
        <>
          <div className="row g-3">
            {cartItems.map((item) => (
              <div className="col-md-6" key={item.id}>
                <div className="card p-3 shadow-sm h-100 d-flex flex-row align-items-center">
                  <div
                    style={{
                      width: 100,
                      height: 100,
                      position: "relative",
                      overflow: "hidden",
                      backgroundColor: "#f8f9fa",
                      flexShrink: 0,
                      borderRadius: "0.375rem", // équivalent Bootstrap "rounded"
                    }}
                  >
                    <img
                      src={
                        item.product.images[0]
                          ? import.meta.env.NEXT_PUBLIC_BACKEND_URL_IMAGE +
                            item.product.images[0].filePath
                          : "/image.png"
                      }
                      alt={item.product.name}
                      style={{ objectFit: "contain" }}
                    />
                  </div>

                  <div className="ms-3 flex-grow-1">
                    <h5 className="mb-1">{item.product.name}</h5>
                    <p className="mb-1">Quantité : {item.quantity}</p>
                    <p className="mb-2">
                      Prix total :{" "}
                      {(item.product.price * item.quantity).toFixed(2)} €
                    </p>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <h4>Total : {getTotalPrice().toFixed(2)} €</h4>
            <Link to={"/payement"}>
              <button className="btn btn-success mt-3">
                Procéder au paiement
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
