# 15.2. 详解 `Deref` & `DerefMut`

*关于本节，我没有按照原书的讲解顺序进行，而是通过对原书的学习，理解之后，按照自己的讲解顺序来写。感觉这样更容易理解一些。*



## 详解 `Deref`

### 关于 `Deref`

- 它是一种 Trait
- 对应的方法是 `deref`
- 而 `deref` 的本质是，让智能指针返回一个 `&`
- **注意，只能返回 `&` ，而不是其它**



### 实现 `Deref` 

注意：

- rust 标准库中的 `Box<T>` 已经实现了 `Deref` 
- 因此为了讲解 `Deref` ，我们会自己实现一个类似 `Box<T>` 的智能指针
- 本质上，`Box<T>` 是一种元组结构体，该元组结构体只有一个元素
- 所以用类似的方式来实现这种智能指针



定义 `MyBox<T>` ：

```rust
struct MyBox<T>(T);

impl<T> MyBox<T> {
    fn new(x: T) -> MyBox<T> {
        MyBox(x)
    }
}
```

然后为其实现 `Deref` 这种 Trait ：

```rust
use std::ops::Deref;

impl<T> Deref for MyBox<T> {
    type Target = T;

    fn deref(&self) -> &T {
        &self.0
    }
}
```



### 使用 `Deref`

使用方式：

- 直接调用其 `deref` 方法即可
- **但注意得到的是 `&` **



创建一个存储 `i32` 类型的 `MyBox` ：

```rust
let mbi = MyBox::new(5);
```

打印该 `i32` 的值：

```rust
println!("{:?}", mbi.deref());
```

比较该 `i32` 的值：

```rust
/*
注意：
因为 deref 得到的是 & ，
因此需要手动解引用，即使用 * ，
才能跟另一个 i32 类型做比较
*/
if *mbi.deref() == 5 {	
}
```

又如，创建一个存储 `String` 类型的 `MyBox` ，并打印内容：

```rust
let mbs = MyBox::new(String::from("这是 String 类型的 MyBox"));
println!("{:?}", mbs.deref());
```

如果不调用 `deref` ，直接打印内容，例如：

```rust
println!("{:?}", mbs);
```

则编译得到如下错误提示，意思就是该元组结构体无法被打印：

```shell
`MyBox<std::string::String>` does not implement `std::fmt::Debug`
```



## 详解 `DerefMut`

### 关于 `DerefMut`

- 它是一种 Trait
- 对应的方法是 `deref_mut`
- 而 `deref_mut` 的本质是，让智能指针返回一个 `&mut`
- **注意，只能返回 `&mut` ，而不是其它**



### 实现 `DerefMut` 

继续使用 `MyBox<T>` ，然后为其实现 `DerefMut` 这种 Trait ：

```rust
use std::ops::DerefMut;

impl<T> DerefMut for MyBox<T> {

    fn deref_mut(&mut self) -> &mut T {
        &mut self.0
    }
}
```

注意与 `Deref` 的区别：

1. 方法名称是 `deref_mut`
2. 参数类型变为 `&mut self` ，而不是 `&self`
3. 返回值变为 `&mut T` ，而不是 `&T`



### 使用 `Deref_Mut`

使用方式：

- 直接调用其 `deref_mut` 方法即可
- **但注意得到的是 `&mut` ，是可变的**

所创建的 `MyBox<T>` 实例变量的区别：

- 如果不调用 `deref_mut` ，则该实例变量不需要 `mut` 修饰

- 但如果要调用 `deref_mut` ，则该实例变量必须用 `mut` 修饰

- 反过来，如果实例变量用 `mut` 修饰，则可以同时调用 `deref` 和 `deref_mut` 方法

也就是说，可变性只有如下三种转换方式（其中 `T` 是类型，`U` 是目标）：

1. 从 `&T` 到 `&U`
2. 从 `&mut T` 到  `&mut U`
3. 从 `&mut T` 到 `&U`    



创建一个存储 `i32` 类型的 `MyBox` ：

```rust
let mut mbmi = MyBox::new(5);
```

打印该 `i32` 的值：

