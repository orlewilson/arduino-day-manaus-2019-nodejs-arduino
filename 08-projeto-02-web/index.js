/*
  Oficina Como Criar Coisas Inteligentes com NodeJS e Arduino
  Arduino Day Manaus 2019 - 16/03/2019
  Facilitador:       Orlewilson Bentes Maia
  Data Criacao:      14/03/2019
  Data Atualizacao:  14/03/2019
  Descricao:         Projeto 03 – Mini Estação Meteorológica - NodeJS + Web
*/


// importando bibliotecas

// para transferir dados por meio do protocolo HTTP
var http = require('http');

// para trabalhar com páginas web
var express = require('express');

// para trabalhar com páginas web
var app = express();

// para transferir dados por meio do protocolo HTTP
var server = http.createServer(app);

// para criar conexão socket
var io = require('socket.io')(server);

// para saber ip da máquina
var ip = require("ip");


// usando template Embedded JavaScript
app.set('view engine', 'ejs');

// informa onde estarão os arquivo estáticos do projeto (CSS, imagens, páginas html estáticas)
app.use(express.static(__dirname + '/public'));

// para acesso serial a placa Arduino
var SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline')

// abre a porta de comunicação (não se esquecer de mudar)
var port = new SerialPort('COM16', {
	baudRate: 9600
});

// variáveis

// formatador de conteúdo
const parser = port.pipe(new Readline({delimiter: '\r\n'}))

// servidor escutando na porta 8080
server.listen(8080);

// mensagem no console
console.log("Digite no seu navegador http://"+ ip.address() + ":8080");

// informando a página EJS que será visualizada pelo usuário quando ele digitar
// o endereço web no nsvagador
app.get('/', function (req, res) {
  res.render('projeto-02-web');
});

// quando alguém conectar com o servidor por meio de socket
io.on('connection', function (socket) {
    
  	// lê o conteúdo da porta serial
	parser.on('data', function (data) {
		// enviar resposta da leitura do cartão para a página web
    	socket.emit('respostaTemp', data);
      socket.emit('respostaUmi', data);
      socket.emit('respostaLum', data);
	});
});
