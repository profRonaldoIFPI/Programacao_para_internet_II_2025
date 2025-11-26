# Pasta src/modules/CollectionManager

Controle de compartilhamento de colecoes entre usuarios.

## Arquivos
- `collectionManager.model.js`: define tabela CollectionManagers.
- `collectionManager.service.js`: operacoes de persistencia.
- `collectionManager.controller.js`: validacao e respostas HTTP.
- `collectionManager.routes.js`: rotas /collectionManagers.

```mermaid
flowchart LR
    R[Request /collectionManagers] --> Rt[collectionManager.routes]
    Rt --> Ctl[collectionManager.controller]
    Ctl --> Svc[collectionManager.service]
    Svc --> Mdl[collectionManager.model]
    Mdl --> DB[(SQLite)]
    Mdl -. FK .-> COL[Collections]
    Mdl -. FK .-> USR[Users]
```
