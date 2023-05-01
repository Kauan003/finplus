const balanceEl = document.querySelector('#sald');
const remainingBalanceEl = document.querySelector('#sobra');
const expensesEl = document.querySelector('#divida');
const listEl = document.querySelector('.list');
const barEl = document.querySelector('.bar');
const transactionsEl = document.querySelector('.transactions')
const transactionsList = document.querySelector('.transactionsList')

const spending = [
  {type: "Market", percentDebit: "31", percentCredit: "15", percentCompany: "15", color: '#FFD700'},
  {type: "Medicine", percentDebit: "16", percentCredit: "5", percentCompany: "0", color: '#FFA500'},
  {type: "Entertainment", percentDebit: "12", percentCredit: "22", percentCompany: "10", color: '#FF6347'},
  {type: "Transport", percentDebit:"9", percentCredit: "8", percentCompany: "28", color: '#4169E1'},
  {type: "Restaurant", percentDebit:"8", percentCredit: "20", percentCompany: "0", color: '#556B2F'},
  {type: "Travel", percentDebit: "7", percentCredit: "6", percentCompany: "0", color: '#708090'},
  {type: "Tax", percentDebit: "5", percentCredit: "6", percentCompany: "16", color: '#000000'},
  {type: "Others", percentDebit: "12", percentCredit: "8", percentCompany: "30", color: '#DCDCDC'}
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


const percentsDebit = spending.map(({percentDebit}) => parseInt(percentDebit, 10));
const percentsCredit = spending.map(({percentCredit}) => parseInt(percentCredit, 10));
const percentsCompany = spending.map(({percentCompany}) => parseInt(percentCompany, 10));
const categories = spending.map(({type}) => type);
const colors = spending.map(({color}) => color);

function getSald(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const balance = getSald(2100, 3500);
const expenseDebitTotal = getSald(2100, 3500);
const remainingBalance = balance - expenseDebitTotal;
const expensesDebit = percentsDebit.map((arr)=>{return expenseDebitTotal * arr /100})

const balanceCredit = getSald(4000,5500)
const expenseCreditTotal = getSald(3800, 4100);
const remainingCreditBalance = balanceCredit - expenseCreditTotal;  
const expensesCredit = percentsCredit.map((arr)=>{return expenseCreditTotal * arr /100})

const balanceCompanyCard = getSald(14000,22000)
const expenseCompanyCardTotal = getSald(12000, 16000);
const remainingCompanyCardBalance = balanceCompanyCard - expenseCompanyCardTotal; 
const expensesCompanyCard = percentsCompany.map((arr)=>{return expenseCompanyCardTotal * arr /100})

function createExtract() {
  walletValues(balance, remainingBalance, expenseTotal)
  printExpenses(expensesDebit, percentsDebit);
}
function walletValues(balance, remainingBalance, expenseTotal){
  balanceEl.innerHTML = `<h1>$ ${balance}.00 </h1>`;
  expensesEl.innerHTML = `$ ${expenseTotal}.00`;
  remainingBalanceEl.innerHTML = `$ ${remainingBalance}.00`;
}

function printExpenses(expenses,percents) {
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
    valueBar.textContent = `$${expenses[i]}`

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

const elCurrentCard = document.querySelector('.currentCard')

function showCard(card){
  const cardType = card.getAttribute("data-card")
  if(cardType === "debit"){
    elCurrentCard.style.backgroundImage= "url(./images/DebitCard.png)"
    walletValues(balance, remainingBalance, expenseDebitTotal)
    printExpenses(expensesDebit, percentsDebit);
  }
  if(cardType === "credit"){
    elCurrentCard.style.backgroundImage= "url(./images/CreditCard.png)"

    walletValues(balanceCredit, expenseCreditTotal, remainingCreditBalance)
    printExpenses(expensesCredit, percentsCredit);
  }
  if(cardType === "company"){
    elCurrentCard.style.backgroundImage= "url(./images/CompanyCard.png)"
   
    walletValues(balanceCompanyCard, expenseCompanyCardTotal, remainingCompanyCardBalance)
    printExpenses(expensesCompanyCard, percentsCompany )
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
