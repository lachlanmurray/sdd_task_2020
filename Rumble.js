var context, keypress, env, loop, controller, physics, render, mouse, Map, windowsz, Anims, World, room_load,gun, monstertypes;
context = document.querySelector("canvas").getContext("2d");	// making the canvas to draw the game on.
		context.canvas.height = window.innerHeight -320;
		context.canvas.width = window.innerWidth -400;


env = {
	height:60,		//all of te propreties of the player cube **TODO** turn this into a hitbox when actual assets are made.
	width:60,
	x:400,
	y:500,
	xvel:0,
	yvel:0,
	curroom:40,
	temproom:0,
	adjust:0,
	
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
			case 16:// space key
				keypress.dash = keydown;
			break;
			
		}
	} // toggling them true or false, based on whether the keyevent listener sees an event matching the controls
};


controller = function() {
	env.dc += 1
	if (keypress.up){ 																	
		env.yvel -=0.23
	}
	if (env.yvel < -6){
		env.yvel = -6
	}
	if (keypress.down){																		
		env.yvel +=0.23
	}
		if (env.yvel > 6){
		env.yvel = 6
	}
	if (keypress.left){																			
		env.xvel -= 0.25
	}
		if (env.xvel < -6){
		env.xvel = -6
	}
	if (keypress.right){																		
		env.xvel += 0.25
	}
		if (env.xvel > 6){
		env.xvel = 6
	}
	
if (Math.pow(env.xvel, 2) + Math.pow(env.yvel, 2) >= 25){
	env.xvel *= 0.9
	env.yvel *= 0.9
}

	

	
};


physics = function(){
	env.x += env.xvel;	//every frame, add the xvelocity to the xposition of the player
	env.y += env.yvel
	env.yvel *= 0.95
	env.xvel *= 0.95	//slow the player when running left to right, to cancel momentum
	if (Math.pow(env.xvel) < 1){
		env.xvel = 0
	}
	if (Math.pow(env.yvel) < 1){
		env.yvel = 0
	}
	//collision
	if (env.y < 1){}
	
	if (env.y < 12 && env.x >1000 && env.x < 1100 && room_load.doors[0] == 1){
		env.temproom = env.curroom-9
		room_load.loadnew(env.curroom-9)
		env.y = context.canvas.height - env.height
		console.log(room_load.doors)
		env.curroom = env.curroom-9
		anims.inanim=1
	}
	else if (env.x < 12 && env.y >400 && env.y < 525 && room_load.doors[3] == 1){
		env.temproom = env.curroom-1
		room_load.loadnew(env.curroom-1)
		env.x = context.canvas.width - env.width
		console.log(room_load.doors)
		env.curroom = env.curroom-1
		anims.inanim=1
	}	
	else if (env.y + env.height > context.canvas.height-12 && env.x >1000 && env.x < 1100 && room_load.doors[2] == 1){
		env.temproom = env.curroom+9
		room_load.loadnew(env.curroom+9)
		env.y = env.height
		console.log(room_load.doors)
		env.curroom = env.curroom+9
		anims.inanim=1
	}	
	else if (env.x + env.width > context.canvas.width-12 && env.y >400 && env.y < 525 && room_load.doors[1] == 1){
		env.temproom = env.curroom+1
		room_load.loadnew(env.curroom+1)
		env.x = env.width
		console.log(room_load.doors)
		env.curroom = env.curroom+1
		anims.inanim=1
	}
	
	if (env.y <=10){
			env.y=10
	}	
	if (env.x <=10){
		env.x = 10
	}	
	if (env.y + env.height >= context.canvas.height-10){
		env.y = context.canvas.height - env.height -10
	}	
	if (env.x + env.width >= context.canvas.width-10){
		env.x = context.canvas.width-env.width-10
	}
}


