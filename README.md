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

O exemplo prático demonstra a criação de um servidor HTTP básico utilizando o módulo nativo do Node.js, que responde com texto simples na porta 8080.

### 🔧 Como Executar

Para executar, navegue até a pasta "Aula 1" e inicie o servidor com o comando `node index.js`. Depois acesse http://localhost:8080 no navegador.

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

O exemplo demonstra uma aplicação Express com múltiplas rotas ("/teste" e "/rota2"), mostrando como configurar rotas básicas e inicializar um servidor na porta 8080.

### 🔧 Como Executar

Para executar, navegue até a pasta "Aula 2", instale as dependências com `npm install` e inicie o servidor com `node index.js`. Depois acesse http://localhost:8080/teste ou http://localhost:8080/rota2 no navegador.

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

O exemplo demonstra diferentes tipos de rotas em Express:
- Rota raiz que captura query strings (ex: /?campo=valor)
- Rota com parâmetro obrigatório (/IFPI/:conteudo)
- Rota específica que deve vir antes da genérica (/IFPI/Floriano)
- Rota sem parâmetro (/IFPI)

O código mostra como acessar os valores de req.query e req.params para manipular dados da URL.

### 🔧 Como Executar

Para executar, navegue até a pasta "Aula 3", instale as dependências com `npm install` e inicie o servidor com `node index.js`. Exemplos de acesso:
- http://localhost:8080/?campo=teste
- http://localhost:8080/IFPI/programacao
- http://localhost:8080/IFPI/Floriano

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
A aplicação principal configura o EJS como motor de template, cria uma rota dinâmica que captura um parâmetro da URL e o passa para o template, e utiliza routers modulares para organizar as rotas em `/user` e `/products`.

**Controller Modular (controller.js):**
Implementa um router Express com duas rotas: uma rota base que responde com texto simples e uma rota adicional `/rota2`. O router é exportado para ser usado na aplicação principal.

**Template EJS (views/pagina.ejs):**
Um template HTML básico que utiliza a sintaxe EJS para renderizar dinamicamente o valor da variável `texto` no título e no corpo da página.

### 🔧 Como Executar

Para executar, navegue até a pasta "Aula 4", instale as dependências com `npm install` e inicie o servidor com `node index.js`. Exemplos de acesso:
- http://localhost:8080/MeuTitulo (renderiza template)
- http://localhost:8080/user/ (controller)
- http://localhost:8080/products/rota2 (controller)

---

## 📝 Aula 5: Projeto Prático - ToDoList

### 📖 Conceitos Abordados

- Aplicação prática dos conceitos anteriores
- Desenvolvimento de uma aplicação completa de lista de tarefas
- Renderização de tabelas dinâmicas com EJS
- Estruturação de projeto web funcional
- Preparação para implementação de CRUD completo

### 📂 Arquivos

- **`app.js`** - Aplicação Express com configuração EJS e rota principal
- **`views/index.ejs`** - Template HTML com tabela de tarefas
- **`package.json`** - Dependências (Express + EJS) e scripts de execução
- **`README.md`** - Documentação detalhada do projeto

### 💡 Exemplo Prático

**Aplicação Principal (app.js):**
A aplicação configura o Express com o motor de template EJS e um decodificador para requisições POST. Define uma rota `/tasks` que renderiza o template `index.ejs` e inicia o servidor na porta 3000.

**Template EJS (views/index.ejs):**
Um template HTML que exibe uma lista de tarefas em formato de tabela, com colunas para a tarefa, status e ações. Inclui uma tarefa de exemplo "Estudar EJS" com status "pendente" e um link para adicionar novas tarefas.

### 🔧 Como Executar

Para executar, navegue até a pasta "Aula 5/ToDoList", instale as dependências com `npm install` e inicie o servidor com `npm run dev` (para desenvolvimento com nodemon) ou `npm start` (para execução normal). Depois acesse http://localhost:3000/tasks no navegador.

### 🚀 Funcionalidades Implementadas

- Persistencia em arquivo `.json`
- Visualização de tarefas em formato de tabela
- Estrutura para marcação de tarefas como concluídas

### 🔍 Próximos Passos

- Adicionar funcionalidade de adição de tarefa
- Adicionar funcionalidade de exclusão de tarefas
- Melhorar o design com CSS

---

## 🛠️ Pré-requisitos e Instalação

### Requisitos do Sistema

- **Node.js** (versão 14 ou superior)
- **npm** (gerenciador de pacotes)
- Editor de código (VS Code recomendado)

### Instalação Geral

Para instalar, clone o repositório, entre no diretório principal e, para cada aula, navegue até a pasta correspondente e instale as dependências com npm install.

## 📋 Comandos Úteis

Comandos básicos para trabalhar com o projeto:
- Instalar dependências: npm install
- Executar aplicação: node index.js
- Verificar versão do Node.js: node --version
- Verificar versão do npm: npm --version

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
5. **Aula 5**: Adicione colunas(campos) como "prazo" ou "nível prioridade" para as tarefas
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

O **[arquitetura.puml](arquitetura.puml)** mostra como os conceitos evoluem das aulas 1 a 5:

- **Aula 1**: HTTP nativo (base fundamental)
- **Aula 2**: Express.js (simplificação)
- **Aula 3**: Parâmetros dinâmicos (interatividade)
- **Aula 4**: MVC e templates (organização)
- **Aula 5**: Aplicação prática (ToDoList)

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

### 📋 Aplicação ToDoList

O **[todolist-diagram.puml](Aula 5/ToDoList/todolist-diagram.puml)** ilustra:

- Estrutura da aplicação ToDoList
- Fluxo de requisições e respostas
- Renderização de templates EJS
- Planejamento para futuras implementações
- Interação cliente-servidor

### 🛠️ Como Usar os Diagramas

1. **No VS Code**: Instale a extensão PlantUML, abra qualquer arquivo .puml e use Ctrl+Shift+P → "PlantUML: Preview Current Diagram"

2. **Online**: Copie o conteúdo do arquivo .puml, cole em [PlantUML Online](http://www.plantuml.com/plantuml/uml/) e visualize o diagrama gerado

3. **Linha de Comando**: Instale PlantUML e execute com java -jar plantuml.jar arquitetura.puml

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
