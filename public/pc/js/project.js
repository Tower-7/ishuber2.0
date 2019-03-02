$(document).ready(function(){
	title()
	banner()
	content()
})
function banner() {
	$('.title .list1').click(function() {
		$('.bannerImg .list ').css('z-index','0')
		$('.title .list2').children('.line').css({
			'width': '0',
			'border-bottom': ' 2px solid #ccc',
		})
		$('.title .list3').children('.line').css({
			'width': '0',
			'border-bottom': ' 2px solid #ccc',
		})
		$('.content .list').css('opacity','0')
		$('.content .list>span').css('opacity','0')
		$('.content .list strong span').css('opacity','0')
		$('.content .list strong span').css('top','-60px')

		$('.bannerImg .list1 ').css({
			'z-index': '10',
			'background-image': 'url(pc/img/project/banner/1.jpg)',
		})
		$('.bannerImg .list1 .cover').css('width','0')
		$('.bannerImg .list2 .cover').css('width','100%')
		$('.bannerImg .list3 .cover').css('width','100%')
		$(this).children('.line').css({
			'width': '100%',
			'border-bottom': ' 2px solid #000',
		})
		$('.content .list1>span').css('opacity','1')
		$('.content .list1').css('opacity','1')
		$('.content .list1 strong span').css('opacity','1')
		$('.content .list1 strong span').css('top','0')
	})
	$('.title .list2').click(function() {
		$('.bannerImg .list ').css('z-index','0')
		$('.title .list1').children('.line').css({
			'width': '0',
			'border-bottom': ' 2px solid #ccc',
		})
		$('.title .list3').children('.line').css({
			'width': '0',
			'border-bottom': ' 2px solid #ccc',
		})
		$('.content .list>span').css('opacity','0')
		$('.content .list').css('opacity','0')
		$('.content .list strong span').css('opacity','0')
		$('.content .list strong span').css('top','-60px')


		$('.bannerImg .list2 ').css({
			'z-index': '10',
			'background-image': 'url(pc/img/project/banner/2.jpg)',
		})
		$('.bannerImg .list2 .cover').css('width','0')
		$('.bannerImg .list1 .cover').css('width','100%')
		$('.bannerImg .list3 .cover').css('width','100%')
		$(this).children('.line').css({
			'width': '100%',
			'border-bottom': ' 2px solid #000',
		})

		$('.content .list2>span').css('opacity','1')
		$('.content .list2').css('opacity','1')
		$('.content .list2 strong span').css('opacity','1')
		$('.content .list2 strong span').css('top','0')
	})


	$('.title .list3').click(function() {
		$('.bannerImg .list3 .cover').css('width','100%')
		$('.bannerImg .list ').css('z-index','0')
		$('.title .list1').children('.line').css({
			'width': '0',
			'border-bottom': ' 2px solid #ccc',
		})
		$('.title .list2').children('.line').css({
			'width': '0',
			'border-bottom': ' 2px solid #ccc',
		})
		$('.content .list>span').css('opacity','0')
		$('.content .list').css('opacity','0')
		$('.content .list strong span').css('opacity','0')
		$('.content .list strong span').css('top','-60px')

		$('.bannerImg .list3 ').css({
			'z-index': '10',
			'background-image': 'url(pc/img/project/banner/3.jpg)',
		})
		$('.bannerImg .list3 .cover').css('width','0')
		$('.bannerImg .list2 .cover').css('width','100%')
		$('.bannerImg .list1 .cover').css('width','100%')
		$(this).children('.line').css({
			'width': '100%',
			'border-bottom': ' 2px solid #000',
		})
		$('.content .list3>span').css('opacity','1')
		$('.content .list3').css('opacity','1')
		$('.content .list3 strong span').css('opacity','1')
		$('.content .list3 strong span').css('top','0')
	})
	height = $('.bannerImg .list ').css('height')
	$('.banner').css('height',height)
}

function title() {
	$('.title .list').mouseover(function(){
		$(this).children('.line').css('width','100%')
	})
	$('.title .list').mouseout(function(){
		var lineColor = $(this).children('.line').css('border-bottom-color')
		if(lineColor == 'rgb(0, 0, 0)'){
			$(this).children('.line').css('width','100%')
		}
		else{
			$(this).children('.line').css('width','0')
		}
	})
}

function content() {
	
}