var projectId = 0;//项目Id
var projectName;//项目名
var appResult = null;//word报告
var appNameChinese = '标准操作程序';//app中文名（必填）
var USER_NAME = '';//当前登录用户名
var tableData = ""; //$('#example1').html()
var content1 = "";
var content2 = "";
var content3 = "";
var checkSave = 0;//判断数据库是否保存
//添加项目后
function addSelfDefine(result) {
}
//保存项目
function saveProject() {
	checkSave = 1;//点击word编辑区可以插入新图片
	//	var result="";//记录数据库是否保存成功的信息
	//tableData=$('#example1').html();
	//	tableData=hot.getData();
	//	console.log(tableData);
	if (projectId === 0) {
		alert("请查看或新建项目");
	} else {
		var tableData = {
			"id" : projectId,
			"reservation":colIndex+','+colWidth,
			"appContent":JSON.stringify(hot.getData())
		};
		occorPicture();
		$.ajax({
			type : "PUT",
			url : "/projectManager/api/v1/project",
			data : tableData,
			success : function(result) {
				console.log(result.state);
				alert("当前项目保存成功");
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("XMLHttpRequest请求状态码：" + XMLHttpRequest.status);
				console.log("XMLHttpRequest状态码：" + XMLHttpRequest.readyState);
				console.log("textStatus是：" + textStatus);
				console.log("errorThrown是：" + errorThrown);
				alert("获取项目失败，请稍后重试!");
			}
		});
	}
}
//查看项目
function checkSelfDefine(node, result) {
	//hot.render();
	//		var id = projectId;
	//$('#example1').empty();
	//var getTableData = result.content.appContent;
	//console.log(result.content.appContent);

	//		$('#example1').append(getTableData);
	/*$(document).ready(function() {
		hot.updateSettings({})
	});*/
		if (result.state) {
			var getTableData = JSON.parse(result.content.appContent);
			var rtndColIndex=result.content.reservation.split(',')[0];
			var rtndcolWidth=result.content.reservation.split(',')[1];
			//加载数据
			hot.loadData(getTableData);
			//加载栏的宽度
			var prop={
					width:rtndcolWidth,
					index:rtndColIndex
			}
			hot.propToCol(prop);
			hot.render();
			//hot.updateSettings({})
			//$('#sopTable').find('tbody').empty();
			//$('#sopTable').find('tbody').html(result.content.reservation);
			console.log(projectId);
		} else {
			console.log(result.error);
		}
		
		
		hot.updateSettings({});
}

