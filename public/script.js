const carteira = document.querySelector('#carteira')
const sobra = document.querySelector('#sobra')
const despesas = document.querySelector('#divida')
const ul = document.querySelector('#list')

const gastos = [
    {categoria: "Mercado", percent: "16", percent2: "29"}, 
    {categoria: "Saúde", percent: "11", percent2: "16"},
    {categoria: "Lazer", percent: "8", percent2: "14"},
    {categoria: "Transporte", percent:"9", percent2: "13" },
    {categoria: "Restaurante", percent:"11", percent2: "17"},
    {categoria: "Viajem",percent: "12", percent2: "18"}, 
    {categoria: "Imposto", percent: "3", percent2: "7"},
    {categoria: "Outros", percent: "3", percent2: "5"}
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

    
    carteira.innerHTML = `R$ ${sald}`
    const valor = sald - expenseTotal

    if(valor)
    {
         despesas.innerHTML = `R$ ${expenseTotal}`
         sobra.innerHTML = `R$ ${valor}`
    }
    printExpenses(expensesValue)
    console.log("saldo: " + sald, "despesas:  "  + expenseTotal)
    console.log(categorias, expensesValue)
}

function calcPercentsOfBalance(arr, sald){
    return arr.map((curr)=> Math.ceil(sald/100 * curr, 1))
}

function printExpenses(expensesValue){
    ul.innerHTML = ""
    for(i=0;i < categorias.length; i++){
        const list = document.createElement('li')
        list.textContent = `${categorias[i]} \n R$ ${expensesValue[i]}`
        ul.appendChild(list)
    } 
}