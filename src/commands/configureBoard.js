const vscode = require("vscode");
async function configureBoard(nuttxPath, selectedBoard) {
  const terminal = vscode.window.createTerminal({
    name: 'NuttX Configure',
    cwd: nuttxPath
  });
  
  terminal.show();
  terminal.sendText(`./tools/configure.sh ${selectedBoard}`);
  
  vscode.window.showInformationMessage(`Configuring ${selectedBoard}...`);
}

module.exports = { configureBoard };