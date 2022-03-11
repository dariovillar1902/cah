import Card from './card';
import Card2 from './oppCard';

export default class Dealer {
    constructor(scene) {
        this.dealCards = (cartasBlancasDeJugador, nombres) => {
            let playerSprite;
            let opponentSprite;
            let opponentSpriteGirado90;
            let opponentSpriteGirado270;
            let opponentSpriteGirado315;
            let opponentSpriteGirado45;
            if (scene.isPlayerA) {
                playerSprite = `<div style='
                background-color: white;
                color: black;
                border: 1px solid black;
                border-radius: 1em;
                width: 14.88em;
                height: 20.78em;
                -webkit-user-select: none;         
                -moz-user-select: none; 
                -ms-user-select: none; 
                user-select: none;'> <p id="texto" style='
                padding: .5em 1.5em 1em 1.5em;
                font-family: sans-serif;
                font-weight: bold;
                font-size: 1.3em;
                line-height: 1.3em;'> a </p> </div>`;
                opponentSprite = `<div style='
                background-color: white;
                color: black;
                border: 1px solid black;
                border-radius: 1em;
                width: 14.88em;
                height: 20.78em; 
                display: flex; 
                align-items: center;
                -webkit-user-select: none;         
                -moz-user-select: none; 
                -ms-user-select: none; 
                user-select: none;'> <p id="texto" style='
                text-align: center; 
                font-family: sans-serif; 
                font-weight: bold; 
                font-size: 4em; 
                vertical-align: middle; 
                margin: auto !important;'> HDP </p> </div>`;
                opponentSpriteGirado90 = `<div style='
                background-color: white;
                color: black;
                border: 1px solid black;
                border-radius: 1em;
                width: 14.88em;
                height: 20.78em; 
                display: flex; 
                align-items: center;
                transform: rotate(90deg);
                -webkit-user-select: none;         
                -moz-user-select: none; 
                -ms-user-select: none; 
                user-select: none;'> <p id="texto" style='
                text-align: center; 
                font-family: sans-serif; 
                font-weight: bold; 
                font-size: 4em; 
                vertical-align: middle; 
                margin: auto !important;
                '> HDP </p> </div>`;
                opponentSpriteGirado270 = `<div style='
                background-color: white;
                color: black;
                border: 1px solid black;
                border-radius: 1em;
                width: 14.88em;
                height: 20.78em; 
                display: flex; 
                align-items: center;
                transform: rotate(270deg);
                -webkit-user-select: none;         
                -moz-user-select: none; 
                -ms-user-select: none; 
                user-select: none;'> <p id="texto" style='
                text-align: center; 
                font-family: sans-serif; 
                font-weight: bold; 
                font-size: 4em; 
                vertical-align: middle; 
                margin: auto !important;
                '> HDP </p> </div>`;
                opponentSpriteGirado315 = `<div style='
                background-color: white;
                color: black;
                border: 1px solid black;
                border-radius: 1em;
                width: 14.88em;
                height: 20.78em; 
                display: flex; 
                align-items: center;
                transform: rotate(315deg);
                -webkit-user-select: none;         
                -moz-user-select: none; 
                -ms-user-select: none; 
                user-select: none;'> <p id="texto" style='
                text-align: center; 
                font-family: sans-serif; 
                font-weight: bold; 
                font-size: 4em; 
                vertical-align: middle; 
                margin: auto !important;
                '> HDP </p> </div>`;
                opponentSpriteGirado45 = `<div style='
                background-color: white;
                color: black;
                border: 1px solid black;
                border-radius: 1em;
                width: 14.88em;
                height: 20.78em; 
                display: flex; 
                align-items: center;
                transform: rotate(45deg);
                -webkit-user-select: none;         
                -moz-user-select: none; 
                -ms-user-select: none; 
                user-select: none;'> <p id="texto" style='
                text-align: center; 
                font-family: sans-serif; 
                font-weight: bold; 
                font-size: 4em; 
                vertical-align: middle; 
                margin: auto !important;
                '> HDP </p> </div>`;
            } else {
                playerSprite = `<div style='
                background-color: white;
                color: black;
                border: 1px solid black;
                border-radius: 1em;
                width: 14.88em;
                height: 20.78em;
                -webkit-user-select: none;         
                -moz-user-select: none; 
                -ms-user-select: none; 
                user-select: none;'> <p id="texto" style='
                padding: .5em 1.5em 1em 1.5em;
                font-family: sans-serif;
                font-weight: bold;
                font-size: 1.3em;
                line-height: 1.3em;'> a </p> </div>`;
                opponentSprite = `<div style='
                background-color: white;
                color: black;
                border: 1px solid black;
                border-radius: 1em;
                width: 14.88em;
                height: 20.78em; 
                display: flex; 
                align-items: center;
                -webkit-user-select: none;         
                -moz-user-select: none; 
                -ms-user-select: none; 
                user-select: none;'> <p id="texto" style='
                text-align: center; 
                font-family: sans-serif;
                font-weight: bold; 
                font-size: 4em; 
                vertical-align: middle; 
                margin: auto !important;'> HDP </p> </div>`;
                opponentSpriteGirado90 = `<div style='
                background-color: white;
                color: black;
                border: 1px solid black;
                border-radius: 1em;
                width: 14.88em;
                height: 20.78em; 
                display: flex; 
                align-items: center;
                transform: rotate(90deg);
                -webkit-user-select: none;         
                -moz-user-select: none; 
                -ms-user-select: none; 
                user-select: none;'> <p id="texto" style='
                text-align: center; 
                font-family: sans-serif; 
                font-weight: bold; 
                font-size: 4em; 
                vertical-align: middle; 
                margin: auto !important;'> HDP </p> </div>`;
                opponentSpriteGirado270 = `<div style='
                background-color: white;
                color: black;
                border: 1px solid black;
                border-radius: 1em;
                width: 14.88em;
                height: 20.78em; 
                display: flex; 
                align-items: center;
                transform: rotate(270deg);
                -webkit-user-select: none;         
                -moz-user-select: none; 
                -ms-user-select: none; 
                user-select: none;'> <p id="texto" style='
                text-align: center; 
                font-family: sans-serif; 
                font-weight: bold; 
                font-size: 4em; 
                vertical-align: middle; 
                margin: auto !important;
                '> HDP </p> </div>`;
                opponentSpriteGirado315 = `<div style='
                background-color: white;
                color: black;
                border: 1px solid black;
                border-radius: 1em;
                width: 14.88em;
                height: 20.78em; 
                display: flex; 
                align-items: center;
                transform: rotate(315deg);
                -webkit-user-select: none;         
                -moz-user-select: none; 
                -ms-user-select: none; 
                user-select: none;'> <p id="texto" style='
                text-align: center; 
                font-family: sans-serif; 
                font-weight: bold; 
                font-size: 4em; 
                vertical-align: middle; 
                margin: auto !important;
                '> HDP </p> </div>`;
                opponentSpriteGirado45 = `<div style='
                background-color: white;
                color: black;
                border: 1px solid black;
                border-radius: 1em;
                width: 14.88em;
                height: 20.78em; 
                display: flex; 
                align-items: center;
                transform: rotate(45deg);
                -webkit-user-select: none;         
                -moz-user-select: none; 
                -ms-user-select: none; 
                user-select: none;'> <p id="texto" style='
                text-align: center; 
                font-family: sans-serif; 
                font-weight: bold; 
                font-size: 4em; 
                vertical-align: middle; 
                margin: auto !important;
                '> HDP </p> </div>`;
            };
            for (let i = 0; i < 10; i++) {
                let playerCard = new Card(scene);
                let textoCarta = cartasBlancasDeJugador[i];
                playerCard.render(175 + (i * 100), 650, playerSprite, textoCarta);
            }
            for (let j = 0; j < 3; j++) {
                for (var k = 0; k < nombres.length - 1; k++) {
                    let opponentCard = new Card2(scene);
                    switch (k) { // variable de la que dependen los casos, puede ser número o texto
                        case 0:
                            scene.opponentCards[k].push(opponentCard.render(550 + (j * 90), 100, opponentSprite, "HDP").disableInteractive());
                            break;
                        case 1:
                            scene.opponentCards[k].push(opponentCard.render(100, 275 + (j * 90), opponentSpriteGirado90, "HDP").disableInteractive());
                            break;
                        case 2:
                            scene.opponentCards[k].push(opponentCard.render(1175, 275 + (j * 90), opponentSpriteGirado270, "HDP").disableInteractive());
                            break;
                        case 3:
                            scene.opponentCards[k].push(opponentCard.render(200 + (j * 70), 100, opponentSpriteGirado315, "HDP").disableInteractive());
                            break;
                        case 4:
                            scene.opponentCards[k].push(opponentCard.render(900 + (j * 70), 100, opponentSpriteGirado45, "HDP").disableInteractive());
                            break;

                        default:
                            // scene.opponentCards[k].push(opponentCard.render(800 + (j * 100), 75 + (k*100), opponentSprite, "HDP").disableInteractive());
                            break;
                    }

                }
            }
        },
            this.cartaReemplazo = (x, y, textoCartaReemplazo) => {
                let playerSprite;
                let opponentSprite;
                if (scene.isPlayerA) {
                    playerSprite = `<div style='
                background-color: white;
                color: black;
                border: 1px solid black;
                border-radius: 1em;
                width: 14.88em;
                height: 20.78em;'> <p id="texto" style='
                padding: .5em 1.5em 1em 1.5em;
                font-family: sans-serif;
                font-weight: bold;
                font-size: 1.3em;
                line-height: 1.3em;'> a </p> </div>`;
                    opponentSprite = `<div style='
                background-color: white;
                color: black;
                border: 1px solid black;
                border-radius: 1em;
                width: 14.88em;
                height: 20.78em; 
                display: flex; 
                align-items: center;'> <p id="texto" style='
                text-align: center; 
                font-family: sans-serif; 
                font-weight: bold; 
                font-size: 4em; 
                vertical-align: middle; 
                margin: auto !important;'> HDP </p> </div>`;
                } else {
                    playerSprite = `<div style='
                background-color: white;
                color: black;
                border: 1px solid black;
                border-radius: 1em;
                width: 14.88em;
                height: 20.78em;'> <p id="texto" style='
                padding: .5em 1.5em 1em 1.5em;
                font-family: sans-serif;
                font-weight: bold;
                font-size: 1.3em;
                line-height: 1.3em;'> a </p> </div>`;
                    opponentSprite = `<div style='
                background-color: white;
                color: black;
                border: 1px solid black;
                border-radius: 1em;
                width: 14.88em;
                height: 20.78em; 
                display: flex; 
                align-items: center;'> <p id="texto" style='
                text-align: center; 
                font-family: sans-serif;
                font-weight: bold; 
                font-size: 4em; 
                vertical-align: middle; 
                margin: auto !important;'> HDP </p> </div>`;
                };
                let playerCard = new Card(scene);
                playerCard.render(x, y, playerSprite, textoCartaReemplazo);

            }
        this.cartaJugadaPorOponente = (cantidadDeCartasJugadas) => {
            let opponentSprite = `<div style='
                background-color: white;
                color: black;
                border: 1px solid black;
                border-radius: 1em;
                width: 14.88em;
                height: 20.78em; 
                display: flex; 
                align-items: center;'> <p id="texto" style='
                text-align: center; 
                font-family: sans-serif; 
                font-weight: bold; 
                font-size: 4em; 
                vertical-align: middle; 
                margin: auto !important;'> HDP </p> </div>`;

            let opponentCard = new Card2(scene);
            scene.cartasJugadasDeOponentes.push(opponentCard.render(850 + (cantidadDeCartasJugadas * 30), 375, opponentSprite, "HDP").disableInteractive());

        }
    }
}