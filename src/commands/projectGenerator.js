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
            const makeDefsContent = this.generateMakeDefs(appName);

            await this.writeFile(projectPath, 'Makefile', makefileContent);
            await this.writeFile(projectPath, `${appName}_main.c`, mainContent);
            await this.writeFile(projectPath, 'Kconfig', kconfigContent);
            await this.writeFile(projectPath, 'Make.defs', makeDefsContent);
            await this.modifyKconfig(appName);

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

    generateMainC(appName, description, author) { //Имя точки входа в программу всегда должно оканчиваться на _main.c!
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

int ${appName}_main(int argc, FAR char *argv[])    
{
  printf("Hello from ${appName}!\\n");
  return 0;
}
`;
    }

    generateKconfig(appName, description, priority, stacksize) { //Здесь был tristate, что не очень хорошо подходит для обычных приложений NuttX
        const configName = appName.toUpperCase();
        return `config ${configName}
\tbool "${description}"               
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

    
    generateMakeDefs(appName) {                    //Функция для создания обязательного файла Make.defs
        const configName = appName.toUpperCase();
        return `ifeq ($(${configName}),y)
CONFIGURED_APPS += $(APPDIR)/${appName}
endif
                `;
    }
                
    async modifyKconfig(appName) {
        const nuttxAppPath = vscode.workspace.getConfiguration('nuttx'); //Читаем переменную, которая хранит путь до папки appd
        let appsPath = nuttxAppPath.get('appsPath');                     //Сохраняем путь, как он есть

        //Обязательная проверка, существует ли путь
        if (!appsPath) {
            vscode.window.showErrorMessage('NuttX path not configured!');
            return;
        }

        //Вот тут главная "магия" - нужно прочитать Kconfig из nuttxspace/apps
        //Пока тут абсолютный путь
        const kconfigUri = vscode.Uri.joinPath(vscode.Uri.file(appsPath), 'Kconfig');
        const lineToAdd = `source "${appsPath}/${appName}/Kconfig"`; 

        //Чтение файла
        let bytes;
        try {
            bytes = await vscode.workspace.fs.readFile(kconfigUri);
        } catch (error) {
            vscode.window.showErrorMessage(`Cannot read Kconfig at: ${kconfigUri.fsPath}`);
        }

        const text = new TextDecoder('utf-8').decode(bytes);

        const already = text.split(/\r?\n/).some(l => l.trim() === lineToAdd);
        if (already) {
            return; 
        }

        const needsNewline = text.length > 0 && !text.endsWith('\n');
        const newText = text + (needsNewline ? '\n' : '') + lineToAdd + '\n';

        await vscode.workspace.fs.writeFile(
            kconfigUri,
            new TextEncoder().encode(newText)
        );
        
    }
        

}

module.exports = { NuttXAppGenerator };
