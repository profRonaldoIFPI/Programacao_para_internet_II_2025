import { useState } from "react"; //hooks

import "./App.css";
import Cadastro from "./cadastro";
import Login from "./login";

function Home() {
  const [view, setView] = useState("login");
  return (
    <>
      <button
        className={view === "cadastro" ? "active" : ""}
        onClick={() => setView("cadastro")}
      >
        Cadastrar
      </button>
      <button
        className={view === "login" ? "active" : ""}
        onClick={() => setView("login")}
      >
        Login
      </button>
      {view === "cadastro" ? <Cadastro /> : <Login />}
    </>
  );
}

export default Home;
