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
var modoAuto;
var modoClaro;

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
        modoAuto = sessionStorage.getItem("modoAuto");
        modoClaro = sessionStorage.getItem("modoClaro");
        votacionActiva = true;
        votacionRealizada = false;
        let self = this;
        this.socket = io.connect();
        horaInicio = parseInt(sessionStorage.getItem("horaInicialRondaVotacion"));
        text = this.add.text(55, 55, "60", { fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
        var nombres = sessionStorage.getItem("nombresJugadores").split(",");
        var cantidadDeVotosEmitidos = 0;

        for (var i = 0; i < nombres.length; i++) {
            if (i == sessionStorage.getItem("idJugador")) {
                nombreJugador = nombres[i];
            }
        }
        var ordenJugadoresEnRonda = sessionStorage.getItem("ordenJugadoresEnRonda").split(",");
        var cartasJugadasEnRonda = sessionStorage.getItem("cartasJugadasEnRonda").split(",");
        var textoRonda = this.add.text(1150, 20, "Ronda", { fontFamily: 'sans-serif', fontSize: '15px', fontWeight: 'bold' });
        textoRonda.setText("Ronda " + numeroRonda);
        var textoJugadores = this.add.text(1150, 40, "", { fontFamily: 'sans-serif', fontSize: '15px', fontWeight: 'bold' });
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
        if (nombres.length <= 4) {
            var cartaNegraFinal = this.add.dom(225, 375).createFromHTML(cartaNegraElegida).setScale(0.7, 0.7);
        } else {
            var cartaNegraFinal = this.add.dom(225, 175).createFromHTML(cartaNegraElegida).setScale(0.7, 0.7);
        }
        cartaNegraFinal.node.children[0].children[0].innerText = sessionStorage.getItem("textoCartaNegra");
        self.menuJuego = self.add.dom(1240, 740).createFromCache('iconomenu').setInteractive();
        self.modoClaro = self.add.dom(1240, 620).createFromCache('iconoluna').setInteractive();
        self.modoAuto = self.add.dom(1240, 680).createFromCache('iconoauto').setInteractive();
        self.modoClaro.on('pointerdown', function (pointer) {
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
        self.modoAuto.on('pointerdown', function (pointer) {
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
        self.menuJuego.on('pointerdown', function (pointer) {
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

        for (var i = 0; i < ordenJugadoresEnRonda.length; i++) {
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
            if (nombres.length <= 4) {
                if (cartasJugadasEnRonda[i] == sessionStorage.getItem("textoCartaElegida")) {
                    cartaBlancaFinal[i] = this.add.dom(425 + i * 200, 375).createFromHTML(cartaDeJugador).setScale(0.7, 0.7);
                } else {
                    cartaBlancaFinal[i] = this.add.dom(425 + i * 200, 375).createFromHTML(cartaBlanca).setScale(0.7, 0.7).setInteractive();
                }
            } else {
                if (cartasJugadasEnRonda[i] == sessionStorage.getItem("textoCartaElegida")) {
                    cartaBlancaFinal[i] = this.add.dom(425 + (i - 4 * Math.trunc(i / 4)) * 200, 175 + (250 * Math.trunc(i / 4))).createFromHTML(cartaDeJugador).setScale(0.7, 0.7);
                } else {
                    cartaBlancaFinal[i] = this.add.dom(425 + (i - 4 * Math.trunc(i / 4)) * 200, 175 + (250 * Math.trunc(i / 4))).createFromHTML(cartaBlanca).setScale(0.7, 0.7).setInteractive();
                }
            }

            cartaBlancaFinal[i].node.children[0].children[0].innerText = cartasJugadasEnRonda[i];

            cartaBlancaFinal[i].on('pointerdown', function (pointer) {
                if (pointer.downElement.innerText !== "") {
                    if (votacionRealizada == false) {
                        cartaVotada = pointer.downElement.innerText;
                        votacionRealizada = true;
                        self.socket.emit('votoEmitido', cartaVotada, nombreJugador);
                        var textoGanador = self.add.text(600, 600, "Ya votaste", { fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
                        cantidadDeVotosEmitidos += 1;
                        textoJugadores.setText(nombres.length - cantidadDeVotosEmitidos + "/" + nombres.length + " restantes");
                    }
                }
            }, self);
        }

        this.socket.on('votoEmitidoPorOponente', function () {
            cantidadDeVotosEmitidos += 1;
            textoJugadores.setText(nombres.length - cantidadDeVotosEmitidos + "/" + nombres.length + " restantes");
        })

        self.input.keyboard.on('keydown-' + 'ONE', function (event) {
            if (ordenJugadoresEnRonda[0] && votacionRealizada == false && ordenJugadoresEnRonda[0] !== nombreJugador) {
                cartaVotada = self.children.list[7].node.children[0].children[0].innerText;
                self.socket.emit('votoEmitido', cartaVotada, nombreJugador);
                var textoGanador = self.add.text(600, 600, "Ya votaste", { fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
                cantidadDeVotosEmitidos += 1;
                textoJugadores.setText(nombres.length - cantidadDeVotosEmitidos + "/" + nombres.length + " restantes");
                votacionRealizada = true;
            }
        });

        self.input.keyboard.on('keydown-' + 'TWO', function (event) {
            if (ordenJugadoresEnRonda[1] && votacionRealizada == false && ordenJugadoresEnRonda[1] !== nombreJugador) {
                cartaVotada = self.children.list[8].node.children[0].children[0].innerText;
                self.socket.emit('votoEmitido', cartaVotada, nombreJugador);
                var textoGanador = self.add.text(600, 600, "Ya votaste", { fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
                cantidadDeVotosEmitidos += 1;
                textoJugadores.setText(nombres.length - cantidadDeVotosEmitidos + "/" + nombres.length + " restantes");
                votacionRealizada = true;
            }
        });

        self.input.keyboard.on('keydown-' + 'THREE', function (event) {
            if (ordenJugadoresEnRonda[2] && votacionRealizada == false && ordenJugadoresEnRonda[2] !== nombreJugador) {
                cartaVotada = self.children.list[9].node.children[0].children[0].innerText;
                self.socket.emit('votoEmitido', cartaVotada, nombreJugador);
                var textoGanador = self.add.text(600, 600, "Ya votaste", { fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
                cantidadDeVotosEmitidos += 1;
                textoJugadores.setText(nombres.length - cantidadDeVotosEmitidos + "/" + nombres.length + " restantes");
                votacionRealizada = true;
            }
        });

        self.input.keyboard.on('keydown-' + 'FOUR', function (event) {
            if (ordenJugadoresEnRonda[3] && votacionRealizada == false && ordenJugadoresEnRonda[3] !== nombreJugador) {
                cartaVotada = self.children.list[10].node.children[0].children[0].innerText;
                self.socket.emit('votoEmitido', cartaVotada, nombreJugador);
                var textoGanador = self.add.text(600, 600, "Ya votaste", { fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
                cantidadDeVotosEmitidos += 1;
                textoJugadores.setText(nombres.length - cantidadDeVotosEmitidos + "/" + nombres.length + " restantes");
                votacionRealizada = true;
            }
        });

        self.input.keyboard.on('keydown-' + 'FIVE', function (event) {
            if (ordenJugadoresEnRonda[4] && votacionRealizada == false && ordenJugadoresEnRonda[4] !== nombreJugador) {
                cartaVotada = self.children.list[11].node.children[0].children[0].innerText;
                self.socket.emit('votoEmitido', cartaVotada, nombreJugador);
                var textoGanador = self.add.text(600, 600, "Ya votaste", { fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
                cantidadDeVotosEmitidos += 1;
                textoJugadores.setText(nombres.length - cantidadDeVotosEmitidos + "/" + nombres.length + " restantes");
                votacionRealizada = true;
            }
        });

        self.input.keyboard.on('keydown-' + 'SIX', function (event) {
            if (ordenJugadoresEnRonda[5] && votacionRealizada == false && ordenJugadoresEnRonda[5] !== nombreJugador) {
                cartaVotada = self.children.list[12].node.children[0].children[0].innerText;
                self.socket.emit('votoEmitido', cartaVotada, nombreJugador);
                var textoGanador = self.add.text(600, 600, "Ya votaste", { fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
                cantidadDeVotosEmitidos += 1;
                textoJugadores.setText(nombres.length - cantidadDeVotosEmitidos + "/" + nombres.length + " restantes");
                votacionRealizada = true;
            }
        });

        self.input.keyboard.on('keydown-' + 'SEVEN', function (event) {
            if (ordenJugadoresEnRonda[6] && votacionRealizada == false && ordenJugadoresEnRonda[6] !== nombreJugador) {
                cartaVotada = self.children.list[13].node.children[0].children[0].innerText;
                self.socket.emit('votoEmitido', cartaVotada, nombreJugador);
                var textoGanador = self.add.text(600, 600, "Ya votaste", { fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
                cantidadDeVotosEmitidos += 1;
                textoJugadores.setText(nombres.length - cantidadDeVotosEmitidos + "/" + nombres.length + " restantes");
                votacionRealizada = true;
            }
        });

        self.input.keyboard.on('keydown-' + 'EIGHT', function (event) {
            if (ordenJugadoresEnRonda[7] && votacionRealizada == false && ordenJugadoresEnRonda[7] !== nombreJugador) {
                cartaVotada = self.children.list[14].node.children[0].children[0].innerText;
                self.socket.emit('votoEmitido', cartaVotada, nombreJugador);
                var textoGanador = self.add.text(600, 600, "Ya votaste", { fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
                cantidadDeVotosEmitidos += 1;
                textoJugadores.setText(nombres.length - cantidadDeVotosEmitidos + "/" + nombres.length + " restantes");
                votacionRealizada = true;
            }
        });

        self.input.keyboard.on('keydown-' + 'NINE', function (event) {
            if (ordenJugadoresEnRonda[8] && votacionRealizada == false && ordenJugadoresEnRonda[8] !== nombreJugador) {
                cartaVotada = self.children.list[15].node.children[0].children[0].innerText;
                self.socket.emit('votoEmitido', cartaVotada, nombreJugador);
                var textoGanador = self.add.text(600, 600, "Ya votaste", { fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
                cantidadDeVotosEmitidos += 1;
                textoJugadores.setText(nombres.length - cantidadDeVotosEmitidos + "/" + nombres.length + " restantes");
                votacionRealizada = true;
            }
        });

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

        if (modoAuto == 'true' && votacionRealizada == false) {
            var indiceDeCartaVotadaAuto = Math.floor(Math.random() * (ordenJugadoresEnRonda.length));
            while (ordenJugadoresEnRonda[indiceDeCartaVotadaAuto] === nombreJugador) {
                indiceDeCartaVotadaAuto = Math.floor(Math.random() * (ordenJugadoresEnRonda.length));
            }
            for (var i = 0; i < ordenJugadoresEnRonda.length; i++) {
                if (self.children.list[7 + i].input) {
                    self.children.list[7 + i].input.enabled = false;
                }
                if (i === indiceDeCartaVotadaAuto) {
                    cartaVotada = self.children.list[7 + i].node.children[0].children[0].innerText;
                    self.socket.emit('votoEmitido', cartaVotada, nombreJugador);
                    var textoGanador = self.add.text(600, 600, "Voto automático", { fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
                    cantidadDeVotosEmitidos += 1;
                    textoJugadores.setText(nombres.length - cantidadDeVotosEmitidos + "/" + nombres.length + " restantes");
                }
            }
            votacionRealizada = true;
        }

    }

    update() {
        var horaActual = new Date().getTime();
        var diferenciaS = (horaActual - horaInicio) / 1000;
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