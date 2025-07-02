"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { LoginState, useAuth } from "../../contexts/AuthContext";
import { RoleEnum } from "../../types/role";
import { Link } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userInfo, retrieveUserInfos } = useAuth();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      await retrieveUserInfos();
    } catch (e) {
      console.error("Erreur lors de la récupération du profil :", e);
    }
  };
  const ongletsMilieu = [
    { nom: "Shop", url: "/products" },
    { nom: "Offrir", url: "/offrir" },
    { nom: "Contact", url: "/contact" },
  ];

  const bandeauTexte = "Livraison offerte sur tous les abonnements à une box";

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <>
      {/* Bandeau promo */}
      <div className="bg-dark text-white text-center py-2">
        <p className="mb-0">{bandeauTexte}</p>
      </div>

      {/* Header Navbar */}
      <nav className="navbar navbar-expand-lg bg-white border-bottom">
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand" to="/">
            <img src="/logo.png" alt="Logo" width={185} height={40} />
          </Link>

          {/* Burger */}
          <button
            className="navbar-toggler"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Liens */}
          <div
            className={`collapse navbar-collapse${menuOpen ? " show" : ""}`}
            id="navbarNav"
          >
            <ul className="navbar-nav mx-auto">
              {ongletsMilieu.map((onglet, index) => (
                <li key={index} className="nav-item">
                  <Link
                    className="nav-link"
                    to={onglet.url}
                    onClick={() => setMenuOpen(false)}
                  >
                    {onglet.nom}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Icônes à droite */}
            {userInfo && userInfo.state == LoginState.LOGGED_IN && (
              <div className="d-flex align-items-center">
                <Link
                  to="/profile"
                  className="me-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <img
                    src="/user-alt-1-svgrepo-com.svg"
                    alt="Profile"
                    width={38}
                    height={38}
                  />
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setMenuOpen(false)}
                  className="me-2"
                >
                  <img
                    src="/bag-shopping-svgrepo-com.svg"
                    alt="Panier"
                    width={38}
                    height={38}
                  />
                </Link>
                {userInfo.role == RoleEnum.ROLE_ADMIN && (
                  <Link to={"/admin"} onClick={() => setMenuOpen(false)}>
                    <img
                      src="/user-shield-alt-1-svgrepo-com.svg"
                      alt="admin"
                      width={38}
                      height={38}
                    />
                  </Link>
                )}
              </div>
            )}
            {userInfo?.state == LoginState.LOGGED_OUT && (
              <div>
                <Link
                  className="nav-link"
                  to={"/login"}
                  onClick={() => setMenuOpen(false)}
                >
                  Se connecter
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
