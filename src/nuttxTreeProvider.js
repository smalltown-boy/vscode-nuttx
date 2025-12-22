const vscode = require('vscode');

class NuttxTreeProvider {
  constructor() {
    this._onDidChangeTreeData = new vscode.EventEmitter();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
  }

  refresh() {
    this._onDidChangeTreeData.fire(undefined);
  }

  getTreeItem(element) {
    return element;
  }

  getChildren(element) {
    if (!element) {
      // Корневые элементы
      return [
        new TreeItem('Build project', 'nuttx-helper.Build', vscode.TreeItemCollapsibleState.None, 'play'),
        new TreeItem('Clean', 'nuttx-helper.Clean', vscode.TreeItemCollapsibleState.None, 'trash'),
        new TreeItem('Clean all', 'nuttx-helper.CleanAll', vscode.TreeItemCollapsibleState.None, 'trash'),
        new TreeItem('Configure paths', 'nuttx-helper.ConfigPaths', vscode.TreeItemCollapsibleState.None, 'wrench'),
        new TreeItem('Set board', 'nuttx-helper.SetBoard', vscode.TreeItemCollapsibleState.None, 'gear'),
        new TreeItem('Configure board', 'nuttx-helper.ConfigBoard', vscode.TreeItemCollapsibleState.None, 'gear'),
        new TreeItem('Information', 'nuttx-helper.Info', vscode.TreeItemCollapsibleState.None, 'info'),
        new TreeItem('Create NuttX project', 'nuttx-helper.CreateNuttXProject', vscode.TreeItemCollapsibleState.None, 'wrench'),
        new TreeItem('Run configurations', 'nuttx-helper.ConfigRun', vscode.TreeItemCollapsibleState.None, 'gear'),
      ];
    }
    return [];
  }
}

class TreeItem extends vscode.TreeItem {
  constructor(label, command, collapsibleState, iconName) {
    super(label, collapsibleState);
    this.label = label;
    this.command = {
      command: command,
      title: label
    };
    if (iconName) {
      this.iconPath = new vscode.ThemeIcon(iconName);
    }
  }
}

module.exports = {
  NuttxTreeProvider
};