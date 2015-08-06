window.onload = function(){
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	// make canvas full page
	var W = window.innerWidth, H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;
	var mouse = {};

	// mouse tracking
	canvas.addEventListener('mousemove', track_mouse, false);

	function track_mouse(e)
	{
		// get mouse position relative to document
		mouse.x = e.pageX;
		mouse.y = e.pageY;
	}

	function draw()
	{
		ctx.globalCompositeOperation = "source-over";
		ctx.fillStyle = "#2a2a2a";
		ctx.fillRect(0, 0, W, H);
		ctx.globalCompositeOperation = "lighter";

    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(mouse.x, mouse.y, 20, Math.PI*2, false);
    ctx.fill();
	}

	setInterval(draw, 20);
};
