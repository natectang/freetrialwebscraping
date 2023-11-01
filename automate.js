//Used on Google Apps Script Platform | In Conjunction with Google Sheets Automation process
function getDataAndUpdateSpreadsheet() {

  //Initialize the Spreadsheet Object in a variable on which to call methods
  var sheet = SpreadsheetApp.getActiveSheet();
  //var sheetName = SpreadsheetApp.getActiveSheet().getName();
  var websiteColumn = sheet.getRange("Websites!A2:A192");
  var freeTrialColumn = sheet.getRange("Websites!B2:B192");
  var resultArray = [];
  var values = websiteColumn.getValues()
  Logger.log(values);

  //Fetch site content & Determine whether Free Trial is Offered using Keywords
  for (var i=0; i<values.length; i++) {

    var result = UrlFetchApp.fetch(values[i],
    {
      method: "get",
      contentType: "application/json",
      muteHttpExceptions: true,
      validateHttpsCertificates : false,
      //We Use Identifiers such as free, Free, Sign up Free, and Trial
    }).getContentText().includes('free' || 'Free' || 'Sign up Free' || 'Trial');
    
    Logger.log(result);
    //We push the results into a 2D array format that can be inserted into a Google spreadsheet
    resultArray.push([result]);
  }

  Logger.log(resultArray);

  //Add results to Free Trial Column to corresponding website
  freeTrialColumn.setValues(resultArray);
}
