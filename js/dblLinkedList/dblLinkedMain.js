//https://javascript.plainenglish.io/doubly-linked-lists-with-javascript-9c20a9dc4fb3

"use strict"
const $ = selector => document.querySelector(selector);

let Shapes = []; //This is where every shape is stored, regardless of type
let nodes = new DblLinkedList;
let canvasWidth = 1000;
let canvasHeight = 600;
let gridX = 4;
let gridY = 4;
let idGen = 0; //Used to generate a unique object ID for every node.
let mouseObj = null;


// The statements in the setup() function
// execute once when the program begins
// The array is filled with random values in setup() function.
function setup() {
	angleMode(DEGREES);
	let x = $("#content").offsetWidth;
	//create a canvas based on the window size with a min area of 600k pixles
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
		$("#deleteValueButton").disabled = true;
		nodes.checkAnimation();
	} else {
		$("#pushEndButton").disabled = false;
		$("#pushFrontButton").disabled = false;
		$("#popEndButton").disabled = false;
		$("#popFrontButton").disabled = false;
		$("#deleteValueButton").disabled = false;
	}
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

//functions to handle button actions
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
//add event handlers to buttons
document.addEventListener("DOMContentLoaded", () => {
	$("#pushEndButton").addEventListener("click", pushEndItem);
	$("#pushFrontButton").addEventListener("click", pushFrontItem);
	$("#popEndButton").addEventListener("click", popEndItem);
	$("#popFrontButton").addEventListener("click", popFrontItem);
	$("#deleteValueButton").addEventListener("click", deletevalue);
});

//handle to user resizing their browser window
function windowResized() {
	let x = $("#content").offsetWidth;
	let minArea = 600 * 1000;
	let y = minArea / x;
	canvasWidth = x;
	canvasHeight = Math.max(600,y);
	resizeCanvas(canvasWidth, canvasHeight, true);
	if (canvasWidth < 550)
	{
		gridX = 2;
		gridY = 8;
	}
	else
	{
		gridX = 4;
		gridY = 4;
	}
	nodes.snapList();
}