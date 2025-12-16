const vscode = require("vscode");

async function configRun() {
    vscode.window.showInformationMessage("Configure run...");

    const selectedPlatform = await vscode.window.showQuickPick(
        [
            { label: 'ARM', description: 'Select ARM architecture' },
            { label: 'ESP', description: 'Select ESP architecture' }
        ],
        {
            placeHolder: 'Select target platform for new NuttX project',
            title: 'NuttX Project Platform'
        }
    );

// Проверка, что пользователь сделал выбор, либо его отменил
if (!selectedPlatform) {
    vscode.window.showWarningMessage('The architecture was not chosen');
    return; 
}

// Сохраняем то, что выбрали
const platform = selectedPlatform.label; // Либо STM32, либо ESP32

// Теперь нужно сохранить настрйоки, как в configPaths и прочих функциях:
const config = vscode.workspace.getConfiguration('nuttx');
await config.update('selectedPlatform', platform, vscode.ConfigurationTarget.Workspace);

// Теперь смотрим, что выбрал пользователь выбрал
if(platform === 'ARM') {
    const selectedTools = await vscode.window.showQuickPick(
    [
        { label: 'stm32flash', description: 'Programming the chip via a standard UART bootloader' },
        { label: 'st-flash', description: 'Programming through a prorgammator ST-Link' },
        { label: 'OpenOCD', description: 'An open debugging and firmware tool via JTAG/SWD' },
    ],
    {
        placeHolder: 'Choose a chip programming tool',
        title: 'NuttX Programming Tool'
    }
    );

    if(!selectedTools) {
        vscode.window.showWarningMessage('Programming tools was not chosen');
        return;
    }

    // Сохраняем инструмент для работы
    const tool = selectedTools.label;
    const toolConfig = vscode.workspace.getConfiguration('nuttx');
    await toolConfig.update('selectedTool', tool, vscode.ConfigurationTarget.Workspace);

}
else if(platform === 'ESP') {
    vscode.window.showInformationMessage("Choose ESP");
}


        /*
    try {
        const usb_devices = await navigator.usb.getDevices();
        console.log('Подключенные USB-устройства:', usb_devices);
        vscode.window.showInformationMessage(usb_devices);
        return usb_devices;
    } catch (error) {
        console.error('Ошибка при получении USB-устройств:', error);
    }
        */
}

module.exports = { configRun };