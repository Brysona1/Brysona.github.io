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
            let xPos = -200;
            let yPos = 100;
            newNode = this.createNode(xPos, yPos); //create the node
            newNode.moveToPoint(100, 100, 5);
            this.head = newNode;
            this.tail = newNode;
        } else {
            let xPos = -200;
            let yPos = this.tail.y + 100;
            newNode = this.createNode(xPos, yPos);
            newNode.moveToPoint(this.tail.x, this.tail.y + 100, 5);
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
            }
            this.head.assignPrev(this.tail);
            //temp.assignPrev(null);
            //temp._prevObj = null;
        }
        this.length--; //decrement length
    }

    shift() { //remove from front
        if (this.length === 0) return undefined;
        this.animType = 3;
        this.animStep = 0;
        this.animObj = this.head; //set animated object to first node
        //this.head.delete(); //mark first node as deleted
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
            let xPos = -200;
            let yPos = 100;
            newNode = this.createNode(xPos, yPos); //create the node
            newNode.moveToPoint(100, 100, 5);
            this.head = newNode;
            this.tail = newNode;
        } else {
            let xPos = -200;
            let yPos = this.head.y - 100;
            newNode = this.createNode(xPos, yPos);
            newNode.moveToPoint(this.head.x, this.head.y - 100, 5);
            //newNode.assignNext(this.head); //put a new node in front of the first node
            //this.head.assignPrev(newNode); //assign old first node's previous to the new node
            //this.head = newNode; //make the new node the head of the list
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

    createNode(xPos, yPos) {
        let input = $("#pushInput").value;
        let newPos = Shapes.length;
        Shapes[newPos] = new clNode(xPos, yPos, 0, 0, 40, 125);
        Shapes[newPos].value = input;
        return (Shapes[newPos]);
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
                this.animStep++;
                this.animCounter = 30;
                break;
            case 2:
                this.animObj.assignPrev(this.tail);
                this.tail = this.animObj;
                this.tail.assignNext(this.head);
                this.head.assignPrev(this.tail);
                this.animType = 0;
                break;
        }

    }
    animPop() {
        switch (this.animStep) {
            case 0:
                this.animStep++;
                this.animCounter = 30;
                break;
            case 1:
                if (this.animObj._hasDestination == false) {
                    this.animObj.moveToPoint(this.animObj.x - 50, this.animObj.y, 5);
                    this.animObj.delete();
                }
                if (this.animObj.deleted) {
                    this.animType = 0;
                }
                break;
        }
    }
    animShift() {
        switch (this.animStep) {
            case 0:
                this.animStep++;
                this.animCounter = 30;
                break;
            case 1:
                if (this.animObj._hasDestination == false) {
                    this.animObj.moveToPoint(this.animObj.x - 50, this.animObj.y, 5);
                    this.animObj.delete();
                }
                if (this.animObj.deleted) {
                    this.animType = 0;
                }
                break;
        }
    }
    animUnshift() {
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
                this.animObj.assignNext(this.head);
                this.animStep++;
                this.animCounter = 30;
                break;
            case 2:
                this.head.assignPrev(this.animObj);
                this.head = this.animObj;
                this.tail.assignNext(this.head);
                this.head.assignPrev(this.tail);

                this.animType = 0;
                break;
        }
    }
    animDeleteValue() {
        switch (this.animStep) {
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
                if (this.animObj._hasDestination == false) {
                    this.animObj.moveToPoint(this.animObj.x - 50, this.animObj.y, 5);
                    this.animObj.delete();
                }
                if (this.animObj.deleted) {
                    this.animType = 0;
                }
                break;
        }
    }
    //moveList
    //moveList(direction)
    //{
    //do
    //check down
    //check up
    //check right
    //while (//while node != head) work from tail to head)
    //}
    //create a function that shifts every node to its next or previous grid position. 
}
