# 16.1. 使用线程

## 术语解释

#### 进程 process

- 在大多数现代操作系统中，执行程序运行于一个进程中
- 操作系统负责管理多个执行程序，也就是多个进程

#### 线程 thread

- 在一个进程内部，也就是在一个程序内部，也可以拥有多个独立同时运行的部分
- 这些多个独立同时运行的部分，就是线程


#### 线程的优缺点

- 进程中使用线程可以改善性能
- 因为程序可以同时进行多个任务
- 但线程的问题是：
    1. 多个线程是同时执行的
    2. 所以无法保证不同线程的代码执行顺序

#### 线程可能带来的问题

- ***竞争状态***（***race condition***）：多个线程以不一致的顺序访问数据或资源
- ***死锁***（***deadlock***）：两个线程互相等待对方释放资源
- 一些难以重现和修复的 bug

#### 1:1 Model

- 操作系统提供了创建线程的 API 
- 编程语言调用操作系统 API 来创建线程
- 这种模型叫做 1:1 ，因为一个编程语言线程，对应一个操作系统线程

#### M:N Model

- 编程语言提供特殊的线程实现
- 编程语言提供的线程也叫 ***绿色线程***（***green-threaded***）
- M 个绿色线程对应 N 个操作系统线程，其中 M 和 N 的值可能不一样，因此叫做 M:N
- 编程语言提供的绿色线程，会在不同数量的操作系统线程的上下文中执行

#### 运行时 runtime

- 运行时，就是在程序的二进制文件中，所包含的由编程语言提供的代码
- 根据编程语言的不同，运行时可大可小
- 任何非汇编的语言都会有一定数量的运行时
- 一般情况下，如果说一门编程语言「没有运行时」，指的是该编程语言的运行时比较小
- 更小的运行时拥有更少的功能和更小的二进制输出，从而易于在更多上下文中与其它编程语言相结合

#### 运行时与线程模型

- 绿色线程的 M:N 模型需要更大的运行时来管理这些线程
- 而 rust 的目标是：几乎没有运行时、保持高性能、能够调用 C 语言
- 因此，rust 标准库只提供了 1:1 线程模型
- 有些 crate 实现了 M:N 线程模型，它会牺牲性能，但是可以有更好的线程运行控制，以及更低的上下文切换成本



## 使用线程

### 创建线程

用法：

- 使用 `thread::spawn` 来创建线程，使用闭包来传入线程执行代码，需 `use std::thread`
- 使用 `thread::sleep` 来进行线程睡眠，睡眠时间通过诸如 `Duration::from_millis` 的方法来获得，需要 `use std::time::Duration`

示例代码：

```rust
use std::thread;
use std::time::Duration;

fn main() {
    // 创建线程并开始执行
	thread::spawn(|| {
        // 线程打印
		for i in 1..10 {
			println!("spawned thread - {}", i);
            // 间隔 1 毫秒
			thread::sleep(Duration::from_millis(1));
		}
	});

    // 主线程打印
	for i in 1..5 {
		println!("main thread - {}", i);
        // 间隔 1 毫秒
		thread::sleep(Duration::from_millis(1));
	}
}
```

存在的问题：

1. 创建子线程以后，没有等待子线程结束
2. 在主线程结束时（即 `main` 函数结束时），子线程也会结束，甚至子线程还没来得及运行
3. 主线程结束时，不会关注子线程的代码是否执行完毕



### 等待线程结束

用法：

- `thread::spawn` 返回值类型是 `JoinHandle` 
- `JoinHandle` 拥有所创建的子线程的所有权，调用 `join` 方法会等待该线程结束

更改代码，等待子线程执行结束：

```rust
use std::thread;
use std::time::Duration;

fn main() {
	let handle = thread::spawn(|| {
		for i in 1..10 {
			println!("spawned thread - {}", i);
			thread::sleep(Duration::from_millis(1));
		}
	});

	for i in 1..5 {
		println!("main thread - {}", i);
		thread::sleep(Duration::from_millis(1));
	}

    // 等到子线程执行结束
    // 然后主线程 main 才结束
	handle.join().unwrap();
}
```

此时已能确保子线程执行结束，但与主线程之间可能仍然是交替执行的，所以输出结果可能如下：

