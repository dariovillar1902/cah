import io from 'socket.io-client';
import WebFontFile from '../helpers/WebFontFile';

var configJuego = [1, 1, 60, 5, 10, 1, 0, 1];

export default class Opciones extends Phaser.Scene {
    constructor() {
        super({
            key: 'Opciones'
        });
    }

    preload() {
        this.load.addFile(new WebFontFile(this.load, 'Work Sans'));
        this.load.html("iconoauto", "iconoauto.html");
        this.load.html("iconoluna", "iconoluna.html");
        this.load.html("iconomenu", "iconomenu.html");
        this.load.html("iconomezcla", "iconomezcla.html");
        this.load.html("iconomas", "iconomas.html");
        this.load.html("iconomenos", "iconomenos.html");
    }

    create() {
        let self = this;
        this.socket = io.connect();

        self.add.text(500, 50, "Opciones de sala: ", {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });

        self.add.text(200, 125, "Carta negra ", {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
        var boton1 ="<div style='display: flex; flex-direction: column'><input type='button' value='Elige HDP' id='botonVolver' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 200px;height: 50px;font-family: sans-serif;font-size: 30px;text-align: center;'></div>";
        var botonAleatorio ="<div style='display: flex; flex-direction: column'><input type='button' value='Aleatoria' id='botonVolver' style='background-color: white;color: black;border: 1px solid white;border-radius: 1em;width: 200px;height: 50px;font-family: sans-serif;font-size: 30px;text-align: center;'></div>";
        self.boton1 = self.add.dom(800, 140).createFromHTML(boton1).setInteractive();
        self.boton2 = self.add.dom(1025, 140).createFromHTML(botonAleatorio).disableInteractive();
        self.boton1.on('pointerdown', function (pointer) {
            if (configJuego[0] === 1){
                configJuego[0] = 0;
                self.boton1.node.children[0].children[0].style.backgroundColor = "white";
                self.boton1.node.children[0].children[0].style.color = "black";
                self.boton1.disableInteractive();
                self.boton2.node.children[0].children[0].style.backgroundColor = "black";
                self.boton2.node.children[0].children[0].style.color = "white";
                self.boton2.setInteractive();
            } else {
                configJuego[0] = 1;
                self.boton1.node.children[0].children[0].style.backgroundColor = "black";
                self.boton1.node.children[0].children[0].style.color = "white";
                self.boton1.setInteractive();
                self.boton2.node.children[0].children[0].style.backgroundColor = "white";
                self.boton2.node.children[0].children[0].style.color = "black";
                self.boton2.disableInteractive();
            }
        }, self);

        self.boton2.on('pointerdown', function (pointer) {
            if (configJuego[0] === 0){
                configJuego[0] = 1;
                self.boton1.node.children[0].children[0].style.backgroundColor = "black";
                self.boton1.node.children[0].children[0].style.color = "white";
                self.boton1.setInteractive();
                self.boton2.node.children[0].children[0].style.backgroundColor = "white";
                self.boton2.node.children[0].children[0].style.color = "black";
                self.boton2.disableInteractive();
                
            } else {
                configJuego[0] = 0;
                self.boton1.node.children[0].children[0].style.backgroundColor = "white";
                self.boton1.node.children[0].children[0].style.color = "black";
                self.boton1.disableInteractive();
                self.boton2.node.children[0].children[0].style.backgroundColor = "black";
                self.boton2.node.children[0].children[0].style.color = "white";
                self.boton2.setInteractive();
            }
        }, self);

        self.add.text(200, 200, "Elección de carta ganadora ", {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
        var boton2 ="<div style='display: flex; flex-direction: column'><input type='button' value='Eligen todos' id='botonVolver' style='background-color: white;color: black;border: 1px solid white;border-radius: 1em;width: 200px;height: 50px;font-family: sans-serif;font-size: 30px;text-align: center;'></div>";
        self.boton3 = self.add.dom(800, 215).createFromHTML(boton1).setInteractive();
        self.boton4 = self.add.dom(1025, 215).createFromHTML(boton2).setInteractive();
        self.boton3.on('pointerdown', function (pointer) {
            if (configJuego[1] === 1){
                configJuego[1] = 0;
                self.boton3.node.children[0].children[0].style.backgroundColor = "white";
                self.boton3.node.children[0].children[0].style.color = "black";
                self.boton3.disableInteractive();
                self.boton4.node.children[0].children[0].style.backgroundColor = "black";
                self.boton4.node.children[0].children[0].style.color = "white";
                self.boton4.setInteractive();
            } else {
                configJuego[1] = 1;
                self.boton3.node.children[0].children[0].style.backgroundColor = "black";
                self.boton3.node.children[0].children[0].style.color = "white";
                self.boton3.setInteractive();
                self.boton4.node.children[0].children[0].style.backgroundColor = "white";
                self.boton4.node.children[0].children[0].style.color = "black";
                self.boton4.disableInteractive();
            }
        }, self);

        self.boton4.on('pointerdown', function (pointer) {
            if (configJuego[1] === 0){
                configJuego[1] = 1;
                self.boton3.node.children[0].children[0].style.backgroundColor = "black";
                self.boton3.node.children[0].children[0].style.color = "white";
                self.boton3.setInteractive();
                self.boton4.node.children[0].children[0].style.backgroundColor = "white";
                self.boton4.node.children[0].children[0].style.color = "black";
                self.boton4.disableInteractive();
                
            } else {
                configJuego[1] = 0;
                self.boton3.node.children[0].children[0].style.backgroundColor = "white";
                self.boton3.node.children[0].children[0].style.color = "black";
                self.boton3.disableInteractive();
                self.boton4.node.children[0].children[0].style.backgroundColor = "black";
                self.boton4.node.children[0].children[0].style.color = "white";
                self.boton4.setInteractive();
            }
        }, self);

        self.add.text(200, 275, "Tiempo de ronda ", {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
        self.boton5 = self.add.dom(800, 290).createFromCache('iconomenos').setInteractive();
        var tiempoRonda = self.add.text(895, 275, "60", {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
        self.boton6 = self.add.dom(1025, 290).createFromCache('iconomas').setInteractive();

        self.boton5.on('pointerdown', function (pointer) {
            if (configJuego[2] == 45){
                configJuego[2] -= 15;
                self.boton5.disableInteractive();
                self.boton6.setInteractive();
                tiempoRonda.setText(configJuego[2]);
            } else {
                configJuego[2] -= 15;
                self.boton6.setInteractive();
                self.boton5.setInteractive();
                tiempoRonda.setText(configJuego[2]);
            }
        }, self);

        self.boton6.on('pointerdown', function (pointer) {
            if (configJuego[2] === 105){
                configJuego[2] += 15;
                self.boton5.setInteractive();
                self.boton6.disableInteractive();
                tiempoRonda.setText(configJuego[2]);
            } else {
                configJuego[2] += 15;
                self.boton5.setInteractive();
                self.boton6.setInteractive();
                tiempoRonda.setText(configJuego[2]);
            }
        }, self);
        
        self.add.text(200, 350, "Puntos para ganar ", {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
        self.boton7 = self.add.dom(800, 365).createFromCache('iconomenos').setInteractive();
        var puntosParaGanar = self.add.text(905, 350, "5", {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
        self.boton8 = self.add.dom(1025, 365).createFromCache('iconomas').setInteractive();

        self.boton7.on('pointerdown', function (pointer) {
            if (configJuego[3] == 2){
                configJuego[3] -= 1;
                self.boton7.disableInteractive();
                self.boton8.setInteractive();
                puntosParaGanar.setText(configJuego[3]);
            } else {
                configJuego[3] -= 1;
                self.boton8.setInteractive();
                self.boton7.setInteractive();
                puntosParaGanar.setText(configJuego[3]);
            }
        }, self);

        self.boton8.on('pointerdown', function (pointer) {
            if (configJuego[3] === 14){
                configJuego[3] += 1;
                self.boton7.setInteractive();
                self.boton8.disableInteractive();
                puntosParaGanar.setText(configJuego[3]);
            } else {
                configJuego[3] += 1;
                self.boton7.setInteractive();
                self.boton8.setInteractive();
                puntosParaGanar.setText(configJuego[3]);
            }
        }, self);
        
        self.add.text(200, 425, "Cantidad de cartas ", {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
        self.boton9 = self.add.dom(800, 440).createFromCache('iconomenos').setInteractive();
        var cantidadDeCartas = self.add.text(895, 425, "10", {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
        self.boton10 = self.add.dom(1025, 440).createFromCache('iconomas').setInteractive();

        self.boton9.on('pointerdown', function (pointer) {
            if (configJuego[4] == 7){
                configJuego[4] -= 2;
                self.boton9.disableInteractive();
                self.boton10.setInteractive();
                cantidadDeCartas.setText(configJuego[4]);
            } else {
                configJuego[4] -= 3;
                self.boton10.setInteractive();
                self.boton9.setInteractive();
                cantidadDeCartas.setText(configJuego[4]);
            }
        }, self);

        self.boton10.on('pointerdown', function (pointer) {
            if (configJuego[4] === 7){
                configJuego[4] += 3;
                self.boton9.setInteractive();
                self.boton10.disableInteractive();
                cantidadDeCartas.setText(configJuego[4]);
            } else {
                configJuego[4] += 2;
                self.boton9.setInteractive();
                self.boton10.setInteractive();
                cantidadDeCartas.setText(configJuego[4]);
            }
        }, self);
        
        self.add.text(200, 500, "Animaciones ", {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
        var boton3 ="<div style='display: flex; flex-direction: column'><input type='button' value='Manuales' id='botonVolver' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 200px;height: 50px;font-family: sans-serif;font-size: 30px;text-align: center;'></div>";
        var boton4 ="<div style='display: flex; flex-direction: column'><input type='button' value='Automáticas' id='botonVolver' style='background-color: white;color: black;border: 1px solid white;border-radius: 1em;width: 200px;height: 50px;font-family: sans-serif;font-size: 30px;text-align: center;'></div>";
        self.boton11 = self.add.dom(800, 515).createFromHTML(boton3).setInteractive();
        self.boton12 = self.add.dom(1025, 515).createFromHTML(boton4).setInteractive();
        self.boton11.on('pointerdown', function (pointer) {
            if (configJuego[5] === 1){
                configJuego[5] = 0;
                self.boton11.node.children[0].children[0].style.backgroundColor = "white";
                self.boton11.node.children[0].children[0].style.color = "black";
                self.boton11.disableInteractive();
                self.boton12.node.children[0].children[0].style.backgroundColor = "black";
                self.boton12.node.children[0].children[0].style.color = "white";
                self.boton12.setInteractive();
            } else {
                configJuego[5] = 1;
                self.boton11.node.children[0].children[0].style.backgroundColor = "black";
                self.boton11.node.children[0].children[0].style.color = "white";
                self.boton11.setInteractive();
                self.boton12.node.children[0].children[0].style.backgroundColor = "white";
                self.boton12.node.children[0].children[0].style.color = "black";
                self.boton12.disableInteractive();
            }
        }, self);

        self.boton12.on('pointerdown', function (pointer) {
            if (configJuego[5] === 0){
                configJuego[5] = 1;
                self.boton11.node.children[0].children[0].style.backgroundColor = "black";
                self.boton11.node.children[0].children[0].style.color = "white";
                self.boton11.setInteractive();
                self.boton12.node.children[0].children[0].style.backgroundColor = "white";
                self.boton12.node.children[0].children[0].style.color = "black";
                self.boton12.disableInteractive();
                
            } else {
                configJuego[5] = 0;
                self.boton11.node.children[0].children[0].style.backgroundColor = "white";
                self.boton11.node.children[0].children[0].style.color = "black";
                self.boton11.disableInteractive();
                self.boton12.node.children[0].children[0].style.backgroundColor = "black";
                self.boton12.node.children[0].children[0].style.color = "white";
                self.boton12.setInteractive();
            }
        }, self);

        
        self.add.text(200, 575, "Votos ", {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
        var boton5 ="<div style='display: flex; flex-direction: column'><input type='button' value='Anónimos' id='botonVolver' style='background-color: white;color: black;border: 1px solid white;border-radius: 1em;width: 200px;height: 50px;font-family: sans-serif;font-size: 30px;text-align: center;'></div>";
        var boton6 ="<div style='display: flex; flex-direction: column'><input type='button' value='Con nombre' id='botonVolver' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 200px;height: 50px;font-family: sans-serif;font-size: 30px;text-align: center;'></div>";
        self.boton13 = self.add.dom(800, 590).createFromHTML(boton5).setInteractive();
        self.boton14 = self.add.dom(1025, 590).createFromHTML(boton6).setInteractive();
        self.boton13.on('pointerdown', function (pointer) {
            if (configJuego[6] === 1){
                configJuego[6] = 0;
                self.boton13.node.children[0].children[0].style.backgroundColor = "white";
                self.boton13.node.children[0].children[0].style.color = "black";
                self.boton13.disableInteractive();
                self.boton14.node.children[0].children[0].style.backgroundColor = "black";
                self.boton14.node.children[0].children[0].style.color = "white";
                self.boton14.setInteractive();
            } else {
                configJuego[6] = 1;
                self.boton13.node.children[0].children[0].style.backgroundColor = "black";
                self.boton13.node.children[0].children[0].style.color = "white";
                self.boton13.setInteractive();
                self.boton14.node.children[0].children[0].style.backgroundColor = "white";
                self.boton14.node.children[0].children[0].style.color = "black";
                self.boton14.disableInteractive();
            }
        }, self);

        self.boton14.on('pointerdown', function (pointer) {
            if (configJuego[6] === 0){
                configJuego[6] = 1;
                self.boton13.node.children[0].children[0].style.backgroundColor = "black";
                self.boton13.node.children[0].children[0].style.color = "white";
                self.boton13.setInteractive();
                self.boton14.node.children[0].children[0].style.backgroundColor = "white";
                self.boton14.node.children[0].children[0].style.color = "black";
                self.boton14.disableInteractive();
                
            } else {
                configJuego[6] = 0;
                self.boton13.node.children[0].children[0].style.backgroundColor = "white";
                self.boton13.node.children[0].children[0].style.color = "black";
                self.boton13.disableInteractive();
                self.boton14.node.children[0].children[0].style.backgroundColor = "black";
                self.boton14.node.children[0].children[0].style.color = "white";
                self.boton14.setInteractive();
            }
        }, self);
        
        self.add.text(200, 650, "Empates ", {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
        var boton7 ="<div style='display: flex; flex-direction: column'><input type='button' value='Desempate' id='botonVolver' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 200px;height: 50px;font-family: sans-serif;font-size: 30px;text-align: center;'></div>";
        var boton8 ="<div style='display: flex; flex-direction: column'><input type='button' value='Aleatorio' id='botonVolver' style='background-color: white;color: black;border: 1px solid white;border-radius: 1em;width: 200px;height: 50px;font-family: sans-serif;font-size: 30px;text-align: center;'></div>";
        self.boton15 = self.add.dom(800, 665).createFromHTML(boton7).setInteractive();
        self.boton16 = self.add.dom(1025, 665).createFromHTML(boton8).setInteractive();
        self.boton15.on('pointerdown', function (pointer) {
            if (configJuego[7] === 1){
                configJuego[7] = 0;
                self.boton15.node.children[0].children[0].style.backgroundColor = "white";
                self.boton15.node.children[0].children[0].style.color = "black";
                self.boton15.disableInteractive();
                self.boton16.node.children[0].children[0].style.backgroundColor = "black";
                self.boton16.node.children[0].children[0].style.color = "white";
                self.boton16.setInteractive();
            } else {
                configJuego[7] = 1;
                self.boton15.node.children[0].children[0].style.backgroundColor = "black";
                self.boton15.node.children[0].children[0].style.color = "white";
                self.boton15.setInteractive();
                self.boton16.node.children[0].children[0].style.backgroundColor = "white";
                self.boton16.node.children[0].children[0].style.color = "black";
                self.boton16.disableInteractive();
            }
        }, self);

        self.boton16.on('pointerdown', function (pointer) {
            if (configJuego[7] === 0){
                configJuego[7] = 1;
                self.boton15.node.children[0].children[0].style.backgroundColor = "black";
                self.boton15.node.children[0].children[0].style.color = "white";
                self.boton15.setInteractive();
                self.boton16.node.children[0].children[0].style.backgroundColor = "white";
                self.boton16.node.children[0].children[0].style.color = "black";
                self.boton16.disableInteractive();
                
            } else {
                configJuego[7] = 0;
                self.boton15.node.children[0].children[0].style.backgroundColor = "white";
                self.boton15.node.children[0].children[0].style.color = "black";
                self.boton15.disableInteractive();
                self.boton16.node.children[0].children[0].style.backgroundColor = "black";
                self.boton16.node.children[0].children[0].style.color = "white";
                self.boton16.setInteractive();
            }
        }, self);

        var botonVolver ="<div style='display: flex; flex-direction: column'><input type='button' value='Volver' id='botonVolver' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 300px;height: 50px;font-family: sans-serif;font-size: 30px;text-align: center;'></div>";
        self.botonVolver = self.add.dom(640, 740).createFromHTML(botonVolver).setInteractive();

        self.botonVolver.on('pointerdown', function (pointer) {
            console.log("Hola");
            self.scene.switch('salaDeEspera');
            self.socket.emit('cambioConfig', configJuego);
        }, self); 

    }


}