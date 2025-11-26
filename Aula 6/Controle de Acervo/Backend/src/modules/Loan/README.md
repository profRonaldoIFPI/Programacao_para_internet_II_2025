# Pasta src/modules/Loan

CRUD de emprestimos, conectando pessoas e objetos.

## Arquivos
- `loan.model.js`: define tabela Loans.
- `loan.service.js`: operacoes de persistencia.
- `loan.controller.js`: validacao e respostas HTTP.
- `loan.routes.js`: rotas /loans.

```mermaid
flowchart LR
    R[Request /loans] --> Rt[loan.routes]
    Rt --> Ctl[loan.controller]
    Ctl --> Svc[loan.service]
    Svc --> Mdl[loan.model]
    Mdl --> DB[(SQLite)]
    Mdl -. personId .-> PER[Persons]
    Mdl -. objectId .-> OBJ[Objects]
```
