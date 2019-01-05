# vscode-scala-auto-package

Automatically insert a toplevel `package {name}` statement when creating a Scala
file, where `{name}` is inferred from the file system structure.

E.g. if you create a file in `src/main/scala/io/buildo/myproject/`, this
extension will automatically add

```scala
package io.buildo.myproject
```

on top of the file.
