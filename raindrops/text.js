const r = require('raylib');

class RDText {
    constructor(text, x, y, siz, font, col, spa) {
        this.type = "RDText" // instanced class being detected as an Object with no way to trace, workaround
        this.text = text
        this.posX = x;
        this.posY = y;
        this.font = font
        this.size = siz
        this.colour = col
        this.spacing = spa

        this.unformatted_text = text
    }

    update = () => {
        let date = new Date()
        this.text = this.unformatted_text.replace("%TIME%", date.toLocaleTimeString())
    }
}

module.exports.RDText = RDText;