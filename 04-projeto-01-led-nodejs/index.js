/*
  Oficina Como Criar Coisas Inteligentes com NodeJS e Arduino
  Arduino Day Manaus 2019 - 16/03/2019
  Facilitador:       Orlewilson Bentes Maia
  Data Criacao:      14/03/2019
  Data Atualizacao:  14/03/2019
  Descricao:         Projeto 01 - Ligar/desligar LED com NodeJS
*/

// biblioteca para comunicar com o Arduino
var five = require("johnny-five");  

// informando a porta de comunicação (não se esquecer de mudar porta)
//var board = new five.Board({port: "COM14"}); // porta definida
var board = new five.Board(); // tenta detectar automaticamente

// quando a placa estiver pronta, execute.
board.on("ready", function() {  
   // placa pronta
   console.log("Placa Arduino pronta!");  
   
   // informando que utilizará Led e qual porta
   var led = new five.Led(13); 
    
   // liga/desliga a cada 1s
   led.blink(1000);  
});