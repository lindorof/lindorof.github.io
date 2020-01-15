# 17.3. 状态模式

*源码：[ch17-3-blog](https://gitee.com/lindorof/Rust_The_Book/tree/master/ch17-3-blog)*



## 概述

本节会讲解一种面向对象的设计模式：***状态模式***（***state pattern***）：

- 根据业务需求，设计出一系列的状态
- 这些状态可以体现为一个个的 ***状态对象***（***state object***）
- 对于一个状态对象来说：
    1. 只负责在当前状态下的对应行为
    2. 负责在某个时机（例如方法调用）转变为另一个状态
- 对于使用者（或包含这些状态对象的值）来说：
    1. 不知道当前处于什么状态
    2. 不知道何时转变为下一个状态
    3. 不知道某个行为（例如方法）调用在不同状态之间会有什么不同

状态模式的优点：

- 当业务规则改变时，不需要更改使用者的代码
- 而只需要更新某个状态对象中的代码
- 或者增加更多的状态对象

状态模式的缺点：

- 由于一个状态需要负责转变到另一个状态，因此状态之间可能会相互联系
- 例如，原先的状态规则是 A → B → C ，但在 A 和 B 之间增加了状态 A1 ，即 A → A1 → B → C ，则需要更改原先设计好的状态对象 A ，让 A 负责切换到 A1 而不是 B

关于状态模式的实现：

- 需要注意的是，所谓 ***状态模式***（***state pattern***）和 ***状态对象***（***state object***）只是设计模式中的术语
- 设计模式只是讲解该模式的设计思路，不涉及具体的编程语言实现

在 rust 中可考虑几种实现方式：
- 将各个状态实现为 ***trait 对象***（***trait object***）：
    - 这些 trait 对象都具有同样的方法
    - 但同一个方法在不同的 trait 对象间具有不同的行为
    - 使用者不知道当前实际是什么状态，只负责调用方法
    - 但缺点是：
        1. 所有的 trait 对象都需要实现同样的方法，即使有些方法不该在此状态上调用（当然，调用了也不能产生影响，这是由该 trait 对象来保证的，而正是带来重复代码的原因）
        2. 虽然我们会想到 trait 方法的默认实现，但这是有限制的，例如无法直接返回 `self` ，这不得不导致各个 trait 对象实现冗余代码

- 将各个状态实现为不同的类型（***type***）：
    - 为不同的状态设计不同的类型
    - 因此，不同的状态所能调用的方法也是不同的
    - 所以，若调用了某个状态所不具备的方法，编译器会给出错误提示



## 场景

考虑一个发布 blog 的方案，设计为不同的状态：

- 【草稿状态】Draft
    - 可以增加文本
    - 请求审核后进入审核状态
- 【审核状态】PendingReview
    - 可以回退到草稿状态
    - 两次请求发布后进入发布状态
- 【发布状态】Published
    - 能够获得 blog 内容
    - 不能切换到其它状态



## 实现 - *trait object*

### 定义 *trait*

抽象出如下方法：

1. 增加文本，只有文稿状态能够增加文本
2. 请求审核，进入审核状态
3. 拒绝审核，退回到文稿状态
4. 请求发布，进入发布状态
5. 获取内容，只有发布状态能够获得内容

```rust
pub trait SOState {
	fn add_text(&mut self, _: &str) { }
	fn review(self: Box<Self>) -> Box<dyn SOState>;
	fn reject(self: Box<Self>) -> Box<dyn SOState>;
	fn approve(self: Box<Self>) -> Box<dyn SOState>;
	fn content(&self) -> &str { "" }
}
```

分别讲解：

- `add_text` 
    - 涉及到文本内容改变，因此使用 `&mut self`
    - 该方法只会改变自身的内容，不会涉及到状态的切换
    - 由于只在文稿状态下能够改变内容，因此为该方法提供默认的空实现
- `review` & `reject` & `approve`
    - 这几个方法可能涉及到状态的切换，因此需要消费当前状态的所有权，即使用 `self`
    - 并不是任何方法调用都会引起状态切换，例如在文稿状态调用 `approve` ，此时仍然是在文稿状态，也就是仍然返回自身，即 `self` ；甚至对每个状态来说，大多数的方法调用都是如此
    - 所以，对每个状态对象（即 trait 对象）来说，会存在很多冗余的方法实现，但我们也无法为该 trait 提供默认方法实现，因为我们无法在 trait 方法中直接返回 `self` ，否则编译器会提示「无法确定 `self` 的空间大小」
    - 使用 `self: Box<Self>` 语法的目的，是为了让 rust 自动为我们完成从  `self` 到 `Box<Self>` 的装箱过程，这样做的好处是，如果方法实现是直接返回自身，则可以直接返回 `self` ，就能得到 `Box<dyn SOState>` 这样的 trait 对象
    - 当然，不使用 `self: Box<Self>` 这样的修饰也是可以的，参数直接为 `self` ，那么在需要返回自身时，为了符合 `Box<dyn SOState>` 这样的返回值类型，就需要手动装箱，例如 `Box::new(self)`
- `content`
    - 该方法获取文稿内容，只在发布状态下有用
    - 因此为该方法提供默认的实现，返回空的内容



### 文稿状态

定义对应的 struct ：

```rust
struct SODraft {
    // 保存文本内容
	content: String,
}
```

然后实现 trait ：

```rust
impl SOState for SODraft {
    // 增加文本
	fn add_text(&mut self, text: &str) {
		self.content.push_str(text);
	}
    // 请求审核后，切换到审核状态
	fn review(self: Box<Self>) -> Box<dyn SOState> {
		Box::new(
			SOPendingReview {
				content: self.content,
				approve_count: RefCell::new(0),
			}
		)
	}
	fn reject(self: Box<Self>) -> Box<dyn SOState> {
		self
	}
	fn approve(self: Box<Self>) -> Box<dyn SOState> {
		self
	}
}
```

剖析：

1. 对文稿状态来说，只能增加文本，以及请求审核，即 `add_text` 和 `review` 方法
2. 关于 `review` 方法：
    - 此时需要切换到审核状态，因此需要创建新的审核状态对象
    - 审核状态的 struct 定义后续会讲解
3. 关于 `reject` 和 `approve` 方法：
    - 在文稿状态，调用这两个方法都不应该引起状态切换
    - 因此，这两个方法调用后，仍然是返回当前状态，即 `self`
    - 所以，这两个方法的实现是冗余的，但没有办法，因为 trait 方法的默认实现中，无法直接返回 `self`
    - 对于后续的状态，也会存在这样的冗余，因此后续的状态里，这些冗余的方法代码不再复制到本书中

4. ***关于所有权***：
    - 可以看到有的方法参数是 `self` ，即当前状态的所有权被转移到了方法中
    - 如果方法仍然返回当前状态，即返回 `self` ，则当前状态的所有权又从该方法转移给调用者，也就是说，只是同一个状态的所有权发生了几次转移，并没有额外的状态创建、状态销毁等操作
    - 如果方法需要返回新的状态，则创建新的状态并返回，而当前状态的生存周期在该方法结束后就已终止，从而被 rust 自动销毁



### 审核状态

定义审核状态的 struct ：

```rust
struct SOPendingReview {
	content: String,
	approve_count: RefCell<i32>,
}
```

剖析：

1. 后续每个状态都会有 `content` 成员，用来保存文稿数据：
    - 虽然只有发布状态才能获得文稿数据，但文稿数据又是在文稿状态添加进去的
    - 而每个状态又是逐渐递进转换的，所以为了将文稿数据的内容最终传递到发布状态，就需要中间的每个状态都可以存储文稿数据
    - 而要特别说明的是，文稿数据内容可能很多，但将文稿数据从上一个状态传递给下一个状态时，并不需要文稿数据的克隆或深度拷贝
    - 因为每个状态的方法调用都是用 `self` 传递的，所以要将文稿数据传递给下一个状态时，直接将 `content` 的所有权传递给下一个状态即可
    - 所以，在前面文稿状态里，`review` 方法需要转换到审核状态，所以创建了新的审核状态对象，就是直接将 `content` 所有权传递给了审核状态，即 `content: self.content`
2. 关于 `approve_count` 成员：
    - 根据场景描述，在审核状态下，需要两次请求发布，才能进入到发布状态
    - 因此，需要该成员来记录已请求发布的次数
    - 但 `approve` 方法的参数是 `self` ，而不是 `mut self` ，所以需要用 `RefCell` 来保存该成员



然后为审核状态实现 trait ：

```rust
impl SOState for SOPendingReview {
    // add_text 使用 trait 的默认实现
    // review 方法不产生状态切换

    // 退回到文稿状态，会产生状态切换
	fn reject(self: Box<Self>) -> Box<dyn SOState> {
		Box::new(
			SODraft {
				content: self.content,
			}
		)
	}
    // 需要请求发布两次，才切换到发布状态
	fn approve(self: Box<Self>) -> Box<dyn SOState> {
		*self.approve_count.borrow_mut() += 1;
		
		if *self.approve_count.borrow() >= 2 {
			Box::new(
				SOPublished {
					content: self.content,
				}
			)
		} else {
			self
		}
	}
}
```

剖析：

1. `reject` 会产生状态切换，就是切换到文稿状态：
    - 创建新的文稿状态，而当前审核状态被方法结束后被销毁
    - 同时 `content` 所有权直接转移给文稿状态

2. `approve` 需要增加和判断请求发布的次数：
    - 若请求发布的次数达到两次，则切换到发布状态，对应的，`content` 的所有权也是直接转移给发布状态
    - 若请求发布的次数未达到两次，则依然停留在审核状态，直接返回 `self`



### 发布状态

发布状态只需要保存文稿数据：

```rust
struct SOPublished {
	content: String,
}
```

然后为发布状态实现 trait ：

```rust
impl SOState for SOPublished {
    // add_text 使用 trait 的默认实现
    // review/reject/approve 方法不产生状态切换

    // 只有审核状态才能获取文稿内容
	fn content(&self) -> &str {
		&self.content
	}
}
```

剖析：

1. 对于发布状态来说，唯一的功能就是获取文稿内容
2. 因此从文稿状态开始的 `content` 数据，所有权最终被传递给发布状态



### 使用

现在考虑如何使用上述状态：

- 需要新建一个文稿，也就是得到了初始状态（文稿状态）
- 得到初始状态以后，就可以调用不同的方法
- 不同方法的调用可能会产生新的状态切换，但对使用者来说这个切换过程是透明的



因此，我们还需要提供一个建立初始状态的方法：

```rust
pub fn so_init_blog() -> Box<dyn SOState> {
	Box::new(
		SODraft {
			content: String::new(),
		}
	)
}
```

剖析：

1. 该方法建立新的文稿，返回初始状态
2. 所以，该方法返回一个文稿状态对象，文稿内容初始为空
3. 得到初始状态后，使用者只关注 trait 所提供的方法，而不关注后续的状态切换



### 测试

根据场景需求，可以编写不同的测试，例如对审核状态回退到文稿状态进行测试：

1. 新建文稿，并增加内容 A（文稿状态，内容 A 可以被添加）
2. 审核文稿，并增加内容 B（在审核状态下，内容 B 实际上不会被添加）
3. 回退文稿，并增加内容 C（回退到文稿状态，内容 C 可以被添加）
4. 审核文稿，并两次请求发布
5. 此时进入了发布状态，可以获取到文稿内容 A + C

```rust
#[cfg(test)]
mod so_test {
	use super::*;

	#[test]
	fn test_review_to_reject() {
        // 初始化文稿并添加数据 A
		let mut b = so_init_blog();
		b.add_text("test blog");

        // 审核文稿并添加数据 B
		let mut b = b.review();
		b.add_text("[can not add text]");

        // 回退文稿并添加数据 C
		let mut b = b.reject();
		b.add_text(" [add text after reject]");

        // 审核并两次请求发布
		let b = b.review();
		let b = b.approve();
		let b = b.approve();
        
        // 此时能获取到文稿数据 A + C
		assert_eq!("test blog [add text after reject]", b.content());
	}
}
```

> 更多的测试请参考源代码



## 实现 - *type*

说明：

- 这种方式不再定义 trait ，也不再使用 trait object
- 而是将各个状态定义为不同的类型（例如 struct）
- 每个状态能够提供的方法都可能不同，但都只提供当前状态可以调用的方法



### 文稿状态

```rust
/// 文稿状态
#[derive(Debug)]
pub struct STDraft {
	content: String,
}

impl STDraft {
	/// 增加文本
	pub fn add_text(&mut self, text: &str) {
		self.content.push_str(text);
	}
	/// 请求审核，进入审核状态
	pub fn review(self) -> STPendingReview {
		STPendingReview {
			content: self.content,
			approve_count: RefCell::new(0),
		}
	}
}
```

剖析：

- `add_text` 方法没什么不同，仍然是 `&mut self` ，并将内容增加到 `content` 中
- `review` 会产生新的状态切换，所以参数是 `self` ：
    - 我们不再返回 trait 对象，而是直接返回下一个新的状态类型，因此返回值直接是 `STPendingReview`
    - 对应的，没有必要再对 `self` 进行装箱，所以不需要修饰为 `Box<Self>`
    - 同时，`content` 的所有权直接传递给新的审核状态，对后续的其它状态也是如此



### 审核状态

```rust
/// 审核状态
#[derive(Debug)]
pub struct STPendingReview {
	content: String,
	approve_count: RefCell<i32>,
}

impl STPendingReview {
	/// 退回文稿，回到文稿状态
	pub fn reject(self) -> STDraft {
		STDraft {
			content: self.content,
		}
	}
	/// 两次请求发布，进入发布状态，否则仍然停留在审核状态
	pub fn approve(self) -> Result<STPublished, STPendingReview> {
		*self.approve_count.borrow_mut() += 1;
		
		if *self.approve_count.borrow() >= 2 {
			Ok(
				STPublished {
					content: self.content,
				}
			)
		} else {
			Err(self)
		}
	}
}
```

剖析：

- `reject` 
    - 在审核状态可以退回文稿状态，因此消费 `self`
    - 同时，`content` 的所有权直接传递给新的审核状态，对后续的其它状态也是如此
- `approve`
    - 该方法有点特殊，因为需要请求发布两次，才能进入发布状态
    - 因此，该方法可能返回两种状态：一种是停留在当前审核状态，一种是切换到发布状态
    - 所以，使用了 `Result<T, E>` 返回值，在成功切换到发布状态时，返回 `Ok(T)` ，即 `STPublished` ；若请求发布失败，则停留在当前状态，返回 `Err(E)` ，即 `STPendingReview` ，也就是 `self`



### 发布状态

发布状态比较简单，代码如下：

```rust
/// 发布状态
#[derive(Debug)]
pub struct STPublished {
	content: String,
}

impl STPublished {
	/// 获取文稿数据
	pub fn content(&self) -> &str {
		&self.content
	}
}
```



### 使用

对应的，提供一个建立初始状态的方法：

```rust
pub fn st_init_blog() -> STDraft {
	STDraft {
		content: String::new(),
	}
}
```

剖析：

- 初始状态就是文稿状态
- 不适用 trait 对象，因此直接返回文稿状态对应的类型，即 `STDraft`



### 测试

类似的，测试整个流程，注意看注释：

```rust
#[cfg(test)]
mod st_test {
	use super::*;

	#[test]
	fn from_draft_to_published() {
        // 初始化文稿
		let mut b = st_init_blog();
		b.add_text("test blog");

        // 审核文稿
		let b = b.review();
        
        // 退回文稿后增加文稿内容
		let mut b = b.reject();
		b.add_text(" [add text after reject]");

        // 重新审核文稿
		let b = b.review();
        
        // 第一次请求发布，会仍然停留在审核状态
		let b = b.approve().unwrap_err();
        // 第二次请求发布，会进入审核状态
		let b = b.approve().unwrap();
        // 在审核状态获取文稿内容
		assert_eq!("test blog [add text after reject]", b.content());
	}
}
```



## 总结

状态模式的优缺点总结：

- 每个状态负责自身的行为规则，并负责切换到下一个状态
- 对使用者来说，不关心每个状态的行为有何不同，也不关心状态何时发生的切换
- 当业务规则变化时，只需要增加新的状态，或者修改某个状态的内部代码
- 如果不使用状态模式，则操作逻辑的判断需要很多的 `if` 或 `match` ，代码会变得更耦合，且不易阅读
- 但缺点是，状态之间相互联系，增加新的状态时，原有的某些状态切换代码需要修改

状态模式的实现总结：

- 可以使用 trait 对象：
    - 使用者得到的类型统一，都是同一种 trait 对象
    - 即使状态切换，也是同一种 trait 对象
    - ***当一个方法可能返回 A 状态或者 B 状态时，使用 trait 对象就非常灵活***
    - 但缺点是，各种状态内部可能存在冗余方法
- 可以将不同状态实现为不同的类型
    - 使用者得到的类型不统一
    - 但是每种类型能够调用的方法是明确的
    - 从上面的例子可以看到，***如果某个方法可能返回 A 状态或者 B 状态时，对状态的实现者、以及对状态的使用者，都是非常不方便的***，尤其使用者来说，需要额外的代码和逻辑来区分到底返回的是 A 状态还是 B 状态