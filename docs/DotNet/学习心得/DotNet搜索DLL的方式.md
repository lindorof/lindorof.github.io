---
sidebar: auto
sidebarDepth: 2
---

# .NET搜索DLL的方式

*针对加载DLL的每种方式，分别说明对应.NET是如何去寻找DLL的。*



## 直接引用加载

### 引用方式

也就是在代码工程里，引用位置直接添加DLL：

- 此时，程序运行时寻找DLL的路径与引用时所添加的DLL本身的路径没有关系
- 可以理解为引用就是像C++ DLL的静态加载，只是一个LIB库和头文件用来告知DLL可使用的方法和参数
- 而程序运行时的DLL寻找与C++ DLL类似，会在 ***环境变量*** 里去寻找



### 环境变量

> 第一

.NET FRAMWORK的 ***全局库*** 路径。

> 第二

***所属EXE程序的当前路径***。也就是说，无论DLL的引用者是EXE还是DLL，都会在所属EXE程序的当前路径寻找。

> 第三

***MODULE的当前路径***。注：所谓的MODULE就是对该DLL的引用者，可能是一个EXE来引用该DLL，也可能是一个DLL来引用该DLL：

1. 如果MODULE本身是EXE，那也就是EXE程序的当前路径；

2. 如果MODULE本身是DLL，那就是这个DLL所在的路径，而这个MODULE(DLL)可能与EXE并不在一个路径；

> 第四

在 ***`xxx.exe.config`*** 文件里配置的其它路径。

- 配置在 `runtime/assemblyBinding/probing` 节点的 `privatePath` 属性中
- 多个路径通过 `;` 分隔，举例如下：

```xml {5}
<?xml version="1.0"?>
<configuration>
	<runtime>
		<assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1">
			<probing privatePath="LC1;LC1\LC2"/>
		</assemblyBinding>
	</runtime>
</configuration>
```



## 反射调用加载

### 代码规则

这个就比较直白了，代码里直接写明要加载的DLL名称和路径，如下：

```csharp
Assembly.LoadFrom(@"ClassLibrary1.dll");
Assembly.LoadFrom(@"C:\a\b\ClassLibrary1.dll");
```



### 寻找规则

1. 直接按照代码中所 ***指定的路径和名称*** 进行寻找；
2. 如果只有DLL名称但没有DLL路径：
    - 则只会在 ***所属EXE程序的当前路径*** 寻找，无论反射DLL的MODULE是EXE还是DLL；
    - 而不会在MODULE的当前路径寻找，也不会在 `xxx.exe.config` 配置的路径寻找；

