class Camera {
	constructor(x, y, z, screenRes, screenScale=1, focalLength=1, pitch=0, yaw=0, roll=0) {
		// Coordinates
		this.x = x;
		this.y = y;
		this.z = z;

		// Angles
		this.pitch = pitch;
		this.yaw = yaw;
		this.roll = roll;
		
		// Camera Properties
		this.screenRes = screenRes;
		this.focalLength = focalLength;
		this.screenScale = screenScale;


		this.rays = Array(this.screenRes[0]).fill(0).map(()=>Array(this.screenRes[1]).fill(0).map(()=>{return 0}));
		this.calculateRayDirections();
	}

	//TODO: Do this in GPU once I implement movement?
	calculateRayDirections() {
		for (let i = 0; i < this.screenRes[0]; i++) {
			let RowCoordinate = this.screenScale * ((i - this.screenRes[0]/2)/this.screenRes[0]);

			for (let j = 0; j < this.screenRes[1]; j++) {
				let ColumnCoordinate = this.screenScale * ((j - this.screenRes[1]/2)/this.screenRes[1]);

				// Relative to camera origin
				let Dx = RowCoordinate;
				let Dy = - ColumnCoordinate;
				let Dz = this.focalLength;

				let tranforms = rotateMatrix([Dx, Dy, Dz], this.pitch, this.yaw, this.roll);

				let dist = Math.sqrt(tranforms[0]**2 + tranforms[1]**2 + tranforms[2]**2);
				
				Dx = tranforms[0] / dist;
				Dy = tranforms[1] / dist;
				Dz = tranforms[2] / dist;

				this.rays[i][j] = [Dx, Dy, Dz];
			}
		}
	}

	// Find the intersection for the closest object for a single ray
	find_intersection(ray, rayOrigin, objects) {
		let didHit = false;
		let closest_t = Infinity;
		let closest_object = null;
		let hitPoint = null;
		let surfaceNormal = null;

		for (let i = 0; i < objects.length; i++) {
			let t = this.ray_intersect(ray, rayOrigin, objects[i], this.focalLength, closest_t);
			
			if (t != false) {
				if (t < closest_t) {
					didHit = true;
					closest_t = t;
					closest_object = objects[i];
					hitPoint = addMatrix(rayOrigin, scaleMatrix(ray, t));
					surfaceNormal = subtMatrix(hitPoint, [closest_object.x, closest_object.y, closest_object.z]);
					surfaceNormal = scaleMatrix(surfaceNormal, 1/mag(surfaceNormal));
				}
			}
		}
		return {"didHit": didHit, "hitObject": closest_object, "hitPoint": hitPoint, "surfaceNormal": surfaceNormal};
	}

	// Find the intersection between an object and a ray
	ray_intersect(rayDir, rayOrigin, object, min_t, max_t) {
		let centralVector = subtMatrix([object.x, object.y, object.z], rayOrigin);
		let centralDist = mag(centralVector);

		//console.log(ray, rayOrigin, centralVector);
		let tc = dotProduct(rayDir, centralVector);
		//console.log(centralDist);


		// Ray does not intersect sphere if tc < 0 (away from camera)
		if (tc < 0) return false;

		let d = Math.sqrt(centralDist ** 2 - tc**2);
		//console.log(d, centralDist, tc);

		// Ray does not intersect if d > radius (ray missed sphere) (ONLY FOR SPHERES)
		if (d > object.radius) return false;

		let t1c = Math.sqrt(object.radius**2 - d**2);

		let t = tc - t1c;

		if (t > min_t && t < max_t) {
			return tc - t1c;
		}
		else {
			return false;
		}
	}
}