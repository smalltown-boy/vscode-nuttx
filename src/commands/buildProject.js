const vscode = require("vscode");
const extension = require('../extension');

async function buildProject() {
  const config = vscode.workspace.getConfiguration('nuttx');
  let nuttxPath = config.get('nuttxPath');

  if (!nuttxPath) {
    const choice = await vscode.window.showErrorMessage(
      'NuttX paths not configured!', 
      { modal: true }, 
      'Configure paths'
    );

    if (choice === 'Configure paths') {
      await configPaths(); 
      nuttxPath = vscode.workspace.getConfiguration('nuttx').get('nuttxPath'); // Обновляем значение
      
      if (!nuttxPath) {
        return; 
      }
    } else {
      return;
    }
  }

  const uri = vscode.Uri.file(nuttxPath);

  try {
    const stat = await vscode.workspace.fs.stat(uri);
    
    if (stat.type !== vscode.FileType.Directory) {
      const choice = await vscode.window.showErrorMessage(
        `Path "${nuttxPath}" is not a directory.`, 
        { modal: true }, 
        'Configure paths'
      );

      if (choice === 'Configure paths') {
        await configPaths();
        nuttxPath = vscode.workspace.getConfiguration('nuttx').get('nuttxPath');
        
        if (!nuttxPath) {
          return;
        }
      } else {
        return;
      }
    }
  } catch {
    const choice = await vscode.window.showErrorMessage(
      'NuttX path does not exist!', 
      { modal: true }, 
      'Configure paths'
    );

    if (choice === 'Configure paths') {
      await configPaths();
      nuttxPath = vscode.workspace.getConfiguration('nuttx').get('nuttxPath');
      
      if (!nuttxPath) {
        return;
      }
    } else {
      return;
    }
  }

  const terminal = extension.nuttxTerminal;

  if(terminal) {
    terminal.show();
    terminal.sendText('make', true);
    vscode.window.showInformationMessage("Build NuttX...");
  } else {
    vscode.window.showInformationMessage("Terminal not initialized!");
  }
}

module.exports = { buildProject };