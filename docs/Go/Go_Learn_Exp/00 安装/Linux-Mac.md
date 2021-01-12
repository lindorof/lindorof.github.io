# Linux-Mac

## 设置环境变量

环境变量的配置文件可能如下：

- `$HOME/.bashrc`
- `$HOME/.profile`
- `$HOME/.bash_profile`

> `GOROOT` ，这是Go语言的安装路径（路径自定义）

```bash
export GOROOT="$HOME/go"
```

> `GOPATH` ，这是开发Go工程的目录，所下载的包和框架也会安装在该目录中（路径自定义）

```bash
export GOPATH="$HOME/goApps"
```

> `PATH` ，为了在命令行中使用Go命令及其它框架命令，需要设置该变量

```bash
export PATH="$PATH:$GOROOT/bin"
export PATH="$PATH:$GOPATH/bin"
```

> 下载框架时（即 `go get` ），网络被墙，需设置代理

```bash
# Enable the go modules feature
export GO111MODULE=on
# Set the GOPROXY environment variable
export GOPROXY=https://goproxy.io
```



## 安装Go语言开发包

1. 到官网下载Go语言开发包，选择与操作系统、CPU位数一致的包
2. 下载解压后，放到 `$GOROOT` 目录
3. 验证安装

```shell
go version
go env
```

