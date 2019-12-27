# 17.1. 对象特征

本章内容：

- rust 被很多编程范式所影响，包括面向对象编程，还有 Chapter13 讲到的函数式编程
- 面向对象的特性一般是：***对象***、***封装***、***继承*** ，本章会讲解这些概念，以及 rust 如何支持它们



## 对象

由 Erich Gamma、Richard Helm、Ralph Johnson、John Vlissides 编写的书《*Design Patterns: Elements of Reusable Object-Oriented Software*》，被俗称为 `The Gang of Four` ，这样定义面向对象编程：

>*Object-oriented programs are made up of objects. An object packages both data and the procedures that operate on that data. The procedures are typically called methods or operations.*
>
>面向对象的程序由对象组成。一个 ***对象*** 包含数据和对数据的操作。对数据的这些操作被称为 ***方法*** 。

根据这个定义，rust 是面向对象的：

- `struct` 和 `enum` 包含了数据
- `impl` 提供了方法
- 虽然带有方法的 `struct` 和 `enum` 在 rust 中不被称为 ***对象*** ，但提供了与 ***对象*** 相同的功能



## 封装

封装的思想：

- ***对象的实现细节*** 不能被 ***对象的使用者*** 获取到
- 所以，唯一与对象交互的方式是：对象提供的公有 API
- 对象的使用者无法深入到对象内部，从而无法直接改变对象的数据和行为
- 因此，封装的优点是：重构对象内部时，不需要重构对象使用者

rust 的封装：

- 使用 `pub` 来决定哪些 module、type、function、method 是公有的
- 而默认情况下，其它一切都是私有的

下面看一个例子：

```rust
// 该 struct 是 pub
// 但 struct 中的数据是私有的
pub struct AvgCollection {
    // 私有 - 用 Vec 来存储 i32
	list: Vec<i32>,
    // 私有 - Vec 中所有 i32 的平均值
	avg: f64,
}

// 为 struct 提供操作
impl AvgCollection {
    // 公有 - 增加一个 i32数据
	pub fn add(&mut self, val: i32) {
        // 在 Vec 中增加该 i32 数据
		self.list.push(val);
        // 自动计算出最新的平均值
		self.cal_avg();
	}

    // 公有 - 通过该公有 API ，获得平均值
	pub fn avg(&self) -> f64 {
		self.avg
	}

    // 私有 - 只有该 struct 内部可以计算平均值
	fn cal_avg(&mut self) {
		let total: i32 = self.list.iter().sum();
        // 私有数据 avg 只有该 struct 内部才能修改
		self.avg =  total as f64 / self.list.len() as f64;	
	}
}
```

代码剖析：

- 提供了公有的 struct ，即 `AvgCollection`
- 在 `AvgCollection` 中，数据成员都是私有的
- 而与 `AvgCollection` 交互的唯一方式，是 `add（）` 、`avg（）` 这几个公有 API
- 也就是说，通过这些公有 API，可以增加 `i32` 数据，并获取最新的平均值，且内部自动确保平均值是最新的
- 而对于使用者来说，无法直接修改 `list` 、 `avg` 这些内部数据，因为这可能导致 `list` 与 `avg` 的值不同步
- 另外，一旦 `add（）` 、`avg（）` 这些公有 API 的签名确定之后，我们就可以修改该 struct 的内部细节，例如将 `Vec<i32>` 修改为 `HashSet<i32>` ，但这不会影响到该 struct 的使用者



## 继承

关于继承：

- 继承的机制是：一个对象（子类型）可以继承另一个对象（父类型），从而子类型可以直接获得父类型的数据和行为
- 继承的目的之一，是为了重用代码：子类型可以重用父类型的数据和行为；但继承的缺点是：***为了重用代码，从而引入了更多的代码***（这一点应该很好理解）
- 继承的目的之二，是为了实现 ***多态***

rust 的继承：

- rust 使用了与其它面向对象编程语言所不同的继承方案，针对这一点，可以说 rust 不是面向对象的，但这样的讨论没有意义
- 第一方面，重用代码：
    - rust 提供了 trait 机制
    - 而 trait 的方法可以有默认的实现，例如 Chapter10 中就有这样的例子
    - 所以，如果某个类型实现了该 trait，且该 trait 的方法有默认实现，则该类型可以不再实现该方法
    - 相反，该类型也可以重新实现该 trait 的方法，这类似于子类型覆盖了父类型的方法
- 第二方面，实现多态：
    - rust 通过 ***泛型*** 来对不同的类型进行抽象
    - 然后通过 ***Trait*** 来约束这些类型的功能
    - 这被称为 ***参数多态***（***bounded parametric polymorphism***）

