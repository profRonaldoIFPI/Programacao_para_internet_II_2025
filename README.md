# Programação para Internet II — Exemplos Práticos (TADS 2025.2)

## 📚 Sobre o Repositório

Este repositório contém exemplos práticos e progressivos da disciplina **Programação para Internet II** do curso de Tecnologia em Análise e Desenvolvimento de Sistemas (TADS 2025.2).

Cada pasta representa uma aula com conceitos específicos, construindo conhecimento de forma incremental desde servidores HTTP básicos até aplicações web completas com Express.js e templates EJS.

## 🎯 Objetivos de Aprendizagem

- Compreender os fundamentos de servidores HTTP em Node.js
- Dominar o framework Express.js para desenvolvimento web
- Implementar roteamento dinâmico e manipulação de parâmetros
- Utilizar templates EJS para renderização de páginas dinâmicas
- Organizar código com padrão MVC (Model-View-Controller)
- Desenvolver aplicações web interativas com persistência de dados

## 📁 Estrutura do Repositório

````

<File before editing>
```markdown
# Programação para Internet II — Exemplos Práticos (TADS 2025.2)

## 📚 Sobre o Repositório

Este repositório contém exemplos práticos e progressivos da disciplina **Programação para Internet II** do curso de Tecnologia em Análise e Desenvolvimento de Sistemas (TADS 2025.2).

Cada pasta representa uma aula com conceitos específicos, construindo conhecimento de forma incremental desde servidores HTTP básicos até aplicações web completas com Express.js e templates EJS.

## 🎯 Objetivos de Aprendizagem

- Compreender os fundamentos de servidores HTTP em Node.js
- Dominar o framework Express.js para desenvolvimento web
- Implementar roteamento dinâmico e manipulação de parâmetros
- Utilizar templates EJS para renderização de páginas dinâmicas
- Organizar código com padrão MVC (Model-View-Controller)

## 📁 Estrutura do Repositório

````

Programacao_para_internet_II_2025/
├── Aula 1/ # Servidor HTTP Nativo
│ ├── index.js # Servidor HTTP básico
│ ├── teste.js # Exemplo Hello World
│ ├── package.json # Configurações do projeto
│ └── README.md # Documentação detalhada
├── Aula 2/ # Introdução ao Express
│ ├── index.js # Aplicação Express básica
│ ├── package.json # Dependências (Express)
│ └── README.md # Guia do Express
├── Aula 3/ # Parâmetros e Query Strings
│ ├── index.js # Rotas dinâmicas
│ ├── package.json # Configurações Express
│ ├── parametros-diagram.puml # Diagrama de fluxo de dados
│ └── README.md # Guia de parâmetros
├── Aula 4/ # Routers e Templates EJS
│ ├── index.js # Aplicação principal
│ ├── controller.js # Router modular
│ ├── views/
│ │ └── pagina.ejs # Template HTML dinâmico
│ ├── package.json # Dependências (Express + EJS)
│ ├── mvc-diagram.puml # Diagrama arquitetura MVC
│ └── README.md # Guia MVC e Templates
├── arquitetura.puml # Diagrama geral da evolução
└── README.md # Este arquivo (documentação principal)

````

## 📊 Diagramas Arquiteturais

Este repositório inclui diagramas PlantUML para visualizar a arquitetura e evolução dos conceitos:

- **[arquitetura.puml](arquitetura.puml)** - Visão geral da evolução arquitetural das 4 aulas
- **[Aula 3/parametros-diagram.puml](Aula 3/parametros-diagram.puml)** - Fluxo de parâmetros e query strings
- **[Aula 4/mvc-diagram.puml](Aula 4/mvc-diagram.puml)** - Arquitetura MVC com Express Router e EJS

> **Dica**: Use extensões como "PlantUML" no VS Code para visualizar os diagramas diretamente no editor.

---

## 🚀 Aula 1: Servidor HTTP Básico com Node.js

### 📖 Conceitos Abordados
- Módulo `http` nativo do Node.js
- Criação de servidor HTTP básico
- Manipulação de requisições e respostas
- Configuração de headers HTTP

### 📂 Arquivos
- **`index.js`** - Servidor HTTP básico que responde na porta 8080
- **`teste.js`** - Exemplo simples de "Hello World" em Node.js
- **`package.json`** - Configurações do projeto
- **`.gitignore`** - Arquivos ignorados pelo Git

### 💡 Exemplo Prático
```javascript
// Servidor HTTP básico que responde com texto simples
const http = require('http');

const servidor = http.createServer((requisicao, resposta) => {
    resposta.writeHead(200, {'Content-Type': 'text/plain'});
    resposta.end('Isso é uma resposta do servidor HTTP');
});

servidor.listen(8080, (erro) => {
    if(erro) {
        return console.log('Erro ao iniciar o servidor:', erro);
    } else {
        console.log('Servidor rodando na porta 8080');
    }
});
````

