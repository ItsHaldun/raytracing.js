const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");


// Window Constants
const windowWidth = canvas.width;
const windowHeight = canvas.height;

// Ray Tracing Constants
const raysPerPixel = 10;
const bounceLimit = 3;

// Pixels to be colored
var pixels = Array(windowHeight).fill(0).map(()=>Array(windowWidth).fill(0).map(()=>{return [0,0,0]}));

var camera = new Camera(0,0,0, [windowHeight, windowWidth]);

var objects = new Objects().objects;


var beforeRender = Date.now();

trace(pixels);

console.log("Frametime: ", Date.now() - beforeRender);



function trace() {
	for (let i = 0; i < windowHeight; i++) {
		for (let j = 0; j < windowWidth; j++) {

			//console.log(i, j);
			let averageLight = [0, 0, 0];

			// For each ray of the pixel
			for (let r = 0; r < raysPerPixel; r++) {
				let rayColor = [1, 1, 1];
				let incomingLight = [0, 0, 0];
				let intersection = null;
				
				let rayOrigin = [camera.x, camera.y, camera.z];
				let rayDir = camera.rays[i][j];
				//console.log(rayDir, i, j, r);
				// For each bounce of the ray
				for (let b = 0; b < bounceLimit; b++) {
					intersection = camera.find_intersection(rayDir, rayOrigin, objects);
					//console.log(intersection);
					
					if (intersection["didHit"]) {
						rayOrigin = intersection["hitPoint"];

						// Diffuse Reflection
						rayDir = cosineHemisphereSample(rayDir, intersection["surfaceNormal"], i, j);

						// Specular Reflection
						//let a = 2 * dotProduct(rayDir, intersection["surfaceNormal"]);
						//let b = scaleMatrix(intersection["surfaceNormal"], a);
						//rayDir = subtMatrix(rayDir, b);

						let emittedLight = scaleMatrix(intersection["hitObject"].emissionColor, intersection["hitObject"].emissionStrength);
						incomingLight = addMatrix(incomingLight, multMatrix(emittedLight, rayColor));
						rayColor = multMatrix(rayColor, intersection["hitObject"].color);
						//console.log(emittedLight, incomingLight, rayColor);
					}
					else {
						break;
					}
				}
				averageLight = addMatrix(averageLight, incomingLight);
			}
			averageLight = scaleMatrix(averageLight, 1/raysPerPixel);

			averageLight.forEach(element => {
				if (element > 1) {
					element = 1;
				}
				if (element < 0) {
					element = 0;
				}
			});

			ctx.fillStyle = `rgb(${255*averageLight[0]}, ${255*averageLight[1]}, ${255*averageLight[2]})`;
			ctx.fillRect(i, j, 1, 1);
		}
	}
}