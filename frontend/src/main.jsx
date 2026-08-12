import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";

import { CompareProvider } from "./context/CompareContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";


createRoot(
  document.getElementById("root")
).render(

  <StrictMode>

    <BrowserRouter>

      <AuthProvider>

        <CompareProvider>

          <WishlistProvider>

            <App />

          </WishlistProvider>

        </CompareProvider>

      </AuthProvider>

    </BrowserRouter>

  </StrictMode>

);