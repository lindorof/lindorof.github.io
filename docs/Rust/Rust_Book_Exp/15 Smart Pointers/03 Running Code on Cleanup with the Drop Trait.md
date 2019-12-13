# 15.3. 使用 `Drop` 清理资源

### 关于 `Drop`

- `Drop` 是一种重要的 trait ，对应需要实现的方法是 `drop`
- 它的作用是，在某个值要被清理时，通过该 trait 来执行一些清理工作
- 例如，这个清理工作可能是释放文件或网络连接的资源
- 在 rust 中，`Drop` 就是理解为对象的**析构器**（***destructor***）



### 使用范围

- 任何类型都可以实现 `Drop`
- 而使用最多的就是智能指针
- 例如，`Box<T>` 实现了 `Drop` ，用来释放 box 所指向的堆空间



### 运行规则

- 假设要被释放的值是 `obj` 
- 那么， `obj` 被释放的时机是离开对应的作用域时
- 也就是说，rust 系统来决定何时释放，而所决定的规则就是变量离开作用域时
- 程序员也可以要求提前清理，后续会讲解



### 清理的内容

1. 假设要被释放的值是 `obj` 
2. 那么，首先 `obj` 本身的内存是被 rust 自动释放的
3. 其次， `obj` 可能关联了其它的一些资源，这些其它的资源释放就是通过 `obj` 的 `Drop` 来完成，与 rust 无关



### 提前清理

1. rust 不允许手动调用 `Drop` 这个 trait
2. 原因是：即使手动调用了该 trait ，但 rust 是不知道的，在变量离开作用域时，rust 系统依然会自动触发该 trait ，导致了双重清理，即 **double free** ，所以手动调用该 trait 是不允许的
3. 而要解决该问题，办法很简单，就是触发 `Drop` 这个 trait 的时候，要让 rust 系统知道
4. 因此，解决办法就是：不要使用变量的 `Drop` ，而是使用 rust 系统中提供的 `drop` 方法
5. rust 提供的 `drop` 方法的本质，就是去调用变量的 `Drop` ，但区别是：该方法是 rust 系统实现的，所以 rust 会自己做标记，表示该变量已经被清理了，后续不需要再清理了



### 举例：实现 `Drop`

> 例子只是为了讲述 `Drop` 的实现，而不关注所释放的资源，因此就将 `Drop` 实现为简单的信息打印

有 struct 如下：

```rust
struct CustomSmartPointer {
    data: String,
}
```



实现 `Drop` ：

```rust
impl Drop for CustomSmartPointer {
    fn drop(&mut self) {
        println!("CustomSmartPointer-Drop-Trait ({})", self.data);
    }
}
```

注意：

- 参数是 `&mut self` 
- 因为清理资源涉及到内容的变化，所以必须 `&mut`



测试：

```rust
fn main() {
    let c1 = CustomSmartPointer { data: String::from("first") };
    let c2 = CustomSmartPointer { data: String::from("second") };
    println!("CustomSmartPointers created");
}
```



打印结果：

```shell
CustomSmartPointers created
CustomSmartPointer-Drop-Trait (second)
CustomSmartPointer-Drop-Trait (first)
```

剖析：

1. 创建了两个实例，创建完成后打印 `CustomSmartPointers created`
2. 接着两个实例离开了作用域，rust 系统开始清理，可以看到清理时 rust 调用了 `Drop`
3. 可以看到：**清理的顺序与创建的顺序相反**



### 举例：提前清理

> 继续使用上面的例子

手动调用 `Drop` ：

```rust
fn main() {
    let c1 = CustomSmartPointer { data: String::from("first") };
    println!("CustomSmartPointers created");
    c1.drop();
}
```

编译错误：

```shell
error[E0040]: explicit use of destructor method
c1.drop();
   ^^^^ explicit destructor calls not allowed
```



调用 rust 系统的 `drop` ：

```rust
fn main() {
    let c1 = CustomSmartPointer { data: String::from("first") };
    println!("CustomSmartPointers created");
    drop(c1);
    println!("end of main");
}
```

运行结果：

```shell
CustomSmartPointers created
CustomSmartPointer-Drop-Trait (first)
CustomSmartPointer dropped before the end of main
```

剖析：

1. 在离开作用域之前，手动调用 rust 系统的 `drop` 完成了释放
2. rust 系统的 `drop` 本质是调用实例的 `Drop`
3. 离开作用域之后，可以看到 rust 没有再次触发 `Drop` ，因为 rust 知道该变量已经被释放过了

