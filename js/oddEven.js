"use strict"
const $ = selector => document.querySelector(selector);

let values = [];
let counter = 0;
var sorted = false;
let didSwap = false;
let onEven = true;
let k = 1;

//initalize speed slider
let fps = 10;
document.getElementById("fpsRange").value = fps;

// The statements in the setup() function
// execute once when the program begins
// The array is filled with random values in setup() function.
function setup() {
    let x = ($("#content").offsetWidth)*.8;
    canvas = createCanvas(x, window.innerHeight * .8);
    canvas.parent('content');
    for (let i = 0; i < 30; i++) {
        values.push(floor(Math.random() * (height - 10)) + 10);
    }
    frameRate(fps);
}

// The statements in draw() function are executed until the
// program is stopped. Each statement is executed in
// sequence and after the last line is read, the first
// line is executed again.
function draw() {
    background(250);
    oddEvenSort();
    drawKey();
    fps = document.getElementById("fpsRange").value;
    frameRate(parseInt(fps));
}

// Swap emelent i and j in the values array
function swap(i, j) {
    let temp = values[i];
    values[i] = values[j];
    values[j] = temp;
}

//manually perform action of a for loop
function iterateLoop() {
    //increment count
    k += 2;

    //check if we are at the end of the list
    if (k > values.length - 1) {
        //switch between even and odd run of the algorithm
        if (onEven) {
            onEven = false;
            k = 0;
        } else {
            onEven = true;
            k = 1;
        }
        //check if array is sorted
        if (!sorted) {
            sorted = true; //assume array is sorted unless a swap is performed
        } else {
            noLoop();
        }
    }
}

//draw the array to the canvas
function drawList() {
    //redraw values array
    push();
    for (let i = 0; i < values.length; i++) {
        stroke(100, 143, 143);
        if (i == k || i == k + 1) {
            if (didSwap) {
                fill(122, 189, 145); //green
            } else {
                fill(255, 105, 98); //red
            }
        } else {
            fill(50);
        }
        rect(i * (width / values.length), height, (width / values.length), -values[i], 20);
    }
    pop();
}

//handle 1 itteration of odd even sort algorithm
//sorts the values array in ascending order
function oddEvenSort() {
    //perform one iteration of odd even
    didSwap = false;
    if (counter%2) {
        //perform swap
        if (values[k] > values[k + 1]) {
            swap(k, k + 1);
            didSwap = true;
            sorted = false;
        }
        drawList();
        iterateLoop();
        counter++;
    } else {
        //select next two elements and check if a swap is needed
        if (values[k] > values[k + 1]) {
            didSwap = true;
            sorted = false;
        }
        drawList();
        if (!didSwap) {
            iterateLoop();
            counter+=2;
        } else {
            counter++;
        }
    }
}

//toggle automatic sorting
const toggleAnimation = () => {
    if (isLooping()) {
        $("#toggleAnimation").value = "Manual";
        noLoop();
    } else {
        $("#toggleAnimation").value = "Auto";
        loop();
    }
}

//perform next step in the sorting algorithm
const nextStep = () => {
    background(250);
    oddEvenSort();
    drawKey();
}

//handle window resizing
function windowResized() {
    let x = ($("#content").offsetWidth)* .8;
    resizeCanvas(x, window.innerHeight * .8);
}

//draws the key  in the top corner
function drawKey() {
    push();
    fill(122, 189, 145);
    square(5, 5, 25);
    fill(255, 105, 98);
    square(5, 35, 25);
    pop();
    textAlign(LEFT, CENTER);
    textSize(16);
    text("Needs Swapped", 35, 20);
    text("Don't Swap", 35, 50);
}
//add event handlers to buttons
document.addEventListener("DOMContentLoaded", () => {
    $("#toggleAnimation").addEventListener("click", toggleAnimation);
    $("#nextStep").addEventListener("click", nextStep);
});