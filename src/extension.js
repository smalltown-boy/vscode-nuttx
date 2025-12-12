// The module 'vscode' contains the VS Code extensibility API
// import * as vscode from 'vscode';
const { NuttxTreeProvider } = require('./nuttxTreeProvider');

const vscode = require("vscode");

const { printInfo } = require('./commands/printInfo');
const { cleanProject } = require('./commands/cleanProject');
const { buildProject } = require('./commands/buildProject');
const { configPaths } = require('./commands/configPaths');
const { setBoard } = require('./commands/setBoard');
const { configBoard } = require('./commands/configBoard');
const { createNuttXProject } = require('./commands/createNuttXProject');

module.exports = {
  activate,
  deactivate,
};

// This method is called when your extension is activated
function activate(context) {
  // This must match the command field in the package.json
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
  const commandBuild = "nuttx-helper.Build";
  const commandSetBoard = "nuttx-helper.SetBoard";
  const commandConfigBoard = "nuttx-helper.ConfigBoard";
  const commandConfigPaths = "nuttx-helper.ConfigPaths";

  let pInfo = vscode.commands.registerCommand(commandInfo, printInfo);
  let pCreate = vscode.commands.registerCommand(commandCreate, createNuttXProject);
  let pClean = vscode.commands.registerCommand(commandClean, cleanProject);
  let pBuild = vscode.commands.registerCommand(commandBuild, buildProject);
  let pSetBoard = vscode.commands.registerCommand(commandSetBoard, setBoard);
  let pConfigBoard = vscode.commands.registerCommand(commandConfigBoard, configBoard);
  let pConfigPaths = vscode.commands.registerCommand(commandConfigPaths, configPaths);

  context.subscriptions.push(pInfo);
  context.subscriptions.push(pCreate);
  context.subscriptions.push(pClean);
  context.subscriptions.push(pBuild);
  context.subscriptions.push(pSetBoard);
  context.subscriptions.push(pConfigBoard);
  context.subscriptions.push(pConfigPaths);
}

// this method is called when your extension is deactivated
function deactivate() {}
