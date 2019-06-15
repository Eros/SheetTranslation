function translate(full, selected, ogSheet, newSheet, sourceLanguage, targetLanguage) {

    var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var activeSheet = activeSpreadsheet.getActiveSheet();
    var activeRange = activeSheet.getActiveRange().getA1Notation();

    //run a message to say that it's being translated
    activeSpreadsheet.toast('Translation is currently in process!', '', -1);

    try {
        if (ogSheet)
            var targetSheet = activeSheet;
        else {
            var newName = activeSheet.getName() + ' In : ' + targetLanguage;

            var sheets = activeSpreadsheet.getSheets();

            var targetSheet = activeSpreadsheet.duplicateActiveSheet().setName(newName);
            targetSheet.setTabColor('138EA'); //idk what this colour is, i just spamed my keyboard
        }

        var activeCell = activeSheet.getActiveCell();

        if (full) {
            translateFullPage(targetSheet, sourceLanguage, targetLanguage);
        } else if (selected) {
            translateSelected(targetSheet, activeRange, sourceLanguage, targetLanguage);
        }
    } catch (err) {
        activeSpreadsheet.toast("Error has happened: " + err);
    }
}

function translateFullPage(targetSheet, sourceLanguage, targetLanguage) {
    var lrow = targetSheet.getLastRow();
    var lcol = targetSheet.getLastColumn();

    for (var i = 1; i <= lrow; i++) {
        for (var j = 1; j <= lcol; j++) {
            if (targetSheet.getRange(i, j).getValue() != "") {
                var activeCellText = targetSheet.getRange(i, j).getValue();
                var cellTranslation = LanguageApp.translate(activeCellText, sourceLanguage, targetLanguage);
                targetSheet.getRange(i, j).setValue(cellTranslation);
            }
        }
    }
}

function translateSelected(targetSheet, activeRange, sourceLanguage, targetLanguage) {
    var range = targetSheet.getRange(activeRange);
    var rowCount = range.getNumRows();
    var colCount = range.getNumColumns();

    for (var i = 1; i <= rowCount; i++) {
        for (var j = 1; j <= colCount; j++) {
            var activeText = range.getCell(i, j).getValue();
            var activeCellTranslation = LanguageApp.translate(activeCellText, sourceLanguage, targetLanguage);
            range.getCell(i, j).setValue(activeCellTranslation);
        }
    }
}