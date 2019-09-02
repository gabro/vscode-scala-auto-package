# ⚠️ Deprecating Scala auto package in favor of Metals

This extension existed as a temporary experiment, while this feature was being
considered for inclusion in Metals, the language server for Scala.

As of today, the same funcionality provided by this extension is implemented in
Metals, which means that:

- since it's implemented via LSP, it works across all editors supported by
  Metals
- a few corner cases are handled more appropriately

For these reasons, this extension is now deprecated in favor of Metals.

## Migrating to Metals

The migration from Scala auto package to Metals is very simple:

- Remove Scala auto package

- [Install Metals](https://scalameta.org/metals/docs/editors/vscode.html)

Done 🎉
