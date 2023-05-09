const balanceEl = document.querySelector('#sald');
const remainingBalanceEl = document.querySelector('#sobra');
const expensesEl = document.querySelector('#divida');
const listEl = document.querySelector('.list');
const barEl = document.querySelector('.bar');
const transactionsEl = document.querySelector('.transactions')
const transactionsListEl = document.querySelector('.transactionsList')
const CurrentCardEl = document.querySelector('.currentCard')

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

const transactionsDebit = [
  {company:"Uber", date:"Mai 11, 2023, 16:35 PM", category:"Transport", value:"$ 12.75"},
  {company:"Latam Airlines", date:"Mai 9, 2023, 8:35 AM", category:"Travel", value:"$ 210.00"},
  {company:"Domino's Pizza", date:"Mai 9, 2023, 13:12 PM", category:"Restaurant", value:"$ 68.25"},
  {company:"Angeloni", date:"Mai 8, 2023, 11:23 AM", category:"Market", value:"$ 268.10"}
]
const transactionsCredit = [
  {company:"Netflix", date:"Mai 3, 2023, 16:35 PM", category:"Entertainment ", value:"$ 79.90"},
  {company:"Paris 6", date:"Mai 7, 2023, 11:48 AM", category:"Restaurant", value:"$ 120.00"},
  {company:"Taxi", date:"Mai 5, 2023, 14:55 PM", category:"Transport", value:"$ 80.00"},
  {company:"Amazon", date:"Mai 1, 2023, 09:13 AM", category:"Market", value:"$ 250.0"}
]
const transactionsCompany = [
  {company:"Electricity Bill", date:"Mai 3, 2023, 16:35 PM", category:"Others ", value:"$ 822.40"},
  {company:"Tax", date:"Mai 7, 2023, 11:48 AM", category:"Tax", value:"$ 250.00"},
  {company:"Transfer", date:"Mai 5, 2023, 14:55 PM", category:"Others", value:"$ 900.00"},
  {company:"Transfer", date:"Mai 1, 2023, 09:13 AM", category:"Others", value:"$ 650.20"}
]
const iconsDebit = [
  `<box-icon type='solid' name='car'></box-icon>`,`<box-icon type='solid' name='plane-alt'></box-icon>`,`<box-icon name='restaurant'></box-icon>`,`<box-icon name='store-alt' type='solid' ></box-icon>`
]
const iconsCredit = [
  `<box-icon name='tv'></box-icon>`,`<box-icon name='restaurant'></box-icon>`,`<box-icon type='solid' name='car'></box-icon>`,`<box-icon name='store-alt' type='solid' ></box-icon>`,
]
const iconsCompany = [
  `<box-icon name='barcode'></box-icon>`,`<box-icon name='barcode'></box-icon>`,`<box-icon name='transfer-alt'></box-icon>`,`<box-icon name='transfer-alt'></box-icon>`,
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

const debitCardImage = "url(./fin-plus/images/DebitCard.png)"
const creditCardImage = "url(./fin-plus/images/CreditCard.png)"
const companyCardImage = "url(./fin-plus/images/CompanyCard.png)"

function walletValues(balance, remainingBalance, expenseTotal, cardImage){
  CurrentCardEl.style.backgroundImage= cardImage
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

function printTransactions(transactions, icons){
  transactionsListEl.innerHTML = ""
  
  for(let i = 0; i < transactions.length; i++){
    const textTransactions = document.createElement('li'); 

    textTransactions.innerHTML = ` 
    <p>${icons[i]}  ${transactions[i].company}</p>
     <p>${transactions[i].date}</p>
      <p>${transactions[i].category}</p>
       <p>${transactions[i].value}</p>`
      transactionsListEl.appendChild(textTransactions);
  }
}

function showCard(card){
  const cardType = card.getAttribute("data-card")
  if(cardType === "debit"){
    debitAccount()
  }
  if(cardType === "credit"){
    creditAccount()
  }
  if(cardType === "company"){
    companyAccount()
  }
}

function debitAccount() {
  walletValues(balance, remainingBalance, expenseDebitTotal, debitCardImage)
  printExpenses(expensesDebit, percentsDebit);
  printTransactions(transactionsDebit, iconsDebit);
  if(myChart != null){
    myChart.destroy()
  }
  Graph(thisWeekSpendingsDebit, lastWeekSpendingsDebit)
}

function creditAccount(){
  walletValues(balanceCredit, expenseCreditTotal, remainingCreditBalance, creditCardImage)
    printExpenses(expensesCredit, percentsCredit);
    printTransactions(transactionsCredit, iconsCredit)
    if(myChart != null){
      myChart.destroy()
    }
    Graph(thisWeekSpendingsCredit, lastWeekSpendingsCredit)
}
function companyAccount(){
  walletValues(balanceCompanyCard, expenseCompanyCardTotal, remainingCompanyCardBalance, companyCardImage)
    printExpenses(expensesCompanyCard, percentsCompany )
    printTransactions(transactionsCompany,iconsCompany)
    if(myChart != null){
      myChart.destroy()
    }
    Graph(thisWeekSpendingsCompany, lastWeekSpendingsCompany)
}

//GRAPHS
var canvas = document.querySelector('#graph');
var ctx = canvas.getContext('2d')
myChart = null

const thisWeekSpendingsDebit = [200, 100, 150, 200, 80,300, 400]
const lastWeekSpendingsDebit = [120, 80, 250, 60, 100,300, 200]

const thisWeekSpendingsCredit = [350, 200, 280, 200, 220,400, 300]
const lastWeekSpendingsCredit = [400, 180, 350, 120, 100,300, 600]

const thisWeekSpendingsCompany = [720, 515, 620, 1200, 1550,1220, 2300]
const lastWeekSpendingsCompany = [820, 780, 600, 1150, 900,1000, 2100]

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

function Graph(thisWeekSpendings, lastWeekSpendings){
 data = {
    labels: ["S", "M", "T", "W", "T","F","S"],
    datasets: [
        {
            label: "This Week",
            backgroundColor: "#FFD700",
            data:thisWeekSpendings
        },
        {
            label: "Last Week",
            backgroundColor: "#DCDCDC",
            data: lastWeekSpendings
        }
    ]
  };
  config = {
    type: 'bar',
    data: data,
    options: {}
}
myChart = new Chart(ctx, config);
}
