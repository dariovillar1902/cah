import Card from '../helpers/card.js';

import Zone from '../helpers/zone.js';

import io from 'socket.io-client';

import Dealer from '../helpers/dealer.js';

import WebFontFile from '../helpers/WebFontFile';

import Game from '../scenes/game.js';

import Phaser from "phaser";

var button;

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
        var formularioNombre = "<form style='display: flex; flex-direction: column'><input type='text' placeholder='Ingresar nombre' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 500px;height: 70px;font-family: sans-serif;font-size: 30px;text-align: center; margin: 10px 0'></form>";
        var botonConfirmar ="<form style='display: flex; flex-direction: column'><input type='button' value='Entrar a sala' id='botonEntrar' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 500px;height: 70px;font-family: sans-serif;font-size: 30px;text-align: center;'></form>";
        this.add.dom(640, 350).createFromHTML(formularioNombre);
        this.startBtn = this.add.dom(640, 450).createFromHTML(botonConfirmar).setInteractive();
        
        // this.startBtn = this.add.sprite(100, 100, 'cyanCardFront').setScale(0.3, 0.3).setInteractive();

    //this.startBtn.on('pointerover', function (event) { /* Do something when the mouse enters */ });
    //this.startBtn.on('pointerout', function (event) { /* Do something when the mouse exits. */ });
    this.startBtn.on('pointerdown', function (pointer) {

        this.scene.start('Game');

    }, this); // Start game on click.
        
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
        this.socket = io('http://localhost:3000', {transports : ["websocket"] })
        this.socket.on('connect', function () {
        	console.log('Connected!');
        });
        this.socket.on('isPlayerA', function () {
        	self.isPlayerA = true;
        })
        
    }
    
    update() {
    }


}