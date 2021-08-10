import Card from '../helpers/card.js';

import Zone from '../helpers/zone.js';

import io from 'socket.io-client';

import Dealer from '../helpers/dealer.js';

import WebFontFile from '../helpers/WebFontFile';

import Game from '../scenes/game.js';

import Phaser from "phaser";

var button;
var esAnfitrion = false;
var salaIniciada = false;

function actionOnClick(){
    console.log('Boton apretado');
    Phaser.scene.start('Game');   
}

export default class salaDeEspera extends Phaser.Scene {
    constructor() {
        super({
            key: 'salaDeEspera'
        });
    }

    preload() {
        this.load.image('cyanCardFront', 'src/assets/CyanCardFront.png');
        this.load.html('cartaNegra', 'src/assets/cartanegra.html');
        this.load.addFile(new WebFontFile(this.load, 'Work Sans'));
    }

    create() {
        let self = this;

        this.socket = io('http://localhost:3000', {transports : ["websocket"] })

        this.socket.on('connect', function () {
        	console.log('Connected!');
        });

        this.socket.on('isPlayerA', function (anfitrion) {
        	self.isPlayerA = true;
            console.log("Anfitrion");
            var formularioNombre = "<form style='display: flex; flex-direction: column'><input type='text' placeholder='Ingresar nombre' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 500px;height: 70px;font-family: sans-serif;font-size: 30px;text-align: center; margin: 10px 0'></form>";
            var botonConfirmar ="<form style='display: flex; flex-direction: column'><input type='button' value='Crear sala' id='botonEntrar' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 500px;height: 70px;font-family: sans-serif;font-size: 30px;text-align: center;'></form>";
            var ingresarNombre = self.add.dom(640, 150).createFromHTML(formularioNombre);
            self.startBtn = self.add.dom(640, 250).createFromHTML(botonConfirmar).setInteractive();
            self.startBtn.on('pointerdown', function (pointer) {
                if (salaIniciada == false){
                    var nombreJugador = ingresarNombre.node.children[0].children[0].value;
                    self.socket.emit('unidoASala', nombreJugador);
                    self.startBtn.node.children[0].children[0].value = "Iniciar juego";
                    salaIniciada = true;
                } else if (salaIniciada == true){
                    self.socket.emit('iniciarJuego');
                }
            }, self); 
        })

        this.socket.on('otroJugador', function () {
            if(self.isPlayerA) {
                console.log("Se unió otro jugador");
            } else {
                var formularioNombre = "<form style='display: flex; flex-direction: column'><input type='text' placeholder='Ingresar nombre' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 500px;height: 70px;font-family: sans-serif;font-size: 30px;text-align: center; margin: 10px 0'></form>";
                var botonConfirmar ="<form style='display: flex; flex-direction: column'><input type='button' value='Entrar a sala' id='botonEntrar' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 500px;height: 70px;font-family: sans-serif;font-size: 30px;text-align: center;'></form>";
                var ingresarNombre = self.add.dom(640, 150).createFromHTML(formularioNombre);
                self.startBtn = self.add.dom(640, 250).createFromHTML(botonConfirmar).setInteractive();
                self.startBtn.on('pointerdown', function (pointer) {
                    var nombreJugador = ingresarNombre.node.children[0].children[0].value;
                    self.socket.emit('unidoASala', nombreJugador);
                }, self); 
            }
        })

        self.add.text(400, 350, "En la sala", {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });

        this.socket.on('unidoASala', function (nombresJugadores) {
            var i = nombresJugadores.length;
            self.add.text(400, 350 + 50*(i), nombresJugadores[i-1], {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
            // for (var i = 0; i < nombresJugadores.length; i++) {
                // self.add.text(640, 350 + 50*(i+1), nombresJugadores[i], {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
            // }
        })

        this.socket.on('iniciarJuego', function (nombresJugadores) {
            console.log(nombresJugadores);
            self.scene.start('Game');
        })

        // this.startBtn = this.add.sprite(100, 100, 'cyanCardFront').setScale(0.3, 0.3).setInteractive();

    //this.startBtn.on('pointerover', function (event) { /* Do something when the mouse enters */ });
    //this.startBtn.on('pointerout', function (event) { /* Do something when the mouse exits. */ });
// Start game on click.
        
        // document.getElementById("botonEntrar").onclick = function(){
           // console.log('Boton apretado');
            //this.scene.start('Game');
        //}
        //button = this.add.button(95, 400, 'cyanCardFront', actionOnClick, this, 2, 1, 0);
       // var cartaNegraFinal = this.add.dom(640, 380).createFromHTML(formularioNombre).setScale(0.7, 0.7);
        //var clickBoton = cartaNegraFinal.node.children[0].children[0].children[1];
        //this.clickBoton.on('pointerdown', function(){
          //  console.log('Hola');
        //});
        //console.log(clickBoton);
        
        
    }
    
    update() {
    }


}