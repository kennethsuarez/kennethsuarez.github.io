window.addEventListener('load', () => {
	const canvas = document.querySelector("#canvas");
	const ctx = canvas.getContext("2d");

	// resizing
	canvas.height = window.innerHeight / 2;
	canvas.width = window.innerWidth;

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
	var arr = [];
		// display array from initial value
		for (var i = 0; i < slider.value; i++) {
			arr.push({
				height: randInt(10,200),
				color: "#b3f2ff"
			});
		}
		draw(arr);

	// animation
	function AnimatedArray(arr, canvas) {
		this._arr = arr;
		this._canvas = canvas;
		var arr_size = arr.length;
		var _this = this;
		this._id = setInterval(function() {_this._step();}, 1000);

	}

	AnimatedArray.prototype._step = function() {
		this._arr = [];
		for (var i = 0; i < 10; i++) {
			this._arr.push({
				height: randInt(10,200),
				color: "#b3f2ff"
			});
		}
		draw(this._arr);
	};
	// modify array based using slider
	slider.oninput = function() {
		// generate new array
		arr = [];
		for (let i = 0; i < this.value; i++) {
			arr.push({
				height: randInt(10,200),
				color: "#b3f2ff"
			});
		}
		// bubbleSort(arr);
		// display on canvas
		var aa = new AnimatedArray(arr, canvas);
		bubbleSort(aa);
	 	//draw(arr);
	}

});


function bubbleSort(aa) {
	let n = arr.length;
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n - i - 1; j++) {
				if (arr[j+1].height < arr[j].height) {
				var swap = arr[j].height;
				arr[j].height = arr[j+1].height;
					arr[j+1].height = swap;
			}
		}
	}	
}

function beginSort() {
	
}