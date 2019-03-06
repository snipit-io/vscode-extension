import { window } from 'vscode';

import { doSearch } from '../api';
import quickPick from './quickPick';


export default async function promptSearch() {
    const query = await window.showInputBox({
        prompt: 'search for snippets...',
        validateInput: (text: string): string | undefined => (!text ? 'must include search terms' : undefined),
    });
    
    if (query) {
        doSearch(query)
            .then((snippets) => {
                quickPick(snippets);
            }).catch(error => window.showErrorMessage(error));
    } else {
        window.showErrorMessage('No search term was provided.');
    }
}
