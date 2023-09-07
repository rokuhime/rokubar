const r = require('raylib')

// import modules, nicknamed "raindrops"
// (called it that just cuz it sounds cool + rainmeter)
const { RDImage } = require("./raindrops/image.js")
const { Config } = require('./config.js') 

var cfg = Config.getConfig("config.txt")

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

let img_test = new RDImage("test.png", 0, 0, bar_width)

while (!r.WindowShouldClose()) {
    r.BeginDrawing();
    r.ClearBackground(Config.getColour(cfg["colour_bg"]))
    r.DrawText("Congrats! You created your first node-raylib window!", 120, 200, 20, r.LIGHTGRAY)
    img_test.update()
    r.EndDrawing()
}
r.CloseWindow()