//另存项目
function saveAsProject() {
	var saveProjectNameArr = [];//获取所有项目
	// 获取输入框中的内容
	var projectName = $('#saveAsProjectNameModal')[0].value;//获取项目名
	var createDate = new Date().toLocaleDateString() + ','+ new Date().getHours() + ':' + new Date().getMinutes();//获取项目创建时间
	var memo = $('#saveAsProjectRemarkModal')[0].value;//获取备注
	var data = {
		"id" : 0,
		"createDate" : createDate,
		"projectName" : projectName,
		"memo" : memo,
		//"reservation":$('#sopTable').find('tbody').html(),
		"appContent":JSON.stringify(hot.getData())
	};
	//获取数据库所有项目名
	$.ajax({
		url : "/projectManager/api/v1/project",
		type : "get",
		async : false,
		dataType : "json",
		success : function(result) {
			saveProjectNameArr.length = 0;//数组清零
			result.content.forEach(function(element, index, array) {
				saveProjectNameArr.push(element.projectName);
			})
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {//打印错误信息
			console.log("XMLHttpRequest请求状态码：" + XMLHttpRequest.status);
			console.log("XMLHttpRequest状态码：" + XMLHttpRequest.readyState);
			console.log("textStatus是：" + textStatus);
			console.log("errorThrown是：" + errorThrown);
		}
	});
	//表格添加数据
	if (projectName === '') {
		alert("请输入项目名！！！");
	} else if (saveProjectNameArr.indexOf(projectName) !== -1) {//在所有项目中看是否存在当前名字
		alert("项目已经存在，请重新输入项目名！！！");
	} else {
		// 添加数据库
		$.ajax({
					type : "post",
					url : "/projectManager/api/v1/project",
					data : data,
					success : function(result) {
						if (result.state) {
							$('.selectList').prepend('<li class="">\n' +
			                         '\t\t\t\t\t<a>\n' +
			                         '\t\t\t\t\t\t<div>\n' +
			                         '\t\t\t\t\t\t\t<div class="sideProjectLi" onmouseover="this.title = this.innerHTML;" onclick="sideCheck(' + result.content.id + ',this)">\n' +
			                         '\t\t\t\t\t\t\t\t' + result.content.projectName + '\n' +
			                         '\t\t\t\t\t\t\t</div>\n' +
			                         '\t\t\t\t\t\t\t<div style="position:absolute;bottom:6px;right:5px;">\n' +
			                         '\t\t\t\t\t\t\t\t<i class="ace-icon fa fa-pencil align-top bigger-125 purple" id="checkSideLi" onclick="checkProject(' + result.content.id + ')" data-toggle="modal" data-target="#basicInfo"></i>\n' +
			                         '\t\t\t\t\t\t\t\t<i class="ace-icon fa fa-trash-o bigger-120 red" id="deleteSideLi" onclick="removeProject(' + result.content.id + ')"></i>\n' +
			                         '\t\t\t\t\t\t\t</div>\n' +
			                         '\t\t\t\t\t\t</div>\n' +
			                         '\t\t\t\t\t</a>\n' +
			                         '\t\t\t\t</li>');
							//侧边栏高度适应
							var height = $(window).get(0).innerHeight;//获取屏幕高度
							if ($('#cityList').children('li').length * 36 < height - 310) {
								$('.selectList').css('height',$('#cityList').children('li').length * 36);
							} else {
								$('.selectList').css('height', height - 310);
							}
							$('#dynamic-table').DataTable().row.add(data).draw(false);
						}
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {//打印错误信息
						console.log("XMLHttpRequest请求状态码："+ XMLHttpRequest.status);
						console.log("XMLHttpRequest状态码："+ XMLHttpRequest.readyState);
						console.log("textStatus是：" + textStatus);
						console.log("errorThrown是：" + errorThrown);
					}
				});
		$('#saveAsModal').modal('hide');//隐藏模态框
		// 在前台添加表格
	}
}
//保存文件函数
function saveFile(data, filename){
	var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    save_link.href = data;
    save_link.download = filename; 
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    save_link.dispatchEvent(event);
}

//生成图片函数
function occorPicture(){	
	var content=document.getElementById("example")
	html2canvas(content, {onrendered: function(canvas) {
        	//添加属性
        	canvas.setAttribute('id','thecanvas');
			//读取属性值
			// var value= canvas.getAttribute('id');
            document.getElementById('images').innerHTML = '';
            document.getElementById('images').appendChild(canvas);
        }
	});
}
//下载图片
function downLoadPicture(){
	//occorPicture();
    var oCanvas = document.getElementById("thecanvas");
	// 获取图片资源
	var img_data1 = Canvas2Image.saveAsPNG(oCanvas, true).getAttribute('src');
	saveFile(img_data1, 'sop_' + new Date().toLocaleDateString() + '.png');
}
//删除项目后，自定义操作
function removeSelfDefine(result) {
    // 上一层函数查看basicAction.js中removeProject()函数
    /*
    * your code.....
    **/
    console.log("remove project successful");
}

function setCustomContext() {
	//	$("#mycanDiv").load(location.href+" #mycanDiv");

	// occorPicture();	
	var customText = {//word编辑区自定义文本内容
		'title' : "<h2>本次SOP所得结果为：</h2>",
		'chap1' : "<h3>将关键环节进行文件化描述，可得到如下标准操作程序表：</h3>",
		'img' : '',
		'chap3' : "<h3>操作时需严格按照表中要求执行</h3>"
	};
	var img = $("#thecanvas")[0]; //选择页面中的img元素
	var image = new Image();
	if (img != null) {
		image.src = img.toDataURL("image/png");
	}
	customText.img = image;
	for ( var custom in customText) {
		$('#WYeditor').append(customText[custom]);
	}
}
//获取表格的样式

//表格内容有变化，报告编辑区图片重新加载
$(document).ready(function () {
    $('#wordEditTab').click(function () {
        if (checkSave === 1) {
            var img = $("#thecanvas")[0];  //选择页面中的img元素
            var image = new Image();
            if (img != null) {
                image.src = img.toDataURL("image/png");
            }
            $('#WYeditor>img').attr('id', 'sopId');
            $('#sopId').attr('src', image.src);
            checkSave = 0;
        }
    });
});