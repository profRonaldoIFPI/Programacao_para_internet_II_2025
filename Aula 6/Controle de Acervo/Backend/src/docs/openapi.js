const port = process.env.PORT || 3000;

const bearerAuth = {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
};

const components = {
  securitySchemes: {
    bearerAuth,
  },
  schemas: {
    Message: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    User: {
      type: "object",
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        email: { type: "string", format: "email" },
        isAdmin: { type: "boolean" },
        isActive: { type: "boolean" },
      },
    },
    UserCreateRequest: {
      type: "object",
      required: ["name", "email", "password"],
      properties: {
        name: { type: "string" },
        email: { type: "string", format: "email" },
        password: { type: "string" },
        isAdmin: { type: "boolean" },
      },
    },
    UserLoginRequest: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: { type: "string", format: "email" },
        password: { type: "string" },
      },
    },
    Collection: {
      type: "object",
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        description: { type: "string" },
        type: { type: "string" },
        value: { type: "number" },
        ownerId: { type: "integer" },
      },
    },
    Object: {
      type: "object",
      properties: {
        id: { type: "integer" },
        description: { type: "string" },
        type: { type: "string" },
        value: { type: "number" },
        collectionId: { type: "integer" },
      },
    },
    Person: {
      type: "object",
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        phone: { type: "string" },
        email: { type: "string", format: "email" },
        cpf: { type: "string" },
      },
    },
    Loan: {
      type: "object",
      properties: {
        id: { type: "integer" },
        loanDate: { type: "string", format: "date" },
        repaymentDate: { type: "string", format: "date" },
        itIsBack: { type: "boolean" },
        status: { type: "string" },
        notes: { type: "string" },
        personId: { type: "integer" },
        objectId: { type: "integer" },
      },
    },
    CollectionManager: {
      type: "object",
      properties: {
        id: { type: "integer" },
        collectionId: { type: "integer" },
        userId: { type: "integer" },
        canManage: { type: "boolean" },
      },
    },
  },
};

const authSecurity = [{ bearerAuth: [] }];

