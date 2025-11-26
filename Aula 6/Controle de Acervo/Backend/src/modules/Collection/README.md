# Pasta src/modules/Collection

CRUD de colecoes pertencentes a usuarios (ownerId). Inclui modelo, service, controller e rotas.

## Arquivos
- `collection.model.js`: define tabela Collections.
- `collection.service.js`: operacoes de persistencia.
- `collection.controller.js`: validacao e respostas HTTP.
- `collection.routes.js`: rotas /collections.

```mermaid
flowchart LR
    R[Request /collections] --> Rt[collection.routes]
    Rt --> Ctl[collection.controller]
    Ctl --> Svc[collection.service]
    Svc --> Mdl[collection.model]
    Mdl --> DB[(SQLite)]
```
