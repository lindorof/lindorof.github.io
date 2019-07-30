# Qt for macOS

> 本文翻译自 Qt 官网的 [Qt for macOS](https://doc.qt.io/qt-5/macos.html) 



`macOS` 是苹果 Mac 系列计算机的操作系统，以前叫 `OS X` 或 `Mac OS X` 。它是 UNIX 平台，基于 `darwin kernel` ，与其它 UNIX-like 平台类似。最主要的不同是，macOS 从 X11 开始，使用自己原生的 windowing system ，并可通过 Cocoa API 进行访问。



若要在 macOS 上下载和安装 Qt ，请遵循 [Getting Started with Qt](https://doc.qt.io/qt-5/gettingstarted.html#) 的介绍。



## 支持的版本

在讨论 Qt 对 macOS 的版本支持时，需要区分清楚构建环境和目标平台

- 构建环境：基于哪一个平台来构建程序
- 目标平台：所构建的程序所支持的平台



下面是所支持的 macOS 版本：

| 目标平台 | 架构 | 构建环境 |
| ----- | ------ | ------ |
| macOS 10.12, 10.13, 10.14 | x86_64, x86_64h | Xcode 10 (10.14 SDK), Xcode 9 (10.13 SDK) |



**注意**：Xcode9 仅支持应用的开发（可选择是否使用某些新特性，例如 layer-bakcing ，dark mode 等），不再支持 Qt 自身的开发



### 构建环境

macOS 的构建环境完全取决于构建应用的 Xcode 版本。Xcode 包含两个东西，一个是工具链（编译器、链接器、及其它），一个是 macOS 平台的 SDK（头文件和 lib 库），它们决定了应用程序的构建。



**注意**：构建环境与所运行 Xcode 的 macOS 版本是没有任何关系的，只要你的操作系统装载了某个版本的 Xcode ，构建环境就由这个版本的 Xcode 决定。



Xcode 可以从苹果的 [developer website](https://developer.apple.com/download/) 页面下载（包括老版本的 Xcode）。安装完成之后，需要使用 `xcode-select` 工具来指定所安装的 Xcode ：

```shell
$ sudo xcode-select --switch /Applications/Xcode.app
```

并且可以检查所指定的 Xcode ：

```shell
$ xcode-select -print-path
/Applications/Xcode.app/Contents/Developer
```

然后，可通过 `xcrun` 命令来查找工具链中的某个工具：

```shell
$ xcrun -sdk macosx -find clang
/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/clang
```

或者查看平台 SDK 的路径：

```shell
$ xcrun -sdk macosx --show-sdk-path
/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.14.sdk
```



### 目标平台

macOS 上的构建会使用一个叫做 ***weak linking*** 的技术，它让我们可以基于最新平台 SDK 的头文件和 lib 库进行构建，同时又让我们的应用程序可以发布到低版本 SDK 的 macOS 上。当程序在 macOS 运行时，如果该 macOS 的 SDK 版本低于构建时的 SDK 版本，则 Qt 会进行运行时检查，确定某些平台特性是否可用。



理论上来说，这种机制允许应用程序在所有的 macOS 版本上运行，但由于一些实际的技术上的原因，还是会有一个最低版本限制，也就是应用程序的 ***deployment target (发布目标)*** 。如果运行程序的 macOS 版本低于发布目标，则 macOS 或 Qt 不会让程序运行，并给出错误提示信息。



Qt 通过 qmake 变量 `QMAKE_MACOSX_DEPLOYMENT_TARGET` 来设置发布目标，macOS 上的 `makespec` 已为该变量设置了默认值。一般情况下不需要更改该默认值，但如果需要，可以在工程文件中进行配置：

```shell
QMAKE_MACOSX_DEPLOYMENT_TARGET = 10.13
```

**注意**：在工程文件中配置的该值不能低于 Qt 的默认值，否则可能导致运行时错误。



综上所述，确保总是基于最新的平台 SDK 进行构建，可以让 Qt 应用程序使用到最新 macOS 版本的新特性。



关于 macOS SDK 开发的更多信息，参看苹果官网的 [developer documentation](https://developer.apple.com/library/mac/#documentation/DeveloperTools/Conceptual/cross_development/Introduction/Introduction.html) 。



> ***关于 macOS 不同版本带来的特性变化***

在使用最新版本的 Xcode 和 SDK 构建应用程序时，有一点需要额外说明：基于构建应用程序的 SDK 版本，macOS 系统框架有时候需要决定是否启用对应的新变化的特性。



例如，macOS 10.14 Mojave 版本引入了 dark-mode ，那么 macOS 会认为，只有基于 10.14 SDK 构建的应用程序才支持 dark-mode ，而其它基于早期 SDK 构建的应用程序会使用默认的 light-mode 。通过这个机制，苹果确保了基于早期 SDK/OS 构建的应用程序可以被发布，并且不需要回归测试就能够在新发布的 macOS 系统上运行。



而进一步的，如果 Qt 在处理 macOS 的一些新特性（dark-mode, layer-backed views）时遇到问题，要弃用这些新特性，则唯一的方式是：基于更早版本的 SDK（10.13 SDK, Xcode 9）来构建应用程序。但要注意，这只是最后的解决办法，在你的应用程序无法解决或无法绕开问题时才应当采用。



### 架构

默认情况下，Qt 会编译为 x86_64 架构。如果要编译为 x86_64_h（haswell）架构，需使用 qmake 的 `QMAKE_APPLE_DEVICE_ARCHS` 变量，在配置时进行指定：

```shell
./configure -platform macx-clang QMAKE_APPLE_DEVICE_ARCHS=x86_64h
```

另外，`QMAKE_APPLE_DEVICE_ARCHS` 也可以设置为用空格分隔的清单，来同时构建为多个架构：

```shell
./configure -platform macx-clang QMAKE_APPLE_DEVICE_ARCHS="x86_64 x86_64h"
```



## 其它的命令行选项

在命令行模式下，可以使用 `qmake` 和 `make` 来构建应用程序，而对于 `qmake` 来说，可以有一些额外的选项。



一方面，对于二进制的包，`qmake` 默认会创建 Xcode 工程；一方面，可使用 `-spec macx-gcc` 来创建 makefile ；一方面，可使用 `-spec macx-xcode` 来创建 Xcode 工程；例如：

```shell
qmake -spec macx-xcode project.pro
```

通过 `qmake` 并指定 `-spec macx-xcode` 来创建 Xcode 工程文件时，不用再关心 Qt 的预处理器（[moc](https://doc.qt.io/qt-5/moc.html#) 和 [uic](https://doc.qt.io/qt-5/uic.html#)）规则，因为 [qmake](https://doc.qt.io/qt-5/qmake-manual.html) 都自动处理好了，并且确保了所需的内容都被链接进应用程序中。



Qt 并不会完全的与开发环境交互，例如，可以在 Xcode 的交互界面下，通过插件来设置一个文件为 `mocable` 。



构建以后的结果是一个应用程序包，它是一个目录结构，包含可执行程序。因此，应用程序可以通过苹果的 Finder 来双击运行，也可以通过命令行来指向可执行程序：

```shell
myApp.app/Contents/MacOS/myApp
```

如果你希望构建为命令行工具而不使用 GUI ，例如 `moc` ，`uic` ，`ls` 等，你可以在工程文件中设置 `CONFIG` 变量，从而让 `qmake` 禁用程序包的创建：

```shell
CONFIG -= app_bundle
```



## 在 macOS 上发布应用

macOS 应用一般发布为自包含的应用程序包，在应用程序包中，包含了可执行程序及依赖项，例如 Qt 库、插件、语言包及其它可能使用到的资源。类似 Qt 的第三方库一般不会被安装在系统中，因此每个应用程序中都会包含一份对应的拷贝。



一般发布应用的方式是提供为 compressed disk image（.dmg文件），从而用户可以直接在 Finder 中挂载。通过 ***macdeployqt*** （`bin/macdeployqt`）这个发布工具，可以创建自包含的应用程序包，也可以创建 .dmg 文件。另外，应用也可以通过  Mac App Store 来发布，而 Qt 5 致力于满足和遵守 app store 的沙盒规则，因此，***macdeployqt*** 可以用于 app store 的发布。



详细参考 [Qt for macOS - Deployment](https://doc.qt.io/qt-5/macos-deployment.html#) 



## macOS 其它议题

参考下面的链接，包含了 macOS 的相关议题，以及创建 macOS 应用的一些建议：

[Qt for macOS - Specific Issues](https://doc.qt.io/qt-5/macos-issues.html#) 



## 下一步

欢迎继续浏览 Qt 的其它内容，包括 API 概述，以及如何使用 API 的例子。

- [Qt Overviews](https://doc.qt.io/qt-5/overviews-main.html#) - 应用开发相关的主题
- [Examples and Tutorials](https://doc.qt.io/qt-5/qtexamplesandtutorials.html#) - 代码示例和教程
- [Qt Reference Pages](https://doc.qt.io/qt-5/reference-overview.html#) - C++ 和 QML 的 API



> [http://qt.io](http://qt.io/) 是 Qt 非常活跃的社区，包含了 wiki 、论坛、以及其它的学习指南和介绍。