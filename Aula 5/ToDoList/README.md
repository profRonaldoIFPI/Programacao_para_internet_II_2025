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

O backend utiliza Express e EJS para renderização de páginas. As tarefas atualmente são mantidas em memória (sem persistência em banco de dados).

```javascript
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Array para armazenar tarefas
let tasks = [
  { id: 1, name: "Estudar Node.js", completed: false },
  { id: 2, name: "Preparar aula", completed: true }
];

// Rota para exibir tarefas
app.get("/tasks", (req, res) => {
  res.render("index", { tasks });
});

// Rota para adicionar nova tarefa
app.post("/tasks", (req, res) => {
  const { name } = req.body;
  if (name) {
    tasks.push({ id: Date.now(), name, completed: false });
  }
  res.redirect("/tasks");
});

// Rota para marcar tarefa como concluída
app.post("/tasks/:id/complete", (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: true } : task
  );
  res.redirect("/tasks");
});

app.listen(3000, () => {
  console.log("Servidor online.");
});
```

### Frontend (views/index.ejs)

A interface apresenta uma tabela com as tarefas, seus status e ações disponíveis:

- Coluna **Task**: Nome da tarefa
- Coluna **Status**: Estado atual (pendente/concluída)
- Coluna **Action**: Botão para marcar como concluída
- Formulário para adicionar novas tarefas

Exemplo de estrutura:

```ejs
<table>
  <tr>
    <th>Task</th>
    <th>Status</th>
    <th>Action</th>
  </tr>
  <% tasks.forEach(task => { %>
    <tr>
      <td><%= task.name %></td>
      <td><%= task.completed ? "Concluída" : "Pendente" %></td>
      <td>
        <% if (!task.completed) { %>
          <form method="POST" action="/tasks/<%= task.id %>/complete">
            <button type="submit">Concluir</button>
          </form>
        <% } %>
      </td>
    </tr>
  <% }) %>
</table>

<form method="POST" action="/tasks">
  <input type="text" name="name" placeholder="Nova tarefa" required>
  <button type="submit">Adicionar</button>
</form>
```

## 🔍 Próximos Passos
- Melhorar o design com CSS

## 👨🏽‍🏫 Autor

**Professor**: Ronaldo Borges  
**Disciplina**: Programação para Internet II  
**Curso**: TADS 2025.2
