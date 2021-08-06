import Card from '../helpers/card.js';

import Zone from '../helpers/zone.js';

import io from 'socket.io-client';

import Dealer from '../helpers/dealer.js';

import WebFontFile from '../helpers/WebFontFile';

var text;
var timedEvent;

function onEvent() {
    timedEvent.remove();
}

export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
    }

    preload() {
        this.load.image('cyanCardFront', 'src/assets/CyanCardFront.png');
        this.load.html('cartaNegra', 'src/assets/cartanegra.html');
        this.load.image('magentaCardFront', 'src/assets/MagentaCardFront.png');
        this.load.image('magentaCardBack', 'src/assets/MagentaCardBack.png');
        this.load.html('cartaBlanca', 'src/assets/cartablanca.html');
        this.load.addFile(new WebFontFile(this.load, 'Work Sans'));
        // timer.loop(2000, updateCounter, this);
        // timer.start();
    }

    create() {
        var arrayCartasNegras = ["La normativa de la Secretaria de Transporte ahora prohibe _________ en los aviones.", 
        "Es una pena que hoy en día los jóvenes se están metiendo con _________.", 
        "En 1000 años, cuando el papel moneda sea una memoria distante, _________ va a ser nuestra moneda.", 
        "La Asociación de Fútbol Argentino ha prohibido _________ por dar a los jugadores una ventaja injusta.", 
        "¿Cuál es el placer culposo de Batman?", 
        "Lo nuevo de JK Rowling: Harry Potter y la Cámara de _________.",
        "¿Qué me traje de vuelta de Paraguay?",
        "¿_________? Hay una app para eso.",
        "_________. ¿A que no podés comer sólo una?",
        "¿Cuál es mi sustituto para no usar drogas?",
        "Cuando los EEUU y la URSS corrían la carrera espacial, el gobierno argentino dedicó millones de pesos a la investigación de _________.",
        "En la nueva película original de Disney Channel, Hannah Montana se enfrenta a _________ por primera vez.",
        "¿Cuál es mi poder secreto?",
        "¿Cuál es la nueva dieta de moda?",
        "¿Qué comió Vin Diesel para la cena?",
        "Cuando el faraón se mantuvo en su postura, Moisés llamó una Plaga de _________.",
        "¿Qué hago para mantener estable mi relación amorosa?",
        "¿Qué es lo más crujiente?",
        "En la cárcel de Devoto se dice que podés cambiar 200 cigarrillos por _________.",
        "Ahora, en vez de carbón, Papá Noel le da _________ a los chicos malos.",
        "La vida para los pueblos originarios cambió drásticamente cuando el hombre blanco les mostró _________.",
        "En los momentos finales de Michael Jackson, pensó en _________.",
        "A la gente blanca le gusta _________.",
        "¿Por qué me duele todo?",
        "Una cena romántica a la luz de las velas estaría incompleta sin _________.",
        "¿Qué llevaría en un viaje al pasado para convencer a la gente de que soy un poderoso hechicero?",
    ];
    var indiceCartaNegra = Phaser.Math.Between(0, arrayCartasNegras.length - 1);
    console.log(indiceCartaNegra);
        timedEvent = this.time.delayedCall(60000, onEvent);
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
        var cartaNegraFinal = this.add.dom(400, 375).createFromHTML(cartaNegraElegida).setScale(0.7, 0.7);
        cartaNegraFinal.node.children[0].children[0].innerText = arrayCartasNegras[indiceCartaNegra];
        text = this.add.text(55, 55, "60", {fontFamily: 'sans-serif', fontSize: '30px', fontWeight: 'bold' });
        this.isPlayerA = false;
        this.opponentCards = [];

        this.socket = io('http://localhost:3000', {transports : ["websocket"] })
        this.socket.on('connect', function () {
        	console.log('Connected!');
        });
        this.socket.on('isPlayerA', function () {
        	self.isPlayerA = true;
        })

        this.socket.on('dealCards', function () {
            self.dealer.dealCards();
            self.dealText.disableInteractive();
            // timer.start();
            
        })

        this.socket.on('cardPlayed', function (gameObject, isPlayerA) {
            if (isPlayerA !== self.isPlayerA) {
                let sprite = gameObject.textureKey;
                self.opponentCards.shift().destroy();
                self.dropZone.data.values.cards++;
                let card = new Card(self);
                card.render(((self.dropZone.x - 350) + (self.dropZone.data.values.cards * 50)), (self.dropZone.y), sprite).disableInteractive();
            }
        })

        this.zone = new Zone(this);
        this.dropZone = this.zone.renderZone();
        this.outline = this.zone.renderOutline(this.dropZone);

        this.dealText = this.add.text(75, 350, ['DEAL CARDS']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();
        let self = this;

        this.dealer = new Dealer(this);

        this.dealText.on('pointerdown', function () {
            self.socket.emit("dealCards");
        })

        this.dealText.on('pointerover', function () {
            self.dealText.setColor('#ff69b4');
        })

        this.dealText.on('pointerout', function () {
            self.dealText.setColor('#00ffff');
        })

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })    

        this.input.on('dragstart', function (pointer, gameObject) {
            //self.node.firstChild.firstElementChild.disableInteractive(gameObject);
            //gameObject.setTint(0xff69b4);
            self.children.bringToTop(gameObject);
        })

        this.input.on('dragend', function (pointer, gameObject, dropped) {
            //gameObject.setTint();
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })

        this.input.on('drop', function (pointer, gameObject, dropZone) {
            dropZone.data.values.cards++;
            gameObject.x = (dropZone.x - 50) + (dropZone.data.values.cards * 50);
            gameObject.y = dropZone.y;
            gameObject.disableInteractive();
            self.socket.emit('cardPlayed', gameObject, self.isPlayerA);
        })
        
    }
    
    update() {
        // text.setText('Event.progress: ' + timedEvent.getProgress().toString().substr(0, 4));
        var cantidadSegundos = timedEvent.getProgress() * 60;
        var segundosRestantes = 60 - cantidadSegundos;
        if (segundosRestantes > 10) {
            text.setText(segundosRestantes.toString().substr(0, 2));
        } else if (segundosRestantes > 0 && segundosRestantes < 10) {
            text.setText(segundosRestantes.toString().substr(0, 1));
        } else if (segundosRestantes = 0) {
            timedEvent.paused = true;
        }
    }


}