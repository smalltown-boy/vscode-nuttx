const vscode = require("vscode");

function configBoard() {
  const config = vscode.workspace.getConfiguration('nuttx');

  let nuttxPath = config.get('nuttxPath');

  if (!nuttxPath) {
    vscode.window.showErrorMessage('NuttX path not configured!');
    return;
  }

  const terminal = extension.nuttxTerminal;
    
  if(terminal) {
    terminal.show();
    terminal.sendText('make menuconfig', true);
    vscode.window.showInformationMessage("Run menuconfig for configuring board...");
  } else {
    vscode.window.showInformationMessage("Terminal not initialized!");
  } 
}

module.exports = { configBoard };