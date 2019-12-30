# 17.2. Trait 对象

## 场景

- 为了讲解本节内容，需要先基于一个场景：
    - 考虑一个 GUI 库中的组件
    - 这些组件可能有 `Button` ，`TextField` 等
    - 甚至该 GUI 库的使用者会自行扩充组件，例如 `Image` ，`SelectBox` 等
    - 但是，虽然这些组件的功能不同，但它们都有一个 `draw` 方法用来进行绘制，虽然每个组件的绘制行为可能不同
- 那么，在 C++ 中，我们可以这么做：
    - 定义一个 `Component` 纯虚类
    - 该纯虚类中有一个 `daw` 虚方法
    - 而各个组件，诸如 `Button` ，`TextField` 等，都继承 `Component` 类，并提供自己的 `draw` 实现
    - 然后，我们可以使用 `Component*` 类型的参数，这个参数可以接收诸如 `Button` ，`TextField` 等对象
- 但 rust 的做法跟 C++ 不一样，因为 rust 不是这样实现继承的：
    - 对于 `Component` ，rust 可以定义为 trait
    - 对于 `Component*` 参数，rust 可以使用泛型参数，但在编译期就进行了参数演绎，无法实现多态
    - 所以，rust 提供了 ***trait 对象***（***trait object***），用来实现多态
    - 下面逐步来讲解 rust 的方式



## 实现 trait

> 先定义 trait

```rust
// trait 名称是 Component
trait Component {
    // 该 trait 有 draw 方法
	fn draw(&self);
}
```

> 定义组件 Button

```rust
struct Button {
    // Button 有长宽等数据
	width: u32,
	height: u32,
}

// 为 Button 实现 Component Trait
impl Component for Button {
	fn draw(&self) {
	}
}
```

> 定义组件 TextField

```rust
struct TextField {
    // TextField 有文本内容等数据
	txt: String,
}

// 为 TextField 实现 Component Trait
impl Component for TextField {
	fn draw(&self) {
	}
}
```



## 使用泛型参数

在 Chapter10 中讲解过泛型，那么使用泛型参数的代码是这样的：

```rust
// 形参 t 是泛型的
// 并要求实参实现了 Component Trait 
fn comp_draw<T: Component>(t: T) {
	t.draw();
}
```

测试代码：

```rust
fn main() {
    // 创建 Button 实例 b
	let b = Button {
		width: 20,
		height: 10,
	};
    // 传递实参 b
	comp_draw(b);

    // 创建 TextField 实例 t
	let t = TextField {
		txt: String::from("TextField1"),
	};
    // 传递实参 t
	comp_draw(t);
}
```

剖析：

- 上述代码通过泛型参数，可以接收所有实现了 `Component` 这个 trait 的实参
- 但本质上，泛型参数是在 ***编译期*** 进行演绎的，详情可参考 Chapter10
- 也就是说，上面的例子里，只定义了一次 `comp_draw` 函数，并在调用 `comp_draw` 函数时，传递了 `Button` 和 `TextField` 两种类型的实参
- 但本质上，rust 编译器会自动演绎为两个 `comp_draw` 函数，例如可能是这样的：
    - `comp_draw_1(b: Button)`
    - `comp_draw_1(t: TextField)` 
- 所以，从本质上说，这种实现方式并不是多态



## *trait object*

### 概述

用途：

- 泛型参数的意义是，在 ***编译期*** 抽象一种符合 trait 规范的数据类型
- 但是，在 ***运行时*** ，对某种数据类型来说，实例化之后叫做 ***实例*** 或者 ***对象***
- 所以我们希望达成另一点：在 ***运行时*** 抽象一种符合 trait 规范的 ***对象*** ，这就是 ***trait object***

语法：

- 使用 `dyn` 关键字，后接 trait 名称，例如 `dyn Component`
- 但由于编译器无法知道该对象的大小，所以只能使用 `&` 或 `Box` ，原因可以理解，因为符合该 trait 规范的对象大小是千差万别的，编译器无法知道，细节会在 Chapter19 讲解
- 所以，语法可能是 `&dyn Component` ，或者 `Box<dyn Component>`
- 总之，基于 `dyn` 关键字，然后必须用指针来存储 trait object
- 因此，诸如 `Box<dyn Component>` 这样的语法就是 trait object ，从而就可以实现多态，类似与 C++ 的 `Component*`



### 代码改进

对上面使用泛型参数的代码进行改进，但会稍微复杂一点：

```rust
struct Screen {
	comps: Vec<Box<dyn Component>>,
}

impl Screen {
	fn run(&self) {
		for c in &self.comps {
			c.draw();
		}
	}
}
```

剖析：

- 上面定义一个 struct ，其中的 `comps` 用 `Vec` 来存储对象列表
- 而 `comps` 中存储的这些对象符合 `Component` 这个 trait 规范
- 然后为 `Screen` 实现方法，调用 `comps` 中的各个对象的 `draw` 方法

测试代码：

```rust
fn main() {
	let s = Screen {
		comps: vec![
			Box::new(Button {
				width: 20,
				height: 10,
			}),
			Box::new(TextField {
				txt: String::from("TextField1"),
			}),
		],
	};
	s.run();
}
```

由此可见：

- 上述代码考虑的是运行时的对象
- 所存储的也是符合某种 trait 规范的对象
- 且上述代码就是多态的例子



### 类型检查

- rust 的类型系统能够确保 trait 对象一定符合 trait 规范
- 而且是在编译时进行检查，而不是运行时

