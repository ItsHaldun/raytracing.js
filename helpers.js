// Dot product
function dotProduct(matrix1, matrix2) {
	if (matrix1.length != matrix2.length) {
		console.log("Matrix length " + matrix1.length + "is not equal to" + matrix2.length);
		return NaN;
	}

	let sum = 0;
	for(let i=0; i<matrix1.length; i++) {
		sum += matrix1[i] * matrix2[i];
	}
	return sum;
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