const vscode = require("vscode");
const terminalManager = require('../terminal');

async function configureBoard(nuttxPath, selectedBoard) {
  const config = vscode.workspace.getConfiguration('nuttx');
  await config.update('selectedBoard"', appsPath, vscode.ConfigurationTarget.Global);

  const terminal = terminalManager.getTerminal();
    
  if(terminal) {
    terminal.show();
    terminal.sendText(`./tools/configure.sh ${selectedBoard}`, true);
    vscode.window.showInformationMessage("Create config file board...");
  } else {
    vscode.window.showInformationMessage("Terminal not initialized!");
  } 
}

module.exports = { configureBoard };