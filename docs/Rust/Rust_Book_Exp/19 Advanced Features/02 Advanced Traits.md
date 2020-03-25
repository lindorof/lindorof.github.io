# 19.2. 高级 trait

*在 Chapter10 讲解过 trait ，本节会进一步讲解 trait 更高级的特性。*



## 关联类型

- ***关联类型***（***associated type***）是一种类型占位符，例如 `type Item`
- 用在 trait 中时，trait 无需关注具体类型是什么，而由 trait 的实现者来指定具体类型
- rust 标准库中，有一个 trait 是 `Iterator` ，它使用了关联类型

```rust
pub trait Iterator {
    type Item;

    fn next(&mut self) -> Option<Self::Item>;
}
```

剖析：

- 通过 `type Item` 定义了类型占位符，注意，名称不一定是 `Item` ，可以自定义
- 其中 `next` 方法的返回值使用到了该占位符，即 `Option<Self::Item>`
- `Iterator` 这个 trait 不关注 `Item` 的具体类型是什么，由该 trait 的实现者来指定



现在我们不直接使用 `Iterator` ，而是自定义一个 trait ，并在 trait 中使用类型占位符：

```rust
trait TestIter {
    type Ret;

    fn func1(&self) -> Self::Ret;
}
```

剖析：

- 定义了一个 trait ，使用到的占位符是 `Ret`
- 在该 trait 中，`func1` 方法的返回值使用到了占位符，即 `Self::Ret` ，表示返回值是 `Ret` 这种类型
- 而 `Ret` 的具体类型，由 trait 的实现者来决定



下面实现这个 trait ：

```rust
struct Counter;

impl TestIter for Counter {
    type Ret = i32;
    fn func1(&self) -> Self::Ret {
        8
    }
}

fn main() {
    let c = Counter {};
    println!("{}", c.func1());
}
```

剖析：

- 为 `Counter` 实现了 `TestIter` 这个 trait
- 其中 `type Ret = i32` 的作用，就是指明 `Ret` 这个占位符的具体类型是 `i32` 
- 实现该 trait 时，`func1` 的返回值可以写为 `Self::Ret` ，也可以写为 `i32` ，但写为 `Self::Ret` 更好一些，因为这样的话在修改 `Ret` 占位符的具体类型时，只需要更改一个地方



## 泛型 trait

### 概述

上述的 `TestIter` 是可以用泛型 trait 来实现的：

```rust
pub trait Iter<T> {
    fn next(& self) -> T;
}
```

剖析：

- 用泛型 trait 时，不使用占位符，而是用泛型 `T` 来替代
- 对应的，`next` 方法的返回值用到了 `T`



然后实现泛型 trait：

```rust
struct Counter;

impl Iter<i32> for Counter {
    fn next(& self) -> i32 {
        6
    }
}

impl Iter<String> for Counter {
    fn next(& self) -> String {
        String::from("hello")
    }
}
```

剖析：

- 实现泛型 trait 时，需要指定 `T` 的具体类型
- 从上面的例子看到，可以多次实现，每次实现时 `T` 的具体类型都不同



然后调用 trait 的方法：

```rust
fn main() {
    let c = Counter {};

    let i: i32 = c.next();
    let s: String = c.next();
    
    println!("{} - {}", i, s);
}
```

剖析：

- 由于实现了多次泛型 trait ，因此对于 `c` 这个对象来说，同一个 trait 方法就被实现了多次
- 所以，在调用 `c.next` 方法时，需要让 rust 能够推断出该方法对应的 `T` 类型，从而找到对应该类型的 trait 实现
- 在上面的例子中，使用的推断方式是：`let i: i32` 或者 `let i: String` ，即通过指定变量的类型，来让 rust 找到 `impl Iter<i32> for Counter` 或者 `impl Iter<String> for Counter`
- <span style="background-color:#dddd00">尚未理解的问题是：如果写为 `let i = c.next::<i32>();` ，则编译报错</span>



