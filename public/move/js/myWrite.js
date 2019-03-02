$(document).ready(function() {
	del()
})
function del() {
	$('.del').on('click',function() {
		var id = $(this).attr('data-id')
		var list =  $(this).parents('li')
		$.ajax({
			url: '/m/essay/del',
			type: 'post',
			data: {
				id:id,
			},
			success: function() {
				alert('删除成功！')
				list.remove()
			}
		})
	})
}