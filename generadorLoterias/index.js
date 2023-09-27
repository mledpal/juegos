"use strict";

const divNumeros = document.getElementById('numeros')
const divEstrellas = document.getElementById('estrellas')
const btnActualizar = document.getElementById('actualizar');

let txtNumeros = parseInt(document.getElementById('nums'));
let txtEstrellas = parseInt(document.getElementById('otros'));

let numeros = [];
let estrellas = [];

function devuelveNums(CANTIDAD, MAXIMO) {
    const numeros = [];    

    for(let i = 0; i < CANTIDAD ; i++) {
        let num = Math.floor(Math.random() * MAXIMO )+1;
        
        while(numeros.includes(num)) {
          num = Math.floor(Math.random() * MAXIMO) + 1;    
        }  
        numeros.push(num)  
      }
      
      return numeros.sort((a,b) => { return a-b; });
}

document.addEventListener('DOMContentLoaded', () => {

  btnActualizar.addEventListener('click', () => {

    divNumeros.innerHTML="";
    divEstrellas.innerHTML="";

    txtNumeros = parseInt(document.getElementById('nums').value);
    txtEstrellas = parseInt(document.getElementById('otros').value);

    numeros = devuelveNums(txtNumeros, 49);
    estrellas = devuelveNums(txtEstrellas, 10);

    numeros.forEach((n) => {
      const number = document.createElement('p');
      number.classList.add("numero");
      number.textContent = n;
      divNumeros.appendChild(number);
    });
    
    estrellas.forEach((e) => {
      const number = document.createElement('p');
      number.classList.add("numero");
      number.textContent = e;
      divEstrellas.appendChild(number);
    });

  });
  

});