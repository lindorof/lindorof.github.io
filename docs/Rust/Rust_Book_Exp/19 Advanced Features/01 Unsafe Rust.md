# 19.1. 不安全代码

## 概述

### 关于 ***unsafe rust***

- rust 的编译（即静态分析）是保守的，它确保了程序执行时的内存安全，因为拒绝有效的程序总比接受无效的程序好
- 但 rust 还有一个特性是 ***unsafe rust*** ，即 ***不安全代码*** ，关键字是 `unsafe` ，它让编译器放弃安全性检查，转而让程序员自己来保证，就像 C++ 一样，一切安全性保证都交给程序员
- ***unsafe rust*** 存在的原因之一，是为了完成与操作系统和硬件的直接交互。如果放弃了这个特性，则无法完成底层系统编程，而这是 rust 的功能或目标之一
- 注意，使用 `unsafe` 不代表对应的代码一定会带来内存安全问题，但相反，出现内存安全相关的错误时，必定与 `unsafe` 代码块有关，从而方便问题排查



### 使用 `unsafe` 的场景

本文会依次讲解下面的场景：

- 解引用裸指针（***raw pointer***）
- 调用不安全的函数或方法
- 使用 `mut` 静态变量
- 不安全的 trait
- 访问 `union` 字段（本文未讲解）



## 使用裸指针

### 关于裸指针

- rust 编译器会确保引用总是有效的，但在 unsafe rust 中有***裸指针***（***raw pointer***）这种类似于引用的类型
- 裸指针也分为两种：不可变的或可变的，即 `*const T` 和 `*mut T` 
- 注意，裸指针的可变性指的是 ***解引用之后*** ，而不是指针本身，且可变性需要显式标注：不可变的显式标注为 `const` ，可变的显式标注为 `mut`
- 而裸指针本身也是 rust 的一种类型，对应的变量也存在可变和不可变，例如不可变的变量 `let r` ，可变的变量 `let mut r` 
- 因此，变量本身的可变性，与裸指针解引用之后的可变性是不同的，这个概念需要区分开
- 所以，设想一种情况：有不可变的变量 `let v` ，然后用一个可变的裸指针 `*mut` 指向 `v` ，此时 rust 是会给出编译错误提示的，后续会有例子讲解



### 裸指针的特性

裸指针的特性，从裸指针与引用（或智能指针）的区别可以看到：

- rust 会忽略借用规则，可同时拥有不可变和可变的裸指针，或者多个可变指针指向同一个位置
- rust 不会保证裸指针一定指向有效的内存，甚至指向空地址
- rust 不会为裸指针实现任何自动清理功能



### 创建裸指针

需要注意的是：

- 创建裸指针并不需要 `unsafe` 关键字
- 因为创建裸指针不会带来安全隐患
- 解引用裸指针时（即访问指针指向的地址内容时）才会带来安全隐患，才需要使用 `unsafe` 关键字
- 创建裸指针的语法参见下面的例子



> 举例：同时创建多个不可变和可变的裸指针，在该例子中，指针指向的地址是有效的

```rust
fn main() {
    /*
    创建一个mut变量，如果不使用 mut 修饰，
    则后续无法创建指向该变量的 *mut 指针
    */
    let mut num = 8;

    /*
    裸指针r1指向num
    使用 as 关键字来声明裸指针的类型
    注意：
    & num 与 *const 的可变性对应
    */
    let r1 = & num as *const i32;
    /*
    裸指针r2指向num
    使用 as 关键字来声明裸指针的类型
    注意：
    &mut num 与 *mut 的可变性对应
    */
    let r2 = &mut num as *mut i32;

    /*
    再创建r3和r4，
    一个是 *const ，
    一个是 *mut ，
    从而，
    r1/r2/r3/r4 指向同一个地址，
    且可变指针和不可变指针同时存在。
    */
    let r3 = & num as *const i32;
    let r4 = &mut num as *mut i32;

    //打印出指针本身的值，它们的值都是一样的
    println!("r1 = {:#?}", r1);
    println!("r2 = {:#?}", r2);
    println!("r3 = {:#?}", r3);
    println!("r4 = {:#?}", r4);
}
```

