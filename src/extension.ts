// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { commands, ExtensionContext } from 'vscode';

import promptActivation from './controls/promptActivation';
import promptSearch from './controls/promptSearch';

import { registerContext, unregisterContext, getAuthToken } from './context';
// https://code.visualstudio.com/api/references/vscode-api


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
    registerContext(context);

    const commandHandler = () => {
        // The code you place here will be executed every time your command is executed
        if (!getAuthToken()) {
            promptActivation();
        } else {
            promptSearch();
        }
    };

    const registeredCommand = commands.registerCommand('extension.snipit', commandHandler);
    context.subscriptions.push(registeredCommand);
}

// this method is called when your extension is deactivated
export function deactivate() {
    unregisterContext();
    console.log('bye bye now...');
}
