const $ = selector => document.querySelector(selector);

let Shapes = []; //This is where every shape is stored, regardless of type
let dict = new Object();
let idGen = 1; //Used to generate a unique object ID for every node.
let canvasWidth = 500;
let canvasHeight = 1000;
let keyWidth = 0; //Width of each key or value box, calculated in calcScreenSize
let keyHeight = 30;

function setup() {
    angleMode(DEGREES);
    textSize(16);
    calcScreenSize();
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('content');
}

function draw() {
    //Perform each object's step event
    for (let i = 0; i < Shapes.length; i++) {
        Shapes[i].step()
    }

    background(220);

    //Add the key and value table header
    rect((canvasWidth/2) - keyWidth, 0, keyWidth, keyHeight);
    rect((canvasWidth/2), 0, keyWidth, keyHeight);
    textAlign(CENTER,CENTER);
    push()
    textStyle(BOLD);
    text("Key", (canvasWidth/2) - (keyWidth / 2), keyHeight/2);
    text("Value", (canvasWidth/2) + (keyWidth / 2), keyHeight/2);
    pop();
    
    //Perform each object's draw event
    for (let i = 0; i < Shapes.length; i++) {
        Shapes[i].draw();
    }
    for (let i = 0; i < Shapes.length; i++) {
        Shapes[i].drawLast();
    }
}

function addKey() {

    var x = document.getElementById("key").value;
    var y = document.getElementById("value").value;
    if (x == "") {return}
    dict[x] = y;
    buildShapes(dict);
}
function clearDictionary() {
    dict = new Object();
    buildShapes(dict);
}
function buildShapes(dict) {
    Shapes = []; //Rebuild the Shapes array
    for (var key in dict) { //add all keys
        var value = dict[key];
        
        let count = Shapes.length/2;

        let fillVal = 230; //light grey fill color
        if (count % 2 == 0)
        {
            fillVal = 255; //white fill color
        }
        shapeLen = Shapes.length;
        //Draw 'key' rectangle
        Shapes[shapeLen] = new clRectangle((canvasWidth/2) - keyWidth, keyHeight + (keyHeight*count), 0, 0, keyHeight, keyWidth);
        Shapes[shapeLen].fill = fillVal;
        Shapes[shapeLen].text = key;
        //Draw 'value' rectangle
        shapeLen = Shapes.length;
        Shapes[shapeLen] = new clRectangle(canvasWidth/2, keyHeight + (keyHeight*count), 0, 0, keyHeight, keyWidth);
        Shapes[shapeLen].fill = fillVal;
        Shapes[shapeLen].text = value;
    }
}

//calculates the canvasWidth and canvasHeight for when the canvas is created or the screen is resized
function calcScreenSize()
{
    let x = $("#content").offsetWidth;
    let minArea = 500 * 1000;
    let y = minArea / x;
    canvasWidth = x;
    canvasHeight = Math.max(800,y);

    if (canvasWidth > 600) //Make the width of the keys shorter on thinner screens
    {
        keyWidth = canvasWidth / 4;
    }
    else //Make the width of the keys longer on thinner screens
    {
        keyWidth = canvasWidth / 3;
    }
}

function windowResized()
{
    calcScreenSize();
    resizeCanvas(canvasWidth, canvasHeight, true);
    buildShapes(dict);
}
