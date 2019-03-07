import { window } from 'vscode';

import { setAuthToken, clearAuthToken } from '../context/auth';
import { pingAuthServer } from '../api';


export default async function promptActivation(): Promise<boolean> {
    const token = await window.showInputBox({
        placeHolder: 'Paste your activation key here',
        prompt: 'Log in to Snipit.io and navigate to https://snipit.io/activate/vscode to get your key.',
        validateInput: (text: string): string | undefined => (
            !text ? 'Paste your activation key here...' : undefined
        ),
    });
    
    if (token) {
        return setAuthToken(token)
            .then(() => pingAuthServer())
            .then((isAuth) => {
                if (!isAuth) {
                    clearAuthToken();
                    throw new Error('Activation token is not valid.');
                } else {
                    return true;
                }
            });
    } else {
        throw new Error('No activation token was provided.');
    }
}
