# Controle de Acervo - API REST

Aplicacao demonstrativa usada em Programacao para Internet II. A API permite cadastrar usuarios, organizar colecoes de objetos, registrar emprestimos e acompanhar devolucoes usando Node.js, Express e Sequelize com SQLite.

## Visao Geral
- Fluxo completo de cadastro/login com JWT (usuarios e administradores).
- CRUD de colecoes, objetos, pessoas e emprestimos.
- Compartilhamento de colecoes via gestores (CollectionManagers) com flag `canManage`.
- Soft delete de usuarios via `isActive`.
- Documentacao OpenAPI/Swagger servida em `/docs` quando `NODE_ENV=development`.

## Tecnologias
- Node.js 18+
- Express 5
- Sequelize 6 + SQLite3
- bcrypt, jsonwebtoken, dotenv, swagger-ui-express, swagger-jsdoc

## Estrutura de Pastas
```
project-root/
  src/
    database/
      db.js
    middleware/
      authenticate.js
    modules/
      user/
      Collection/
      Object/
      Person/
      Loan/
      CollectionManager/
      associations.js
    docs/
      openapi.js
    index.js
  testeApi_User.http
  .env
```

## Modelos (Sequelize)
- Usuario (`src/modules/user/user.model.js`): `name`, `email` (unico), `password` (hash), `isAdmin` (bool, padrao false), `isActive` (bool, padrao true).
- Colecao (`src/modules/Collection/collection.model.js`): `name`, `description`, `type`, `value`, `ownerId` (FK User).
- Objeto (`src/modules/Object/object.model.js`): `description`, `type`, `value`, `collectionId` (FK Collection).
- Pessoa (`src/modules/Person/person.model.js`): `name`, `phone`, `email`, `cpf`.
- Emprestimo (`src/modules/Loan/loan.model.js`): `loanDate`, `repaymentDate`, `itIsBack` (bool, padrao false), `status` (padrao `pending`), `notes`, `personId` (FK Person), `objectId` (FK Object).
- Gestor de Colecao (`src/modules/CollectionManager/collectionManager.model.js`): `collectionId` (FK Collection), `userId` (FK User), `canManage` (bool, padrao true).

## Relacionamentos
- User 1:N Collection (ownerId).
- Collection 1:N Object (collectionId).
- Person 1:N Loan (personId).
- Object 1:N Loan (objectId).
- User N:M Collection via CollectionManager (canManage).
- Todas as associacoes sao registradas em `src/modules/associations.js` e sincronizadas no startup com `sequelize.sync()`.

## Endpoints
Base URL: `http://localhost:<PORT>`.

**Publicos (`/user`)**
- `POST /user/cadastro` : cria usuario (senha com hash bcrypt).
- `POST /user/login` : retorna token JWT (`Authorization: Bearer <token>`).

**Usuarios autenticados (`/user`)**
- `GET /user/listarUsuarios` : lista usuarios (exclui senha).
- `POST /user/atualizarUsuario` : atualiza usuario (body com `id`).

**Administradores (`/user`)**
- `POST /user/deletarUsuario` : soft delete (`isActive=false`).
- `POST /user/promoverUsuario` : torna admin.

**Colecoes (`/collections`, token)**
- `GET /collections` : listar.
- `POST /collections` : criar (usa `ownerId` do token se presente).
- `POST /collections/update` : atualizar.
- `POST /collections/delete` : remover.

**Objetos (`/objects`, token)**
- `GET /objects` : listar.
- `POST /objects` : criar.
- `POST /objects/update` : atualizar.
- `POST /objects/delete` : remover.

**Pessoas (`/people`, token)**
- `GET /people` : listar.
- `POST /people` : criar.
- `POST /people/update` : atualizar.
- `POST /people/delete` : remover.

**Emprestimos (`/loans`, token)**
- `GET /loans` : listar.
- `POST /loans` : criar.
- `POST /loans/update` : atualizar.
- `POST /loans/delete` : remover.

**Gestores de Colecao (`/collectionManagers`, token admin)**
- `GET /collectionManagers?collectionId=:id` : listar gestores (filtro opcional).
- `POST /collectionManagers` : adicionar gestor.
- `POST /collectionManagers/update` : atualizar `canManage`.
- `POST /collectionManagers/delete` : remover gestor.

## Autenticacao e Autorizacao
- Token JWT assinado com `SECRET_JWT`; payload: `{ userId, isAdmin }` e expiracao de 2h.
- Middleware `authenticate` valida o token e injeta `req.user`.
- Middleware `authorizeAdmin` bloqueia rotas restritas a administradores.

## Variaveis de Ambiente (`.env`)
```
PORT=3000
SECRET_JWT=sua-chave-secreta
SQLITE_PATH=./src/database/database.sqlite
NODE_ENV=development   # necessario para servir /docs (Swagger) nos scripts dev
```
Adapte `SQLITE_PATH` se quiser guardar o banco em outro local.

## Como Executar
1. `npm install`
2. Ajuste `.env` conforme acima.
3. Dev (habilita Swagger): `npm run dev` e acesse `http://localhost:3000/docs` para a UI.
4. Producao (sem Swagger): `npm start`.
5. API responde em `http://localhost:<PORT>/`.

## Testes Manuais
- Use `testeApi_User.http` (VS Code REST Client/Insomnia/Postman) para exercitar cadastro, login e rotas privadas.
- Gere token via `/user/login` antes de chamar rotas autenticadas.

## Testes Automatizados
- Smoke: `npm run test:smoke` (verifica docs, rota protegida sem token e 404). Log em `logs/test.log`.
- Fluxo completo: `npm run test:integration` (cria admin temporario, colecao, objeto, pessoa e emprestimo; log detalhado por execucao em `logs/integration-*.log`).
- Antes de rodar, deixe a API executando (`npm run dev` ou `npm start`) e ajuste `BASE_URL`/`PORT` se necessario.

## Autoria
Projeto guiado pelo professor Ronaldo Borges (IFPI) e desenvolvido em sala com os alunos de Programacao para Internet II.

