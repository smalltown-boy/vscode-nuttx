const vscode = require("vscode");
const { NuttXAppGenerator } = require('./projectGenerator');

async function createNuttXProject() {
  const generator = new NuttXAppGenerator();

  // 1. Выбор директории для проекта
  const projectUri = await vscode.window.showOpenDialog({
    canSelectFiles: false,
    canSelectFolders: true,
    canSelectMany: false,
    openLabel: 'Select Project Location',
    title: 'Select folder for new NuttX project'
  });

  if (!projectUri || projectUri.length === 0) {
    vscode.window.showWarningMessage('Project creation cancelled: no folder selected');
    return;
  }

  const parentFolder = projectUri[0];

  // 2. Имя проекта
  const armProjectName = await vscode.window.showInputBox({
    prompt: "Enter project name:",
    placeHolder: "sample_project",
    validateInput: async (value) => {
      if (!value || value.trim().length === 0) {
        return 'Project name cannot be empty';
      }
      if (!/^[a-zA-Z0-9-_]+$/.test(value)) {
        return 'Project name can only contain letters, numbers, hyphens and underscores';
      }

      const fullPathUri = vscode.Uri.joinPath(parentFolder, value);

      try {
        await vscode.workspace.fs.stat(fullPathUri);
        return `Folder "${value}" already exists in selected directory`;
      } catch {}
      return null;
    }
  });

  if (!armProjectName) {
    vscode.window.showWarningMessage('Project creation cancelled');
    return;
  }

  // 3. Имя разработчика
  const developerName = await vscode.window.showInputBox({
    prompt: 'Enter developer name',
    placeHolder: 'Ivan Petrov',
    value: 'Unknown Developer'
  });

  const author = (developerName || '').trim() || 'Unknown Author';

  // 4. Описание
  const projectDescription = await vscode.window.showInputBox({
    prompt: 'Enter project description',
    placeHolder: 'NuttX application for ARM',
    value: 'NuttX ARM application'
  });

  const description = (projectDescription || '').trim() || 'NuttX ARM application';

  // 5. Stack size
  const stackSizeInput = await vscode.window.showInputBox({
    prompt: 'Enter stack size (bytes)',
    placeHolder: '2048',
    value: '2048',
    validateInput: (value) => {
      const num = parseInt(value);
      if (isNaN(num) || num <= 0) return 'Stack size must be a positive number';
      return null;
    }
  });

  const stacksize = parseInt(stackSizeInput || '2048');

  // 6. Priority
  const priorityInput = await vscode.window.showInputBox({
    prompt: 'Enter task priority (0-255)',
    placeHolder: '100',
    value: '100',
    validateInput: (value) => {
      const num = parseInt(value);
      if (isNaN(num) || num < 0 || num > 255) return 'Priority must be between 0 and 255';
      return null;
    }
  });

  const priority = parseInt(priorityInput || '100');

  // Готовый путь приложения
  const fullProjectPathUri = vscode.Uri.joinPath(parentFolder, armProjectName);

  // Создание проекта
  try {
    const result = await generator.createNuttXApp({
      appName: armProjectName,
      projectPath: fullProjectPathUri,
      description,
      author,
      priority,
      stacksize
    });

    // Теперь нужно добавить созданную папку в workspace
    const projectUri = vscode.Uri.file(parentFolder);
    vscode.workspace.updateWorkspaceFolders(0, 0, [{ uri: projectUri }]);
    await vscode.commands.executeCommand('workbench.view.explorer');
    await vscode.commands.executeCommand('list.focusFirst');
    // Конец тестового кода

    vscode.window.showInformationMessage(result.message);
  } catch (err) {
    vscode.window.showErrorMessage(`Failed to create project: ${err.message}`);
  }
}

module.exports = { createNuttXProject };
