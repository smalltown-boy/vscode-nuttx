const vscode = require("vscode");
const terminalManager = require('../terminal');

function configBoard() {
  const config = vscode.workspace.getConfiguration('nuttx');

  let nuttxPath = config.get('nuttxPath');

  if (!nuttxPath) {
    vscode.window.showErrorMessage('NuttX path not configured!');
    return;
  }
    
  const terminal = terminalManager.getTerminal()
    
  if(terminal) {
    terminal.show();
    terminal.sendText('make menuconfig', true);
    //terminal.sendText('whoami', true);
    vscode.window.showInformationMessage("Run menuconfig for configuring board...");
  } else {
    vscode.window.showInformationMessage("Terminal not initialized!");
  } 
}

module.exports = { configBoard };