执行结果如下：

```shell
r1 = 0x00007ffeec08643c
r2 = 0x00007ffeec08643c
r3 = 0x00007ffeec08643c
r4 = 0x00007ffeec08643c
```

剖析：

- 注意，不同时候不同设备打印出的地址值可能会不同
- 上面这个例子中，裸指针指向一个已知的变量 `num` 
- 变量 `num` 的可变性对 rust 来说是可检查的，因此，rust 对后续裸指针的可变性也进行了检查
- 例如，如果创建 `*mut i32` 类型的裸指针，则 rust 会检查并确保变量 `num` 使用了 `mut` 修饰



> 举例：创建一个可能无效的裸指针，也就是从任意地址值创建

```rust
fn main() {
    /*
    通过任意地址值创建裸指针 r1
    由于该地址值无法确认有效性，
    因此rust不会检查对应的mut修饰
    */
    let r1 = 0x123456usize as *mut i32;
    /*
    类似的，
    通过 r1 创建 r2，
    通过 r2 创建 r3，
    由于地址值无法确认有效性，
    rust都不会检查可变性修饰，
    因此可以任意在 *const 和 *mut 之间转换
    */
    let r2 = r1 as *const i32;
    let r3 = r2 as *mut i32;

    //打印出指针本身的值，它们的值都是一样的
    println!("r1 = {:#?}", r1);
    println!("r2 = {:#?}", r2);
    println!("r3 = {:#?}", r3);
}
```

执行结果如下：

```shell
r1 = 0x0000000000123456
r2 = 0x0000000000123456
r3 = 0x0000000000123456
```

剖析：

- 从任意地址创建裸指针时，rust 无法确认该地址的有效性，因此就会放弃对应的可变性检查
- 所以，从上面例子可以看到，各个指针之间可以任意在 `*const` 和 `*mut` 之间转换，rust 不会做任何检查
- 因此，从任意地址创建裸指针时，内存安全问题只能程序员自己保证



### 裸指针的解引用

注意事项：

1. 使用 `*` 来解引用裸指针，例如 `*r`
2. 解引用裸指针的目的是：***读取*** 或 ***修改*** 对应内存地址的值
3. 解引用裸指针的行为可能是不安全的（虽然有时候是安全的，例如指向一个确定的变量时），因此需要 `unsafe` 代码块



> 举例：能够正常运行的代码

```rust
fn main() {
    let mut num = 89;
    let r1 = &mut num as *mut i32;
    let r2 = & num as *const i32;

    unsafe {
        //打印结果为89
        println!("*r2 = {}", *r2);
        //修改num的值为99
        *r1 = 99;
        //打印结果为99
        println!("*r2 = {}", *r2);
    }
}
```

运行结果：

```shell
*r2 = 89
*r2 = 99
```

剖析：

- 使用 `unsafe` 将解引用裸指针的代码包装起来，形成不安全代码块
- 通过 `r2` 来读取所指向的内容（当然也可以通过 `r1` 来读取）
- 通过 `r1` 来修改所指向的内容（因为 `r1` 是 `*mut` 类型）
- 该程序能够正确执行，没有引起内存问题，但只要是解引用裸指针的行为，都仍须使用 `unsafe` 来包装



> 举例：不能正确执行的代码

```rust
fn main() {
    let r1 = 0x123456usize as *const i32;
    let r2 = r1 as *mut i32;

    unsafe {
        println!("*r1 = {:#?}", *r1);
        *r2 = 8;
        println!("*r2 = {:#?}", *r2);
    }
}
```

剖析：

- 几乎在任何时候，`0x123456` 这个地址值都是无效的，不允许读，也不允许写
- 因此该程序运行时会崩溃，从而针对该内存错误，我们可以到 `unsafe` 代码块中去排查，这也是 `unsafe` 修饰的作用



## 调用不安全的函数或方法

*函数与方法是类似的，本节用函数来讲解和说明。*



### 定义和调用不安全函数

规则说明：

