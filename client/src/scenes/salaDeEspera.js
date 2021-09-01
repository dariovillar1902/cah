import io from 'socket.io-client';

import WebFontFile from '../helpers/WebFontFile';

import Phaser from "phaser";
import Game from "../scenes/game";
var salaIniciada = false;
var menuDesplegado = false;

export default class salaDeEspera extends Phaser.Scene {
    constructor() {
        super({
            key: 'salaDeEspera'
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
        let self = this;

        this.socket = io('http://localhost:3000', {transports : ["websocket"] })

        var formularioNombre = "<form style='display: flex; flex-direction: column'><input type='text' placeholder='Ingresar nombre' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 500px;height: 70px;font-family: sans-serif;font-size: 30px;text-align: center; margin: 10px 0'></form>";
        var formularioNombre2 = "<form style='display: flex; flex-direction: column'><input type='text' placeholder='Ingresar código de sala' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 500px;height: 70px;font-family: sans-serif;font-size: 30px;text-align: center; margin: 10px 0'></form>";
        var botonConfirmar ="<form style='display: flex; flex-direction: column'><input type='button' value='Crear sala' id='botonEntrar' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 500px;height: 70px;font-family: sans-serif;font-size: 30px;text-align: center;'></form>";
        var botonConfirmar2 ="<form style='display: flex; flex-direction: column'><input type='button' value='Unirse a una sala' id='botonEntrar' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 500px;height: 70px;font-family: sans-serif;font-size: 30px;text-align: center;'></form>";
        var botonConfirmar3 ="<form style='display: flex; flex-direction: column'><input type='button' value='Opciones de juego' id='botonEntrar' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 500px;height: 70px;font-family: sans-serif;font-size: 30px;text-align: center;'></form>";
        var ingresarNombre = self.add.dom(640, 50).createFromHTML(formularioNombre);
        self.startBtn = self.add.dom(640, 150).createFromHTML(botonConfirmar).setInteractive();
        var ingresarNombre2 = self.add.dom(640, 250).createFromHTML(formularioNombre2);
        self.startBtn2 = self.add.dom(640, 350).createFromHTML(botonConfirmar2).setInteractive();
        self.startBtn.on('pointerdown', function (pointer) {
            self.socket.emit('salaCreada');
            if (salaIniciada == false){
                self.isPlayerA = true;
                var nombreJugador = ingresarNombre.node.children[0].children[0].value;
                sessionStorage.setItem("nombre", nombreJugador);
                self.socket.emit('unidoASala', nombreJugador);
                ingresarNombre2.node.children[0].style.display = 'none';
                self.startBtn2.node.children[0].style.display = 'none';
                self.startBtn.node.children[0].children[0].value = "Iniciar juego";
                salaIniciada = true;
                self.add.text(575, 325, "En la sala:", {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
            } else if (salaIniciada == true){
                self.socket.emit('iniciarJuego');
                self.socket.emit('iniciarRonda');
            }
        }, self); 
        self.startBtn2.on('pointerdown', function (pointer) {
            var nombreJugador = ingresarNombre.node.children[0].children[0].value;
            var codigoIngresadoDeSala = ingresarNombre2.node.children[0].children[0].value;
            sessionStorage.setItem("nombre", nombreJugador);
            self.socket.emit('unidoASala', nombreJugador, codigoIngresadoDeSala);
        }, self); 

        /*this.socket.on('isPlayerA', function () {
        	self.isPlayerA = true;
            console.log("Anfitrion");
            var formularioNombre = "<form style='display: flex; flex-direction: column'><input type='text' placeholder='Ingresar nombre' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 500px;height: 70px;font-family: sans-serif;font-size: 30px;text-align: center; margin: 10px 0'></form>";
            var formularioNombre2 = "<form style='display: flex; flex-direction: column'><input type='text' placeholder='Ingresar código de sala' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 500px;height: 70px;font-family: sans-serif;font-size: 30px;text-align: center; margin: 10px 0'></form>";
            var botonConfirmar ="<form style='display: flex; flex-direction: column'><input type='button' value='Crear sala' id='botonEntrar' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 500px;height: 70px;font-family: sans-serif;font-size: 30px;text-align: center;'></form>";
            var botonConfirmar2 ="<form style='display: flex; flex-direction: column'><input type='button' value='Unirse a una sala' id='botonEntrar' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 500px;height: 70px;font-family: sans-serif;font-size: 30px;text-align: center;'></form>";
            var botonConfirmar3 ="<form style='display: flex; flex-direction: column'><input type='button' value='Opciones de juego' id='botonEntrar' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 500px;height: 70px;font-family: sans-serif;font-size: 30px;text-align: center;'></form>";
            var ingresarNombre = self.add.dom(640, 50).createFromHTML(formularioNombre);
            self.startBtn = self.add.dom(640, 250).createFromHTML(botonConfirmar).setInteractive();
            var ingresarNombre2 = self.add.dom(640, 350).createFromHTML(formularioNombre2);
            self.startBtn2 = self.add.dom(640, 450).createFromHTML(botonConfirmar2).setInteractive();
            // self.startBtn3 = self.add.dom(640, 450).createFromHTML(botonConfirmar3).setInteractive();
            self.startBtn.on('pointerdown', function (pointer) {
                self.socket.emit('salaCreada');
                if (salaIniciada == false){
                    var nombreJugador = ingresarNombre.node.children[0].children[0].value;
                    sessionStorage.setItem("nombre", nombreJugador);
                    self.socket.emit('unidoASala', nombreJugador);
                    self.startBtn.node.children[0].children[0].value = "Iniciar juego";
                    salaIniciada = true;
                } else if (salaIniciada == true){
                    self.socket.emit('iniciarJuego');
                    self.socket.emit('iniciarRonda');
                }
            }, self); 
            self.startBtn2.on('pointerdown', function (pointer) {
                var nombreJugador = ingresarNombre.node.children[0].children[0].value;
                var codigoIngresadoDeSala = ingresarNombre2.node.children[0].children[0].value;
                sessionStorage.setItem("nombre", nombreJugador);
                self.socket.emit('unidoASala', nombreJugador, codigoIngresadoDeSala);
            }, self); 
        })
*/
        this.socket.on('infoSala', function (codigoSala) {
            // socket.join('sala' + codigoSala);
            if(self.isPlayerA && self.scene.isActive('salaDeEspera')) {
                self.textoInvitacion = self.add.text(425, 250, "Invita gente con el código " + codigoSala, {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
            } else if (self.scene.isActive('salaDeEspera')) {
               
            }
        })
/*
        this.socket.on('otroJugador', function () {
            if(self.isPlayerA && self.scene.isActive('salaDeEspera')) {
                console.log("Se unió otro jugador");
            } else if (self.scene.isActive('salaDeEspera')) {
                var formularioNombre = "<form style='display: flex; flex-direction: column'><input type='text' placeholder='Ingresar nombre' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 500px;height: 70px;font-family: sans-serif;font-size: 30px;text-align: center; margin: 10px 0'></form>";
                var formularioNombre2 = "<form style='display: flex; flex-direction: column'><input type='text' placeholder='Ingresar código de sala' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 500px;height: 70px;font-family: sans-serif;font-size: 30px;text-align: center; margin: 10px 0'></form>";
                var botonConfirmar ="<form style='display: flex; flex-direction: column'><input type='button' value='Crear sala' id='botonEntrar' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 500px;height: 70px;font-family: sans-serif;font-size: 30px;text-align: center;'></form>";
                var botonConfirmar2 ="<form style='display: flex; flex-direction: column'><input type='button' value='Unirse a una sala' id='botonEntrar' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 500px;height: 70px;font-family: sans-serif;font-size: 30px;text-align: center;'></form>";
                var botonConfirmar3 ="<form style='display: flex; flex-direction: column'><input type='button' value='Opciones de juego' id='botonEntrar' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 500px;height: 70px;font-family: sans-serif;font-size: 30px;text-align: center;'></form>";
                var ingresarNombre = self.add.dom(640, 50).createFromHTML(formularioNombre);
                self.startBtn = self.add.dom(640, 250).createFromHTML(botonConfirmar).setInteractive();
                var ingresarNombre2 = self.add.dom(640, 350).createFromHTML(formularioNombre2);
                self.startBtn2 = self.add.dom(640, 450).createFromHTML(botonConfirmar2).setInteractive();
                self.startBtn.on('pointerdown', function (pointer) {
                    var nombreJugador = ingresarNombre.node.children[0].children[0].value;
                    sessionStorage.setItem("nombre", nombreJugador);
                    self.socket.emit('unidoASala', nombreJugador);
                }, self); 
                self.startBtn2.on('pointerdown', function (pointer) {
                    var nombreJugador = ingresarNombre.node.children[0].children[0].value;
                    var codigoIngresadoDeSala = ingresarNombre2.node.children[0].children[0].value;
                    sessionStorage.setItem("nombre", nombreJugador);
                    self.socket.emit('unidoASala', nombreJugador, codigoIngresadoDeSala);
                }, self); 
            }
        })
*/
        
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
                
                

        this.socket.on('unidoASala', function (nombresJugadores, codigoIngresadoDeSala, jugadorAutorizado) {
            var i = nombresJugadores.length;
            self.add.text(400, 350 + 50*(i), nombresJugadores[i-1], {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
            if (jugadorAutorizado){
                console.log('Te uniste a la sala ' + codigoIngresadoDeSala);
            } else {
                console.log('Código incorrecto, intenta nuevamente');
            }
        })

        this.socket.on('iniciarJuego', function (nombresJugadores, seleccionCartasInicial) {
            for(var i = 0; i < nombresJugadores.length; i++){
                if (nombresJugadores[i] == sessionStorage.getItem("nombre")){
                    sessionStorage.setItem("idJugador", i);
                }
            }
            sessionStorage.setItem("nombresJugadores", nombresJugadores);
            sessionStorage.setItem("seleccionCartasInicial", seleccionCartasInicial);
            self.scene.add('Game1', Game, true);
            self.scene.stop();
        })

        this.socket.on('iniciarRonda', function (indiceCartaNegra, horaInicial, numeroRonda) {
                sessionStorage.setItem("numeroCartaNegra", indiceCartaNegra);
                sessionStorage.setItem("horaInicio", horaInicial);
                sessionStorage.setItem("numeroRonda", numeroRonda);
                console.log("Instancia 1 iniciada");
        })
        
    }
    
    update() {

    }


}