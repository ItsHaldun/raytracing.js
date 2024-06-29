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
	for(let i=0; i<vector1.length; i++) {
		vector1[i] *= constant;
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
function cosineHemisphereSample (rayDir, surfaceNormal) {
	let u1 = Math.random();
	let u2 = Math.random();

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
	bounceDir = scaleMatrix(bounceDir, 1/mag(bounceDir));

	return bounceDir;
}