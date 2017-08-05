(function($){
	$.fn.flexBackground = function(options){
	'use strict';

		/**------------------ SETTING PARAMETERS ------------------**/
		
		var height;
		var width;
		
		var numberOfPoints = 200;
		var radius = 1;
		var interval = 50;
		var color = {r:256, g:256, b:256};

		var config = {};
		if(options){
			$.extend(config, options);
		}
		
		
		
		
		/**------------------ BEGIN FUNCTION BODY ------------------**/
		
		
		
			var selector = $(this);
			var selectorCan = $(this).find("canvas");
			
			if(config.numberOfPoints)
				numberOfPoints = parseInt(config.numberOfPoints, 10);
			
			if(config.radius)
				radius = parseInt(config.radius, 10);
			
			if(config.interval)
				interval = parseInt(config.interval, 10);
			
			if(config.color){
				var regExp = new RegExp("\\d+", "g");
				color.r = regExp.exec(config.color);
				color.g = regExp.exec(config.color);
				color.b = regExp.exec(config.color);
			}
			
			
			/**------------------------------------------------  SETTING FUNCTIONS ------------------------------------------------- **/

			
			width = selector.width();
			height = selector.height();
			
			selectorCan.attr('height', height);
			selectorCan.attr('width', width);
			
			var canvas = selectorCan[0];
			var ctx = canvas.getContext("2d");

			var tempx = 60;
			var tempy = 60;
			
			var timeOut = 1;
						
			var starX = new Array();			
			var starY = new Array();	
			var destStarX = new Array();			
			var destStarY = new Array();
			var starId = new Array();

			var sparkStar = new Array();
			
			function drawStar(posX, posY){
				ctx.fillStyle = "rgba(" +color.r + "," + color.g + "," + color.b + ", .7)";
				ctx.beginPath();
				ctx.arc(posX, posY, radius*.5, 0, Math.PI*2, true);
				ctx.closePath();
				ctx.fill();
				
				ctx.fillStyle = "rgba(" +color.r + "," + color.g + "," + color.b + ", .2)";
				ctx.beginPath();
				ctx.arc(posX, posY, radius, 0, Math.PI*2, true);
				ctx.closePath();
				ctx.fill();
				
				ctx.fillStyle = "rgba(" +color.r + "," + color.g + "," + color.b + ", .1)";
				ctx.beginPath();
				ctx.arc(posX, posY, radius*1.5, 0, Math.PI*2, true);
				ctx.closePath();
				ctx.fill();

			}

			function drawSparklingStar(posX, posY, base){
				if(base < 0)
					return;
				base = base*1.5;
				
				ctx.fillStyle = "rgba(" +color.r + "," + color.g + "," + color.b + ", .7)";
				ctx.beginPath();
				ctx.arc(posX, posY, base, 0, Math.PI*2, true);
				ctx.closePath();
				ctx.fill();
				
				ctx.fillStyle = "rgba(" +color.r + "," + color.g + "," + color.b + ", .2)";
				ctx.beginPath();
				ctx.arc(posX, posY, base*2, 0, Math.PI*2, true);
				ctx.closePath();
				ctx.fill();
				
				ctx.fillStyle = "rgba(" +color.r + "," + color.g + "," + color.b + ",.1)";
				ctx.beginPath();
				ctx.arc(posX, posY, base*3, 0, Math.PI*2, true);
				ctx.closePath();
				ctx.fill();
				
				var a = 7*base/1.5;
				var grd;
				

				
				ctx.beginPath();
				ctx.moveTo(posX - a, posY - a);

				grd=ctx.createLinearGradient(posX - a, posY - a, posX + a, posY +a);
				grd.addColorStop(0,"rgba(" +color.r + "," + color.g + "," + color.b + ", 0)");
				grd.addColorStop(.5,"rgba(" +color.r + "," + color.g + "," + color.b + ", 1)");
				grd.addColorStop(1,"rgba(" +color.r + "," + color.g + "," + color.b + ", 0)");	
				
				ctx.strokeStyle = grd;
				ctx.lineTo(posX + a , posY + a);
				ctx.closePath();
				ctx.stroke();
				
				ctx.beginPath();
				ctx.moveTo(posX + a, posY - a);

				grd=ctx.createLinearGradient(posX - a, posY + a, posX + a, posY - a);
				grd.addColorStop(0,"rgba(" +color.r + "," + color.g + "," + color.b + ", 0)");
				grd.addColorStop(.5,"rgba(" +color.r + "," + color.g + "," + color.b + ", 1)");
				grd.addColorStop(1,"rgba(" +color.r + "," + color.g + "," + color.b + ", 0)");	

				ctx.strokeStyle = grd;
				ctx.lineTo(posX - a , posY + a);
				ctx.closePath();
				ctx.stroke();
				
			}
			
		
			function refresh(){

				width = selector.width();
				height = selector.height();
				
				selectorCan.attr('height', height);
				selectorCan.attr('width', width);			
				
				for(var i = 0; i < numberOfPoints; i++){
					starX[i] = Math.random()*width;
					starY[i] = Math.random()*height;
					
					if(Math.random()*10 >= 8 && Math.random()*10 <= 10){
						starId[i] = 1;
					}else{
						starId[i] = 0;
					}
					
					sparkStar[i] = 1;
				}

				for(var i = 0; i < numberOfPoints; i++){
					destStarX[i] = Math.random()*width;
					destStarY[i] = Math.random()*height;
				}
			}
			
			function moveStars(){
					var tempVar;					
					tempx = 200;
					tempy = 200;			
					for(var i =0; i < numberOfPoints; i++){
						if(starId[i] == 0){
							drawStar(tempx, tempy);
						}else if(starId[i] == 1){
							if(sparkStar[i] < 0){
								tempVar = parseInt( Math.random()*1000 , 10);
								if(tempVar <= 5 && tempVar >= 1){
									sparkStar[i] = 1;
								}
							}else{
								sparkStar[i] -= .08;
								drawSparklingStar(tempx, tempy, sparkStar[i]);						
							}
						}
						
						ctx.beginPath();
						ctx.moveTo(200, 200);
						var a, b, c, d;
						a = tempx;
						b = tempy;
						c = starX[i] - (starX[i] - destStarX[i])*timeOut/400;
						d = starY[i] - (starY[i] - destStarY[i])*timeOut/400;

						var grd=ctx.createLinearGradient(a,b,c,d);
						grd.addColorStop(0,"rgba(256, 256, 256, .02)");
						grd.addColorStop(1,"rgba(256, 256, 256, 0)");	
						
						ctx.strokeStyle = grd;
						ctx.moveTo(tempx, tempy);
						tempx = starX[i] - (starX[i] - destStarX[i])*timeOut/400;
						tempy = starY[i] - (starY[i] - destStarY[i])*timeOut/400;
						ctx.lineTo(tempx, tempy);
						ctx.closePath();
						ctx.lineWidth = 1;
						ctx.stroke();
					}

			}
			
			function setBackground(){
									
					ctx.clearRect(0, 0, width, height);
					
					moveStars();
					
					if(timeOut < 400){
						timeOut++;
					}else{
						timeOut = 1;
						refreshPosition();
					}
			}
			
			function refreshPosition(){
				for(var i = 0; i < numberOfPoints; i++){
					starX[i] = destStarX[i];
					starY[i] = destStarY[i];
				}
				
				for(var i = 0; i < numberOfPoints; i++){
					destStarX[i] = Math.random()*width;
					destStarY[i] = Math.random()*height;
				}
			}
			
			refresh();
			
			setInterval(setBackground, interval);

			$(window).resize(function(){
				refresh();
			})

		
	}
})(jQuery)
