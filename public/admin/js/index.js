function switchs() {
	var banner = $('.navBanner')
	var project = $('.navProject')
	var read = $('.navRead')
	var news = $('.navNews')
	banner.on('click',function() {
		$('.banner').css('display','block')
		$('.project').css('display','none')
		$('.read').css('display','none')
		$('.news').css('display','none')
	})
	project.on('click',function() {
		$('.project').css('display','block')
		$('.banner').css('display','none')
		$('.read').css('display','none')
		$('.news').css('display','none')
	})
	read.on('click',function() {
		$('.read').css('display','block')
		$('.banner').css('display','none')
		$('.project').css('display','none')
		$('.news').css('display','none')
	})
	news.on('click',function() {
		$('.news').css('display','block')
		$('.banner').css('display','none')
		$('.project').css('display','none')
		$('.read').css('display','none')
	})
}