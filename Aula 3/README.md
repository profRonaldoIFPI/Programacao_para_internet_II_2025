# Aula 3: Parâmetros de Rota e Query Strings

## 🎯 Objetivo da Aula

Aprender a criar rotas dinâmicas no Express.js utilizando parâmetros de rota e query strings, permitindo que as aplicações web recebam e processem dados enviados pelos usuários através da URL.

## 📚 Conceitos Fundamentais

### Tipos de Dados na URL

1. **Parâmetros de Rota** (Route Parameters)
   - Parte obrigatória da URL
   - Definidos com `:nome`
   - Exemplo: `/usuario/:id` → `/usuario/123`

2. **Query Strings** (Query Parameters)
   - Parte opcional da URL
   - Definidos após `?`
   - Exemplo: `/busca?termo=express&categoria=web`

### Anatomia de uma URL
```
http://localhost:8080/IFPI/programacao?nivel=avancado&ano=2025
│                    │ │    │          │                   │
│                    │ │    │          └─ Query String     │
│                    │ │    └─ Parâmetro de Rota          │
│                    │ └─ Rota Base                       │
└─ Protocolo + Host + Porta                               │
```

## 📂 Análise do Código

### `index.js` - Aplicação com Parâmetros
```javascript
const express = require("express");
const app = express();

// Rota raiz com query string opcional
app.get("/", (req, res) => {
    // Captura query parameter 'campo'
    var busca = req.query["campo"];  // ?campo=valor
    console.log("rota raiz requisitada");
    var saida = "Query: " + busca;
    res.send(saida);
});

// Rota com parâmetro obrigatório
app.get("/IFPI/:conteudo", (req, res) => {
    // Captura parâmetro de rota 'conteudo'
    var conteudo = req.params.conteudo;  // /IFPI/teste
    var saida = "Parametro: " + conteudo;
    res.send(saida);
});

// Rota específica (deve vir ANTES da genérica)
app.get("/IFPI/Floriano", (req, res) => {
    res.send("IFPI Campus Floriano");
});

// Rota sem parâmetro
app.get('/IFPI', (req, res) => {
    res.send("Você não passou nenhum termo de busca");
});

// Inicialização do servidor
app.listen(8080, (err) => {
    console.log("Servidor online!");
});
```

## 🔧 Como Executar

### Passos para Execução

1. **Navegue até a pasta da Aula 3:**
   ```bash
   cd "Aula 3"
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Execute o servidor:**
   ```bash
   node index.js
   ```

4. **Teste as rotas:**
   - Query String: `http://localhost:8080/?campo=teste`
   - Parâmetro: `http://localhost:8080/IFPI/programacao`
   - Rota específica: `http://localhost:8080/IFPI/Floriano`

## 🧪 Testando as Rotas

### Rotas com Query Strings

| URL | Resultado |
|-----|----------|
| `http://localhost:8080/` | "Query: undefined" |
| `http://localhost:8080/?campo=express` | "Query: express" |
| `http://localhost:8080/?campo=nodejs&outro=valor` | "Query: nodejs" |

### Rotas com Parâmetros

| URL | Resultado |
|-----|----------|
| `http://localhost:8080/IFPI` | "Você não passou nenhum termo de busca" |
| `http://localhost:8080/IFPI/programacao` | "Parametro: programacao" |
| `http://localhost:8080/IFPI/Floriano` | "IFPI Campus Floriano" |
| `http://localhost:8080/IFPI/web` | "Parametro: web" |

## 🔍 Análise Detalhada

### 1. Query Strings (`req.query`)

```javascript
app.get("/", (req, res) => {
    var busca = req.query["campo"];  // Acessa query parameter
    var saida = "Query: " + busca;
    res.send(saida);
});
```

**Exemplos de uso:**
- `/?campo=express` → `req.query.campo` = "express"
- `/?nome=João&idade=25` → `req.query.nome` = "João", `req.query.idade` = "25"
- `/` (sem query) → `req.query.campo` = `undefined`

### 2. Parâmetros de Rota (`req.params`)

```javascript
app.get("/IFPI/:conteudo", (req, res) => {
    var conteudo = req.params.conteudo;  // Acessa parâmetro de rota
    var saida = "Parametro: " + conteudo;
    res.send(saida);
});
```

**Exemplos de uso:**
- `/IFPI/programacao` → `req.params.conteudo` = "programacao"
- `/IFPI/123` → `req.params.conteudo` = "123"
- `/IFPI/web-development` → `req.params.conteudo` = "web-development"

### 3. Ordem das Rotas (IMPORTANTE!)

```javascript
// ❌ ERRADO - Rota específica depois da genérica
app.get("/IFPI/:conteudo", handler);  // Captura TUDO
app.get("/IFPI/Floriano", handler);   // NUNCA será executada!

// ✅ CORRETO - Rota específica antes da genérica
app.get("/IFPI/Floriano", handler);   // Executada primeiro
app.get("/IFPI/:conteudo", handler);  // Captura o resto
```

## 🌐 Exemplos Avançados

