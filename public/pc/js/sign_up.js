$(document).ready(function() {
	sign_up()
})
var sign_up = function() {
	var name
	var password
	$('.sign input').change(function() {
		name = $('.name').val()
		password = $('.password').val()
	})
	$(".name").keyup(function(){
		name = $(this).val()
		$.ajax({
			url: '/sign_up/check',
			type: 'post',
			data: {
				name: name,
			},
			success: function(data){
				console.log(data.msg)
			}
		})
	});
	$('.submit').on('click',function() {
			$.ajax({
				url: '/sign_up',
				type: 'post',
				data: {
					name: name,
					password: password,
				},
				success: function(data) {
					alert(data.msg)
				}
			})
		})
}