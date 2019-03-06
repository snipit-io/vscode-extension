import { window, QuickPickItem } from 'vscode';

import insertSnippet from './insertSnippet';


export default async function quickPick(resultItems: any[]) {
    const quickPickItems: QuickPickItem[] = resultItems.map(result => ({
        label: result.title,
        detail: result.code,
        // description: result.Language.name,
        description: result.Category && result.Category.name || 'uncategorized',
    }));

    const result = await window.showQuickPick(quickPickItems, {
		onDidSelectItem: (item: QuickPickItem) => {
            // window.showInformationMessage(item.label);
        },
    });
    
    if (result) {
        // window.showInformationMessage(`Got: ${result.label}`);
        insertSnippet(result.detail!);
    }
}
