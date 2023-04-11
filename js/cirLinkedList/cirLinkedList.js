class CirLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;

        //Animation Controller variables
        this.animObj = null; //The object that is currently being animated
        this.animType = 0; //The animation being performed, or 0 for no animation
        this.animStep = 0; //The current step of the animation being performed
        this.animCounter = 0; //Used to slow down animations
    }

    push() { //add to back
        this.animType = 1;
        this.animStep = 0;
        let newNode = null;
        if (this.length === 0) { //If it is the first node, put it at 100, 100 and we are done
            let coords = this.findPos(0);
            newNode = this.createNode(-100, coords[1] + 50); //create the node
            newNode.moveToPoint(coords[0], coords[1], 5);
            this.head = newNode;
            this.tail = newNode;
        } else {
            let coords = this.findPos(this.length);
            if (coords[0] > canvasWidth/2)
            {
                newNode = this.createNode(canvasWidth + 50, coords[1] - 50);
            }
            else
            {
                newNode = this.createNode(-100, coords[1] - 50);
            }
            newNode.moveToPoint(coords[0], coords[1], 5);
        }
        this.animObj = newNode;
        this.length++;
        return this;
    }

    pop() { //remove from back
        if (this.length === 0) return undefined;
        this.animType = 2;
        this.animStep = 0;
        this.animObj = this.tail; //set temp to end node
        if (this.length === 1) { //If only node in list
            this.head = null; //just delete it
            this.tail = null;
        } else {
            this.tail = this.tail._prevObj; //set tail to new last node
            if (this.tail == this.head) {
                this.tail.assignNext(null);
            } else {
                this.tail.assignNext(this.head);
                this.tail._arrowType = 2;
            }
            this.head.assignPrev(this.tail);
        }
        this.length--; //decrement length
    }

    shift() { //remove from front
        if (this.length === 0) return undefined;
        this.animType = 3;
        this.animStep = 0;
        this.animObj = this.head; //set animated object to first node
        if (this.length === 1) { //if only node in list
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head._nextObj;
            if (this.tail == this.head) {
                this.tail.assignNext(null);
            } else {
                this.tail.assignNext(this.head);
            }
            this.head.assignPrev(this.tail); //unassign the previous pointer from the new head node
        }
        this.length--; //decrement length by 1
    }

    unshift() { //add to front
        this.animType = 4;
        this.animStep = 0;
        let newNode = null;
        if (this.length === 0) { //If it is the first node, put it at 100, 100 and we are done
            let coords = this.findPos(0);
            newNode = this.createNode(-100, coords[1] + 50); //create the node
            newNode.moveToPoint(coords[0], coords[1], 5);
            this.head = newNode;
            this.tail = newNode;
        } else {
            let coords = this.findPos(0);
            newNode = this.createNode(-100, coords[1] + 50); //create the node
        }
        this.animObj = newNode;
        this.length++; //add 1 to the length
        return this;
    }
    deleteValue(value) {
        let current = this.head;
        for (let i = 1; current != null && current._value != value; i++) {
            if (current != this.tail) {
                current = current._nextObj;
            } else {
                current = null;
            }
        }
        if (this.head == null || current == null) {
            return null;
        }
        let test = current;
        if (current == this.head) {
            this.shift();
        } else if (current == this.tail) {
            this.pop();
        } else {
            this.animType = 5;
            this.animStep = 0;
            this.animObj = current;
            this.length--;
        }
    }
    outputToArray() {
        let array = [];
        var curNode = this.head;
        while (curNode != null) {
            array.push(curNode);
            curNode = curNode._nextObj;
        }
        return array;
    }

    createNode(xPos, yPos)
    {
        let input = $("#pushInput").value;
        let newPos = Shapes.length;
        Shapes[newPos] = new clNode(xPos, yPos, 0, 0, 40, 125);
        Shapes[newPos].value = input;
        return(Shapes[newPos]);
    }

    checkAnimation() {
        if (this.animCounter > 0) //used to pause the animation for a few frames 
        {
            this.animCounter -= 1;
            return;
        }

        switch (this.animType) {
            case 1: //push
                this.animPush();
                break;
            case 2: //pop
                this.animPop();
                break;
            case 3: //shift
                this.animShift();
                break;
            case 4: //unshift
                this.animUnshift();
                break;
            case 5: //delete at 
                this.animDeleteValue();
            default:
                break;
        }
    }

    animPush() {
        switch (this.animStep) {
            case 0:
                //node has been created and is moving to its position
                if (this.animObj._hasDestination == false) {
                    if (this.length == 1) {
                        this.animType = 0; //This is the only item in the list, don't assign it to anything
                    }
                    this.animStep++; //the object has reached its destination
                    this.animCounter = 30;
                }
                break;
            case 1:
                this.tail.assignNext(this.animObj);
                this.tail._arrowType = 1;
                this.animStep++;
                this.animCounter = 30;
                break;
            case 2:
                this.animObj.assignPrev(this.tail);
                this.animObj._arrowType = 2;
                this.tail = this.animObj;
                this.tail.assignNext(this.head);
                this.head.assignPrev(this.tail);
                this.animType = 0;
                break;
        }

    }
    animPop() 
    {
        switch (this.animStep) 
        {
            case 0:
                this.animStep++;
                this.animCounter = 30;
                break;
            case 1:
                if (this.animObj._hasDestination == false) 
                {
                    this.animObj.moveToPoint(this.animObj.x - 50, this.animObj.y, 5);
                    this.animObj.delete();
                }
                if (this.animObj.deleted) 
                {
                    this.animType = 0;
                }
                break;
        }
    }
    animShift() 
    {
        switch (this.animStep) 
        {
            case 0:
                this.animStep++;
                this.animCounter = 30;
                break;
            case 1:
                if (this.animObj._hasDestination == false) 
                {
                    this.animObj.moveToPoint(this.animObj.x - 50, this.animObj.y, 5);
                    this.animObj.delete();
                }
                this.animStep++;
                break;
            case 2:
                if (this.animObj.deleted) 
                {
                    if (this.head == null)
                    {
                        this.animType = 0; //If there is nothing in the list, break animation early
                    }
                    else
                    {
                        this.moveList();
                        this.animStep++;
                    }
                }
                break;
            case 3:
                let temp = this.head;
                this.animType = 0;
                for (let i = 0; i < this.length; i++)
                {
                    if (temp._hasDestination == true) //if object is moving
                    {
                        this.animType = 3;
                    }
                    temp = temp._nextObj;
                }
                break;
        }
    }
    animUnshift() //push front
    {
        switch (this.animStep) 
        {
            case 0:
                let coords = this.findPos(0);
                if (this.length != 0)
                {
                    this.moveList(1);
                }
                this.animObj.moveToPoint(coords[0], coords[1], 5)
                this.animStep++;
                break;
            case 1:
                //node has been created
                let nextStep = true;
                let temp = this.head;
                if (this.length == 0)
                {
                    for (let i = 0; i < this.length; i++)
                    {
                        if (temp._hasDestination == true) //if object is moving
                        {
                            nextStep = false;
                        }
                        this.temp = this.temp._nextObj;
                    }
                }
                
                if (this.animObj._hasDestination == true)
                {
                    nextStep = false;
                }

                if (nextStep)
                {
                    if (this.length == 1)
                    {
                        this.animType = 0; //This is the only item in the list, don't assign it to anything
                    }
                    else
                    {
                        this.animStep++; //the object has reached its destination
                        this.animCounter = 30;
                    }
                }
                break;
            case 2:
                this.animObj.assignNext(this.head);
                this.animStep++;
                this.animCounter = 30;
                break;
            case 3:
                this.head.assignPrev(this.animObj);
                this.head = this.animObj;
                this.tail.assignNext(this.head);
                this.tail._arrowType = 2;
                this.head.assignPrev(this.tail);

                this.animType = 0;
                break;
        }
    }
    animDeleteValue() 
    {
        switch (this.animStep) 
        {
            case 0:
                this.animObj._nextObj.assignPrev(this.animObj._prevObj);
                this.animStep++
                this.animCounter = 30;
                break;
            case 1:
                this.animObj._prevObj.assignNext(this.animObj._nextObj);
                this.animStep++
                this.animCounter = 30;
                break;
            case 2:
                if (this.animObj._hasDestination == false) 
                {
                    this.animObj.moveToPoint(this.animObj.x - 50, this.animObj.y, 5);
                    this.animObj.delete();
                }
                if (this.animObj.deleted) 
                {
                    this.animStep++;
                }
                break;
            case 3:
                this.moveList();
                this.animStep++;
                break;
            case 4:
                if (this.tail._hasDestination == false)
                {
                    this.animType = 0;
                }
                break;
        }
    }

    //animate entire list, moving all values to correct position over time
    moveList(numShift = 0)
    {
        let curIdx = numShift;
        let curObj = this.head;
        while (curObj != this.tail)
        {
            let coords = this.findPos(curIdx);
            curObj.moveToPoint(coords[0], coords[1], 5);
            curIdx++;
            curObj = curObj._nextObj;
        }
        
        let coords = this.findPos(curIdx);
        curObj.moveToPoint(coords[0], coords[1], 5);
    }

    snapList()
    {
        let curIdx = 0;
        let curObj = this.head;
        for (let i = 0; i < this.length; i++) //FIX
        {
            let coords = this.findPos(curIdx);
            if (curObj._hasDestination) //if object is moving
            {
                let shiftx = coords[0] - curObj._destx; //get the x and y offset
                let shifty = coords[1] - curObj._desty;
                curObj.x = curObj.x + shiftx; //shift the node by the offset
                curObj.y = curObj.y + shifty;
                curObj.moveToPoint(coords[0], coords[1], 5); //re-plot the point
            }
            else
            {
             curObj.x = coords[0]; //Snap the object to the new point
             curObj.y = coords[1];   
            }
            curIdx++;
            curObj = curObj._nextObj;
        }

        if (this.animObj != null)
        {
            curObj = this.animObj;
            let coords = this.findPos(curIdx);
            if (curObj._hasDestination) //if object is moving
            {
                let shiftx = coords[0] - curObj._destx; //get the x and y offset
                let shifty = coords[1] - curObj._desty;
                curObj.x = curObj.x + shiftx; //shift the node by the offset
                curObj.y = curObj.y + shifty;
                curObj.moveToPoint(coords[0], coords[1], 5); //re-plot the point
            }
            else
            {
             curObj.x = coords[0]; //Snap the object to the new point
             curObj.y = coords[1];   
            }
        }
    }
    //Function finds where a node should be on screen when given its integer position in the list
    // returns array of (x-coord, y-coord)
    findPos(listPos)
    {
        let height = canvasHeight / (gridY + 1); 
        let width = canvasWidth / (gridX + 1);

        let y = (listPos % gridY) + 1;
        let x = floor(listPos / gridY) + 1;
        
        if (x % 2 == 0) //Flip the order of y if x is even
        {
            y = y * -1;
            y = y + (gridY + 1);
        }
        let coords = [0,0];
        coords[0] = round(width * x - (125/2));
        coords[1] = round(height * y - (40/2));

        return coords;
    }
}
