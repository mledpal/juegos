"use strict";

import { MAX_COLS, MAX_FILAS } from "./limites.js";

export class Objeto {

    #posX;
    #posY;
    
    #tipo;
    #posInicial;

    constructor(tipo) {

        // Genera una posición aleatoria dentro del tablero
        // y evita que se posicione en la puerta o en la posición inicial de la exploradora

        // 1, 2 y 3 para las serpientes. 0 para la puerta y 4 para la exploradora

        switch(tipo) {
            case 1:
                this.#tipo = "serpiente1";
                break;
            case 2:
                this.#tipo = "serpiente2";
                break;
            case 3:                     
                this.#tipo = "serpiente3";
                break;
        }
        
        switch(tipo) {

            // SERPIENTES
            case 1:                
            case 2:                
            case 3: {    

                // Setea su posición inicial de forma aleatoria, evitando el [0, 0] y la posición de la exploradora
                this.#posInicial = this.randomPos();
                this.#posX = this.#posInicial[0];
                this.#posY = this.#posInicial[1];
               
                break;
            }

            case 0: { // PUERTA
                this.#tipo = "door_opened";
                this.#posX = 0;
                this.#posY = 0;
                this.#posInicial = [this.#posX, this.#posY];

                break;
            }

            case 4: {  // EXPLORADORA
                this.#tipo = "exploradora";                
                this.#posX = MAX_COLS - 1;
                this.#posY = MAX_FILAS - 1;
                this.#posInicial = [this.#posX, this.#posY];                
                break;
            }

            default:
                console.log("ERROR. Tipo no válido");
        }   
    }


    static getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    // Devuelve la posición en forma de array
    get posicion() {
        return [this.#posX, this.#posY];
    }

    // Devuelve la posición en forma de texto, para comparar las posiciones con otros objetos
    get posTXT() {
        return `${this.#posX}${this.#posY}`;        
    }
    
    // Devuelve la posición según el lugar donde le correspondería estar en el array de TD (Tablero)    
    get posINT() {
        return (this.#posX * MAX_COLS) + this.#posY;
    }

    get X() {
        return this.#posX;
    }
    
    get Y() {
        return this.#posY;
    }

    setX(valor) {
        this.#posX = valor;
    }

    setY(valor)  {
        this.#posY = valor;
    }

    get tipo() {
        return this.#tipo;
    }

    set tipo(_tipo){
        switch(_tipo) {
            case 1:
                this.#tipo = "serpiente1";
                break;
            case 2:
                this.#tipo = "serpiente2";
                break;
            case 3:
                this.#tipo = "serpiente3";
                break;
            case 4:
                this.#tipo = "exploradora";
                break;
            case 0:
                this.#tipo = "door_opened";
                break;
        }
    }


    // Función que genera la posición inicial en base a las coordenadas del tablero
    // Devuelve un array con la posición de X e Y

    
    randomPos() {

        let x;
        let y;

        do {            
            x = Objeto.getRandomInt(MAX_COLS);
            y = Objeto.getRandomInt(MAX_FILAS);            
        } while((x == 0 && y == 0) || (x == MAX_COLS-1 && y == MAX_FILAS -1 ));

        // Calcula la posición inicial en base al array de celdas del tablero
        // Para adaptarlo a todos los tamaños posibles.
        this.#posInicial = (x * MAX_COLS) + y;

        return [x, y];
    }

    // Reinicia las posiciones de todos los objetos según su tipo
    // Y devuelve un array [X, Y]
    reset() {
        
        switch(this.#tipo) {
            case "serpiente1":
            case "serpiente2":
            case "serpiente3":
                {
                    this.#posInicial = this.randomPos();                                   
                    break;
                }

            case "door_opened":
                {
                    this.#posInicial = [0 , 0];
                    break;
                }

            case "exploradora":
                    this.#posInicial = [(MAX_COLS-1), (MAX_FILAS-1)];
                    break;                            
        }        

        this.#posX=this.#posInicial[0];
        this.#posY=this.#posInicial[1];               
    }
}