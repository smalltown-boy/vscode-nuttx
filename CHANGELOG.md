# Changelog

All project changes are documented here.

## Version 0.1.6 (2025-12-16)

### Work in Progress

- Implemented a mechanism for selecting the target architecture for the **Run configurations** function.
- The architecture selected by the user is saved in the extension settings file.
- Implemented a mechanism for selecting programming tools for ARM microcontrollers for the **Run configurations** function.
- The tool selected by the user is saved in the extension settings file.
- "selectedPlatform", "selectedUSB" and "SelectedTool" fields have been added to package.json.

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