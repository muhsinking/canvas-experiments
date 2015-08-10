// window.onload = function(){
// 	var canvas = document.getElementById("canvas");
// 	var ctx = canvas.getContext("2d");
//
// 	// make canvas full page
// 	var W = window.innerWidth, H = window.innerHeight;
// 	canvas.width = W;
// 	canvas.height = H;
// 	var mouse = {};
//
// 	// mouse tracking
// 	canvas.addEventListener('mousemove', track_mouse, false);
//
// 	function track_mouse(e)
// 	{
// 		// get mouse position relative to document
// 		mouse.x = e.pageX;
// 		mouse.y = e.pageY;
// 	}
//
// 	function draw()
// 	{
// 		ctx.globalCompositeOperation = "source-over";
// 		ctx.fillStyle = "#2a2a2a";
// 		ctx.fillRect(0, 0, W, H);
// 		ctx.globalCompositeOperation = "lighter";
//
//     ctx.beginPath();
//     ctx.fillStyle = "white";
//     ctx.arc(mouse.x, mouse.y, 20, Math.PI*2, false);
//     ctx.fill();
// 	}
//
// 	setInterval(draw, 20);
// };

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;

var circle = function(color, r) {
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.arc(0, 0, r, 0, 2 * Math.PI, true);
    ctx.closePath();

    ctx.fill();
}

var i = 0;
var redraw = function() {
    ctx.save();

    // paint bg
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, w, h);

    // set origin to center
    ctx.translate(w / 2, h / 2);

    // draw sun
    circle('yellow', 20);

    // rotate + move along x
    ctx.rotate(i / 100);
    ctx.translate(100, 0);

    // draw planet
    circle('green', 10);

    ctx.restore();

    i++;

    window.requestAnimationFrame(redraw);
};

window.requestAnimationFrame(redraw);
