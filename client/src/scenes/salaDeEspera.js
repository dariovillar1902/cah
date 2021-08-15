import io from 'socket.io-client';

import WebFontFile from '../helpers/WebFontFile';

import Phaser from "phaser";

var salaIniciada = false;

export default class salaDeEspera extends Phaser.Scene {
    constructor() {
        super({
            key: 'salaDeEspera'
        });
    }

    preload() {
        this.load.addFile(new WebFontFile(this.load, 'Work Sans'));
    }

    create() {
        let self = this;

        this.socket = io('http://localhost:3000', {transports : ["websocket"] })

        this.socket.on('isPlayerA', function () {
        	self.isPlayerA = true;
            console.log("Anfitrion");
            var formularioNombre = "<form style='display: flex; flex-direction: column'><input type='text' placeholder='Ingresar nombre' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 500px;height: 70px;font-family: sans-serif;font-size: 30px;text-align: center; margin: 10px 0'></form>";
            var botonConfirmar ="<form style='display: flex; flex-direction: column'><input type='button' value='Crear sala' id='botonEntrar' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 500px;height: 70px;font-family: sans-serif;font-size: 30px;text-align: center;'></form>";
            var ingresarNombre = self.add.dom(640, 150).createFromHTML(formularioNombre);
            self.startBtn = self.add.dom(640, 250).createFromHTML(botonConfirmar).setInteractive();
            self.startBtn.on('pointerdown', function (pointer) {
                if (salaIniciada == false){
                    var nombreJugador = ingresarNombre.node.children[0].children[0].value;
                    sessionStorage.setItem("nombre", nombreJugador);
                    self.socket.emit('unidoASala', nombreJugador);
                    self.startBtn.node.children[0].children[0].value = "Iniciar juego";
                    salaIniciada = true;
                } else if (salaIniciada == true){
                    self.socket.emit('iniciarJuego');
                }
            }, self); 
        })

        this.socket.on('otroJugador', function () {
            if(self.isPlayerA && self.scene.isActive('salaDeEspera')) {
                console.log("Se unió otro jugador");
            } else if (self.scene.isActive('salaDeEspera')) {
                var formularioNombre = "<form style='display: flex; flex-direction: column'><input type='text' placeholder='Ingresar nombre' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 500px;height: 70px;font-family: sans-serif;font-size: 30px;text-align: center; margin: 10px 0'></form>";
                var botonConfirmar ="<form style='display: flex; flex-direction: column'><input type='button' value='Entrar a sala' id='botonEntrar' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 500px;height: 70px;font-family: sans-serif;font-size: 30px;text-align: center;'></form>";
                var ingresarNombre = self.add.dom(640, 150).createFromHTML(formularioNombre);
                self.startBtn = self.add.dom(640, 250).createFromHTML(botonConfirmar).setInteractive();
                self.startBtn.on('pointerdown', function (pointer) {
                    var nombreJugador = ingresarNombre.node.children[0].children[0].value;
                    sessionStorage.setItem("nombre", nombreJugador);
                    self.socket.emit('unidoASala', nombreJugador);
                }, self); 
            }
        })

        self.add.text(400, 350, "En la sala", {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });

        this.socket.on('unidoASala', function (nombresJugadores) {
            var i = nombresJugadores.length;
            self.add.text(400, 350 + 50*(i), nombresJugadores[i-1], {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
        })

        this.socket.on('iniciarJuego', function (nombresJugadores, indiceCartaNegra, horaInicial, seleccionCartasInicial) {
            self.scene.switch('Game');
            for(var i = 0; i < nombresJugadores.length; i++){
                if (nombresJugadores[i] == sessionStorage.getItem("nombre")){
                    sessionStorage.setItem("idJugador", i);
                }
            }
            sessionStorage.setItem("nombresJugadores", nombresJugadores);
            sessionStorage.setItem("numeroCartaNegra", indiceCartaNegra);
            sessionStorage.setItem("horaInicio", horaInicial);
            sessionStorage.setItem("seleccionCartasInicial", seleccionCartasInicial);
            self.scene.stop();
        })
        
    }
    
    update() {
    }


}