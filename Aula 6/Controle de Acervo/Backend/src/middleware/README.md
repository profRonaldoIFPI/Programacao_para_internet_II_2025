# Pasta src/middleware

Middleware de autenticacao/autorizacao JWT aplicado nas rotas privadas e administrativas.

## Arquivos
- `authenticate.js`: valida token Bearer, popula `req.user` e aplica `authorizeAdmin` para rotas de admin.

```mermaid
flowchart LR
    R[Requisicao] --> M{Header Authorization?}
    M -->|Bearer valido| V[authenticate -> req.user]
    M -->|ausente/invalido| X[res 400]
    V --> A{Rota admin?}
    A -->|sim| ADM[authorizeAdmin -> isAdmin?]
    ADM -->|nao| F[res 403]
    ADM -->|sim| NEXT[segue controller]
    A -->|nao| NEXT
```
