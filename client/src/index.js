import Phaser from "phaser";
import Game from "./scenes/game";
import salaDeEspera from "./scenes/salaDeEspera";
import Votacion from "./scenes/votacion";

const config = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: 1280,
    height: 780,
    dom: {
        createContainer: true
    },
    scene: [
        salaDeEspera, Game, Votacion
    ]
};

const game = new Phaser.Game(config);