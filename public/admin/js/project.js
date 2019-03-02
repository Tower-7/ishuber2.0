function project() {
	//删除一条project
	delectProject()
	
	//project详情框操作
	projectUpdateBox()
	
	//上传图片
	updateProjectPic()
	
	//添加一条
	createProject()

	//更新project
	updateProject()
}
function projectUpdateBox() {
	//弹出设置操作框
	$('.project').on('click','.trSetting i',function() {
		$('.project .trSetting .setMenu').css('display','none')
		$(this).parents('.trSetting').children('.setMenu').css('display','block')
	})

	//弹出project详情框
	$('.project').on('click','.trSetting .setMenu .edit',function() {
		$('.project .trSetting .setMenu').css('display','none')
		$('.project .updateBox').css('display','block')
	})
	//关闭project详情框
	$('.project').on('click','.updateBox .cancel',function() {
		$('.project .updateBox').css('display','none')
	})
}

//上传
function projectUploadFile(){
  var file = document.getElementById("projectSelectPic")
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
    	$('.projectform-group').css('display','none')
      if(200 === data.code) {
        $('#projectUpload').css('display','none');
        $('.project .projectPic .projectUpload_form .projectFile_box span').text('上传成功！').css('display','block');
        $('.projectPic img').attr('src',data.imgPath);
      } else {
        $('#projectResult').html("上传失败！");
      }
      console.log('imgUploader upload success');
    },
    error: function(){
      $("#projectResult").html("与服务器通信发生错误");
    }
  });
}
//显示上传图片
function updateProjectPic() {
	$('.project .projectUpload_form .projectSelectPic').change(function() {
		//显示被上传图片
		var $file = $(this);  
        var fileObj = $file[0];  
  
        var windowURL = window.URL || window.webkitURL;  
        var dataURL;  
        var $img = $(".main .project .projectUpload_form img");  
  
        if (fileObj && fileObj.files && fileObj.files[0]) {  
            dataURL = windowURL.createObjectURL(fileObj.files[0]);  
            $img.attr('src', dataURL);  
        } else {  
            dataURL = $file.val();  
            var imgObj = document.getElementById("preview");  
            imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";  
            imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;  
  
        }
        $('.project .projectPic .projectUpload_form .projectFile_box span').css('display','none')		
		$('#projectUpload').css('display','block')
	})
	//上传图片
    var uploada = document.getElementById('projectUpload');
    uploada.addEventListener("click",function () {
        projectUploadFile();
    },false);
}

//删除一条project
function delectProject() {
	$('.project').on('click','.trSetting .remove',function() {
		var id = $(this).parents('.trSetting').attr('date-id')
		var tr = $(this).parents('tr')
		$.ajax({
			url: '/admin/project/delete',
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

//更新project
function updateProject() {
	var edit = $('.main .project .trSetting .edit')
	edit.click(function() {
		$('.main .project .projectPic .projectUpload_form .projectFile_box span').text('选择文件1')
		var submit = $('.updateBox .submit')
		submit.attr('date-id','true')
		var date_id = submit.attr('date-id')
		var id = $(this).parents('.trSetting').attr('date-id')
		var tr = $(this).parents('tr')
		submitProject(id,tr,date_id)
	})
		
}

//创建project
function createProject() {
	$('.project .createProject td').click(function() {
		$('.project .updateBox').css('display','block')
		$('.project .projectPic .projectUpload_form .projectFile_box span').text('选择文件2')
		var id = ''
		var tr
		var submit = $('.project .updateBox .submit')
		submit.attr('date-id','false')
		var date_id = submit.attr('date-id')
		submitProject(id,tr,date_id)
	})
}
//project发布
function submitProject(id,tr,date_id) {
	var submit = $('.project .updateBox .submit')
	submit.click(function() {
		var title = $('.project .updateBox .projectTile input').val()
		var type = $('.project .updateBox .projectType input').val()
		var link = $('.project .updateBox .projectLink input').val()
		var imgUrl = $('.project .updateBox .projectPic img').attr('src')
	  if(date_id == 'true') {
		$.ajax({
			url: '/admin/project/update',
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
				$('.project .updateBox').css('display','none')
				alert('更新成功！');
			}
		})
	  }
	  else {
	  	$.ajax({
			url: '/admin/project/create',
			type:'post',
			data: {
				title: title,
				type: type,
				link: link,
				imgUrl: imgUrl,
			},
			success: function(){
				$('.project .updateBox').css('display','none')
				console.log(id)
				insertProject(id,title,type,link,imgUrl) 
				alert('发布成功！');
			}
		})
	  }
	})
}

//插入一条project
function insertProject(id,title,type,link,imgUrl) {
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
	$('.project .createProject').before(insertHTML)
}