# Aula 4: Routers Separados e Templates EJS

## 🎯 Objetivo da Aula

Aprender a modularizar aplicações Express.js usando routers separados e implementar renderização de páginas dinâmicas com o template engine EJS (Embedded JavaScript), introduzindo conceitos do padrão MVC (Model-View-Controller).

## 📚 Conceitos Fundamentais

### Express Router
O Express Router permite criar módulos de rotas que podem ser montados em diferentes pontos da aplicação, promovendo:
- **Modularização**: Separação lógica de rotas
- **Reutilização**: Mesmo router em múltiplos caminhos
- **Organização**: Código mais limpo e estruturado
- **Manutenibilidade**: Facilita alterações e correções

### Template Engine EJS
EJS (Embedded JavaScript) é um template engine que permite:
- **HTML Dinâmico**: Inserção de dados JavaScript em HTML
- **Lógica de Apresentação**: Condicionais e loops nos templates
- **Reutilização**: Componentes e layouts reutilizáveis
- **Sintaxe Familiar**: Similar ao JavaScript puro

### Padrão MVC Introdutório
```
Model (Dados)  ←→  Controller (Lógica)  ←→  View (Apresentação)
     ↓                    ↓                        ↓
  Banco de Dados      Router/Express           Templates EJS
```

## 📂 Estrutura do Projeto

```
Aula 4/
├── index.js           # Aplicação principal
├── controller.js      # Router modular
├── views/            # Templates EJS
│   └── pagina.ejs    # Template HTML dinâmico
├── package.json      # Dependências
└── .gitignore        # Arquivos ignorados
```

## 📄 Análise dos Arquivos

### `index.js` - Aplicação Principal
```javascript
const express = require("express");
const app = express();
const controller = require("./controller");  // Importa router modular

// Configuração do template engine EJS
app.set("view engine", "ejs");

// Rota com renderização de template
app.get("/:texto", (req, res) => {
    var texto = req.params.texto;
    
    // Renderiza template 'pagina.ejs' passando dados
    res.render(
        "pagina",    // Nome do template (views/pagina.ejs)
        {
            texto: texto  // Dados enviados para o template
        }
    );
});

// Montagem de routers modulares
app.use("/user", controller);      // Rotas: /user/ e /user/rota2
app.use("/products", controller);  // Rotas: /products/ e /products/rota2

// Inicialização do servidor
app.listen(8080, (err) => {
    console.log("Servidor online!");
});
```

### `controller.js` - Router Modular
```javascript
const express = require("express");
const router = express.Router();  // Cria instância do router

// Rota base do router (será /user/ ou /products/)
router.get("/", (req, res) => {
    res.send("Esta resposta vem do controller");
});

// Rota adicional do router (será /user/rota2 ou /products/rota2)
router.get("/rota2", (req, res) => {
    res.send("Rota 2");
});

// Exporta o router para uso em outros arquivos
module.exports = router;
```

### `views/pagina.ejs` - Template HTML Dinâmico
```html
<!DOCTYPE html>
<html lang="pt_br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Renderiza variável 'texto' no título -->
    <title><%= texto %></title>
</head>
<body>
    <!-- Renderiza variável 'texto' no conteúdo -->
    <h1><%= texto %></h1>
</body>
</html>
```

### `package.json` - Configuração e Dependências
```json
{
  "name": "aula-4",
  "version": "1.0.0",
  "description": "Exemplo Router e EJS",
  "main": "index.js",
  "dependencies": {
    "express": "^5.1.0",
    "ejs": "^3.1.9"
  }
}
```

## 🔧 Como Executar

### Passos para Execução

1. **Navegue até a pasta da Aula 4:**
   ```bash
   cd "Aula 4"
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```
   > Isso instalará Express.js e EJS

3. **Execute o servidor:**
   ```bash
   node index.js
   ```

4. **Teste as rotas:**
   - Template: `http://localhost:8080/MeuTitulo`
   - Router: `http://localhost:8080/user/`
   - Router: `http://localhost:8080/products/rota2`

