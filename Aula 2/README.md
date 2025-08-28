# Aula 2: Introdução ao Express.js

## 🎯 Objetivo da Aula

Aprender os fundamentos do framework Express.js, compreendendo como ele simplifica o desenvolvimento de aplicações web em Node.js através de roteamento intuitivo e middleware poderoso.

## 📚 O que é Express.js?

Express.js é um framework web minimalista e flexível para Node.js que fornece um conjunto robusto de recursos para aplicações web e mobile. É conhecido como "framework web rápido, flexível e minimalista".

### Vantagens do Express.js
- ✅ **Simplicidade**: Sintaxe limpa e intuitiva
- ✅ **Flexibilidade**: Não impõe estrutura rígida
- ✅ **Performance**: Leve e rápido
- ✅ **Middleware**: Sistema poderoso de middleware
- ✅ **Comunidade**: Grande ecossistema de plugins

## 🔄 Comparação: HTTP Nativo vs Express

### HTTP Nativo (Aula 1)
```javascript
const http = require('http');
const servidor = http.createServer((req, res) => {
    if (req.url === '/teste') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Olá HTTP!');
    } else if (req.url === '/rota2') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Rota 2!');
    }
});
servidor.listen(8080);
```

### Express.js (Aula 2)
```javascript
const express = require('express');
const app = express();

app.get('/teste', (req, res) => {
    res.send('Olá Express!');
});

app.get('/rota2', (req, res) => {
    res.send('Rota 2!');
});

app.listen(8080);
```

## 📂 Arquivos do Projeto

### `package.json` - Configuração do Projeto
```json
{
  "name": "aula-2",
  "version": "1.0.0",
  "description": "Exemplo Express",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Ronaldo Borges",
  "license": "ISC",
  "dependencies": {
    "express": "^5.1.0"
  }
}
```

### `index.js` - Aplicação Express Principal
```javascript
// Importa o framework Express
const express = require('express');

// Cria uma instância da aplicação Express
const app = express();

// Define rota GET para '/teste'
app.get('/teste', (req, res) => {
    res.send("Olá Express!");  // Resposta simples
});

// Define rota GET para '/rota2'
app.get('/rota2', (req, res) => {
    res.send("Rota 2!");       // Outra resposta
});

// Inicia o servidor na porta 8080
app.listen(8080, (erro) => {
    if (erro) {
        console.log("Erro ao iniciar o servidor:", erro);
    } else {
        console.log("Servidor rodando na porta 8080");
    }
});
```

## 🔧 Como Executar

### Pré-requisitos
- Node.js instalado (versão 14 ou superior)
- npm (gerenciador de pacotes)

### Passos para Execução

1. **Navegue até a pasta da Aula 2:**
   ```bash
   cd "Aula 2"
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```
   > Isso instalará o Express.js conforme especificado no package.json

3. **Execute o servidor:**
   ```bash
   node index.js
   ```

4. **Teste as rotas no navegador:**
   - `http://localhost:8080/teste` → "Olá Express!"
   - `http://localhost:8080/rota2` → "Rota 2!"

## 🧪 Testando a Aplicação

### Rotas Disponíveis

| Método | Rota | Resposta |
|--------|------|----------|
| GET | `/teste` | "Olá Express!" |
| GET | `/rota2` | "Rota 2!" |

### Usando cURL
```bash
# Testa rota /teste
curl http://localhost:8080/teste

# Testa rota /rota2
curl http://localhost:8080/rota2
```

## 🔍 Análise do Código Express

### Importação e Instanciação
```javascript
const express = require('express');  // Importa o Express
const app = express();               // Cria instância da aplicação
```

### Definição de Rotas
```javascript
app.get('/caminho', (req, res) => {
    // Lógica da rota
});
```
- **`app.get()`**: Define rota para método HTTP GET
- **`'/caminho'`**: URL da rota
- **`(req, res)`**: Callback com objetos de requisição e resposta

