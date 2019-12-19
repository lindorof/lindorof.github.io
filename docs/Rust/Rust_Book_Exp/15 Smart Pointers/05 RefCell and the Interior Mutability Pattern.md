# 15.5. 内部可变性 `Refcell`

## 概述

### 引言

- ***内部可变性***（***Interior mutability***）是 rust 的一个设计模式
- 它允许你改变数据，即使该数据是 ***不可变*** 引用
- 但是，rust ***编译时*** 不允许这样的规则，因此，***Interior mutability*** 是 ***运行时*** 实现的
- ***内部可变性*** 的实现需要 `unsafe` 代码，在 Chapter19 会讲解
- rust 是 ***保守*** 的：
    1. rust 的 ***所有权规则*** ：
        - 引用必须总是有效的
        - 任何时候，只能拥有一个可变引用，或者多个不可变引用，二选一
    2. rust 要求在 ***编译时*** 满足所有权规则，也就是 ***静态分析*** 
    3. 所以，相比在 ***运行时*** 进行所有权规则检查，***编译时*** 可能会拒绝一些正确的程序
    4. 但是，拒绝正确的程序，只是 rust 的 ***保守*** ，而接受错误的程序，就是 ***灾难***
    5. 因此，rust 选择了在 ***编译时*** 对所有权规则进行检查，好处是：在开发过程中就发现问题，而不影响运行时性能



### `RefCell` 的产生

- `RefCell` 实现了 ***内部可变性*** 这种设计模式
- 它能够确保 rust 编译通过，同时在 ***运行时*** 进行所有权规则检查
- 简单来说，就是 ***编译时*** 确定下来的所有权规则（例如非 mut），能够在 ***运行时*** 进行改变（改变为 mut）
- 但要注意的是，不管 ***编译时*** 和 ***运行时*** ，都满足 rust 的 ***所有权规则***



### `Box` & `Rc` & `RefCell`

> 注意：下述讨论针对的是「所存储的数据」，而不是 `Box` / `Rc` / `RefCell` 这些「实例」

所有者：

- `Box` 只能有一个所有者，这个所有者就是 `Box` 实例本身
- `RefCell` 也只能有一个所有者，这个所有者就是 `RefCell` 实例本身
- `Rc` 可以同时存在多个所有者，使用 `Rc::new` 来创建实例，使用 `Rc::clone` 来产生新的所有者

可变性：

- `Rc` 只能获得 不可变性
- `Box` 可以通过 `Deref` / `DerefMut` 获得 可变性/不可变性
- `RefCell` 通过提供的方法可以获得 可变性/不可变性

检查时机：

- `Box` 由编译器检查，在编译时进行
- `Rc` 由编译器检查，在编译时进行
- `RefCell` 在运行时检查，所以需使用 `unsafe` 代码

线程场景：

- `Rc` 和 `RefCell` 都只能用于单线程场景
- 因为 `Rc` 在运行时要维护引用计数，维护资源的清理时机，多线程下会导致计数和销毁错误
- 同时 `RefCell` 在运行时要维护可变/不可变 规则，多线程下会导致错误

所有权规则：

- 不管 ***编译时*** 和 ***运行时*** ，都满足 rust 的所有权规则
- 区别只是 ***检查的时机*** 
- 如果违反了所有权规则，则 ***编译时*** 提示编译错误，而 ***运行时*** 则程序 `panic!`

总结：

- 它们都是一种自定义数据类型，目的是用来存储和维护数据
- 所以，这里有两个概念：对应类型的实例 obj 、实例中所存储的数据 data
- 因此，obj 依然是满足 ***编译时*** 的 rust 所有权规则
- 同时，data 则通过这些类型和方法的封装，在 ***编译时*** 或 ***运行时*** 具备了不同的行为



## 详解 `RefCell`

### 问题回顾

下面是一个最简单的例子，回顾一下 rust 的所有权规则：

```rust
let x = 5;
let y = &mut x;
```

则编译错误提示：

```shell
let x = 5;
let y = &mut x;
    ^^^^^^ cannot borrow as mutable
```