```shell
main thread - 1
spawned thread - 1
spawned thread - 2
main thread - 2
spawned thread - 3
main thread - 3
main thread - 4
spawned thread - 4
spawned thread - 5
spawned thread - 6
spawned thread - 7
spawned thread - 8
spawned thread - 9
```

将 `join` 调用放到子线程之后，就可以等待子线程执行结束后，才开始主线程的打印：

```rust
use std::thread;
use std::time::Duration;

fn main() {
	let handle = thread::spawn(|| {
		for i in 1..10 {
			println!("spawned thread - {}", i);
			thread::sleep(Duration::from_millis(1));
		}
	});

    // 此时会先等待子线程执行结束
	handle.join().unwrap();

	for i in 1..5 {
		println!("main thread - {}", i);
		thread::sleep(Duration::from_millis(1));
	}
}
```

此时打印结果如下：

```shell
spawned thread - 1
spawned thread - 2
spawned thread - 3
spawned thread - 4
spawned thread - 5
spawned thread - 6
spawned thread - 7
spawned thread - 8
spawned thread - 9
main thread - 1
main thread - 2
main thread - 3
main thread - 4
```



## 线程与 `move` 闭包

### 术语

- `move` 闭包常常与 `thread::spawn` 一起使用
- 目的是在创建在的子线程中，可以使用另一个线程里的数据
- 例如，在 `main` 中有变量 `a` ，然后 `thread::spawn` 创建子线程 `t` ，此时 `a` 是主线程中的数据，而在子线程 `t` 中，可以使用主线程的数据 `a`
- 但要注意的是，`move` 闭包不是仅仅 ***使用*** 另一个线程的数据，而是将数据的 ***所有权转移*** 到子线程中来
- 语法是在闭包之前加上 `move` 关键字，例如 `move || {}`



### 场景

> 在子线程中，需要访问主线程中的 `Vec` ：

```rust
use std::thread;
use std::time::Duration;

fn main() {
	let v = vec![1, 2, 3, 4];

	let handle = thread::spawn(|| {
        // 子线程中需要打印主线程中的 v
		println!("main v = {:?}", v);
	});

	handle.join().unwrap();
}
```

此时编译错误，提示也很有用：

```shell
error[E0373]: 
closure may outlive the current function, 
but it borrows `v`, 
which is owned by the current function

help: 
to force the closure to take ownership of `v`, 
use the `move` keyword
```

错误提示：

- 闭包（线程代码）可能在离开当前函数（main）之后仍然存在
- 但是闭包（线程代码）里借用了数据 v
- 而数据 v 是是被昂前函数（main）所拥有的

帮助信息：

- 可以让闭包（线程代码）获得数据 v 的所有权
- 使用 move 关键字

> 甚至，可能在子线程还在访问数据 v 时，v 就已经被释放了：

```rust
use std::thread;
use std::time::Duration;

fn main() {
	let v = vec![1, 2, 3, 4];

	let handle = thread::spawn(|| {
        // 子线程可能正在访问 v
		println!("main v = {:?}", v);
	});

    // 但可能 v 已经被释放
	drop(v);

	handle.join().unwrap();
}
```



### 解决

使用 `move` 闭包：

- 子线程中 ***使用到的*** 其它线程的数据，会自动被 `move`
- 但是，子线程中 ***没有使用到的*** 其它线程的数据，不会被 `move`

> 下面是改进后的代码，注意看注释：

```rust
use std::thread;
use std::time::Duration;

fn main() {
    // 主线程中有 v1,v2,v3
	let v1 = vec![1, 2, 3, 4];
	let mut v2 = vec![5, 6, 7, 8];
	let vm = vec![10, 11, 12, 13];

    // 使用 move 闭包
	let handle = thread::spawn(move || {
        // v1 被使用，所有权被 move
		println!("main v1 = {:?}", v1);

        // v2 被使用，所有权被 move
		v2.push(9);
		println!("main v2 = {:?}", v2);
	});

	handle.join().unwrap();
    
    // vm 没有被子线程 move
    // 因此主线程中仍然可用
	println!("{:?}", vm);
    
    // 但是 v1 和 v2 已被子线程 move
    // 因此主线程中不能再使用
    /*
    println!("{:?}", v1);
	println!("{:?}", v2);
	*/
}
```

