const vscode = require("vscode");

function configBoard() {
  const config = vscode.workspace.getConfiguration('nuttx');

  let nuttxPath = config.get('nuttxPath');

  if (!nuttxPath) {
    vscode.window.showErrorMessage('NuttX path not configured!');
    return;
  }

  const terminal = vscode.window.createTerminal({
    name: 'NuttX Menuconfig',
    cwd: nuttxPath
  });

  terminal.show();
  terminal.sendText(`make menuconfig`);

  vscode.window.showInformationMessage("Open terminal...");
}

module.exports = { configBoard };