## 🧪 Testando a Aplicação

### Rotas com Templates EJS

| URL | Resultado |
|-----|----------|
| `http://localhost:8080/Express` | Página HTML com título "Express" |
| `http://localhost:8080/NodeJS` | Página HTML com título "NodeJS" |
| `http://localhost:8080/Programacao` | Página HTML com título "Programacao" |

### Rotas com Router Modular

| URL | Resultado |
|-----|----------|
| `http://localhost:8080/user/` | "Esta resposta vem do controller" |
| `http://localhost:8080/user/rota2` | "Rota 2" |
| `http://localhost:8080/products/` | "Esta resposta vem do controller" |
| `http://localhost:8080/products/rota2` | "Rota 2" |

## 🔍 Análise Detalhada

### 1. Configuração do EJS

```javascript
// Define EJS como template engine padrão
app.set("view engine", "ejs");
```

**O que isso faz:**
- Express procura templates na pasta `views/`
- Arquivos com extensão `.ejs` são processados automaticamente
- Permite usar `res.render()` sem especificar extensão

### 2. Renderização de Templates

```javascript
res.render("pagina", { texto: texto });
```

**Parâmetros:**
- **`"pagina"`**: Nome do template (busca `views/pagina.ejs`)
- **`{ texto: texto }`**: Objeto com dados para o template

### 3. Sintaxe EJS

```html
<!-- Renderiza valor (com escape HTML) -->
<%= variavel %>

<!-- Renderiza valor (sem escape HTML) -->
<%- variavel %>

<!-- Executa código JavaScript -->
<% if (condicao) { %>
    <p>Conteúdo condicional</p>
<% } %>
```

### 4. Express Router

```javascript
const router = express.Router();  // Cria router
router.get("/", handler);         // Define rota no router
module.exports = router;          // Exporta para reutilização
```

### 5. Montagem de Routers

```javascript
app.use("/user", controller);     // Monta router no caminho /user
app.use("/products", controller); // Monta mesmo router em /products
```

## 🌐 Exemplos Avançados

### Template com Lógica Condicional
```html
<!-- views/usuario.ejs -->
<!DOCTYPE html>
<html>
<head>
    <title>Perfil de <%= nome %></title>
</head>
<body>
    <h1>Bem-vindo, <%= nome %>!</h1>
    
    <% if (idade >= 18) { %>
        <p>Você é maior de idade.</p>
    <% } else { %>
        <p>Você é menor de idade.</p>
    <% } %>
    
    <% if (hobbies && hobbies.length > 0) { %>
        <h3>Seus hobbies:</h3>
        <ul>
            <% hobbies.forEach(hobby => { %>
                <li><%= hobby %></li>
            <% }); %>
        </ul>
    <% } %>
</body>
</html>
```

```javascript
// Rota correspondente
app.get('/usuario/:nome', (req, res) => {
    res.render('usuario', {
        nome: req.params.nome,
        idade: 20,
        hobbies: ['Programação', 'Leitura', 'Música']
    });
});
```

### Router com Middleware
```javascript
// controller-avancado.js
const express = require('express');
const router = express.Router();

// Middleware específico do router
router.use((req, res, next) => {
    console.log('Middleware do router executado');
    next();
});

// Rotas do router
router.get('/', (req, res) => {
    res.send('Rota com middleware');
});

router.get('/dados', (req, res) => {
    res.json({ timestamp: new Date(), router: 'avancado' });
});

module.exports = router;
```

### Template com Layout Parcial
```html
<!-- views/partials/header.ejs -->
<header>
    <nav>
        <a href="/">Home</a>
        <a href="/sobre">Sobre</a>
        <a href="/contato">Contato</a>
    </nav>
</header>
```

```html
<!-- views/pagina-completa.ejs -->
<!DOCTYPE html>
<html>
<head>
    <title><%= titulo %></title>
</head>
<body>
    <!-- Inclui partial -->
    <%- include('partials/header') %>
    
    <main>
        <h1><%= titulo %></h1>
        <p><%= conteudo %></p>
    </main>
</body>
</html>
```

