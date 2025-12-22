const vscode = require("vscode");

function initTerminal() {
  try {
    const terminal = vscode.window.createTerminal({
      name: 'NuttX Terminal',
      cwd: nuttxPath,
    });

    vscode.window.showInformationMessage('NuttX terminal initialized.');
    return terminal; 
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to create terminal: ${error.message}`);
    return null;
  }
}

module.exports = {
  initTerminal
};
