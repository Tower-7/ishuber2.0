$(document).ready(function(){
	url1()
	switchNav()
	readeList()
	addEdit()
	footer()
	ttt()
})
function ttt() {
	$('.content .read ul li').each(function(){
		var ttt = $(this).children('a').children('div').children('h3').text()
		if(ttt == ''){
			$(this).css('display','none')
		}
	})
		
}

function url1() {
	var url = window.location.href;
	url = url.indexOf('#')
	if(url !=-1){
		url = window.location.href;
		url = url.substr(url.indexOf('#') + 1); 
		if(url=='essay'){
			$('.content>div').css('display','none')
			$('.content .essay').css('display','block')
			$('.nav .list li').css('border-bottom',' 2px solid transparent')
			$('.nav .list li:nth('+1+')').css('border-bottom',' 2px solid #000')
		}
		if(url=='about'){
			$('.content>div').css('display','none')
			$('.content .about').css('display','block')
			$('.nav .list li').css('border-bottom',' 2px solid transparent')
			$('.nav .list li:nth('+2+')').css('border-bottom',' 2px solid #000')
		}
		if(url=='read'){
			$('.content>div').css('display','none')
			$('.content .read').css('display','block')
			$('.nav .list li').css('border-bottom',' 2px solid transparent')
			$('.nav .list li:nth('+0+')').css('border-bottom',' 2px solid #000')
		}
	} 
	else {
		$('.content>div').css('display','none')
		$('.content .read').css('display','block')
		$('.nav .list li').css('border-bottom',' 2px solid transparent')
		$('.nav .list li:nth('+0+')').css('border-bottom',' 2px solid #000')
	}
}
function switchNav() {
	$('.nav .list li').on('click',function() {
		$('.nav .list li').css('border-bottom',' 2px solid transparent')
		$(this).css('border-bottom',' 2px solid #000')
		var n = $('.nav .list li').index(this)
		switch(n)
			{
			case 0:
			  $('.content>div').css('display','none')
			  $('.content .read').css('display','block')
			  $("html,body").animate({scrollTop:0})
			  break;
			case 1:
			  $('.content>div').css('display','none')
			  $('.content .essay').css('display','block')
			  $("html,body").animate({scrollTop:0})
			  break;
			  case 2:
			  $('.content>div').css('display','none')
			  $('.content .about').css('display','block')
			  $("html,body").animate({scrollTop:0})
			  break;
			}
	})
}

function readeList() {
	$('.content .read li').each(function() {
		var content = $(this).children('a').children('.p').text()
		content = content.substring(0, 50);
		$(this).children('a').children('.p').text(content + '...')
	})
}
function addEdit() {
	$('.addEssay .create ').on('click',function() {
		 $('.editCover').css('display','block')
	})
	$('.close').on('click',function() {
		 $('.editCover').css('display','none')
	})
}
function footer() {
	$('.content .addEssay .footer').on('click',function(){
		var footerState = $('.content .addEssay').width()
		if(footerState==40){
			$('.content .addEssay').css({
				'width':'150px',
				'background-color':'rgba(100, 211, 196, 0.45)'
			})
			$('.content .addEssay .footer').attr('src','/move/img/close_1.png')
		}
		else {
			$('.content .addEssay').css({
				'width':'40px',
				'background-color':'transparent'
			})
			$('.content .addEssay .footer').attr('src','/move/img/footer.png')
		}
	})
}