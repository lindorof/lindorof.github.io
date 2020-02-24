# 18.3. 模式的全部语法

*本节会罗列出模式的全部语法。*



## 匹配字面值

```rust
let x = 1;

match x {
    1 => println!("one"),
    2 => println!("two"),
    3 => println!("three"),
    _ => println!("anything"),
}
```

- 要匹配的值是 `x` ，而 `match` 的每个 arm 是一个模式
- 模式直接使用字面值表示，例如 `1` 、`2` 等
- 该例子由于 `x` 的值是 `1` ，因此匹配到第一个 arm，打印 `one`



## 匹配变量

```rust
fn main() {
    let x = Some(5);
    let y = 10;

    match x {
        Some(50) => println!("Got 50"),
        Some(y) => println!("Matched, y = {:?}", y),
        _ => println!("Default case, x = {:?}", x),
    }

    println!("at the end: x = {:?}, y = {:?}", x, y);
}
```

- 在 `match` 的 arm 模式中所声明的变量，会覆盖 `match` 之外的同名变量
- 但是，新的覆盖变量在 arm 的大括号之后才开始生效
- 在该例子中，模式 `Some(y)` 被匹配，模式 `Some(y)` 中的变量 `y` 覆盖了 `match` 结构之外的变量 `y`
- 因此，在 `Some(y)` 这个 arm 中，打印出来的 `y` 是新的覆盖变量
- 同时，在 `Some(y)` 这个 arm 结束后，覆盖变量的生存周期也结束，因此末尾打印出来的 `y` 就是 `match` 结构之外的原来的变量

程序执行结果是：

```shell
Matched, y = 5
at the end: x = Some(5), y = 10
```



## 多个模式

```rust
let x = 1;

match x {
    1 | 2 => println!("one or two"),
    3 => println!("three"),
    _ => println!("anything"),
}
```

- 在 `match` 的 arm 模式中，可以使用语法 `|` ，所代表的意思是 ***or***
- 在该例子中，第一个分支的 `1 | 2` 的意思是，该模式可以匹配 `1` 或 `1` ，而 `x` 的值是 `1` ，因此该分支被成功匹配

程序执行结果是：

```shell
one or two
```



## 匹配值的范围

说明：

- 语法是 `x..=y` ，匹配的范围是从 x 到 y ，包括 y
- 该语法只能用于数字和 `char` 值
- 例如，用于数字，`1..=5` ，等价于 `1 | 2 | 3 | 4 | 5` ，但使用范围语法就更简洁
- 又如，用于 `char` 值， `'a'..='j'` 

举例：

```rust
fn main() {
    let x = 5;
    match x {
        1..=5 => println!("1-5"),
        _ => println!("else"),
    }

    let y = 'c';
    match y {
        'a'..='j' => println!("a-j"),
        'k'..='z' => println!("k-z"),
        _ => println!("else"),
    }
}
```

打印结果是：

```shell
1-5
a-j
```



## 解构并分解值

### 结构体

```rust
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let p = Point { x: 0, y: 7 };

    let Point { x: a, y: b } = p;
    assert_eq!(0, a);
    assert_eq!(7, b);
}
```

- 对结构体 `Point` 进行解构
- 创建了变量 `a` 和 `b` 来匹配结构体 `p` 中的 `x` 和 `y` 字段



### 简写结构体字段

```rust
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let p = Point { x: 0, y: 7 };

    let Point { x, y } = p;
    assert_eq!(0, x);
    assert_eq!(7, y);
}
```

- 对结构体 `Point` 进行解构
- 但只需列出结构体字段的名称，而模式创建的变量会使用与结构体一致的变量名称
- 因此，`let Point { x, y } = p` ，等价于 `let Point { x: x, y: y } = p`



### 结构体的匹配

