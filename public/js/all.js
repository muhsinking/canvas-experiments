window.onload = function(){
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	// make canvas full page
	var W = window.innerWidth, H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;

	var particles = [];
	var mouse = {};

	// create particles
	var particle_count = 80;
	for(var i = 0; i < particle_count; i++)
	{
		particles.push(new particle());
	}

	// mouse tracking
	canvas.addEventListener('mousemove', track_mouse, false);


	function track_mouse(e)
	{
		// get mouse position relative to document
		mouse.x = e.pageX;
		mouse.y = e.pageY;
	}

	function particle()
	{
		// speed, life, location, life, colors
		// speed.x range = -2.5 to 2.5
		// speed.y range = -15 to -5 to make it move upwards
		this.speed = {x: -2.5+Math.random()*5, y: -15+Math.random()*10};

		// location = mouse coordinates
		// particles follow mouse coordinates
		if(mouse.x && mouse.y) this.location = {x: mouse.x, y: mouse.y};
		else this.location = {x: W/2, y: H/2};

		// change radius to length and use the below for circular particles
		// radius range = 5-25
		// this.radius = 5+Math.random()*20;

		// length range = 8-32
		this.length = 8+Math.random()*16;

		// life range = 20-30
		this.life = 20+Math.random()*10;
		this.remaining_life = this.life;

		// colors
		// hue from 0-60 (red/orange/yellow)
		this.h = Math.random()*60;
		this.s = 70+Math.random()*30;
		// this.s = 100;
	}

	function draw()
	{
		ctx.globalCompositeOperation = "source-over";
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, W, H);
		ctx.globalCompositeOperation = "lighter";

		for(var i = 0; i < particles.length; i++)
		{
			var p = particles[i];
			ctx.beginPath();
			// adjust opacity and luminosity according to life
			p.opacity = Math.round(p.remaining_life/p.life*100)/100;
			p.l = Math.round(p.remaining_life/p.life*63);
			// create gradient
			var gradient = ctx.createRadialGradient(p.location.x, p.location.y, 0, p.location.x, p.location.y, p.length);
			gradient.addColorStop(0, "hsla("+p.h+", "+p.s+"%, "+p.l+"%, "+p.opacity+")");
			gradient.addColorStop(0.5, "hsla("+p.h+", "+p.s+"%, "+p.l+"%, "+p.opacity+")");
			gradient.addColorStop(1, "hsla("+p.h+", "+p.s+"%, "+p.l+"%, 0)");
			ctx.fillStyle = gradient;
			// ctx.arc(p.location.x, p.location.y, p.radius, Math.PI*2, false);
			ctx.rect(p.location.x-(p.length/2), p.location.y-(p.length/2), p.length, p.length);
			ctx.fill();

			// move particles
			// p.remaining_life--;
			p.remaining_life = p.remaining_life - Math.random()*3;
			// p.length--;
			p.length = p.length-(1+Math.random()*2);
			p.location.x += p.speed.x;
			p.location.y += p.speed.y;

			// regenerate particles
			if(p.remaining_life < 0 || p.length < 0)
			{
				// replace dead particles
				particles[i] = new particle();
			}
		}
	}

	setInterval(draw, 33);
};
