import { ExtensionContext } from 'vscode';

let appContext: ExtensionContext;

export function registerContext(context: ExtensionContext) {
    appContext = context;
}

export function unregisterContext() {
    // clean up somehow?...
}

export function getContext(): ExtensionContext {
    return appContext;
}
