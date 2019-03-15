/*
  Oficina Como Criar Coisas Inteligentes com NodeJS e Arduino
  Arduino Day Manaus 2019 - 16/03/2019
  Facilitador:       Orlewilson Bentes Maia
  Data Criacao:      14/03/2019
  Data Atualizacao:  14/03/2019
  Descricao:         Projeto 01 - Ligar/desligar LED com NodeJS + Página Web
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

// para comunicar com o Arduino
var five = require("johnny-five");  

// para saber ip da máquina
var ip = require("ip");

// informando a porta de comunicação
var board = new five.Board();
 
// usando template Embedded JavaScript
app.set('view engine', 'ejs');

// informa onde estarão os arquivo estáticos do projeto (CSS, imagens, páginas html estáticas)
app.use(express.static(__dirname + '/public'));

// quando a placa estiver pronta, execute.
board.on("ready", function() {  
   
  // servidor escutando na porta 8080
  server.listen(8080);

  // mensagem no console
  console.log("Digite no seu navegador http://"+ ip.address() + ":8080");

  // informando que utilizará Led e qual porta
  var led = new five.Led(13);  

  // informando a página EJS que será visualizada pelo usuário quando ele digitar
  // o endereço web no nsvagador
  app.get('/', function (req, res) {
    res.render('projeto-01-led-nodejs-web');
  });

  // quando alguém conectar com o servidor por meio de socket
  io.on('connection', function (socket) {
    
    // quando for solicitado para ligar o LED
    socket.on('ligar', function (data) {
      // ligar LED
      led.on();

      // enviar resposta ao solicitante que o LED foi ligado
      socket.emit('respostaLed', 'ligado');
    });

    // quando for solicitado para desligar o LED
    socket.on('desligar', function (data) {
      // desligar LED
      led.off();

      // enviar resposta ao solicitante que o LED foi desligado
      socket.emit('respostaLed', 'desligado');
    });
  });
}); 