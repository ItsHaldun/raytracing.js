class Camera {
	constructor(x, y, z, screenRes, screenScale=50, focalLength=35, pitch=0, yaw=0, roll=0) {
		this.x = x;
		this.y = y;
		this.z = z;

		this.pitch = pitch;
		this.yaw = yaw;
		this.roll = roll;
		
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

				let Dx = RowCoordinate - this.x;
				let Dy = ColumnCoordinate - this.y;
				let Dz = this.focalLength;

				let dist = Math.sqrt(Dx**2 + Dy**2 + Dz**2);
				
				Dx = Dx / dist;
				Dy = Dy / dist;
				Dz = Dz /dist;

				this.rays[i][j] = [Dx, Dy, Dz];
			}
		}
	}

}