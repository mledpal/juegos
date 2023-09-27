"use strict";

import {Objeto} from "./Objeto.js";
import { MAX_COLS, MAX_FILAS } from "./limites.js";

export default class Exploradora extends Objeto {
   
    constructor(tipo) {
        super(tipo);
    }    

    mover(tecla) {
        switch(tecla) {
            case "ArrowUp":
                this.subir();
                break;
            case "ArrowDown":
                this.bajar();
                break;
            case "ArrowLeft":
                this.izquierda();
                break;
            case "ArrowRight":
                this.derecha();
                break;
        }
    }

    izquierda(){
        let y = this.Y;

        if (y > 0){
            y--;
        }
        this.setY(y);
    }

    derecha() {
        let y = this.Y;

        if (y ==  MAX_FILAS - 1){
            y = MAX_FILAS -1;
        } else {
            y++;
        }

        this.setY(y);
    }

    subir() {
        let x = this.X;

        if (x > 0){
            x--;
        }
        this.setX(x);
    }

    bajar() {
        let x = this.X;

        if (x ==  MAX_COLS - 1){
            x = MAX_COLS -1;
        } else {
            x++;
        }

        this.setX(x);
    }

}