class Objects {
	constructor() {
		this.objects = [
			{"shape":"sphere", 
			"x":-10, 
			"y":-10, 
			"z":50, 
			"radius":10,
			"color": [1,0,0],
			"emissionColor": [0,0,0],
			"emissionStrength":0},

			{"shape":"sphere", 
				"x":10, 
				"y":-10, 
				"z":50, 
				"radius":10,
				"color": [0,0,1],
				"emissionColor": [0,0,0],
				"emissionStrength":0},

			{"shape":"sphere", 
				"x":0, 
				"y":30, 
				"z":60,
				"radius":30,
				"color": [0,0,0],
				"emissionColor": [1,1,1],
				"emissionStrength":1}
		];
	}
}