```rust
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let p = Point { x: 0, y: 7 };

    match p {
        Point { x, y: 0 } => println!("On the x axis at {}", x),
        Point { x: 0, y } => println!("On the y axis at {}", y),
        Point { x, y } => println!("On neither axis: ({}, {})", x, y),
    }
}
```

- 匹配结构体时，可以为某些字段指定字面值来匹配，然后为其它所需的字段创建变量
- 例如上面的例子，`Point { x, y: 0 }` 就是要求字段 `y` 的值为 `0` 时才能匹配，同时为字段 `x` 创建变量 `x`
- 但要注意的是，**<u>为字段指定字面值时，所匹配到的值就不会再创建变量来存储了</u>**
- 例如，`Point { x, y: 0 }` 就只为字段 `x` 创建了变量 `x` ，但字段 `y` 只匹配是否值为 `0` ，而即使字段 `y` 的值为 `0` ，即匹配成功，也不会创建变量 `y`
- 若要在匹配字面值的同时创建变量，参见本节后续内容绑定变量



### 枚举

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

fn main() {
    let msg = Message::ChangeColor(15, 160, 255);

    match msg {
        Message::Quit => println!("Just Quit"),
        Message::Move { x, y: 10..=30 } => {
            println!("Move x {} and y(10-30)", x);
        },
        Message::Write(text) => {
            println!("Write text {}", text);
        },
        Message::ChangeColor(15, g, 200..=255) => {
            println!("Change color red(15), green {}, blue(200-255)", g);
        },
        _ => (),
    }
}
```

- 结构枚举，且枚举中可能携带数据，数据类型可以是结构体，元组，或单一数据等
- 但规则都是一样，且可以灵活使用字面值、范围等来进行匹配



### 嵌套的结构体和枚举

```rust
struct RgbColor {
    r: i32,
    g: i32,
    b: i32,
}

enum Color {
    Hsv(i32, i32, i32),
    Rgb(RgbColor),
 }
 
enum Message {
    Quit,
    ChangeColor(Color),
}
 
fn main() {
    let msg = Message::ChangeColor(Color::Hsv(0, 160, 255));
 
    match msg {
        Message::Quit => println!("Just Quit"),
        Message::ChangeColor(Color::Hsv(h, s, v)) => {
            println!("Change Hsv clor h {}, s {}, v {}", h, s, v);
        },
        Message::ChangeColor(Color::Rgb(RgbColor{r, g, b})) => {
            println!("Change color red {}, green {}, blue {}", r, g, b);
        },
    }
}
```

- 这是一个复杂的结构体和枚举的嵌套
- 注意看解构的语法，因为可能有多个深度，解构的语法需要一层一层深入



### 结构体和元组

```rust
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let ((feet, inches), Point {x, y}) = ((3, 10), Point { x: 3, y: -10 });
}
```

- 这是元组和结构体的多层嵌套
- 通过解构可以很方便的获取到某个片段的值



## 使用 `_` 忽略特定值

### 忽略参数

```rust
fn foo(_: i32, y: i32) {
    println!("y is {}", y);
}

