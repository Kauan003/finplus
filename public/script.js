const cursor = document.createElement('div')
const container = document.querySelector('.experience')

cursor.setAttribute('class', 'cursor')
cursor.style.width = "300px"
cursor.style.height = "300px"
container.appendChild(cursor)


container.addEventListener('mousemove', (m)=>{
    let x = m.pageX - 150
    let y = m.pageY - 1050
    
    cursor.style.left = x +'px';
    cursor.style.top = y + 'px';
    
    if(y > 450 || y < -150){
       cursor.style.display= "none"
    } else cursor.style.display = "blocnnpk"
})
