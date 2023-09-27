"use strict";

// Uso un fichero donde guardo constantes
// Como el tamaño del tablero , velocidad de las serpientes y tiempo de juego
// por lo que es posible modificar esos parámetros y hacerlo más interesante.
// Aunque habría que modificar parte del código para aceptar más líneas.
import { CUENTA_ATRAS, VELOCIDAD, ENEMIGOS } from "./limites.js";

 
// Uso objetos (clases) diferentes para gestionar de forma distinta cada objeto
// Con la puerta no era necesario pero así podemos gestionar cualquier evento nuevo de ella
import Serpiente from "./Serpiente.js";
import Exploradora from "./Exploradora.js";
import Puerta from "./Puerta.js";


// Con este objeto gestionamos todo el tablero, desde mostrarlo, resetearlo, pintar objetos, etc
import Tablero from "./Tablero.js"; 
// import { MAX_COLS } from "./limites.js";
// import { MAX_FILAS } from "./limites.js";


// Variable para añadir enemigos, un array que se recorrerá posteriormente para 
// añadirlos al tablero o gestionar su movimiento
// Generamos un array con la lista de enemigos
// El número está indicado en la constante ENEMIGOS
// Generará el mísmo número de los 3 tipos
let enemigos = new Array();

for (let i = 0; i < ENEMIGOS; i++) {
    for (let tipo = 1; tipo <=3; tipo++) {
        enemigos.push(new Serpiente(tipo));
    }        
}

let exploradora = new Exploradora(4);
let puerta = new Puerta(0);

let tablero = new Tablero();
let celdas = document.getElementsByTagName("td");

let tiempoDeJuego = CUENTA_ATRAS;
let juego;
let cuentaAtras;



// Función para detener todos los intervalos y eventos del juego
function resetTimers() { 
    clearInterval(juego);  
    clearInterval(cuentaAtras) ;  
    document.removeEventListener("keydown", moverExploradora);
}


function addBoton() {     // Añadimos el botón para iniciar el juego
    let boton = document.getElementById("boton");
    let button = document.createElement("button");

    button.setAttribute("id", "iniciarJuego");
    button.appendChild(document.createTextNode("Iniciar Juego"));   
    button.onclick = function() {
        iniciarJuego();
    };    
    boton.appendChild(button);
    
}

// Funcion que inicia el movimiento de las serpientes y el juego
function iniciarJuego() {      
  

    tablero.vaciarTablero(); // Borra el tablero (elimina las clases de cada td)

    // Reinicia las posiciones de las serpientes y de la exploradora
    enemigos.forEach(serpiente => {        
        serpiente.reset();
    })
    exploradora.reset();    
    
    // Coloca los objetos en el tablero (añade las clases a los td)
    tablero.colocar(exploradora);        
    tablero.colocar(puerta);
    enemigos.forEach(serpiente => tablero.colocar(serpiente));


    // Remueve el botón
    let boton = document.getElementById("boton");
    boton.removeChild(boton.firstElementChild);    
    

    // Inicia los temporizadores y el eventListener del teclado
    tiempoDeJuego = CUENTA_ATRAS;
    
    juego = setInterval(jugando, VELOCIDAD);
    cuentaAtras = setInterval(cuenta_atras, 1000);
    document.addEventListener("keydown", moverExploradora);
}



// Controla el tiempo del juego y lanza el mensaje cuando se ha superado el tiempo máximo sin que 
// se haya llegado a la puerta.
function cuenta_atras() {
    tiempoDeJuego--;
    
    if(tiempoDeJuego < 0) {
        
        resetTimers();
        
        Swal.fire({                
            text: `¡¡ Has agotado el tiempo !!`,                
            imageUrl: './images/finalizado.png',
            confirmButtonText: 'OK'
        });
    }        
}


// Para mover la exploradora
function moverExploradora(event) {

    tablero.borrarObjeto(exploradora.posINT, exploradora.tipo);
    exploradora.mover(event.key);

    let clases = tablero.colocar(exploradora);    
    

    // Aquí detecta si en la celda en la que nos hemos movido
    // ya existía una serpiente, por lo que nos lanza el mensaje de Game Over
    if(clases.contains("serpiente1")  || clases.contains("serpiente2") || clases.contains("serpiente3")) {
        celdas[exploradora.posINT].classList.remove(exploradora.tipo);
        devorada(exploradora.posINT, celdas[exploradora.posINT].classList.item(0));
    }

    // Si llegamos a la celda 0, ganamos
    if(exploradora.posINT==0) {
        ganarJuego();
    }
}



document.addEventListener("DOMContentLoaded", ()=> {

    // Añadimos los personajes al tablero y pintamos la tabla
    tablero.colocar(exploradora);
    tablero.colocar(puerta);
    enemigos.forEach(serpiente => tablero.colocar(serpiente));
        
    // Guardamos en una variable todo el tablero
    celdas = document.getElementsByTagName('td');  
    
    juego = setInterval(jugando, VELOCIDAD);
    cuentaAtras = setInterval(cuenta_atras, 1000);
    document.addEventListener("keydown", moverExploradora);

});


// Funcion que gestiona el movimiento de las serpientes
// y si ha alcanzado la celda donde está la exploradora
function jugando() {

    if(exploradora.posTXT == puerta.posTXT) {
        ganarJuego();
    }

    enemigos.forEach(serpiente => {
        
        tablero.borrarObjeto(serpiente.posINT, serpiente.tipo);

        serpiente.mover();                        
        tablero.colocar(serpiente);  
        
        if(serpiente.posINT == exploradora.posINT) {
            devorada(serpiente.posINT, serpiente.tipo);
        }
    
    });
    

    // Cambiamos el mensaje del título para saber cuanto tiempo nos queda
    document.getElementById("time").textContent=`Escapa en ${tiempoDeJuego} segundos`;
}

// Si caemos aquí es porque nos ha comido una serpiente
function devorada(_pos, tipo) {

    celdas[_pos].classList.add('devoradora');
    celdas[_pos].classList.remove('exploradora');
    celdas[_pos].classList.remove(tipo);

    resetTimers();
            
    Swal.fire({                
        text: `¡Has sido devorada`,                
        imageUrl: './images/serpienteComiendo.jpg',
        confirmButtonText: 'OK'
    });

    addBoton();
}


// We are the champions!
function ganarJuego() {
    resetTimers();
        
    celdas[0].classList.remove('door_opened');
    celdas[0].classList.add('door_closed');
    document.removeEventListener("keydown", moverExploradora);

    Swal.fire({                
        text: `¡Has escapado de las serpientes en ${CUENTA_ATRAS - tiempoDeJuego} segundos !!`,                
        imageUrl: './images/ganadora.png',
        confirmButtonText: 'OK'
    });

    addBoton();
}


