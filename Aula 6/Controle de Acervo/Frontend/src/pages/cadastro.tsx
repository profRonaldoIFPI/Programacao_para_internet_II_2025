import { useRef } from "react"; //hooks
import "./App.css";
import api from "../services/api";

function Cadastro() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  async function cadastraUsuario() {
    try {
      const response = await api.post("/user/cadastro", {
        name: nameRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      });
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
          <label htmlFor="name">Nome</label>
          <input type="text" name="name" ref={nameRef} />
          <br />
          <label htmlFor="email">Email</label>
          <input type="text" name="email" ref={emailRef} />
          <br />
          <label htmlFor="password">Senha</label>
          <input type="password" name="password" ref={passwordRef} />
          <br />
          <button type="button" onClick={cadastraUsuario}>
            Cadastrar
          </button>
        </form>
      </div>
    </>
  );
}

export default Cadastro;
