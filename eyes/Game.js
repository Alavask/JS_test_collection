var ctx;
var rect;

var mx,my;
var width =1600;
var height=800;
var eyew = 100;
var eyeh = 50;

function Start()
{
canvas = document.querySelector("canvas");
ctx=canvas.getContext("2d");
rect = canvas.getBoundingClientRect();
ctx.clearRect(0,0,width,height);
}

function Mouse_position(e)
{
mx = e.pageX-rect.left;
my = e.pageY-rect.top;
for (var i=0;i<width;i=i+eyew)
{
	for (var j =0;j<height;j=j+eyeh)
	{
		Draw_eye(i,j,eyew,eyeh);
	}
}
}

function Draw_eye(x,y,lx,ly)
{
	ctx.fillStyle = "#000000";
	ctx.fillRect(x, y, lx, ly);
	ctx.beginPath();
	ctx.moveTo(x+10,y+ly/2);
	ctx.bezierCurveTo(x+lx/3, y, x+2*lx/3, y, x+lx-10, y+ly/2);
	ctx.bezierCurveTo(x+2*lx/3, y+ly, x+lx/3, y+ly, x+10, y+ly/2);
	ctx.fillStyle ="#FFFFFF";
	ctx.fill();
	ctx.beginPath();
	ctx.moveTo(x+lx/2,y+ly/2);
	ctx.arc(Math.min(Math.max(x+ly/4,x+lx/2+lx/2*((mx-x-lx/2)/width)),x+lx-ly/4),Math.min(Math.max(y+ly/4,y+ly/2+ly/2*((my-y-ly/2)/height)),y+ly-ly/4),ly/4,Math.PI*2,0);
	if (Math.min(Math.max(x+ly/4,mx),x+lx-ly/4)==mx&&Math.min(Math.max(y+ly/4,my),y+ly-ly/4)==my)
	{
		ctx.fillStyle = "#FF0000";
	}
	else
	{
	ctx.fillStyle = "#000000";
	}
	ctx.fill();
}