fn main() {
    foo(3, 4);
}
```

- 函数 `foo` 忽略了第一个参数，语法是 `_`
- 例如实现 trait 方法时，需要符合 trait 方法的签名，但又不需要某个参数，则可以使用这种方式来忽略，且编译器不会提示警告



### 匹配但不绑定变量

```rust
fn main() {
    let sth1 = Some(5);
    let sth2 = Some(10);
    
    match (sth1, sth2) {
        (Some(_), Some(_)) => {
        },
        _ => {
        },
    }
}
```

- 在该例子中，我们只关注 `sth1` 和 `sth2` 都不为 `None` 的情况，但并需要获取 `Some(value)` 中的值
- 因此可以使用 `_` 来忽略，这样就不会将匹配到的值绑定到变量
- 对于该例子，只要 `sth1` 或 `sth2` 有一个为 `None` ，就会匹配到 `_ => {}` 这个 arm



### 忽略元组中的特定值

```rust
fn main() {
    let numbers = (1, 2, 3, 4, 5);

    match numbers {
        (first, _, third, _, fifth) => {
            println!("Some numbers: {}, {}, {}", first, third, fifth)
        },
    }
}
```

- 在该例子中，我们只关注元组中的一部分元素，因此其它元素使用 `_` 来忽略
- 因此该例子只会获取到第 1 、3 、5 这三个值，点结果是 `1, 3, 5`



### 忽略未使用的变量

```rust
fn main() {
    let _x = 5;
    let y = 10;
}
```

- 如果创建了一个变量但从未使用过，则 rust 会给出警告
- 但是在设计原型或刚开始一个项目时，创建一个变量但尚未使用的情况是很常见的
- 此时就可以用 `_` 开头来命名一个变量，rust 就不会再给出警告
- 但要注意，`_x` 仍然是创建了一个变量，而 `_` 则不会创建变量，后续就有例子展示这个区别



### `_x` 与 `_` 的区别

这二者是有微妙的区别的：

- 对于 `_x` 来说，会创建变量，但如果未使用该变量，则 rust 编译器不会给出警告
- 但对于 `_` 来说，则不会创建变量

看下面这个例子，是不能被编译的：

```rust
fn main() {
    let s = Some(String::from("Hello!"));
    
    if let Some(_s) = s {
    }
    
    println!("{:?}", s);
}
```

- 在 `if let` 中，`Some(_s)` 仍然创建（绑定）了变量 `_s` 
- 因此变量 `s` 被 move 到了 `_s` 中
- 所以在 `if let` 之后，变量 `s` 不能再被使用
- 因此 `println!("{:?}", s)` 这句代码不能被编译，错误提示 `s` 不再可用

但是使用 `_` 就可以避免这个问题：

```rust
fn main() {
    let s = Some(String::from("Hello!"));

    if let Some(_) = s {
    }
    
    println!("{:?}", s);
}
```

- 在 `if let` 中，`Some(_)` 使用的 `_` ，因此不会创建（绑定）变量
- 因此变量 `s` 不会被 move 给任何其它变量
- 因此在 `if let` 之后，`println!("{:?}", s)` 这句代码是正确的，可以继续使用变量 `s`



## 使用 `..` 忽略部分值

### 结构体

```rust
struct Point {
    x: i32,
    y: i32,
    z: i32,
}

