var data = function () {
  return Handsontable.helper.createSpreadsheetData(100, 10);
};

var container = document.getElementById('table');

var hot = new Handsontable(container, {
  data: data(),
  minSpareCols: 1,
  minSpareRows: 1,
  rowHeaders: true,
  colHeaders: true,
  contextMenu: true,
  mergeCells:true
});