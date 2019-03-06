import { setState, getState, unsetState } from './state';

const stateKey = 'auth-token';

export function setAuthToken(token: string): Thenable<void> {
    return setState(stateKey, token);
}

export function getAuthToken(): string | undefined {
    return getState<string>(stateKey);
}

export function clearAuthToken(): Thenable<void> {
    return unsetState(stateKey);
}
