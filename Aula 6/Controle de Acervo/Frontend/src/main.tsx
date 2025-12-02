import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import Home from "./pages";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <h1>Controle de Acervo</h1>
    <Home />
  </StrictMode>
);
