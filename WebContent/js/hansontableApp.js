/*$(function f1(){*/
  	var data = [//四行五列  
      	["题目：", "","","共3页 第1页",""],  
      	["编号：","起草人及日期：", "","起草部门审核及日期：",""],  
      	["","","","",""],  
      	["相关部门审查及日期：", "批准人及日期：","","生效日期：",""],  
      	["","","","",""],  
      	["颁发部门：","","", "第 份",""],  
      	["分发部门：","","","",""],  
      	["变更记载：","","","变更摘要：",""],  
      	["修订号", "批准日期","生效日期","文件评审",""],  
      	["","","","",""],  
  	];  
	var container = document.getElementById('example'); 
	var hotSettings = { 
		data:data,
	    minSpareRows:0,	//空出多少行  
	    autoColumnSize:true,
	   /* width:"100%",*/
	    stretchH:"all",
	    minCols:2, // 最小列数
		minRows:14,
		colHeaders: true,/*[
		    '主要装配环节',
		    '合格标准'
		  ],	*///显示列表头 可取 true/fals/数组 ，当值为数组时，列头为数组的值
	    rowHeaders:true,	//显示行表头 可取 true/fals/数组 ，当值为数组时，列头为数组的值      
		columnSorting:false, // 点击列表头可进行当前列单元格排序   
		manualColumnResize:true,//当值为true时，允许拖动，当为false时禁止拖动
		manualRowResize:true,//当值为true时，允许拖动，当为false时禁止拖动
		//  columnSorting manualColumnFreeze 不能同时设置为true
		mergeCells:true,
		wordWrap:true, //默认
		//readOnly:true,
		//显示表头下拉菜单 可取 true/false/自定义数组 右键任意单元格触发
		//汉化下拉菜单
		mergeCells: [
			{row:0, col:1, rowspan:1, colspan:2},
            {row:1, col:1, rowspan:1, colspan:2},
            {row:2, col:1, rowspan:1, colspan:2},
            {row:3, col:1, rowspan:1, colspan:2},
            {row:4, col:1, rowspan:1, colspan:2},
            {row:5, col:1, rowspan:1, colspan:2},
            {row:6, col:1, rowspan:1, colspan:2},
            {row:7, col:0, rowspan:1, colspan:3},
            {row:8, col:3, rowspan:2, colspan:1},
        ],
		contextMenu: {
			items: {
				'mergeCells':{ name: '合并单元格' , },
				'row_above': { name: '上方添加一行', },
				'row_below': { name: '下方添加一行', },
				'col_left': { name: '左侧添加一列', },
				'col_right': { name: '右侧添加一列', },
				'remove_row': { name: '移除此行', },
				'remove_col': { name: '移除此列', },
				'copy': { name: '复制', },
				'cut': { name: '剪切', },
				'make_read_only': { name: '禁止编辑选中项', },
				'alignment': { },
				'undo': { name: '还原上次操作', },
				'redo': { name: '重复上次动作', },
				
			}
		},
		/*columns: [
		    {
		      renderer: 'html'
		    }
		  ]*/
	};  
	var hot = new Handsontable(container,  hotSettings);
	/*   return hotSettings.data;*/
/*})
*/