### 默认类型

- 对于泛型 trait ，可以在定义 trait 时，为 `T` 指定默认类型
- 例如 `trait Iter<T=i32>` ，语法是 `T=type` ，叫做 ***默认类型参数***（***default type parameter***）
- 在实现 trait 时，如果不指定 `T` 的具体类型，则使用 trait 定义时指定的默认类型
- 该规则与 C++ 的默认参数类似

```rust
pub trait Iter<T=i32> {
    fn next(& self) -> T;
}

struct Counter;

impl Iter for Counter {
    fn next(& self) -> i32 {
        6
    }
}

impl Iter<String> for Counter {
    fn next(& self) -> String {
        String::from("hello")
    }
}
```

剖析：

- 定义 `Iter` 这个 trait 时，指定了默认类型参数，即 `T=i32`
- 上面的例子里，针对默认类型参数做了一次实现，即 `impl Iter for Counter`
- 同时，仍然可以为 `T` 指定其它类型，即 `impl Iter<String> for Counter`



### 运算符重载

使用运算符重载这个很好的例子，来讲解默认类型参数和占位符的结合使用：

- 与 C++ 不同，rust 不允许直接重载运算符
- rust 重载运算符的方式是，在 `std::ops` 中列出了运算符对应的 trait
- 从而，为某个类型实现了对应的 trait 之后，这种类型就相当于重载了对应的运算符
- 例如 `std::ops::Add` 这个 trait 对应的是 `+` 运算符



下面是 `std::ops::Add` 的定义：

```rust
trait Add<RHS=Self> {
    type Output;

    fn add(self, rhs: RHS) -> Self::Output;
}
```

剖析：

- 这是一个泛型 trait ，并为 `RHS` 指定了默认类型，即 `Self`
- 同时，使用了占位符 `Output`
- 然后剖析 `add` 方法：
    1. 让 `self` 可以与另外一个类型相加
    2. 另外一个类型可以通过 `RHS` 来指定，但默认是 `Self` 类型（因为大多数情况下都是同类型的两个变量相加）
    3. 相加之后，返回的新类型通过占位符 `Output` 来指定
    4. 该方法会 move 掉 `self` 的所有权，并返回新类型 `Output`



> 举例：实现同类型相加

```rust
use std::ops::Add;

#[derive(Debug)]
struct Point {
    x: i32,
    y: i32,
}

impl Add for Point {
    type Output = Point;

    fn add(self, other: Point) -> Point {
        Point {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }
}

fn main() {
    println!("{:?}", Point { x: 1, y: 2 } + Point { x: 3, y: 4 });
}
```

剖析：

- 为 `Point` 类型实现 `+` 运算符重载
- 由于是同类型相加，所以实现 `Add` 这个 trait 时，可以不标注 `RHS` 的具体类型，即使用默认类型参数
- 但注意，对于 `add` 方法的 `other` 参数，仍然需要标注出类型，由于 `RHS` 的默认类型是 `Self` ，即同类型，所以此处标注为 `Point` 
- 返回值通过占位符指定，该例子指定为 `Point` ，也是同类型



> 举例：实现不同类型相加

```rust
use std::ops::Add;

struct Millimeters(u32);
struct Meters(u32);

impl Add<Meters> for Millimeters {
    type Output = Millimeters;

    fn add(self, other: Meters) -> Millimeters {
        Millimeters(self.0 + (other.0 * 1000))
    }
}
```

剖析：

