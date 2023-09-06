const r = require('raylib')
// import modules, nicknamed "raindrops"
// (called it that just cuz it sounds cool + rainmeter)
const { RDImage } = require("./raindrops/image.js")

var target_monitor = 1 // wanted monitor, counting left to right
var bar_width = 50

r.InitWindow(r.GetMonitorWidth(target_monitor), bar_width, "rokubar")

var window_xpos = 0
for(var i = 0; i < target_monitor; i++){
    window_xpos += r.GetMonitorWidth(i);
}

r.SetWindowPosition(window_xpos, 0)
r.SetTargetFPS(r.GetMonitorRefreshRate(target_monitor))

var img_test = new RDImage("test.png", 0, 0, bar_width)

while (!r.WindowShouldClose()) {
    r.BeginDrawing();
    r.ClearBackground(r.RAYWHITE)
    r.DrawText("Congrats! You created your first node-raylib window!", 120, 200, 20, r.LIGHTGRAY)
    img_test.update()
    r.EndDrawing()
}
r.CloseWindow()
