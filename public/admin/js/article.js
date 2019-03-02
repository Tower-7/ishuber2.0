function article() {
	//弹出设置操作框
	$('.read').on('click','.trSetting i',function() {
		$('.read .trSetting .setMenu').css('display','none')
		$(this).parents('.trSetting').children('.setMenu').css('display','block')
	})
	//删除一条
	$('.read').on('click','.trSetting .setMenu .remove',function() {
		var id = $(this).parents('.trSetting').attr('date-id')
		var tr = $(this).parents('tr')
		$.ajax({
			url: '/admin/articleRead/delete',
			type: 'post',
			data: {
				id: id,
			},
			success: function() {
				alert('删除成功！')
				tr.remove()
			},
			 error: function(){
				alert('删除失败！')
		      
		    }
		})
	})
	//选中删除
		
	$('.thCell input').on('click',function() {
		var thCellCheck = $(this).is(':checked')
		if(thCellCheck) {
			$('.trCell input').attr('checked','checked')
		}
		else {
			$('.trCell input').removeAttr('checked')
		}
	})
	$('.removeCheck').on('click',function() {

		$('tbody tr').each(function() {
			var check = $(this).children('.trCell').children('input').is(':checked')
			var id = $(this).children('.trSetting').attr('date-id')
			var tr = $(this)
			if(check) {
					$.ajax({
						url: '/admin/articleRead/delete',
						type: 'post',
						data: {
							id: id,
						},
						success: function() {
							tr.remove()
						},
						 error: function(){
							alert('删除失败！')
					      
					    }
					})
			}
		})
	})
}