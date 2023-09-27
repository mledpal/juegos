"use strict";

import {Objeto} from "./Objeto.js";
import { MAX_COLS, MAX_FILAS } from "./limites.js";

export default class Serpiente extends Objeto {

    constructor(tipo) {
        super(tipo);       
    }    

    increaseX(){       
        
        let x = parseInt(this.X);
        let y = parseInt(this.Y);

        x++;      
        
        if (x == MAX_COLS) {
            if(y == 0) {
                x = 1;
            } else {
                x = 0;
            }
        } 
               
        this.setX(x);
        
    }

    increaseY() {
        
        let x = this.X;
        let y = this.Y;
        
        y++;

        if (y == MAX_FILAS) {

            if(x == 0) {
                y = 1;
            } else {
                y = 0;
            }
            
        } 
        
        this.setY(y);
        
    }

    // Función para mover a las serpientes según el tipo que sea
    // Se comprueba en las funciones increaseY e increaseX que no pasen por la puerta [0, 0]
    // Devuelve un array para la posición en el tablero
    mover() {       

        let nuevoXY = new Array();

        switch(this.tipo) {
            case "serpiente1":
            case "serpiente3": {
                this.increaseY();                  
                break;
            }
            case "serpiente2":
                this.increaseX();
                break;
            break;
        }

        nuevoXY = [this.X, this.Y];

        return nuevoXY;        
    }


}