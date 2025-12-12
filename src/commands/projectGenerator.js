const vscode = require('vscode');

class NuttXAppGenerator {

    /**
     * Создание приложения NuttX.
     * @param appName  название приложения
     * @param projectPath Uri — полный путь к создаваемой директории!
     */
    async createNuttXApp({ appName, projectPath, description, author, priority, stacksize }) {
        try {
            // Создаём директорию приложения
            await vscode.workspace.fs.createDirectory(projectPath);

            // Генерируем файлы
            const makefileContent = this.generateMakefile(appName);
            const mainContent = this.generateMainC(appName, description, author);
            const kconfigContent = this.generateKconfig(appName, description, priority, stacksize);

            await this.writeFile(projectPath, 'Makefile', makefileContent);
            await this.writeFile(projectPath, `${appName}_main.c`, mainContent);
            await this.writeFile(projectPath, 'Kconfig', kconfigContent);

            return {
                success: true,
                message: `Application "${appName}" has been successfully created!`,
                folder: projectPath.fsPath
            };
        } catch (error) {
            throw new Error(`Ошибка создания приложения: ${error.message}`);
        }
    }

    async writeFile(basePath, filename, content) {
        const fileUri = vscode.Uri.joinPath(basePath, filename);
        const buffer = Buffer.from(content, 'utf8');
        await vscode.workspace.fs.writeFile(fileUri, buffer);
    }

    generateMakefile(appName) {
        return `include $(APPDIR)/Make.defs

PROGNAME  = ${appName}
PRIORITY  = SCHED_PRIORITY_DEFAULT
STACKSIZE = $(CONFIG_${appName.toUpperCase()}_STACKSIZE)
MODULE    = $(CONFIG_${appName.toUpperCase()})

MAINSRC = ${appName}_main.c

include $(APPDIR)/Application.mk
`;
    }

    generateMainC(appName, description, author) {
        const date = new Date().toISOString().split('T')[0];
        return `/****************************************************************************
 * ${appName}/${appName}_main.c
 *
 * ${description}
 *
 * Author: ${author}
 * Date: ${date}
 *
 ****************************************************************************/

#include <nuttx/config.h>
#include <stdio.h>

/****************************************************************************
 * Public Functions
 ****************************************************************************/

int main(int argc, FAR char *argv[])
{
  printf("Hello from ${appName}!\\n");
  return 0;
}
`;
    }

    generateKconfig(appName, description, priority, stacksize) {
        const configName = appName.toUpperCase();
        return `config ${configName}
\ttristate "${description}"
\tdefault n
\t---help---
\t\t${description}

if ${configName}

config ${configName}_PRIORITY
\tint "Task priority"
\tdefault ${priority}

config ${configName}_STACKSIZE
\tint "Stack size"
\tdefault ${stacksize}

endif
`;
    }
}

module.exports = { NuttXAppGenerator };
