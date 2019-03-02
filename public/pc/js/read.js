$(document).ready(function(){
	banner()
})

function banner() {
	windowHeight = $(window).height()
	$('.banner .bg').css('height',windowHeight)
}