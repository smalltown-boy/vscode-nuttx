const vscode = require("vscode");

async function configRun() {
    vscode.window.showInformationMessage("Configure run...");

    try {
        const usb_devices = await navigator.usb.getDevices();
        console.log('Подключенные USB-устройства:', usb_devices);
        vscode.window.showInformationMessage(usb_devices);
        return usb_devices;
    } catch (error) {
        console.error('Ошибка при получении USB-устройств:', error);
    }
}

module.exports = { configRun };