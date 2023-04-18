const balanceEl = document.querySelector('#sald');
const remainingBalanceEl = document.querySelector('#sobra');
const expensesEl = document.querySelector('#divida');
const listEl = document.querySelector('.list');
const barEl = document.querySelector('.bar');

const spending = [
  {type: "Mercado", percent: "31", color: '#FFD700'},
  {type: "Saúde", percent: "16", color: '#FFA500'},
  {type: "Lazer", percent: "12", color: '#FF6347'},
  {type: "Transporte", percent:"9", color: '#4169E1'},
  {type: "Restaurante", percent:"8", color: '#556B2F'},
  {type: "Viajem", percent: "7", color: '#708090'},
  {type: "Imposto", percent: "5", color: '#000000'},
  {type: "Outros", percent: "12", color: '#DCDCDC'}
];

const percents = spending.map(({percent}) => parseInt(percent, 10));
const categories = spending.map(({type}) => type);
const colors = spending.map(({color}) => color);

function getSald(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const balance = getSald(2100, 3500);
const expenseTotal = getSald(2100, 3500);
const remainingBalance = balance - expenseTotal;
const expensesValues = percents.map((arr)=>{return expenseTotal * arr /100})


function createExtract() {
  balanceEl.innerHTML = `<h1>R$ ${balance} </h1>`;
  expensesEl.innerHTML = `R$ ${expenseTotal}`;
  remainingBalanceEl.innerHTML = `R$ ${remainingBalance}`;
  printExpenses();
}

function printExpenses() {
  listEl.innerHTML = "";
  barEl.innerHTML = "";

  const WIDTH_MULTIPLIER = 3;

  for (let i = 0; i < categories.length; i++) {
    const listItem = document.createElement('li');
    const barColor = document.createElement('div');

    const barWidth = percents[i] * WIDTH_MULTIPLIER;

    barColor.style.width = `${barWidth}px`;
    barColor.style.backgroundColor = colors[i];

    listItem.textContent = `${categories[i]} ${percents[i]}%`;

    listEl.appendChild(listItem);
    barEl.appendChild(barColor);
  }
}


//GRAPHS
var canvas = document.querySelector('#graph');
var ctx = canvas.getContext('2d')

var data = {
  labels: ["S", "M", "T", "W", "T","F","S"],
  datasets: [
      {
          label: "This Week",
          backgroundColor: "#FFD700",
          data: [50, 30, 40, 45, 35, 40, 10]
      },
      {
          label: "Last Week",
          backgroundColor: "#DCDCDC",
          data: [80, 60, 70, 55, 75, 20, 50]
      }
  ]
};

// Configuração das opções do gráfico
var options = {
  title: {
      display: false,
      text: 'Gastos por Dia da Semana'
  },
  legend: { 
    position: 'top',
    labels: {
      fontColor: '#333',
      usePointStyle: true
    } 
  },
  scales: {
      yAxes: [{
          ticks: {
              beginAtZero:true,
              callback: function(value, index, values) {
                  return 'R$' + value;
              }
          }
      }]
  }
};



function createGraph(){
    myChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {}
  });
    }
