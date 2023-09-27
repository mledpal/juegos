"use strict";

import { MAX_COLS, MAX_FILAS } from "./limites.js";
import {Objeto} from "./Objeto.js";

export default class Tablero {

    #filas;
    #columnas;


    constructor() {        
        this.#filas = MAX_FILAS;
        this.#columnas = MAX_COLS;  

        this.pintarTablero();
    }

    get getFilas() {
        return this.#filas;
    }

    get getColumnas() {
        return this.#columnas;
    }

    // Coloca el objeto en el tablero, según la posición calculada entre X e Y 
    // para que coincida con el nº adecuado en el array de TD
    colocar(_obj) {
        if(_obj instanceof Objeto) {
            let celdas = document.getElementsByTagName("td");

            let tipo = _obj.tipo;
            let posicion = _obj.posINT;                      

            celdas[posicion].classList.add(tipo);

            return celdas[posicion].classList;
        }        
    }


    // Crea la tabla HTML y la agrega al DIV correspondiente
    pintarTablero() {
        let tabla = document.createElement("table");
        let contenedor = document.getElementById("table");

        for(let i = 0; i < MAX_FILAS; i++) {
            let fila = document.createElement("tr");
    
            for(let j = 0; j < MAX_COLS; j++) {
    
                let celda = document.createElement("td");
  
                fila.appendChild(celda);
            }
    
            tabla.appendChild(fila);
        }   
        
        contenedor.appendChild(tabla);
    }

    // Borra un objeto según la clase dada
    borrarObjeto(_posicion, clase) {
        let celdas = document.getElementsByTagName("td");
        celdas[_posicion].classList.remove(clase);
    }

    // Recorre todo el tablero para borrar todas las clases que encuentre    
    vaciarTablero() {

        let celdas = document.getElementsByTagName('td');

        for(let x = 0; x < MAX_COLS; x++) {
            for(let y = 0; y < MAX_FILAS; y++ ) {                

                let td = parseInt(`${x}${y}`);                                             
                celdas[td].classList.remove('serpiente1', 'serpiente2', 'serpiente3', 'door_opened', 'door_closed', 'exploradora', 'devoradora');                
            }
        } 

    }

    getPosicion(posX, posY) {
        return celda[x][y].classList;
    }


}

