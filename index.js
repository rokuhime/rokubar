const r = require('raylib')

// import modules, named "raindrops"
// (called it that just cuz it sounds cool + rainmeter)
// might rename cuz honestly its annoying to type out LMAO
const { Config } = require('./config.js') 
const { Gutter } = require('./gutter.js') 

// load config as object
let cfg = Config.getConfig("config.txt")
// assign window variables
let target_monitor = Number(cfg["target_monitor"]) // wanted monitor, counting left to right
let bar_width = Number(cfg["bar_width"]) // size of bar vertically

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
let gutter = new Gutter()
let gutter_data = gutter.createFromConfig(cfg)
console.log(gutter_data)

while (!r.WindowShouldClose()) {
    r.BeginDrawing();
    r.ClearBackground(Config.getColour(cfg["colour_bg"]))

    // go through all raindrops and update them
    
    for(let i = 0; i < Object.keys(gutter_data).length; i++){
        gutter_data[i].update()
    }

    r.EndDrawing()
}
r.CloseWindow()