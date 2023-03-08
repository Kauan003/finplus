const text = document.querySelector('.month')
const date = new Date()
const month = date.toLocaleString('default', { month: 'long' });
const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

text.innerHTML= `<h1> ${capitalizedMonth} </h1>`
text.style.marginLeft='40px'