错误剖析：

- 已经有一个不可变值，即 x
- 所以，不能再 `&mut` 方式借用该值
- 因为 `&mut x` 会改变 x 的可变性

解决方式：

- 也就是说，一旦数据确定了可变性，则后续都不允许改变这种可变性
- 这个规则是 rust 编译器在编译时的行为，否则该程序就不被 rust 编译器所接受
- 而 `RefCell` 的作用，就是允许在运行时来改变这种可变性



### 使用方式

使用方式：

- 使用 `RefCell::new(x)` 创建一个实例，存储数据 x
- 使用 `borrow()` 得到数据 x 的 非 mut 引用
- 使用 `borrow_mut()` 方法得到数据 x 的 mut 引用

本质：

- `borrow()` 得到的是 `std::cell::Ref` 类型的智能指针
- `borrow_mut()` 得到的是 `std::cell::RefMut` 类型的智能指针
- 而 `std::cell::Ref` 和 ` std::cell::RefMut` 这两个智能指针都实现了 `Deref` 这个 trait

举例：

```rust
// 创建一个 RefCell 实例
// 该实例存储一个 i32 数据
let y = RefCell::new(5);

// 得到数据的非 mut 引用并打印
println!("{:?}", y.borrow());

// 得到数据的 mut 引用并改变其内容
// 注意这里需要使用 * 来解引用
*y.borrow_mut() = 6;

// 再次得到数据的非 mut 引用并打印
println!("{:?}", y.borrow());
```

打印结果是：

```shell
5
6
```

剖析：

- 上面的代码对一个 `i32` 数据进行操作
- 对该 `i32` 数据，有 mut 引用，同时也有非 mut 引用
- 如果不使用 `RefCell` ，则编译器是不接受这样的操作的
- 但是通过 `RefCell` ，我们在运行时实现了这样的操作



### 运行时检查

检查规则：

- `RefCell` 会在 ***运行时*** 记录当前有多少个 ***活动的*** `std::cell::Ref` 和 `std::cell::RefMut` 智能指针
- 在调用 `borrow()` 或 `borrow_mut()` 时，`RefCell` 会分别将 `Ref` 或 `RefMut` 的计数加一，而当 `Ref` 或 `RefMut` 离开生存范围时，对应计数减一
- 而所有权规则与 ***编译时*** 一样，在任何时候，只能拥有一个可变引用，或者多个不可变引用，二选一



#### 举例：不允许同时存在 `&` 和 `&mut`

注意看注释：

```rust
// 创建 RefCell 实例
let y = RefCell::new(5);
// 得到 &mut
let mut m1 = y.borrow_mut();

// 得到 & ，但是此时 m1 这个 &mut 仍然存在
// 因此这句代码会导致运行时 panic!
println!("{:?}", y.borrow());
```

编译正确，但运行时 `panic!` ：

```shell
panicked at 'already mutably borrowed: BorrowError'
```

可以改一下这段代码，先将 `m1` 提前销毁，再获取 `&` ，则运行正确：

```rust
let y = RefCell::new(5);
let mut m1 = y.borrow_mut();

// 销毁 m1
// 因此 &mut 计数为 0
drop(m1);

// 此时可以获取 &
println!("{:?}", y.borrow());
```



#### 举例：不允许同时存在多个 `&mut`

代码如下：

```rust
let y = RefCell::new(5);

let mut m1 = y.borrow_mut();
let mut m2 = y.borrow_mut();
```

便以正确，但运行时 `panic!` ：

```shell
panicked at 'already borrowed: BorrowMutError'
```

可以改一下这段代码，现将 `m1` 提前销毁，再获取 `&mut` ，则运行正确：

```rust
let y = RefCell::new(5);

let mut m1 = y.borrow_mut();
drop(m1);
let mut m2 = y.borrow_mut();
```



## 结合 `Rc` & `RefCell`

### 规则

