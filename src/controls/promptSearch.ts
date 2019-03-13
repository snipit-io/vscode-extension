import { window } from 'vscode';

import { doSearch } from '../api';
import quickPick from './quickPick';


export default async function promptSearch(): Promise<void> {
    const query = await window.showInputBox({
        prompt: 'search for snippets...',
        validateInput: (text: string): string | undefined => (!text ? 'must include search terms' : undefined),
    });

    if (!window.activeTextEditor) {
        throw new Error('You need to be in an active editor.');
    }

    if (query) {
        return doSearch(query)
            .then((snippets) => {
                quickPick(snippets);
            });
    } else {
        throw new Error('No search term was provided.');
    }
}
