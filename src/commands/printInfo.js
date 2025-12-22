const vscode = require("vscode");

function printInfo() {
  vscode.window.showErrorMessage('VSCode Web extension for NuttX.', { modal: true, detail: 'Version: 0.2.1' });
}

module.exports = { printInfo };