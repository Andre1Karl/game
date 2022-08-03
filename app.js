var movement = 5;
var enemyTime=[];
var bulletTime=[];
var score=0;
var Hscore = localStorage.getItem('Highscore', score);
var currentH=100;
var g;
document.querySelector('body').addEventListener('keydown',moveP);
document.querySelector('#Hscore').innerHTML="High Score: " + localStorage.getItem('Highscore');

function moveP(x){
	if (x.keyCode==40){
		moveDown();
	}
	if (x.keyCode==38){
		moveUp();
	}
	if (x.keyCode==39){
		moveRight();
	}
	if (x.keyCode==37){
		moveLeft();
	}
	if (x.keyCode==32) {
		jump();
	}
	if (x.keyCode==16) {
		attack();
	}
}

function moveDown(){
		var currentTop = document.querySelector('#player').style.top;
		if (currentTop=='') currentTop=0;
		if (parseInt(currentTop)<=270) {
		document.querySelector('#player').style.top=parseInt(currentTop)+movement+'px';	
	}
}

function moveUp() {
		var currentTop = document.querySelector('#player').style.top;
		if (currentTop=='') currentTop=0;
		if (parseInt(currentTop)>=1) {
		document.querySelector('#player').style.top=parseInt(currentTop)-movement+'px';
	}
}

function moveRight() {
		var currentLeft = document.querySelector('#player').style.left;
		if (currentLeft=='') currentLeft=0;
		if (parseInt(currentLeft)<=270) {
		document.querySelector('#player').style.left=parseInt(currentLeft)+movement+'px';	
	}
}

function moveLeft() {
		var currentLeft = document.querySelector('#player').style.left;
		if (currentLeft=='') currentLeft=0;
		if (parseInt(currentLeft)>=5)
		document.querySelector('#player').style.left=parseInt(currentLeft)-movement+'px';
	}

function jump(){
	setTimeout(moveUp,0);
	setTimeout(moveUp,75);
	setTimeout(moveDown,150);
	setTimeout(moveDown,225);
}

function attack(){
	var currentTop=parseInt(document.querySelector('#player').style.top)+12;
	var currentLeft=parseInt(document.querySelector('#player').style.left)+20;
	if (document.querySelector('#player').style.left == '') currentLeft=20;
	if (document.querySelector('#player').style.top=='') currentTop=12;
	var bulletID= 'bullet'+Date.now()
	var bullet = document.createElement('img');
	bullet.setAttribute('src','images/bullet1.png');
	bullet.setAttribute('id',bulletID);
	bullet.setAttribute('class','bullet');
	document.querySelector('#bullets').appendChild(bullet);
	document.querySelector('#'+bulletID).style.display='block';
	document.querySelector('#'+bulletID).style.top=currentTop+'px';
	document.querySelector('#'+bulletID).style.left=currentLeft+'px';
	bulletTime[bulletID]=setInterval(function(){
		bLeft=parseInt(document.querySelector('#'+bulletID).style.left);
		if (bLeft=='') bLeft=currentLeft;
		document.querySelector('#'+bulletID).style.left=bLeft+3+'px';
		hit(bulletID);
		if (bLeft>=300) {
			clearInterval(bulletTime[bulletID])
			document.querySelector('#'+bulletID).remove()
		}
	},100);
}
function enemy(){
	var enemyStart=300;
	var currentTop=Math.floor((Math.random()*275));
	var enemyID= 'enemy'+Date.now()
	var enemy = document.createElement('img');
	enemy.setAttribute('src','images/enemy.png');
	enemy.setAttribute('id',enemyID);
	enemy.setAttribute('class','enemy');
	document.querySelector('#enemy').appendChild(enemy);
	document.querySelector('#'+enemyID).style.display='block';
	document.querySelector('#'+enemyID).style.top=currentTop+'px';
	document.querySelector('#'+enemyID).style.left=enemyStart+'px';
	enemyTime[enemyID]=setInterval(function(){
		eLeft=parseInt(document.querySelector('#'+enemyID).style.left);
		//if (eLeft=='') eLeft=enemyStart;
		document.querySelector('#'+enemyID).style.left=eLeft-3+'px';
		if (eLeft<0) {
			clearInterval(enemyTime[enemyID]);
			document.querySelector('#'+enemyID).remove();
			health();
		}
	},100);
}
function start(){
	g=setInterval(function(){
		enemy()},1500);
	document.querySelector('#start').remove()
}
function hit(h){
	var e=document.querySelectorAll('.enemy');
	var bullet=document.querySelector('#'+h);
	for (var i=0; i <e.length; i++){
		var hitL=false;
		var hitT=false;
		//if(parseInt(e[i].style.left)-parseInt(bullet.style.left)<=10)
		if(parseInt(e[i].style.left)<=parseInt(bullet.style.left)&&parseInt(e[i].style.left)+23>=parseInt(bullet.style.left)) 
		hitL=true;	
		//if(parseInt(e[i].style.top)-parseInt(bullet.style.top)<=10)
		if(parseInt(e[i].style.top)<=parseInt(bullet.style.top)&&parseInt(e[i].style.top)+23>=parseInt(bullet.style.top)) 
		hitT=true;	
	if(hitL && hitT){
		score++;
		document.querySelector('#score').innerHTML='Score: ' +score; 
		console.log('hit');
		clearInterval(bulletTime[bullet.getAttribute('id')]);
		clearInterval(enemyTime[e[i].getAttribute('id')]);
		bullet.remove();
		e[i].remove();
	}
}
}

function health(){
	currentH=currentH-10;
	document.querySelector('#hbar-content').style.width=currentH+'%';
	if (currentH<=0) gameover();
}

function gameover(){
	document.querySelector('#gameover').style.display='block';
	clearInterval(g);

	var e=document.querySelectorAll('.enemy');
	for(var i=0; i<e.length; i++){
		clearInterval(enemyTime[e[i].getAttribute('id')]);
	}
	var b=document.querySelectorAll('.bullet');
	for(var i=0; i <b.length; i++){
		clearInterval(bulletTime[b[i].getAttribute('id')]);
	}
	document.querySelector('body').removeEventListener('keydown',moveP);
	document.querySelector('#controls').remove();

	if (score>Hscore){
	localStorage.setItem('Highscore', score);
	} localStorage.removeItem('#Hscore');
}