- 定义不安全函数时，也使用  `unsafe` 关键字，例如 `unsafe fn dangerous() {}` ，又如 `pub unsafe fn dangerous()` 
- 一旦将函数定义为 `unsafe` ，那么整个函数体都是 `unsafe` ，因此，对于函数体中的不安全代码，不需要再使用 `unsafe` 代码块
- 但是，对于调用者来说，调用不安全函数时，需要确保在 `unsafe` 修饰之下：例如，将调用者本身也定义为不安全函数；或者，在调用时使用 `unsafe` 代码块

> 举例：定义不安全函数

```rust
pub unsafe fn dangerous() {
    let r1 = 0x123456usize as *const i32;
    /*
    该函数已经定义为 unsafe
    所以此处进行不安全操作时不需要 unsafe 代码块
    */
    println!("*r1 = {:#?}", *r1);
}
```

> 举例：在安全函数中调用不安全函数

```rust
fn main() {
    /*
    main 函数是安全的，
    但在调用不安全函数时，
    单独使用 unsafe 代码块
    */
    unsafe {
        dangerous();
    }
}
```

> 举例：在不安全函数中调用不安全函数

```rust
unsafe fn caller() {
    /*
    调用者本身已经定义为不安全函数，
    因此可直接调用 dangerous() 这个不安全函数，
    不需要额外的 unsafe 代码块
    */
    dangerous();
}
```



### 安全函数中的不安全代码

#### 概述

- 本节要讲的论点是：仅因为函数中包含一些不安全代码，就将整个函数都标记为  `unsafe` ，这种行为是不必要的
- 在 rust 中，更常见的行为是：将函数标记为安全的，但是，安全函数中可以使用不安全代码，只是将这些不安全代码放在 `unsafe` 块中
- 在前面的内容里，其实已经有多个这样的例子，比如 `main` 函数中，调用 `dangerous` 这个不安全函数时使用了 `unsafe` 代码块，但整个 `main` 函数是安全的
- 要讲解这一点，举个简单的例子就能说明，但看到原书中使用了一个较为复杂的例子，因此借题发挥，索性多讲一点，从场景到问题，再到如何解决，从而理解更透彻一些



#### 场景

- 考虑对 slice 的分割：获取一个 slice ，根据给定的索引参数，将其分割为另两个 slice
- rust 标准库中已经提供了实现，但此处我们自己来实现，且简单起见，将该功能实现为函数，而且只处理 `i32` 类型的 slice ，而不是像标准库一样可以处理泛型的 `T` 
- 该需求很容易实现，代码如下：

```rust
fn split_at(slice: &[i32], idx: usize) -> (&[i32], &[i32]) {
    //获得slice长度
    let len = slice.len();

    //索引不能超过slice的长度
    assert!(idx <= len);

    //利用slice的切片功能，分割为另两个slice
    (&slice[..idx], &slice[idx..])
}

fn main() {
    let v = vec![1, 2, 3, 4, 5, 6];
    println!("{:?}", split_at(&v, 3));
}
```

打印结果是：

```shell
([1, 2, 3], [4, 5, 6])
```



#### 问题

- 上面的场景里，我们处理的是不可变的 slice ，因此很容易就实现了
- 但更换一下需求，我们处理 mut 的 slice ，且分割后的另两个 slice 也是 mut
- 对应的，我们更改代码如下（无法编译）：

```rust
fn split_at_mut(slice: &mut [i32], idx: usize) -> (&mut [i32], &mut [i32]) {
    let len = slice.len();

    assert!(idx <= len);

    (&mut slice[..idx], &mut slice[idx..])
}
```

此时编译错误：

```shell
error[E0499]: cannot borrow `*slice` as mutable more than once at a time
```

原因是：

- 在返回的元组中，我们同时产生了两个对 slice 的 mut 借用（引用）
- 而在 rust 的借用规则中，不允许同时存在多个 mut 的引用
- 虽然程序员知道这两个引用对应的 slice 并没有重叠，也不会引起数据访问冲突，但这不是 rust 所关注的点，对 rust 来说，这样的行为是违反其借用规则的



#### 解决

