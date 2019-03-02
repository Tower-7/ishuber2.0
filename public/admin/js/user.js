function user() {
	//弹出设置操作框
	$('.user').on('click','.trSetting i',function() {
		$('.user .trSetting .setMenu').css('display','none')
		$(this).parents('.trSetting').children('.setMenu').css('display','block')
	})
	//删除一条
	$('.user').on('click','.trSetting .setMenu .remove',function() {
		var id = $(this).parents('.trSetting').attr('date-id')
		var tr = $(this).parents('tr')
		$.ajax({
			url: '/admin/user/delete',
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
		
	$('.user .thCell input').on('click',function() {
		var thCellCheck = $(this).is(':checked')
		if(thCellCheck) {
			$('.user .trCell input').attr('checked','checked')
		}
		else {
			$('.user .trCell input').removeAttr('checked')
		}
	})
	$('.removeCheck').on('click',function() {

		$('.user tbody tr').each(function() {
			var check = $(this).children('.trCell').children('input').is(':checked')
			var id = $(this).children('.trSetting').attr('date-id')
			var tr = $(this)
			if(check) {
					$.ajax({
						url: '/admin/user/delete',
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