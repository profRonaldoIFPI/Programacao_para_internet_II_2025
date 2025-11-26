# Pasta src/modules

Concentra dominios da API com modelo, service, controller e rotas. As associacoes sao registradas em `associations.js`.

## Estrutura
- `user/` autenticacao e perfis.
- `Collection/` colecoes de itens.
- `Object/` itens dentro de colecoes.
- `Person/` pessoas ligadas a emprestimos.
- `Loan/` emprestimos de objetos.
- `CollectionManager/` compartilhamento de colecoes.
- `associations.js` registra os relacionamentos.

```mermaid
erDiagram
    USERS ||--o{ COLLECTIONS : owner
    COLLECTIONS ||--o{ OBJECTS : contem
    PEOPLE ||--o{ LOANS : empresta
    OBJECTS ||--o{ LOANS : empresta
    USERS ||--o{ COLLECTIONMANAGERS : gestiona
    COLLECTIONS ||--o{ COLLECTIONMANAGERS : compartilha
```
