//create a rectangle
class clRectangle extends clShape
{
	constructor(x, y, hspeed, vspeed, height, width)
    {
		super(x, y, hspeed, vspeed)
		this._width = width;
		this._height = height;
		this._fill = 255; //set the default fill to white
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
	set fill(fillVal)
	{
		this._fill = fillVal;
	}
	get fill()
	{
		return this._fill;
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
		push();
		fill(this._fill);
		rect(this.x, this.y, this.width, this.height);
		pop();
		textAlign(CENTER, CENTER);
		text(this.text, this.x + this._width / 2, this.y + this._height / 2);
	}
	drawLast()
	{

	}
}