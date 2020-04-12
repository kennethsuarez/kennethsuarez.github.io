const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// resize canvas
canvas.height = window.innerHeight / 2;
canvas.width = window.innerWidth;

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
var slider = document.getElementById("arraySize");

	// display array from initial value
	for (var i = 0; i < slider.value; i++) {
		arr.push({
			height: randInt(10,200),
			color: "#b3f2ff"
		});
	}
	draw(arr);

// modify array based using slider
slider.oninput = function() {
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
	}, 100);
}
Animate.prototype.step = function() {
	if (this.actions.length == 0) {
		draw(this._arr); 
		return;
	}

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
var visualArr = null;
function BeginSort() {
	// create an instance of visualizer
	visualArr = new Animate(arr);
	// delay in animation will allow program to 
	// process the steps necessary in sorting
	insertionSort(visualArr);
}

// event when stop button is clicked
function StopSort() {
	if (visualArr != null) {
		visualArr.cancel();
	}
	currentlySorting = false;
}

// the following are sorting algorithms 
// running the sorting algorithms will
// generate the step by step needed
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
// 0 1 2 3 4 5

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