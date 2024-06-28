const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

var windowWidth = canvas.width;
var windowHeight = canvas.height;

// Pixels to be colored
let pixels = Array(windowHeight).fill(0).map(()=>Array(windowWidth).fill(0).map(()=>{return [0,0,0]}));

var camera = new Camera(0,0,0, [windowHeight, windowWidth]);

pixels = camera.rays;

paint(pixels);






function paint(pixels) {
	for (let i = 0; i < windowHeight; i++) {
		for (let j = 0; j < windowWidth; j++) {
			let color = pixels[i][j];

			ctx.fillStyle = `rgb(${255*color[0]/2 + 255/2}, ${255*color[1]/2 + 255/2}, ${255*color[2]/2 + 255/2})`;
			ctx.fillRect(i, j, 1, 1);
		}
	}
}

