$(document).ready(function(){
	canvas()
})
var canvas = function(){
	var c = $('.canvas')
	var ctx=c.get(0).getContext("2d");
	$('.footer .top').mouseout(function(){
		ctx.strokeStyle = '#555';
		ctx.lineWidth = 10
		ctx.beginPath();
		ctx.moveTo(30,100)
		ctx.lineTo(75,50)
		ctx.lineTo(120,100)
		ctx.stroke();
	})
	$('.footer .top').mouseover(function(){
		ctx.strokeStyle = '#fff';
		ctx.lineWidth = 10
		ctx.beginPath();
		ctx.moveTo(30,100)
		ctx.lineTo(75,50)
		ctx.lineTo(120,100)
		ctx.stroke();
	})
	ctx.strokeStyle = '#555';
	ctx.lineWidth = 10
	ctx.beginPath();
	ctx.moveTo(30,100)
	ctx.lineTo(75,50)
	ctx.lineTo(120,100)
	ctx.stroke();
	$('.footer .top').click(function(){
		 $('body,html').animate({ scrollTop:10 },1000);
		 return false;
	})
}