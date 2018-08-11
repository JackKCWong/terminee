'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('"terminee" is now active!');

    const terms: vscode.Terminal[] = [];

    vscode.window.onDidCloseTerminal(t => {
        for(let i = 0; i < terms.length; ++i) {
            if(terms[i]) {
                if(terms[i].name === t.name) {
                    console.log(`deleting ${t.name}`);
                    delete terms[i];
                }
            }
        }
    });

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let sendTo1 = vscode.commands.registerCommand('terminee.sendTo1', () => {
        if(vscode.window.activeTextEditor) {
            sendToTerminal(terms, 0, vscode.window.activeTextEditor);
        }
    });
    let sendTo2 = vscode.commands.registerCommand('terminee.sendTo2', () => {
        if(vscode.window.activeTextEditor) {
            sendToTerminal(terms, 1, vscode.window.activeTextEditor);
        }
    });
    let sendTo3 = vscode.commands.registerCommand('terminee.sendTo3', () => {
        if(vscode.window.activeTextEditor) {
            sendToTerminal(terms, 2, vscode.window.activeTextEditor);
        }
    });
    let sendTo4 = vscode.commands.registerCommand('terminee.sendTo4', () => {
        if(vscode.window.activeTextEditor) {
            sendToTerminal(terms, 3, vscode.window.activeTextEditor);
        }
    });
    let sendTo5 = vscode.commands.registerCommand('terminee.sendTo5', () => {
        if(vscode.window.activeTextEditor) {
            sendToTerminal(terms, 4, vscode.window.activeTextEditor);
        }
    });

    context.subscriptions.push(sendTo1);
    context.subscriptions.push(sendTo2);
    context.subscriptions.push(sendTo3);
    context.subscriptions.push(sendTo4);
    context.subscriptions.push(sendTo5);
}

function sendToTerminal(terms: vscode.Terminal[], idx: number, editor: vscode.TextEditor) {
    const term = getOrCreateTerminal(terms, idx);
    const cmd = getCommand(editor);
    if(cmd) {
        term.sendText(cmd);
        term.show(true);
    }
}

function getOrCreateTerminal(terms: vscode.Terminal[], idx: number): vscode.Terminal {
    if(!terms[idx]) {
        console.log(`creating terminee@${idx+1}`);
        terms[idx] = vscode.window.createTerminal(`terminee@${idx+1}`);
        terms[idx].show(true);
    }

    return terms[idx];
}

function getCommand(editor: vscode.TextEditor): string | undefined {
    if(editor.selections.length > 1) {
        return undefined;
    }

    if(editor.selection.isEmpty) {
        return getCurrenLine(editor);
    } else {
        return editor.document.getText(editor.selection);
    }
}

function getCurrenLine(editor: vscode.TextEditor): string {
    const lineno = editor.selection.active.line;
    return editor.document.lineAt(lineno).text;
}

// this method is called when your extension is deactivated
export function deactivate() {
}