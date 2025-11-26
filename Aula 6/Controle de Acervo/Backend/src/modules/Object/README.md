# Pasta src/modules/Object

CRUD de objetos vinculados a uma colecao (collectionId).

## Arquivos
- `object.model.js`: define tabela Objects.
- `object.service.js`: operacoes de persistencia.
- `object.controller.js`: validacao e respostas HTTP.
- `object.routes.js`: rotas /objects.

```mermaid
flowchart LR
    R[Request /objects] --> Rt[object.routes]
    Rt --> Ctl[object.controller]
    Ctl --> Svc[object.service]
    Svc --> Mdl[object.model]
    Mdl --> DB[(SQLite)]
    Mdl -. FK .-> COL[Collections]
```
