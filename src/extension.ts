// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { commands, ExtensionContext, window } from 'vscode';

import promptActivation from './controls/promptActivation';
import promptSearch from './controls/promptSearch';

import { registerContext, unregisterContext } from './context';
import { getAuthToken, clearAuthToken } from './context/auth';

// https://code.visualstudio.com/api/references/vscode-api


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
    registerContext(context);

    context.subscriptions.push(commands.registerCommand('extension.snipit', () => {
        // The code you place here will be executed every time your command is executed
        if (!getAuthToken()) {
            promptActivation();
        } else {
            promptSearch();
        }
    }));

    context.subscriptions.push(commands.registerCommand('extension.snipitLogout', () => {
        clearAuthToken()
            .then(() => {
               window.showInformationMessage('You have successfully cleared your Snipit.io credentials.');
            });
    }));
}

// this method is called when your extension is deactivated
export function deactivate() {
    unregisterContext();
    console.log('bye bye now...');
}