gun = {
	bullets:[],
	velocity:10,
	draw:function(){
		for(i=0;i<gun.bullets.length;i++){
			context.fillStyle = "#00ff00";							// make it draw in red
			context.beginPath();									// start drawing a new object
			context.arc(gun.bullets[i].x,gun.bullets[i].y,env.height/10,0,Math.PI*2,true)			// use the descriptors in env (the player) to draw the object
			gun.bullets[i].x += gun.bullets[i].xv
			gun.bullets[i].y += gun.bullets[i].yv
			context.fill();	
			gun.collision();
		}
	},
	collision:function(){
			if(gun.bullets[i].x > context.canvas.width-20 || gun.bullets[i].x <20 || gun.bullets[i].y > context.canvas.height-20 || gun.bullets[i].y < 20){
				gun.bullets.splice(i,1)
			}
		
	}
	
}


Map = {
	map: [0 ,2 ,2 ,2 ,2 ,1, 2, 2, 2, 2, 3,
		  8 ,5 ,5 ,5 ,5 ,5 ,5 ,5, 5, 5, 7,
		  4 ,5 ,5 ,5 ,5 ,5 ,5 ,5, 5, 5, 11,
		  8 ,5 ,5 ,5 ,5 ,5 ,5 ,5, 5, 5, 7,
		  12,13,13,13,13,14,13,13,13,13,15,
		 	],
	Monsters:[],
	col:4,
	width:196,
	height:196,
	scalex:1,
	scaley:1,
	columns:11,
	rows:5,
}


render = function() {
	if(anims.inanim ==1){
		//console.log(anims.rendercheck)
	}
	context.clearRect(0, 0, canvas.width, canvas.height);	// clear the canvas			
	

	img = document.getElementById("map").src;
		for (let i = Map.map.length - 1; i > -1; --i){
		
		var val= Map.map[i];

		var xs = (val % Map.col) * Map.width;
		var ys = Math.floor(val/Map.col) * Map.height;
		
		var dx = (i % Map.columns) * Map.width 
		var dy = Math.floor(i / Map.columns) * Map.height 
		
		var img = document.getElementById("map");
		
		
		if (Map.scalex <= Map.scaley){
			Map.scaley = Map.scalex
		} else {
			Map.scalex = Map.scaley
		}
		if (Map.scalex < 0.25){
			Map.scalex = 0.25
			Map.scaley = 0.25
		}
			

		context.drawImage(img, xs, ys, Map.width, Map.height, dx * Map.scalex + env.adjust, dy * Map.scaley, Map.width * Map.scalex, Map.height * Map.scaley)
		}
	
			context.fillStyle = "#00ff00";							// make it draw in red
			context.beginPath();									// start drawing a new object
			context.rect(env.x,env.y,env.width,env.height)
			context.fill();
	
	
}


loop = function() {

	// this is the main loop of the game, and just runs whatever submodules need to be run every frame. if this gets too big i might have problems.s	
	
	controller();
	
	render();
	
	gun.draw();
	
	physics();
	
	setTimeout(window.requestAnimationFrame(loop), 1000/144); // recursively call this function
	
};


mouse = {
	x:0,
	y:0
}


windowsz = {
	x:0,
	y:0
}


monstertypes = {
	stabby:{ 
		health:4,
		speed:2.5,
		timer:72,
		dmg:7
	},
	shooty:{
		health:2,
		speed:3,
		timer:100,
		dmg:10
	},
	speedy:{
		health:3,
		speed:5,
		timer:20,
		dmg:2
	},
	tanky:{
		health:7,
		speed:1,
		timer:144,
		dmg:17
	},
}


