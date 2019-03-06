import { getContext } from './index';

export function setState(key: string, value: any): Thenable<void> {
    if (!getContext()) {
        throw new Error('App context not registered.');
    }

    return getContext().globalState.update(key, value);
}

export function unsetState(key: string): Thenable<void> {
    return setState(key, undefined);
}

export function getState<T>(key: string): T | undefined {
    if (!getContext()) {
        throw new Error('App context not registered.');
    }

    return getContext().globalState.get<T>(key);
}
