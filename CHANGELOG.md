
# Changelog

All project changes are documented here.

## Version 0.2.0 (2025-12-22)

### Fix

- A critical error has been fixed that prevented calling the terminal common to all functions.

## Version 0.1.12 (2025-12-22)

### Fix

- The `publisher` field has been removed from the `package.json` file.
- In the `terminal.js` file, the value of the `cwd` field has been corrected in the `initTerminal` function.

## Version 0.1.11 (2025-12-22)

### Fix

- The `Clean` function now cleans the project without deleting configuration files.
- The `Clean all` feature has been added to completely clean the project.
- When an error appears about the absence of the `nuttx` configuration paths when executing the `Clean` and `Clean all` commands, their configuration became available.
- Fixed the import of the `configPaths` function in the `cleanProject` and `cleanAllProject` files.
- Added the definition `onCommand:nuttx-helper.CleanAll` to the `activationEvents` section of the `package.json` file.
- Two icons with `.png` and `.svg` extensions have been added to the `icon` folder.
- The `publisher` and `description` fields with appropriate content have been added to the `package.json` file.
- In the `extension.js` file, a terminal is created when the extension starts, making it available for use by other commands. 
This was implemented to avoid creating a large number of terminals when executing commands, which could consume RAM.

## Version 0.1.10 (2025-12-18)

### Fix

- Fixed an error in generating Make.defs content.

## Version 0.1.9 (2025-12-18)

### Fix

- Fixed an issue that caused the loss of previously configured paths to the `apps` and `nuttx` directories after creating a new project.
- When creating a project, the path to the `Kconfig` file is now automatically written to the `Kconfig` file in the `apps` directory.

## Version 0.1.8 (2025‑12‑18)

### Fix

- The Make.defs file has been added to the project files.
- The name of the entry point to the user program is formed according to the principle of {project name}_main.c.
- The project's Kconfig file specifies the bool data type for the project description.

## Version 0.1.7 (2025‑12‑17)

### Features

All features have their own keyboard shortcuts for invocation. Full list:

- `ctrl+shift+n` — create a new project.
- `ctrl+shift+s` — select the target board or microcontroller.
- `ctrl+shift+m` — configure the target board or microcontroller via `menuconfig`.
- `ctrl+shift+p` — set up paths to the `apps` and `nuttx` folders in the Apache NuttX distribution.
- `ctrl+shift+r` — configure the tool for writing the program to the microcontroller’s memory.
- `ctrl+shift+i` — display information about the extension version.
- `ctrl+shift+c` — clean the project.
- `ctrl+shift+b` — compile the project.

## Version 0.1.6 (2025-12-16)

### Work in Progress

- Implemented a mechanism for selecting the target architecture for the **Run configurations** function.
- The architecture selected by the user is saved in the extension settings file.
- Implemented a mechanism for selecting programming tools for ARM microcontrollers for the **Run configurations** function.
- The tool selected by the user is saved in the extension settings file.
- To the package file.The **selectedPlatform**, **selectedUSB** and **SelectedTool** fields have been added to json.

### Fix

- In the file CHANGELOG.md fixed an error in naming version 0.1.5.

## Version 0.1.5 (2025-12-15)

### Work in Progress

- The name of the **Configure USB port** command has been changed to **Run configurations**.

### Fix

- The full name of the developer has been added to the license header.

## Version 0.1.4 (2025-12-12)

### Work in Progress

- Added a placeholder («stub») for the **Configure USB port** command.

## Version 0.1.3 (2025-12-12)

### Features

- Added the **Configure paths** command to set up paths to the `apps` and `nuttx` directories of the Apache NuttX distribution.
- Added the **Set board** command to search for and select the target board or microcontroller.
- Added the **Configure board** command to launch `menuconfig`.
- Added the **Create NuttX project** command to generate the required file and folder structure for a project.
- Added the **Clean project** command to clean the project.
- Added the **Build project** command to build the project.
- Added the **Information** command to display the extension version.
- Implemented the ability to enter commands via the VSCode command line.
- The created project is automatically added to the editor's workspace.
