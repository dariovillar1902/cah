import io from 'socket.io-client';
import WebFontFile from '../helpers/WebFontFile';
import Game from "../scenes/game";
import finJuego from './finjuego.js';

var text;
var horaInicio;
var resultadosActivos = true;
var textosNombres = [];
var textosPuntos = [];
var jugadorGanador;
var numeroRonda;
var keyJuego;
var menuDesplegado = false;
var modoAuto;
var modoClaro;
var terminoJuego = false;
var ganadorJuego;

export default class Resultados extends Phaser.Scene {
    constructor() {
        super({
            key: 'Resultados'
        });
    }

    preload() {
        this.load.addFile(new WebFontFile(this.load, 'Work Sans'));
        this.load.html("iconoauto", "iconoauto.html");
        this.load.html("iconoluna", "iconoluna.html");
        this.load.html("iconomenu", "iconomenu.html");
        this.load.html("iconomezcla", "iconomezcla.html");
    }

    create() {
        numeroRonda = sessionStorage.getItem("numeroRonda");
        modoAuto = sessionStorage.getItem("modoAuto");
        modoClaro = sessionStorage.getItem("modoClaro");
        resultadosActivos = true;
        let self = this;
        this.socket = io.connect();
        jugadorGanador = sessionStorage.getItem("ganadorDeRonda");
        var textoRonda = this.add.text(1150, 20, "Ronda", { fontFamily: 'sans-serif', fontSize: '15px', fontWeight: 'bold' });
        textoRonda.setText("Ronda " + numeroRonda);
        text = this.add.text(55, 55, "10", { fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
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
        this.add.text(475, 100, "Ganó esta ronda: ", { fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
        var nombreGanador = this.add.text(725, 100, "a", { fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
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
        var xPuntuacion;
        switch (nombres.length) { // variable de la que dependen los casos, puede ser número o texto
            case 0:
                xPuntuacion = 700;
                break;
            case 1:
                xPuntuacion = 600;
                break;
            case 2:
                xPuntuacion = 500;
                break;
            case 3:
                xPuntuacion = 400;
                break;
            case 4:
                xPuntuacion = 300;
                break;
            case 5:
                xPuntuacion = 200;
                break;
            case 6:
                xPuntuacion = 100;
                break;

            default:
                xPuntuacion = 100;
                break;
        }
        for (var i = 0; i < nombres.length; i++) {
            if (puntos[i] === '3') {
                terminoJuego = true;
                ganadorJuego = nombres[i];
            }
            textosNombres[i] = this.add.text(xPuntuacion + (i - 6 * Math.trunc(i / 6)) * 200, 525 + (100 * Math.trunc(i / 6)), nombres[i], { fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
            textosPuntos[i] = this.add.text(xPuntuacion + 25 + (i - 6 * Math.trunc(i / 6)) * 200, 575 + (100 * Math.trunc(i / 6)), puntos[i], { fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
        }
        horaInicio = parseInt(sessionStorage.getItem("horaInicialRondaResultados"));
        self.menuJuego = self.add.dom(1240, 740).createFromCache('iconomenu').setInteractive();
        self.modoClaro = self.add.dom(1240, 620).createFromCache('iconoluna').setInteractive();
        self.modoAuto = self.add.dom(1240, 680).createFromCache('iconoauto').setInteractive();
        self.modoClaro.on('pointerdown', function () {
            if (modoClaro == 'true') {
                modoClaro = 'false';
                sessionStorage.setItem("modoClaro", modoClaro);
                self.modoClaro.node.children[2].style.backgroundColor = "black";
                self.modoClaro.node.children[2].style.color = "white";
            } else {
                modoClaro = 'true';
                sessionStorage.setItem("modoClaro", modoClaro);
                self.modoClaro.node.children[2].style.backgroundColor = "white";
                self.modoClaro.node.children[2].style.color = "black";
            }
        }, self);
        self.modoAuto.on('pointerdown', function () {
            if (modoAuto == 'true') {
                modoAuto = 'false';
                sessionStorage.setItem("modoAuto", modoAuto);
                self.modoAuto.node.children[2].style.backgroundColor = "black";
                self.modoAuto.node.children[2].style.color = "white";
            } else {
                modoAuto = 'true';
                sessionStorage.setItem("modoAuto", modoAuto);
                self.modoAuto.node.children[2].style.backgroundColor = "white";
                self.modoAuto.node.children[2].style.color = "black";
            }
        }, self);
        self.menuJuego.on('pointerdown', function () {
            if (menuDesplegado === false) {
                menuDesplegado = true;
                self.modoClaro.node.children[2].style.visibility = "visible";
                self.modoClaro.setInteractive();
                self.modoAuto.node.children[2].style.visibility = "visible";
                self.modoAuto.setInteractive();
                if (modoClaro == 'true') {
                    self.modoClaro.node.children[2].style.backgroundColor = "white";
                    self.modoClaro.node.children[2].style.color = "black";
                } else {
                    self.modoClaro.node.children[2].style.backgroundColor = "black";
                    self.modoClaro.node.children[2].style.color = "white";
                }
                if (modoAuto == 'true') {
                    self.modoAuto.node.children[2].style.backgroundColor = "white";
                    self.modoAuto.node.children[2].style.color = "black";
                } else {
                    self.modoAuto.node.children[2].style.backgroundColor = "black";
                    self.modoAuto.node.children[2].style.color = "white";
                }
            } else {
                menuDesplegado = false;
                self.modoClaro.node.children[2].style.visibility = "hidden";
                self.modoAuto.node.children[2].style.visibility = "hidden";
                self.modoClaro.disableInteractive();
                self.modoAuto.disableInteractive();
            }
        }, self);

        this.socket.on('iniciarRonda', function (indiceCartaNegra, horaInicial, numeroRonda) {
            sessionStorage.setItem("numeroCartaNegra", indiceCartaNegra);
            sessionStorage.setItem("horaInicio", horaInicial);
            sessionStorage.setItem("numeroRonda", numeroRonda);
            keyJuego = 'Game' + sessionStorage.getItem("numeroRonda");
            self.scene.add(keyJuego, Game, true);
            self.scene.stop();
            self.socket.disconnect();
            self.scene.remove();
        })

        this.socket.on('finJuego', function (ganadorJuego) {
            sessionStorage.setItem("ganadorJuego", ganadorJuego);
            self.scene.add('finJuego', finJuego, true);
            self.scene.stop();
            self.socket.disconnect();
            self.scene.remove();
        })

    }

    update() {
        var horaActual = new Date().getTime();
        var diferenciaS = (horaActual - horaInicio) / 1000;
        var segundosRestantes = 10 - diferenciaS;
        if (segundosRestantes >= 10) {
            text.setText(segundosRestantes.toString().substr(0, 2));
        } else if (segundosRestantes > 0 && segundosRestantes < 10) {
            text.setText(segundosRestantes.toString().substr(0, 1));
        } else {
            if (resultadosActivos == true && terminoJuego == false) {
                this.socket.emit('iniciarRonda');
                resultadosActivos = false;
            } else if (resultadosActivos == true && terminoJuego == true) {
                this.socket.emit('finJuego', ganadorJuego);
                resultadosActivos = false;
            }

        }
    }


}