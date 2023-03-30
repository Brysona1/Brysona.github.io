class clShape
{
	constructor(x, y, hspeed, vspeed)
	{
		this._id = idGen++;
		this._x = x;
		this._y = y;
		this._destx = null;
		this._desty = null;
		this._hspeed = hspeed;
		this._vspeed = vspeed;
		this._moveCounter = 0;
		this._hasDestination = false;
	}

	//Getter/Setters
	get id()
	{
		return this._id;
	}
	set x(xpos)
	{
		this._x = xpos;
	}
	get x()
	{
		return this._x;
	}
	set y(ypos)
	{
		this._y = ypos;
	}
	get y()
	{
		return this._y;
	}
	set vspeed(vsp)
	{
		this._vspeed = vsp;
	}
	get vspeed()
	{
		return this._vspeed;
	}

	set hspeed(hsp)
	{
		this._hspeed = hsp;
	}
	get hspeed()
	{
		return this._hspeed;
	}

	step()
	{
		if (this._hasDestination == true) //If it is moving to a point
		{
			if (this._moveCounter == 0) //If it has reached its approximate destination
			{
				
				this.hspeed = 0; //Set the speed to 0
				this.vspeed = 0;

				this.x = this._destx; //set the object to its destination
				this.y = this._desty;

				this._hasDestination = false; //It no longer has a destination
			}
			else {this._moveCounter -= 1;} //Or else, just decrement the move counter
		}

		this.x += this.hspeed;
		this.y += this.vspeed;

	}

	moveToPoint(x, y, speed)
	{
		//get the destination
		this._destx = x;
		this._desty = y;

		//calculate how much the shape should move each frame
		let angle = -atan2(this._desty - this.y, this._destx - this.x);
		this.vspeed = lengthdir_y(speed, angle);
		this.hspeed = lengthdir_x(speed, angle);

		//calculate how many frames it should move until it stops
		let numSteps = dist(this.x, this.y, this._destx, this._desty) / speed;
		this._moveCounter = round(numSteps);

		this._hasDestination = true;
	}
}