- 为 `Millimeters` 重载 `+` 运算符，让 `Millimeters` 可以与 `Meters` 相加
- 因此，在实现 `Add` 这个 trait 时，需要指定 `RHS` 的类型为 `Meters` ，即 `impl Add<Meters> for Millimeters`
- 然后指定占位符 `Output` 的类型为 `Millimeters` ，即相加以后返回的类型是 `Millimeters`
- 需要注意的是，我们是为 `Millimeters` 重载了运算符，`add` 方法中的 `self` 是 `Millimeters`
- 因此，顺序是 `Millimeters + Meters` ，而不是 `Meters + Millimeters`
- 例如，如果写为 `let m = Meters(1) + Millimeters(100)` ，则编译报错，提示 `Meters` 这个类型没有重载过 `+` 运算符



## 关联&泛型总结

前面已经了解了关联类型、泛型 trait ，现在需要拓展和总结一下这两个特征。



### 多个关联类型

下面是使用多个关联类型的例子：

```rust
trait TestIter {

    //func1使用到关联类型Ret1
    type Ret1;
    fn func1(&self) -> Self::Ret1;

    //func2使用到关联类型Para2和Ret2
    type Para2;
    type Ret2;
    fn func2(&self, p: Self::Para2) -> Self::Ret2;
}

struct Counter;
impl TestIter for Counter {
    //实现func1
    type Ret1 = i32;
    fn func1(&self) -> Self::Ret1 {
        8
    }

    //实现func2
    type Para2 = i32;
    type Ret2 = String;
    fn func2(&self, p: Self::Para2) -> Self::Ret2 {
        format!("return string: [{}]", p)
    }
}
```

剖析：

- trait 中可以有多个关联类型
- 但不管有多少个关联类型，对于某个类型(例如 `Counter`)来说，都只能实现一次该 trait



### 关联&泛型的结合

以 `std::ops::Add` 为例，使用到关联类型，也使用到泛型，看看下面的例子：

```rust
use std::ops::Add;

//微秒
#[derive(Debug)]
struct MicroMeters(u32);
//毫秒
#[derive(Debug)]
struct Millimeters(u32);
//秒
#[derive(Debug)]
struct Meters(u32);

//为Millimeters实现trait，与Meters相加
impl Add<Meters> for Millimeters {
    //返回类型是Millimeters
    type Output = Millimeters;

    fn add(self, other: Meters) -> Millimeters {
        Millimeters(self.0 + (other.0 * 1000))
    }
}

//为Millimeters实现trait，与MicroMeters相加
impl Add<MicroMeters> for Millimeters {
    //返回类型是MicroMeters
    type Output = MicroMeters;

    fn add(self, other: MicroMeters) -> MicroMeters {
        MicroMeters((self.0 * 1000) + other.0)
    }
}

fn main() {
    //从打印结果看到：返回类型是Millimeters
    let meter = Meters(1);
    let milli = Millimeters(200);
    println!("{:?}", milli + meter);

    //从打印结果看到：返回类型是MicroMeters
    let milli = Millimeters(2);
    let micro = MicroMeters(3000);
    println!("{:?}", milli + micro);
}
```

剖析：

- 由于 `std::ops::Add` 有泛型类型 `RHS` ，所以可以为 `Millimeters` 实现多次 `Add` 这个 trait
- 从例子中看到，对于 `Millimeters` 的每一次实现，都只能指定一次关联类型 `Output` 的具体类型
- 但是，***由于实现了多次 trait ，所以在每次实现中，可以为 `Output` 指定不同的类型***
- 这仿佛是泛型 trait 为关联类型带来的彩蛋



### 总结

下面对泛型 trait 和关联类型进行总结：

1. 类型的个数：
    - 对于关联类型，可以有多个占位符
     - 对于泛型 trait ，也可以有多个泛型参数
 2. 对 trait 类型的指定：
     - 对于关联类型，在实现 trait 的 `impl` 内部指定占位符的具体类型
     - 对于泛型 trait ，在实现 trait 的 `impl` 语法内指定 `T` 的具体类型
 3. 对 trait 的实现次数：
     - 对于关联类型，只能实现一次，因为只能指定一次占位符的具体类型
     - 对于泛型 trait ，可以实现多次 trait ，每次实现时为 `T` 指定不同的具体类型
 4. 调用 trait 方法时：
     - 对于关联类型，直接调用 trait 方法即可，因为该 trait 只有一次实现
     - 对于泛型 trait ，需要提供类型信息以让 rust 能够找到正确的 trait 方法，因为该 trait 有多次实现

