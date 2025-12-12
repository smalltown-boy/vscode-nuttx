# VSCode Extension for Apache NuttX


This extension is designed to simplify the creation and building of projects for the Apache NuttX real‑time operating system.

## Description

This project is created for embedded software developers working with microcontrollers that use the Apache NuttX real‑time operating system. It automates most routine tasks, eliminating the need for developers to constantly enter commands in the terminal.

## Features

* **Easy setup**: before starting, you need to specify the paths to the `apps` and `nuttx` folders in your NuttX distribution.
* **Automatic project folder and file creation**: the generated `Kconfig`, `Makefile`, and `main.c` files include the minimum required content to get started.
* **Command input options**: commands can be entered either via the VS Code command line or using buttons located on the editor’s sidebar.
* **Simple microcontroller search**: find target microcontrollers by their full or partial name (as supported by the operating system itself).

## Installation

### Building from Source

1. Install Node.js and npm (Node Package Manager):

   ```bash
   sudo apt update
   sudo apt install nodejs npm
   ```

   After installation, verify the installed software versions:

   ```bash
   node -v
   npm -v
   ```

2. Clone the extension source code from the repository:

   ```bash
   git clone https://github.com/smalltown-boy/vscode-nuttx.git
   cd vscode-nuttx
   ```

3. Build the project:

   ```bash
   npm run compile
   ```

4. Install the `vsce` tool to package the extension into the VSIX format:

   ```bash
   npm install -g @vscode/vsce
   ```

5. Package the project:

   ```bash
   vsce package
   ```

   A file with the `*.vsix` extension will appear in the root folder.

### Adding the Extension to VS Code

1. Open VS Code.
2. Press `Ctrl+Shift+X` to go to the **Extensions** section.
3. In the menu, select **Install from VSIX...** and choose the generated file.
4. Restart VS Code to apply the changes.

If you have downloaded a pre‑built release, you only need to install the extension in VS Code.