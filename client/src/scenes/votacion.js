import io from 'socket.io-client';

import WebFontFile from '../helpers/WebFontFile';

import Resultados from './resultados.js';

var text;
var horaInicio;
var votacionActiva = true;
var cartaVotada;
var votacionRealizada = false;
var cartaBlancaFinal = [];
var nombreJugador;
var numeroRonda;
var keyResultados;

export default class Votacion extends Phaser.Scene {
    constructor() {
        super({
        });
    }

    preload() {
        this.load.addFile(new WebFontFile(this.load, 'Work Sans'));
    }

    create() {
        numeroRonda = sessionStorage.getItem("numeroRonda");
        console.log("Ronda " + numeroRonda);
        votacionActiva = true;
        votacionRealizada = false;
        let self = this;
        this.socket = io('http://localhost:3000', {transports : ["websocket"] });
        horaInicio = parseInt(sessionStorage.getItem("horaInicialRondaVotacion"));
        text = this.add.text(55, 55, "60", {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
        var nombres = sessionStorage.getItem("nombresJugadores").split(",");
        var cantidadDeVotosEmitidos = 0;
       
        for(var i = 0; i < nombres.length; i++){
            if (i == sessionStorage.getItem("idJugador")) {
                nombreJugador = nombres[i];
            }
        }
        var ordenJugadoresEnRonda = sessionStorage.getItem("ordenJugadoresEnRonda").split(",");
        var cartasJugadasEnRonda = sessionStorage.getItem("cartasJugadasEnRonda").split(",");
        console.log(ordenJugadoresEnRonda);
        console.log(cartasJugadasEnRonda);
        var textoRonda = this.add.text(1150, 20, "Ronda", {fontFamily: 'sans-serif', fontSize: '15px', fontWeight: 'bold' });
        textoRonda.setText("Ronda " + numeroRonda);
        var textoJugadores = this.add.text(1150, 40, "", {fontFamily: 'sans-serif', fontSize: '15px', fontWeight: 'bold' });
        textoJugadores.setText(nombres.length + "/" + nombres.length + " restantes");
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
                        var textoGanador = self.add.text(600, 100, "Ya votaste", {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
                        cantidadDeVotosEmitidos += 1;
                        textoJugadores.setText(nombres.length - cantidadDeVotosEmitidos + "/" + nombres.length + " restantes");
                    }
                }
            }, self);
        }

        this.socket.on('votoEmitidoPorOponente', function () {
            cantidadDeVotosEmitidos += 1;
            textoJugadores.setText(nombres.length - cantidadDeVotosEmitidos + "/" + nombres.length + " restantes");
            if (cantidadDeVotosEmitidos == nombres.length - 1){
                console.log("Todos votaron");
            }
        })

        this.socket.on('votacionTerminada', function (ganadorDeRonda, cartaGanadoraDeRonda, puntosJugadores, horaInicialRondaResultados) {
            keyResultados = 'Resultados' + numeroRonda; 
            self.scene.add(keyResultados, Resultados, true);
            sessionStorage.setItem("ganadorDeRonda", ganadorDeRonda);
            sessionStorage.setItem("cartaGanadoraDeRonda", cartaGanadoraDeRonda);
            sessionStorage.setItem("puntosJugadores", puntosJugadores);
            sessionStorage.setItem("horaInicialRondaResultados", horaInicialRondaResultados);
            self.scene.stop();
            self.socket.disconnect();
            self.scene.remove();
        })

    }
    
    update() {
        var horaActual = new Date().getTime();
        var diferenciaS = (horaActual - horaInicio)/1000;
        var segundosRestantes = 60 - diferenciaS;
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