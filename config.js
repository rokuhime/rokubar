const r = require('raylib');
const fs = require('fs');
const { RDImage } = require("./raindrops/image.js")

class Config {
	// returns config as an array of variables
	static getConfig(filepath) {

		// prep values with needed variables
		let values = {
			"colour_bg": "80,80,80",
			"bar_width": 30,
		}
		let raindrops = {}
					  
		// cycle through file
		let file = r.LoadFileText(filepath)
    	for (let line of file.split("\n")) {

			// skip comments and blank lines
			line = line.trim()
			if(line.startsWith("//") || line.length == 0) continue;
			
			// split up name and value
			const line_name = line.substring(0, line.indexOf("=")).trim()
    		const line_value = line.substring(line.indexOf("=") + 1, line.length).trim()
			
			
			// if its a raindrop, create and assign appropriately
			let rd_count = 0
			if(line_name == "RD"){
				console.log(rd_count, "drops so far")
				const rd_type = line_value.substring(0, line_value.indexOf(":")).trim()
				const rd_values = line_value.substring(line_value.indexOf(":") + 1, line_value.length).trim().split(",")
				raindrops[rd_count] = line_value
				rd_count++ // this doesnt proc???
				continue
			}

			// assign value finally
			values[line_name] = line_value
		}
		values["raindrops"] = raindrops
		console.log(values)
		return values
  	}

	static getColour(input) {
		// converts string (x,x,x) value into raylib colour
		const values = input.split(",")
		
		// check to include alpha
		var alp = 255
		if(values.length >= 4) a = values[3]

		const red = Math.floor(values[0])
		const grn = Math.floor(values[1])
		const blu = Math.floor(values[2])
		return {r: red, g: grn, b: blu, a: alp}
	}
}

module.exports.Config = Config;