fn main() {
    let origin = Point { x: 0, y: 0, z: 0 };

    match origin {
        Point { x, .. } => println!("x is {}", x),
    }
}
```

- 我们只关心字段 `x` 的值，而剩余的字段 `y` 和 `z` 则不关心
- 上面的写法等价于 `Point { x, y: _, z: _ }` ，但这样太繁琐
- 但要注意的是，对于结构体来说，`..` 只能使用在末尾，不能使用在开头或中间
- 所以，`Point { .. , z }` 这种写法是不允许的
- 同样，`Point { x, .. , z }` 这种写法也是不允许的
- 当然，全部忽略也是可以的，例如 `Point { .. }`
- 但无论如何，`..` 必须在末尾才行



### 元组

```rust
fn main() {
    let numbers = (1, 2, 3, 4, 5, 6);

    match numbers {
        (first, .., last) => {
            println!("{}, {}", first, last);
        },
    }
}
```

- 在该例子中，只获取元组的第一个和最后一个值，中间的其它值都被忽略
- 因此打印结果是 `1, 6` 
- 对于元组来说，`..` 可以使用在任意位置，包括开头、结尾、中间，只要无歧义即可
- 所以，`(.., second, ..)` 就是有歧义的，编译器不知道究竟忽略了哪些元素



## 匹配守卫 *match guard*

### 使用匹配守卫

- 在 `match` 的模式分支之后，可以增加额外的 `if` 条件
- 这代表的意义是：匹配到该模式之后，还需要满足该 `if` 条件，此分支才会被执行
- 也可以理解为：模式和 `if` 都 ***同时*** 满足，才认为匹配到该分支

举例：

```rust
fn main() {
    let num = Some(8);

    match num {
        Some(x) if x < 5 => println!("x < 5"),
        Some(x) if x < 10 => println!("5 <= x < 10"),
        _ => println!("nothing"),
    }
}
```

剖析：

- 第一个分支，匹配到模式 `Some(x)` ，但是不满足 `x < 5` 这个守卫；因此，第一个分支不会执行
- 第二个分支，匹配到模式 `Some(x)` ，且满足 `x < 10` 这个守卫；因此，第二个分支被执行



### 匹配守卫与模式的关系

- 匹配守卫放在 `match` 的模式分支之后，与模式的关系是 `and` ，即模式和匹配守卫必须 ***同时*** 满足
- 它们的关系是 `(PATTERN) & GUARD` ，注意：PATTERN 是用 `()` 引用的
- 例如，PATTERN 是 `4 | 5 | 6` ，GUARD 是 `if sth` ，则它们的关系是 `(4 | 5 | 6) if sth` ，而不是 `4 | 5 | (6 if sth)` 
- 当然，实际编写代码时，我们不需要显式的为 PATTERN 加上 `()` ，此处使用 `(PATTERN)`  只是为了讲解模式与匹配守卫的关系

举例：

```rust
fn main() {
    let x = 5;
    let y = false;

    match x {
        4 | 5 | 6 if y => println!("yes"),
        _ => println!("no"),
    }
}
```

剖析：

- 第一个分支可以理解为 `(4 | 5| 6) if y` ，因此，首先模式 `(4 | 5 | 6)` 是满足的，接着发现 `if y` 不满足，因此，该分支不会被匹配，进而执行了第二个分支；因此打印结果是 `no`
- 这个例子也说明了匹配守卫与模式的关系是 `and` ：如果它们的关系是 `4 | 5 | (6 if y)` ，那么，第一个分支就会被匹配，并打印出 `yes`



## 使用 `@` 绑定变量

### 回顾

- 本节前面的内容里，讲解字段的匹配时说到：
- 如果为字段指定了字面值或者范围，则所匹配到的值不会创建变量来存储
- 如果没有为字段制定字面值或者范围，则匹配到的值就会创建变量存储

举例，注意看注释：

```rust
enum Message {
    Hello { id: i32 },
}

fn main() {
    let msg = Message::Hello { id: 8 };

    match msg {
        // 为 id 指定了范围，此时没有绑定变量
        Message::Hello { id: 10..=20 } => println!("10..20"),
        // 为 id 指定了字面值，此时没有绑定变量
        Message::Hello { id: 30 } => println!("30"),
        // 没有为 id 指定范围或字面值，绑定了变量，变量名是 id
        Message::Hello { id } => println!("id = {}", id),
    }
}
```



### 使用 `@`

- 使用 `@` 可以在测试其值是否匹配模式的同时，为该值创建变量，从而在分支表达式中可以使用该变量
- 语法是 `vname@` ，此时绑定的变量名是 `vname`
- 例如，要匹配的字段名是 `name` ，希望绑定的变量名是 `vname` ，要测试的值是 `VALUE` ，则语法为：
- `name: vname@ VALUE`

在上面的例子中使用 `@` ，注意看注释：

```rust
enum Message {
    Hello { id: i32 },
}

fn main() {
    let msg = Message::Hello { id: 16 };

    match msg {
        // 为 id 指定了范围，绑定的变量是 v_id
        Message::Hello { id: v_id@ 10..=20 } => println!("10..20, id = {}", v_id),
        // 为 id 指定了字面值，绑定的变量是 v_id
        Message::Hello { id: v_id@ 30 } => println!("30, id = {}", v_id),
        // 没有为 id 指定范围或字面值，绑定的变量是 id
        Message::Hello { id } => println!("id = {}", id),
    }
}
```

