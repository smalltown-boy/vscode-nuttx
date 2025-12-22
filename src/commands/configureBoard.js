const vscode = require("vscode");
async function configureBoard(nuttxPath, selectedBoard) {
  const terminal = extension.nuttxTerminal;
    
  if(terminal) {
    terminal.show();
    terminal.sendText(`./tools/configure.sh ${selectedBoard}`, true);
    vscode.window.showInformationMessage("Create config file board...");
  } else {
    vscode.window.showInformationMessage("Terminal not initialized!");
  } 
}

module.exports = { configureBoard };