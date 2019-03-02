$(document).ready(function() {
    updateArticle()
	edit()
	updateCoverPic() 
	remove()
    submit()
    back()
})
function back() {
	$('.nav .back').on('click',function() {
		var id = $('.submit').attr('data_id')
		var title = $('.submit').attr('data_title')
		var content = $('.editContent').find('div')
		if(title == '' && content.length==0){
			$.ajax({
				url: '/m/article/del',
				type: 'post',
				data: {
					id:id,
				}
			})
		}
		else {
			contents()
			window.location.href = '/m/addArticle/' + id
		}
		window.history.go(-1);
	})
	// mui.back = function() {			
	// 	var btn = ["确定", "取消"];			
	// 	mui.confirm('确认退出应用？', '提醒', btn, function(e) {				
	// 		if(e.index == 0) {					
	// 			plus.runtime.quit();				
	// 		}			
	// 	});		
	// }

}
function submit() {
	$('.submit').on('click',function() {
        contents()
	})
}
function edit() {
	function displayAddBox() {
		if($(".editContent>div").length){
			$('.editBox .insertContent').css('display','block')
			$('.addContent').css('display','none')
		}
		else {
			$('.editBox .insertContent').css('display','none')
			$('.addContent').css('display','block')
		}
	}
	$('.edit').on('click','.contentElement .text',function() {
		$('.contentElement').css('display','none')
		var textBox = '<div class="textBox">\
				<div class="textContent" contenteditable="true"></div>\
				<div class="set">\
					<ul>\
						<li class="remove">删除</li>\
						<li class="move">上移</li>\
						<li class="insert">插入</li>\
					</ul>\
				</div>\
			</div>'
		if($(".editContent>div").length){
			$('.editContent>div:last-child').after(textBox)
		}
		else {
			$('.editContent').append(textBox)
			displayAddBox()
		}
			
	})
	$('.edit').on('click','.contentElement .pic',function() {
		$('.contentElement').css('display','none')
		var picBox = '<div class="picBox">\
					<div class="picContent"><img src="" alt=""></div>\
					<div class="set">\
						<ul>\
							<li class="remove">删除</li>\
							<li class="move">上移</li>\
							<li class="insert">插入</li>\
						</ul>\
					</div>\
				</div>'
		if($(".editContent>div").length){
			$('.editContent>div:last-child').after(picBox)
		}
		else {
			$('.editContent').append(picBox);
			displayAddBox()
		}
		$('.editContent>div').removeClass('activePic')
		$('.editContent>div:last-child').addClass('activePic')
	})

	//
	$('.edit').on('click','.editContent .set .insert,.addContent,.editBox .insertContent',function() {
		$('.contentElement').css('display','block')
	})
}
function remove() {
	$('.edit').on('click','.editBox .picBox .remove',function() {
		var path = $(this).parents('.set').prevAll('.picContent').children('img').attr('src')
		var picBox = $(this).parents('.picBox')
		$.ajax({
			url: '/m/removeContentPic',
			type: 'post',
			data: {
				path: path,
			},
			success:function(){
				picBox.remove()
			}
		})
	})
	$('.edit').on('click','.editBox .textBox .remove',function() {
		var textBox = $(this).parents('.textBox')
		textBox.remove()
	})
}
function updateCoverPic() {
    $('#selectPic').change(function() {
        //显示被上传图片
        var $file = $(this);  
        var fileObj = $file[0];  
  
        var windowURL = window.URL || window.webkitURL;  
        var dataURL;  
        var $img = $(".activePic .picContent img");  

        if (fileObj && fileObj.files && fileObj.files[0]) {  
            dataURL = windowURL.createObjectURL(fileObj.files[0]);  
            $img.attr('src', dataURL); 
        } else {  
            dataURL = $file.val();  
            var imgObj = document.getElementById("preview");  
            imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";  
            imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;  
  
        }
    })
    var uploada = document.getElementById('selectPic');
    uploada.addEventListener("change",function () {
        coverPicUploadFile();
    },false);
   
}

//上传
function coverPicUploadFile(){
  var file = document.getElementById("selectPic")
  var formData = new FormData();
  formData.append('file',file.files[0]);
  $.ajax({
    url: '/upload',
    type: 'POST',
    data: formData,
    // async: false,
    cache: false,
    contentType: false,
    processData: false,
    success: function(data){
         if(200 === data.code) {
            $('.activePic .picContent img').attr('src',data.imgPath);
          } else {
            $('#readCreateResult').html("上传失败！");
            $('.readCreateFile_box span').css('display','block')
          }
    },
    error: function(){
      
    }
  });
}
function updateArticle() {
	var edit = $('.editContent').html()
	if(edit) {
		$('.editContent>div').each(function() {
			var img = $(this).children('img').attr('src')
			if(img){
				var picBox = '<div class="picBox"><div class="picContent"><img src="'+img+'" alt=""></div><div class="set"><ul><li class="remove">删除</li><li class="move">上移</li><li class="insert">插入</li></ul></div></div>'
				if($(".editContent>div").length){
					$('.editContent>div:last-child').after(picBox)
				}
				else {
					$('.editContent').append(picBox);
				}
			}
			else {
				var text = $(this).html()
				var textBox = '<div class="textBox"><div class="textContent" contenteditable="true">'+text+'</div><div class="set"><ul><li class="remove">删除</li><li class="move">上移</li><li class="insert">插入</li></ul></div></div>'
				if($(".editContent>div").length){
					$('.editContent>div:last-child').after(textBox)
				}
				else {
					$('.editContent').append(textBox)
				}
			}
			$(this).remove()
		})
		displayAddBox()
	}
}

function displayAddBox() {
	if($(".editContent>div").length){
		$('.editBox .insertContent').css('display','block')
		$('.addContent').css('display','none')
	}
	else {
		$('.editBox .insertContent').css('display','none')
		$('.addContent').css('display','block')
	}
}

function contents() {
	var id = $('.submit').attr('data_id')
    var author = $('.submit').attr('data_author')
    var title = $('.submit').attr('data_title')
    var coverPic = $('.submit').attr('data_coverPic')
    var type = $('.submit').attr('data_type')
	var content = ''
	$(".editContent>div").each(function() {
		var text = $(this).children('.textContent').html()
		var pic = $(this).children('.picContent').html()
		if(text){
			text = '<div>'+text+'</div>'
			content += text
		}
		else {
			pic = '<div>'+pic+'</div>'
			content += pic
		}
	})
	$.ajax({
		url: '/m/saveArticle',
		type: 'post',
		data:{
			id: id,
            title: title,
            author: author,
            coverPic: coverPic,
            content: content,
            type: type
		},
		success: function(data) {
            window.location.href = '/m/addArticle/' + data.id
		}
	})
}
