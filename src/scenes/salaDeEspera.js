import io from 'socket.io-client';

import WebFontFile from '../helpers/WebFontFile';

import Phaser from "phaser";
import Game from "../scenes/game";
import Opciones from "../scenes/opciones";
const path = require('path');

var salaIniciada = false;
var menuDesplegado = false;
var modoAuto;
var modoClaro;
var nombreIngresado = false;
var inicioJuego;
const PORT = process.env.PORT || 8080;

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

        this.socket = io(PORT, {transports : ["websocket"] })
        inicioJuego = false;
        
        this.socket.on('isPlayerA', function () {
        	self.isPlayerA = true;
            console.log("Anfitrion");
            var formularioNombre = "<div style='display: flex; flex-direction: column'><input type='text' placeholder='Ingresar nombre' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 500px;height: 70px;font-family: sans-serif;font-size: 30px;text-align: center; margin: 10px 0'></div>";
            var botonConfirmar ="<div style='display: flex; flex-direction: column'><input type='button' value='Crear sala' id='botonEntrar' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 500px;height: 70px;font-family: sans-serif;font-size: 30px;text-align: center;'></div>";
            // var botonConfirmar2 ="<form style='display: flex; flex-direction: column'><input type='button' value='Unirse a una sala' id='botonEntrar' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 500px;height: 70px;font-family: sans-serif;font-size: 30px;text-align: center;'></form>";
            var botonConfirmar2 ="<div style='display: flex; flex-direction: column'><input type='button' value='Opciones de juego' id='botonEntrar' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 500px;height: 70px;font-family: sans-serif;font-size: 30px;text-align: center;'></div>";
            var ingresarNombre = self.add.dom(640, 50).createFromHTML(formularioNombre);
            self.startBtn = self.add.dom(640, 150).createFromHTML(botonConfirmar).setInteractive();
            self.startBtn2 = self.add.dom(640, 250).createFromHTML(botonConfirmar2).setInteractive();
            self.scene.add('Opciones', Opciones, false);
            // self.startBtn3 = self.add.dom(640, 450).createFromHTML(botonConfirmar3).setInteractive();
            self.startBtn.on('pointerdown', function (pointer) {
                if (salaIniciada == false){
                    var nombreJugador = ingresarNombre.node.children[0].children[0].value;
                    sessionStorage.setItem("nombre", nombreJugador);
                    self.socket.emit('unidoASala', nombreJugador);
                    self.startBtn.node.children[0].children[0].value = "Iniciar juego";
                    salaIniciada = true;
                } else if (salaIniciada == true){
                    self.socket.emit('iniciarJuego');
                    self.socket.emit('iniciarRonda');
                    salaIniciada = false;
                }
            }, self); 
            self.startBtn2.on('pointerdown', function (pointer) {
                self.scene.switch('Opciones');
            }, self); 
            self.input.keyboard.on('keydown-' + 'ENTER', function (event) {
                if (salaIniciada == false){
                    var nombreJugador = ingresarNombre.node.children[0].children[0].value;
                    sessionStorage.setItem("nombre", nombreJugador);
                    self.socket.emit('unidoASala', nombreJugador);
                    self.startBtn.node.children[0].children[0].value = "Iniciar juego";
                    salaIniciada = true;
                } else if (salaIniciada == true){
                    self.socket.emit('iniciarJuego');
                    self.socket.emit('iniciarRonda');
                    self.scene.remove('Opciones');
                    salaIniciada = false;
                } 
            });
        })

        this.socket.on('otroJugador', function () {
            if(self.isPlayerA && inicioJuego == false) {
                console.log("Se unió otro jugador");
            } else if (inicioJuego == false) {
                var formularioNombre = "<div style='display: flex; flex-direction: column'><input type='text' placeholder='Ingresar nombre' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 500px;height: 70px;font-family: sans-serif;font-size: 30px;text-align: center; margin: 10px 0'></div>";
                var formularioNombre2 = "<div style='display: flex; flex-direction: column'><input type='text' placeholder='Ingresar código de sala' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 500px;height: 70px;font-family: sans-serif;font-size: 30px;text-align: center; margin: 10px 0'></div>";
                var botonConfirmar ="<div style='display: flex; flex-direction: column'><input type='button' value='Entrar a sala' id='botonEntrar' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 500px;height: 70px;font-family: sans-serif;font-size: 30px;text-align: center;'></div>";
                var ingresarNombre = self.add.dom(640, 50).createFromHTML(formularioNombre);
                var ingresarNombre2 = self.add.dom(640, 150).createFromHTML(formularioNombre2);
                self.startBtn = self.add.dom(640, 250).createFromHTML(botonConfirmar).setInteractive();
                self.startBtn.on('pointerdown', function (pointer) {
                    if (nombreIngresado == false && ingresarNombre.node.children[0].children[0].value !== ""){
                    var nombreJugador = ingresarNombre.node.children[0].children[0].value;
                    sessionStorage.setItem("nombre", nombreJugador);
                    self.socket.emit('unidoASala', nombreJugador);
                    self.startBtn.disableInteractive();
                    nombreIngresado = true;
                    }
                }, self); 
                self.input.keyboard.on('keydown-' + 'ENTER', function (event) { 
                    if (nombreIngresado == false && ingresarNombre.node.children[0].children[0].value !== ""){
                        var nombreJugador = ingresarNombre.node.children[0].children[0].value;
                        sessionStorage.setItem("nombre", nombreJugador);
                        self.socket.emit('unidoASala', nombreJugador);
                        self.startBtn.disableInteractive();
                        nombreIngresado = true;
                    }  
                });
            }
        })

        self.add.text(400, 350, "En la sala", {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
        self.menuJuego = self.add.dom(1240, 740).createFromCache('iconomenu').setInteractive();
        self.modoClaro = self.add.dom(1240, 620).createFromCache('iconoluna').setInteractive();
        // self.mezclarCartas = self.add.dom(1240, 620).createFromCache('iconomezcla').setInteractive();
        self.modoAuto = self.add.dom(1240, 680).createFromCache('iconoauto').setInteractive(); 
        self.modoClaro.on('pointerdown', function (pointer) {
            if (modoClaro == 'true'){
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
        //self.mezclarCartas.on('pointerdown', function (pointer) {
          //  console.log("Mezcla de cartas activada");
        //}, self); 
        self.modoAuto.on('pointerdown', function (pointer) {
            if (modoAuto == 'true'){
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
                    console.log("Menú activado");
                    if (menuDesplegado === false){
                        menuDesplegado = true;
                        self.modoClaro.node.children[2].style.visibility = "visible";
                        self.modoClaro.setInteractive();
                        //self.mezclarCartas.node.children[2].style.visibility = "visible";
                        //self.mezclarCartas.setInteractive();
                        self.modoAuto.node.children[2].style.visibility = "visible"; 
                        self.modoAuto.setInteractive();
                        if (modoClaro == 'true'){
                            self.modoClaro.node.children[2].style.backgroundColor = "white";
                            self.modoClaro.node.children[2].style.color = "black";
                        } else {
                            self.modoClaro.node.children[2].style.backgroundColor = "black";
                            self.modoClaro.node.children[2].style.color = "white";
                        }
                        if (modoAuto == 'true'){
                            self.modoAuto.node.children[2].style.backgroundColor = "white";
                            self.modoAuto.node.children[2].style.color = "black";
                        } else {
                            self.modoAuto.node.children[2].style.backgroundColor = "black";
                            self.modoAuto.node.children[2].style.color = "white";
                        }
                    } else {
                        menuDesplegado = false;
                        self.modoClaro.node.children[2].style.visibility = "hidden";
                        //self.mezclarCartas.node.children[2].style.visibility = "hidden";
                        self.modoAuto.node.children[2].style.visibility = "hidden";
                        self.modoClaro.disableInteractive();
                        //self.mezclarCartas.disableInteractive();
                        self.modoAuto.disableInteractive();
                    }
                }, self);
                
                

        this.socket.on('unidoASala', function (nombresJugadores) {
            var i = nombresJugadores.length;
            self.add.text(400, 350 + 50*(i), nombresJugadores[i-1], {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
        })

        this.socket.on('iniciarJuego', function (nombresJugadores, seleccionCartasInicial) {
            inicioJuego = true;
            for(var i = 0; i < nombresJugadores.length; i++){
                if (nombresJugadores[i] == sessionStorage.getItem("nombre")){
                    sessionStorage.setItem("idJugador", i);
                }
            }
            sessionStorage.setItem("nombresJugadores", nombresJugadores);
            sessionStorage.setItem("seleccionCartasInicial", seleccionCartasInicial);
            sessionStorage.setItem("cantidadMezclas", 0);
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