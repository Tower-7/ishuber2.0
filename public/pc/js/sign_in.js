$(document).ready(function() {
	sign_in()
})
var sign_in = function() {
	$('.submit').on('click',function() {
		var name = $('.name').val()
		var password = $('.password').val()
		$.ajax({
			url: '/sign_in',
			type: 'post',
			data: {
				name: name,
				password,
			},
			success: function(data) {
				alert(data.msg)
				if(data.status==1){
					window.location.href='/';
				}
				if(data.status==2){
					window.location.href='/sign_up';
				}
			}
		})
	})
}