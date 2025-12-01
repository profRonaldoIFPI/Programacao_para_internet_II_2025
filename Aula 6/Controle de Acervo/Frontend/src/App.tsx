import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import api from './services/api';

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <div style={{ border: "1px solid red"}} >
        <h1>Controle de Acervo</h1>
        <form action={api.post("/user/login")} method="POST">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" />
          <br />
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" name="password" />
          <br />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </>
  )
}

export default App