room_load = {
	doors:[0,0,0,0],
	next:[],
	foundroom:function(){
		var roomid = World.rooms[env.temproom]
		var output = [
		  0 ,2 ,2 ,2 ,2 ,1, 2, 2, 2, 2, 3,
		  8 ,5 ,5 ,5 ,5 ,5 ,5 ,5, 5, 5, 7,
		  4 ,5 ,5 ,5 ,5 ,5 ,5 ,5, 5, 5, 11,
		  8 ,5 ,5 ,5 ,5 ,5 ,5 ,5, 5, 5, 7,
		  12,13,13,13,13,14,13,13,13,13,15,
		]
		room_load.next = output
		for(i=0;i<output.length;i++){
		var co = output[i]
		switch(co){
			case 1:
			if(room_load.doors[0] == 0){
			output[i] = 2
			}
			break;
			
			case 4:
			if(room_load.doors[3] == 0){
				output[22] = 8
			}
			break;
				
			case 11:
			if(room_load.doors[1] == 0){
				output[i] = 7
			}
			break;
				
			case 14:
			if(room_load.doors[2] == 0){
				output[i] = 13
			}	
			break;
				
			default:
				continue
			break;
		}
		}
		

		if(roomid == 2){
			for (i=0;i<output.length;i++){
				if(output[i] == 5){
					output[i] = 6
				}
			}
		}
		//console.log(room_load.doors)
		Map.map = output
		
	},

	
	loadnew:function(room) {
	Map.Monsters = []
	World.rooms[env.curroom] = 4
	for (i=0;i<=3;i++){
	room_load.doors[i] = 0
	//console.log(typeof World.rooms[room-9])
	}
		//console.log(room)
	if (World.rooms[room+9] !=0 && typeof World.rooms[room+9] != "undefined" ){
		room_load.doors[2] = 1
	}
	if (World.rooms[room+1] !=0 && typeof World.rooms[room+1] != "undefined" ){
		room_load.doors[1] = 1
	}
	if (World.rooms[room-9] !=0 && typeof World.rooms[room-9] != "undefined" ){
		room_load.doors[0] = 1
	}
	if (World.rooms[room-1] !=0 && typeof World.rooms[room-1] != "undefined" ){
		room_load.doors[3] = 1
	}
	
	
	room_load.Monstergen();
	room_load.foundroom();
	room_load.collisiongen();
	

	//console.log(room_load.walkable)
},
	
	
	collisiongen:function(){
		for(i=0;i<Map.map.length;i++){
			switch(Map.map[i]){
				case 2:

				break;
				
				case 4:

				break;
					
				case 5:

				break;
					
				case 3:

			}
		}
	},
	
	
	Monstergen:function(){
		var nmon = 0
		var n = World.rooms[env.curroom]
		if (n<1000){
			nmon = 4
		}else if (n >=1000 && n < 3500){
			nmon = 3
		}else if (n >= 3500 && n <8000){
			nmon = 2
		}else if (n >= 8000){
			nmon = 1
		}
		
		for (i=0;i < nmon ; i++){
			var t = World.gen(); // something here is causing the thing to ojly spawn on enemy
			console.log(i)
			if (t<1000){
					type = 4
				//console.log("4")
				} 
			if (t >=1000 && t < 3500){
					type = 3
				//console.log("3")
				}
			if (t >= 3500 && t <8000){
					type = 2
				//console.log("2")
				}
			if (t >= 8000){
					type = 1
				//console.log("1")
				}
			var health =0
			
			if (type == 1){
					health = monstertypes.stabby.health
				}else if (type == 2){
					health = monstertypes.shooty.health
				}else if (type == 3){
					health = monstertypes.speedy.health
				}else if (type == 4){
					health = monstertypes.tanky.health
				}
			
			Map.Monsters.push({
			type:type,
			health:health
		})
		}
		
	}
}


anims = {
	
}


