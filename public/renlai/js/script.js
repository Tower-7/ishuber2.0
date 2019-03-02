$(document).ready(function(){
	footer()
})
function footer() {
	$('footer li').on('click',function() {
        $('footer li').each(function(){
            color = $(this).find('.text').css('color')
            if(color === 'rgb(229, 180, 58)'){
                let img = $(this).find('img').attr('src')
                img = img.replace(/_2/,'')
                $(this).find('img').attr('src',img)
            }
        });
        let img = $(this).find('img').attr('src')
        img = img.replace(/\./,'_2\.')
        $(this).find('img').attr('src',img)
        $('footer li .text').css('color','#555')
        $(this).find('.text').css('color','#e5b43a')
	})
}