const paths = {
  "/user/cadastro": {
    post: {
      tags: ["Usuarios"],
      summary: "Cria um novo usuario",
      requestBody: {
        required: true,
        content: {
          "application/json": { schema: { $ref: "#/components/schemas/UserCreateRequest" } },
        },
      },
      responses: {
        201: { description: "Criado", content: { "application/json": { schema: { $ref: "#/components/schemas/Message" } } } },
      },
    },
  },
  "/user/login": {
    post: {
      tags: ["Usuarios"],
      summary: "Realiza login e retorna JWT",
      requestBody: {
        required: true,
        content: { "application/json": { schema: { $ref: "#/components/schemas/UserLoginRequest" } } },
      },
      responses: {
        200: { description: "Token retornado", content: { "application/json": { schema: { type: "object", properties: { token: { type: "string" } } } } } },
      },
    },
  },
  "/user/listarUsuarios": {
    get: {
      tags: ["Usuarios"],
      summary: "Lista usuarios (necessita token)",
      security: authSecurity,
      responses: {
        200: { description: "Lista carregada", content: { "application/json": { schema: { type: "object", properties: { users: { type: "array", items: { $ref: "#/components/schemas/User" } } } } } } },
      },
    },
  },
  "/user/atualizarUsuario": {
    post: {
      tags: ["Usuarios"],
      summary: "Atualiza usuario autenticado",
      security: authSecurity,
      requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } } },
      responses: { 200: { description: "Atualizado" } },
    },
  },
  "/user/deletarUsuario": {
    post: {
      tags: ["Usuarios"],
      summary: "Soft delete (admin)",
      security: authSecurity,
      requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } } },
      responses: { 200: { description: "Desativado" }, 403: { description: "Admin requerido" } },
    },
  },
  "/user/promoverUsuario": {
    post: {
      tags: ["Usuarios"],
      summary: "Promove usuario a admin",
      security: authSecurity,
      requestBody: { required: true, content: { "application/json": { schema: { type: "object", properties: { id: { type: "integer" } }, required: ["id"] } } } },
      responses: { 200: { description: "Promovido" } },
    },
  },
  "/collections": {
    get: {
      tags: ["Colecoes"],
      summary: "Lista colecoes",
      security: authSecurity,
      responses: { 200: { description: "OK" } },
    },
    post: {
      tags: ["Colecoes"],
      summary: "Cria colecao (admin)",
      security: authSecurity,
      requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Collection" } } } },
      responses: { 201: { description: "Criada" } },
    },
  },
  "/collections/update": {
    post: {
      tags: ["Colecoes"],
      summary: "Atualiza colecao (admin)",
      security: authSecurity,
      requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Collection" } } } },
      responses: { 200: { description: "Atualizada" } },
    },
  },
  "/collections/delete": {
    post: {
      tags: ["Colecoes"],
      summary: "Remove colecao (admin)",
      security: authSecurity,
      requestBody: { required: true, content: { "application/json": { schema: { type: "object", properties: { id: { type: "integer" } }, required: ["id"] } } } },
      responses: { 200: { description: "Removida" } },
    },
  },
  "/objects": {
    get: {
      tags: ["Objetos"],
      summary: "Lista objetos",
      security: authSecurity,
      responses: { 200: { description: "OK" } },
    },
    post: {
      tags: ["Objetos"],
      summary: "Cria objeto (admin)",
      security: authSecurity,
      requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Object" } } } },
      responses: { 201: { description: "Criado" } },
    },
  },
  "/objects/update": {
    post: {
      tags: ["Objetos"],
      summary: "Atualiza objeto (admin)",
      security: authSecurity,
      requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Object" } } } },
      responses: { 200: { description: "Atualizado" } },
    },
  },
  "/objects/delete": {
    post: {
      tags: ["Objetos"],
      summary: "Remove objeto (admin)",
      security: authSecurity,
      requestBody: { required: true, content: { "application/json": { schema: { type: "object", properties: { id: { type: "integer" } }, required: ["id"] } } } },
      responses: { 200: { description: "Removido" } },
    },
  },
  "/people": {
    get: {
      tags: ["Pessoas"],
      summary: "Lista pessoas",
      security: authSecurity,
      responses: { 200: { description: "OK" } },
    },
    post: {
      tags: ["Pessoas"],
      summary: "Cria pessoa (admin)",
      security: authSecurity,
      requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Person" } } } },
      responses: { 201: { description: "Criada" } },
    },
  },
  "/people/update": {
    post: {
      tags: ["Pessoas"],
      summary: "Atualiza pessoa (admin)",
      security: authSecurity,
      requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Person" } } } },
      responses: { 200: { description: "Atualizada" } },
    },
  },
  "/people/delete": {
    post: {
      tags: ["Pessoas"],
      summary: "Remove pessoa (admin)",
      security: authSecurity,
      requestBody: { required: true, content: { "application/json": { schema: { type: "object", properties: { id: { type: "integer" } }, required: ["id"] } } } },
      responses: { 200: { description: "Removida" } },
    },
  },
  "/loans": {
    get: {
      tags: ["Emprestimos"],
      summary: "Lista emprestimos",
      security: authSecurity,
      responses: { 200: { description: "OK" } },
    },
    post: {
      tags: ["Emprestimos"],
      summary: "Cria emprestimo (admin)",
      security: authSecurity,
      requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Loan" } } } },
      responses: { 201: { description: "Criado" } },
    },
  },
  "/loans/update": {
    post: {
      tags: ["Emprestimos"],
      summary: "Atualiza emprestimo (admin)",
      security: authSecurity,
      requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Loan" } } } },
      responses: { 200: { description: "Atualizado" } },
    },
  },
  "/loans/delete": {
    post: {
      tags: ["Emprestimos"],
      summary: "Remove emprestimo (admin)",
      security: authSecurity,
      requestBody: { required: true, content: { "application/json": { schema: { type: "object", properties: { id: { type: "integer" } }, required: ["id"] } } } },
      responses: { 200: { description: "Removido" } },
    },
  },
  "/collectionManagers": {
    get: {
      tags: ["CollectionManagers"],
      summary: "Lista gestores de colecao (admin)",
      security: authSecurity,
      parameters: [
        { in: "query", name: "collectionId", schema: { type: "integer" }, required: false, description: "Filtra por colecao" },
      ],
      responses: { 200: { description: "OK" } },
    },
    post: {
      tags: ["CollectionManagers"],
      summary: "Adiciona gestor (admin)",
      security: authSecurity,
      requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CollectionManager" } } } },
      responses: { 201: { description: "Criado" } },
    },
  },
  "/collectionManagers/update": {
    post: {
      tags: ["CollectionManagers"],
      summary: "Atualiza gestor (admin)",
      security: authSecurity,
      requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CollectionManager" } } } },
      responses: { 200: { description: "Atualizado" } },
    },
  },
  "/collectionManagers/delete": {
    post: {
      tags: ["CollectionManagers"],
      summary: "Remove gestor (admin)",
      security: authSecurity,
      requestBody: { required: true, content: { "application/json": { schema: { type: "object", properties: { id: { type: "integer" } }, required: ["id"] } } } },
      responses: { 200: { description: "Removido" } },
    },
  },
};

const swaggerSpec = {
  openapi: "3.0.1",
  info: {
    title: "Controle de Acervo API",
    version: "1.0.0",
    description: "Documentacao gerada para desenvolvimento.",
  },
  servers: [{ url: `http://localhost:${port}` }],
  tags: [
    { name: "Usuarios" },
    { name: "Colecoes" },
    { name: "Objetos" },
    { name: "Pessoas" },
    { name: "Emprestimos" },
    { name: "CollectionManagers" },
  ],
  components,
  paths,
};

export default swaggerSpec;
