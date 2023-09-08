const { Config } = require('./config.js') // circular dependency goes craaazy
const { RDImage } = require("./raindrops/image.js")
const { RDText } = require("./raindrops/text.js")

// creates and stores raindrops
class Gutter {
    constructor(){
        this.raindrops = []
    }

    createFromConfig(config) {
        var rd_container = config["raindrops"]

        for(let i = 0; i < Object.keys(rd_container).length; i++){
            // find type
            let rd_type = rd_container[i].substring(0,rd_container[i].indexOf(":"))
            let rd_data = rd_container[i].substring(rd_container[i].indexOf(":") + 1, rd_container[i].length)

            let new_raindrop
            switch(rd_type){
                case "image":
                    new_raindrop = createImage(rd_data, config)
                    break
                case "text":
                    new_raindrop = createText(rd_data, config)
                    break
            }
            
            this.raindrops.push(new_raindrop)
        }
        return this.raindrops
    }
}

function createImage(data, config) {
    const split_data = data.split(",")
    const x = split_data[1] ? Number(split_data[1]) : 0
    const y = split_data[2] ? Number(split_data[2]) : 0
    const size = split_data[3] ? Number(split_data[3]) : Number(config["bar_width"])

    //create raindrop and return it
    return new RDImage(data[0], x, y, size)
}

function createText(data, config) {
    // this is chaotic, but what were doing here is finding the text from quotes
    const text = data.substring(data.indexOf('"') + 1, data.lastIndexOf('"')).trim()
    // then we trim the text out,
    data = data.substring(text.length + 3, data.length)
    // then we get the colour from brackets
    const colour = data.substring(data.indexOf('(') + 1, data.indexOf(')'))

    // split up data and do the rest normally
    data = data.split(",")
    const data_size = Object.keys(data).length
    const x = data[0] ? Number(data[0]) : 0
    const y = data[1] ? Number(data[1]) : 0
    const size = data[2] ? Number(data[2]) : Number(config["bar_width"])
    
    //create raindrop and return it
    return new RDText(text, x, y, size, Config.getColour(colour))
}

module.exports.Gutter = Gutter