### 🔧 Como Executar

```bash
cd "Aula 1"
node index.js
# Acesse: http://localhost:8080
```

---

## 🌐 Aula 2: Introdução ao Express.js

### 📖 Conceitos Abordados

- Framework Express.js
- Roteamento básico com métodos HTTP
- Middleware e manipuladores de rota
- Simplificação do desenvolvimento web

### 📂 Arquivos

- **`index.js`** - Aplicação Express com rotas básicas
- **`package.json`** - Dependências incluindo Express
- **`.gitignore`** - Configuração de arquivos ignorados

### 💡 Exemplo Prático

```javascript
// Aplicação Express com múltiplas rotas
const express = require("express");
const app = express();

// Rota 1: /teste
app.get("/teste", (req, res) => {
  res.send("Olá Express!");
});

// Rota 2: /rota2
app.get("/rota2", (req, res) => {
  res.send("Rota 2!");
});

// Inicialização do servidor
app.listen(8080, (erro) => {
  if (erro) {
    console.log("Erro ao iniciar o servidor:", erro);
  } else {
    console.log("Servidor rodando na porta 8080");
  }
});
```

### 🔧 Como Executar

```bash
cd "Aula 2"
npm install
node index.js
# Acesse: http://localhost:8080/teste ou http://localhost:8080/rota2
```

---

## 🔗 Aula 3: Parâmetros de Rota e Query Strings

### 📖 Conceitos Abordados

- Parâmetros de rota dinâmicos (`:parametro`)
- Query strings (`?campo=valor`)
- Captura e manipulação de dados da URL
- Roteamento condicional

### 📂 Arquivos

- **`index.js`** - Rotas com parâmetros e query strings
- **`package.json`** - Configurações do projeto Express
- **`.gitignore`** - Arquivos ignorados

### 💡 Exemplo Prático

```javascript
const express = require("express");
const app = express();

// Rota com query string opcional
app.get("/", (req, res) => {
  var busca = req.query["campo"]; // ?campo=valor
  var saida = "Query: " + busca;
  res.send(saida);
});

// Rota com parâmetro obrigatório
app.get("/IFPI/:conteudo", (req, res) => {
  var conteudo = req.params.conteudo; // /IFPI/teste
  var saida = "Parametro: " + conteudo;
  res.send(saida);
});

// Rota específica (deve vir antes da genérica)
app.get("/IFPI/Floriano", (req, res) => {
  res.send("IFPI Campus Floriano");
});

// Rota sem parâmetro
app.get("/IFPI", (req, res) => {
  res.send("Você não passou nenhum termo de busca");
});
```

### 🔧 Como Executar

```bash
cd "Aula 3"
npm install
node index.js
# Exemplos de acesso:
# http://localhost:8080/?campo=teste
# http://localhost:8080/IFPI/programacao
# http://localhost:8080/IFPI/Floriano
```

---

## 🎨 Aula 4: Routers Separados e Templates EJS

### 📖 Conceitos Abordados

- Express Router para modularização
- Template engine EJS (Embedded JavaScript)
- Renderização de páginas dinâmicas
- Separação de responsabilidades (MVC)
- Passagem de dados para templates

### 📂 Arquivos

- **`index.js`** - Aplicação principal com configuração EJS
- **`controller.js`** - Router modular exportado
- **`views/pagina.ejs`** - Template HTML dinâmico
- **`package.json`** - Dependências (Express + EJS)
- **`.gitignore`** - Configuração de arquivos ignorados

### 💡 Exemplo Prático

**Aplicação Principal (index.js):**

```javascript
const express = require("express");
const app = express();
const controller = require("./controller");

// Configuração do template engine
app.set("view engine", "ejs");

// Rota com renderização de template
app.get("/:texto", (req, res) => {
  var texto = req.params.texto;
  res.render("pagina", {
    // Renderiza views/pagina.ejs
    texto: texto, // Passa dados para o template
  });
});

// Uso de routers modulares
app.use("/user", controller); // Rotas: /user/ e /user/rota2
app.use("/products", controller); // Rotas: /products/ e /products/rota2
```

**Controller Modular (controller.js):**

```javascript
const express = require("express");
const router = express.Router();

// Rota base do router
router.get("/", (req, res) => {
  res.send("Esta resposta vem do controller");
});

// Rota adicional do router
router.get("/rota2", (req, res) => {
  res.send("Rota 2");
});

module.exports = router;
```

**Template EJS (views/pagina.ejs):**

```html
<!DOCTYPE html>
<html lang="pt_br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%= texto %></title>
    <!-- Dados dinâmicos -->
  </head>
  <body>
    <h1><%= texto %></h1>
    <!-- Renderização de variável -->
  </body>
</html>
```

### 🔧 Como Executar

