const vscode = require("vscode");

async function addProjectToWorkspace(projectUri) {
    const workspaceFolders = vscode.workspace.workspaceFolders;

    // Если workspace не открыт — открываем новую папку
    if (!workspaceFolders || workspaceFolders.length === 0) {
        await vscode.commands.executeCommand('vscode.openFolder', projectUri);
        return;
    }

    // Проверяем, не добавлена ли папка уже
    const isAlreadyAdded = workspaceFolders.some(folder => 
        folder.uri.toString() === projectUri.toString()
    );

    if (isAlreadyAdded) {
        return; // Уже в workspace
    }

    // Добавляем папку в текущий workspace
    await vscode.commands.executeCommand(
        'vscode.openFolder',
        projectUri,
        { addToWorkspace: true }
    );
}

module.exports = {
  addProjectToWorkspace
};