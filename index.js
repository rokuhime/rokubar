const r = require('raylib')

// import modules, named "raindrops"
// (called it that just cuz it sounds cool + rainmeter)
// might rename cuz honestly its annoying to type out LMAO
const { Config } = require('./config.js') 
const { RDImage } = require('./raindrops/image.js')
const { RDText } = require('./raindrops/text.js')

// load config as object
let cfg = Config.getConfig("config.txt")
// assign window variables
let target_monitor = Number(cfg["target_monitor"]) // wanted monitor, counting left to right
let bar_width = Number(cfg["bar_width"]) // size of bar vertically

let raindrops = {}

// make window
r.InitWindow(r.GetMonitorWidth(target_monitor), bar_width, "rokubar")

// change monitor via position, adding each monitor size
let window_xpos = 0
for(let i = 0; i < target_monitor; i++){
    window_xpos += r.GetMonitorWidth(i);
}

r.SetWindowPosition(window_xpos, 0)
r.SetTargetFPS(r.GetMonitorRefreshRate(target_monitor))

// create gutter to make/contain raindrops
const gutter_data = createFromConfig(cfg)

while (!r.WindowShouldClose()) {
    r.BeginDrawing();
    r.ClearBackground(Config.getColour(cfg["colour_bg"]))

    // go through all raindrops and update them

    for(let i = 0; i < Object.keys(gutter_data).length; i++){
        const gutter_droplet = gutter_data[i]
        switch(gutter_droplet.type){
            default:
                continue;

            case "RDText":
                gutter_droplet.update() // update to ensure text changes
                r.DrawTextEx(gutter_droplet.font, gutter_droplet.text,
                    {x: gutter_droplet.posX, y: gutter_droplet.posY}, 
                    gutter_droplet.size, gutter_droplet.spacing,
                    gutter_droplet.colour)
                continue

            case "RDImage":
                r.DrawTexturePro(gutter_droplet.sprite, 
                    {x: 0, y: 0, width: gutter_droplet.sprite.width, height: gutter_droplet.sprite.height},  
                    {x: 0, y: 0, width: gutter_droplet.scaleY * gutter_droplet.ratio, height: gutter_droplet.scaleY}, 
                    {x: gutter_droplet.posX, y: gutter_droplet.posY}, 
                    0, r.WHITE);
                continue
                
        }
    }

    r.EndDrawing()
}
r.CloseWindow()

function createFromConfig(config) {
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
        raindrops[i] = new_raindrop
    }
    return raindrops
}

function createImage(data, config) {
    const split_data = data.split(",")
    const x = split_data[1] ? Number(split_data[1]) : 0
    const y = split_data[2] ? Number(split_data[2]) : 0
    const size = split_data[3] ? Number(split_data[3]) : Number(config["bar_width"])

    //create raindrop and return it
    return new RDImage(split_data[0], x, y, size)
}

function createText(data, config) {
    // this is chaotic, but what were doing here is finding the text from quotes
    const text = data.substring(data.indexOf('"') + 1, data.lastIndexOf('"')).trim()
    // then we trim the text out,
    data = data.substring(text.length + 3, data.length)
    // then we get the colour from brackets, and get rid of the colour string
    const colour = data.indexOf('(') != -1 ? data.substring(data.indexOf('(') + 1, data.indexOf(')')) : r.WHITE
    data = data.replace("(" + colour + ")", "")

    // split up data and do the rest normally
    data = data.split(",")
    const data_size = Object.keys(data).length
    const x = data[0] ? Number(data[0]) : 0
    const y = data[1] ? Number(data[1]) : 0
    const size = data[2] ? Number(data[2]) : Number(config["bar_width"])
    const font = data[3] ? r.LoadFont(data[3]) : r.LoadFont("/usr/share/fonts/noto/NotoSans-Regular.ttf")

    // comma is still there so we use 5 (honestly not against this)
    const spacing = data[5] ? Number(data[5]) : 0

    // create raindrop and return it
    return new RDText(text, x, y, size, font, Config.getColour(colour), spacing)
}