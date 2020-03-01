var context, keypress, env, loop, stage, collisiondetection, controller, physics, render;

context = document.querySelector("canvas").getContext("2d");	// making the canvas to draw the game on.
context.canvas.height = 720;
context.canvas.width = 1080;


env = {
	height:60,		//all of te propreties of the player cube **TODO** turn this into a hitbox when actual assets are made.
	njumps:0,
	width:60,
	x:540,
	y:0,
	xvel:0,
	yvel:0,
	jc:0.9,
	grounded:0,
	jc2:0,
	
};


stage = {
	coords:[[100,450],[970,450],[970,600],[100,600]], // coords for drawing the stage
	width: 870,
	height: 150,
	ystart: 450,
	xstart: 100,
	xstop: 970
};


keypress = {
	a:false,	//boolean values for whether the keys are pressed
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
	} // toggling them true or false, based on whether the keyevent listener sees an event matching the controls
};


collisiondetection = function() {
	if (env.y > context.canvas.height - env.height){
		env.y = 100
		env.x = 540
		
	} // is on ground
	if (env.y > context.canvas.height - env.height && env.grounded == 0){
		env.jc = 0
	}	// reset jump cooldown (jc) to 0 when on ground
	if (env.x < env.width*-1){
		env.x = context.canvas.width;
	}						  // if you go off the left, restart you at the right. to replace later
	else if (env.x > context.canvas.width){
		env.x = env.width*-1
	}				  // if you go off the right, restart you at the left. to replace later
	if (env.y + env.height >= stage.ystart && env.x > stage.xstart - env.width && env.x < stage.xstop){
		env.y = stage.ystart - env.height;
		env.yvel -= 0.5;
		env.grounded = 1;
		env.njumps = 0;
	}
};


controller = function() {
	
	if (keypress.jump && env.njumps < 8 && env.jc >= 1 || keypress.jump && env.grounded == 1 ) {		// Checking if the player is on the ground and cooldown is finished to jump. **todo** streamline this if check
		if (env.grounded == 1 && env.jc >= 7){
		env.yvel = 0;
		env.grounded = 0;
		env.jc = 0;
		env.jc2 = 0;
		env.yvel -= 15;
		env.njumps += 1;
		}
		
		else if (env.njumps >= 1 && env.jc2 >= 1){														// checking the the player is in the air and that the aircooldown is finished
		env.yvel = 0;
		env.jc = 0;
		env.yvel -= 13;
		env.njumps += 1;
		}
	}
	
	if (env.grounded == 1){ 																	// reset cooldown when you land
		env.jc2 = 0;
	}
	
	if (!keypress.jump){																		// if they have release the jump key, set the flag for a second jump to true
		env.jc2 = 1
	}
	
	if (keypress.left){																			// add velocity to the left when you press left
		env.xvel -= 0.25
	}
	
	if (keypress.right){																		//add velocity to the right when you press right
		env.xvel += 0.25
	}
};


physics = function() {
	env.x += env.xvel;	//every frame, add the xvelocity to the xposition of the player
	if (env.grounded = 1){
		env.yvel +=0.5;		//every frame, apply 0.5 acceleration for gravity
	}
	env.y += env.yvel;	//every frame, add the yvelocity to the yposition of the player
	env.xvel *= 0.95	//slow the player when running left to right, to cancel momentum
	env.jc += 0.1		//add 0.1 to the jump cooldown
}


render = function() {
	var img = document.getElementById("bg");				// get the background image
	context.clearRect(0, 0, canvas.width, canvas.height);	// clear the canvas
	context.drawImage(img, 0, 0,1080,720);					// draw background to the canvas
	
	context.fillStyle = "#ff0000";							// make it draw in red
	context.beginPath();									// start drawing a new object
	context.rect(env.x,env.y,env.width,env.height);			// use the descriptors in env (the player) to draw the object
	context.fill();											// draw the object
	
	context.fillStyle = "#00ff00";							// make it draw in green
	context.beginPath();									// start drawing new object
	context.moveTo(stage.coords[0][0], stage.coords[0][1]);	// the next 4 use the coord set out in the 2d aray of the stage function 
	context.lineTo(stage.coords[1][0], stage.coords[1][1]);
	context.lineTo(stage.coords[2][0], stage.coords[2][1]);
	context.lineTo(stage.coords[3][0], stage.coords[3][1]);
	context.closePath();									// close the coords
	context.stroke();										// add an outline to the path
	context.fill();											// fill the path with green
}


loop = function() {
	
	// this is the main loop of the game, and just runs whatever submodules need to be run every frame. if this gets too big i might have problems.a
	collisiondetection();
	
	controller();
	
	render();
	
	physics();
	
	collisiondetection();
	
	window.requestAnimationFrame(loop); // recursively call this function
};


	window.requestAnimationFrame(loop); // call the loop function once
	window.addEventListener("keydown",keypress.keyListener);
	window.addEventListener("keyup",keypress.keyListener);