```rust
println!("{:?}", mbmi.deref_mut());
```



## 触发 `Deref` & `DerefMut`

### 关于触发

何为触发：

- 在前面的内容里，是直接调用 `deref` 或 `deref_mut` 方法
- 但这样调用太麻烦，可以有更便捷的方式来使用，因为太便捷，所以就取名叫 「触发」
- 注意「触发」只是我自己取的名字

触发的方式：

1. 使用 `*obj` ，**一定** 等价于 `*obj.deref()` ，得到的是对引用进行「解引用」后的值
2. 使用 `&obj` ，**某些情况下** 等价于 `obj.deref()` ，得到的是一个引用，这个时候在 rust 中有一个专门的术语，叫 ***deref coercions*** ，中文翻译叫 「强制解引用」，后续详细讲解

关于 `deref` 和 `deref_mut` ：

- 二者的触发方式都是一样的，因此只讲解 `deref`
- 但要注意的是，触发 `deref` 还是 `deref_mut` ，遵循的是可见性转换原则



### ***deref coercions***

先再复习一下如下三种转换方式（其中 `T` 是类型，`U` 是目标）：

1. 从 `&T` 到 `&U`
2. 从 `&mut T` 到  `&mut U`
3. 从 `&mut T` 到 `&U` 



#### 注意

- 原书中没有明确总结出 ***deref coercions*** 的规则
- 我自己根据代码测试总结了一些，可能不全，或者不精确



#### 可触发的规则

1. 形参是引用类型 `&type` ，使用 `&obj` 传入实参
2. 赋值时左值是引用，且明确的标注了左值的类型，然后右值写为 `&obj`

#### 触发时的行为

1. rust 编译器可以自动触发，甚至递归触发，层层自动调用 `obj.deref()` 
2. 但前提是层层触发后的结果，要能符合形参类型，或者能被赋值给变量

#### 不可触发的规则

1. 比较运算符 `==` ，不会被触发
2. 打印 `println` ，不会被触发（支持 `debug` 时也会被打印出来，但与本章知识点无关 ）



#### 举例一

> 针对存储 `i32` 类型的 `MyBox` 

```rust
let mbi = MyBox::new(8);
```

打印：

```rust
// 正确
println!("{:?}", *mbi);

// 错误
// 此时得到的就是 &MyBox<i32> ，无法打印
println!("{:?}", &mbi);
```

传参：

```rust
fn hello_i(i: i32) {
    println!("{}", i);
}

// 正确
hello_i(*mbi);

// 错误
// 此时得到的就是 &MyBox<i32> ，无法传递给 i32
hello_i(&mbi);
```

传参：

```rust
fn hello_i_r(i: &i32) {
    println!("{}", i);
}

// 正确
// 自动转换为 &i32
hello_i_r(&mbi);

// 错误
// 得到 i32 ，无法传递给 &i32
hello_i_r(*mbi);

// 正确
// 但多此一举
hello_i_r(&*mbi);
```

赋值和比较：

```rust
// 正确
if 8 == *mbi {
}

// 正确
// 但要注意 bi 需明确标注出类型
let bi:&i32 = &mbi;
// 正确
if &8 == bi {
}

// 错误
// &i32 与 &MyBox<i32> 无法比较
if &8 == &mbi {
}
```



#### 举例二

> 针对存储 `String` 类型的 `MyBox` 

```rust
let mbs = MyBox::new(String::from("Hello"));
```

打印：

```rust
// 正确
println!("{:?}", *mbs);

// 错误
// 此时得到的就是 &MyBox<String> ，无法打印
println!("{:?}", &mbs);
```

传参：

```rust
fn hello_str(name: &str) {
    println!("{}", name);
}

// 正确
// 先得到 &String
// 接着 &String 又转为 &str
// 因为 String 也实现了 deref
hello_str(&mbs);

// 正确
// 但多此一举
hello_str(&*mbs);
```

赋值：

```rust
// 正确
// 先得到 &String
// 接着 &String 又转为 &str
// 因为 String 也实现了 deref
let s:&str = &mbs;

// 正确
let s:&String = &mbs;
```

