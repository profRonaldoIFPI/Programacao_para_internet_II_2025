# API REST com Autenticação

Material didático construído em aula junto aos alunos para demonstrar, passo a passo, a criação de uma API REST com autenticação utilizando Node.js, Express e MongoDB.

## Tecnologias utilizadas
- **Node.js** para execução do JavaScript no backend.
- **Express.js** como framework de rotas e middlewares.
- **MongoDB** como banco de dados não relacional.
- **Mongoose** como ODM para modelar e validar documentos.
- **bcrypt** para hash de senhas.
- **jsonwebtoken (JWT)** para emissão e validação de tokens.
- **dotenv** para carregamento das variáveis de ambiente.

## Estrutura do projeto
```
├── controllers/
│   └── userController.js      # Regras de negócio e acesso ao modelo
├── middleware/
│   └── authenticate.js        # Validação do token JWT nas rotas privadas
├── model/
│   └── User.js                # Schema Mongoose para usuários
├── routes/
│   ├── public.js              # Rotas abertas: cadastro e login
│   └── private.js             # Rotas protegidas por autenticação
├── db.js                      # Conexão com o MongoDB
├── index.js                   # Ponto de entrada da aplicação Express
├── testeApi.http              # Coleção de requisições para testar os endpoints da API
└── .env                       # Variáveis de ambiente (não versionado)
```

## Modelagem de usuário
O schema `User` inclui os seguintes campos:
- `name` (String, obrigatório): nome completo do usuário.
- `email` (String, obrigatório e único): usado como credencial de login.
- `password` (String, obrigatório): armazenada com hash gerado pelo `bcrypt`.
- `isAdmin` (Boolean, padrão `false`): indica privilégios administrativos.
- `isActive` (Boolean, padrão `true`): usado para "soft delete", preservando o histórico.

## Fluxo de autenticação
1. **Cadastro (`POST /cadastro`)**: cria um usuário com senha criptografada.
2. **Login (`POST /login`)**: valida credenciais, gera token JWT com `userId` e `isAdmin`.
3. **Rotas privadas**: exigem header `Authorization: Bearer <token>`. O middleware `authenticate` valida o token e libera acesso.

## Endpoints disponíveis
### Rotas públicas (`routes/public.js`)
- `POST /cadastro`: recebe `name`, `email`, `password` e opcionalmente `isAdmin`. Retorna mensagem de criação.
- `POST /login`: recebe `email` e `password`. Retorna token JWT com validade de 2 horas.

### Rotas privadas (`routes/private.js`)
- `GET /listarUsuarios`: devolve a lista de usuários (sem o campo `password`).
- `POST /atualizarUsuario`: atualiza dados pelo `_id`. Pode ser usado para promover usuários ou reativá-los.
- `POST /deletarUsuario`: faz soft delete (`isActive = false`) preservando o registro no banco.

> Dica para as aulas: existe um TODO no controller incentivando os alunos a implementar uma busca de usuário por e-mail ou ID.

## Variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto com, no mínimo, as seguintes chaves:
```env
PORT=3000
MONGODB_URI="mongodb+srv://<usuario>:<senha>@<cluster>/<nome_do_banco>?retryWrites=true&w=majority"
SECRET_JWT="chave-secreta-para-assinar-o-token"
```
> Nunca compartilhe valores reais de acesso ao banco ou segredos de produção em repositórios públicos.

## Como executar
1. Instale as dependências: `npm install`
2. Configure o `.env`
3. Inicialize o servidor: `npm run dev`
4. A API ficará disponível em `http://localhost:3000/`

## Testes em aula
O arquivo `testeApi.http` contém exemplos de requisições (cadastro, login, rotas com token). Utilize a extensão **REST Client** no VS Code ou ferramentas como **Insomnia** e **Postman** para praticar.

## Autor
Projeto guiado pelo professor **Ronaldo Borges (IFPI)** e desenvolvido colaborativamente com os alunos durante as aulas de Programação para Internet II.