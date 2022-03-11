import Card from './card';
import Card2 from './oppCard';

export default class Dealer {
    constructor(scene) {
        this.dealCards = () => {
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
            for (let i = 0; i < 10; i++) {
                let playerCard = new Card(scene);
                playerCard.render(175 + (i * 100), 650, playerSprite);

                let opponentCard = new Card2(scene);
                scene.opponentCards.push(opponentCard.render(175 + (i * 100), 125, opponentSprite).disableInteractive());
            }
        },
            this.cartaReemplazo = (x, y) => {
                console.log("Activado")
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
                playerCard.render(x, y, playerSprite);

            }
    }
}