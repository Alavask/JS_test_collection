var ctx;
var sx,sy;
sx=100;sy=100;
var p=1;
var sump=0;
var divider=2;
var interval=1000;
var loop;

var dots=[]

function Start()
{
canvas = document.querySelector("canvas");
ctx=canvas.getContext("2d");
ctx.clearRect(0,0,1500,800);
DrawDot(sx,sy);
canvas.addEventListener("click", function (evt) {
    var mousePos = getMousePos(canvas, evt);
	AddDot(mousePos.x,mousePos.y);
}, false);
}

function Dot(x,y,p)
{
	this.x=x;
	this.y=y;
	this.p=p;
}

function DrawDot(x,y)
{
	ctx.beginPath();
	ctx.arc(x,y,3,0,2*Math.PI);
	ctx.fill();
}

function AddDot(x,y)
{
	dots[dots.length]=new Dot(x,y,p);
	DrawDot(x,y);
	sump = +p+ +sump;
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function ChangeP()
{
	p=document.getElementById('P').value;
	alert("Установлено!");
}

function ChangeDiv()
{
	divider=document.getElementById('Div').value;
	alert("Установлено!");
}

function ChangeInt()
{
	interval=document.getElementById('Int').value;
	alert("Установлено!");
}

function Clear()
{
	ctx.clearRect(0,0,1500,800);
	dots=[];
	clearInterval(loop);
loop=null;
	sx=100;
	sy=100;
	DrawDot(sx,sy);
	sump=0;
}

function Enable()
{if(!loop){
	loop=setInterval(Loop,interval);
}
}

function Disable()
{
	clearInterval(loop);
loop=null;
}

function Loop()
{	
	var count=getRandomInt(0,sump);
	for (var i=0;i<dots.length;i++)
	{	
		count=count-dots[i].p;
		if(count<0)
		{
			sx=sx+(dots[i].x-sx)/divider;
			sy=sy+(dots[i].y-sy)/divider;
			DrawDot(sx,sy);
			break
		}
	}
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}