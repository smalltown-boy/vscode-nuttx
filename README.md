# VSCode Extension for Working with Apache NuttX

This extension is designed to make it easier to create and build projects for the Apache NuttX real‑time operating system.

## Description

This project is created for developers of embedded software for microcontrollers using the Apache NuttX real‑time operating system. It automates most of the work, eliminating the need for developers to constantly enter commands in the terminal.

## Functionality

* **Easy setup**: before starting work, you need to specify the paths to the `apps` and `nuttx` folders in the NuttX distribution.
* **Automatic creation of project folders and files**: the `Kconfig`, `Makefile`, and `main.c` files contain the minimum required to get started.
* **Command input** can be done either via the VSCode command line or using buttons located on the editor’s sidebar.
* **Simple search for the target microcontroller** by its full or partial name (as supported by the operating system itself).

## Installation

### Building from Source Code

1. Install Node.js and npm (Node Package Manager):

    ```bash
    sudo apt update
    sudo apt install nodejs npm
    ```

    After installation, check the versions of the installed software:

    ```bash
    node -v
    npm -v
    ```

2. Clone the extension’s source code from the repository:

    ```bash
    git clone https://github.com/smalltown-boy/vscode-nuttx.git
    cd vscode-nuttx
    ```

3. Install the TypeScript code compilation tool:

    ```bash
    npm install -g typescript
    ```

4. Build the project:

    ```bash
    npm run compile
    ```

5. Install the `vsce` tool to package the extension into the VSIX format:

    ```bash
    npm install -g @vscode/vsce
    ```

6. Package the project:

    ```bash
    vsce package
    ```

    A file with the `.vsix` extension will appear in the root folder.

### Adding the Extension to VSCode

1. Open VSCode.
2. Press `Ctrl+Shift+X` to go to the **Extensions** section.
3. In the menu, select **Install from VSIX...** and choose the generated file.
4. Restart VSCode to apply the changes.

If you have downloaded a ready‑made release, you only need to install the extension in VSCode.