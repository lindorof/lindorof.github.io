# 18.1. 何时使用模式

本节内容：

- ***模式***（***pattern***）是 rust 中的特殊语法
- 使用 rust 的过程中，常常会使用到模式，通过模式可以创建强大而简洁的代码
- 本节讨论在 rust 中，哪些时候会使用到模式



## *`match`*

`match` 表达式由如下部分组成：

1. `match` 关键字
2. 用于匹配的值
3. 一个或多个分支

```rust
match VALUE {
    PATTERN => EXPRESSION,
    PATTERN => EXPRESSION,
    PATTERN => EXPRESSION,
}
```

可以看到：

- `match` 的一个分支（***arm***）包含了 PATTERN 和 EXPRESSION
- PATTERN 就是模式，rust 会检测 VALUE 与该 PATTERN 是否匹配（***match***）
- 如果 VALUE 与 PATTERN 相匹配，则运行 EXPRESSION

`match` 的特点：

- 必须是穷尽（***exhaustive***）的，即 arm 分支必须覆盖到所有可能的值
- 因此，可以在最后一个分支中，使用模式 `_` 来匹配所有可能的值



## *`if let`*

说明：

- 如果 `match` 只关心一种情况，则可以用 `if let` 来简写
- 因此，对于 `match` ，编译器会检查是否穷尽了所有可能的值
- 但是，对于 `if let` ，编译器不会进行这种穷尽性检查
- `if let` 可以与 `else if let` 、`else if` 、`else` 一起组合

```rust
fn main() {
    let color: Option<&str> = None;
    let tuesday = false;
    let age: Result<i32, _> = "35".parse();

    if let Some(c) = color {
    } else if tuesday {
    } else if let Ok(age) = age {
        if age > 30 {}
        else {}
    } else {
    }
}
```

注意：

- `if let` 和 `match` 一样，可以在分支中引入覆盖变量
- 即 `if let Ok(age) = age` ，引入了新的覆盖变量 `age`
- 所以，在这个代码块内部，`if age > 30` ，其中的 `age` 是新的覆盖变量，是 `i32` ，而不是 `Result`
- 但要注意的是，新的覆盖变量 `age` 在 `if let` 的大括号开始后的新作用域中才生效
- 因此，我们***不能这样写***：`if let Ok(age) = age && age > 30`



## *`while let`*

说明：

- `while let` 的意思是，只要模式匹配，就一直运行 `while` 循环
- 例如，我们将 vector 作为栈使用时，需要一直出栈，直到栈为空
- 这种场景使用 `while let` 写出来的代码就会很简洁

```rust
fn main() {
    let mut stack  = Vec::new();

    stack.push(1);
    stack.push(2);
    stack.push(3);

    while let Some(i) = stack.pop() {
        println!("{}", i);
    }
}
```

打印结果是：

```shell
3
2
1
```



## *`for`*

说明：

- `for` 循环的语法是 `for x in y`
- 其中，`x` 也是一个模式，可以用来匹配值，甚至元组

> 例如，最常见的 `for` 循环匹配一个值

```rust
fn main() {
    let v  = vec![1, 2, 3];

    for i in v {
        println!("{}", i);
    }
}
```

> 例如，用 `for` 来匹配元组

```rust
fn main() {
    let v  = vec![1, 2, 3];

    for (idx, val) in v.iter().enumerate() {
        println!("v[{}] = {}", idx, val);
    }
}
```

打印结果是：

```shell
v[0] = 1
v[1] = 2
v[2] = 3
```



## *`let`*

`let` 语句的本质是：

```rust
let PATTERN = EXPRESSION;
```

> 举例

```rust
let x = 5;
```

- 其中，`x` 是一个模式，表示「将匹配到的值绑定到变量 `x`」
- 同时，因为 `x` 是整个模式，所以等同于「将任何值绑定到变量 `x` ，不管值是什么」

> 举例

```rust
let (x, y, z) = (1, 2, 3);
```

- 此时将一个元组与模式相匹配
- 因此，rust 会比较值 `(1, 2, 3)` 和模式 `(x, y, z)` ，并发现值与模式是匹配的
- 所以，rust 将 `1` 绑定到 `x` ，将 `2` 绑定到 `y` ，将 `3` 绑定到 `z`

> 举例

```rust
let (x, y) = (1, 2, 3);
```

- rust 比较值 `(1, 2, 3)` 和模式 `(x, y)` ，发现模式中元素的数量与值中元素的数量不匹配
- 因此这是一个错误的模式，rust 会给出编译错误
- 如果希望忽略元组中一个或多个值，可以使用 `_` 或 `..` ，后续章节会讲解 



## 函数参数

说明：

- 函数的参数也可以是模式
- 类似 `let` ，可以匹配值，甚至元组
- 闭包也类似函数，可以在闭包参数列表中使用模式

> 举例：匹配值

```rust
fn foo(i: i32) {
}

fn main() {
    let v = 8;
    foo(v);
}
```

> 举例：匹配元组

```rust
fn foo(&(x, y): &(i32, char)) {
}

fn main() {
    let sth = (8, 'a');
    foo(&sth);
}
```

> 举例：闭包参数列表

```rust
fn main() {
    let sth = (8, 'a');
    let foo = |&(p1, p2)| {
        println!("{} - {}", p1, p2);
    };

    foo(&sth);
}
```

