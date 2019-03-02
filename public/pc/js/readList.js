$(document).ready(function(){
	readeList()
})
function readeList() {
	$('.wrap li').each(function() {
		var content = $(this).children('a').children('.contentBox').children('.content').text()
		content = content.substring(0, 80);
		$(this).children('a').children('.contentBox').children('.content').text(content + '...')
	})
}