World = { // middle square method
	gen:function(){
		var n = (World.seed*World.seed).toString()
		var digits = 4
		for (i=n.length;i < digits*2;i++){
			n = n.substring(i,i-2) + n
			
		}
		var start = (n.length/2) - 2;
		var end = start+digits
		World.seed = n.substring(start,end);
		return n.substring(start,end);
		
		
},
	
	printworld:function(){		var x = 0
		var y = 9
		//console.log(World.rooms.slice(x,y))
		x +=9
		y +=9
				console.log(World.rooms.slice(x,y))
		x +=9
		y +=9
				console.log(World.rooms.slice(x,y))
		x +=9
		y +=9
				console.log(World.rooms.slice(x,y))
		x +=9
		y +=9
				console.log(World.rooms.slice(x,y))
		x +=9
		y +=9
				console.log(World.rooms.slice(x,y))
		x +=9
		y +=9
				console.log(World.rooms.slice(x,y))
		x +=9
		y +=9
				console.log(World.rooms.slice(x,y))
		x +=9
		y +=9
				console.log(World.rooms.slice(x,y))
		x +=9
		y +=9},
	
	branch:function(){
		
		var start = room_load
		var o = World.gen().toString()
		var via = Math.ceil((parseInt(o.substring(0,2)))/100*World.rooms.length)
		//console.log(starty)
		//console.log(startx)
		var size = 2564
		var startx = (env.curroom%9)
		var starty = Math.floor(env.curroom/9) 
		var cx = startx
		var cy = starty
		var previndex = 0
		for (i=0;i<size;i++){
			
			var newx = 0
			var newy = 0
			var t = World.gen(); 	
			//console.log(t)
			if (t < 5000){
				if (t < 2500){
					var d = 1
				}else{
					var d = 2
				}
			} else if(t > 7500){
				var d = 4
			}else{
				var d = 3
			}
			//console.log(d)
			//console.log(cy)
			//console.log(cx)
			switch(d){
				case 1:
					newx = cx
					newy = cy+1
					break;
					
				case 2:
					newx = cx+1
					newy = cy
					break;
					
				case 3:
					newx = cx-1
					newy = cy
					break;
					
				case 4:
					newx = cx
					newy = cy-1
					break;
				
			}
			var index = newy*9+newx 
			cx = newx
			cy = newy
			//console.log(index)
			//console.log(newy)
			//console.log(newx)
			if(i!=size-1 && index < World.rooms.length && index>0){
				
				World.rooms[index] = parseInt(World.gen())
				previndex = index
			//	console.log(previndex)
			}else{
				if (index > World.rooms.length || index < 0){
					//console.log (previndex)
					World.rooms[previndex] = 2
					break
				}else{
					World.rooms[index] = 2
				}
			}
			
			
		}
		World.rooms[env.curroom] = 1
		World.printworld()
	},

	seed:9943,
	
	rooms:[
			0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,
		  ]
}




	if (window.screen.availWidth = 2560){	
	windowsz.x = 1818
	windowsz.y = 1297
	}	
	else if (window.screen.availWidth = 1920){
	windowsz.x = 1364
	windowsz.y = 973
	
	}
	
	World.branch()
	room_load.loadnew(env.curroom)
	var guy = new Image();	
	guy.src = "guy.png";
	window.addEventListener("click", function(){
		var xdiff = mouse.x-env.x
		var ydiff = mouse.y-env.y
		var Length = Math.sqrt((xdiff*xdiff)+(ydiff*ydiff))
		console.log(mouse.x, mouse.y)
		var sf = gun.velocity/Length
		
				gun.bullets.push({
					x:env.x,
					y:env.y,
					xv:xdiff*sf,
					yv:ydiff*sf,
					u:0
				})
	});

	window.addEventListener("mousemove", function (e) {
		mouse.x = e.clientX-385
		mouse.y = e.clientY-90
	})

	window.addEventListener("resize",function() {
		var w = window.innerWidth;
		var h = window.innerHeight;
		
		Map.scalex = w/windowsz.x;
		Map.scaley = h/windowsz.y;
		if (window.innerheight = 1297){
				context.canvas.height = window.innerHeight -320;
		} else {
		context.canvas.height = window.innerHeight -320;
		}
		context.canvas.width = window.innerWidth -400;
	})
	window.addEventListener("keydown",keypress.keyListener);
	window.addEventListener("keyup",keypress.keyListener);
	window.requestAnimationFrame(loop); // call the loop function once
