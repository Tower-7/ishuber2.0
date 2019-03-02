$(document).ready(function() {
	set()
	submit()
	clock()
	del()
})
function set() {
	$('.set').on('click',function() {
		$(this).nextAll('.setBox').css('display','block')
		$('.cover ').css('display','block')
	})
	$('.cover').on('click',function() {
		$('.setBox').css('display','none')
		$(this).css('display','none')
	})
}
function submit() {
	$('.setBox .submit').on('click',function() {
		var id = $(this).parents('.setBox').attr('data-id')
		var author = $(this).parents('.setBox').attr('data-author')
		var title = $(this).parents('.setBox').attr('data-title')
		var coverPic = $(this).parents('.setBox').attr('data-coverPic')
		var content = $(this).parents('.setBox').attr('data-content')
		var type = $(this).parents('.setBox').attr('data-type')
		$.ajax({
			url: '/m/saveArticle',
			type: 'post',
			data:{
				id: id,
				author: author,
			    title: title,
			    coverPic: coverPic,
			    type: type,
			    content: content,
                public: true,
			},
			success: function() {
                alert('发布成功！')
                window.location.href = '/m/#read'
			}
		})
	})
}
function clock() {
	$('.setBox .clock').on('click',function() {
		var id = $(this).parents('.setBox').attr('data-id')
		var author = $(this).parents('.setBox').attr('data-author')
		var title = $(this).parents('.setBox').attr('data-title')
		var coverPic = $(this).parents('.setBox').attr('data-coverPic')
		var content = $(this).parents('.setBox').attr('data-content')
		var type = $(this).parents('.setBox').attr('data-type')
		$.ajax({
			url: '/m/saveArticle',
			type: 'post',
			data:{
				id: id,
				author: author,
			    title: title,
			    coverPic: coverPic,
			    type: type,
			    content: content,
                public: false,
			},
			success: function() {
                alert('发布成功！')
                window.location.href = '/m/#read'
			}
		})
	})
}

function del() {
	$('.setBox .delete').on('click',function() {
		var id = $(this).parents('.setBox').attr('data-id')
		var list =  $(this).parents('.articleList')
		$.ajax({
			url: '/m/article/del',
			type: 'post',
			data: {
				id:id,
			},
			success: function() {
				alert('删除成功！')
				list.remove()
				$('.cover').css('display','none')
			}
		})
	})
}