"use strict";

// Constructor sencillo para el Objeto Puerta
// Es innecesario pero así queda más claro que objeto es que si se usa un entero
// Y a su vez se le pueden añadir otras funciones adicionales 
// separadas de los otros objetos

import {Objeto} from "./Objeto.js";

export default class Puerta extends Objeto {

    constructor(tipo) {
        super(tipo);
    }    
}