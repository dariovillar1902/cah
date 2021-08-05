import Card from '../helpers/card.js';

import Zone from '../helpers/zone.js';

import io from 'socket.io-client';

import Dealer from '../helpers/dealer.js';

import WebFontFile from '../helpers/WebFontFile';

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
        this.load.addFile(new WebFontFile(this.load, 'Work Sans'))
    }

    create() {
        
        var cartaNegraHTML = `<div style='background-color: black; color: white; border: 1px solid white; border-radius: 1em; width: 14.88em; height: 20.78em; display: flex; align-items: center;'> <p style='text-align: center; font-family: "Work Sans"; font-weight: bold; font-size: 4em; vertical-align: middle; margin: auto !important;'> HDP </p> </div>`;

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
            gameObject.x = (dropZone.x - 350) + (dropZone.data.values.cards * 50);
            gameObject.y = dropZone.y;
            gameObject.disableInteractive();
            self.socket.emit('cardPlayed', gameObject, self.isPlayerA);
        })
        
    }
    
    update() {
    
    }
}