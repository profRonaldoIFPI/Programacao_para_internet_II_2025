# API REST com Autenticação

Neste projeto estamos implementando uma API REST básica para gerenciamento de usuários com sistema de autenticação utilizando Node.js, Express, JWT (JSON Web Token) e MongoDB.

## Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web para Node.js
- **MongoDB** - Banco de dados NoSQL
- **JWT** - Biblioteca para geração e verificação de tokens
- **Mongoose** - ODM para MongoDB
- **bcrypt** - Biblioteca para hash de senhas
- **dotenv** - Gerenciamento de variáveis de ambiente

## Estrutura do Projeto

```
├── README.md
├── db.js                 # Configuração da conexão com MongoDB
├── index.js              # Arquivo principal da aplicação
├── model/
│   └── User.js          # Modelo de dados do usuário
├── package.json         # Dependências e scripts
├── routes/
│   └── public.js        # Rotas públicas da API
└── testeApi.http        # Arquivo de testes da API
```

## Funcionalidades

### Modelo de Usuário

O sistema trabalha com um modelo de usuário que contém:

- **name**: Nome do usuário (obrigatório)
- **email**: Email único do usuário (obrigatório)
- **password**: Senha criptografada (obrigatório)
- **isAdmin**: Flag para identificar administradores (padrão: false)

### Endpoints Disponíveis

#### POST /cadastro

Endpoint para cadastro de novos usuários.

**Corpo da requisição:**

```json
{
  "name": "Nome do Usuário",
  "email": "usuario@email.com",
  "password": "senha123",
  "isAdmin": false
}
```

**Resposta de sucesso (201):**

```json
{
  "message": "Usuário cadastrado."
}
```

## Configuração do Ambiente

Para executar este projeto, você precisa criar um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Porta do servidor
PORT=3000

# String de conexão com MongoDB (No dashboad da sua conta no MongoDB selecione o cluter e clique no boão "conect" selecione drivers e copie a URI).
MONGODB_URI="mongodb+srv://<username>:<password>@..."
```

## Como Executar

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o arquivo `.env` conforme mostrado acima
4. Execute o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
5. O servidor estará disponível em `http://localhost:3000`

## Segurança

- As senhas são criptografadas usando bcrypt com fator de custo 10 (1024 iterações)
- O sistema utiliza validação de dados através do Mongoose
- Emails são únicos no sistema

## Testes

O arquivo `testeApi.http` contém exemplos de requisições que podem ser executadas usando extensões como REST Client no VS Code.

## Autor

Ronaldo Borges - Professor IFPI
