var context, keypress, env, loop, controller, physics, render, mouse, Map, windowsz, World, room_load,gun, monstertypes, colliision;
context = document.querySelector("canvas").getContext("2d");	// making the canvas to draw the game on.



env = {
	height:35,		//all of te propreties of the player cube **TODO** turn this into a hitbox when actual assets are made.
	width:35,
	radius:30,
	x:400,
	y:500,
	xvel:0,
	yvel:0,
	curroom:40,
	temproom:0,
	adjustx:0,
	adjusty:0,
	hp:20,
	debug:0,
	animframe:0,
	invuln:0
};


keypress = {
	a:false,	//boolean values for whether the keys are pressed
	d:false,
	w:false,
	s:false,
	j:false,
	lastdir:1,
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
		env.yvel -=0.125
	}
		if (env.yvel < -3.5){
		env.yvel = -3.5
	}
	if (keypress.down){																		
		env.yvel +=0.125
	}
		if (env.yvel > 3.5){
		env.yvel = 3.5
	}
	if (keypress.left){																			
		env.xvel -= 0.125
	}
		if (env.xvel < -3.5){
		env.xvel = -3.5
	}
	if (keypress.right){																		
		env.xvel += 0.125
	}
		if (env.xvel > 3.5){
		env.xvel = 3.5
	}
	
if ((env.xvel*env.xvel) + env.yvel*env.yvel >= 10){
	env.xvel *= 0.9
	env.yvel *= 0.9
}
	
};


physics = function(){
	env.x += env.xvel;	//every frame, add the xvelocity to the xposition of the player
	env.y += env.yvel
	env.yvel *= 0.92
	env.xvel *= 0.92	//slow the player when running left to right, to cancel momentum
	if (Math.pow(env.xvel) < 1){
		env.xvel = 0
	}
	if (Math.pow(env.yvel) < 1){
		env.yvel = 0
	}
	//collision
	if (env.y < 1){}
	
	const syncWait = ms => {
    const end = Date.now() + ms
    while (Date.now() < end) continue
}
	
	if (env.y < 0 && env.x >1000 && env.x < 1100 && room_load.doors[0] == 1 && room_load.denable == 1){
		env.temproom = env.curroom-9
		room_load.loadnew(env.curroom-9)
		env.y = context.canvas.height - env.height - 84
		env.curroom = env.curroom-9
		
	}
	else if (env.x < 0 && env.y >400 && env.y < 525 && room_load.doors[3] == 1 && room_load.denable == 1){
		env.temproom = env.curroom-1
		room_load.loadnew(env.curroom-1)
		env.x = context.canvas.width - env.width -88
		env.curroom = env.curroom-1
	
	}	
	else if (env.y + env.height > context.canvas.height && env.x >1000 && env.x < 1100 && room_load.doors[2] == 1 && room_load.denable == 1){
		env.temproom = env.curroom+9
		room_load.loadnew(env.curroom+9)
		env.y = env.height+78
		env.curroom = env.curroom+9
		
	}	
	else if (env.x + env.width > context.canvas.width && env.y >400 && env.y < 525 && room_load.doors[1] == 1 && room_load.denable == 1){
		env.temproom = env.curroom+1
		room_load.loadnew(env.curroom+1)
		env.x = env.width +90
		env.curroom = env.curroom+1
		
	}
	
	
	
	if (env.y <=180){
		if (room_load.doors[0] == 1){
			if (env.x > 1020 && env.x < 1155){
				if (env.x + env.xvel < 1020){
					env.x = 1025
				}else if (env.x + env.xvel > 1155){
					env.x = 1150
				}
			}else{
				env.y = 180	
			}
		}else {
			env.y = 180
		}
	}	
	if (env.x <=196){
				if (room_load.doors[3] == 1){
			if (env.y > 400 && env.y < 525){
				if (env.y + env.yvel < 440){
					env.y = 445
				}else if (env.y + env.yvel > 525){
					env.y = 520
				}
			}else{
				env.x = 196	
			}
		}else {
			env.x = 196
		}
	}	
	if (env.y + env.height >= context.canvas.height-180){
		if (room_load.doors[2] == 1){
			if (env.x > 1020 && env.x < 1155){
				if (env.x + env.xvel < 1020){
					env.x = 1025
				}else if (env.x + env.xvel > 1135){
					env.x = 1130
				}
			}else{
				env.y = context.canvas.height - env.height - 180
			}
		}else {
			env.y = context.canvas.height - env.height - 180
		}
	}	
	if (env.x + env.width >= context.canvas.width-180){
		if (room_load.doors[1] == 1){
			if (env.y > 400 && env.y < 525){
				if (env.y + env.yvel < 440){
					env.y = 445
				}else if (env.y + env.yvel > 525){
					env.y = 520
				}
			}else{
				env.x = context.canvas.width-env.width-180	
			}
		}else {
			env.x = context.canvas.width-env.width-180
		}
	}	
	
	if (Map.Monsters.length == 0){
		room_load.denable = 1
	}
	
	if (env.hp <= 0){
		alert("you have died")
		env.hp = 20
	}
	gun.checkdmg()
}


