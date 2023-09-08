const r = require('raylib');

class RDText {
    constructor(text, x, y, siz, col) {
        this.text = text;
        this.posX = x;
        this.posY = y;
        this.size = siz
        this.colour = col
    }

    update = () => {
        r.DrawText(this.text, 
                   this.posX, this.posY, 
                   this.size, this.colour)
    }
}

module.exports.RDText = RDText;