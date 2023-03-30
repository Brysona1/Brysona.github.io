class clSquare extends clShape
{
    constructor(x, y, hspeed, vspeed, size)
    {
        super(x, y, hspeed, vspeed)
        this._size = size;
    }

    set size(sz)
    {
        this._size = sz;
    }
    get size()
    {
        return this._size;
    }

    draw()
    {
        square(this.x, this.y, this.size);
    }
	drawLast()
	{

	}
    step()
    {
        this.x += this.hspeed;
        this.y += this.vspeed;
    }
}