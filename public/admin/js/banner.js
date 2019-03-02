function banner() {
	//删除一条banner
	delectBanner()
	
	//banner详情框操作
	bannerUpdateBox()
	
	//上传图片
	updateBannerPic()
	
	//添加一条
	createBanner()

	//更新banner
	updateBanner()
}
function bannerUpdateBox() {
	//弹出设置操作框
	$('.banner').on('click','.trSetting i',function() {
		$('.banner .trSetting .setMenu').css('display','none')
		$(this).parents('.trSetting').children('.setMenu').css('display','block')
	})

	//弹出banner详情框
	$('.banner').on('click','.trSetting .setMenu .edit',function() {
		$('.banner .trSetting .setMenu').css('display','none')
		$('.banner .updateBox').css('display','block')
	})
	//关闭banner详情框
	$('.banner').on('click','.updateBox .cancel',function() {
		$('.banner .updateBox').css('display','none')
	})
}

//上传
function bannerUploadFile(){
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
    	$('.bannerform-group').css('display','none')
      if(200 === data.code) {
        $('#bannerupload').css('display','none');
        $('.main .banner .bannerPic .upload_form .file_box span').text('上传成功！').css('display','block');
        $('.bannerPic img').attr('src',data.imgPath);
      } else {
        $('#bannerresult').html("上传失败！");
      }
      console.log('imgUploader upload success');
    },
    error: function(){
      $("#bannerresult").html("与服务器通信发生错误");
    }
  });
}
//显示上传图片
function updateBannerPic() {
	$('.main .banner .upload_form .selectPic').change(function() {
		//显示被上传图片
		var $file = $(this);  
        var fileObj = $file[0];  
  
        var windowURL = window.URL || window.webkitURL;  
        var dataURL;  
        var $img = $(".main .banner .upload_form img");  
  
        if (fileObj && fileObj.files && fileObj.files[0]) {  
            dataURL = windowURL.createObjectURL(fileObj.files[0]);  
            $img.attr('src', dataURL);  
        } else {  
            dataURL = $file.val();  
            var imgObj = document.getElementById("preview");  
            imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";  
            imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;  
  
        }
        $('.main .banner .bannerPic .upload_form .file_box span').css('display','none')		
		$('#bannerupload').css('display','block')
	})
	//上传图片
    var uploada = document.getElementById('bannerupload');
    uploada.addEventListener("click",function () {
        bannerUploadFile();
    },false);
}

//删除一条banner
function delectBanner() {
	$('.main .banner').on('click','.trSetting .remove',function() {
		var id = $(this).parents('.trSetting').attr('date-id')
		var tr = $(this).parents('tr')
		$.ajax({
			url: '/admin/banner/delete',
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

//更新banner
function updateBanner() {
	var edit = $('.main .banner .trSetting .edit')
	edit.click(function() {
		$('.main .banner .bannerPic .upload_form .file_box span').text('选择文件1')
		var submit = $('.banner .updateBox .submit')
		submit.attr('date-id','true')
		var date_id = submit.attr('date-id')
		var id = $(this).parents('.trSetting').attr('date-id')
		var tr = $(this).parents('tr')
		submitBanner(id,tr,date_id)
	})
		
}

//创建banner
function createBanner() {
	$('.main .banner .createBanner td').click(function() {
		$('.banner .updateBox').css('display','block')
		$('.main .banner .bannerPic .upload_form .file_box span').text('选择文件2')
		var id = ''
		var tr
		var submit = $('.banner .updateBox .submit')
		submit.attr('date-id','false')
		var date_id = submit.attr('date-id')
		submitBanner(id,tr,date_id)
	})
}
//banner发布
function submitBanner(id,tr,date_id) {
	var submit = $('.banner .updateBox .submit')
	submit.click(function() {
		var title = $('.banner .updateBox .bannerTile input').val()
		var type = $('.banner .updateBox .bannerType input').val()
		var link = $('.banner .updateBox .bannerLink input').val()
		var imgUrl = $('.banner .updateBox .bannerPic img').attr('src')
	  if(date_id == 'true') {
		$.ajax({
			url: '/admin/banner/update',
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
				$('.banner .updateBox').css('display','none')
				alert('更新成功！');
			}
		})
	  }
	  else {
	  	$.ajax({
			url: '/admin/banner/create',
			type:'post',
			data: {
				title: title,
				type: type,
				link: link,
				imgUrl: imgUrl,
			},
			success: function(){
				$('.banner .updateBox').css('display','none')
				console.log(id)
				insertBanner(id,title,type,link,imgUrl) 
				alert('发布成功！');
			}
		})
	  }
	})
}

//插入一条banner
function insertBanner(id,title,type,link,imgUrl) {
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
	$('.banner .createBanner').before(insertHTML)
}