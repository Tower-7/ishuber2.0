$(document).ready(function() {
	content()
	updateCoverPic() 
    submit()
})
function content() {
	$('.content .tips').on('click',function() {
		$('.content p').focus()
	})
	$('.content p').keyup(function() {
		var content = $(this).text()
		if(content != '') {
			$('.content .tips').css('display','none')
		}
		else {
			$('.content .tips').css('display','block')
		}
	})
}
function submit() {
	$('.submit').on('click',function() {
        var author = $(this).attr('data_name')
		var coverPic = $('#coverImg').attr('src')
		var content = $('.content p').html()
		$.ajax({
			url: '/m/submitEssay',
			type: 'post',
			data:{
                author: author,
				coverPic: coverPic,
				content: content,
			},
			success: function() {
                alert('发布成功！')
                window.location.href = '/m/#essay'
			}
		})
	})
}

function updateCoverPic() {
    $('#selectPic').change(function() {
        //显示被上传图片
        var $file = $(this);  
        var fileObj = $file[0];  
  
        var windowURL = window.URL || window.webkitURL;  
        var dataURL;  
        var $img = $("#coverImg");  

        if (fileObj && fileObj.files && fileObj.files[0]) {  
            dataURL = windowURL.createObjectURL(fileObj.files[0]);  
            $img.attr('src', dataURL); 
            $('.file_box').css('background','transparent')
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
  console.log(file.files[0])
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
            $('#coverImg').attr('src',data.imgPath);
          } else {
            $('#readCreateResult').html("上传失败！");
            $('.readCreateFile_box span').css('display','block')
          }
    },
    error: function(){
      
    }
  });
}

