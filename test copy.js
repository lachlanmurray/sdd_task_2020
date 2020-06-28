var context, keypress, env, loop, controller, physics, render, mouse, Map, windowsz, World, room_load,gun, monstertypes, colliision,statbar,guns,exbar,cheats, bossprofiles;
context = document.getElementById("canvas").getContext("2d");	// making the canvas to draw the game on.
var ctx = document.getElementById("stats").getContext("2d");
var ex 	= document.getElementById("ex").getContext("2d");
var img = document.getElementById("map");

cheats = {
	nuke:function(){
		Map.Monsters = []
	},
	steel:function(){
		env.hp = 9^env.hp^env.hp^env.hp^env.hp^env.hp^env.hp
	},
	payday:function(){
		env.coins = 9999
	},
	spawn:function(monster) {
		var x
		var y
		var xv
		var yv
		var health
		var speed
		var timer
		var timerc
		var dmg
		var size
		var g
		switch(monster){
			case "stabby":
				x = context.canvas.width/2
				y = context.canvas.height/2
				xv = 0
				yv = 0
				health = monstertypes.stabby.health
				speed = monstertypes.stabby.speed
				timer = monstertypes.stabby.timer
				timerc = monstertypes.stabby.timerc
				dmg = monstertypes.stabby.dmg
				size = monstertypes.stabby.size
				g = monstertypes.stabby.g
			break;
			case "shooty":
				x = context.canvas.width/2
				y = context.canvas.height/2
				xv = 0
				yv = 0
				health = monstertypes.shooty.health
				speed = monstertypes.shooty.speed
				timer = monstertypes.shooty.timer
				timerc = monstertypes.shooty.timerc
				dmg = monstertypes.shooty.dmg
				size = monstertypes.shooty.size
				g = monstertypes.shooty.g
			break;
			case "tanky":
				x = context.canvas.width/2
				y = context.canvas.height/2
				xv = 0
				yv = 0
				health = monstertypes.tanky.health
				speed = monstertypes.tanky.speed
				timer = monstertypes.tanky.timer
				timerc = monstertypes.tanky.timerc
				dmg = monstertypes.tanky.dmg
				size = monstertypes.tanky.size
				g = monstertypes.tanky.g
			break;
			case "speedy":
				x = context.canvas.width/2
				y = context.canvas.height/2
				xv = 0
				yv = 0
				health = monstertypes.speedy.health
				speed = monstertypes.speedy.speed
				timer = monstertypes.speedy.timer
				timerc = monstertypes.speedy.timerc
				dmg = monstertypes.speedy.dmg
				size = monstertypes.speedy.size
				g = monstertypes.speedy.g
			break;
			case "demonLord":
				x = context.canvas.width/2
				y = context.canvas.height/2
				xv = 0
				yv = 0
				health = bossprofiles.demonLord.stats.health
				speed = bossprofiles.demonLord.stats.speed
				timer = bossprofiles.demonLord.stats.timer
				timerc = bossprofiles.demonLord.stats.timerc
				dmg = bossprofiles.demonLord.stats.dmg
				size = bossprofiles.demonLord.stats.size
				g = bossprofiles.demonLord.stats.g
			break;
			default:
				alert("could not spawn" + monster + "valid options are: speedy, tanky, shooty and tanky")
			
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
	},
	rambo:function(){
	env.spare = 200
},
	compensation:function(){
		env.gun = "rocketLauncher"
		env.ammoclip = gun.guntypes.rocketLauncher.cap
	},
	pewpew:function(){
		env.gun = "pistol"
		env.ammoclip = gun.guntypes.pistol.cap
	},
	noscope:function(){
		env.gun = "sniper"
		env.ammoclip = gun.guntypes.sniper.cap
	},
	boomstick:function(){
		env.gun = "shotgun"
		env.ammoclip = gun.guntypes.shotgun.cap
	},
}


env = {
	height:35,		//all of te propreties of the player cube **TODO** turn this into a hitbox when actual assets are made.
	width:35,
	radius:20,
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
	invuln:0,
	gun:"pistol",
	coins:0,
	gcd:0,
	ccd:0,
	ammoclip:0,
	spare:40,
	cap:0,
	bossbeaten:0
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
			case 82:// space key
				keypress.reload = keydown;
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
	
	if(keypress.reload){
		gun.reload()
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
	
	if (env.y <=190){
		if (room_load.doors[0] == 1){
			if (env.x > 1005 && env.x < 1125){
				if (env.x + env.xvel < 1005){
					env.x = 1015
				}else if (env.x + env.xvel > 1125){
					env.x = 1115
				}
			}else{
				env.y = 190	
			}
			if(room_load.denable != 1){
				env.y = 190	
			}
		}else {
			env.y = 190
		}
	}	
	if (env.x <=196){
				if (room_load.doors[3] == 1){
			if (env.y > 400 && env.y < 515){
				if (env.y + env.yvel < 440){
					env.y = 445
				}else if (env.y + env.yvel > 515){
					env.y = 505
				}
				if(room_load.denable != 1){
					env.x = 196
				}
			}else{
				env.x = 196	
			}
		}else {
			env.x = 196
		}
	}	
	if (env.y + env.height >= context.canvas.height-200){
		if (room_load.doors[2] == 1){
			if (env.x > 1005 && env.x < 1125){
				if (env.x + env.xvel < 1005){
					env.x = 1015
				}else if (env.x + env.xvel > 1120){
					env.x = 1110
				}
				if(room_load.denable != 1){
					env.y = context.canvas.height - env.height - 200
				}
			}else{
				env.y = context.canvas.height - env.height - 200
			}
		}else {
			env.y = context.canvas.height - env.height - 200
		}
	}	
	if (env.x + env.width >= context.canvas.width-180){
		if (room_load.doors[1] == 1){
			if (env.y > 400 && env.y < 515){
				if (env.y + env.yvel < 440){
					env.y = 445
				}else if (env.y + env.yvel > 515){
					env.y = 520
				}
				if(room_load.denable != 1){
					env.x = context.canvas.width-env.width-180	
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
		if(World.rooms[env.curroom] == 2 && gun.bullets.length <1){
			gun.bullets.push({
				x:context.canvas.width/2,
				y:context.canvas.height/2,
				xv:0,
				yv:0,
				u:2,
				gun:"portal"
			})
		}
	}
	
	if (env.hp <= 0){
		alert("you have died")
		env.hp = 20
		for(i=0;i<Map.Monsters.length;i++){
			Map.Monsters[i].x -= Map.Monsters[i].xv*2
			Map.Monsters[i].y -= Map.Monsters[i].yv*2
		}
		env.invuln = 0
	}
	gun.checkdmg()
	env.ccd+=1
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
	reloadt:0,
	shootlist:[],
	collision:function(){
			if(gun.bullets[i].x > context.canvas.width-20 || gun.bullets[i].x < 20 || gun.bullets[i].y > context.canvas.height-20 || gun.bullets[i].y < 20){
				gun.bullets.splice(i,1)
				return;
			}
			if(gun.bullets[i].x > context.canvas.width-200 && gun.bullets[i].u == 4 || gun.bullets[i].y > context.canvas.height-200 && gun.bullets[i].u == 4){
				gun.bullets.splice(i,1)
				console.log("you just put a gun in lava, what did you expect")
				return;
			}
			if(gun.bullets[i].x < 200 && gun.bullets[i].u == 4 || gun.bullets[i].y < 200 && gun.bullets[i].u == 4){
				gun.bullets.splice(i,1)
				console.log("you just put a gun in lava, what did you expect")
			}
		
	},
	checkdmg:function(){
		var rmb = []
		var rmm = []
		for(m=0;m<Map.Monsters.length;m++){
			for(b=0;b<gun.bullets.length;b++){
				if(collision.circle(Map.Monsters[m].size*30,Map.Monsters[m].x,Map.Monsters[m].y,env.radius/3,gun.bullets[b].x,gun.bullets[b].y) && gun.bullets[b].u == 0){
					
					Map.Monsters[m].health -= gun.bullets[b].m
					if(gun.bullets[b].sp){									// if it is explosive and its timer isnt done yet, set the bullet as about to explode and set its sp to -2 so it is deleted next frame
						if(gun.bullets[b].sp<gun.bullets[b].msp){
							gun.bullets[b].sp = gun.bullets[b].msp -3
						}
					}else{
							gun.bullets.splice(b,1)
						}
					if(Map.Monsters[m].health <= 0){
						var temp = Math.round(Math.random(0,7))
						for(i=0;i<=temp;i++){
						gun.bullets.push({
							x:Map.Monsters[m].x,
							y:Map.Monsters[m].y,
							xv:Map.Monsters[m].xv*Math.random(-1,1)*5,
							yv:Map.Monsters[m].yv*Math.random(-1,1)*5,
							u:3
						})
						switch(Math.round(env.spare/20)*20){
							case 0:
							gun.bullets.push({
							x:Map.Monsters[m].x,
							y:Map.Monsters[m].y,
							xv:Map.Monsters[m].xv*Math.random(-1,1)*2,
							yv:Map.Monsters[m].yv*Math.random(-1,1)*2,
							u:5
						})
							break;
							case 20:
							gun.bullets.push({
							x:Map.Monsters[m].x,
							y:Map.Monsters[m].y,
							xv:Map.Monsters[m].xv*Math.random(-1,1)*2,
							yv:Map.Monsters[m].yv*Math.random(-1,1)*2,
							u:5
						})
							break;
							case 40:
							if(Math.random() < 0.4){
							gun.bullets.push({
							x:Map.Monsters[m].x,
							y:Map.Monsters[m].y,
							xv:Map.Monsters[m].xv*Math.random(-1,1)*2,
							yv:Map.Monsters[m].yv*Math.random(-1,1)*2,
							u:5
						})
							}
							break;
							case 60:
							if(Math.random() < 0.2){
							gun.bullets.push({
							x:Map.Monsters[m].x,
							y:Map.Monsters[m].y,
							xv:Map.Monsters[m].xv*Math.random(-1,1)*2,
							yv:Map.Monsters[m].yv*Math.random(-1,1)*2,
							u:5
						})
							}
							break;
							case 80:
							if(Math.random() < 0.15){
							gun.bullets.push({
							x:Map.Monsters[m].x,
							y:Map.Monsters[m].y,
							xv:Map.Monsters[m].xv*Math.random(-1,1)*2,
							yv:Map.Monsters[m].yv*Math.random(-1,1)*2,
							u:5
						})
							}
							break;
							case 100:
							if(Math.random() < 0.07){
							gun.bullets.push({
							x:Map.Monsters[m].x,
							y:Map.Monsters[m].y,
							xv:Map.Monsters[m].xv*Math.random(-1,1)*2,
							yv:Map.Monsters[m].yv*Math.random(-1,1)*2,
							u:5
						})
							}
							break;
							case 120:
							if(Math.random() < 0.05){
							gun.bullets.push({
							x:Map.Monsters[m].x,
							y:Map.Monsters[m].y,
							xv:Map.Monsters[m].xv*Math.random(-1,1)*2,
							yv:Map.Monsters[m].yv*Math.random(-1,1)*2,
							u:5
						})
							}
							break;
							case 140:
							if(Math.random() < 0.04){
							gun.bullets.push({
							x:Map.Monsters[m].x,
							y:Map.Monsters[m].y,
							xv:Map.Monsters[m].xv*Math.random(-1,1)*2,
							yv:Map.Monsters[m].yv*Math.random(-1,1)*2,
							u:5
						})
							}
							break;
							case 160:
							if(Math.random() < 0.03){
							gun.bullets.push({
							x:Map.Monsters[m].x,
							y:Map.Monsters[m].y,
							xv:Map.Monsters[m].xv*Math.random(-1,1)*2,
							yv:Map.Monsters[m].yv*Math.random(-1,1)*2,
							u:5
						})
							}
							break;
							case 180:
							if(Math.random() < 0.02){
							gun.bullets.push({
							x:Map.Monsters[m].x,
							y:Map.Monsters[m].y,
							xv:Map.Monsters[m].xv*Math.random(-1,1)*2,
							yv:Map.Monsters[m].yv*Math.random(-1,1)*2,
							u:5
						})
							}
							break;
							case 200:
							env.ammoclip = 200

							break;
						}
							
						
						
						}
						rmm.push(m)
						break;
					} // spawn coins and ammo when they die
				}
			}
		}	// check if player bullet his enemy
		
		for(i=0;i<gun.bullets.length;i++){
			if(collision.circle(env.radius,env.x+(env.width/2),env.y+(env.height/2),env.radius/2,gun.bullets[i].x,gun.bullets[i].y) && gun.bullets[i].u == 1){
				env.xvel+= gun.bullets[i].xv
				env.yvel+= gun.bullets[i].yv
				
				if(gun.bullets[i].heal && env.coins > 0 && World.rooms[env.curroom] == 3){
					env.hp += gun.bullets[i].heal
					if(gun.bullets[i].cost){
						env.coins -= gun.bullets[i].cost
					}
					setTimeout(function(){
						gun.bullets.push({
						x:context.canvas.width*0.755,
						y:context.canvas.height/2,
						xv:0,
						yv:0,
						u:1,
						cost:1,
						heal:1,
					})
				},300)
				}else if(env.coins == 0 && World.rooms[env.curroom] == 3){
					env.xvel*= -3
					env.yvel*= -3
					setTimeout(function(){
						gun.bullets.push({
						x:context.canvas.width*0.755,
						y:context.canvas.height/2,
						xv:0,
						yv:0,
						u:1,
						cost:1,
						heal:1,
					})
				},150)
				}
				else{
					env.hp -= 1
				}
				gun.bullets.splice(i,1)
			} else if (collision.circle(env.radius,env.x+(env.width/2),env.y+(env.height/2),env.radius/2,gun.bullets[i].x,gun.bullets[i].y) && gun.bullets[i].u == 3){
				env.coins+=1
				gun.bullets.splice(i,1)
			} else if (collision.circle(env.radius,env.x+(env.width/2),env.y+(env.height/2),env.radius/2,gun.bullets[i].x,gun.bullets[i].y) && gun.bullets[i].u == 5){
				env.spare += 10
				gun.bullets.splice(i,1)
			}
			if(collision.circle(env.radius,env.x,env.y,env.radius/2,(context.canvas.width/2) ,context.canvas.height/2) && gun.bullets[i].u == 2){
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
				env.hp += 20
				env.coins += 20
				env.curroom = 40
				World.rooms[env.curroom] = 1
				World.branch();
				room_load.loadnew(env.curroom)
				Map.Monsters = []
				gun.bullets = []
			}// using a bullet as a pseudo warp point in the middle of a room on defeat of the boss to load in a new room
			if(collision.circle(env.radius,env.x+(env.width/2),env.y+(env.height/2),env.radius/2,gun.bullets[i].x,gun.bullets[i].y) && gun.bullets[i].u == 4){
				if(gun.bullets[i].cost && gun.reloadt != 1){
					if(env.coins >= gun.bullets[i].cost){
						var clip = gun.bullets[i].clip
				gun.pickup(gun.bullets[i].gun,clip)
				env.coins -= gun.bullets[i].cost
				gun.bullets.splice(i,1) // take necessary stuff our and input into function rather than preserving bullet
			}
				}else{
					if(gun.bullets[i].clip && gun.reloadt != 1){
					var clip = gun.bullets[i].clip
					}else{
					var clip = env.cap
					}
					gun.pickup(gun.bullets[i].gun,clip)
					gun.bullets.splice(i,1) // take necessary stuff our and input into function rather than preserving bullet
				}
				}
				
		}
		if(env.ammoclip > env.cap && env.invuln > 1){
				env.ammoclip = env.cap
			}
		for(rm=0;rm<rmm.length;rm++){
			Map.Monsters.splice(rmm[rm],1)

		}
				
		
		
		if(env.spare > 200){
			env.spare = 200
		}else if(env.spare < 1){
			env.spare += 1
		}
		if(env.ammoclip > env.cap){
			env.ammoclip = env.cap
		}
	},
	guntypes:{
		nguns:4,
		pistol:{
			damage:1,
			sprite:1,
			cd:18,
			cap:20,
			shopprice:10,
			cap:20
		},
		sniper:{
			damage:5,
			sprite:2,
			pc:1,
			cd:72,
			cap:5,
			shopprice:30,
			cap:5
		},
		shotgun:{
			damage:1,
			sprite:3,		
			spreadangle:25,
			pellets:6,
			cd:60,
			shopprice:20,
			cap:7
		},
		rocketLauncher:{
			damage:0.5,
			rocketDamage:2,
			sprite:4,
			xp:1,
			xpr:20,
			cd:120,
			cap:1,
			shopprice:30,
			pc:1,		
		}
	},
	dropgun:function(x){
		if(env.xvel >0.1 || env.yvel > 0.1){
			
			gun.bullets.push({
			x:env.x+env.width*1.5*env.xvel*-1,
			y:env.y+env.height/2*env.yvel*-1,
			xv:0,
			yv:0,
			gun:env.gun,
			u:4,
			clip:env.ammoclip
		})
		env.gun="fists"
		}else {gun.bullets.push({
			x:env.x+env.width*1.5,
			y:env.y+env.height/2,
			xv:0,
			yv:0,
			gun:env.gun,
			u:4,
			clip:env.ammoclip
		})
		env.gun="fists"
			  }
	},
	pickup:function(whichgun,clip){
		if(env.gun != "fists"){
			gun.dropgun()
		}
		env.gun = whichgun
		switch(env.gun){
			case "pistol":
				env.gcd = gun.guntypes.pistol.cd
				env.cap = gun.guntypes.pistol.cap
			break;
			case "sniper":
				env.gcd = gun.guntypes.sniper.cd
				env.cap = gun.guntypes.sniper.cap
			break;
			case "shotgun":
				env.gcd = gun.guntypes.shotgun.cd
				env.cap = gun.guntypes.shotgun.cap
			break;
			case "rocketLauncher":
				env.gcd = gun.guntypes.rocketLauncher.cd
				env.cap = gun.guntypes.rocketLauncher.cap
			break;
			default:
				env.gcd = gun.guntypes.pistol.cd
				env.cap = gun.guntypes.pistol.cap
			break;
		}
		
		env.ammoclip = clip
	},
	reload:function(){
		var check = env.gun
		setTimeout(function(){
			if(env.gun == check){
			if(env.spare >= env.cap){
				env.spare -= env.cap - env.ammoclip
				env.ammoclip = env.cap
			}else if (env.spare < env.cap - env.ammoclip){
				env.ammoclip = env.ammoclip + env.spare
				env.spare = 0
			}else if (env.spare + env.ammoclip >= env.cap){
				env.spare -= env.cap - env.ammoclip
				env.ammoclip = env.cap
			}
				gun.reloadt = 0
			}
		},env.gcd*19)
	
},}
	

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
	statbar();
	exbar();
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

			
			
				if(gun.bullets[i].decay < gun.guntypes.rocketLauncher.xpr*0.6){
					gun.bullets[i].decay+=1
				}else if (gun.bullets[i].decay == gun.guntypes.rocketLauncher.xpr){
					gun.bullets.splice(i,1)
					break;
				}else if(gun.bullets[i].decay >= gun.guntypes.rocketLauncher.xpr*0.6){
					gun.bullets[i].xv = 0
					gun.bullets[i].yv = 0
					gun.bullets[i].decay+=1
				}
				
				if(gun.bullets[i].xv > 0){
					context.drawImage(img,0,1403,63,52,gun.bullets[i].x-(env.width/6.5),gun.bullets[i].y-(env.height/6.5),env.width,env.height);
				}else{
					context.drawImage(img,70,1403,63,52,gun.bullets[i].x-(env.width/6.5),gun.bullets[i].y-(env.height/6.5),env.width,env.height);
				}
			
				var explode = 0
				
				for(m=-1;m<Map.Monsters.length;m=m+1){
				if(Math.round(gun.bullets[i].sp) == Math.round(gun.bullets[i].msp)){
					explode = 1
				}
				
				}
					
					if(explode == 1){
					for(x=0;x<5;x++){
					var xvmod = Math.sin(90-(5*x))
					var yvmod = Math.cos(90-(5*x))
					var xg = gun.bullets[i].x
					var yg = gun.bullets[i].y
					var xx = xvmod * 7
					var yy = yvmod * 7
					gun.bullets.push({
						x:xg,
						y:yg,
						xv:xx,
						yv:yy,
						u:gun.bullets[i].u,
						m:gun.guntypes.rocketLauncher.damage,
						sp:100,
						decay:0
					})
						context.drawImage(img,0,1490+(23*Math.round(env.animframe)),27,23,gun.bullets[i].x-(env.width/6.5),gun.bullets[i].y-(env.height/6.5),env.width/3,env.width/3)
					}
					gun.bullets.splice(i,1)
					}
		}else if(gun.bullets[i].u == 3){
				 context.drawImage(img, 1805 + (50*Math.round(env.animframe*2)), 228, 45, 50,gun.bullets[i].x-(env.width/2),gun.bullets[i].y-(env.height/2),25,25);
			}else if(gun.bullets[i].gun){
				var offset = 0
				switch(gun.bullets[i].gun){
					case "sniper":
						offset = 1
					break;
					case "pistol":
						offset = 0
					break;
					case "shotgun":
						offset = 3
					break;
					case "rocketLauncher":
						offset = 2
					break;
					case "portal":
						offset = 4
					break;
					default:
						offset = -1
					break;
				}
				if(offset != 4){
					context.drawImage(img, 1800+(170*offset), 300, 170, 100,gun.bullets[i].x-25,gun.bullets[i].y-15,68,50);
					context.drawImage(img, 1800+(170*offset), 300, 170, 100,gun.bullets[i].x-25,gun.bullets[i].y-15,68,50);
				}else{
					context.drawImage(img, 1800+(172*offset), 300, 170, 100,context.canvas.width/2 - 150,context.canvas.height/2 - 50,408,300);
					context.drawImage(img, 1800+(172*offset), 300, 170, 100,context.canvas.width/2 - 150,context.canvas.height/2 - 50,408,300);
				}
				
				if(gun.bullets[i].cost){
					
				var c = gun.bullets[i].cost.toString()
				var c2 = c.split("")
				for(f=0;f<c2.length;f++){
				switch(c2[f]){
					case "1":
						context.drawImage(img, 1798, 0, 100, 96,gun.bullets[i].x+(20*f),gun.bullets[i].y-40,20,19);
						break;
					case "2":
						context.drawImage(img, 1898, 0, 100, 96,gun.bullets[i].x+(20*f),gun.bullets[i].y-40,20,19);
						break;
					case "3":
						context.drawImage(img, 1998, 0, 100, 96,gun.bullets[i].x+(20*f),gun.bullets[i].y-40,20,19);
						break;
					case "4":
						context.drawImage(img, 2098, 0, 100, 96,gun.bullets[i].x+(20*f),gun.bullets[i].y-40,20,19);
						break;
					case "5":
						context.drawImage(img, 2198, 0, 100, 96,gun.bullets[i].x+(20*f),gun.bullets[i].y-40,20,19);
						break;
					case "6":
						context.drawImage(img, 1798, 110, 100, 96,gun.bullets[i].x+(20*f),gun.bullets[i].y-40,20,19);
						break;
					case "7":
						context.drawImage(img, 1898, 110, 100, 96,gun.bullets[i].x+(20*f),gun.bullets[i].y-40,20,19);
						break;
					case "8":
						context.drawImage(img, 1998, 110, 100, 96,gun.bullets[i].x+(20*f),gun.bullets[i].y-40,20,19);
						break;
					case "9":
						context.drawImage(img, 2098, 110, 100, 96,gun.bullets[i].x+(20*f),gun.bullets[i].y-40,20,19);
						break;
					case "0":
						context.drawImage(img, 2198, 110, 100, 96,gun.bullets[i].x+(20*f),gun.bullets[i].y-40,20,19);
						break;
					default:
						context.drawImage(img, 2198, 110, 100, 96,gun.bullets[i].x+(20*f),gun.bullets[i].y-40,20,19);
						break;
	
	}
					context.drawImage(img, 1805 + (50*Math.round(env.animframe*2)), 228, 45, 60,gun.bullets[i].x-30,gun.bullets[i].y-40,20,20);
				}
				}
				
			}else if(gun.bullets[i].u == 5){
				context.drawImage(img, 1739, 226, 60, 50,gun.bullets[i].x-(env.width/2),gun.bullets[i].y-(env.height/2),25,25);
			}
			else if(gun.bullets[i].u == 6){
				context.drawImage(img, 1654, 226, 75, 50,gun.bullets[i].x-37,gun.bullets[i].y-25,110,50);
				}
			
			else{	
				if (gun.bullets[i].xv == 0 && gun.bullets[i].cost){
					context.drawImage(img,1580,229,70,50,gun.bullets[i].x-30,gun.bullets[i].y-20,70,50);
				var c = gun.bullets[i].cost.toString()
				var c2 = c.split("")
				for(f=0;f<c2.length;f++){
				switch(c2[f]){
					case "1":
						context.drawImage(img, 1798, 0, 100, 96,gun.bullets[i].x+(20*f),gun.bullets[i].y-40,20,19);
						break;
					case "2":
						context.drawImage(img, 1898, 0, 100, 96,gun.bullets[i].x+(20*f),gun.bullets[i].y-40,20,19);
						break;
					case "3":
						context.drawImage(img, 1998, 0, 100, 96,gun.bullets[i].x+(20*f),gun.bullets[i].y-40,20,19);
						break;
					case "4":
						context.drawImage(img, 2098, 0, 100, 96,gun.bullets[i].x+(20*f),gun.bullets[i].y-40,20,19);
						break;
					case "5":
						context.drawImage(img, 2198, 0, 100, 96,gun.bullets[i].x+(20*f),gun.bullets[i].y-40,20,19);
						break;
					case "6":
						context.drawImage(img, 1798, 110, 100, 96,gun.bullets[i].x+(20*f),gun.bullets[i].y-40,20,19);
						break;
					case "7":
						context.drawImage(img, 1898, 110, 100, 96,gun.bullets[i].x+(20*f),gun.bullets[i].y-40,20,19);
						break;
					case "8":
						context.drawImage(img, 1998, 110, 100, 96,gun.bullets[i].x+(20*f),gun.bullets[i].y-40,20,19);
						break;
					case "9":
						context.drawImage(img, 2098, 110, 100, 96,gun.bullets[i].x+(20*f),gun.bullets[i].y-40,20,19);
						break;
					case "0":
						context.drawImage(img, 2198, 110, 100, 96,gun.bullets[i].x+(20*f),gun.bullets[i].y-40,20,19);
						break;
					default:
						context.drawImage(img, 2198, 110, 100, 96,gun.bullets[i].x+(20*f),gun.bullets[i].y-40,20,19);
						break;
	
	}
					context.drawImage(img, 1805 + (50*Math.round(env.animframe*2)), 228, 45, 60,gun.bullets[i].x-30,gun.bullets[i].y-40,20,20);
				}
				}else{
					context.drawImage(img,0,1490+(23*Math.round(env.animframe)),27,23,gun.bullets[i].x-(env.width/6.5),gun.bullets[i].y-(env.height/6.5),env.width/3,env.width/3)
				}
			}
			
			if(env.debug == 1){
			context.fillStyle = "#0000ff";							// make it draw in red
			context.beginPath();									// start drawing a new object
			context.arc(gun.bullets[i].x,gun.bullets[i].y,env.height/10,0,Math.PI*2,true)			// use the descriptors in env (the player) to draw the object
			context.fill();
			} // debug code
			
			if(gun.bullets[i].u != 3){
			gun.bullets[i].x += gun.bullets[i].xv
			gun.bullets[i].y += gun.bullets[i].yv
			} else if (gun.bullets[i].u == 3){
				gun.bullets[i].xv *= 0.94
				gun.bullets[i].yv *= 0.94
				gun.bullets[i].x += gun.bullets[i].xv
				gun.bullets[i].y += gun.bullets[i].yv
			}
			if (gun.bullets[i].u == 5){
				gun.bullets[i].xv *= 0.94
				gun.bullets[i].yv *= 0.94
				gun.bullets[i].x += gun.bullets[i].xv
				gun.bullets[i].y += gun.bullets[i].yv
			}
		
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
						context.drawImage(img,155,800+(142*Math.round(env.animframe)),128,128,Map.Monsters[f].x-Map.Monsters[f].size*43,Map.Monsters[f].y-Map.Monsters[f].size*43,86*Map.Monsters[f].size,86*Map.Monsters[f].size);
					} else{
						context.drawImage(img,155,800+(142*4),128,128,Map.Monsters[f].x-Map.Monsters[f].size*43,Map.Monsters[f].y-Map.Monsters[f].size*43,86*Map.Monsters[f].size,86*Map.Monsters[f].size);
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
				case 4:
					if(Map.Monsters[f].xv > 0){
					context.drawImage(img,3336,47+(155*(Math.round(env.animframe))),110,153,Map.Monsters[f].x-Map.Monsters[f].size*23,Map.Monsters[f].y-Map.Monsters[f].size*40,52*Map.Monsters[f].size,77*Map.Monsters[f].size);
					}else{
					context.drawImage(img,3221,47+(155*(Math.round(env.animframe))),110,153,Map.Monsters[f].x-Map.Monsters[f].size*23,Map.Monsters[f].y-Map.Monsters[f].size*40,52*Map.Monsters[f].size,77*Map.Monsters[f].size);
					}
				break;
				default:
					if(Map.Monsters[f].timerc > 60){
						context.drawImage(img,155,800+(142*Math.round(env.animframe)),128,128,Map.Monsters[f].x-Map.Monsters[f].size*64,Map.Monsters[f].y-Map.Monsters[f].size*64,128*Map.Monsters[f].size,128*Map.Monsters[f].size);
					} else{
						context.drawImage(img,155,800+(142*4),128,128,Map.Monsters[f].x-Map.Monsters[f].size*64,Map.Monsters[f].y-Map.Monsters[f].size*64,128*Map.Monsters[f].size,128*Map.Monsters[f].size);
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
			if(env.invuln <=50){
				Map.Monsters[f].x  -= Map.Monsters[f].xv
				Map.Monsters[f].y  -= Map.Monsters[f].yv
				env.invuln +=1
			}
		
		
		//Ranged monster attack if timer is done
			if(Map.Monsters[f].timerc == Map.Monsters[f].timer || Map.Monsters[f].timerc == Map.Monsters[f].timer -20 || Map.Monsters[f].timerc == Map.Monsters[f].timer -40){
				if(Map.Monsters[f].g == 2){
					var xdiff = env.x-Map.Monsters[f].x
					var ydiff = env.y-Map.Monsters[f].y
					var Length = Math.sqrt((xdiff*xdiff)+(ydiff*ydiff))
					var sf = gun.velocity/Length
					var xv = xdiff*sf
					var yv = ydiff*sf
					
					var xg = parseInt(Map.Monsters[f].x.toString())
					var yg = parseInt(Map.Monsters[f].y.toString())
					
					if(Map.Monsters[f].timerc == Map.Monsters[f].timerc){
					   gun.bullets.push({
						x:xg,
						y:yg,
						xv:xv,
						yv:yv,
						sp:1,
						msp:144,
						u:1
					})
					   }
				}
				else if(Map.Monsters[f].g == 1){
				Map.Monsters[f].x -= Map.Monsters[f].xv
				Map.Monsters[f].y -= Map.Monsters[f].yv
				gun.shootlist = []
				for(n=0;n<Map.Monsters.length;n++){
					if(Map.Monsters[n].g == 1){
					gun.shootlist.push(n)
					}
					for (g=0;g<gun.shootlist.length;g++){
				for (i=0;i<6;i++){
					var xvmod = Math.sin(360+(45*i))
					var yvmod = Math.cos(360+(45*i))
					var xg = parseInt(Map.Monsters[gun.shootlist[g]].x.toString())
					var yg = parseInt(Map.Monsters[gun.shootlist[g]].y.toString())
					var xx = xvmod * 3
					var yy = yvmod * 3
					context.drawImage(img,155,800+(142*4),128,128,Map.Monsters[f].x-Map.Monsters[f].size*64,Map.Monsters[f].y-Map.Monsters[f].size*64,128*Map.Monsters[f].size,128*Map.Monsters[f].size);
					gun.bullets.push({
							x:Map.Monsters[f].x,
							y:Map.Monsters[f].y,
							xv:xx,
							yv:yy,
							u:1,
							m:monstertypes.shooty.dmg
						})
				}
				}
				}}
				if(Map.Monsters[f].timerc == Map.Monsters[f].timer && Map.Monsters[f].g != 3){
				Map.Monsters[f].timerc = 0
				}
				if(Map.Monsters[f].g == 2){
					Map.Monsters[f].speed = 0.8
				}
				
					
				if(Map.Monsters[f].g ==1){
				Map.Monsters[f].speed = 0
				}
				
			}
				if(Map.Monsters[f].g == 3){
				if(Map.Monsters[f].timerc >= Map.Monsters[f].timer){
					bossprofiles.demonLord.currentbehaviour = 4//Math.floor(World.gen()/Math.floor(9000/bossprofiles.demonLord.stats.nbehaviours))
					var xdiff = (env.x-(env.width/2))-Map.Monsters[f].x
					var ydiff = (env.y-(env.height/2))-Map.Monsters[f].y
					var Length = Math.sqrt((xdiff*xdiff)+(ydiff*ydiff))
					var sf = gun.velocity/Length
					var xv = xdiff*sf
					var yv = ydiff*sf
					switch(bossprofiles.demonLord.currentbehaviour){
						case 1:
							for(x=0;x<8;x++){
							var xvmod = Math.sin(90-(8*x))
							var yvmod = Math.cos(90-(8*x))
							var xx = xvmod * 7
							var yy = yvmod * 7
							gun.bullets.push({
								x:Map.Monsters[f].x,
								y:Map.Monsters[f].y,
								xv:xx,
								yv:yy,
								u:1,
								sp:1,
								msp:45,
								m:bossprofiles.demonLord.stats.dmg*2
							})
							}
							Map.Monsters[f].timerc = 0
							break;
						case 2:
							if(Map.Monsters[f].timerc == Map.Monsters[f].timer + 80 || Map.Monsters[f].timerc == Map.Monsters[f].timer + 100 || Map.Monsters[f].timerc == Map.Monsters[f].timer + 120){
							var angle = (Math.acos(xv/gun.velocity) - (90*(Math.PI/180))/2) +1.5708
							var increment = (90*(Math.PI/180))/3
							for(p=0;p<3;p++){
								var xv2 = Math.sin(angle)*gun.velocity
								var yv2 = Math.cos(angle)*gun.velocity
								if(ydiff < 0){
									var neg = 1
									}else{
										var neg = -1
										}
								gun.bullets.push({
								x:Map.Monsters[f].x,
								y:Map.Monsters[f].y,
								xv:xv2,
								yv:yv2*neg,
								u:1,
								sp:1,
								msp:Math.sqrt(Math.pow((env.x-Map.Monsters[f].x),2)+Math.pow((env.y-Map.Monsters[f].y),2))/5,
								m:bossprofiles.demonLord.stats.dmg*2
								})
								
								angle += increment
							}
								if(Map.Monsters[f].timerc == Map.Monsters[f].timer + 120){
									Map.Monsters[f].timerc = 0
								}
							}
							break;
						case 3:
							gun.bullets.push({
							x:Map.Monsters[f].x,
							y:Map.Monsters[f].y,
							xv:xv*3,
							yv:yv*3,
							u:1,
							m:bossprofiles.demonLord.stats.dmg
							})
							if(Map.Monsters[f].timerc == Map.Monsters[f].timer + 144){
							   Map.Monsters[f].timerc = 0
							   }
							break;
						case 4:
							if(Map.Monsters[f].health < bossprofiles.demonLord.stats.health/4){
								for(x=0;x<50;x++){
							var xvmod = Math.sin(90-(50*x))
							var yvmod = Math.cos(90-(50*x))
							var xx = xvmod * 7
							var yy = yvmod * 7
							gun.bullets.push({
								x:Map.Monsters[f].x,
								y:Map.Monsters[f].y,
								xv:xx,
								yv:yy,
								u:1,
								sp:1,
								msp:45,
								m:bossprofiles.demonLord.stats.dmg
							})
							}
							Map.Monsters[f].timerc = 0
							break;
							}else{
								for(x=0;x<8;x++){
							var xvmod = Math.sin(90-(8*x))
							var yvmod = Math.cos(90-(8*x))
							var xx = xvmod * 7
							var yy = yvmod * 7
							gun.bullets.push({
								x:Map.Monsters[f].x,
								y:Map.Monsters[f].y,
								xv:xx,
								yv:yy,
								u:1,
								sp:1,
								msp:45,
								m:bossprofiles.demonLord.stats.dmg
							})
							}
							Map.Monsters[f].timerc = 0
							break;
							}
							break;
					}
				}//behaviour for demonLord
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
						Map.Monsters[f].x -= Map.Monsters[f].xv *0.95
						Map.Monsters[f].y -= Map.Monsters[f].yv *0.95*Math.random()
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
			
			if(Map.Monsters[f].g !=3 && Map.Monsters[f].g !=4){
				context.fillStyle = "#000000";
				context.fillRect((Map.Monsters[f].x - 32 * Map.Monsters[f].health/2) - 1, Map.Monsters[f].y - 61, (32 * Map.Monsters[f].health)+2,6);
				switch(Map.Monsters[f].health){
					case 1:
						context.fillStyle = "#FF0000";
						break;
					case 2:
						context.fillStyle = "#FF4500";
						break;
					case 3:
						context.fillStyle = "#FCCF3F";
						break;
					case 4:
						context.fillStyle = "#BFFF00";
						break;
					
					default:
						context.fillStyle = "#00FF00";
						break;
				}
				context.fillRect(Map.Monsters[f].x - 32 * Map.Monsters[f].health/2, Map.Monsters[f].y - 60, 32 * Map.Monsters[f].health,4);
			}else {
				context.fillStyle = "#00FF00";
				context.fillRect(context.canvas.width*0.1, context.canvas.height*0.90, context.canvas.width*0.004*Map.Monsters[f].health,context.canvas.height*0.05);
			}//draw healthbar down the bottom if it is a boss
		
	}
	if(env.debug == 1){
			context.fillStyle = "#00ff00";							
			context.beginPath();
			context.arc(env.x+ (env.width/2),env.y + (env.height/2),env.radius,0,Math.PI*2,true)
			context.fill();
			}
			
	if (keypress.up){ 	
				context.drawImage(img,462,838+(36*Math.round(env.animframe)),21,36,env.x+3,env.y-15,env.width*0.9,env.height*1.6875)
				keypress.lastdir = 0
			}
	else if (keypress.down){	
				context.drawImage(img,492,838+(36*Math.round(env.animframe)),21,36,env.x+3,env.y-15,env.width*0.9,env.height*1.6875)
				keypress.lastdir = 1
			}
	else if (keypress.left){	
				context.drawImage(img,522,837+(36*Math.round(env.animframe)),21,36,env.x+3,env.y-15,env.width*0.9,env.height*1.6875)
				keypress.lastdir = 2
			}
	else if (keypress.right){
				context.drawImage(img,542,837+(36*Math.round(env.animframe)),21,36,env.x+3,env.y-15,env.width*0.9,env.height*1.6875)
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
						context.drawImage(img,offset,839+(36*Math.round(env.animframe)),21,36,env.x-15,env.y-15,env.width*0.9,env.height*1.6875)
					} else {
						context.drawImage(img,offset,837,21,36,env.x+3,env.y-15,env.width*0.9,env.height*1.6875)
					}
			}
}


loop = function() {

	// this is the main loop of the game, and just runs whatever submodules need to be run every frame. if this gets too big i might have problems.s	
	setInterval(function() {
  // animiate something

	controller();
	
	render();
	
	physics();
	
		if(env.animframe >= 3){
			
		env.animframe=0
	}else{
		env.animframe+=0.035
	}
}, 1000/144);
	
	
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
		speed:1.3,
		timer:-1,
		timerc:0,
		dmg:1,
		size:0.4,
		g:0
	},
	tanky:{
		health:15,
		speed:0.9,
		timer:1100,
		timerc:0,
		dmg:4,
		size:1.9,
		g:2
	},
}


bossprofiles = {
	
	demonLord:{
		stats:{	
		health:200,
		speed:0.4,
		timer:750,
		timerc:0,
		dmg:1,
		size:4,
		g:3,
		currentbehaviour:0,
		nbehaviours:4
			
		},
	},
	
}


room_load = {
	doors:[0,0,0,0],
	denable:1,
	next:[],
	shoptemp:[999],
	
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
	if(World.rooms[env.curroom] != 2 && World.rooms[env.curroom] != 3 && World.rooms[env.curroom] !=1){
	World.rooms[env.curroom] = 4
	}
		
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
			if (roomid == 1){
				console.log("start room")
				return;
			}
			if (roomid == 3){
				console.log("Shop room")
				gun.bullets.push({
					x:context.canvas.width/2,
					y:(context.canvas.height/2)+50,
					xv:0,
					yv:0,
					u:6
				})
				gun.bullets.push({
					x:context.canvas.width*0.25,
					y:(context.canvas.height/2)+50,
					xv:0,
					yv:0,
					u:6
				})
				gun.bullets.push({
					x:context.canvas.width*0.75,
					y:(context.canvas.height/2)+50,
					xv:0,
					yv:0,
					u:6
				})
				if(room_load.shoptemp[0] == 999){
					room_load.shoptemp[0] = Math.floor(World.gen()/Math.floor((9000/gun.guntypes.nguns)-1))
					room_load.shoptemp[1] = Math.floor(World.gen()/3332)
					room_load.shoptemp[2] = Math.floor(World.gen()/3332)
				} //generates rng for what is in the shop so it is consistent, only applies for most recent shop
				
				switch(room_load.shoptemp[0]){
					case 0:
						gun.bullets.push({
						x:context.canvas.width*0.25,
						y:context.canvas.height/2,
						xv:0,
						yv:0,
						gun:"shotgun",
						u:4,
						cost:gun.guntypes.shotgun.shopprice,
						clip:gun.guntypes.shotgun.cap
					})
					break;
					case 1:
						gun.bullets.push({
						x:context.canvas.width*0.25,
						y:context.canvas.height/2,
						xv:0,
						yv:0,
						gun:"sniper",
						u:4,
						cost:gun.guntypes.sniper.shopprice,
						clip:gun.guntypes.sniper.cap
					})
					break;
					case 2:
						gun.bullets.push({
						x:context.canvas.width*0.25,
						y:context.canvas.height/2,
						xv:0,
						yv:0,
						gun:"pistol",
						u:4,
						cost:gun.guntypes.pistol.shopprice,
						clip:gun.guntypes.pistol.cap
					})
					break;
					case 3:
						gun.bullets.push({
						x:context.canvas.width*0.25,
						y:context.canvas.height/2,
						xv:0,
						yv:0,
						gun:"rocketLauncher",
						u:4,
						cost:gun.guntypes.rocketLauncher.shopprice,
						clip:gun.guntypes.rocketLauncher.cap
					})
					break;
					default:
						gun.bullets.push({
						x:context.canvas.width*0.25,
						y:context.canvas.height/2,
						xv:0,
						yv:0,
						gun:"pistol",
						u:4,
						cost:gun.guntypes.pistol.shopprice,
						clip:gun.guntypes.pistol.cap
					})
						break;
				} //chooses what gun item will show up based on shoptemp
				switch(room_load.shoptemp[1]){
					case 0:
						gun.bullets.push({
						x:context.canvas.width/2,
						y:context.canvas.height/2,
						xv:0,
						yv:0,
						gun:"rocketLauncher",
						u:4,
						cost:50,
						clip:gun.guntypes.pistol.cap
					})
					break;
					case 1:
						gun.bullets.push({
						x:context.canvas.width/2,
						y:context.canvas.height/2,
						xv:0,
						yv:0,
						gun:"rocketLauncher",
						u:4,
						cost:50,
						clip:gun.guntypes.rocketLauncher.cap
					})
					break;
					case 2:
						gun.bullets.push({
						x:context.canvas.width/2,
						y:context.canvas.height/2,
						xv:0,
						yv:0,
						gun:"rocketLauncher",
						u:4,
						cost:50,
						clip:gun.guntypes.pistol.cap
					})
					break;
				} //chooses what buff item will show up based on shoptemp
				switch(room_load.shoptemp[2]){
					case 0:
						gun.bullets.push({
						x:context.canvas.width*0.755,
						y:context.canvas.height/2,
						xv:0,
						yv:0,
						u:1,
						cost:1,
						heal:1,
					})
					break;
					case 1:
						gun.bullets.push({
						x:context.canvas.width*0.755,
						y:context.canvas.height/2,
						xv:0,
						yv:0,
						u:1,
						cost:1,
						heal:1,
					})
					break;
					case 2:
						gun.bullets.push({
						x:context.canvas.width*0.755,
						y:context.canvas.height/2,
						xv:0,
						yv:0,
						u:1,
						cost:1,
						heal:1,
					})
					break;
				} //chooses what health item will show up
				return;
			}
			if (roomid == 2){
				console.log("boss room")
				if(env.bossbeaten != 1){
					cheats.spawn("demonLord")
					if(env.gun == "pistol"){
						env.spare = 200
					}
				}else{
					gun.bullets.push({
					x:context.canvas.width/2,
					y:context.canvas.height/2,
					xv:0,
					yv:0,
					u:2,
					gun:"portal"
				})
				}
					
				
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
			for (i=0;i<Map.Monsters.length;i++){
				if(Map.Monsters[i].x == x){
					x+=30
				}
				if(Map.Monsters[i].y == y){
					y+=30
				}
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
			if(World.rooms[index] >= 2200 && World.rooms[index] <= 2650 ){
				World.rooms[index] = 3
			}
			
			
		}
		World.rooms[env.curroom] = 1
		World.printworld()
	},
	
	seed:1234,
	
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


statbar = function(){
	var img = document.getElementById("map");
	ctx.drawImage(img, 804, 0, 202, 488,0,0,403,976);
	var hp = env.hp.toString()
	var hp2 = hp.split("")
	
	for(i=0;i<hp2.length;i++){
	switch(hp[i]){
		case "1":
			ctx.drawImage(img, 1798, 0, 100, 96,120+(87*i),450,100,96);
		break;
		case "2":
			ctx.drawImage(img, 1898, 0, 100, 96,120+(87*i),450,100,96);
		break;
		case "3":
			ctx.drawImage(img, 1998, 0, 100, 96,120+(87*i),450,100,96);
		break;
		case "4":
			ctx.drawImage(img, 2098, 0, 100, 96,120+(87*i),450,100,96);
		break;
		case "5":
			ctx.drawImage(img, 2198, 0, 100, 96,120+(87*i),450,100,96);
		break;
		case "6":
			ctx.drawImage(img, 1798, 110, 100, 96,120+(87*i),450,100,96);
		break;
		case "7":
			ctx.drawImage(img, 1898, 110, 100, 96,120+(87*i),450,100,96);
		break;
		case "8":
			ctx.drawImage(img, 1998, 110, 100, 96,120+(87*i),450,100,96);
		break;
		case "9":
			ctx.drawImage(img, 2098, 110, 100, 96,120+(87*i),450,100,96);
		break;
		case "0":
			ctx.drawImage(img, 2198, 110, 100, 96,120+(87*i),450,100,96);
		break;
	}
	}
	
	ctx.drawImage(img, 1045 + (200*(Math.round(env.animframe*2.5)%2.5)), 32, 100, 128,120,250,200,192);
	ctx.drawImage(img, 1805 + (50*Math.round(env.animframe*2)), 228, 45, 45,75,600,50,50);
	
	var coins = env.coins.toString()
	var coins2 = coins.split("")
	
	for(i=0;i<coins2.length;i++){
	switch(coins2[i]){
		case "1":
			ctx.drawImage(img, 1798, 0, 100, 96,150+(35*i),615,30,28);
		break;
		case "2":
			ctx.drawImage(img, 1898, 0, 100, 96,150+(35*i),615,30,28);
		break;
		case "3":
			ctx.drawImage(img, 1998, 0, 100, 96,150+(35*i),615,30,28);
		break;
		case "4":
			ctx.drawImage(img, 2098, 0, 100, 96,150+(35*i),615,30,28);
		break;
		case "5":
			ctx.drawImage(img, 2198, 0, 100, 96,150+(35*i),615,30,28);
		break;
		case "6":
			ctx.drawImage(img, 1798, 110, 100, 96,150+(35*i),615,30,28);
		break;
		case "7":
			ctx.drawImage(img, 1898, 110, 100, 96,150+(35*i),615,30,28);
		break;
		case "8":
			ctx.drawImage(img, 1998, 110, 100, 96,150+(35*i),615,30,28);
		break;
		case "9":
			ctx.drawImage(img, 2098, 110, 100, 96,150+(35*i),615,30,28);
		break;
		case "0":
			ctx.drawImage(img, 2198, 110, 100, 96,150+(35*i),615,30,28);
		break;
	}
	}
}


exbar = function(){
	var offset = 0
	switch(env.gun){
		case "pistol":
			offset = 0
		break;
		case "sniper":
			offset = 1
		break;
		default:
			offset = -1
		break;
	}
	var img = document.getElementById("map");
	var reset = 0
	if (env.ccd > env.gcd){
		reset = 0
	}else{
		reset = env.ccd/env.gcd
	}
	if (gun.reloadt == 1){
		reset = 1
	}
	ex.drawImage(img, 804, 478, 1450, 255,0,0,2570,300);
	ex.drawImage(img, 1800+(170*offset), 300, 170, 100,700,50,340,250);
	ex.drawImage(img, 1800+(170*offset), 300+(50*reset), 170, 100,700,50+(125*reset),340,250);
	var ammo = env.ammoclip.toString()
	var ammo2 = ammo.split("")
	
	for(i=0;i<ammo2.length;i++){
	switch(ammo2[i]){
		case "1":
			ex.drawImage(img, 1798, 0, 100, 96,500+(87*i),75,75,72);
		break;
		case "2":
			ex.drawImage(img, 1898, 0, 100, 96,500+(87*i),75,75,72);
		break;
		case "3":
			ex.drawImage(img, 1998, 0, 100, 96,500+(87*i),75,75,72);
		break;
		case "4":
			ex.drawImage(img, 2098, 0, 100, 96,500+(87*i),75,75,72);
		break;
		case "5":
			ex.drawImage(img, 2198, 0, 100, 96,500+(87*i),75,75,72);
		break;
		case "6":
			ex.drawImage(img, 1798, 110, 100, 96,500+(87*i),75,75,72);
		break;
		case "7":
			ex.drawImage(img, 1898, 110, 100, 96,500+(87*i),75,75,72);
		break;
		case "8":
			ex.drawImage(img, 1998, 110, 100, 96,500+(87*i),75,75,72);
		break;
		case "9":
			ex.drawImage(img, 2098, 110, 100, 96,500+(87*i),75,75,72);
		break;
		case "0":
			ex.drawImage(img, 2198, 110, 100, 96,500+(87*i),75,75,72);
		break;
		default:
			ex.drawImage(img, 2198, 110, 100, 96,500+(87*i),75,75,72);
		break;
	}
	}
	
	var spare = env.spare.toString()
	var spare2 = spare.split("")
	
	for(i=0;i<spare2.length;i++){
	switch(spare2[i]){
		case "1":
			ex.drawImage(img, 1798, 0, 100, 96,400+(29*i),110,30,28.8);
		break;
		case "2":
			ex.drawImage(img, 1898, 0, 100, 96,400+(29*i),110,30,28.8);
		break;
		case "3":
			ex.drawImage(img, 1998, 0, 100, 96,400+(29*i),110,30,28.8);
		break;
		case "4":
			ex.drawImage(img, 2098, 0, 100, 96,400+(29*i),110,30,28.8);
		break;
		case "5":
			ex.drawImage(img, 2198, 0, 100, 96,400+(29*i),110,30,28.8);
		break;
		case "6":
			ex.drawImage(img, 1798, 110, 100, 96,400+(29*i),110,30,28.8);
		break;
		case "7":
			ex.drawImage(img, 1898, 110, 100, 96,400+(29*i),110,30,28.8);
		break;
		case "8":
			ex.drawImage(img, 1998, 110, 100, 96,400+(29*i),110,30,28.8);
		break;
		case "9":
			ex.drawImage(img, 2098, 110, 100, 96,400+(29*i),110,30,28.8);
		break;
		case "0":
			ex.drawImage(img, 2198, 110, 100, 96,400+(29*i),110,30,28.8);
		break;
		default:
			ex.drawImage(img, 2198, 110, 100, 96,400+(29*i),110,30,28.8);
		break;
	}
	}
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
	room_load.loadnew(env.curroom)		// generate starting room
	var firstframe = function(){
		var xdiff = mouse.x-env.x-(env.width/2)
		var ydiff = mouse.y-env.y-(env.height/2)
		var Length = Math.sqrt((xdiff*xdiff)+(ydiff*ydiff))
		var sf = gun.velocity/Length
		var xv = xdiff*sf
		var yv = ydiff*sf
		switch(env.gun){
			case "pistol":
				env.gcd = gun.guntypes.pistol.cd
				env.cap = gun.guntypes.pistol.cap
			break;
			case "sniper":
				env.gcd = gun.guntypes.sniper.cd
				env.cap = gun.guntypes.sniper.cap
			break;
			case "shotgun":
				env.gcd = gun.guntypes.shotgun.cd
				env.cap = gun.guntypes.shotgun.cap
			break;
			case "rocketLauncher":
				env.gcd = gun.guntypes.rocketLauncher.cd
				env.cap = gun.guntypes.rocketLauncher.cap
			break;
			default:
				env.gcd = gun.guntypes.pistol.cd
				env.cap = gun.guntypes.pistol.cap
			break;
		}
			if(env.gcd < env.ccd && env.ammoclip >=1 && gun.reloadt == 0){
				env.xvel -= xv*0.1
				env.yvel -= yv*0.1
				env.ammoclip-=1
				env.ccd = 0
				switch(env.gun){
					case "pistol":
						gun.bullets.push({
							x:env.x+(env.width/2),
							y:env.y+(env.height/2),
							xv:xv,
							yv:yv,
							u:0,
							m:gun.guntypes.pistol.damage
						})
						break;
					case "sniper":
							console.log(gun.bullets)
							gun.bullets.push({
								x:env.x+(env.width/2),
								y:env.y+(env.height/2),
								xv:xv,
								yv:yv,
								u:0,
								m:gun.guntypes.sniper.damage
							})
					break;
					case "shotgun":
						for(i=0;i<gun.guntypes.shotgun.pellets;i++){
							console.log(i)
						gun.bullets.push({
							x:env.x+(env.width/2),
							y:env.y+(env.height/2),
							xv:xv,
							yv:yv,
							u:0,
							m:gun.guntypes.shotgun.damage
						})
						}
					break;
					case "flakCannon":
						for(i=0;i<gun.guntypes.flakCannon.pellets;i++){
						gun.bullets.push({
							x:env.x+(env.width/2),
							y:env.y+(env.height/2),
							xv:xv*Math.sin(gun.guntypes.shotgun.ospa/i),
							yv:yv*Math.sin(i/gun.guntypes.shotgun.ospa),
							u:0,
							sp:1
						})
						}
					break;
					case "rocketLauncher":
						for(i=0;i<gun.guntypes.flakCannon.pellets;i++){
						gun.bullets.push({
							x:env.x+(env.width/2),
							y:env.y+(env.height/2),
							xv:xv,
							yv:yv,
							u:0,
							sp:1
						})
						}
					break;
					default:
						gun.bullets.push({
							x:env.x+(env.width/2),
							y:env.y+(env.height/2),
							xv:xv,
							yv:yv,
							u:0
						})
					
						
			}
			}else if (env.ammoclip == 0 && gun.reloadt != 1){
				gun.reloadt = 1
				if(env.spare !=0){
				gun.reload()
				}
					  }
			if(gun.reloadt == 1 && env.ammoclip > 0){
				gun.reloadt = 0
			}
	}
	firstframe()
	window.addEventListener("click", function(){
		var xdiff = mouse.x-env.x-env.width*0.5
		var ydiff = mouse.y-env.y-env.height*1.5
		var Length = Math.sqrt((xdiff*xdiff)+(ydiff*ydiff))
		var sf = gun.velocity/Length
		var xv = xdiff*sf
		var yv = ydiff*sf
		
		
		switch(env.gun){
			case "pistol":
				env.gcd = gun.guntypes.pistol.cd
				env.cap = gun.guntypes.pistol.cap
			break;
			case "sniper":
				env.gcd = gun.guntypes.sniper.cd
				env.cap = gun.guntypes.sniper.cap
			break;
			case "shotgun":
				env.gcd = gun.guntypes.shotgun.cd
				env.cap = gun.guntypes.shotgun.cap
			break;
			case "rocketLauncher":
				env.gcd = gun.guntypes.rocketLauncher.cd
				env.cap = gun.guntypes.rocketLauncher.cap
			break;
			default:
				env.gcd = gun.guntypes.pistol.cd
				env.cap = gun.guntypes.pistol.cap
			break;
		}
		
			if(env.gcd < env.ccd && env.ammoclip >=1 && gun.reloadt == 0){
				env.xvel -= xv*0.1
				env.yvel -= yv*0.1
				env.ammoclip-=1
				env.ccd = 0
				switch(env.gun){
					case "pistol":
						gun.bullets.push({
							x:env.x+(env.width/2),
							y:env.y+(env.height/2),
							xv:xv,
							yv:yv,
							u:0,
							m:gun.guntypes.pistol.damage
						})
						break;
					case "sniper":
							
							gun.bullets.push({
								x:env.x+(env.width/2),
								y:env.y+(env.height/2),
								xv:xv,
								yv:yv,
								u:0,
								m:gun.guntypes.sniper.damage
							})
					break;
					case "shotgun":
						var angle = (Math.acos(xv/gun.velocity) - (gun.guntypes.shotgun.spreadangle*(Math.PI/180))/2) + 1.5708
						var increment = (gun.guntypes.shotgun.spreadangle*(Math.PI/180))/gun.guntypes.shotgun.pellets
						for(p=0;p<gun.guntypes.shotgun.pellets;p++){
						var xv2 = Math.sin(angle)*gun.velocity
						var yv2 = Math.cos(angle)*gun.velocity
						if(ydiff < 0){
							var neg = 1
						}else{
							var neg = -1
						}
						
						gun.bullets.push({
							x:env.x+(env.width/2),
							y:env.y+(env.height/2),
							xv:xv2,
							yv:yv2 * neg,
							u:0,
							m:gun.guntypes.shotgun.damage
						})
						angle += increment
						}
				
						
					break;
					case "flakCannon":
						for(i=0;i<gun.guntypes.flakCannon.pellets;i++){
						gun.bullets.push({
							x:env.x+(env.width/2),
							y:env.y+(env.height/2),
							xv:xv*Math.sin(gun.guntypes.shotgun.ospa/i),
							yv:yv*Math.sin(i/gun.guntypes.shotgun.ospa),
							u:0,
							sp:1
						})
						}
					break;
					case "rocketLauncher":
						
						gun.bullets.push({
							x:env.x+(env.width/2),
							y:env.y+(env.height/2),
							xv:xv,
							yv:yv,
							u:0,
							sp:1,
							msp:Math.sqrt(Math.pow((mouse.x-env.x),2)+Math.pow((mouse.y-env.y),2))/5,
							m:gun.guntypes.rocketLauncher.rocketDamage
						})
						
					break;
					default:
						gun.bullets.push({
							x:env.x+(env.width/2),
							y:env.y+(env.height/2),
							xv:xv,
							yv:yv,
							u:0
						})
					
						
			}
				if (env.ammoclip == 0 && gun.reloadt != 1){
				if(env.spare !=0){
				gun.reload()
				}
					  }
			}
		
	});
	
	window.addEventListener("mousemove", function (e) {

		mouse.x = e.clientX-404
		mouse.y = e.clientY-89
	})
	window.addEventListener("keydown",keypress.keyListener);
	window.addEventListener("keyup",keypress.keyListener);
	window.requestAnimationFrame(loop); // call the loop function once
