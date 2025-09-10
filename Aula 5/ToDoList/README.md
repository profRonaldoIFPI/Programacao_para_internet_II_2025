## 💡 Funcionalidades

- Visualização de tarefas em formato de tabela
- Marcação de tarefas como concluídas
- Adição de novas tarefas

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Iniciar o servidor em modo de desenvolvimento
npm run dev

# OU iniciar o servidor normalmente
npm start
```

Acesse a aplicação em: http://localhost:3000/tasks

## 📋 Estrutura da Aplicação

### Backend (app.js)

```javascript
const express = require("express");
const app = express();

app.set("view engine", "ejs"); //configura o motor de render
app.use(express.urlencoded({ extended: true })); //decodificador POST

app.get("/tasks", (req, res) => {
  res.render("index");
});

app.listen(3000, (err) => {
  console.log("Servidor online.");
});
```

### Frontend (views/index.ejs)

A interface apresenta uma tabela com as tarefas, seus status e ações disponíveis:

- Coluna **Task**: Nome da tarefa
- Coluna **Status**: Estado atual (pendente/concluída)
- Coluna **Action**: Botão para marcar como concluída

## 🔍 Próximos Passos

- Implementar persistência de dados
- Adicionar funcionalidade de exclusão de tarefas
- Melhorar o design com CSS
- Implementar filtros por status

## 👨🏽‍🏫 Autor

**Professor**: Ronaldo Borges  
**Disciplina**: Programação para Internet II  
**Curso**: TADS 2025.2
