// Area Chart Example
var ctxTemp = document.getElementById("myAreaChartTemp");
var ctxUmi = document.getElementById("myAreaChartUmi");
var ctxLumi = document.getElementById("myAreaChartLumi");

var labelsTempDB = [];
var dataTempDB = [];

var labelsUmiDB = [];
var dataUmiDB = [];

var labelsLumiDB = [];
var dataLumiDB = [];

function updateTempChart() {
  var myTempLineChart = new Chart(ctxTemp, {
    type: 'line',
    data: {
      labels: labelsTempDB,
      datasets: [{
        label: "Temp: ",
        lineTension: 0.3,
        backgroundColor: "rgba(2,117,216,0.2)",
        borderColor: "rgba(2,117,216,1)",
        pointRadius: 5,
        pointBackgroundColor: "rgba(2,117,216,1)",
        pointBorderColor: "rgba(255,255,255,0.8)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(2,117,216,1)",
        pointHitRadius: 50,
        pointBorderWidth: 2,
        data: dataTempDB,
      }],
    },
    options: {
      scales: {
        xAxes: [{
          time: {
            unit: 'date'
          },
          gridLines: {
            display: false
          },
          ticks: {
            maxTicksLimit: 1000
          }
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: 100,
            maxTicksLimit: 5
          },
          gridLines: {
            color: "rgba(0, 0, 0, .125)",
          }
        }],
      },
      legend: {
        display: false
      }
    }
  });
}

function updateUmiChart() {
  var myUmiLineChart = new Chart(ctxUmi, {
    type: 'line',
    data: {
      labels: labelsUmiDB,
      datasets: [{
        label: "Umi: ",
        lineTension: 0.3,
        backgroundColor: "rgba(2,117,216,0.2)",
        borderColor: "rgba(2,117,216,1)",
        pointRadius: 5,
        pointBackgroundColor: "rgba(2,117,216,1)",
        pointBorderColor: "rgba(255,255,255,0.8)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(2,117,216,1)",
        pointHitRadius: 50,
        pointBorderWidth: 2,
        data: dataUmiDB,
      }],
    },
    options: {
      scales: {
        xAxes: [{
          time: {
            unit: 'date'
          },
          gridLines: {
            display: false
          },
          ticks: {
            maxTicksLimit: 1000
          }
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: 100,
            maxTicksLimit: 5
          },
          gridLines: {
            color: "rgba(0, 0, 0, .125)",
          }
        }],
      },
      legend: {
        display: false
      }
    }
  });
}

function updateLumiChart() {
  var myLumiLineChart = new Chart(ctxLumi, {
    type: 'line',
    data: {
      labels: labelsLumiDB,
      datasets: [{
        label: "Lumi: ",
        lineTension: 0.3,
        backgroundColor: "rgba(2,117,216,0.2)",
        borderColor: "rgba(2,117,216,1)",
        pointRadius: 5,
        pointBackgroundColor: "rgba(2,117,216,1)",
        pointBorderColor: "rgba(255,255,255,0.8)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(2,117,216,1)",
        pointHitRadius: 50,
        pointBorderWidth: 2,
        data: dataLumiDB,
      }],
    },
    options: {
      scales: {
        xAxes: [{
          time: {
            unit: 'date'
          },
          gridLines: {
            display: false
          },
          ticks: {
            maxTicksLimit: 1000
          }
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: 1000,
            maxTicksLimit: 5
          },
          gridLines: {
            color: "rgba(0, 0, 0, .125)",
          }
        }],
      },
      legend: {
        display: false
      }
    }
  });
}


var socket = io();

// aguarda alguma resposta do servidor
socket.on('respostaTemp', function (data) {

  var obj = JSON.parse(data);
  
  labelsTempDB.push(getDateTime());
  dataTempDB.push(obj.Temperatura);

  labelsUmiDB.push(getDateTime());
  dataUmiDB.push(obj.Umidade);

  labelsLumiDB.push(getDateTime());
  dataLumiDB.push(obj.Luminosidade);

  updateTempChart();
  updateUmiChart();
  updateLumiChart();
});

function getDateTime(){
  var dateNow = Date.now();
  var formatedDate = new Date(dateNow);
  formatedDate = (formatedDate.getDate())+'/'+(formatedDate.getMonth()+1)+'/'+formatedDate.getFullYear()+' '+(formatedDate.getHours() > 12 ? formatedDate.getHours() - 12 : formatedDate.getHours())+':'+formatedDate.getMinutes()+' '+(formatedDate.getHours() >= 12 ? "PM" : "AM");
  return formatedDate;
}