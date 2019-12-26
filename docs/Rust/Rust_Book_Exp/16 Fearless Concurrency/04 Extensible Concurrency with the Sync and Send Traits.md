# 16.4. `Send` & `Sync`

## 理念

- 有趣的是，rust 语言几乎没有关于并发的特性
- 本章所讨论的并发特性，几乎都属于标准库，而不是语言本身
- 但是，在处理并发时，我们不需要局限于 rust 语言和标准库
- 我们可以开发自己的并发特性，或使用别人已经开发好的
- 但是，rust 语言中内嵌了几个并发的概念：`Send` 和 `Sync` ，它们属于 trait ，在 `std::marker` 中



## 原则

- `Send` 和 `Sync` 属于 ***标记***（***marker***）trait ，甚至不需要实现任何方法
- 这些 trait 可以强制 rust 对并发相关的不变性进行检查
- 在 rust 中：
    - 几乎所有的 primitive 类型都是 `Send` & `Sync`
    - 完全由 `Send` & `Sync` 类型所构成的新类型，也自动是 `Send` & `Sync`
- 因此，通常并不需要手动实现 `Send` & `Sync` 
- 而手动实现这些标记 trait 会涉及 unsafe 代码，在 Chapter19 会讲解
- 另外，在构建新的并发类型时，若存在非 `Send` & `Sync` 类型，则需要格外小心，[The Rustonomicon](https://doc.rust-lang.org/stable/nomicon/) 中做了详细讲解



## `Send`

- `Send` 表示这种数据类型对应的所有权可以在线程之间传递
- 几乎所有的 rust 数据类型都是 `Send` ，但也有一些例外，比如 `Rc<T>` ：
    - 如果克隆了一个 `Rc` 并将所有权交给子线程，则主线程和子线程都可能同时修改引用计数，进一步引起资源管理错误
    - 而事实上，rust 编译器也不会允许这么做：例如在 Chapter16.3 的例子代码中，将 `Arc<Mutex<i32>>` 换成 `Rc<Mutex<i32>>` ，则编译器会提示 `the trait Send is not implemented for Rc` ，但使用 `Arc<Mutex<i32>>` 就没有问题
    -  而这些安全保障，就是通过 rust 的类型系统和 trait 限制来做到的
    - 因此，`Rc<T>` 是为单线程场景而设计的，它也不需要为了线程安全而付出性能代价
- 对于一种数据类型，如果都由 `Send` 类型组成，则这种数据类型自动就是 `Send`
- 所有的 primitive 类型都是 `Send` ，除了 raw pointer ，在 Chapter19 会讲解



## `Sync`

- `Sync` 表示这种数据类型可以安全的被多个线程引用
- ***规则***：对于数据类型 `T` ，如果 `&T` 是 `Send` ，则 `T` 是 `Sync`
- 这个规则的意思是：`&T` 可以被安全的 `Send` 到其它线程
- 与 `Send` 同理，下面这些类型也不是 `Sync` ：
    - `Rc`
    - `RefCell`
    - `Cell`
    - 这些类型所实现的借用规则检查（运行时执行），***并不是*** 线程安全的
- 而对应的，下面这些类型是 `Sync` ：
    - `Arc` 
    - `Mutex` 
    - 这些类型所实现的借用规则检查（运行时执行），***是*** 线程安全的
- 与 `Send` 一样：
    - 对于一种数据类型，如果都由 `Sync` 类型组成，则这种数据类型自动就是 `Sync`
    - 所有的 primitive 类型都是 `Sync` 

