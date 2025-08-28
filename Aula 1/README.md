# Aula 1: Servidor HTTP Básico com Node.js

## 🎯 Objetivo da Aula

Aprender os fundamentos de criação de servidores HTTP utilizando o módulo nativo `http` do Node.js, compreendendo como funciona a comunicação cliente-servidor na web.

## 📚 Conceitos Fundamentais

### Módulo HTTP Nativo
O Node.js possui um módulo `http` integrado que permite criar servidores web sem dependências externas. Este módulo oferece:
- Criação de servidores HTTP
- Manipulação de requisições (requests)
- Configuração de respostas (responses)
- Controle de headers HTTP

### Arquitetura Cliente-Servidor
```
Cliente (Navegador)  ←→  Servidor HTTP (Node.js)
     ↓                        ↓
  Requisição              Resposta
  (Request)              (Response)
```

## 📂 Arquivos do Projeto

### `index.js` - Servidor HTTP Principal
```javascript
// Importa o módulo HTTP nativo do Node.js
const http = require('http');

// Cria o servidor HTTP com função callback
const servidor = http.createServer(
    (requisicao, resposta) => {
        // Define o status code (200 = OK) e o tipo de conteúdo
        resposta.writeHead(200, {'Content-Type': 'text/plain'});
        
        // Envia a resposta e encerra a conexão
        resposta.end('Isso é uma resposta do servidor HTTP');
    }
);

// Inicia o servidor na porta 8080
servidor.listen(8080, (erro) => {
    if(erro) {
        return console.log('Erro ao iniciar o servidor:', erro);
    } else {
        console.log('Servidor rodando na porta 8080');
    }
});
```

### `teste.js` - Exemplo Básico
```javascript
// Exemplo simples de saída no console
console.log("Hello, World!");
```

## 🔧 Como Executar

### Pré-requisitos
- Node.js instalado (versão 14 ou superior)
- Terminal/Prompt de comando

### Passos para Execução

1. **Navegue até a pasta da Aula 1:**
   ```bash
   cd "Aula 1"
   ```

2. **Execute o servidor HTTP:**
   ```bash
   node index.js
   ```

3. **Teste o exemplo básico:**
   ```bash
   node teste.js
   ```

4. **Acesse no navegador:**
   - Abra: `http://localhost:8080`
   - Você verá: "Isso é uma resposta do servidor HTTP"

## 🧪 Testando o Servidor

### Usando o Navegador
- Acesse `http://localhost:8080`
- O servidor responderá com texto simples

### Usando cURL (linha de comando)
```bash
curl http://localhost:8080
```

### Usando Postman ou Insomnia
- Método: GET
- URL: `http://localhost:8080`
- Resposta esperada: texto simples

## 🔍 Análise do Código

### Função `createServer()`
```javascript
http.createServer((requisicao, resposta) => {
    // Lógica do servidor
});
```
- **`requisicao`**: Objeto com dados da requisição HTTP
- **`resposta`**: Objeto para enviar resposta ao cliente

### Método `writeHead()`
```javascript
resposta.writeHead(200, {'Content-Type': 'text/plain'});
```
- **`200`**: Status code HTTP (sucesso)
- **`Content-Type`**: Tipo de conteúdo da resposta

### Método `end()`
```javascript
resposta.end('Mensagem de resposta');
```
- Envia a resposta final e encerra a conexão

### Método `listen()`
```javascript
servidor.listen(8080, callback);
```
- **`8080`**: Porta onde o servidor ficará escutando
- **`callback`**: Função executada quando o servidor inicia

## 📊 Status Codes HTTP Importantes

| Código | Significado | Uso |
|--------|-------------|-----|
| 200 | OK | Requisição bem-sucedida |
| 404 | Not Found | Recurso não encontrado |
| 500 | Internal Server Error | Erro interno do servidor |

## 🎓 Exercícios Práticos

### Exercício 1: Resposta HTML
Modifique o servidor para retornar HTML em vez de texto simples:
```javascript
resposta.writeHead(200, {'Content-Type': 'text/html'});
resposta.end('<h1>Meu Primeiro Servidor!</h1>');
```

### Exercício 2: Múltiplas Rotas
Crie diferentes respostas baseadas na URL:
```javascript
const url = requisicao.url;
if (url === '/') {
    resposta.end('Página inicial');
} else if (url === '/sobre') {
    resposta.end('Página sobre');
} else {
    resposta.writeHead(404);
    resposta.end('Página não encontrada');
}
```

### Exercício 3: Servidor com JSON
Retorne dados em formato JSON:
```javascript
resposta.writeHead(200, {'Content-Type': 'application/json'});
const dados = { mensagem: 'Olá do servidor!', timestamp: new Date() };
resposta.end(JSON.stringify(dados));
```

## 🚀 Próximos Passos

Na **Aula 2**, você aprenderá:
- Framework Express.js
- Roteamento simplificado
- Middleware
- Desenvolvimento mais eficiente

## 📚 Recursos Adicionais

- [Documentação oficial do módulo HTTP](https://nodejs.org/api/http.html)
- [Guia de Status Codes HTTP](https://developer.mozilla.org/docs/Web/HTTP/Status)
- [Tutorial Node.js - HTTP](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/)

---

*Este é o primeiro passo na jornada de desenvolvimento web com Node.js. Pratique os exercícios para consolidar o aprendizado!*