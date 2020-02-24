# 18.2. 可反驳性 *Refutability*

> 关于可反驳性

- 模式和匹配，就是 EXPRESSION 匹配 PATTERN 的过程
- 而模式有两种形式，一种是***可反驳***（***refutable***），一种是***不可反驳***（***irrefutable***）
- 对于 refutable 模式，表达式可以匹配失败
- 对于 irrefutable 模式，表达式只能匹配成功
- 而模式与 rust 的语法本身是相关联的，例如 `let` 、`if let` 、`for` 等语法
- 而不同语法对模式是有要求的，有的语法只能接受 refutable 模式，有的语法只能接受 irrefutable 模式
- 比如，`let` 语法只能接受 irrefutable 模式，因为必须匹配成功
- 比如，`if let` 语法只应该接受 refutable 模式，因为可以匹配失败
- 后续的章节会讲解模式的全部语法，根据这些语法，来理解对应模式应当是 refutable 还是 irrefutable
- 不用担心也不用过多的去深究 refutable 和 irrefutable 的区别，而是熟悉 ***refutability*** 这个概念，从而在遇到错误的时候，能够知道如何去应对
- 比较常见的语法：`let` 、函数参数、`for` 这些语法只能接受 irrefutable 模式；`if let` 、`while let` 这些语法只能接受 refutable 模式



> 举例：`let` 只接受 irrefutable 模式

```rust
let x = 5;
```

- 此时 `x` 是一个 irrefutable 模式
- 因为此时任何值都能被绑定到 `x`



>举例：`let` 不能接受 refutable 模式

```rust
let x = Some(6);
let Some(y) = x;
```

- 首先，`let x = Some(6)` 匹配成功，此时 `x` 的类型被 rust 自动推断为 `Option<i32>` ，并将值 `Some(6)` 绑定给变量 `x`
- 但是，`let Some(y) = x` 会编译失败，因为此时 `Some(y)` 是一个 refutable 模式，可能匹配到 `Some(value)` ，也可能匹配到 `None` ，即使我们知道表达式 `x` 并不是 `None` ，而 `let` 语法只能接受 irrefutable 模式，因此编译失败
- 编译器错误提示：

```shell
error[E0005]: refutable pattern in local binding: `None` not covered
let Some(y) = x;
    ^^^^^^^ pattern `None` not covered
```



> 举例：`if let` 接受 refutable 模式

```rust
let x = Some(6);
if let Some(y) = x {        
}
```

- 这是对上一个例子的修改，能够成功编译
- 此时 `Some(y)` 是 refutable 模式，若 `x` 的值是 `Some(value)` ，则匹配成功，`if let` 成立；若 `x` 的值是 `None` ，则匹配失败，`if let` 不成立



> 举例：`if let` 不应当使用 irrefutable 模式

```rust
if let x = 5 {
}
```

- 此时 `x` 是一个 irrefutable 模式，总是会匹配成功
- 因此能够编译成功，但编译器会给出警告，告知不应当将一个 irrefutable 模式用到 `if let` 中
- 编译器警告提示：

```shell
warning: irrefutable if-let pattern
if let x = 5 {
}
note: #[warn(irrefutable_let_patterns)] on by default
```

