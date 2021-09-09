export default class Card2 {
    constructor(scene) {
        this.render = (x, y, sprite) => {
            let card = scene.add.dom(x, y).createFromHTML(sprite).setScale(0.5, 0.5).setInteractive({ draggable: true });
            return card;
        }
    }
}