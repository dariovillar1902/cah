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
var menuDesplegado = false;

export default class Votacion extends Phaser.Scene {
    constructor() {
        super({
        });
    }

    preload() {
        this.load.addFile(new WebFontFile(this.load, 'Work Sans'));
        this.load.html("iconoauto", "../src/assets/iconoauto.html");
        this.load.html("iconoluna", "../src/assets/iconoluna.html");
        this.load.html("iconomenu", "../src/assets/iconomenu.html");
        this.load.html("iconomezcla", "../src/assets/iconomezcla.html");
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
        if (nombres.length <= 4){
            var cartaNegraFinal = this.add.dom(225, 375).createFromHTML(cartaNegraElegida).setScale(0.7, 0.7); 
        } else {
            var cartaNegraFinal = this.add.dom(225, 175).createFromHTML(cartaNegraElegida).setScale(0.7, 0.7);
        }
        cartaNegraFinal.node.children[0].children[0].innerText = sessionStorage.getItem("textoCartaNegra");
        self.menuJuego = self.add.dom(1240, 740).createFromCache('iconomenu').setInteractive();
        self.modoClaro = self.add.dom(1240, 560).createFromCache('iconoluna').setInteractive();
        self.mezclarCartas = self.add.dom(1240, 620).createFromCache('iconomezcla').setInteractive();
        self.modoAuto = self.add.dom(1240, 680).createFromCache('iconoauto').setInteractive(); 
        
        self.modoClaro.on('pointerdown', function (pointer) {
            console.log("Modo claro activado");
        }, self); 
        self.mezclarCartas.on('pointerdown', function (pointer) {
            console.log("Mezcla de cartas activada");
        }, self); 
        self.modoAuto.on('pointerdown', function (pointer) {
            console.log("Modo automático activado");
        }, self);
                self.menuJuego.on('pointerdown', function (pointer) {
                    console.log("Menú activado");
                    if (menuDesplegado === false){
                        menuDesplegado = true;
                        self.modoClaro.node.children[2].style.visibility = "visible";
                        self.modoClaro.setInteractive();
                        self.mezclarCartas.node.children[2].style.visibility = "visible";
                        self.mezclarCartas.setInteractive();
                        self.modoAuto.node.children[2].style.visibility = "visible"; 
                        self.modoAuto.setInteractive();
                    } else {
                        menuDesplegado = false;
                        self.modoClaro.node.children[2].style.visibility = "hidden";
                        self.mezclarCartas.node.children[2].style.visibility = "hidden";
                        self.modoAuto.node.children[2].style.visibility = "hidden";
                        self.modoClaro.disableInteractive();
                        self.mezclarCartas.disableInteractive();
                        self.modoAuto.disableInteractive();
                    }
                }, self);
                
        for (var i = 0; i < ordenJugadoresEnRonda.length; i++){
            var cartaBlanca = `<div style='
            background-color: rgba(255, 255, 255, 1);
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
            var cartaDeJugador = `<div style='
            background-color: rgba(255, 255, 255, 0.5);
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
            console.log(Math.trunc(i/4));
            console.log(375-(200*Math.trunc(i/4)));
            if (nombres.length <= 4){
                if (cartasJugadasEnRonda[i] == sessionStorage.getItem("textoCartaElegida")) {
                    cartaBlancaFinal[i] = this.add.dom(425 + i*200, 375).createFromHTML(cartaDeJugador).setScale(0.7, 0.7);
                } else {
                    cartaBlancaFinal[i] = this.add.dom(425 + i*200, 375).createFromHTML(cartaBlanca).setScale(0.7, 0.7).setInteractive();
                }
            } else {
                if (cartasJugadasEnRonda[i] == sessionStorage.getItem("textoCartaElegida")) {
                    cartaBlancaFinal[i] = this.add.dom(425 + (i-4*Math.trunc(i/4))*200, 175+(250*Math.trunc(i/4))).createFromHTML(cartaDeJugador).setScale(0.7, 0.7);
                } else {
                    cartaBlancaFinal[i] = this.add.dom(425 + (i-4*Math.trunc(i/4))*200, 175+(250*Math.trunc(i/4))).createFromHTML(cartaBlanca).setScale(0.7, 0.7).setInteractive();
                }
            }
            
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