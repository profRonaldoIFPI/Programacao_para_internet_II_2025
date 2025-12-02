import { useRef } from "react"; //hooks
import "./App.css";
import api from "../services/api";

function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  async function logar() {
    try {
      const response = await api.post("/user/login", {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      });

      localStorage.setItem("token", response.data.token); // possibilita ataque XSS

      console.log(response.data.message);
      alert(response.data.message);
    } catch (error) {
      console.log("Erro ao cadastrar usuário:", error);
      alert(`Erro ao cadastrar usuário: ${error}`);
    }
  }
  return (
    <>
      <div style={{ border: "1px solid red" }}>
        <form>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" ref={emailRef} />
          <br />
          <label htmlFor="password">Senha</label>
          <input type="password" name="password" ref={passwordRef} />
          <br />
          <button type="button" onClick={logar}>
            Logar
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
