import Phaser from "phaser";
import salaDeEspera from "./scenes/salaDeEspera";

const config = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: 1280,
    height: 780,
    dom: {
        createContainer: true
    },
    scene: [
        salaDeEspera
    ]
};

const game = new Phaser.Game(config);