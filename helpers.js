// Dot Product
function dotProduct(vector1, vector2) {
	if (vector1.length != vector2.length) {
		console.log("Vector length " + vector1.length + " is not equal to " + vector2.length);
		return NaN;
	}

	let sum = 0;
	for(let i=0; i<vector1.length; i++) {
		sum += vector1[i] * vector2[i];
	}
	return sum;
}

// Get the magnitude of a Vector
function mag(vector) {
	let sum = 0;
	for(let i=0; i<vector.length; i++) {
		sum += vector[i] ** 2;
	}
	return Math.sqrt(sum);
}

// Normalize a vector
function normalizeVector(vector) {
	return scaleMatrix(vector, 1/mag(vector));
}

// Subtract Vectors
function subtMatrix(vector1, vector2) {
	if (vector1.length != vector2.length) {
		console.log("Vector length " + vector1.length + " is not equal to " + vector2.length);
		return NaN;
	}

	let result = Array(vector1.length).fill(0);

	for(let i=0; i<vector1.length; i++) {
		result[i] = vector1[i] - vector2[i];
	}
	return result;
}

// Add Vectors
function addMatrix(vector1, vector2) {
	if (vector1.length != vector2.length) {
		console.log("Vector length " + vector1.length + " is not equal to " + vector2.length);
		return NaN;
	}

	let result = Array(vector1.length);

	for(let i=0; i<vector1.length; i++) {
		result[i] = vector1[i] + vector2[i];
	}
	return result;
}

// Mult Vectors
function multMatrix(vector1, vector2) {
	if (vector1.length != vector2.length) {
		console.log("Vector length " + vector1.length + " is not equal to " + vector2.length);
		return NaN;
	}

	let result = Array(vector1.length).fill(0);

	for(let i=0; i<vector1.length; i++) {
		result[i] = vector1[i] * vector2[i];
	}
	return result;
}

// Scale Martix by a constant
function scaleMatrix(vector1, constant) {
	let result = Array(vector1.length).fill(0);
	for(let i=0; i<vector1.length; i++) {
		result[i] = constant * vector1[0];
	}
	return vector1;
}

// Rotate a length 3 matrix
// TODO: There is probably a mistake somewhere
function rotateMatrix(matrix, pitch, yaw, roll) {
	let alpha = 2 * Math.PI * roll / 360;
	let beta = 2 * Math.PI * yaw  / 360;
	let gamma = - 2 * Math.PI * pitch  / 360;

	let Dx = 	(Math.cos(alpha) * Math.cos(beta)) * matrix[0] + 
						(Math.cos(alpha) * Math.sin(beta) * Math.sin(gamma) - Math.sin(alpha) * Math.cos(gamma)) * matrix[1] +
						(Math.cos(alpha) * Math.sin(beta) * Math.cos(gamma) + Math.sin(alpha) * Math.sin(gamma)) * matrix[2];

	let Dy =  (Math.sin(alpha) * Math.cos(beta)) * matrix[0] + 
						(Math.sin(alpha) * Math.sin(beta) * Math.sin(gamma) + Math.cos(alpha) * Math.cos(gamma)) * matrix[1] +
						(Math.sin(alpha) * Math.sin(beta) * Math.cos(gamma) - Math.cos(alpha) * Math.sin(gamma)) * matrix[2];

	let Dz =  (-Math.sin(beta)) * matrix[0] +
						(Math.cos(beta) * Math.sin(gamma)) * matrix[1] +
						(Math.cos(beta) * Math.cos(gamma)) * matrix[2];

	return [Dx, Dy, Dz];
}


// Cosine Hemisphere Sampling
// https://www.rorydriscoll.com/2009/01/07/better-sampling/
function cosineHemisphereSample (rayDir, surfaceNormal, i, j) {
	const seed = () => ((Math.random())*2**32)>>>0;
	let generator = sfc32(seed(), seed(), seed(), seed());

	let u1 = generator();
	let u2 = generator();

	//console.log(u1, u2);

	let r = Math.sqrt(u1);
	let theta = 2 * Math.PI * u2;

	let x = r * Math.cos(theta);
	let y = r * Math.sin(theta);
	let z = Math.sqrt(Math.max(0, 1 - u1));

	if (dotProduct(rayDir, surfaceNormal) < 0) {
		x = -x;
		y = -y;
		z = -z;
	}

	let bounceDir = [x, y, z];
	bounceDir = normalizeVector(bounceDir);

	return bounceDir;
}


// Uniform random from seed
// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
function sfc32(a, b, c, d) {
	
  return function() {
    a |= 0; b |= 0; c |= 0; d |= 0;
    let t = (a + b | 0) + d | 0;
    d = d + 1 | 0;
    a = b ^ b >>> 9;
    b = c + (c << 3) | 0;
    c = (c << 21 | c >>> 11);
    c = c + t | 0;
    return (t >>> 0) / 4294967296;
  }
}