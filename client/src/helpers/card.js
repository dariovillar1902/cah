export default class Card {
    constructor(scene) {
        this.render = (x, y, sprite) => {
            let card = scene.add.dom(x, y).createFromHTML(sprite).setScale(0.5, 0.5).setInteractive({ draggable: true });
            // textoCarta.disableInteractive();
            // console.log(card);
            //console.log(card.node.firstChild.firstElementChild);
            scene.input.setDraggable(card);
            // let textoCarta = card.node.firstChild.firstElementChild.disableInteractive();
            return card;
        }
    }
}