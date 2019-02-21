/*****************************************************************************

 DESCRIPTION:
    
   VersaSheets Form Handling code located in Git Hub Repository 
     named "VersaSheets-TopLevel"

    
 AUTHOR:
    Steve Germain
    (208) 870-2727
    
 COPYRIGHT NOTICE:
   Copyright (c) 2009 - 2018 by Legatus, Inc.
   Copyright (c) 2019 by Stephen P. Germain
   
 NOTES:

   >>>>>> Change "XXXonOpen()" to "onOpen()" when used in host container, if necessary
   >>>>>> Update the Tools, Script, Resources Library Identifier to "VersaSheetsCommon" in host container


******************************************************************************/

var Version = "(v5.0)";
var SetupSheetName = 'Setup';

/******************************************************************************/
function onOpen() {
/******************************************************************************/
  LoadGlobals(SetupSheetName);
  Director("OnOpen", false);
} 

/******************************************************************************/
function updateFormResponse() {
/******************************************************************************/
  Director("updateFormResponse", true);
} 
  
/******************************************************************************/
function ProcessRequest_1() {
/******************************************************************************/
  Director("ProcessRequest_1", true);
}

/******************************************************************************/
function ProcessRequest_2() {
/******************************************************************************/
  Director("ProcessRequest_2", true);
}

/******************************************************************************/
function ProcessRequest_3() {
/******************************************************************************/
  Director("ProcessRequest_3", true);
}

/******************************************************************************/
function ScanForAlerts() {
/******************************************************************************/
  Director("ScanForAlerts", true);
}

/******************************************************************************/
function WeeklyScan() {
/******************************************************************************/
  Director("WeeklyScanForAlerts", true);
}

/******************************************************************************/
function ResetGoogleForm(){
/******************************************************************************/
  Director("ResetGoogleForm", false);
}

/******************************************************************************/
function MoveSheetRows(){
/******************************************************************************/
  Director("MoveSheetRows", true);
}  

/******************************************************************************/
function DeleteSheetRows(){
/******************************************************************************/
  Director("DeleteSheetRows", false);
}  

/******************************************************************************/
function PerformCMGAudit(){
/******************************************************************************/
  Director("PerformCMGAudit", true);
}  

/******************************************************************************/
function EmergencyLockRelease(){
  var lock = LockService.getPublicLock();
  lock.releaseLock();
}
/******************************************************************************/



