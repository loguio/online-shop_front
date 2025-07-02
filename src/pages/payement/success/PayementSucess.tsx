"use client";

import { Link } from "react-router-dom";
import { getCart } from "../../../api/cart/cart";
import { createOrder } from "../../../api/orders/orders.api";
import Cart from "../../../types/cart";
import { Alert, Button } from "@mui/material";
import { useEffect } from "react";

export default function PayementSuccess() {
  const fetchCart = async () => {
    const data = await getCart();

    if (data) {
      await sendOrder(data);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);

  const sendOrder = async (cart: Cart) => {
    await createOrder({
      items: cart?.cartItems.map((item) => {
        return {
          productId: item.product.id,
          quantity: item.quantity,
        };
      }),
    });
  };
  return (
    <div
      style={{
        // position: "fixed",
        marginTop: "10em",
        marginLeft: "32em",
        // transform: "translate(-50%, -50%)",
        display: "flex",
        height: "40em",
        flexDirection: "column",
        alignItems: "center",
        gap: "35px",
        maxWidth: "500px",
      }}
    >
      <Alert severity="success">Le payement a bien été effectué !</Alert>
      <div>
        <h1>Merci pour votre Achat !</h1>
        Vous recevrez vos articles dans les plus bref délais vous pouvez
        consulté l&apos;avancé de la livraison sur la page{" "}
        <Link to={"/my-order"} style={{ color: "black" }}>
          <strong>Mes commandes</strong>
        </Link>
      </div>
      <Link to={"/"}>
        <Button variant="contained" style={{ backgroundColor: "black" }}>
          Retourner à mes achats
        </Button>
      </Link>
    </div>
  );
}
