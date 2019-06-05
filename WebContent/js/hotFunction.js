
var imgUrl,colIndex,colWidth;
$(function(){
	
	// 列出全局变量
	var Crow, Ccol, Ccell, valT, selectRange, selectRangeArr = [];
	// 获取所选区域单元格数组 当前高亮
	hot.addHook('afterOnCellMouseUp', function(event, cellCoords) {
		Crow = cellCoords.row, Ccol = cellCoords.col;
		selectRangeArr = []; // 所选区域所有单元格数组
		Ccell = hot.getCell(Crow, Ccol)
		selectRange = hot.getSelected(); // 获取所选区域范围
		var txt = hot.getDataAtCell(selectRange[0], selectRange[1]); // 获取所选区域第一个单元格值
		// 单击任意单元格取消编辑状态
		$(".handsontableInputHolder").css({
			"display" : "none"
		});
		$("#templateCellInput").val(txt);
		var rangeRowArr = []; // 所选区域行数组
		var rangeColArr = []; // 所选区域列数组
		for (var i = selectRange[0]; i < selectRange[2] + 1; i++) {
			rangeRowArr.push(i);
		}
		for (var i = selectRange[1]; i < selectRange[3] + 1; i++) {
			rangeColArr.push(i);
		}
		for (var i = 0; i < rangeRowArr.length; i++) {
			for (var n = 0; n < rangeColArr.length; n++) {
				var selectRangeCell = {
					row : rangeRowArr[i],
					col : rangeColArr[n]
				};
				selectRangeArr.push(selectRangeCell);
			}// 把所选区域单元格内容放于selectRangeArr
		}
		// 将所选区域作为currentTd加亮区域
		$("td").removeClass("currentTd");
		for (var i = 0; i < selectRangeArr.length; i++) {
			var rangeCell = hot.getCell(selectRangeArr[i].row,
					selectRangeArr[i].col);
			$(rangeCell).addClass("currentTd");
		}
	});
	// 所选单元格的值和input同步
	$("#templateCellInput").keyup(
			function() {
				var val = $(this).val();
				if (selectRangeArr.length > 0) {
					for (var i = 0; i < selectRangeArr.length; i++) {
						hot.setDataAtCell(selectRangeArr[i].row,
								selectRangeArr[i].col, val)
					}
				}
			});

	$("#example").on("blur", "textarea.handsontableInput", function(e) {
		valT = $(this).val();
		hot.setDataAtCell(Crow, Ccol, valT);
	})
	// 修改单元格样式
	$(".btn-group label.btn").click(
			function(e) {
				console.log(e.target);
				var _index = $(this).index();
				var styleType = $(this).parent();
				var StyleClassName = '';
				// 修改单元格文本样式
				var toogleSwitch = true;
				if (styleType.hasClass("fontStyle")) {
					var fontClass = "";
					switch (_index) {
					case 0:
						fontClass = "htBold"; // 加粗
						break;
					case 1:
						fontClass = "htItalic"; // 斜体
						break;
					case 2:
						fontClass = "htUnderline"; // 下划线
						break;
					}
					StyleClassName = fontClass;
				}
				// 修改单元格对齐方式
				if (styleType.hasClass("alignStyle")) {
					var alignClass = "";
					switch (_index) {
					case 0:
						alignClass = "htLeft"; // 左对齐
						break;
					case 1:
						alignClass = "htCenter"; // 居中对齐
						break;
					case 2:
						alignClass = "htRight"; // 右对齐
						break;
					case 3:
						alignClass = "htJustify"; // 两端对齐
						break;
					}
					StyleClassName = alignClass;
				}
				// 修改所选区域所有单元格样式并赋予属性
				for (var i = 0; i < selectRangeArr.length; i++) {
					toogleSwitch = true;
					var rangeCell = hot.getCell(selectRangeArr[i].row,
							selectRangeArr[i].col);
					var checkRowMergeCell = $(rangeCell).attr("rowspan");
					var checkColumnMergeCell = $(rangeCell).attr("colspan");
					// $(rangeCell).removeClass("htLeft htCenter htRight
					// htJustify");
					// 定义修改类名 创建对应属性方法
					var setRangeCellClass = function() {
						$(rangeCell).toggleClass(StyleClassName);
						var cellClass = $(rangeCell)[0].className;
						hot.setCellMeta(selectRangeArr[i].row,
								selectRangeArr[i].col, "cellClass", cellClass);
					};
					if (checkRowMergeCell > 1) {
						for (var j = 0; j < checkRowMergeCell; j++) {
							if (toogleSwitch) {
								setRangeCellClass();
								toogleSwitch = false;
							} else {
								i++;
								continue;
							}

						}
					} else if (checkColumnMergeCell > 1) {
						for (var k = 0; k < checkColumnMergeCell; k++) {
							if (toogleSwitch) {
								setRangeCellClass();
								toogleSwitch = false;
							} else {
								i++;
								continue;
							}

						}
					} else {
						setRangeCellClass();
					}
				}
			});
	$(".ColorStyle input").each(function() {
		$(this).colorpicker();
	})
	$(".ColorStyle input").blur(
			function() {
				var val = $(this).val();
				var _index = $(this).parent().index();
				$(this).css(
						"cssText",
						"background:" + val + "!important;color:" + val
								+ "!important;");// 选色框对外显示的颜色
				// 定义改变样式方法
				var changeCellStyle = function() {
					if (_index == 0) {
						$(rangeCell).css({
							"background" : val
						});
						hot.setCellMeta(selectRangeArr[i].row,
								selectRangeArr[i].col, "bkColor", val);
					}
					if (_index == 1) {
						$(rangeCell).css({
							"color" : val
						});
						hot.setCellMeta(selectRangeArr[i].row,
								selectRangeArr[i].col, "ftColor", val);
					}
					if (_index == 2) {
						$(rangeCell).css({
							"border" : "solid 0.5px " + val,
							"box-sizing" : "border-box"
						});
						hot.setCellMeta(selectRangeArr[i].row,
								selectRangeArr[i].col, "bdColor", val);
					}
				};
				for (var i = 0; i < selectRangeArr.length; i++) {
					toogleSwitch = true;
					var rangeCell = hot.getCell(selectRangeArr[i].row,
							selectRangeArr[i].col);
					var checkRowMergeCell = $(rangeCell).attr("rowspan");
					var checkColumnMergeCell = $(rangeCell).attr("colspan");
					// $(rangeCell).removeClass("htLeft htCenter htRight
					// htJustify");
					if (checkRowMergeCell > 1) {
						for (var j = 0; j < checkRowMergeCell; j++) {
							if (toogleSwitch) {
								changeCellStyle();
								toogleSwitch = false;
							} else {
								i++;
								continue;
							}

						}
					} else if (checkColumnMergeCell > 1) {
						for (var k = 0; k < checkColumnMergeCell; k++) {
							if (toogleSwitch) {
								changeCellStyle();
								toogleSwitch = false;
							} else {
								i++;
								continue;
							}

						}
					} else {
						changeCellStyle();
					}

					/*
					 * var rangeCell = hot.getCell(selectRangeArr[i].row,
					 * selectRangeArr[i].col); var checkMergeCell =
					 * $(rangeCell).attr("rowspan"); if( checkMergeCell !=
					 * undefined ){ if( toogleSwitch ){ changeCellStyle();
					 * toogleSwitch = false; }else{ continue; } }else{
					 * changeCellStyle(); }
					 */
				}
			});
	
	//读入的图片转成base64编码
	/*function readFileIntoDataUrl(fileInfo) {
	    var loader = $.Deferred();
	    var fReader = new FileReader();
	    fReader.onload = function (e) {
	        loader.resolve(e.target.result);
	    };
	    fReader.onerror = loader.reject;
	    fReader.onprogress = loader.notify;
	    fReader.readAsDataURL(fileInfo);
	    var dataUrl=fReader.result;
	    return loader.promise(dataUrl);
	}*/
	//把imgUrl转换为deferred对象
	function transformDfd(value) {
		var deferred = $.Deferred();
		return deferred.promise(value);
	}
	getBase64Src();
	
	
		
	//获取图片base64地址
	function getBase64Src(){
		var imagebar = $("input[data-editImage]");
		var insertbar = imagebar.eq(1);
		$("#insertPicture")["0"].onclick = function() {
			insertbar.click();
			insertbar["0"].onchange = function() {
				var fileInfo = this.files["0"];
				var fReader = new FileReader();
				fReader.readAsDataURL(fileInfo);
				fReader.onload = function(e) {
					e.target.result;
				}
				var dataUrl =fReader.result;
				//改变单元格内容
				//function setDataAtCell(){
				//	var loader = $.Deferred();
					hot.setDataAtCell(Crow, Ccol,dataUrl);
					
					
					//return loader.promise();
				//}
				/*$.when(setDataAtCell()).done(
						console.log("success")
						//function(dataUrl) {
					//imgUrl = dataUrl;
					//给选中单元格插入innerHTML
						//hot.setDataAtCell(Crow, Ccol,imgUrl),saveProject()
					//$.when(transformDfd(dataUrl)).then(hot.setDataAtCell(Crow, Ccol,imgUrl),saveProject());
				//}
					).fail(function(e) {
					console.log("failed to read image");
				});*/
					this.value = ''; // 可以连续两次读取同一张图片
			};
			imagebar = null;
		};
	}
	//改变列宽后，获取列的index和宽度 afterColumnResize		modifyCol
	hot.addHook('afterColumnResize',function(currentColumn,newSize,isDoubleClick){
		colWidth=newSize;
		console.log(colWidth);
		colIndex=currentColumn;
		console.log(colIndex);
	})
})
