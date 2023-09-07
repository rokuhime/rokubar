// TODO

const r = require('raylib');
const fs = require('fs');

class Config {
	// returns config as an array of variables
	static getConfig(filepath) {

		// prep values with needed variables
		let values = {
			"colour_bg": "80,80,80",
			"bar_width": 30,
		}

					  
		// cycle through file
		let file = r.LoadFileText(filepath)
    	for (let line of file.split("\n")) {

			// skip comments and blank lines
			line = line.trim()
			if(line.startsWith("//") || line.length == 0) break;

			// split up name and value
			const line_name = line.substring(0, line.indexOf("=")).trim()
    		let line_value = line.substring(line.indexOf("=") + 1, line.length).trim()
			
			// format when needed, and assign setting to values
			// if(line_name.includes("colour")) line_value = this.getColour(line_value)
			
			values[line_name] = line_value

		}
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