collision = {
	circle:function(r1,x1,y1,r2,x2,y2){

		var dx = x1 - x2;
		var dy = y1 - y2;
		var distance = Math.sqrt(dx * dx + dy * dy);

		if (distance < r1 + r2) {
			return true;
		}
	},
	rect:function(x1,y1,w1,h1,x2,y2,w2,h2){
		if (x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2) {
    		return true;
		}
	}
}


gun = {
	bullets:[],
	velocity:5,
	collision:function(){
			if(gun.bullets[i].x > context.canvas.width-20 || gun.bullets[i].x < 20 || gun.bullets[i].y > context.canvas.height-20 || gun.bullets[i].y < 20){
				gun.bullets.splice(i,1)
			}
		
	},
	checkdmg:function(){
		var rmb = []
		var rmm = []
		for(m=0;m<Map.Monsters.length;m++){
			for(b=0;b<gun.bullets.length;b++){
				
				if(collision.circle(Map.Monsters[m].size*30,Map.Monsters[m].x,Map.Monsters[m].y,env.radius/3,gun.bullets[b].x,gun.bullets[b].y) && gun.bullets[b].u == 0){
					Map.Monsters[m].health -= 1
					rmb.push(b)
					if(Map.Monsters[m].health <= 0){
					rmm.push(m)
					}
				}
			}
		}	// check if player bullet his enemy
		for(rb=0;rb<rmb.length;rb++){
			gun.bullets.splice(rmb[rb],1)
		}
		for(i=0;i<gun.bullets.length;i++){
			if(collision.circle(env.radius,env.x+(env.width/2),env.y+(env.height/2),env.radius/2,gun.bullets[i].x,gun.bullets[i].y) && gun.bullets[i].u == 1){
				env.xvel+= gun.bullets[i].xv
				env.yvel+= gun.bullets[i].yv
				gun.bullets.splice(i,1)
				env.hp -= 1
			}
		} //check if an anamy bullet hits the player
		for(rm=0;rm<rmm.length;rm++){
			Map.Monsters.splice(rmm[rm],1)
			try{
			Map.Monsters[m].health += 1
			alert("did it")
			}
			catch(err){
				
			}
			
		}
		for(i=0;i<gun.bullets.length;i++){
			if(collision.circle(env.radius,env.x,env.y,env.radius/4,context.canvas.width/2,context.canvas.height/2) && gun.bullets[i].u == 2){
				alert("you win, loading new room")
				env.y-=100
				World.rooms = [
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
				env.curroom = 40
				World.rooms[env.curroom] = 1
				World.branch();
				room_load.loadnew(env.curroom)
				Map.Monsters = []
			}
		}		// using a bullet as a pseudo warp point in the middle of a room on defeat of the boss to load in a new room
		
		
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
	rows:5
}


render = function() {
	context.clearRect(0, 0, canvas.width, canvas.height);	// clear the canvas			
	

	img = document.getElementById("map").src;
		for (let i=Map.map.length - 1; i > -1; --i){
		
		var val= Map.map[i];

		var xs = (val % Map.col) * Map.width;
		var ys = Math.floor(val/Map.col) * Map.height;
		
		var dx = (i % Map.columns) * Map.width 
		var dy = Math.floor(i / Map.columns) * Map.height 
		
		var img = document.getElementById("map");
			

		context.drawImage(img, xs, ys, Map.width, Map.height, dx + env.adjustx, dy +env.adjusty, Map.width, Map.height)
		}
	
	for(i=0;i<gun.bullets.length;i++){
		if(gun.bullets[i].sp){
				gun.bullets[i].sp +=1
				if(gun.bullets[i].xv > 0){
					context.drawImage(img,0,1403,63,52,gun.bullets[i].x-(env.width/6.5),gun.bullets[i].y-(env.height/6.5),env.width,env.height);
				}else{
					context.drawImage(img,70,1403,63,52,gun.bullets[i].x-(env.width/6.5),gun.bullets[i].y-(env.height/6.5),env.width,env.height);
				}
				
				if(gun.bullets[i].sp == 144){
					for (i=0;i<12;i++){
					//alert("doing it")
					var xvmod = Math.sin(360+(30*i))
					var yvmod = Math.cos(360+(30*i))
					var xg = parseInt(gun.bullets[i].x.toString())
					var yg = parseInt(gun.bullets[i].y.toString())
					var xx = xvmod * 5
					var yy = yvmod * 5
					//context.drawImage(img,155,800+(142*4),128,128,Map.Monsters[f].x-Map.Monsters[f].size*64,Map.Monsters[f].y-Map.Monsters[f].size*64,128*Map.Monsters[f].size,128*Map.Monsters[f].size);
					gun.bullets.push({
						x:xg,
						y:yg,
						xv:xx,
						yv:yy,
						u:1
					})
					}
				}
		}else{
			context.drawImage(img,0,1490+(23*Math.round(env.animframe)),27,23,gun.bullets[i].x,gun.bullets[i].y,env.width/3,env.width/3);
		}
			
			if(env.debug == 1){
			context.fillStyle = "#0000ff";							// make it draw in red
			context.beginPath();									// start drawing a new object
			context.arc(gun.bullets[i].x,gun.bullets[i].y,env.height/10,0,Math.PI*2,true)			// use the descriptors in env (the player) to draw the object
			context.fill();
			} // debug code
			
			gun.bullets[i].x += gun.bullets[i].xv
			gun.bullets[i].y += gun.bullets[i].yv
			
			gun.collision();
		}
	
	for (f=0; f < Map.Monsters.length; f++){
			Map.Monsters[f].timerc += 1
			if(env.debug == 1){
			context.fillStyle = "#ff0000";							
			context.beginPath();									
			context.arc(Map.Monsters[f].x,Map.Monsters[f].y,Map.Monsters[f].size*30,0,Math.PI*2,true)	
			context.fill();
			}
			switch(Map.Monsters[f].size){
				case 0.4:
					context.drawImage(img,260,800+(142*(Math.round(env.animframe*4)%4)),128,128,Map.Monsters[f].x-Map.Monsters[f].size*50,Map.Monsters[f].y-Map.Monsters[f].size*80,128*Map.Monsters[f].size,128*Map.Monsters[f].size);
				break;
				
				case 0.9:
					if(Map.Monsters[f].timerc > 60){
						context.drawImage(img,155,800+(142*Math.round(env.animframe)),128,128,Map.Monsters[f].x-Map.Monsters[f].size*64,Map.Monsters[f].y-Map.Monsters[f].size*64,128*Map.Monsters[f].size,128*Map.Monsters[f].size);
					} else{
						context.drawImage(img,155,800+(142*4),128,128,Map.Monsters[f].x-Map.Monsters[f].size*64,Map.Monsters[f].y-Map.Monsters[f].size*64,128*Map.Monsters[f].size,128*Map.Monsters[f].size);
					}
				break;
					
				case 0.5:
					context.drawImage(img,370,800+(142*(Math.round(env.animframe))),90,128,Map.Monsters[f].x-Map.Monsters[f].size*50,Map.Monsters[f].y-Map.Monsters[f].size*64,90*Map.Monsters[f].size,128*Map.Monsters[f].size);
				break;
					
				case 1.9:
					if(Map.Monsters[f].timerc >= Map.Monsters[f].timer - 400){
						if(env.x >= Map.Monsters[f].x){
							context.drawImage(img,473,1265,147,147,Map.Monsters[f].x-Map.Monsters[f].size*32,Map.Monsters[f].y-Map.Monsters[f].size*32,64*Map.Monsters[f].size,64*Map.Monsters[f].size);
						}	else{
							context.drawImage(img,646,1265,147,147,Map.Monsters[f].x-Map.Monsters[f].size*32,Map.Monsters[f].y-Map.Monsters[f].size*32,64*Map.Monsters[f].size,64*Map.Monsters[f].size);
						}
						Map.Monsters[f].speed = 0.2
					} else {
						context.drawImage(img,0,795+(146*Math.round(env.animframe)),135,145,Map.Monsters[f].x-Map.Monsters[f].size*32,Map.Monsters[f].y-Map.Monsters[f].size*32,64*Map.Monsters[f].size,64*Map.Monsters[f].size);
					}
				break;
			}
			var xd = (env.x+env.width/2)-Map.Monsters[f].x
			var yd = (env.y+env.height/2)-Map.Monsters[f].y
			var Length = Math.sqrt((xd*xd)+(yd*yd))
			var ms = Map.Monsters[f].speed/Length
			var oxd = xd
			var oyd = yd
			Map.Monsters[f].xv = xd*ms
			Map.Monsters[f].yv = yd*ms
			Map.Monsters[f].x  += Map.Monsters[f].xv
			Map.Monsters[f].y  += Map.Monsters[f].yv
			if(env.invuln <=400){
				Map.Monsters[f].x  -= Map.Monsters[f].xv
				Map.Monsters[f].y  -= Map.Monsters[f].yv
				env.invuln +=1
			}
		
		
		//Ranged monster attack if timer is done
			if(Map.Monsters[f].timerc == Map.Monsters[f].timer || Map.Monsters[f].timerc == Map.Monsters[f].timer -20 || Map.Monsters[f].timerc == Map.Monsters[f].timer -40){
				if(Map.Monsters[f].g == 2){
					//for (i=0;i<6;i++){
					if(env.x >= Map.Monsters[f].x){
						var xx = gun.velocity
						var yy = 0
					} else {
						var xx = - gun.velocity
						var yy = 0
					}
					var xg = parseInt(Map.Monsters[f].x.toString())
					var yg = parseInt(Map.Monsters[f].y.toString())
					//}
					if(Map.Monsters[f].timerc == Map.Monsters[f].timerc){
					   gun.bullets.push({
						x:xg,
						y:yg,
						xv:xx,
						yv:yy,
						sp:1,
						u:1
					})
					   }
				}
				if(Map.Monsters[f].g == 1){
				Map.Monsters[f].x -= Map.Monsters[f].xv
				Map.Monsters[f].y -= Map.Monsters[f].yv
				var shootlist = []
				for(n=0;n<Map.Monsters.length;n++){
					if(Map.Monsters[n].g == 1){
					shootlist.push(n)
					}
				}
				for (g=0;g<shootlist.length;g++){
				for (i=0;i<6;i++){
					var xvmod = Math.sin(360+(45*i))
					var yvmod = Math.cos(360+(45*i))
					var xg = parseInt(Map.Monsters[shootlist[g]].x.toString())
					var yg = parseInt(Map.Monsters[shootlist[g]].y.toString())
					var xx = xvmod * 3
					var yy = yvmod * 3
					context.drawImage(img,155,800+(142*4),128,128,Map.Monsters[f].x-Map.Monsters[f].size*64,Map.Monsters[f].y-Map.Monsters[f].size*64,128*Map.Monsters[f].size,128*Map.Monsters[f].size);
					gun.bullets.push({
						x:xg,
						y:yg,
						xv:xx,
						yv:yy,
						u:1
					})
				}
				}
					
				}
				if(Map.Monsters[f].timerc == Map.Monsters[f].timer){
				Map.Monsters[f].timerc = 0
				}
				if(Map.Monsters[f].g ==1){
				Map.Monsters[f].speed = 0
				}
				if(Map.Monsters[f].g == 2){
					Map.Monsters[f].speed = 0.8
				}
			}
			else if(Map.Monsters[f].g ==1){
							Map.Monsters[f].speed += 0.004
			}
			
		
		// monster self collision
			var checklist = []
			for (i=0;i<Map.Monsters.length;i++){
				if(i != f){
					checklist.push(i)
				}
			}
			for(n=0;n<checklist.length;n++){
				if(collision.circle(Map.Monsters[checklist[n]].size*30,Map.Monsters[checklist[n]].x,Map.Monsters[checklist[n]].y,Map.Monsters[f].size*30,Map.Monsters[f].x,Map.Monsters[f].y)){
					if(Map.Monsters[checklist[n]].speed < Map.Monsters[f].speed){
						Map.Monsters[f].x -= Map.Monsters[f].xv *0.1
						Map.Monsters[f].y -= Map.Monsters[f].yv *0.1
					}else if (Map.Monsters[checklist[n]].speed > Map.Monsters[f].speed){
						Map.Monsters[f].x -= Map.Monsters[f].xv *0.5
						Map.Monsters[f].y -= Map.Monsters[f].yv *0.5
					}else{
						Map.Monsters[f].x -= Map.Monsters[f].xv 
						Map.Monsters[f].y -= Map.Monsters[f].yv 
					}
				}
			} // Monster self collision
			if(collision.circle(env.radius,env.x+(env.width/2),env.y+(env.height/2),Map.Monsters[f].size*25,Map.Monsters[f].x,Map.Monsters[f].y)){
				if(Map.Monsters[f].g !=1){
					env.hp -= Map.Monsters[f].dmg
					Map.Monsters[f].x -= Map.Monsters[f].xv
					Map.Monsters[f].y += Map.Monsters[f].yv
					env.xvel += Map.Monsters[f].xv*7
					env.yvel += Map.Monsters[f].yv*7
					
				}else{
					Map.Monsters[f].timerc = Map.Monsters[f].timer -1
					Map.Monsters[f].x -= Map.Monsters[f].xv
					Map.Monsters[f].y += Map.Monsters[f].yv
					env.xvel += Map.Monsters[f].xv*2
					env.yvel += Map.Monsters[f].yv*2
				}
				
				}
	}
	
			//context.fillStyle = "#00ff00";							
			//context.beginPath();
			//context.arc(env.x+ (env.width/2),env.y + (env.height/2),env.radius,0,Math.PI*2,true)
			//context.fill();
			
			if (keypress.up){ 	
				context.drawImage(img,462,838+(36*Math.round(env.animframe)),21,36,env.x-(env.width/2),env.y-env.height,env.width*0.9,env.height*1.6875)
				keypress.lastdir = 0
			}
			else if (keypress.down){	
				context.drawImage(img,492,838+(36*Math.round(env.animframe)),21,36,env.x-(env.width/2),env.y-env.height,env.width*0.9,env.height*1.6875)
				keypress.lastdir = 1
			}
			else if (keypress.left){	
				context.drawImage(img,522,837+(36*Math.round(env.animframe)),21,36,env.x-(env.width/2),env.y-env.height,env.width*0.9,env.height*1.6875)
				keypress.lastdir = 2
			}
			else if (keypress.right){
				context.drawImage(img,542,837+(36*Math.round(env.animframe)),21,36,env.x-(env.width/2),env.y-env.height,env.width*0.9,env.height*1.6875)
				keypress.lastdir = 3
			}
			else {
				var offset = 0
				switch(keypress.lastdir){
				case 0:
					offset = 462
				break;
				
				case 1:
					offset = 492
				break;
				
				case 2:
					offset = 522
				break;
				case 3:
					offset = 542
				break;
			}
					if(keypress.left || keypress.right || keypress.up || keypress.down){
						context.drawImage(img,offset,839+(36*Math.round(env.animframe)),21,36,env.x-(env.width/2),env.y-env.height,env.width*0.9,env.height*1.6875)
					} else {
						context.drawImage(img,offset,837,21,36,env.x-(env.width/2),env.y-env.height,env.width*0.9,env.height*1.6875)
					}
			}
	
	
}



loop = function() {

	// this is the main loop of the game, and just runs whatever submodules need to be run every frame. if this gets too big i might have problems.s	
	
	controller();
	
	render();
	
	physics();
	
		if(env.animframe >= 3){
			
		env.animframe=0
	}else{
		env.animframe+=0.035
	}

	setTimeout(window.requestAnimationFrame(loop)); // recursively call this function
	
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
	ntypes:4,
	stabby:{ 
		health:5,
		speed:1.4,
		timer:-1,
		timerc:0,
		dmg:3,
		size:0.5,
		g:0
	},
	shooty:{
		health:3,
		speed:0,
		timer:500,
		timerc:0,
		dmg:1,
		size:0.9,
		g:1
	},
	speedy:{
		health:2,
		speed:1.6,
		timer:-1,
		timerc:0,
		dmg:0.5,
		size:0.4,
		g:0
	},
	tanky:{
		health:8,
		speed:0.8,
		timer:1250,
		timerc:0,
		dmg:4,
		size:1.9,
		g:2
	},
	bully:{
		health:10,
		speed:0,
		timer:277,
		timerc:0,
		dmg:15,
		size:1.4,
		g:0
		
	}
}


room_load = {
	doors:[0,0,0,0],
	denable:1,
	next:[],
	
	foundroom:function(){
		env.invuln = 0
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
		Map.map = output
		
	},

	loadnew:function(room) {
	room_load.denable = 0
	gun.bullets = []
	
	for (i=0;i<=3;i++){
	room_load.doors[i] = 0
	}
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
	
	room_load.foundroom();
	room_load.Monstergen();
	World.rooms[env.curroom] = 4
		
	},
	
	gen:function(seed){
		var n = (seed*seed).toString()
		var digits = 4
		for (i=n.length;i < digits*2;i++){
			n = n.substring(i,i-1) + n
			
		}
		var start = (n.length/2) - 2;
		var end = start+digits
		return n.substring(start,end);
	},
	
	Monstergen:function(){
			Map.Monsters = []
			var roomid = World.rooms[env.temproom]
			if (roomid == 4){
				console.log("travelled")
				return;
			}
			if (roomid == 2){
				console.log("boss room")
				gun.bullets.push({
					x:context.canvas.width/2,
					y:context.canvas.height/2,
					xv:0,
					yv:0,
					u:2
				})
				return;
			}
			var nmon = Math.ceil(roomid/2000)
			for(n=0;n<nmon;n++){
			roomid = room_load.gen(roomid)
			var x = ((roomid/9999) * 1000) + 580
			roomid = room_load.gen(roomid)
			var y = ((roomid/9999) * 451) + 263
			roomid = room_load.gen(roomid)
			var t = Math.floor(roomid/(9999/monstertypes.ntypes))
			switch(t){
				case 0:
					var health=monstertypes.stabby.health
					var speed=monstertypes.stabby.speed
					var timer=monstertypes.stabby.timer
					var timerc=monstertypes.stabby.timerc
					var dmg=monstertypes.stabby.dmg
					var size=monstertypes.stabby.size
					var g=monstertypes.stabby.g
				break;
				case 1:
					var health=monstertypes.shooty.health
					var speed=monstertypes.shooty.speed
					var timer=monstertypes.shooty.timer
					var timerc=monstertypes.shooty.timerc
					var dmg=monstertypes.shooty.dmg
					var size=monstertypes.shooty.size
					var g=monstertypes.shooty.g
				break;
				case 2:
					var health=monstertypes.speedy.health
					var speed=monstertypes.speedy.speed
					var timer=monstertypes.speedy.timer
					var timerc=monstertypes.speedy.timerc
					var dmg=monstertypes.speedy.dmg
					var size=monstertypes.speedy.size
					var g=monstertypes.speedy.g
				break;
				case 3:
					var health=monstertypes.tanky.health
					var speed=monstertypes.tanky.speed
					var timer=monstertypes.tanky.timer
					var timerc=monstertypes.tanky.timerc
					var dmg=monstertypes.tanky.dmg
					var size=monstertypes.tanky.size
					var g=monstertypes.tanky.g
				break;
					
			}
		Map.Monsters.push({
			x:x,
			y:y,
			xv:0,
			yv:0,
			health:health,
			speed:speed,
			timer:timer,
			timerc:timerc,
			dmg:dmg,
			size:size,
			g:g
		})
		}
	}
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
		
			if(i!=size-1 && index < World.rooms.length && index>0){
				
				World.rooms[index] = parseInt(World.gen())
				previndex = index
			}else{
				if (index > World.rooms.length || index < 0){
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
	
	seed:6969,
	
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
	}			// decide what resolution to run the game at depending on the users screen size
	else if (window.screen.availWidth = 1920){
	windowsz.x = 1364
	windowsz.y = 973
	
	}		// same
	
	World.branch()						// generate world
	room_load.loadnew(env.curroom)		// generate starting room, initialise loop

	window.addEventListener("click", function(){
		var xdiff = mouse.x-env.x-(env.width/2)
		var ydiff = mouse.y-env.y-(env.height/2)
		var Length = Math.sqrt((xdiff*xdiff)+(ydiff*ydiff))
		var sf = gun.velocity/Length
		var xv = xdiff*sf
		var yv = ydiff*sf
		
		env.xvel -= xv*0.1
		env.yvel -= yv*0.1
				gun.bullets.push({
					x:env.x,
					y:env.y,
					xv:xv,
					yv:yv,
					u:0
				})
	});

	window.addEventListener("mousemove", function (e) {

		mouse.x = e.clientX-404
		mouse.y = e.clientY-89
	})
	window.addEventListener("keydown",keypress.keyListener);
	window.addEventListener("keyup",keypress.keyListener);
	window.requestAnimationFrame(loop); // call the loop function once
