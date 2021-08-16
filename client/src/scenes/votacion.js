import Card from '../helpers/card.js';

import Zone from '../helpers/zone.js';

import io from 'socket.io-client';

import Dealer from '../helpers/dealer.js';

import WebFontFile from '../helpers/WebFontFile';

var text;
var horaInicio;
var cartasBlancasDeJugador = [];
var cartaJugada = false;
var votacionActiva = true;
var cartaVotada;
var votacionRealizada = false;
var jugadorVotado;
var cartaBlancaFinal = [];
var nombreJugador;


export default class Votacion extends Phaser.Scene {
    constructor() {
        super({
            key: 'Votacion'
        });
    }

    preload() {
        this.load.addFile(new WebFontFile(this.load, 'Work Sans'));
    }

    create() {
        let self = this;
        this.socket = io('http://localhost:3000', {transports : ["websocket"] });
        horaInicio = parseInt(sessionStorage.getItem("horaInicialRondaVotacion"));
        text = this.add.text(55, 55, "60", {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
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
        var cartaNegraFinal = this.add.dom(200, 375).createFromHTML(cartaNegraElegida).setScale(0.7, 0.7);
        cartaNegraFinal.node.children[0].children[0].innerText = sessionStorage.getItem("textoCartaNegra");
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

        this.socket.on('votacionTerminada', function (ganadorDeRonda, cartaGanadoraDeRonda, puntosJugadores, horaInicialRondaResultados) {
            self.scene.run('Resultados');
            sessionStorage.setItem("ganadorDeRonda", ganadorDeRonda);
            sessionStorage.setItem("cartaGanadoraDeRonda", cartaGanadoraDeRonda);
            sessionStorage.setItem("puntosJugadores", puntosJugadores);
            sessionStorage.setItem("horaInicialRondaResultados", horaInicialRondaResultados);
            self.scene.sleep();
        })

    }
    
    update() {
        console.log("Votacion");
        var horaActual = new Date().getTime();
        var diferenciaS = (horaActual - horaInicio)/1000;
        var segundosRestantes = 15 - diferenciaS;
        if (segundosRestantes >= 10) {
            text.setText(segundosRestantes.toString().substr(0, 2));
        } else if (segundosRestantes > 0 && segundosRestantes < 10) {
            text.setText(segundosRestantes.toString().substr(0, 1));
        } else {
            if (votacionActiva == true) {
                votacionActiva = false;
                this.socket.emit('votacionTerminada');
            } 
        }
    }


}