$(document).ready(function(){
	nav()
})
function nav() {
	$('.nav .pic').on('click',function() {
		$(this).css('display','none')
		$('.nav .content').css('display','block').addClass('navmove').removeClass('navmoves')
	})
	$('.nav .close').on('click',function() {
		$('.nav .pic').css('display','block')
		$('.nav .content').addClass('navmoves').removeClass('navmove')
	})
}