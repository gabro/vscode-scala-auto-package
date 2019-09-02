
# DEPRECATED

This extension is now deprecated in favor of [Metals](https://scalameta.org/metals).

Read more about the deprecation [here](./MIGRATING.md).

---

# vscode-scala-auto-package

Automatically inserts a toplevel `package {name}` statement when creating a Scala
file, where `{name}` is inferred from the file system structure.

![Demo](assets/demo.gif)

E.g. if you create a file in `src/main/scala/io/buildo/myproject/`, this
extension will automatically add

```scala
package io.buildo.myproject
```

on top of the file.