```bash
cd "Aula 4"
npm install
node index.js
# Exemplos de acesso:
# http://localhost:8080/MeuTitulo (renderiza template)
# http://localhost:8080/user/ (controller)
# http://localhost:8080/products/rota2 (controller)
```

---

## 🛠️ Pré-requisitos e Instalação

### Requisitos do Sistema

- **Node.js** (versão 14 ou superior)
- **npm** (gerenciador de pacotes)
- Editor de código (VS Code recomendado)

### Instalação Geral

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre no diretório
cd "Programacao_para_internet_II_2025"

# Para cada aula, instale as dependências:
cd "Aula X"
npm install
```

## 📋 Comandos Úteis

```bash
# Instalar dependências
npm install

# Executar aplicação
node index.js

# Verificar versão do Node.js
node --version

# Verificar versão do npm
npm --version
```

## 🔍 Conceitos Importantes

### HTTP Status Codes

- **200** - OK (sucesso)
- **404** - Not Found (não encontrado)
- **500** - Internal Server Error (erro interno)

### Express.js Fundamentals

- **Middleware** - Funções que executam durante o ciclo de requisição
- **Routing** - Definição de endpoints da aplicação
- **Template Engine** - Sistema de renderização de páginas dinâmicas

### EJS Syntax

- **`<%= variavel %>`** - Renderiza valor (com escape HTML)
- **`<%- variavel %>`** - Renderiza valor (sem escape HTML)
- **`<% codigo %>`** - Executa código JavaScript

## 🎓 Exercícios Sugeridos

1. **Aula 1**: Modifique o servidor para retornar HTML em vez de texto simples
2. **Aula 2**: Adicione uma rota que retorne dados em formato JSON
3. **Aula 3**: Crie uma rota que aceite múltiplos parâmetros
4. **Aula 4**: Desenvolva um template mais complexo com CSS e JavaScript

## 📚 Recursos Adicionais

### Documentação Oficial

- [Documentação oficial do Node.js](https://nodejs.org/docs/)
- [Documentação do Express.js](https://expressjs.com/)
- [Guia do EJS](https://ejs.co/)
- [MDN Web Docs - HTTP](https://developer.mozilla.org/docs/Web/HTTP)

### Ferramentas para Diagramas

- [PlantUML](https://plantuml.com/) - Ferramenta para criação de diagramas
- [VS Code PlantUML Extension](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml) - Extensão para visualizar diagramas
- [PlantUML Online Server](http://www.plantuml.com/plantuml/uml/) - Visualizador online

## 🎨 Sobre os Diagramas PlantUML

Os diagramas incluídos neste repositório servem como ferramentas pedagógicas para:

### 📈 Visualização da Evolução

O **[arquitetura.puml](arquitetura.puml)** mostra como os conceitos evoluem das aulas 1 a 4:

- **Aula 1**: HTTP nativo (base fundamental)
- **Aula 2**: Express.js (simplificação)
- **Aula 3**: Parâmetros dinâmicos (interatividade)
- **Aula 4**: MVC e templates (organização)

### 🔄 Fluxo de Dados

O **[parametros-diagram.puml](Aula 3/parametros-diagram.puml)** ilustra:

- Como URLs são processadas
- Diferença entre parâmetros e query strings
- Ordem de precedência das rotas
- Objetos `req.params` e `req.query`

### 🏗️ Arquitetura MVC

O **[mvc-diagram.puml](Aula 4/mvc-diagram.puml)** demonstra:

- Separação de responsabilidades
- Fluxo Model-View-Controller
- Integração Express Router + EJS
- Modularização de código

### 🛠️ Como Usar os Diagramas

1. **No VS Code**:

   ```bash
   # Instale a extensão PlantUML
   # Abra qualquer arquivo .puml
   # Use Ctrl+Shift+P → "PlantUML: Preview Current Diagram"
   ```

2. **Online**:

   - Copie o conteúdo do arquivo .puml
   - Cole em [PlantUML Online](http://www.plantuml.com/plantuml/uml/)
   - Visualize o diagrama gerado

3. **Linha de Comando**:
   ```bash
   # Instale PlantUML
   java -jar plantuml.jar arquitetura.puml
   ```

### 📖 Valor Pedagógico

Os diagramas ajudam a:

- **Compreender** a arquitetura visualmente
- **Comparar** diferentes abordagens
- **Memorizar** fluxos de dados
- **Planejar** futuras implementações
- **Documentar** decisões arquiteturais

## 👨🏽‍🏫 Autor

**Professor**: Ronaldo Borges  
**Disciplina**: Programação para Internet II  
**Curso**: TADS 2025.2

---

_Cada pasta é independente e pode ser estudada separadamente. Use os exemplos para compreender a evolução dos conceitos e práticas de desenvolvimento web com Node.js e Express.js._