- `Rc` 可以让多个所有者来拥有同一份数据
- `RefCell` 可以在运行时改变数据的可变性，但是该数据只能有一个所有者，也就是 `RefCell` 实例本身
- 因此，结合 `Rc` 和 `RefCell` ，就可以实现：
    1. 对于同一份数据，可以存在多个所有者
    2. 这些所有者都可以在运行时改变该数据的可变性



### 举例

看下面的例子，并注意看注释：

```rust
// 用 RefCell 存储数据 5
let a = Rc::new(RefCell::new(5));
println!("{:?}", a);

// b 和 c 都拥有了数据 5
let b = Rc::clone(&a);
let c = Rc::clone(&a);

// b 将数据修改为 6
*b.borrow_mut() = 6;
println!("{:?}", a);

// c 将数据修改为 7
*c.borrow_mut() = 7;
println!("{:?}", a);
```

该例子编译正确，也运行正确：

```shell
RefCell { value: 5 }
RefCell { value: 6 }
RefCell { value: 7 }
```



### 改进 `Cons`

继续改进之前使用的 `Cons` 例子，注意看注释：

```rust
#[derive(Debug)]
enum RList {
    // i32 可以有多个所有者，且可以运行时被改变
    Cons(Rc<RefCell<i32>>, Rc<RList>),
    Nil,
}

use RList::*;
use std::rc::Rc;
use std::cell::RefCell;

fn main() {
    let value = Rc::new(RefCell::new(5));

    // value 被 a、b、c 共享
    // a 又被 b、c 共享
    let a = Rc::new(Cons(Rc::clone(&value), Rc::new(Nil)));
    let b = Cons(Rc::new(RefCell::new(100)), Rc::clone(&a));
    let c = Cons(Rc::new(RefCell::new(200)), Rc::clone(&a));

    // 更改 value 的值 
    *value.borrow_mut() += 50;

    // 则 a、b、c 里面的值也都被改变
    println!("a = {:?}", a);
    println!("b = {:?}", b);
    println!("c = {:?}", c);
}
```

该例子编译正确，也运行正确：

```shell
a = Cons(RefCell { value: 55 }, Nil)
b = Cons(RefCell { value: 100 }, Cons(RefCell { value: 55 }, Nil))
c = Cons(RefCell { value: 200 }, Cons(RefCell { value: 55 }, Nil))
```



## Mock Object

### 概述

- ***test double*** 是一种通用的编程概念
- 它表示一种类型，用于替代所要测试的那个真实类型
- 而 ***mock object*** 就是 ***test double*** 的一种特定类型
- 关于 ***mock object*** 详情，可以单独学习，不是本书的内容
- rust 没有内建的 ***mock object*** ，但我们可以来模仿该功能，并且会使用到 `RefCell`



### 场景剖析

首先我们开发了一个功能 `NotifySth`：

- `NotifySth` 的功能是，接收一个数值，并判断该数值比 100 大还是 比 100 小（不要介意这个弱智的功能，目的只是要演示 `RefCell` 的用途）
- 如果比 100 大，则发出「消息」，这个「消息」体现为字符串

其次，需要「消息接收者」`Messenger` ：

- `Messenger` 用来接收消息
- 同时，`NotifySth` 只负责传递消息给 `Messenger` ，而不关注 `Messenger` 对消息会进行何种处理，例如发送短信，或者发送邮件

因此，问题来了：

- 为了测试 `NotifySth` ，我们就需要 `Messenger` 
- 但是，可能 `Messenger` 的环境太复杂，会实际发送短信或邮件，测试环境不一定能满足发短信/邮件的条件
- 而我们关注的测试点是：`NotifySth` 是否发出了「消息」；而不是关注短信或邮件有没有发送成功
- 所以，我们就需要 **mock object** ，来替代 `Messenger` 的功能，从而达到测试 `NotifySth` 的目的



### 场景实现

>  首先，需要将 `Messenger` 定义为 trait ：

```rust
pub trait Messenger {
    fn send(&self, msg: &str);
}
```

注意：