/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
function Director(CallingFunction, bNeedParams) {
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
  var func = '******* Director ' + Version + ' - ';
  var Step = 100;
  Logger.log(func + Step + ' BEGIN Steps for "' + CallingFunction + '"');
  var title = CallingFunction + ' Procedures';
  var prog_message = 'Executing ' + CallingFunction + ' procedures...';
  VersaSheetsCommon.progressMsg(prog_message,title,-3);

  /**************************************************************************/
  Step = 1000; // Load the oCommon object to the FormHandler function
  /**************************************************************************/
  Logger.log(func + Step + ' Build oCommon object');
  var oCommon = {};
  oCommon = LoadCommon();
  if (oCommon.length <=0){ return; }

  /**************************************************************************/
  Step = 1100; // Get the parameters to pass to the CallingFunction
  /**************************************************************************/
  if(bNeedParams){
    Logger.log(func + Step + ' Getting oMenu Parameters');  
    var oMenuParams ={};
    var bParamsFound = VersaSheetsCommon.GetMenuParams(oCommon, CallingFunction, oMenuParams);
  }
  
  /**************************************************************************/
  Step = 2000; // Call and pass parameters to the CallingFunction
  /**************************************************************************/
  switch(CallingFunction) {
      
    /**************************************************************************/  
    case "OnOpen":
    /**************************************************************************/ 
      Step = 2010; // Execute OnOpen procedures
      oCommon.bSilentMode = true;
      Logger.log(func + Step + ' Executing "' + CallingFunction + '", SilentMode: ' 
                 + oCommon.bSilentMode);  
      
      VersaSheetsCommon.onOpenProcedures(oCommon);
      
      try {
        Step = 2015; // Hide the Setup Tab
        oCommon.Sheets.getSheetByName(SetupSheetName).hideSheet();
      }
      catch(err) {
        //  do nothing - probably a non-owner attempting to open the Sheet
        Logger.log(func + Step + ' Error: ' + err);
      }

      break;
      
    /**************************************************************************/  
    case "updateFormResponse":
    /**************************************************************************/ 
      Step = 2020; // Execute onFormSubmit procedures
      oCommon.bSilentMode = true;
      Logger.log(func + Step + ' Executing "' + CallingFunction + '", SilentMode: ' 
                 + oCommon.bSilentMode);  

      if(bParamsFound){ VersaSheetsCommon.onFormSubmit(oCommon, oMenuParams) };
      
      break;

    /**************************************************************************/  
    case "ProcessRequest_1":
    /**************************************************************************/ 
      Step = 2030; // Execute procedures
      oCommon.bSilentMode = false;
      Logger.log(func + Step + ' Executing "' + CallingFunction + '", SilentMode: ' 
                 + oCommon.bSilentMode);  

      if(bParamsFound){ VersaSheetsCommon.GenerateItems(oCommon, oMenuParams); }
      
      break;

    /**************************************************************************/  
    case "ProcessRequest_2":
    /**************************************************************************/ 
      Step = 2030; // Execute procedures
      oCommon.bSilentMode = false;
      Logger.log(func + Step + ' Executing "' + CallingFunction + '", SilentMode: ' 
                 + oCommon.bSilentMode);  

      if(bParamsFound){ VersaSheetsCommon.GenerateItems(oCommon, oMenuParams); }
      
      break;

    /**************************************************************************/  
    case "ProcessRequest_3":
    /**************************************************************************/ 
      Step = 2030; // Execute procedures
      oCommon.bSilentMode = false;
      Logger.log(func + Step + ' Executing "' + CallingFunction + '", SilentMode: ' 
                 + oCommon.bSilentMode);  

      if(bParamsFound){ VersaSheetsCommon.GenerateItems(oCommon, oMenuParams); }
      
      break;
      
    /**************************************************************************/  
    case "ScanForAlerts":
    /**************************************************************************/  
      Step = 2040; // Execute procedures
      oCommon.bSilentMode = false;
      Logger.log(func + Step + ' Executing "' + CallingFunction + '", SilentMode: ' 
                 + oCommon.bSilentMode);  

      if(bParamsFound){ VersaSheetsCommon.AlertsScan(oCommon, oMenuParams); }
      
      break;
      
    /**************************************************************************/  
    case "WeeklyScan":
    /**************************************************************************/  
      Step = 2050; // Execute procedures
      oCommon.bSilentMode = true;
      Logger.log(func + Step + ' Executing "' + CallingFunction + '", SilentMode: ' 
                 + oCommon.bSilentMode);  

      if(bParamsFound){ VersaSheetsCommon.AlertsScan(oCommon, oMenuParams); }
      
      break;
      
    /**************************************************************************/  
    case "PerformCMGAudit":
    /**************************************************************************/  
      Step = 2040; // Execute procedures
      oCommon.bSilentMode = false;
      Logger.log(func + Step + ' Executing "' + CallingFunction + '", SilentMode: ' 
                 + oCommon.bSilentMode);  
      
      var CMGAuditTitle = '';
      if(bParamsFound){ VersaSheetsCommon.CMGAudit(CMGAuditTitle, oCommon, oMenuParams); }
      
      break;
      
    /**************************************************************************/  
    case "ResetGoogleForm":
    /**************************************************************************/ 
      Step = 2060; // Execute OnOpen procedures
      oCommon.bSilentMode = false;
      Logger.log(func + Step + ' Executing "' + CallingFunction + '", SilentMode: ' 
                 + oCommon.bSilentMode);  

      VersaSheetsCommon.updateFormLists(oCommon);
      
      break;
      
    /**************************************************************************/  
    case "MoveSheetRows":
    /**************************************************************************/ 
      Step = 2070; // Execute onFormSubmit procedures
      oCommon.bSilentMode = false;
      Logger.log(func + Step + ' Executing "' + CallingFunction + '", SilentMode: ' 
                 + oCommon.bSilentMode);  

      if(bParamsFound){ VersaSheetsCommon.moveSelectedRows(oCommon, oMenuParams); }
      
      break;
      
    /**************************************************************************/  
    case "DeleteSheetRows":
    /**************************************************************************/ 
      Step = 2070; // Execute onFormSubmit procedures
      oCommon.bSilentMode = false;
      Logger.log(func + Step + ' Executing "' + CallingFunction + '", SilentMode: ' 
                 + oCommon.bSilentMode);  

      VersaSheetsCommon.deleteSelectedRows(oCommon);
      
      break;

    /**************************************************************************/  
    default:
    /**************************************************************************/  
      Step = 3000; // Calling Function Not found.
      
      oCommon.ReturnMessage = func + Step + ' CallingFunction: "' + CallingFunction + '" Not found.';
      oCommon.DisplayMessage = 'Error Encountered: CallingFunction: "' + CallingFunction + '" Not found.';
      VersaSheetsCommon.LogEvent(oCommon.ReturnMessage, oCommon);

      break;
  }  
  
  /**************************************************************************/
  Step = 5000; // Display / record Success / Failure messages
  /**************************************************************************/
  if (oCommon.DisplayMessage != ''){
    VersaSheetsCommon.progressMsg(oCommon.DisplayMessage,title,3);
    if(!oCommon.bSilentMode){
      Browser.msgBox(oCommon.DisplayMessage);
    }
  }
  
  VersaSheetsCommon.WriteEventMessages(oCommon.ReturnMessage, oCommon);
  
  VersaSheetsCommon.progressMsg("Bye, bye now!...",title,3);

  Step = 9999;
  Logger.log(func + Step + ' END');
  
  return;
  
}


/***************************************************************************************************************
****************************************************************************************************************
****************************************************************************************************************
*
*    Container-bound Functions Below
*
****************************************************************************************************************
****************************************************************************************************************
***************************************************************************************************************/

