//https://javascript.plainenglish.io/doubly-linked-lists-with-javascript-9c20a9dc4fb3

"use strict"
const $ = selector => document.querySelector(selector);

let Shapes = []; //This is where every shape is stored, regardless of type
let nodes = new DblLinkedList;
let canvasWidth = 1000;
let canvasHeight = 600;
let idGen = 0; //Used to generate a unique object ID for every node.
let mouseObj = null;


// The statements in the setup() function
// execute once when the program begins
// The array is filled with random values in setup() function.
function setup() {
	angleMode(DEGREES);
	let x = $("#content").offsetWidth;
	let minArea = 600 * 1000;
	let y = minArea / x;
	canvas = createCanvas(x, Math.max(600, y));
	canvas.parent('content');
}

// The statements in draw() function are executed until the
// program is stopped. Each statement is executed in
// sequence and after the last line is read, the first
// line is executed again.
function draw() {
	//Perform each object's step event
	for (let i = 0; i < Shapes.length; i++) {
		Shapes[i].step()
	}

	background(220);

	//Perform each object's draw event
	for (let i = 0; i < Shapes.length; i++) {
		Shapes[i].draw();
	}
	for (let i = 0; i < Shapes.length; i++) {
		Shapes[i].drawLast();
	}

	if (nodes.animType != 0) //If there is a current animation
	{
		$("#pushEndButton").disabled = true;
		$("#pushFrontButton").disabled = true;
		$("#popEndButton").disabled = true;
		$("#popFrontButton").disabled = true;
		nodes.checkAnimation();
	} else {
		$("#pushEndButton").disabled = false;
		$("#pushFrontButton").disabled = false;
		$("#popEndButton").disabled = false;
		$("#popFrontButton").disabled = false;
	}
}

function mousePressed()
{
	for(let i = 0; i < Shapes.length; i++)
	{

		if (mouseX >= Shapes[i].x && mouseX <= Shapes[i].x + Shapes[i].width)
		{
			if (mouseY >= Shapes[i].y && mouseY <= Shapes[i].y + Shapes[i].height)
			{
				Shapes[i].hspeed = 0;
				Shapes[i].vspeed = 0;
				Shapes[i]._hasDestination = false;
				Shapes[i].selected = true;
				mouseObj = Shapes[i];
			}
		}
	}
}

function mouseReleased()
{
	if (mouseObj != null)
	{
		mouseObj.selected = false;
	}
}

//Find the GCD of 2 numbers
function gcd(x, y) {
	x = abs(x);
	y = abs(y);
	while (y) {
		var i = y;
		y = x % y;
		x = i;
	}
	return x;
}

//Convert a decimal to a fraction to the nearest thousandth, does not simplify. Ex 1.25 -> 5/4
//Outputs an array of 2 values, out[top, bottom]
function decToFrac(dec) {
	dec = round(dec * 1000);
	g = gcd(dec, 1000);

	out = [];
	out[0] = dec / g;
	out[1] = 1000 / g;
	return out;
}

//Calculate the x coordinate of a point with a specific distance and rotation from the origin
function lengthdir_x(dist, angle) {
	let x = dist * cos(angle);
	return x;
}
//Calculate the y coordinate of a point with a specific distance and rotation from the origin
function lengthdir_y(dist, angle) {
	let y = dist * -sin(angle);
	return y;
}

//Draw an arrow with a specific head length and head angle
function arrow(x1, y1, x2, y2, headLen, headAngle) {
	let startAngle = -atan2(y1 - y2, x1 - x2);

	//draw the arrow's line
	line(x1, y1, x2, y2);
	//draw the first arrow head
	let cwAngle = startAngle + headAngle;
	line(x2, y2, x2 + lengthdir_x(headLen, cwAngle), y2 + lengthdir_y(headLen, cwAngle));

	//draw the second arrow head
	let ccAngle = startAngle - headAngle;
	line(x2, y2, x2 + lengthdir_x(headLen, ccAngle), y2 + lengthdir_y(headLen, ccAngle));
}

const pushEndItem = () => {
	nodes.push();
}
const pushFrontItem = () => {
	nodes.unshift();
}
const popEndItem = () => {
	nodes.pop();
}
const popFrontItem = () => {
	nodes.shift();
}
const deletevalue = () => {
	nodes.deleteValue(($("#popInput").value));
}

document.addEventListener("DOMContentLoaded", () => {
	$("#pushEndButton").addEventListener("click", pushEndItem);
	$("#pushFrontButton").addEventListener("click", pushFrontItem);
	$("#popEndButton").addEventListener("click", popEndItem);
	$("#popFrontButton").addEventListener("click", popFrontItem);
	$("#deleteValueButton").addEventListener("click", deletevalue);
});
function windowResized() {
	let x = $("#content").offsetWidth;
	let minArea = 600 * 1000;
	let y = minArea / x;
	resizeCanvas(x, Math.max(600, y), true);
}