5. 泛型与关联类型结合时：
    - 对于泛型 trait ，可以实现多次 trait ，每次实现时为 `T` 指定不同的具体类型
    - 基于泛型 trait 的多次实现，可对应在每次实现中，为占位符指定不同的具体类型



## 完全限定语法

### 问题

先看下面的例子：

```rust
/*
两个trait都是一样的方法
*/
trait Grandpa {
    fn with_self(&self);
    fn without_self();
}
trait Father {
    fn with_self(&self);
    fn without_self();
}

struct Child;

//实现了两个trait
impl Grandpa for Child {
    fn with_self(&self) { println!("Grandpa_with_self"); }
    fn without_self() { println!("Grandpa_without_self"); }
}
impl Father for Child {
    fn with_self(&self) { println!("Father_with_self"); }
    fn without_self() { println!("Father_without_self"); }
}
//自身也有跟trait一样的方法
impl Child {
    fn with_self(&self) { println!("Child_with_self"); }
    fn without_self() { println!("Child_without_self"); }
}
```

剖析：

- 两个 trait ，为了便于理解和记忆，一个是「爷爷」grandpa ，一个是「父亲」father 
- 这两个 trait 都是有两个方法，一个有 `&self` ，一个没有， 为了便于理解和记忆，名称叫做 `with_self` 和 `without_self`
- 而 `Child` 类型实现了这两个 trait ，而且，该类型自身也有同名的两个方法
- 这有点像 C++ 和 Java 常常讨论的多继承概念，但 rust 跟 Java 一样，不允许多继承（rust 也没有继承的概念），但允许实现多个 interface（在 rust 中 trait 可理解为 interface）

> ❓所以问题是：
>
> 1. 如何调用到 `Child` 自身的方法，如何调用到为不同 trait 实现的方法
> 2. 对于有 `&self` 和没有 `&self` 的方法，调用方式上有什么不同



### 语法

是时候给出安全限定语法了：

```rust
<Type as Trait>::function(receiver, arg, ...);
```

语法剖析：

1. rust 中的所有方法调用，本质上这个完全限定语法，但语法太过冗长，所以实际调用中会有各种简化的方式
2. `Type` 就是对象所属的类型，注意，是类型，不是对象所属的变量名
3. `Trait` 就是对象所实现的 trait 名称，使用 `as` 关键字，从而告知所调用的方法属于 `Trait` 而不是 `Type`
4. `receiver` 就是 `self/&self` ，最常见的 `obj.func()` 调用里，就是 rust 自动帮我们将 receiver (即 `self/&self` ) 传入的
5. `arg` 是参数



### 推演

> 推演注意事项

- 该问题的本质在于，如何区分开 `Type` 和 `Trait` 
- 所以调用 `Fater/Grandpa` 的方式是一致的，下面的推演只在 `Child` 和 `Father` 之间进行
- 其中，假设有 `let c = Child`
- 下面的推演过程中，打勾的表示语法正确，打叉的表示语法错误

> 下面开始推演

- **调用 Child 的 with_self**
    1. ❌ 完全限定语法：`<Child as Child>::with_self(&c)`
    2. ✅ `Child` 不是 Trait ，所以不能用 `as` ：`<Child>::with_self(&c)`
    3. ✅ 既然不用 `as` ，所以 Child 本身已经是类型了：`Child::with_self(&c)`
    4. ✅ 让 rust 自动传入 `&c` 信息：`c.with_self()`
