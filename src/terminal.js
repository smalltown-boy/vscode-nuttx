const vscode = require("vscode");

// Глобальная переменная для хранения терминала
let globalTerminal = null;

async function initTerminal(nuttxPath) {
  try {
    // Проверяем, есть ли уже терминал
    if (globalTerminal) {
      vscode.window.showInformationMessage('NuttX terminal already exists.');
      return globalTerminal;
    }

    // Создаём терминал с указанным путём
    globalTerminal = vscode.window.createTerminal({
      name: 'NuttX Terminal',
      cwd: nuttxPath,
    });

    vscode.window.showInformationMessage('NuttX terminal initialized.');
    
    return globalTerminal;
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to create terminal: ${error.message}`);
    return null;
  }
}

// Функция для получения текущего терминала
function getTerminal() {
  return globalTerminal;
}

// Функция для закрытия терминала
function disposeTerminal() {
  if (globalTerminal) {
    globalTerminal.dispose();
    globalTerminal = null;
    vscode.window.showInformationMessage('NuttX terminal disposed.');
  }
}

module.exports = {
  initTerminal,
  getTerminal,
  disposeTerminal
};
