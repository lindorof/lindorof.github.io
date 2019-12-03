# 12.7. 附：源码结构

*源码：[ch12-7-minigrep](https://gitee.com/lindorof/Rust_The_Book/tree/master/ch12-7-minigrep)*

假设按照下面的方式执行本程序：
```text
$ CASE_INS=1 cargo run line test.txt > output.txt
```

则文件和目录结构如下图，注意 ```test.txt``` 和 ```output.txt``` ：

```
graph TD

PROJ{minigrep} --> SRC{/src}
SRC --> MN(main.rs)
SRC --> LB(lib.rs)
PROJ --> TGT{/target}
TGT --> DEBUG{/debug}
DEBUG --> EXE(minigrep)
PROJ --> TXT(test.txt)
PROJ --> OPT(output.txt)
```