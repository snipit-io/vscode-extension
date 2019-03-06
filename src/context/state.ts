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

export function setState(key: string, value: any): Thenable<void> {
    if (!appContext) {
        throw new Error('App context not registered.');
    }

    return appContext.globalState.update(key, value);
}

export function unsetState(key: string): Thenable<void> {
    return setState(key, undefined);
}

export function getState<T>(key: string): T | undefined {
    if (!appContext) {
        throw new Error('App context not registered.');
    }

    return appContext.globalState.get<T>(key);
}
