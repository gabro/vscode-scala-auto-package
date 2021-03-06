// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { Position } from "vscode";
import { readFileSync } from "fs";
import * as path from "path";
import * as showdown from "showdown";

function announceDeprecation(context: vscode.ExtensionContext) {
  const panel = vscode.window.createWebviewPanel(
    "scala-auto-package-deprecation",
    "Scala auto package is deprecated",
    vscode.ViewColumn.Active
  );
  const md = readFileSync(
    path.join(context.extensionPath, "MIGRATING.md"),
    "utf8"
  );
  const mdConverter = new showdown.Converter();
  panel.webview.html = mdConverter.makeHtml(md);
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  announceDeprecation(context);

  const fileSystemWatcher = vscode.workspace.createFileSystemWatcher(
    "**/*.scala",
    false,
    true,
    true
  );
  fileSystemWatcher.onDidCreate(uri => {
    const { activeTextEditor } = vscode.window;
    if (
      activeTextEditor &&
      activeTextEditor.document.uri.path === uri.path &&
      activeTextEditor.document.getText() === ""
    ) {
      const sentinels = ["src/main/scala/", "src/test/scala/"];
      const matchingSentinel = sentinels.find(
        sentinel => uri.path.indexOf(sentinel) !== -1
      );
      if (matchingSentinel) {
        const packageName = uri.path
          .substring(
            uri.path.indexOf(matchingSentinel) + matchingSentinel.length
          )
          .split("/")
          .slice(0, -1)
          .join(".")
          .toLowerCase();
        if (packageName.length !== 0) {
          activeTextEditor.edit(editBuilder => {
            editBuilder.insert(
              new Position(0, 0),
              `package ${packageName}\n\n`
            );
          });
        }
      }
    }
  });
  context.subscriptions.push(fileSystemWatcher);
}

// this method is called when your extension is deactivated
export function deactivate() {}
