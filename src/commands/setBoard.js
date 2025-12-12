const vscode = require("vscode");

const { configureBoard } = require('./configureBoard');

async function setBoard() {
  let selectedBoard = '';
  let nuttxPath = vscode.workspace.getConfiguration('nuttx').get('nuttxPath');

  if (!nuttxPath) {
    vscode.window.showErrorMessage('NuttX path not configured!');
    return;
  }

  try {
    const boardsPath = vscode.Uri.joinPath(
      vscode.Uri.file(nuttxPath), 
      'boards'
    );

    try {
      await vscode.workspace.fs.stat(boardsPath);
    } catch {
      vscode.window.showErrorMessage('boards folder not found in NuttX path!');
      return;
    }

    const boards = [];
    const architectures = await vscode.workspace.fs.readDirectory(boardsPath);

    for (const [archName, archType] of architectures) {
      if (archType !== vscode.FileType.Directory) continue;

      const archPath = vscode.Uri.joinPath(boardsPath, archName);
      const chips = await vscode.workspace.fs.readDirectory(archPath);

      for (const [chipName, chipType] of chips) {
        if (chipType !== vscode.FileType.Directory) continue;

        const chipPath = vscode.Uri.joinPath(archPath, chipName);
        const boardNames = await vscode.workspace.fs.readDirectory(chipPath);

        for (const [boardName, boardType] of boardNames) {
          if (boardType !== vscode.FileType.Directory) continue;

          // Проверяем наличие папки configs
          const configsPath = vscode.Uri.joinPath(chipPath, boardName, 'configs');
          try {
            await vscode.workspace.fs.stat(configsPath);

            // Обязательно изучаем конфигурацию, чтобы знать все варианты платы
            const configs = await vscode.workspace.fs.readDirectory(configsPath);

            for (const [configName, configType] of configs) {
              if (configType !== vscode.FileType.Directory) continue;

            boards.push({
                label: `${boardName}:${configName}`,
                description: `${archName}/${chipName}`,
                fullPath: `${archName}/${chipName}/${boardName}:${configName}`
              });
            }
          } catch {
            // Пропускаем папки без configs
          }
        }
      }
    }

    if (boards.length === 0) {
      vscode.window.showWarningMessage('No boards found in boards folder');
      return;
    }

    // Запрашиваем фильтр
    const searchTerm = await vscode.window.showInputBox({
      prompt: 'Enter board name to filter (e.g., nucleo, discovery)',
      placeHolder: 'nucleo'
    });

    if (!searchTerm) return;

    // Фильтруем платы
    const filteredBoards = boards.filter(board => 
      board.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      board.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredBoards.length === 0) {
      vscode.window.showWarningMessage(`No boards found matching "${searchTerm}"`);
      return;
    }

    // Показываем список для выбора
    const selected = await vscode.window.showQuickPick(filteredBoards, {
      placeHolder: `Select a board (${filteredBoards.length} found)`,
      matchOnDescription: true
    });

    if (selected) {
      selectedBoard = selected.label;
      const boardFullPath = selected.fullPath;
      
      vscode.window.showInformationMessage(`Board selected: ${selectedBoard} (${selected.description})`);
      
      // Сохраняем в конфигурацию
      await vscode.workspace.getConfiguration('nuttx').update(
        'selectedBoard', 
        selectedBoard, 
        vscode.ConfigurationTarget.Workspace
      );

      // Опционально: сохраняем полный путь для дальнейшего использования
      await vscode.workspace.getConfiguration('nuttx').update(
        'selectedBoardPath', 
        boardFullPath, 
        vscode.ConfigurationTarget.Workspace
      );
    }

    configureBoard(nuttxPath, selectedBoard);
    
  } catch (error) {
    vscode.window.showErrorMessage(`Error scanning boards: ${error.message}`);
  }
}

module.exports = { setBoard };