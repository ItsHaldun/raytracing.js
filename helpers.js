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

