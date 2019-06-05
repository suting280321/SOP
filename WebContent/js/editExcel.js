var data;
//Window.Ccell = null;
$(function() {
	data = [// 四行五列
	[ "题目：", null, null, "共3页 第1页", null ],
			[ "编号：", "起草人及日期：", null, "起草部门审核及日期：", null ],
			[ null, null, null, null, null ],
			[ "相关部门审查及日期：", "批准人及日期：", null, "生效日期：", null ],
			[ null, null, null, null, null ],
			[ "颁发部门：", null, null, "第 份", null ],
			[ "分发部门：", null, null, null, null ],

			[ "变更记载：", null, null, "变更摘要：", null ],
			[ "修订号", "批准日期", "生效日期", "文件评审", null ],
			[ null, null, null, "111", null ],

	];
	var data1 = [ [ null, null, null, null, null, null, null, null, null ],
			[ null, null, null, null, null, null, null, null, null ],
			[ null, null, null, null, null, null, null, null, null ],
			[ null, null, null, null, null, null, null, null, null ],
			[ null, null, null, null, null, null, null, null, null ],
			[ null, null, null, null, null, null, null, null, null ],
			[ null, null, null, null, null, null, null, null, null ],
			[ null, null, null, null, null, null, null, null, null ],
			[ null, null, null, null, null, null, null, null, null ],
			[ null, null, null, null, null, null, null, null, null ], ];
	var container = document.getElementById('example');
	window.hotSettings = {
		data : data,
		//minSpareRows : 0, // 空出多少行
		//minCols : 5, // 最小列数
		//minRows : 12,
		//width : 1343,
		stretchH : "all",
		preventOverflow: 'horizontal',
		colHeaders : true, // 显示列表头 可取 true/fals/数组 ，当值为数组时，列头为数组的值
		rowHeaders : true, // 显示行表头 可取 true/fals/数组 ，当值为数组时，列头为数组的值
		columnSorting : false, // 点击列表头可进行当前列单元格排序
		manualColumnResize : true,// 当值为true时，允许拖动，当为false时禁止拖动
		manualRowResize : true,// 当值为true时，允许拖动，当为false时禁止拖动
		// columnSorting manualColumnFreeze 不能同时设置为true
		mergeCells : true,
		wordWrap : true, // 自动换行
		autoColumnSize : true, // 为true且未设置大小时，自适应列宽
		// readOnly:true,
		// enable the persistent state plugin
		// persistentState: true,
		// 显示表头下拉菜单 可取 true/false/自定义数组 右键任意单元格触发
		columns: [
			{renderer: coverRenderer},
			{renderer: coverRenderer},
			{renderer: coverRenderer},
			{renderer: coverRenderer},
			{renderer: coverRenderer},
			{renderer: coverRenderer},
			],
		mergeCells : [ {
			row : 0,
			col : 1,
			rowspan : 1,
			colspan : 2
		}, {
			row : 1,
			col : 1,
			rowspan : 1,
			colspan : 2
		}, {
			row : 2,
			col : 1,
			rowspan : 1,
			colspan : 2
		}, {
			row : 3,
			col : 1,
			rowspan : 1,
			colspan : 2
		}, {
			row : 4,
			col : 1,
			rowspan : 1,
			colspan : 2
		}, {
			row : 5,
			col : 1,
			rowspan : 1,
			colspan : 2
		}, {
			row : 6,
			col : 1,
			rowspan : 1,
			colspan : 2
		}, {
			row : 7,
			col : 0,
			rowspan : 1,
			colspan : 3
		}, {
			row : 8,
			col : 3,
			rowspan : 2,
			colspan : 1
		}, ],
		//outsideClickDeselects: true,
		// 汉化下拉菜单
		contextMenu : {
			items : {
				'mergeCells' : {
					name : '合并单元格',
				},
				'row_above' : {
					name : '上方添加一行',
				},
				'row_below' : {
					name : '下方添加一行',
				},
				'col_left' : {
					name : '左侧添加一列',
				},
				'col_right' : {
					name : '右侧添加一列',
				},
				'remove_row' : {
					name : '移除此行',
				},
				'remove_col' : {
					name : '移除此列',
				},
				'copy' : {
					name : '复制',
				},
				'cut' : {
					name : '剪切',
				},
				'make_read_only' : {
					name : '禁止编辑选中项',
				},
				'alignment' : {},
				'undo' : {
					name : '还原上次操作',
				},
				'redo' : {
					name : '重复上次动作',
				},
				'insert_img' : {
					name : '插入图片',
				}
			}
		}
	};

	window.hot = new Handsontable(container, hotSettings);
	//为图片时渲染为图片，为文字时渲染为文字
	function coverRenderer (instance, td, row, col, prop, value, cellProperties) {
		  var escaped = Handsontable.helper.stringify(value),
		    img;

		  if (escaped.indexOf('base64') !== -1) {
		    img = document.createElement('IMG');
		    img.src = value;

		    Handsontable.dom.addEvent(img, 'mousedown', function (e){
		      e.preventDefault(); // prevent selection quirk
		    });

		    Handsontable.dom.empty(td);
		    td.appendChild(img);
		  }
		  else {
		    // render as text
		    Handsontable.renderers.TextRenderer.apply(this, arguments);
		  }

		  return td;
		}
	document.getElementById("example").setAttribute("style","overflow: hidden;width: 100%;height:100%;"); 
	document.getElementById("example").setAttribute("data-originalstyle","overflow: hidden; width: 100%;height:100%;"); 
})
