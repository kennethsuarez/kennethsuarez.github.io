window.addEventListener('load', () => {
	const canvas = document.querySelector("#canvas");
	const ctx = canvas.getContext("2d");

	// resizing
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;

	ctx.fillRect(50, 50, 200, 200);
	ctx.strokeStyle = "red";
	ctx.lineWidth = 5;
	ctx.strokeRect(100, 100, 200, 200);

	// variables
	let painting = false;

	function startPosition(e) {
		painting = true;
		draw(e);

	}
	function finishedPosition() {
		painting = false;
		ctx.beginPath();
	}
	function draw(e) {
		if(!painting) return;
		ctx.strokeStyle = "black";
		ctx.lineWidth = 5;
		ctx.lineCap = "round";

		ctx.lineTo(e.clientX, e.clientY);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(e.clientX, e.clientY);
	}

	//EvenListener
	canvas.addEventListener('mousedown', startPosition);
	canvas.addEventListener('mouseup', finishedPosition);
	canvas.addEventListener('mousemove', draw);
});

window.addEventListener('resize', () => {

});