### Método `res.send()`
```javascript
res.send("Mensagem");
```
- Envia resposta automaticamente
- Define Content-Type baseado no tipo de dados
- Mais simples que `res.writeHead()` + `res.end()`

### Inicialização do Servidor
```javascript
app.listen(porta, callback);
```
- Similar ao HTTP nativo, mas mais conciso
- Callback opcional para confirmação de inicialização

## 🌐 Métodos HTTP no Express

### Métodos Principais
```javascript
app.get('/rota', handler);     // Buscar dados
app.post('/rota', handler);    // Criar dados
app.put('/rota', handler);     // Atualizar dados
app.delete('/rota', handler);  // Deletar dados
app.all('/rota', handler);     // Todos os métodos
```

### Exemplo com Múltiplos Métodos
```javascript
// GET - Buscar usuário
app.get('/usuario', (req, res) => {
    res.send('Dados do usuário');
});

// POST - Criar usuário
app.post('/usuario', (req, res) => {
    res.send('Usuário criado');
});
```

## 📊 Tipos de Resposta

### Texto Simples
```javascript
res.send('Texto simples');
```

### HTML
```javascript
res.send('<h1>Título HTML</h1>');
```

### JSON
```javascript
res.json({ mensagem: 'Dados em JSON', status: 'ok' });
```

### Status Code Personalizado
```javascript
res.status(404).send('Não encontrado');
res.status(201).json({ criado: true });
```

## 🎓 Exercícios Práticos

### Exercício 1: Nova Rota
Adicione uma rota `/sobre` que retorne informações sobre você:
```javascript
app.get('/sobre', (req, res) => {
    res.send('Meu nome é [Seu Nome] e estou aprendendo Express!');
});
```

### Exercício 2: Rota com JSON
Crie uma rota `/api/dados` que retorne dados em JSON:
```javascript
app.get('/api/dados', (req, res) => {
    const dados = {
        nome: 'API Express',
        versao: '1.0.0',
        timestamp: new Date()
    };
    res.json(dados);
});
```

### Exercício 3: Rota de Erro
Implemente uma rota que simule um erro:
```javascript
app.get('/erro', (req, res) => {
    res.status(500).send('Erro interno do servidor');
});
```

### Exercício 4: Rota Raiz
Adicione uma rota para a página inicial (`/`):
```javascript
app.get('/', (req, res) => {
    res.send('<h1>Bem-vindo ao Express!</h1><p>Servidor funcionando!</p>');
});
```

## 🔧 Comandos npm Úteis

```bash
# Instalar dependências
npm install

# Instalar Express especificamente
npm install express

# Verificar dependências instaladas
npm list

# Atualizar dependências
npm update
```

## 🚀 Próximos Passos

Na **Aula 3**, você aprenderá:
- Parâmetros de rota dinâmicos (`:parametro`)
- Query strings (`?campo=valor`)
- Captura e manipulação de dados da URL
- Roteamento mais avançado

## 📚 Recursos Adicionais

- [Documentação oficial do Express.js](https://expressjs.com/)
- [Guia de Roteamento Express](https://expressjs.com/en/guide/routing.html)
- [Express.js no npm](https://www.npmjs.com/package/express)
- [Tutorial Express - Mozilla](https://developer.mozilla.org/docs/Learn/Server-side/Express_Nodejs)

## 🔍 Conceitos-Chave Aprendidos

- ✅ **Framework Express.js**: Simplificação do desenvolvimento web
- ✅ **Roteamento**: Definição de endpoints com `app.get()`
- ✅ **Middleware**: Conceito introdutório (será aprofundado)
- ✅ **Gerenciamento de Dependências**: Uso do npm e package.json
- ✅ **Métodos de Resposta**: `res.send()`, `res.json()`, `res.status()`

---

*Express.js torna o desenvolvimento web em Node.js muito mais produtivo e organizado. Pratique criando suas próprias rotas!*