### Múltiplos Parâmetros
```javascript
app.get('/usuario/:id/post/:postId', (req, res) => {
    const userId = req.params.id;
    const postId = req.params.postId;
    res.send(`Usuário ${userId}, Post ${postId}`);
});
// URL: /usuario/123/post/456
```

### Query Strings Múltiplas
```javascript
app.get('/busca', (req, res) => {
    const termo = req.query.termo;
    const categoria = req.query.categoria;
    const pagina = req.query.pagina || 1;  // Valor padrão
    
    res.json({
        termo: termo,
        categoria: categoria,
        pagina: pagina
    });
});
// URL: /busca?termo=express&categoria=web&pagina=2
```

### Validação de Parâmetros
```javascript
app.get('/produto/:id', (req, res) => {
    const id = req.params.id;
    
    // Verifica se é um número
    if (isNaN(id)) {
        return res.status(400).send('ID deve ser um número');
    }
    
    res.send(`Produto ID: ${id}`);
});
```

## 🎓 Exercícios Práticos

### Exercício 1: Calculadora Simples
Crie rotas para operações matemáticas:
```javascript
app.get('/calc/:operacao/:num1/:num2', (req, res) => {
    const { operacao, num1, num2 } = req.params;
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    
    let resultado;
    switch(operacao) {
        case 'soma':
            resultado = a + b;
            break;
        case 'subtracao':
            resultado = a - b;
            break;
        // Adicione mais operações...
    }
    
    res.send(`Resultado: ${resultado}`);
});
// Teste: /calc/soma/10/5
```

### Exercício 2: Sistema de Busca
Implemente um sistema de busca com filtros:
```javascript
app.get('/produtos', (req, res) => {
    const categoria = req.query.categoria;
    const preco_min = req.query.preco_min;
    const preco_max = req.query.preco_max;
    const ordenar = req.query.ordenar || 'nome';
    
    res.json({
        filtros: {
            categoria: categoria,
            preco_min: preco_min,
            preco_max: preco_max,
            ordenar: ordenar
        },
        mensagem: 'Busca realizada com sucesso'
    });
});
// Teste: /produtos?categoria=eletronicos&preco_min=100&preco_max=500
```

### Exercício 3: Perfil de Usuário
Crie rotas para perfis de usuário:
```javascript
app.get('/perfil/:username', (req, res) => {
    const username = req.params.username;
    const aba = req.query.aba || 'geral';
    
    res.send(`Perfil de ${username} - Aba: ${aba}`);
});
// Teste: /perfil/joao?aba=configuracoes
```

## 🔧 Dicas e Boas Práticas

### 1. Validação de Dados
```javascript
app.get('/usuario/:id', (req, res) => {
    const id = req.params.id;
    
    // Validação básica
    if (!id || id.length < 1) {
        return res.status(400).send('ID inválido');
    }
    
    res.send(`Usuário: ${id}`);
});
```

### 2. Valores Padrão
```javascript
app.get('/lista', (req, res) => {
    const pagina = req.query.pagina || 1;
    const limite = req.query.limite || 10;
    
    res.json({ pagina, limite });
});
```

### 3. Sanitização
```javascript
app.get('/busca', (req, res) => {
    let termo = req.query.termo;
    
    // Remove caracteres especiais
    if (termo) {
        termo = termo.replace(/[^a-zA-Z0-9\s]/g, '');
    }
    
    res.send(`Termo sanitizado: ${termo}`);
});
```

## 📊 Comparação: Parâmetros vs Query Strings

| Aspecto | Parâmetros de Rota | Query Strings |
|---------|-------------------|---------------|
| **Obrigatório** | ✅ Sim | ❌ Não |
| **Posição** | Parte da rota | Após `?` |
| **Uso típico** | IDs, recursos específicos | Filtros, opções |
| **SEO** | Melhor para URLs semânticas | Melhor para filtros |
| **Exemplo** | `/produto/123` | `/produtos?categoria=tech` |

## 🚀 Próximos Passos

Na **Aula 4**, você aprenderá:
- Express Router para modularização
- Template engine EJS
- Renderização de páginas dinâmicas
- Separação de responsabilidades (MVC)

## 📚 Recursos Adicionais

- [Express Routing Guide](https://expressjs.com/en/guide/routing.html)
- [URL Parameters vs Query Strings](https://blog.hubspot.com/website/what-is-a-query-string)
- [Express Request Object](https://expressjs.com/en/4x/api.html#req)
- [HTTP URL Structure](https://developer.mozilla.org/docs/Learn/Common_questions/What_is_a_URL)

## 🔍 Conceitos-Chave Aprendidos

- ✅ **Parâmetros de Rota**: Captura de dados obrigatórios da URL
- ✅ **Query Strings**: Captura de dados opcionais da URL
- ✅ **req.params**: Objeto com parâmetros de rota
- ✅ **req.query**: Objeto com query parameters
- ✅ **Ordem das Rotas**: Importância da sequência de definição
- ✅ **Validação**: Verificação de dados recebidos

---

*Parâmetros e query strings são fundamentais para criar aplicações web interativas. Pratique com diferentes combinações para dominar esses conceitos!*