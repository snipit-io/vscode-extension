import { window } from 'vscode';


export default function insertSnippet(text: string) {
    const editor = window.activeTextEditor;
    
    if (!editor) {
        return;
    }

    editor.edit(edit => (
        editor!.selections.forEach(
            selection => {
                edit.delete(selection);
                edit.insert(selection.start, text);
            }
        )
    ));
}
