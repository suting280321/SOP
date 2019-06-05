const customBordersPlugin = hot.getPlugin('customBorders');

// Using an array of arrays (produced by `.getSelected()` method).
customBordersPlugin.setBorders([[1, 1, 2, 2], [6, 2, 0, 2]], {left: {width: 2, color: 'blue'}});
// Using an array of CellRange objects (produced by `.getSelectedRange()` method).
customBordersPlugin.setBorders(hot.getSelectedRange(), {left: {hide: false, width: 2, color: 'blue'}});

var container = document.getElementById('example1'),
hot;

hot = Handsontable(container, {
data: Handsontable.helper.createSpreadsheetData(200, 20),
rowHeaders: true,
fixedColumnsLeft: 2,
fixedRowsTop: 2,
colHeaders: true,
customBorders: [
  {
    range: {
      from: {
        row: 1,
        col: 1
      },
      to: {
        row: 3,
        col: 4
      }
    },
    top: {
      width: 2,
      color: '#5292F7'
    },
    left: {
      width: 2,
      color: 'orange'
    },
    bottom: {
      width: 2,
      color: 'red'
    },
    right: {
      width: 2,
      color: 'magenta'
    }
  },
  {
    row: 2,
    col: 2,
    left: {
      width: 2,
      color: 'red'
    },
    right: {
      width: 1,
      color: 'green'
    }
  }]
});
var btnObject=document.getElementById("btn"),
	selectedse=hot.getSelectedRange[0],
	fromObj=selectedse.from,
	toObj=selectedse.to;
btnObject.onclick=function(){
	hot.updateSettings({
	customBorders: [
	  {
	    range: {
	      from:fromObj,
	      to:toObj 
	    },
	    top: {
	      width: 2,
	      color: '#5292F7'
	    },
	    left: {
	      width: 2,
	      color: 'orange'
	    },
	    bottom: {
	      width: 2,
	      color: 'red'
	    },
	    right: {
	      width: 2,
	      color: 'magenta'
	    }
	  },
	  {
	    row: 2,
	    col: 2,
	    left: {
	      width: 2,
	      color: 'red'
	    },
	    right: {
	      width: 1,
	      color: 'green'
	    }
	  }]
	});
}




<button id="btn">加边框</button>




var container = document.getElementById('example1'),
hot;

hot = Handsontable(container, {
data: Handsontable.helper.createSpreadsheetData(200, 20),
rowHeaders: true,
fixedColumnsLeft: 2,
fixedRowsTop: 2,
colHeaders: true,
customBorders: [
  {
    range: {
      from: {
        row: 1,
        col: 1
      },
      to: {
        row: 3,
        col: 4
      }
    },
    top: {
      width: 2,
      color: '#5292F7'
    },
    left: {
      width: 2,
      color: 'orange'
    },
    bottom: {
      width: 2,
      color: 'red'
    },
    right: {
      width: 2,
      color: 'magenta'
    }
  },
  {
    row: 2,
    col: 2,
    left: {
      width: 2,
      color: 'red'
    },
    right: {
      width: 1,
      color: 'green'
    }
  }]
});

hot.addHook("afterSelectionEnd",function(row,column,row2,column2,selectionL){
console.log(hot.getSelectedRange());
var btnObject=document.getElementById("btn");
//btnObject.onclick=function(){
hot.updateSettings({
customBorders: [
  {
    range: {
      from:{
    	row:row,
      column:column
    },
      to:{
    	row:row2,
      column:column2
    }
    },
    top: {
      width: 2,
      color: '#5292F7'
    },
    left: {
      width: 2,
      color: 'orange'
    },
    bottom: {
      width: 2,
      color: 'red'
    },
    right: {
      width: 2,
      color: 'magenta'
    }
  },
  {
    row: 2,
    col: 2,
    left: {
      width: 2,
      color: 'red'
    },
    right: {
      width: 1,
      color: 'green'
    }
  }]
});
//}
})