- **调用 Fater 的 with_self**
    1. ✅ 完全限定语法：`<Child as Father>::with_self(&c)`
    2. ❌ `Fater` 是 `Trait` 而不是 `Type` ，所以不能省略 `as` ：`<Father>::with_self(&c)`
    3. ✅ 由于有 `&c` 信息，所以简化为：`Father::with_self(&c)`
- **调用 Child 的 without_self**
    1. ❌ 完全限定语法：`<Child as Child>::without_self()`
    2. ✅ `Child` 不是 Trait ，所以不能用 `as` ：`<Child>::without_self()`
    3. ✅ 既然不用 `as` ，所以 Child 本身已经是类型了：`Child::without_self()`
    4. ❌ 让 rust 自动传入 `&c` 信息时，发现参数不匹配：`c.without_self()`
- **调用 Fater 的 without_self**
    1. ✅ 完全限定语法：`<Child as Father>::without_self()`
    2. ❌ `Fater` 是 `Trait` 而不是 `Type` ，所以不能省略 `as` ：`<Father>::without_self()`
    3. ❌ 没有 `&c` 信息，所以直接调用 `Trait` 方法错误：`Father::without_self()`

> 下面就是所有正确的调用

```rust
fn main() {
    let c = Child;

    /*
    运行结果均为：
    Child_with_self
    */
    c.with_self();
    Child::with_self(&c);
    <Child>::with_self(&c);

    /*
    运行结果均为：
    Father_with_self
    */
    Father::with_self(&c);
    <Child as Father>::with_self(&c);
    
    /*
    运行结果均为：
    Child_without_self
    */
    Child::without_self();
    <Child>::without_self();

    /*
    运行结果为：
    Father_without_self
    */
    <Child as Father>::without_self();
}
```



## trait 依赖

### 概念

- 与 C++ / Java 类似，一个类可以同时实现多个接口，而一个接口也可以同时依赖于另一个接口
- 在 rust 中，一个 trait 可能依赖于一个或多个其它的 trait ，所依赖的这些 trait 叫 ***supertrait***
- 例如，`trait Trait1 : SuperTrait1 + SuperTrait2`
- 注意，语法通过 `:` 表示依赖，通过 `+` 表示多个依赖
- 那么，为某个 TYPE 实现 `Trait1` 时，这个 TYPE 就需要同时实现 `SuperTrait1` 和 `SuperTrait2` 
- 因为，`Trait1` 中会使用到 `SuperTrait1` 和 `SuperTrait2` 里的方法（一般在 `Trait1` 的默认实现中）
- 同时，对于该 TYPE 来说，也就同时具备了 `SuperTrait1` 和 `SuperTrait2` 的功能



### 举例

要为某个 TYPE 实现如下打印功能：

```text
>>6
**********
*        *
* (2, 3) *
*        *
**********
```

功能剖析：

1. 首先，打印序号，例如  `6` ，该序号的生成通过 trait 来完成，叫做 `SerialNumber`
2. 然后，打印该 TYPE 的内容，例如 `(2, 3)`，需要获得该 TYPE 的字符串表示，通过 trait 来完成，叫做 `ToString`
3. 最后，进行格式化，包括 `>>` ，以及 `*` 等，由 trait 进行默认实现，叫做 `OutlinePrint`
4. 那么，`OutlinePrint` 就依赖于 `SerialNumber` 和 `ToString`
5. 要为 TYPE 实现 `OutlinePrint` 时，就需要同时实现 `SerialNumber` 和 `ToString`



### 实现

> 定义生成序号的 trait

```rust
trait SerialNumber {
    //获得序号，类型是 i32
    fn serial_number(&self) -> i32;
}
```

> 定义转换为字符串的 trait

```rust
trait ToString {
    //获得类型对应的字符串
    fn to_string(&self) -> String;
}
```

> 格式化 trait 的定义和默认实现

