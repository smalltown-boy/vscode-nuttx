const vscode = require("vscode");

const { configPaths } = require('../commands/configPaths');
const terminalManager = require('../terminal');

async function cleanProject() {
  const config = vscode.workspace.getConfiguration('nuttx');
  let nuttxPath = config.get('nuttxPath');

  if (!nuttxPath) {
    const choice = await vscode.window.showErrorMessage(
      'NuttX paths not configured!', 
      { modal: true }, 
      'Configure paths'
    );

    if (choice === 'Configure paths') {
      await configPaths(); // Используем существующую функцию
      nuttxPath = vscode.workspace.getConfiguration('nuttx').get('nuttxPath'); // Обновляем значение
      
      if (!nuttxPath) {
        return; // Пользователь отменил выбор
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

  // Продолжаем выполнение
  const terminal = terminalManager.getTerminal()
    
  if(terminal) {
    terminal.show();
    terminal.sendText('make clean', true);
    vscode.window.showInformationMessage("Cleaning the project...");
  } else {
    vscode.window.showInformationMessage("Terminal not initialized!");
  } 
}

module.exports = { cleanProject };