# 16.2. 消息传递

## 理念

### 消息传递 message passing

- 消息传递是一种日益流行的确保并发安全的方式
- 这种思想来源于 Go 语言：「不要用共享内存来通讯，而是用通讯来共享内存（Do not communicate by sharing memory; instead, share memory by communicating）」
- 也就是说，多个线程之间通过发送和接收消息来完成沟通，而不是去访问同一片内存数据

### Rust 的消息传递

- rust 标准库提供了一种主要的实现消息传递的方式：***通道***（***channel***）
- 通道由两部分组成：***发送者***（***transmitter***）和 ***接收者***（***receiver***）
- rust 的通道实现在 `std::sync::mpsc` 中
- `mpsc` 的意思是 ***多个生产者/单个消费者***（***multiple producer, single consumer***）
- 也就是说，一个通道可以有多个 ***发送***（***sending***）端，但只能有一个 ***接收***（***receiving***）端



## 使用通道

### 用法

- 通过 `mpsc::channel()` 创建一个新的通道
- 该通道是一个元组，分别是发送者和接收者，一般命名为 `tx` 和 `rx` ，t 就是 ***transmitter*** ，r 就是 ***receiver***
- 使用 `tx.send(val)` 来发送消息：
    - 返回 `Result<T, E>` ，所以如果发送失败（例如 `rx` 已被丢弃），则返回错误
    - 发送的数据 `val` 会被 move 到 `send` 方法中
- 使用 `recv` 来等待接收：
    - 它会一直阻塞，直到返回
    - 返回 `Result<T, E>` ，所以如果接收失败（例如 `tx` 已被丢弃），则返回错误
- 使用 `try_recv` 来尝试接收：
    - 它不会阻塞，而是立即返回
    - 返回 `Result<T, E>` ，其中 `Ok` 包含可用的信息，而 `Err` 表示此时没有任何消息
- 也可以迭代 `rx` ：
    - 例如 `for recv in rx`
    - 所以会一直阻塞并循环接收数据，直到发生错误
- 当 `tx` 或 `tr` 任何一方被丢弃时，通道就被关闭了
- 而 `tx` 和 `tr` 的丢弃遵循 rust 的所有权规则



### 示例

查看下面的示例代码，注意看注释：

```rust
use std::thread;
use std::sync::mpsc;

fn main() {
    // 结构元组
	let (tx, rx) = mpsc::channel();

    // 将 tx move 到线程中
	thread::spawn(move || {
		let val = String::from("tx data");
		tx.send(val).unwrap();
		// val 被 move 到 send 中
        // 因此不能再使用 val
		//println!("{}", val);
	});

	// 因为 recv() 会阻塞等待
    // 所以此时不需要等待线程
	let recv = rx.recv().unwrap();
	println!("received: {}", recv);
}
```



## 发送多个值

下面的代码多次发送数据，而接收者一直循环等待：

```rust
use std::thread;
use std::sync::mpsc;
use std::time::Duration;

fn main() {
	let (tx, rx) = mpsc::channel();

	thread::spawn(move || {
        // 准备多份数据
		let vals = vec![
			String::from("tx data 1"),
			String::from("tx data 2"),
			String::from("tx data 3"),
			String::from("tx data 4"),
			String::from("tx data 5"),
		];

        // 循环发送多份数据
		for val in vals {
			tx.send(val).unwrap();
            // 发送间隔 1 秒
			thread::sleep(Duration::from_secs(1));
		}
	});

    // 循环等待接收
    // 每当成功接收到数据，就存储到 recv 中
	for recv in rx {
        // 打印接收到的数据
		println!("received: {}", recv);
	}
}
```

输出结果如下：

```shell
received: tx data 1
received: tx data 2
received: tx data 3
received: tx data 4
received: tx data 5
```

代码剖析：

- 上述代码会发送多份数据，`tx` 只负责循环发送
- 而 `rx` 会阻塞并循环接收，只要收到一份数据，就会产生一个新的可迭代的值
- 观察输出结果，可以看到 `rx` 在收到 5 次数据以后（因为 `tx` 发送了 5 次 ），程序就结束了
- 而 `for recv in rx` 结束的原因，就是因为通道关闭了
- 而通道关闭的原因，就是 `tx` 关闭了
- 而 `tx` 关闭的原因，是因为子线程结束了
- 而子线程结束的时候，因为子线程拥有 `tx` 的所有权（move 闭包），所以 `tx` 被自动释放了



## 多个发送者

说明：

- 如前面所述，`mpsc` 的意思是 ***多个生产者/单个消费者***（***multiple producer, single consumer***）
- 所以可以创建多个发送者来生产数据，而通过一个接收者来消费数据
- 使用 `mpsc::Sender::clone(&tx)` 来为 ***当前通道*** 克隆一个发送者



下面的代码为一个通道创建了多个发送者，注意看注释：

```rust
use std::thread;
use std::sync::mpsc;

fn main() {
    // 创建通道，得到 tx 和 tr
	let (tx, rx) = mpsc::channel();

    // 在 for 中创建多个线程
    // 每个线程使用一个发送者
    // 一共循环 5 次
    // 得到 5 个新的发送者
	for i in 1..6 {
        // 克隆得到新的发送者
		let tx = mpsc::Sender::clone(&tx);
        // 创建新线程
		thread::spawn(move || {
            // 发送的数据用 tx[i] 来标识
            // 新的发送者被 move 到新线程中
			tx.send(String::from(format!("tx[{}] data", i))).unwrap();
            // 每个发送者
			thread::sleep(Duration::from_millis(300));
		});
	}

    /*
    注意：
    新线程用的都是克隆的新发送者，
    所以 tx 仍然有效，
    此处如果不释放 tx 的话，
    rx 就会一直等待接收，
    该程序就不会退出去
    */
	drop(tx);
    
    // 多个发送者，一个接收者
	for recv in rx {
		println!("received: {}", recv);
	}
}
```

执行结果可能如下：

```shell
received: tx[3] data
received: tx[1] data
received: tx[2] data
received: tx[4] data
received: tx[5] data
```