- 要解决该问题，就需要使用裸指针
- 裸指针可以突破 rust 的借用规则，从而让多个 mut 引用可以同时存在
- 当然，对应的安全保证就需要交给程序员自己（在该例子中，我们确实能保证安全）
- 解决该问题时，代码中使用了许多 slice 对应裸指针的 API ，这些 API 可以参考 rust 文档，本节只对这些 API 进行了简单的注释，但也能理解了

```rust
use std::slice;

fn split_at_mut(slice: &mut [i32], idx: usize) -> (&mut [i32], &mut [i32]) {
    //获得slice长度
    let len = slice.len();
    /*
    获得slice对应的裸指针
    也就是slice对应的内存起始地址
    注意：
    只要没有解引用裸指针，就不需要使用unsafe
    */
    let ptr = slice.as_mut_ptr();

    //确保分割索引小于slice长度
    assert!(idx <= len);

    /*
    [需使用unsafe]
    从给定的指针地址开始，
    获取连续的idx个元素，
    从而形成slice片段
    */
    unsafe {
        /*
        第一个slice片段：
        起始地址是ptr
        获取个数是idx
        */
        (slice::from_raw_parts_mut(ptr, idx),
        /*
        第二个slice片段：
        起始地址是ptr+idx，
        但真实的内存地址与元素类型有关，
        所以安全的操作方式是ptr.offset，
        这一点C++程序员可能比较容易理解；
        获取个数是len-idx
        */
         slice::from_raw_parts_mut(ptr.offset(idx as isize), len-idx))
    }
}
```



#### 引申

- 再回到最初的场景，分割非 mut 的 slice ，是否也可以用裸指针不安全代码
- 答案是可以的，如果喜欢这么做的话（比如想找点 C++ 的感觉）
- 参看下面的代码，使用类似的 rust 提供的不安全代码来完成非 mut 的 slice 分割

```rust
use std::slice;

fn split_at_mut(slice: &[i32], idx: usize) -> (&[i32], &[i32]) {
    //获得slice长度
    let len = slice.len();
    //获得slice对应的非mut裸指针
    let ptr = slice.as_ptr();

    //确保分割索引小于slice长度
    assert!(idx <= len);
    
    //从裸指针获得对应的非mut片段
    unsafe {
        (slice::from_raw_parts(ptr, idx),
         slice::from_raw_parts(ptr.offset(idx as isize), len-idx))
    }
}
```

再引申：

- 甚至，连 `ptr.offset` 都不使用，自己来计算内存地址偏移
- 也就是 `size_of(type) * num` ，详情参考注释
- 当然，这样的话代码会变得更复杂，纯粹为了学习目的（或者说找到 C++ 的感觉）

```rust
use std::slice;
use std::mem;

fn split_at_mut(slice: &[i32], idx: usize) -> (&[i32], &[i32]) {
    //获得slice长度
    let len = slice.len();
    //获得slice对应的非mut裸指针
    let ptr = slice.as_ptr();

    //确保分割索引小于slice长度
    assert!(idx <= len);

    /*
    起始地址是 ptr ，
    偏移 idx 个元素，元素类型是 i32 ，
    因此自行计算实际的内存便宜地址，
    计算过程中需要进行类型转换，
    此时得到的内存地址是 usize 类型
    */
    let ptr2 = ptr as usize + idx * mem::size_of::<i32>();
    
    //从裸指针获得对应的非mut片段
    unsafe {
        (slice::from_raw_parts(ptr, idx),
         //此处需要将 usize 值转换为裸指针类型
         slice::from_raw_parts(ptr2 as *const i32, len-idx))
    }
}
```



#### 扩展

- 直接从裸指针（内存地址）开始进行一个内存片段的截取是不安全的，这也是必须使用 `unsafe` 的原因
- 上面的例子中，我们都确保了内存安全
- 我们可以故意制造一个会引起内存问题的事故：比如让使用一个无效的内存起始地址，或者截取不恰当的内存长度

```rust
use std::slice;

fn main() {
    let slice: &[i32] = unsafe {
        /*
        无效的内存其实地址，
        对应的长度片段也不可访问，
        因此程序会崩溃
        */
        slice::from_raw_parts(0x123456usize as *const i32, 10)
    };
}
```



### 与其它语言交互

