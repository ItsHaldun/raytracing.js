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

	//TODO: Implement camera movements
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
				Dz = tranforms[2] /dist;

				this.rays[i][j] = [Dx, Dy, Dz];
			}
		}
	}

	// Find the intersection for the closest object for a single ray
	find_intersection(ray, objects) {
		let closest_t = Infinity;
		let closest_object = null;

		for (let i = 0; i < objects.length; i++) {
			let t = this.ray_intersect(ray, objects[i], this.focalLength, closest_t);
			
			if (t != false) {
				if (t < closest_t) {
					closest_t = t;
					closest_object = objects[i];
				}
			}
		}
		//console.log(closest_t, closest_object);
		return [closest_t, closest_object];
	}

	// Find the intersection between an object and a ray
	ray_intersect(ray, object, min_t, max_t) {
		let centralVector = [object.x - this.x, object.y - this.y, object.z - this.z];
		let centralDistSquared = centralVector[0]**2 + centralVector[1]**2 + centralVector[2]**2;

		//console.log(ray);
		let tc = dotProduct(ray, centralVector);

		// Ray does not intersect sphere if tc < 0 (away from camera)
		if (tc < 0) return false;

		let d = Math.sqrt(centralDistSquared - tc**2);
		//console.log(centralDistSquared, tc**2);

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