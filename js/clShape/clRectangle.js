//create a rectangle
class clRectangle extends clShape
{
	constructor(x, y, hspeed, vspeed, height, width)
    {
		super(x, y, hspeed, vspeed)
		this._width = width;
		this._height = height;
		this.selected = false;
		this.text = "";
    }

	set width(w)
	{
		this._width = w;
	}
	get width()
	{
		return this._width;
	}
	
	set height(h)
	{
		this._height = h;
	}
	get height()
	{
		return this._height;
	}

	step()
	{
		super.step();
		if (this.selected == true)
		{
			this.x += movedX;
			this.y += movedY;
		}
	}
	draw()
	{
		rect(this.x, this.y, this.width, this.height);
		textAlign(CENTER, CENTER);
		text(this.text, this.x + this._width / 2, this.y + this._height / 2);
	}
	drawLast()
	{

	}
}