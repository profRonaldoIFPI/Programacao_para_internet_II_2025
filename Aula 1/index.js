const http = require('http');''
const servidor = http.createServer(
    (requisicao,resposta)=> {
        resposta.writeHead(200, {'Content-Type': 'text/plain    '});
        resposta.end('Isso é uma resposta do servidor HTTP');
    }
);
servidor.listen(8080,(erro)=>{
    if(erro) {
        return console.log('Erro ao iniciar o servidor:', erro);
    }else{
        console.log('Servidor rodando na porta 8080');
    }
})