```rust
fn main() {
	let s = Screen {
		comps: vec![
            // 编译正确
			Box::new(Button {
				width: 20,
				height: 10,
			}),
            // 编译错误
            // 因为 String 没有实现 Component 这个 trait
			Box::new(String::from("error")),
		],
	};
	s.run();
}
```

编译错误提示如下：

```shell
Box::new(String::from("error")),
^^^the trait `Component` is not implemented for `String`
```

需要注意的是：

- rust 编译器会进行类型检查，但要注意所检查的是：实例是否实现了 trait ，而不是检查该实例的具体类型
- 所以，对于上面的例子，rust 编译器能够检测到 `String` 实例没有实现 `Component` 这个 trait 
- 同时，一旦符合 trait 规范（例如 `Button` 的实例符合 `Component` 规范，但 `String` 的实例不符合），就会成为一个 trait 对象
- 而一旦成为 trait 对象之后，rust 就忘记了该实例的真实类型，只记住了该实例所符合的 trait（例如 rust 只关注 `Button` 实例实现了 `Component` ，而忘记了其真实的类型是 `Button`）
- 这一点尤其重要，对理解后续的 ***性能探讨*** 和 ***对象安全*** 非常关键



### 总结

- ***trait object*** 的概念是：只关心该值所能反馈的信息，而不关心该值所属的具体类型
- 这类似于动态类型语言中的 ***鸭子类型***（***duck typing***）：
    - 如果它 ***走路*** 像鸭子
    - 那么它 ***就是*** 鸭子
    - 因为我们只关心 ***走路*** 这个特性
    - 所以我们可以把一只鸡当做鸭子，因为鸡会走路
    - 但是我们不会把一条鱼当做鸭子，因为鱼不会走路
- 正如上面的多态例子：
    - rust 不会检查具体的实例是 `Button` 还是 `TextField`
    - rust 只关注这些实例符合 `Component` 特性
    - 而一旦 `Button` 实例符合 `Component` 特性，则 rust 认为这个 `Button` 实例就是 `Component` 这只鸭子



## 性能探讨

### 静态分发

- ***静态分发***（***static dispatch***）针对于泛型
- 如 Chapter10 中所讲解的，编译器会针对每种泛型实参进行演绎，最后转换为非泛型的类型、函数、方法
- 所以，静态分发在编译时进行，也就是说，在编译的时候就知道调用了哪个对象的哪个方法
- 因此，静态分发不会影响运行时性能，甚至编译器还会有选择的内联方法代码来进行优化



### 动态分发

- ***动态分发***（***dynamic dispatch***）针对 trait object
- 动态分发在运行时进行，因为在编译时无法知道调用了什么方法
- 所以，针对动态分发，编译器会自动生成一些代码，通过这些代码，在运行时才能确定调用了什么方法
- 粗略来说，rust 在运行时会使用 trait object 中的指针，来确定所调用到的方法（没有详细研究这种实现机制，但与 C++ 是类似的，可以参看本人 blog 中的 《从内存模型分析 C++ 的面向对象机制》）
- 因此，动态分发带来了灵活性，但也带来了性能损耗
- 而且，动态分发也会阻止编译器内联方法代码，从而禁用了一些优化



## *object safe*

### 规则

- 只有 ***对象安全***（***object safe***）的 trait ，才能用于 ***trait 对象***（***trait object***）
- 如果一个 trait 中，所有的方法都满足如下属性，则该 trait 是对象安全的：
    1. 返回值类型不是 `Self` 
        - 因为 trait 对象关注的是对象本身，而不是对象所属的具体类型
        - 如果 trait 方法返回 `Self` ，可是 trait 对象早已忘记了自己的具体类型
        - 所以 trait 方法也就无法知道 `Self` 究竟是什么类型，进而也无法使用这种类型
    2. 方法没有任何泛型参数
        - 如果 trait 方法中有泛型参数，则编译器会根据实参类型，演绎为不同的 trait 方法
        - 这些被编译器所演绎后的 trait 方法，是与具体的类型信息相对应的
        - 可问题是，trait 对象早已忘记了自己的具体类型
        - 所以，面对一个 trait 对象时，rust 无法为该 trait 对象匹配具体的 trait 方法



### 举例

>标准库中 `Clone` 这个 trait 不符合对象安全规则

在 `Clone` 这个 trait 里，有一个 `clone` 方法，其签名如下：

```rust
pub trait Clone {
    fn clone(&self) -> Self;
}
```

而 String 实现了 `Clone` 这个 trait ：

```rust
let s1 = String::from("s1");
let s2 = String::clone(&s1);
```

也就是说：

- 调用 String 的 `clone` 方法，返回 `Self` ，而 `Self` 类型是 String ，也就是得到一个 String 类型的实例
- 而如果其它类型例如 `TypeA` 也实现了 `Clone` 这个 trait，那么调用 `TypeA` 的 `clone` 方法，就会得到一个 `TypeA` 类型的实例
- 所以，`clone` 这个 trait 方法所返回的 `Self` 类型是可变的，且与 trait 对象所属的类型是一致的，但问题是，trait 对象早已忘记了（也不想知道）自己是什么类型

> 如果代码违反了对象安全规则，编译器会提示：

```rust
fn clone_trait(c: &dyn Clone) {	
}
```

错误提示如下：

```shell
the trait `std::clone::Clone` cannot be made into an object
```

>但是，泛型没有这些规则限制：

```rust
fn clone_trait<T:Clone>(c: &T) -> T {
	c.clone()
}

fn main() {
	let s = String::from("sth");
	println!("{:?}", clone_trait(&s));
}
```