- 该 trait 的方法是 `send` ，通过调用该方法，实现消息的传递
- 我们只关注消息能够传递，而不关注是该消息是如何被处理的
- 因此，我们只应该将形参声明为 `&self` ，而不是 `&mut self`
- 所以，对于 `&self` ，可以接受 `&mut obj` 的实参，也能接收 `& obj` 的实参
- 也就是说，`&self` 这种形参（功能的提供者），对于实参（功能的使用者）的可变性没有要求

> 其次，实现 `NotifySth` ，具体参见注释：

```rust
pub struct NotifySth<'a, T: 'a + Messenger> {
    // 保存「消息接收者」
    messenger: &'a T,
}

impl<'a, T: Messenger> NotifySth<'a, T> {
    pub fn new(messenger: &T) -> NotifySth<T> {
        NotifySth { messenger }
    }

    pub fn check_value(&self, value: i32) {
        if value > 100 {
            // 若大于100则发送消息给「接收者」
            self.messenger.send("value is greater than 100");
        }
    }
}
```

> 然后，为了测试 `NotifySth` ，我们需要为 `Messenger` 实现一个 mock object ：

```rust
#[cfg(test)]
mod tests {
    use super::*;

    // 这就是 mock object
    struct MockMessenger {
        // 它存储着消息列表
        msg_list: Vec<String>,
    }

    impl MockMessenger {
        fn new() -> MockMessenger {
            MockMessenger { msg_list: vec![] }
        }
    }

    impl Messenger for MockMessenger {
        fn send(&self, msg: &str) {
            // 它接收到消息以后，将消息存储到列表
            // 但这句代码是编译不通过的，因为不是 &mut self
            self.msg_list.push(String::from(msg));
        }
    }

    #[test]
    fn greater_than_100() {
        let mm = MockMessenger::new();

        NotifySth::new(&mm).check_value(101);
        assert_eq!(mm.msg_list.len(), 1);
    }
}
```

针对上面的问题，就可以使用 `RefCell` ：

```rust
#[cfg(test)]
mod tests {
    use super::*;
    use std::cell::RefCell;

    // 这就是 mock object
    struct MockMessenger {
        // 使用 RefCell 来存储 Vec
        msg_list: RefCell<Vec<String>>,
    }

    impl MockMessenger {
        fn new() -> MockMessenger {
            // 创建 RefCell 实例来存储 Vec
            MockMessenger { msg_list: RefCell::new(vec![]) }
        }
    }

    impl Messenger for MockMessenger {
        fn send(&self, msg: &str) {
            // 通过 borrow_mut() 来获得 Vec 的可变引用
            // 从而实现在 Vec 中加入消息
            // 这样的话，就不需要 &mut self
            self.msg_list.borrow_mut().push(String::from(msg));
        }
    }

    #[test]
    fn greater_than_100() {
        let mm = MockMessenger::new();

        NotifySth::new(&mm).check_value(101);
        // 通过 borrow() 来获得 Vec 的不可变引用
        assert_eq!(mm.msg_list.borrow().len(), 1);
    }
}
```



## 后记

### 权衡 `RefCell`

- `RefCell` 在 ***运行时*** 而不是 ***编译时*** 进行所有权规则的检查

- 这意味着有些错误可能在开发后期、甚至是生产环境上才能被发现

- 而且，***运行时检查*** 还会带来一定程度的运行时性能损耗

- 但是，`RefCell` 带来了比常规引用更多的功能，比如 ***内部可变性***



### 其它类型

- rust 标准库除了 `RefCell` ，还有 `Cell` ，它们都实现了  ***内部可变性*** ，区别是：

    1. `RefCell` 对外提供数据时，是 ***引用*** ，即 `&` 或 `&mut`
    2. `Cell` 对外提供数据时，是 ***拷贝*** ，而 ***浅拷贝(Move机制)*** 或 ***深拷贝(Copy特性)*** ，则取决于具体的数据类型（*参考 Chapter4 的所有权讲解*）

- rust 标准库还提供了 `Mutex` ：

    1. `Mutex` 也实现了  ***内部可变性*** 
2. 但是 `Rc` 和 `RefCell` 都只能用于单线程场景
    3. 而 `Mutex` 可以使用于多线程场景
    4. Chapter16 会详细讨论 `Mutex`

