//create a linked list node, with a previous pointer and a next pointer
class clNode extends clRectangle
{
	constructor(x, y, hspeed, vspeed, height, width)
	{
		super(x, y, hspeed, vspeed, height, width);

		this._value = this.id; //Holds the text that is drawn in the center
		this._deleted = 0; //Has this node been marked 'deleted'
		this._objAlpha = 255; //opacity of the object
		this._ptrSize = width * 2 / 7; //Calculates the width of the two pointer boxes.
		this._arrowType = 1;

		//Next object data
		this._nextObj = null; //Pointer to the next node
		this._hasNext = false; //Tracks whether there is a next node
		this._nextPtrx = this.x + this.width; //Used to draw the arrow that points to the next node 
		this._nextPtry = this.y + this.height / 2; 
		this._nextColor = color(255, 100, 50); //Colors the box and arrow of the next node box

		//Previous Object data
		this._prevObj = null; //Pointer to the previous node
		this._hasPrev = false; //Tracks whether there is a previous node
		this._nextPtrDestx = this.x; //Used to draw the arrow that comes from the previous node
		this._nextPtrDesty = this.y + this.height / 2;

	}

	set value(input) 
	{
		this._value = input;
	}
	get value() 
	{
		return this._value;
	}
	set alpha(input) {
		this._objAlpha = input;
		this._nextColor.setAlpha(input);
	}
	get alpha() {
		return this._objAlpha;
	}
	delete() {
		this._deleted = 1;
	}
	get deleted() {
		if (this._deleted == 2) {
			return true;
		}
		else return false;
	}
	step()
	{
		//Must be executed AFTER x and y are updated.
		if (this._deleted == 2) return;
		else if (this._deleted == 1) 
		{
			if (this.alpha <= 0) {
				this._deleted = 2;
			}
			else this.alpha -= 15;
		}
		super.step(); //call clRectangle's step event

        if (this._hasNext)
        {
            this.calcNextArrow();
        }
        if (this._hasPrev)
        {
            this.calcNextArrowDest();
        }
	}
	
	draw()
	{
		if (this._deleted == 2) return;
		push();
		fill(255, this.alpha);
		stroke(0, this.alpha);
		//Draw the boxes that make the node's shape
		beginShape(QUAD_STRIP);
		//first vertical line
		vertex(this.x, this.y);
		vertex(this.x, this.y + this.height);
		//second vertical line
		vertex(this.x + this.width - this._ptrSize, this.y);
		vertex(this.x + this.width - this._ptrSize, this.y + this.height);
		//third vertical line
		vertex(this.x + this.width, this.y);
		vertex(this.x + this.width, this.y + this.height);
		endShape();
		
		//Setup the text
		fill(0);
		textAlign(CENTER, CENTER);
		text(this._value, this.x + (this.width - this._ptrSize)/2, this.y + this.height/2);

		stroke(this._nextColor); //set the stroke color for the next node box's text
		fill(this._nextColor); //set the fill color for the next node box's text
		if (this._hasNext)
		{
			//If there is a next node, draw the next node's ID inside this node's rightmost box.
			text(this._nextObj._id, this.x + this.width - this._ptrSize / 2, this.y + this.height / 2);
		}
		else
		{
			//If there isn't a next node, draw a diagonal (null) line in the leftmost box.
			line(this.x + this.width, this.y, this.x + this.width - this._ptrSize, this.y + this.height);
			//Alternatively, spell out the word 'null'
			//text('null', this.x + this.width - this._ptrSize / 2, this.y + this.height / 2);
		}
        pop(); //Return to original draw state.
	}
	drawLast()
	{
		if (this._deleted == 2) return;
		if (this._hasNext)
		{
			push();
			stroke(this._nextColor);
			//If there is a next node, draw an arrow from this node to the next node.
			if (this._arrowType == 1)
			{
				arrow(this._nextPtrx, this._nextPtry, this._nextObj._nextPtrDestx, this._nextObj._nextPtrDesty, 10, 25);
			}
			else
			{
				endArrow(this.x + this.width, this.y + (this.height / 2), this._nextObj.x + (this._nextObj.width / 2), this._nextObj.y, 20, 10, 25)
			}
			pop();
		}
	}
	
    calcNextArrow() //calculate where the nextPtr arrow should start
    {
        let nextAngle = -atan2(this.y - this._nextObj.y, this._nextObj.x - this.x);
        if (nextAngle >= -22.5 && nextAngle < 22.5) //The arrow should leave the middle
        {
            this._nextPtrx = this.x + this.width;
            this._nextPtry = this.y + this.height / 3;
        }
        else if (nextAngle >= 22.5 && nextAngle < 165)
        {
            this._nextPtrx = this.x + this.width - this._ptrSize/2;
            this._nextPtry = this.y + this.height;
        }
		else if (nextAngle >= -165 && nextAngle < -22.5)
        {
            this._nextPtrx = this.x + this.width - this._ptrSize/2;
            this._nextPtry = this.y;
        }
		else{
			this._nextPtrx = this.x;
            this._nextPtry = this.y + this.height / 3;
		}
    }

    calcNextArrowDest() //calculate where the previous shape's nextPtr arrow should end
    {
        let prevAngle = -atan2(this.y - this._prevObj.y, this.x - this._prevObj.x);
		let middleSize = this._width - (2 * this._ptrSize);

        if (prevAngle >= -22.5 && prevAngle < 22.5) //The arrow should leave the middle
        {
            this._nextPtrDestx = this.x;
            this._nextPtrDesty = this.y + this.height / 3;
        }
        else if (prevAngle >= 22.5 && prevAngle < 165)
        {
            this._nextPtrDestx = this.x + this._width - middleSize;
            this._nextPtrDesty = this.y + this.height;
        }
		else if (prevAngle >= -165 && prevAngle < -22.5)
        {
			this._nextPtrDestx = this.x + this._width - middleSize;
            this._nextPtrDesty = this.y;
        }
		else
		{
			this._nextPtrDestx = this.x + this.width;
            this._nextPtrDesty = this.y + this.height / 3;
		}
    }

	assignNext(next) {
		if (next == null) {
			this._nextObj = null;
			this._hasNext = false;
		} else {
			this._nextObj = next;
			this._hasNext = true;

			//This next bit of code 'hints' to the next object that the current object will be drawing an arrow
			//  to it, at the moment, nextObj doesn't know that the current object exists.
			//  Save whatever it is currently connected to, then tell it where the current object's arrow should end.
			let temp = this._nextObj._prevObj;
			this._nextObj._prevObj = this;
			this._nextObj.calcNextArrowDest();
			this._nextObj._prevObj = temp;
		}
	}
	assignPrev(prev) {
		if (prev == null) {
			this._prevObj = null;
			this._hasPrev = false;
		}
		else {
			this._prevObj = prev;
			this._hasPrev = true;
		}
	}
}