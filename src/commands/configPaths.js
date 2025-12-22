const vscode = require("vscode");
const terminalManager = require('../terminal');

async function configPaths() {
  vscode.window.showInformationMessage("Configure NuttX Paths.");

  try {
    const appsUri = await vscode.window.showOpenDialog({
      canSelectFiles: false,
      canSelectFolders: true,
      canSelectMany: false,
      openLabel: 'Select apps folder',
      title: 'Select NuttX apps Directory'
    });

    if (!appsUri || appsUri.length === 0) {
      vscode.window.showWarningMessage('Configuration cancelled.');
      return;
    }

    let appsPath = appsUri[0].fsPath;

    const nuttxUri = await vscode.window.showOpenDialog({
      canSelectFiles: false,
      canSelectFolders: true,
      canSelectMany: false,
      openLabel: 'Select nuttx folder',
      title: 'Select NuttX Directory'
    });

    if (!nuttxUri || nuttxUri.length === 0) {
      vscode.window.showWarningMessage('Configuration cancelled.');
      return;
    }

    let nuttxPath = nuttxUri[0].fsPath;

    const config = vscode.workspace.getConfiguration('nuttx');

    await config.update('appsPath', appsPath, vscode.ConfigurationTarget.Global);
    await config.update('nuttxPath', nuttxPath, vscode.ConfigurationTarget.Global);

    vscode.window.showInformationMessage(
      `NuttX paths configured:\napps: ${appsPath}\nnuttx: ${nuttxPath}`
    );

    const terminal = await terminalManager.initTerminal(nuttxPath);

    if (terminal) {
      terminal.show();
      terminal.sendText('whoami'); // Отправляем команду
    } else {
      vscode.window.showWarningMessage('Терминал не создан. Настройте пути NuttX.');
    }
  } catch (error) {
      vscode.window.showErrorMessage(`Error configuring paths: ${error}`);
  }
}

module.exports = { configPaths };