import io from 'socket.io-client';
import WebFontFile from '../helpers/WebFontFile';
import salaDeEspera from './salaDeEspera';

var text;

export default class finJuego extends Phaser.Scene {
    constructor() {
        super({
            key: 'finJuego'
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
        let self = this;
        this.socket = io.connect();
        self.scene.remove('salaDeEspera');
        text = this.add.text(55, 55, "10", {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
        var textoGanador = this.add.text(475, 100, "Ganó el juego: ", {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
        var nombreGanador = this.add.text(725, 100, "a", {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
        var ganadorJuego = sessionStorage.getItem("ganadorJuego");
        nombreGanador.setText(ganadorJuego);
        var botonVolverAJugar = "<form style='display: flex; flex-direction: column'><input type='button' value='Volver a jugar' id='botonEntrar' style='background-color: black;color: white;border: 1px solid white;border-radius: 1em;width: 500px;height: 70px;font-family: sans-serif;font-size: 30px;text-align: center;'></form>";
        self.vueltaJuego = self.add.dom(640, 250).createFromHTML(botonVolverAJugar).setInteractive();
        self.vueltaJuego.on('pointerdown', function (pointer) {
            self.scene.add('salaDeEspera', salaDeEspera, true);
            self.socket.emit('nuevoJuego');
            self.socket.disconnect();
            self.scene.remove();
        }, self); 
       
    }


}