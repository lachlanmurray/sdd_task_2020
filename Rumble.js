var context, keypress, env, loop;

context = document.querySelector("canvas").getContext("2d");
context.canvas.height = 720;
context.canvas.width = 1080;
env = {
	height:60,
	njumps:0,
	width:60,
	x:540,
	y:360,
	xvel:0,
	yvel:0,
	jc:0.9,
	grounded:0,
	jc2:0,
};

keypress = {
	a:false,
	d:false,
	w:false,
	s:false,
	j:false,
	keyListener:function(event) {
		var keydown = (event.type == "keydown")?true:false;
		var keyup = (event.type == "keyup")?false:true;
		switch(event.keyCode) {
				
			case 87:// w key
				keypress.up = keydown;
			break;
			case 65:// a key
				keypress.left = keydown;
			break;
			case 83:// s key
				keypress.down = keydown;
			break;
			case 68:// d key
				keypress.right = keydown;
			break;
			case 32:// space key
				keypress.jump = keydown;
			break;
			
		}
	}
};

loop = function() {
	
	if (keypress.jump && env.njumps < 2 && env.jc >= 1 || keypress.jump && env.grounded == 1 ) {
		if (env.grounded == 1 && env.jc >= 7){
		env.grounded = 0;
		env.jc = 0;
		env.jc2 = 0;
		env.yvel -= 15;
		env.njumps += 1;
		}
		else if (env.njumps == 1 && env.jc2 >= 1){
		env.yvel *= -1;
		env.jc = 0;
		env.yvel -= 13;
		env.njumps += 1;
		}
	}
	if (env.grounded == 1){
		env.jc2 = 0;
	}
	
	if (!keypress.jump){
		env.jc2 = 1
	}
	
	if (keypress.left){
		env.xvel -= 0.25
	}
	
	if (keypress.right){
		env.xvel += 0.25
	}
	

	env.x += env.xvel;
	env.yvel +=0.5;
	env.y += env.yvel;
	env.xvel *= 0.95
	env.yvel *= 0.95
	
	if (env.y > context.canvas.height - env.height){
		env.grounded = 1
		env.njumps = 0;
		env.y = context.canvas.height - env.height;
		env.yvel = 0;
		
	}
	if (env.y > context.canvas.height - env.height && grounded == 0){
		env.jc = 0
	}
	if (env.x < env.width*-1){
		env.x = context.canvas.width;
	}	
	else if (env.x > context.canvas.width){
		env.x = env.width*-1
	}
		

	var img = document.getElementById("bg");
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(img, 0, 0,1080,720);
	context.fillStyle = "#ff0000";
	context.beginPath();
	context.rect(env.x,env.y,env.width,env.height);
	context.fill();
	window.requestAnimationFrame(loop);
	env.jc += 0.1

};
	window.requestAnimationFrame(loop);

	window.addEventListener("keydown",keypress.keyListener);
	window.addEventListener("keyup",keypress.keyListener);