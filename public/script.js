const carteira = document.querySelector('#carteira')
const sobra = document.querySelector('#sobra')
const divida = document.querySelector('#divida')
const ul = document.querySelector('#list')

const gastos = [
    {categoria: "mercado", percent: "16", percent2: "29"}, 
    {categoria: "saúde", percent: "11", percent2: "16"},
    {categoria: "lazer", percent: "8", percent2: "14"},
    {categoria: "transporte", percent:"9", percent2: "13" },
    {categoria: "restaurante", percent:"11", percent2: "17"},
    {categoria: "viajem",percent: "12", percent2: "18"}, 
    {categoria: "imposto", percent: "3", percent2: "7"},
    {categoria: "outros", percent: "3", percent2: "5"}
]
const percents = gastos.map(( {percent})=>{
    return percent 
}, "")
const percents2 = gastos.map(( {percent2})=>{
    return percent2
}, "")
const categorias = gastos.map(({categoria})=>
{return categoria}, "")


function getSald(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  
}
  
function createExtract(){
    const sald = getSald(2100,3500)
    const result = []

    for(i=0; i < percents.length; i++){
        result.push(getSald(percents[i], percents2[i]))
    }
    
    const expensesValue = calcPercentsOfBalance(result, sald)
    const expenseTotal = expensesValue.reduce((acc, current)=> acc + current ,0)

    calcTotalExpenses(expenseTotal, sald)
    
    carteira.innerHTML = sald


    const valor = sald - expenseTotal

    if(valor >= 0)
    {
        sobra.innerHTML=valor
       divida.innerHTML = 0
    } else{
        divida.innerHTML = valor
        sobra.innerHTML = 0
    }
    printExpenses(expensesValue)
    console.log("saldo: " + sald, "despesas:  "  + expenseTotal)
    console.log(categorias, expensesValue)
}

function calcPercentsOfBalance(arr, sald){
    return arr.map((curr)=> (sald/100 * curr).toFixed(2))
}

function calcTotalExpenses(expenseTotal,sald){
    if(sald >= expenseTotal){
       return 
    } else return 
    
}

function printExpenses(expensesValue){
    ul.innerHTML = ""
    for(i=0;i < categorias.length; i++){
        const list = document.createElement('li')
        list.textContent = `${categorias[i]} \n R$ ${expensesValue[i]}`
        ul.appendChild(list)
    } 
}