#### rust 调用其它语言

- 首先需要创建 ***FFI***（***foreign function interface***），使用 `extern` 关键字，在 FFI 中创建函数的签名（注意函数名称必须与外部函数名一致），且这个签名使用的 rust 语法
- 同时需要指定 ***ABI***（***application binary interface***），ABI 定义了如何在汇编层面调用此函数，例如 C 语言最常见的 ABI 是 `"C"` 
- 举例：创建 C 函数的 FFI 时，就是 `extern "C" { fn ... }` 
- 最后，在调用 FFI 时，必须使用 `unsafe` 

```rust
/*
使用 rust 语法来创建 FFI，
其中 ABI 是 "C"，
要调用的 C 库函数是 abs，该名称必须保持一致
*/
extern "C" {
    fn abs(i: i32) -> i32;
}

fn main() {
    //必须使用 unsafe
    unsafe {
        //打印结果是 3
        println!("abs(-3) = {}", abs(-3));
    }
}
```



#### 其它语言调用 rust

- 首先，对函数增加 `extern` 关键字修饰，并指定 ABI ，例如 `extern "C"`
- 其次，为函数增加 `#[no_mangle]` 标注，从而禁用 rust 编译器对该函数名的 mangle 行为（不同的语言及编译器有着不同的 mangle 规则）
- 这样，其它语言就能调用该函数

```rust
#[no_mangle]
pub extern "C" fn for_c() {
    println!("can be called from C");
}
```



## 使用 `mut` 静态变量

### 认识静态变量

- rust 是有全局变量的，只是到目前为止都未讲解
- 而 rust 的全局变量就是静态（***static***）变量，使用 `static` 关键字修饰
- 其它语法与常量一样（参考 Chapter3 ：全部大写、使用 `_` 分隔、必须标注类型）
- 如果静态变量的类型是引用，则默认且只能是 `'static` 生命周期（参考 Chapter10）
- 访问不可变的静态变量是安全的（这个很好理解），但访问（包括读/写）可变的静态变量则都是不安全的，后续会讲解

> 常量和静态变量看起来类似，但它们的区别是：
>
> 1. 静态变量有固定的内存地址，访问静态变量时总是访问这个内存地址；而常量则允许在被访问时进行数据复制，而不是访问同一个内存地址
> 2. 静态变量默认是不可变的，若需要可变，则使用 `mut` 修饰；而常量是不可变的，且总是使用 `const` 关键字来修饰

下面是使用不可变静态变量的例子：

```rust
/*
使用 static 关键字修饰，
且该静态变量是不可变的，
该引用默认是 'static 生命周期
*/
static HELLO_WORD: &str = "hello, world!";

fn main() {
    //访问不可变的静态变量不需要使用 unsafe
    println!("name is {}", HELLO_WORD);
}
```



### `mut` 静态变量

下面是访问（读/写）`mut` 静态变量的例子：

```rust
//使用 mut 修饰为可变的静态变量
static mut COUNTER: u32 = 0;

//对静态变量进行写操作
fn add_counter(inc: u32) {
    //写操作需要 unsafe
    unsafe {
        COUNTER += inc;
    }
}

fn main() {
    //读操作也需要 unsafe
    unsafe {
        // 此时为 0
        println!("counter(before) = {}", COUNTER);
    }

    //对静态变量的值进行修改
    add_counter(8);

    unsafe {
        //此时为 8
        println!("counter(after) = {}", COUNTER);
    }
}
```

剖析：

- 上面的例子运行符合预期，因为只是单线程
- 但多线程访问 `mut` 静态变量时，会带来数据竞争问题，这也是必须使用 `unsafe` 的原因
- rust 的建议是，优先使用 Chapter16 的安全并发技术



## 不安全的 trait

- <span style="background-color:#dddd00">只要 trait 中有任何方法存在编译器不能验证的 invariant ，那么这个 trait 就是 unsafe </span>
- 语法是：定义和实现 trait 时，都使用 `unsafe` 关键字修饰

```rust
unsafe trait Foo {
    // methods go here
}

unsafe impl Foo for i32 {
    // method implementations go here
}
```

