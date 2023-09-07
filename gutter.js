const { RDImage } = require("./raindrops/image.js")

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
            let rd_data = rd_container[i].substring(rd_container[i].indexOf(":") + 1, rd_container[i].length).split(",")
            let new_raindrop = createImage(rd_data, config)
            this.raindrops.push(new_raindrop)
        }
        return this.raindrops
    }
}

function createImage(data, config) {
    console.log("please dont skill issue", data)
    const x = data[1] ? Number(data[1]) : 0
    const y = data[2] ? Number(data[2]) : 0
    const size = data[3] ? Number(data[3]) : Number(config["bar_width"])

    //create raindrop and return it
    return new RDImage(data[0], x, y, size)
}

module.exports.Gutter = Gutter