```rust
//同时依赖 ToString 和 SerialNumber
trait OutlinePrint : ToString + SerialNumber {
    //实现了格式化方法
    fn outline_print(&self) {
        //获得序号值
        let num = self.serial_number();
        //获得要格式化的内容
        let content = self.to_string();
        let len = content.len();

        //格式化
        println!(">>{}", num);
        println!("**{}**", "*".repeat(len));
        println!("* {} *", " ".repeat(len));
        println!("* {} *", content);
        println!("* {} *", " ".repeat(len));
        println!("**{}**", "*".repeat(len));
    }
}
```

> 定义类型并实现上述 trait

```rust
struct Point {
    x: i32,
    y: i32,
}

//生成序号值，该例子中是 x*y
impl SerialNumber for Point {
    fn serial_number(&self) -> i32 {
        self.x * self.y
    }
}
//生成该类型的字符串表示，该例子中是 (x, y)
impl ToString for Point {
    fn to_string(&self) -> String {
        format!("({}, {})", self.x, self.y)
    }
}

//使用该 trait 的默认实现
impl OutlinePrint for Point {}
```

> 测试

```rust
fn main() {
    let p = Point {
        x: 3, 
        y: 4
    };
    /*
    调用该接口即可完成整个格式化过程，
    虽然格式化过程是通过多个trait组合实现的
    */
    p.outline_print();
}
```

> 打印结果

```shell
>>12
**********
*        *
* (3, 4) *
*        *
**********
```



## newtype 模式

### 回顾

在 Chapter10 讲解 trait 的实现时，总结了 ***孤儿规则***（***orphan rule***）：
> 1. 实现 trait 时，type 和 trait ，必须至少有一个 local to our crate
> 2. 例如，当前 crate 中有 `NewsArticle` 这个 type ，也有 `Summary` 这个 trait ，那么：
>     - 可以为 `NewsArticle` 实现标准库的 `Display` 这个 trait 
>     - 也可以为标准库的 `Vec<T>` 实现 `Summary` 这个 trait
>     - 但不可以为标准库的 ```Vec<T>``` 实现标准库的 ```Display``` 这个 trait
> 3. 这个约束叫做 ***coherence*** ，也叫 ***orphan rule***
> 4. 该约束的作用是，确保了别人不会破坏到我们的代码，反过来，也确保了我们不会破坏到别人的代码



### 使用 newtype

绕开 ***orphan rule*** 的方法：

- 例如，要在 `Vec<T>` 上实现 `Display` 
- 则创建一个新类型（***newtype***），让这个新类型包含 `Vec<T>`
- 然后就可以在该新类型上实现 `Display` ，而且可以访问到 `Vec<T>` 的内容
- 包装新类型时，最简单的方式就是 ***tuple struct*** 

例如：

```rust
use std::fmt;

//用 tuple struct 包装 Vec<String>
struct Wrapper(Vec<String>);

//为新类型实现 Display
impl fmt::Display for Wrapper {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        //注意：通过 self.0 来访问到 Vec<String>
        write!(f, "[{}]", self.0.join(", "))
    }
}

fn main() {
    let w = Wrapper(vec![String::from("hello"), String::from("world")]);
    println!("w = {}", w);
}
```

输出结果：

```shell
w = [hello, world]
```



### 问题

***newtype*** 的缺点是：

- 新类型 `w` 包装了值，但同时隐藏了值本身的方法
- 例如，要像使用 `Vec<T>` 那样直接使用 `Wrapper` ，则必须直接在 `Wrapper` 上实现 `Vec<T>` 的所有方法

解决办法是：

- 通过 `self.0` 或者 `w.0` 来访问到 `Vec<T>` ，再进一步访问 `Vec<T>` 中的方法
- 更好的办法是，为 `Wrapper` 实现 `Deref` 这个 trait（参考 Chapter15 ），并返回所包装的值类型（即 `Vec<T>` ）
- 但是，如果要限制封装类型的行为，即不希望内部类型的方法被全部暴露出来，就只能自行实现所需的方法了

