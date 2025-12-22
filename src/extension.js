const vscode = require("vscode");
const { NuttxTreeProvider } = require('./nuttxTreeProvider');
const { initTerminal } = require('./terminal');

let nuttxTerminal = undefined;

const { printInfo } = require('./commands/printInfo');
const { cleanProject } = require('./commands/cleanProject');
const { cleanAllProject } = require('./commands/cleanAllProject');
const { buildProject } = require('./commands/buildProject');
const { configPaths } = require('./commands/configPaths');
const { setBoard } = require('./commands/setBoard');
const { configBoard } = require('./commands/configBoard');
const { createNuttXProject } = require('./commands/createNuttXProject');
const { configRun } = require('./commands/configRun');

module.exports = {
  activate,
  deactivate,
  nuttxTerminal,              // Обязательно экспортируем, чтобы можно было везхде использовать
};

// This method is called when your extension is activated
function activate(context) {
  // А здесь происходит инициализация терминала, чтобы каждый раз его не вызывать и не тратить память
  initTerminal();
  // Отображаем команды расширения в панели команд
  const treeProvider = new NuttxTreeProvider();
  vscode.window.registerTreeDataProvider('nuttxCommands', treeProvider);

  context.subscriptions.push(
    vscode.commands.registerCommand('nuttx-helper.refreshCommands', () => {
      treeProvider.refresh();
    })
  );

  const commandInfo = "nuttx-helper.Info";
  const commandCreate = "nuttx-helper.CreateNuttXProject";
  const commandClean = "nuttx-helper.Clean";
  const commandCleanAll = "nuttx-helper.CleanAll";
  const commandBuild = "nuttx-helper.Build";
  const commandSetBoard = "nuttx-helper.SetBoard";
  const commandConfigBoard = "nuttx-helper.ConfigBoard";
  const commandConfigPaths = "nuttx-helper.ConfigPaths";
  const commandConfigRun = "nuttx-helper.ConfigRun";

  let pInfo = vscode.commands.registerCommand(commandInfo, printInfo);
  let pCreate = vscode.commands.registerCommand(commandCreate, createNuttXProject);
  let pClean = vscode.commands.registerCommand(commandClean, cleanProject);
  let pCleanAll = vscode.commands.registerCommand(commandCleanAll, cleanAllProject);
  let pBuild = vscode.commands.registerCommand(commandBuild, buildProject);
  let pSetBoard = vscode.commands.registerCommand(commandSetBoard, setBoard);
  let pConfigBoard = vscode.commands.registerCommand(commandConfigBoard, configBoard);
  let pConfigPaths = vscode.commands.registerCommand(commandConfigPaths, configPaths);
  let pConfigRun = vscode.commands.registerCommand(commandConfigRun, configRun);

  context.subscriptions.push(pInfo);
  context.subscriptions.push(pCreate);
  context.subscriptions.push(pClean);
  context.subscriptions.push(pCleanAll);
  context.subscriptions.push(pBuild);
  context.subscriptions.push(pSetBoard);
  context.subscriptions.push(pConfigBoard);
  context.subscriptions.push(pConfigPaths);
  context.subscriptions.push(pConfigRun);

  // Инициализируем терминал один для всех функций!
  nuttxTerminal = initTerminal();
}

// this method is called when your extension is deactivated
function deactivate() {
  // Когда расширение заканчивает работу, закрываем терминал
  if(nuttxTerminal) {
    nuttxTerminal.dispose();
    nuttxTerminal = undefined;
  }
}
