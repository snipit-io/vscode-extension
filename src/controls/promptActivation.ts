import { window } from 'vscode';

import promptSearch from './promptSearch';
import { setAuthToken } from '../context';


export default async function promptActivation() {
    const token = await window.showInputBox({
        placeHolder: 'Paste your activation key here',
        prompt: 'Log in to Snipit.io and navigate to https://snipit.io/activate/vscode to get your key.',
        validateInput: (text: string): string | undefined => (
            !text ? 'Paste your activation key here...' : undefined
        ),
    });
    
    if (token) {
        setAuthToken(token)
            .then(() => promptSearch());
    } else {
        window.showErrorMessage('No activation token was provided.');
    }
}
