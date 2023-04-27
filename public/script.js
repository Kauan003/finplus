const balanceEl = document.querySelector('#sald');
const remainingBalanceEl = document.querySelector('#sobra');
const expensesEl = document.querySelector('#divida');
const listEl = document.querySelector('.list');
const barEl = document.querySelector('.bar');
const transactionsEl = document.querySelector('.transactions')
const transactionsList = document.querySelector('.transactionsList')

const spending = [
  {type: "Market", percent: "31", color: '#FFD700'},
  {type: "Medicine", percent: "16", color: '#FFA500'},
  {type: "Entertainment", percent: "12", color: '#FF6347'},
  {type: "Transport", percent:"9", color: '#4169E1'},
  {type: "Restaurant", percent:"8", color: '#556B2F'},
  {type: "Travel", percent: "7", color: '#708090'},
  {type: "Tax", percent: "5", color: '#000000'},
  {type: "Others", percent: "12", color: '#DCDCDC'}
];

const transactions = [
  {company:"Uber", date:"Apr 11, 2023, 16:35 PM", category:"Transport", value:"$ 12.75"},
  {company:"Latam Airlines", date:"Apr 9, 2023, 8:35 AM", category:"Travel", value:"$ 465.00"},
  {company:"Domino's Pizza", date:"Apr 9, 2023, 13:12 PM", category:"Restaurant", value:"$ 68.25"},
  {company:"Angeloni", date:"Apr 8, 2023, 11:23 AM", category:"Market", value:"$ 268.10"}

]
const icons = [
  `<box-icon type='solid' name='car'></box-icon>`,
  `<box-icon type='solid' name='plane-alt'></box-icon>`,
  `<box-icon name='restaurant'></box-icon>`,
  `<box-icon name='store-alt' type='solid' ></box-icon>`
]


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
  balanceEl.innerHTML = `<h1>$ ${balance}.00 </h1>`;
  expensesEl.innerHTML = `$ ${expenseTotal}.00`;
  remainingBalanceEl.innerHTML = `$ ${remainingBalance}.00`;
  printExpenses();
}

function printExpenses() {
  listEl.innerHTML = "";
  barEl.innerHTML = "";

  const WIDTH_MULTIPLIER = 3;

  for (let i = 0; i < categories.length; i++) {
    const listItems = document.createElement('li');
    const barColor = document.createElement('div');
    const valueBar = document.createElement('p')
    const categoriesColor = document.createElement('div')

    const barWidth = percents[i] * WIDTH_MULTIPLIER;

    barColor.style.width = `${barWidth}px`;
    barColor.style.backgroundColor = colors[i];
    categoriesColor.style.backgroundColor = colors[i];

    listItems.textContent = `${categories[i]} ${percents[i]}%`;
    valueBar.textContent = `$${expensesValues[i]}`

    listEl.appendChild(listItems);
    barEl.appendChild(barColor);
    barColor.appendChild(valueBar);
    listItems.appendChild(categoriesColor);
  }
}

function createTransactions(){
  transactionsList.innerHTML = ""
  
  for(let i = 0; i < transactions.length; i++){
    const textTransactions = document.createElement('li'); 

    textTransactions.innerHTML = ` 
    <p>${icons[i]}  ${transactions[i].company}</p>
     <p>${transactions[i].date}</p>
      <p>${transactions[i].category}</p>
       <p>${transactions[i].value}</p>`

      transactionsList.appendChild(textTransactions);
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
