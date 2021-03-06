"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// const neeSanTachi = ['Asuna', 'Balalaika', 'Cammie', 'Daresu', 'Freya'];

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('"terminee" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let sendTo1 = vscode.commands.registerCommand("terminee.sendToAsuna", () => {
    if (vscode.window.activeTextEditor) {
      sendToTerminal(
        vscode.window.terminals,
        0,
        vscode.window.activeTextEditor
      );
    }
  });
  let sendTo2 = vscode.commands.registerCommand(
    "terminee.sendToBalalaika",
    () => {
      if (vscode.window.activeTextEditor) {
        sendToTerminal(
          vscode.window.terminals,
          1,
          vscode.window.activeTextEditor
        );
      }
    }
  );
  let sendTo3 = vscode.commands.registerCommand("terminee.sendToCammie", () => {
    if (vscode.window.activeTextEditor) {
      sendToTerminal(
        vscode.window.terminals,
        2,
        vscode.window.activeTextEditor
      );
    }
  });
  let sendTo4 = vscode.commands.registerCommand("terminee.sendToDaresu", () => {
    if (vscode.window.activeTextEditor) {
      sendToTerminal(
        vscode.window.terminals,
        3,
        vscode.window.activeTextEditor
      );
    }
  });
  let sendTo5 = vscode.commands.registerCommand("terminee.sendToFreya", () => {
    if (vscode.window.activeTextEditor) {
      sendToTerminal(
        vscode.window.terminals,
        4,
        vscode.window.activeTextEditor
      );
    }
  });

  context.subscriptions.push(sendTo1);
  context.subscriptions.push(sendTo2);
  context.subscriptions.push(sendTo3);
  context.subscriptions.push(sendTo4);
  context.subscriptions.push(sendTo5);
}

function sendToTerminal(
  terms: ReadonlyArray<vscode.Terminal>,
  idx: number,
  editor: vscode.TextEditor
) {
  if (terms[idx]) {
    const term = terms[idx];
    const cmd = getCommand(editor);
    if (cmd) {
      term.sendText(cmd);
      term.show(true);
    }
  } else {
    createMissingTerminals(idx);
    sendToTerminal(vscode.window.terminals, idx, editor);
  }
}

function createMissingTerminals(idx: number) {
  while (!vscode.window.terminals[idx]) {
    vscode.window.createTerminal();
  }
}

function getCommand(editor: vscode.TextEditor): string | undefined {
  if (editor.selections.length > 1) {
    return undefined;
  }

  if (editor.selection.isEmpty) {
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
export function deactivate() {}
