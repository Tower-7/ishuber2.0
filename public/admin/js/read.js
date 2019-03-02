function read() {
	//删除一条read
	delectRead()
	
	//read详情框操作
	readUpdateBox()
	
	//上传图片
	updateReadPic()
	
	//添加一条
	createRead()

	//更新read
	updateRead()
}
function readUpdateBox() {
	//弹出设置操作框
	$('.read').on('click','.trSetting i',function() {
		$('.read .trSetting .setMenu').css('display','none')
		$(this).parents('.trSetting').children('.setMenu').css('display','block')
	})

	//弹出read详情框
	$('.read').on('click','.trSetting .setMenu .edit',function() {
		$('.read .trSetting .setMenu').css('display','none')
		$('.read .updateBox').css('display','block')
	})
	//关闭read详情框
	$('.read').on('click','.updateBox .cancel',function() {
		$('.read .updateBox').css('display','none')
	})
}

//上传
function readUploadFile(){
  var file = document.getElementById("readSelectPic")
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
    	$('.readform-group').css('display','none')
      if(200 === data.code) {
        $('#readUpload').css('display','none');
        $('.read .readPic .readUpload_form .readFile_box span').text('上传成功！').css('display','block');
        $('.readPic img').attr('src',data.imgPath);
      } else {
        $('#readResult').html("上传失败！");
      }
      console.log('imgUploader upload success');
    },
    error: function(){
      $("#readResult").html("与服务器通信发生错误");
    }
  });
}
//显示上传图片
function updateReadPic() {
	$('.read .readUpload_form .readSelectPic').change(function() {
		//显示被上传图片
		var $file = $(this);  
        var fileObj = $file[0];  
  
        var windowURL = window.URL || window.webkitURL;  
        var dataURL;  
        var $img = $(".main .read .readUpload_form img");  
  
        if (fileObj && fileObj.files && fileObj.files[0]) {  
            dataURL = windowURL.createObjectURL(fileObj.files[0]);  
            $img.attr('src', dataURL);  
        } else {  
            dataURL = $file.val();  
            var imgObj = document.getElementById("preview");  
            imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";  
            imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;  
  
        }
        $('.read .readPic .readUpload_form .readFile_box span').css('display','none')		
		$('#readUpload').css('display','block')
	})
	//上传图片
    var uploada = document.getElementById('readUpload');
    uploada.addEventListener("click",function () {
        readUploadFile();
    },false);
}

//删除一条read
function delectRead() {
	$('.read').on('click','.trSetting .remove',function() {
		var id = $(this).parents('.trSetting').attr('date-id')
		var tr = $(this).parents('tr')
		$.ajax({
			url: '/admin/read/delete',
			type: 'post',
			data: {
				id: id,
			},
			success: function() {
				alert('删除成功！')
				tr.remove()
			}
		})
	})
}

//更新read
function updateRead() {
	var edit = $('.main .read .trSetting .edit')
	edit.click(function() {
		$('.main .read .readPic .readUpload_form .readFile_box span').text('选择文件1')
		var submit = $('.updateBox .submit')
		submit.attr('date-id','true')
		var date_id = submit.attr('date-id')
		var id = $(this).parents('.trSetting').attr('date-id')
		var tr = $(this).parents('tr')
		submitRead(id,tr,date_id)
	})
		
}

//创建read
function createRead() {
	$('.read .createRead td').click(function() {
		$('.read .updateBox').css('display','block')
		$('.read .readPic .readUpload_form .readFile_box span').text('选择文件2')
		var id = ''
		var tr
		var submit = $('.read .updateBox .submit')
		submit.attr('date-id','false')
		var date_id = submit.attr('date-id')
		submitRead(id,tr,date_id)
	})
}
//read发布
function submitRead(id,tr,date_id) {
	var submit = $('.read .updateBox .submit')
	submit.click(function() {
		var title = $('.read .updateBox .readTile input').val()
		var type = $('.read .updateBox .readType input').val()
		var link = $('.read .updateBox .readLink input').val()
		var imgUrl = $('.read .updateBox .readPic img').attr('src')
	  if(date_id == 'true') {
		$.ajax({
			url: '/admin/read/update',
			type:'post',
			data: {
				id: id,
				title: title,
				type: type,
				link: link,
				imgUrl: imgUrl,
			},
			success: function(){
				tr.children('.trPic').children('img').attr('src',imgUrl)
				$('.read .updateBox').css('display','none')
				alert('更新成功！');
			}
		})
	  }
	  else {
	  	$.ajax({
			url: '/admin/read/create',
			type:'post',
			data: {
				title: title,
				type: type,
				link: link,
				imgUrl: imgUrl,
			},
			success: function(){
				$('.read .updateBox').css('display','none')
				console.log(id)
				insertRead(id,title,type,link,imgUrl) 
				alert('发布成功！');
			}
		})
	  }
	})
}

//插入一条read
function insertRead(id,title,type,link,imgUrl) {
	var insertHTML = '<tr>\
							<th class="trCell"><input type="checkbox"></th>\
							<td class="trTitle">'+title+'</td>\
							<td class="trPic"><img src="'+imgUrl+'" alt=""></td>\
							<td class="trSort"><input type="text" value="12"></td>\
							<td class="trCreateTime"></td>\
							<td class="trState">启用</td>\
							<td class="trSetting" '+'date-id="'+id+'">\
								<span>设置</span><i></i>\
								<div class="setMenu">\
									<u></u>\
									<ul>\
										<li class="edit">编辑</li>\
										<li class="remove">删除</li>\
									</ul>\
								</div>\
							</td>\
						</tr>'
	$('.read .createRead').before(insertHTML)
}