const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

var windowWidth = canvas.width;
var windowHeight = canvas.height;

// Pixels to be colored
let pixels = Array(windowHeight).fill(0).map(()=>Array(windowWidth).fill(0).map(()=>{return [0,0,0]}));

var camera = new Camera(0,0,0, [windowHeight, windowWidth]);
pixels = camera.rays;

var objects = new Objects().objects;


var beforeRender = Date.now();

paint(pixels);

console.log("Frametime: ", Date.now() - beforeRender);



function paint(pixels) {
	for (let i = 0; i < windowHeight; i++) {
		for (let j = 0; j < windowWidth; j++) {

			let color = [0, 0, 0];
			//let color = pixels[i][j];
			//console.log(i, j);

			let intersection = camera.find_intersection(camera.rays[i][j], objects);
			

			if (intersection[0] < Infinity) {
				//console.log(intersection);
				color = intersection[1].color;
			}

			if ([camera.intersect])

			ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
			ctx.fillRect(i, j, 1, 1);
		}
	}
}