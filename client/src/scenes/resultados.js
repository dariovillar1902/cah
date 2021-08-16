import Card from '../helpers/card.js';

import Zone from '../helpers/zone.js';

import io from 'socket.io-client';

import Dealer from '../helpers/dealer.js';

import WebFontFile from '../helpers/WebFontFile';

var text;
var horaInicio;
var cartasBlancasDeJugador = [];
var cartaJugada = false;
var resultadosActivos = true;
var cartaVotada;
var votacionRealizada = false;
var jugadorVotado;
var cartaBlancaFinal = [];
var nombreJugador;
var textosNombres = [];
var textosPuntos = [];
var jugadorGanador;


export default class Resultados extends Phaser.Scene {
    constructor() {
        super({
            key: 'Resultados'
        });
    }

    preload() {
        this.load.addFile(new WebFontFile(this.load, 'Work Sans'));
    }

    create() {
        jugadorGanador = sessionStorage.getItem("ganadorDeRonda");
        text = this.add.text(55, 55, "10", {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
        var cartaNegraElegida = `<div style='
        background-color: black;
        color: white;
        border: 1px solid white;
        border-radius: 1em;
        width: 14.88em;
        height: 20.78em;'> <p id="texto" style='
        padding: .5em 1.5em 1em 1.5em;
        font-family: sans-serif;
        font-weight: bold;
        font-size: 1.3em;
        line-height: 1.3em;'> </p> </div>`;
        var cartaNegraFinal = this.add.dom(500, 300).createFromHTML(cartaNegraElegida).setScale(0.7, 0.7);
        cartaNegraFinal.node.children[0].children[0].innerText = sessionStorage.getItem("textoCartaNegra");
        var textoGanador = this.add.text(600, 100, "Ganador: ", {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
        var nombreGanador = this.add.text(750, 100, "a", {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
        nombreGanador.setText(jugadorGanador);
        var cartaBlanca = `<div style='
            background-color: white;
            color: black;
            border: 1px solid black;
            border-radius: 1em;
            width: 14.88em;
            height: 20.78em;'> <p id="texto" style='
            padding: .5em 1.5em 1em 1.5em;
            font-family: sans-serif;
            font-weight: bold;
            font-size: 1.3em;
            line-height: 1.3em;'> </p> </div>`;
        var cartaGanador = this.add.dom(800, 300).createFromHTML(cartaBlanca).setScale(0.7, 0.7);
        cartaGanador.node.children[0].children[0].innerText = sessionStorage.getItem("cartaGanadoraDeRonda");
        var nombres = sessionStorage.getItem("nombresJugadores").split(",");
        var puntos = sessionStorage.getItem("puntosJugadores").split(",");
        for (var i = 0; i < nombres.length; i++){
            textosNombres[i] = this.add.text(300 + i*200, 500, nombres[i], {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
            textosPuntos[i] = this.add.text(325 + i*200, 600, puntos[i], {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
        }
        horaInicio = parseInt(sessionStorage.getItem("horaInicialRondaResultados"));
        this.socket = io('http://localhost:3000', {transports : ["websocket"] });
        this.socket.on('resultadosTerminados', function () {
            self.scene.switch('Game');
            self.scene.stop();
        })

        /*
        let self = this;
        this.socket = io('http://localhost:3000', {transports : ["websocket"] });
        var nombres = sessionStorage.getItem("nombresJugadores").split(",");
        for(var i = 0; i < nombres.length; i++){
            if (i == sessionStorage.getItem("idJugador")) {
                nombreJugador = nombres[i];
            }
        }
        var ordenJugadoresEnRonda = sessionStorage.getItem("ordenJugadoresEnRonda").split(",");
        var cartasJugadasEnRonda = sessionStorage.getItem("cartasJugadasEnRonda").split(",");
        console.log(ordenJugadoresEnRonda);
        console.log(cartasJugadasEnRonda);
        
        for (var i = 0; i < ordenJugadoresEnRonda.length; i++){
            var cartaBlanca = `<div style='
            background-color: white;
            color: black;
            border: 1px solid black;
            border-radius: 1em;
            width: 14.88em;
            height: 20.78em;'> <p id="texto" style='
            padding: .5em 1.5em 1em 1.5em;
            font-family: sans-serif;
            font-weight: bold;
            font-size: 1.3em;
            line-height: 1.3em;'> </p> </div>`;
            cartaBlancaFinal[i] = this.add.dom(400 + i*200, 375).createFromHTML(cartaBlanca).setScale(0.7, 0.7).setInteractive();
            cartaBlancaFinal[i].node.children[0].children[0].innerText = cartasJugadasEnRonda[i];
            cartaBlancaFinal[i].on('pointerdown', function (pointer) {
                if (pointer.downElement.innerText !== ""){
                    if (votacionRealizada == false){
                        console.log(pointer.downElement.innerText);
                        cartaVotada = pointer.downElement.innerText;
                        votacionRealizada = true;
                        self.socket.emit('votoEmitido', cartaVotada, nombreJugador);
                    }
                }
            }, self);
        }
        */
    }
    
    update() {
        var horaActual = new Date().getTime();
        var diferenciaS = (horaActual - horaInicio)/1000;
        var segundosRestantes = 10 - diferenciaS;
        console.log(segundosRestantes);
        if (segundosRestantes >= 10) {
            text.setText(segundosRestantes.toString().substr(0, 2));
        } else if (segundosRestantes > 0 && segundosRestantes < 10) {
            text.setText(segundosRestantes.toString().substr(0, 1));
        } else {
            if (resultadosActivos == true) {
                resultadosActivos = false;
                this.socket.emit('resultadosTerminados');
            } 
            
        }
    }


}