const balanceText= document.querySelector('#saldo')
const remainingBalanceText = document.querySelector('#sobra')
const expensesText = document.querySelector('#divida')
const ul = document.querySelector('#list')

const Spending = [
    {type: "Mercado", percent: "16", percent2: "29"}, 
    {type: "Saúde", percent: "11", percent2: "16"},
    {type: "Lazer", percent: "8", percent2: "14"},
    {type: "Transporte", percent:"9", percent2: "13" },
    {type: "Restaurante", percent:"11", percent2: "17"},
    {type: "Viajem",percent: "12", percent2: "18"}, 
    {type: "Imposto", percent: "3", percent2: "7"},
    {type: "Outros", percent: "3", percent2: "5"}
]

const percents = Spending.map(( {percent})=>{ return percent }, "")
const percents2 = Spending.map(( {percent2})=>{return percent2}, "")
const categorias = Spending.map(( {type})=>{return type}, "")

function getSald(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const balance = getSald(2100,3500)
const expensesValue = allExpenses()

function createExtract(){
    const expenseTotal = expensesValue.reduce((acc, current)=> acc + current ,0)
    const remainingBalance = balance - expenseTotal
    balanceText.innerHTML = `R$ ${balance}`
    expensesText.innerHTML = `R$ ${expenseTotal}`
    remainingBalanceText.innerHTML = `R$ ${remainingBalance}`
    printExpenses(expensesValue)
}

function calcPercentsOfBalance(arr, balance){
    return arr.map((curr)=> Math.ceil(balance/100 * curr, 1))
}
function allExpenses(){
    const result = []
    for(i=0; i < percents.length; i++){
        result.push(getSald(percents[i], percents2[i]))
    }
    return calcPercentsOfBalance(result, balance)
}

function printExpenses(expensesValue){
    ul.innerHTML = ""
    for(i=0;i < categorias.length; i++){
        const list = document.createElement('li')
        list.textContent = `${categorias[i]} \n R$ ${expensesValue[i]}`
        ul.appendChild(list)
    } 
}


//GRAPHS
var canvas = document.querySelector('#graph');
var ctx = canvas.getContext('2d')

const data = {
    labels: categorias,
    datasets: [{
        data: expensesValue,
        backgroundColor: ['#FF3333', 'blue', 'green', 'orange', 'purple', 'yellow','aqua', 'gray'],

    }]
};

function createGraph(){
    let myPieChart = new Chart(ctx,{
        type: 'pie',
        data: data,
        options:{
            borderSkipped: "bottom",
        }
    });
}
