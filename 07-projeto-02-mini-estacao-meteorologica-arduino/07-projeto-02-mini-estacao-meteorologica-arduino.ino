/*
  Oficina Como Criar Coisas Inteligentes com NodeJS e Arduino
  Arduino Day Manaus 2019 - 16/03/2019
  Facilitador:       Orlewilson Bentes Maia
  Data Criacao:      14/03/2019
  Data Atualizacao:  17/03/2019
  Descricao:         Projeto 02 – Mini Estação Meteorológica - Arduino
*/

// Inclui a biblioteca DHT
#include "DHT.h" 

// Porta na qual lerá os valores do sensor DHT
const int dthPorta = A0;

// Cria um objeto da classe dht
DHT dht(dthPorta, DHT11); 

// variáveis que armazenarão os valores lidos do sensor DHT
float valorTemp;
float valorUmidade;

// Porta analogica no qual sera lido o valor do sensor de luminosidade
const int luminosidade = A1;

// Variavel para armazenar o valor lido do sensor de luminosidade
int valorLuminosidade = 0;

// Função para atrasar em n segundos
void atraso (int n){

   // Funcao do Arduino para parar durante um certo tempo em milisegundos (ms)
  delay(1000 * n); // atraso em n segundos
  
}

// Função para mostrar valores lidos dos sensores na porta serial
void mostrarValores(float temperatura, float umidade, int luminosidade){  
  Serial.println("{\"Temperatura\": \"" + String(temperatura) + "\", \"Umidade\": \"" + String(umidade) + "\", \"Luminosidade\": \"" + String(luminosidade) + "\"}");
}

void setup(){

  // inicia a porta serial
  Serial.begin(9600);
}
 
void loop(){

  // ler o valor atual do sensor de luminosidade
  // quanto mais próximo de zero está mais escuro e quanto mais afastado de zero está mais claro
  // esse valor varia conforme o resistor
  valorLuminosidade = analogRead(luminosidade);
  
  // ler os valores dos sensores
  valorUmidade = dht.readHumidity();
  valorTemp = dht.readTemperature();

  // envia valores para a porta serial
  mostrarValores(valorTemp, valorUmidade, valorLuminosidade);

  atraso(1);
}