function LoadGlobals(SetupSheetName) {
  /* ****************************************************************************

   DESCRIPTION:
     This function is invoked whenever the Globals have not been previously loaded
     
   USEAGE
     var ReturnBool = LoadGlobals(SetupSheetName);

   REVISION DATE:
    03-23-2018 - First Instance when discovered that Globals were not persisting in this container
     
   NOTES:

  ******************************************************************************/
  var func = "***LoadGlobals " + Version + " - ";
  Step = 100;
  Logger.log(func + Step + ' BEGIN');
  
  /******************************************************************************/
  Step = 1000; // Define the principal scalars and objects used everywhere
  /*******************************************************************************/
  var Globals = {};
  var oSourceSheets = SpreadsheetApp.getActiveSpreadsheet();
  var Globals = VersaSheetsCommon.BuildGlobals(oSourceSheets,SetupSheetName);
  if (Globals.length <=0){
    Logger.log(func + Step + ' Error - No Globals values found.');
    return false;
  }
  
  //Step = 1100; // Verify results
for(var Key in Globals){
    Logger.log(func + Step + ' Key:' + Key + '  Value: ' + Globals[Key]);
}
  
  /******************************************************************************/
  Step = 2000; //Set Persistent variable values for this container using the Properties Service
  /******************************************************************************/
  var scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.deleteAllProperties();  
  scriptProperties.setProperties(Globals);
  
  return true;
 
}

function LoadCommon() {
  /* ****************************************************************************

   DESCRIPTION:
     This function is invoked whenever the Globals have not been previously loaded
     
   USEAGE
     var oCommon = {};
     var oCommon = LoadCommon();

   REVISION DATE:
    03-23-2018 - First Instance when discovered that Globals were not persisting in this container
     
   NOTES:

  ******************************************************************************/
  var func = "***LoadCommon " + Version + " - ";
  Step = 100;
  Logger.log(func + Step + ' BEGIN');
  
  // Get the Globals that were captured when onOpen was executed
  var scriptProperties = PropertiesService.getScriptProperties();
  var Globals = scriptProperties.getProperties();
  var Sheets = SpreadsheetApp.getActiveSpreadsheet(); 

  /******************************************************************************/
  Step = 1000; // Build the oCommon object
  /******************************************************************************/
  var oCommon = {};
  var oCommon = VersaSheetsCommon.BuildCommon(Sheets,Globals);
  // Verify oCommon
  //for(var Key in oCommon){
  //   Logger.log(func + Step + ' Key:' + Key + '  Value: ' + oCommon[Key]);
  //}
  // Verify Globals
  //for(var Key in oCommon.Globals){
  //   Logger.log(func + Step + ' Key:' + Key + '  Value: ' + oCommon.Globals[Key]);
  //}
  
  return oCommon;
  
}


/******************************************************************************/
function SummarizeTransactions() {
/******************************************************************************/
  var func = "*******SummarizeTransactions" + Version + " - ";
  var Step = 0;
  var title = 'Summarize Bank Transactions';
  Logger.log(func + Step + ' BEGIN');
  // Load the oCommon object to the FormHandler function
  var oCommon = {};
  oCommon = LoadCommon();
  if (oCommon.length <=0){ 
    Step = 100;
    var message = "ProcessTransactions procedure encountered oCommmon object error " + Version + ".";
    //VersaSheetsCommon.WriteEventMessages(message, oCommon);
    Logger.log(func + Step + message);
    VersaSheetsCommon.WriteEventMessages(message, oCommon);
    return; 
  }

  Step = 200;
  if(VersaSheetsCommon.SummarizeAccounts(oCommon)){
    var message = title + ' procedure completed successfully ' + Version + '.';
  } else {
    var message = title + ' procedure encountered errors and/or warnings ' + Version + '.';
  }
  Logger.log(func + Step + message);
  VersaSheetsCommon.WriteEventMessages(message, oCommon);
  VersaSheetsCommon.progressMsg(message,title,5);
  
  Step = 9999;
  Logger.log(func + Step + ' END');
  
}

/******************************************************************************/
function ProcessTransactions() {
/******************************************************************************/
  var func = "*******ProcessTransactions" + Version + " - ";
  var Step = 0;
  var title = 'Assign Accounts';
  Logger.log(func + Step + ' BEGIN');
  var oCommon = {};
  oCommon = LoadCommon();
  if (oCommon.length <=0){ 
    Step = 100;
    var message = "ProcessTransactions procedure encountered oCommmon object error " + Version + ".";
    //VersaSheetsCommon.WriteEventMessages(message, oCommon);
    Logger.log(func + Step + message);
    VersaSheetsCommon.WriteEventMessages(message, oCommon);
    return; 
  }

  Step = 200;
  if(VersaSheetsCommon.AssignAccounts(oCommon)){
    var message = title + ' procedure completed successfully ' + Version + '.';
  } else {
    var message = title + ' procedure encountered errors and/or warnings ' + Version + '.';
  }
  Logger.log(func + Step + message);
  VersaSheetsCommon.WriteEventMessages(message, oCommon);
  VersaSheetsCommon.progressMsg(message,title,5);
  
  Step = 9999;
  Logger.log(func + Step + ' END');
  
}

