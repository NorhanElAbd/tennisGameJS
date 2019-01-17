var canv,
	canvContext, 
	bx = 400,
	by = 400,
	framePerSec = 40,
	bxspeed = 6,
	byspeed = 1.5,
	paddle1Y = 250,
	paddle2Y = 250,
	p1Score = 0,
	p2Score = 0,
	showWinner = false;
const PADDEL_Height = 100,
	  winnerScore = 5;


window.onload = function(){

	canv = document.getElementById('canv');
	canvContext = canv.getContext('2d');
	canvContext.font = '30px Arial';
	setInterval(function(){
		drawAll();
		move();
		score();
	},1000/framePerSec);

	canv.addEventListener('mousemove', function(event){
		var mousePos = calcMousePos(event);
		paddle1Y = mousePos.y - PADDEL_Height/2;
	});

	canv.addEventListener('mousedown', function(event){
		if(showWinner == false){
			return;
		}
		showWinner = false;
		p1Score =0; 
		p2Score =0;
		Reset();
	});

}

function move(){

	if(showWinner){
		return;
	}

	bx+=bxspeed;
	by+=byspeed;

	if(bx >= canv.width){
		
		if(by >= paddle2Y && by <= (paddle2Y + PADDEL_Height)){
			bxspeed = - bxspeed;
			var deltaY = by - (paddle2Y + PADDEL_Height/2);
		    byspeed = deltaY * 0.30;
		} else{
			p1Score++;
			Reset();
			bxspeed = - bxspeed;
		}
	}

	if(bx <= 0){
		
		if(by >= paddle1Y && by <= (paddle1Y + PADDEL_Height)){
			bxspeed = - bxspeed;
			var deltaY = by - (paddle1Y + PADDEL_Height/2);
			byspeed = deltaY * 0.30;
		} else{
			p2Score++;
			Reset();
			bxspeed = - bxspeed;
		}
	}

	if(by > canv.height || by < 0){
		byspeed = - byspeed;
	}

	computerMovement();
}

function drawAll(){

	drawRect(0, 0, canv.width, canv.height, 'black');
	if(showWinner){
		canvContext.fillStyle = 'white';
		canvContext.fillText('Click to Continue', 400,400);
		Reset();
		return;
	}
	drawRect(1, paddle1Y, 10, PADDEL_Height,'white');
	drawRect(canv.width-1, paddle2Y, -10, PADDEL_Height, 'white');
	ball();
	playyard();
}

function drawRect(x1,y1,x2,y2,color){
	canvContext.fillStyle = color;
	canvContext.fillRect(x1, y1, x2, y2);
}

function ball(){
	canvContext.fillStyle = 'white';
	canvContext.beginPath();
	canvContext.arc(bx, by, 10, 0, Math.PI*2, true);
	canvContext.fill();
}

function calcMousePos(event){
	var rect = canv.getBoundingClientRect(); 
	var root =  document.documentElement;
	var mouseX = event.clientX - rect.left - root.scrollLeft;
	var mouseY = event.clientY - rect.top - root.scrollTop;
	return{
		x:mouseX,
		y:mouseY
	};
}

function Reset(){
	if(p1Score >= winnerScore){
		showWinner = true;
		canvContext.fillText('2eh 2l 7alwa de :D', 400, 200);
	}

	else if(p2Score >= winnerScore){
		showWinner = true;
		canvContext.fillText('ya loser 2l3ab tani :@', 400,200);
	}else{
	
		bx = canv.width/2;
		by = canv.height/2;
		byspeed = 3;
	}
}

function computerMovement(){

	var paddel2Center = paddle2Y + PADDEL_Height/2;

	if(paddel2Center > by +35){
		paddle2Y-=6;
	} else if(paddel2Center < by -35){
		paddle2Y+=6;
	}
}

function score(){
	canvContext.fillText(p1Score,100,100);
	canvContext.fillText(p2Score,800,100);
}

function playyard(){
	for (var i = 0; i < canv.height; i+=40) {
		drawRect(canv.width/2-1,i,2,20,'white');	
	}
}