## 🎓 Exercícios Práticos

### Exercício 1: Router de Produtos
Crie um router específico para produtos:
```javascript
// routes/produtos.js
const express = require('express');
const router = express.Router();

// Lista todos os produtos
router.get('/', (req, res) => {
    res.render('produtos/lista', {
        titulo: 'Lista de Produtos',
        produtos: ['Notebook', 'Mouse', 'Teclado']
    });
});

// Detalhes de um produto
router.get('/:id', (req, res) => {
    res.render('produtos/detalhes', {
        id: req.params.id,
        nome: 'Produto ' + req.params.id
    });
});

module.exports = router;
```

### Exercício 2: Template com Formulário
```html
<!-- views/contato.ejs -->
<!DOCTYPE html>
<html>
<head>
    <title>Contato</title>
</head>
<body>
    <h1>Entre em Contato</h1>
    
    <form method="POST" action="/contato">
        <label>Nome:</label>
        <input type="text" name="nome" required>
        
        <label>Email:</label>
        <input type="email" name="email" required>
        
        <label>Mensagem:</label>
        <textarea name="mensagem" required></textarea>
        
        <button type="submit">Enviar</button>
    </form>
</body>
</html>
```

### Exercício 3: Dashboard com Dados Dinâmicos
```javascript
app.get('/dashboard', (req, res) => {
    const dados = {
        usuario: 'João Silva',
        vendas: 1250,
        produtos: 45,
        clientes: 123,
        grafico: [10, 25, 30, 45, 60]
    };
    
    res.render('dashboard', dados);
});
```

## 🔧 Estrutura de Pastas Recomendada

```
projeto/
├── index.js              # Aplicação principal
├── routes/              # Routers modulares
│   ├── usuarios.js
│   ├── produtos.js
│   └── admin.js
├── views/               # Templates EJS
│   ├── layouts/         # Layouts base
│   ├── partials/        # Componentes reutilizáveis
│   ├── usuarios/        # Templates de usuários
│   └── produtos/        # Templates de produtos
├── public/              # Arquivos estáticos
│   ├── css/
│   ├── js/
│   └── images/
└── package.json
```

## 📊 Vantagens da Modularização

| Aspecto | Sem Router | Com Router |
|---------|------------|------------|
| **Organização** | Todas as rotas em um arquivo | Rotas separadas por contexto |
| **Manutenção** | Difícil em projetos grandes | Fácil localização e edição |
| **Reutilização** | Código duplicado | Routers reutilizáveis |
| **Colaboração** | Conflitos em equipe | Trabalho paralelo |
| **Testabilidade** | Testes complexos | Testes isolados |

## 🚀 Próximos Passos

Nas próximas aulas, você pode explorar:
- **Middleware personalizado**
- **Autenticação e autorização**
- **Integração com banco de dados**
- **APIs RESTful**
- **Upload de arquivos**
- **Sessões e cookies**

## 📚 Recursos Adicionais

- [Express Router Documentation](https://expressjs.com/en/guide/routing.html#express-router)
- [EJS Template Engine](https://ejs.co/)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [MVC Pattern Explained](https://developer.mozilla.org/docs/Glossary/MVC)
- [Template Engines Comparison](https://colorlib.com/wp/top-templating-engines-for-javascript/)

## 🔍 Conceitos-Chave Aprendidos

- ✅ **Express Router**: Modularização de rotas
- ✅ **Template Engine EJS**: Renderização de HTML dinâmico
- ✅ **res.render()**: Método para renderizar templates
- ✅ **Sintaxe EJS**: `<%= %>`, `<%- %>`, `<% %>`
- ✅ **Separação de Responsabilidades**: Conceitos básicos de MVC
- ✅ **Modularização**: Organização de código em módulos
- ✅ **Reutilização**: Uso do mesmo router em múltiplos caminhos

---

*A combinação de routers modulares e templates EJS permite criar aplicações web bem estruturadas e escaláveis. Continue praticando para dominar esses conceitos fundamentais!*