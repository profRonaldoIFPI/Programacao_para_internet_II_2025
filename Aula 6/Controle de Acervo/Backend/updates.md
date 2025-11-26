# Updates

- Corrige formato do registro de alteracoes.
- Implementa modelos, services, controllers e rotas completos para collections, objects, people, loans e collection managers conforme README.
- Cria configuracao central de associacoes Sequelize em src/modules/associations.js e sincroniza o schema no startup.
- Ajusta src/index.js para registrar novas rotas, conectar ao banco e iniciar servidor apos sync.
- Corrige fluxo de autenticacao/gestao de usuarios (comparacao de senha, token com id correto, uso de authorizeAdmin e retornos padronizados).
- Atualiza README.md para refletir a estrutura atual, endpoints e configuracoes.
- Adiciona READMEs por pasta com diagramas mermaid explicando estrutura e fluxo de cada modulo.
- Adiciona Swagger UI em /docs somente em NODE_ENV=development com especificacao OpenAPI em src/docs/openapi.js.
- Executa npm install para incluir dependencias de Swagger (swagger-ui-express, swagger-jsdoc) no lockfile.
- Ajusta .env removendo espacos e definindo NODE_ENV=development para habilitar Swagger em /docs.
- Ajusta scripts npm com cross-env para definir NODE_ENV em dev/start e instala dependencia cross-env.
- Atualiza README.md (raiz e src/) com instrucoes de Swagger em dev, novos scripts e variavel NODE_ENV.
- Cria scripts de smoke test (scripts/smoke.js) com logs em logs/test.log e adiciona npm scripts test:smoke/test.
- Adiciona script de teste de integracao com logs detalhados (scripts/integration.js) e npm run test:integration.
