var row1=['orange','red','lawngreen','hotpink','yellow','deepskyblue','mediumpurple','saddlebrown'];
var row2=['deepskyblue','orange','hotpink','mediumpurple','red','yellow','saddlebrown','lawngreen'];
var row3=['mediumpurple','hotpink','orange','deepskyblue','lawngreen','saddlebrown','yellow','red'];
var row4=['hotpink','lawngreen','red','orange','saddlebrown','mediumpurple','deepskyblue','yellow'];
var row5=['yellow','deepskyblue','mediumpurple','saddlebrown','orange','red','lawngreen','hotpink'];
var row6=['red','yellow','saddlebrown','lawngreen','deepskyblue','orange','hotpink','mediumpurple'];
var row7=['lawngreen','saddlebrown','yellow','red','mediumpurple','hotpink','orange','deepskyblue'];
var row8=['saddlebrown','mediumpurple','deepskyblue','yellow','hotpink','lawngreen','red','orange'];
var grid=[row1,row2,row3,row4,row5,row6,row7,row8];
var cx;

var figures=[];
var free=[];
var selected=17;
var plr=0;

function Start()
{
canvas = document.querySelector("canvas");
canvas.addEventListener('click', (e) => {
   Swap(((e.clientX-canvas.offsetLeft)-(e.clientX-canvas.offsetLeft)%100)/100,((e.clientY-canvas.offsetTop)-(e.clientY-canvas.offsetTop)%100)/100);
});
cx=canvas.getContext("2d");
cx.clearRect(0,0,800,800);
for (var i=0;i<8;i++)
{
	for (var j=0;j<8;j++)
	{
		DrawRect(i,j);
	}
}
for (var i=0;i<2;i++)
{
	for (var j=0;j<8;j++)
	{
		figures[i*8+j]=new Figure(i,grid[j][i*7],j,i*7);
	}
}
for (var i=0;i<16;i++)
{
	DrawFigure(figures[i]);
}
}

function DrawFigure(figure)
{
	cx.beginPath();
    cx.arc(figure.x*100+50, figure.y*100+50, 45, 0, 2 * Math.PI, false);
	if(figure.player==0)
	{
		cx.fillStyle='lightgray';
	}
	else
	{
		cx.fillStyle='gray';
	}
	cx.fill();
	cx.beginPath();
    cx.arc(figure.x*100+50, figure.y*100+50, 30, 0, 2 * Math.PI, false);
	cx.fillStyle=figure.color;
	cx.fill();
}

function DrawRect(x,y)
{
	cx.fillStyle=grid[x][y];
	cx.fillRect(x*100, y*100, 100, 100);
}

function LightPath(figure)
{
	free=[];
	if(figure.player==0)
	{
		Light(figure.x-1,figure.y+1,1);
		Light(figure.x,figure.y+1,2);
		Light(figure.x+1,figure.y+1,3);
	}
	else
	{
		Light(figure.x-1,figure.y-1,4);
		Light(figure.x,figure.y-1,5);
		Light(figure.x+1,figure.y-1,6);
	}
}

function Light(x,y,direction)
{
	for (var i=0;i<16;i++)
	{
		if(figures[i].x==x&&figures[i].y==y)
		{
			return;
		}
	}
	if(x>=0&&x<8&&y>=0&&y<8)
	{
		cx.fillStyle='whitesmoke';
		cx.fillRect(x*100, y*100, 100, 100);
		cx.fillStyle=grid[x][y];
		cx.fillRect(x*100+5, y*100+5, 100-10, 100-10);
		free.push(x+' '+y);
		switch(direction)
		{
			case 1: 
			Light(x-1,y+1,direction);
			break
			case 2: 
			Light(x,y+1,direction);
			break
			case 3: 
			Light(x+1,y+1,direction);
			break
			case 4: 
			Light(x-1,y-1,direction);
			break
			case 5: 
			Light(x,y-1,direction);
			break
			case 6: 
			Light(x+1,y-1,direction);
			break
		}
	}
	else
	{
		return;
	}
}

function Figure(player,color,x,y)
{
	this.player=player;
	this.color=color;
	this.x=x;
	this.y=y;
}

function Swap(x,y)
{
	if(selected==17)
	{
		for (var i=0;i<16;i++)
		{
			if(figures[i].x==x&&figures[i].y==y)
			{
				plr=figures[i].player;
				selected=i;
				LightPath(figures[selected]);
				return;
			}
		}
	}
	for (var i=0;i<free.length;i++)
	{
		if ((x+' '+y)==free[i])
		{
			DrawRect(figures[selected].x,figures[selected].y);
			figures[selected].x=x;
			figures[selected].y=y;
			for (var j=0;j<free.length;j++)
			{
				DrawRect(free[j][0],free[j][2]);
			}
			DrawFigure(figures[selected]);
			if(figures[selected].y==(1-figures[selected].player)*7)
			{
				alert('Игрок '+(figures[selected].player+1)+' побеждает!');
				location.reload();
			}
			for (var j=0;j<16;j++)
			{
				if(figures[j].player!=plr&&figures[j].color==grid[x][y])
				{
					selected=j;
					plr=(plr==1)? 0 : 1;
					LightPath(figures[selected]);
					if(free.length==0)
					{
						for(var t=0;t<16;t++)
						{
							if(figures[t].player!=plr&&figures[t].color==grid[x][y])
							{
								selected=t;
								plr=(plr==1)? 0 : 1;
								LightPath(figures[selected]);
							}
						}
					}
					return;
				}
			}
		}
	}
}