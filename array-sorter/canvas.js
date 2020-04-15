// setup canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight / 2;
canvas.width = window.innerWidth;

// change canvas when window resize
window.addEventListener('resize', () => {
	canvas.height = window.innerHeight / 2;
	canvas.width = window.innerWidth;
	draw(arr);
});

// main variables used in program
var aa = null;
var currentlySorting = false;
var arr = [];
var DEFAULT_COLOR = "#b3f2ff";
var COMPARE_COLOR = "red";
var SWAP_COLOR = "lime";

function randInt(min,max) {
	return min + Math.floor((max - min) * Math.random());
} 

// draw
function draw(arr) {
	//clear canvas before
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	var currX = 50;
	var width = 30;
	var arr_size = arr.length;
	for (var i = 0; i < arr_size; i++) {
		height = arr[i].height;
		ctx.fillStyle = arr[i].color;
		ctx.fillRect(currX, canvas.height - height, width, height);
		currX += width + 10;
	}
}

// generate array from slider input
var slider1 = document.getElementById("arraySize");

	// display array from initial value
	for (var i = 0; i < slider1.value; i++) {
		arr.push({
			height: randInt(10,200),
			color: "#b3f2ff"
		});
	}
	draw(arr);

// modify array based using slider
slider1.oninput = function() {
	if (currentlySorting) {
		return;
	} 
	// generate new array
	arr = [];
	for (let i = 0; i < this.value; i++) {
		arr.push({
			height: randInt(10,200),
			color: DEFAULT_COLOR
		});
	}
 	draw(arr);
}

// set speed using slider
var slider2 = document.getElementById("sortSpeed");
var interval = slider2.value;
slider2.oninput = function() {
	interval = this.value;
}

// function for visualizing array 
function Animate(arr) {
	this._arr = arr;
	this.displayArray = []
	this.actions = [];

	for(var i = 0; i < arr.length; i++) {
		this.displayArray.push(arr[i]);
	}
	var _this = this;
	this.id = setInterval(() => {
		_this.step();
	}, interval);
}

Animate.prototype.step = function() {
	if (this.actions.length == 0) {
		draw(this._arr); 
		startButton.disabled = false;
		currentlySorting = false;
		clearInterval(this.id);
		return;
	}
	currentlySorting = true;
	var action = this.actions.shift();
	var i = action[1];
	var j = action[2];
	if (action[0] == 'compare') {
		this.displayArray[i].color = COMPARE_COLOR;
		this.displayArray[j].color = COMPARE_COLOR;
	}
	if (action[0] == 'swap') {
		this.displayArray[i].color = SWAP_COLOR;
		this.displayArray[j].color = SWAP_COLOR;
		var temp = this.displayArray[i];
		this.displayArray[i] = this.displayArray[i+1];
		this.displayArray[i+1] = temp;
	}
	// draw array
	draw(this.displayArray);
	// revert color after changes
	this.displayArray[i].color = DEFAULT_COLOR;
	this.displayArray[j].color = DEFAULT_COLOR;

}

Animate.prototype.greaterThan = function(i, j) {
	this.actions.push(['compare', i, j]);
	// show values currently being compared
	return this._arr[i].height > this._arr[j].height;
}

Animate.prototype.swap = function(i, j) {
	this.actions.push(['swap', i, j]);
	// array
	var temp = this._arr[i];
	this._arr[i] = this._arr[i+1];
	this._arr[i+1] = temp;
}

Animate.prototype.cancel = function() {
	clearInterval(this.id);
}

// event when start button is clicked

var startButton = document.getElementById("start");
var visualArr = null;
startButton.disabled = false;

startButton.addEventListener('click', function(event) {
	this.disabled = true;
	visualArr = new Animate(arr);
	getAlgo[algo](visualArr);
});

// the following are sorting algorithms 
// running the sorting algorithms will
// generate the step by step needed

var getAlgo = {
	'Bubble Sort': bubbleSort,
	'Insertion Sort': insertionSort,
	'Cocktail Sort': CocktailSort
}

var cs = document.getElementById("chooseSort");
var algo = "Bubble Sort";
cs.onchange = function(){
	algo = cs.options[cs.selectedIndex].text;
	console.log(algo);
};

function bubbleSort(visualArr) {
	let n = visualArr._arr.length;
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n - i - 1; j++) {
			if (visualArr.greaterThan(j, j+1)) {
				visualArr.swap(j, j+1);
			}
		}
	}	
}

function insertionSort(visualArr) {
	var n = visualArr._arr.length;
	for (var i = 0; i < n; i++) {
		var j = i;
		while (j > 0 && visualArr.greaterThan(j-1, j)) {
			visualArr.swap(j-1,j);
			j -= 1;
		}
	}
}

function CocktailSort(visualArr) { 
    var swapped = true; 
    var start = 0; 
    var end = visualArr._arr.length - 1; 
  
    while (swapped) { 
        // reset the swapped flag on entering 
        // the loop, because it might be true from 
        // a previous iteration. 
        swapped = false; 
  
        // loop from left to right same as 
        // the bubble sort 
        for (var i = start; i < end; ++i) { 
            if (visualArr.greaterThan(i, i+1)) { 
                visualArr.swap(i, i+1); 
                swapped = true; 
            } 
        } 
  
        // if nothing moved, then array is sorted. 
        if (!swapped) 
            break; 
  
        // otherwise, reset the swapped flag so that it 
        // can be used in the next stage 
        swapped = false; 
  
        // move the end point back by one, because 
        // item at the end is in its rightful spot 
        end -= 1; 
  
        // from right to left, doing the 
        // same comparison as in the previous stage 
        for (var i = end - 1; i >= start; --i) { 
            if (visualArr.greaterThan(i, i+1)) { 
                visualArr.swap(i, i+1)
                swapped = true; 
            } 
        } 
  
        // increase the starting point, because 
        // the last stage would have moved the next 
        // smallest number to its rightful spot. 
        start += 1; 
    } 
} 

