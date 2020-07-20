(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{520:function(s,t,n){"use strict";n.r(t);var a=n(27),e=Object(a.a)({},(function(){var s=this,t=s.$createElement,n=s._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h1",{attrs:{id:"_11-4-集成测试示例"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_11-4-集成测试示例"}},[s._v("#")]),s._v(" 11.4. 集成测试示例")]),s._v(" "),n("p",[s._v("前面的内容对 integration test 的规则进行了总结，下面通过例子，来逐步展示这些规则。")]),s._v(" "),n("p",[n("em",[s._v("源码："),n("a",{attrs:{href:"https://gitee.com/lindorof/Rust_The_Book/tree/master/ch11-4-lib_integ_test",target:"_blank",rel:"noopener noreferrer"}},[s._v("ch11-4-lib_integ_test"),n("OutboundLink")],1)])]),s._v(" "),n("blockquote",[n("p",[s._v("创建 lib crate，名称是 lib_integ_test ，与 unit test 类似，lib.rs 代码如下：")])]),s._v(" "),n("div",{staticClass:"language-rust line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-rust"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//需要pub，否则IT访问不到")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("pub")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("fn")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("func_g")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//需要pub，否则IT访问不到")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("pub")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("mod")]),s._v(" mod_g "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("pub")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("fn")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("func1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token attribute attr-name"}},[s._v("#[cfg(test)]")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("mod")]),s._v(" tests "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("use")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("super")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("::")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token attribute attr-name"}},[s._v("#[test]")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("fn")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("unit_test1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        mod_g"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("::")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("func1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br")])]),n("blockquote",[n("p",[s._v("tests/iteg_test1.rs 代码如下，注意不管 function 是否在 module 中，只要是 test function ，就需要标注 #[test]：")])]),s._v(" "),n("div",{staticClass:"language-rust line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-rust"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//注意这句代码")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("use")]),s._v(" lib_integ_test"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token attribute attr-name"}},[s._v("#[test]")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("fn")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("itg1_test1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//访问lib中的function")]),s._v("\n    lib_integ_test"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("::")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("func_g")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("mod")]),s._v(" itg1 "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token attribute attr-name"}},[s._v("#[test]")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("fn")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("test1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//访问lib中某个mod里的function")]),s._v("\n        lib_integ_test"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("::")]),s._v("mod_g"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("::")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("func1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br")])]),n("blockquote",[n("p",[s._v("创建 util/mod.rs")])]),s._v(" "),n("div",{staticClass:"language-rust line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-rust"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/*\n参考 Chapter7 ，\n该文件所在的子文件夹名称是 util ，\n因此 module 名称自动就是 util ，\n所以，在该代码文件中，\n所有的 mod 都是 util 的 submodule\n*/")]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("pub")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("fn")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("util_func1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("pub")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("mod")]),s._v(" mod_u "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("pub")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("fn")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("func1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br")])]),n("blockquote",[n("p",[s._v("tests/iteg_test2.rs 代码如下，使用了 util 中的功能")])]),s._v(" "),n("div",{staticClass:"language-rust line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-rust"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//注意这句代码")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("mod")]),s._v(" util"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token attribute attr-name"}},[s._v("#[test]")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("fn")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("itg2_test1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//访问util中的function")]),s._v("\n    util"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("::")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("util_func1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("mod")]),s._v(" itg2 "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token attribute attr-name"}},[s._v("#[test]")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("fn")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("test1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//itg2是一个sub module")]),s._v("\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//因此需要super::才能访问到util")]),s._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("super")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("::")]),s._v("util"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("::")]),s._v("mod_u"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("::")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("func1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br")])]),n("blockquote",[n("p",[s._v('下面是节选的部分测试结果，可以分别看到 unit test 、itg1/itg2 两个 integration test 的结果，同时，util 不会被测试。为了结果展示的清晰，我在每个 "Running ..." 之前，加了 ">>>" 标注。注意看每个 "Running ..." 的内容，其中展示了 IT 的名称。')])]),s._v(" "),n("div",{staticClass:"language-text line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v(">>> Running target/debug/deps/lib_integ_test-801523445e71dcaa\n\nrunning 1 test\ntest tests::unit_test1 ... ok\n\ntest result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out\n\n>>> Running target/debug/deps/iteg_test1-07f5cf4a39a0f065\n\nrunning 2 tests\ntest itg1::test1 ... ok\ntest itg1_test1 ... ok\n\ntest result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out\n\n>>> Running target/debug/deps/iteg_test2-a8df2154fd340010\n\nrunning 2 tests\ntest itg2::test1 ... ok\ntest itg2_test1 ... ok\n\ntest result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br")])]),n("blockquote",[n("p",[s._v("可以直接复制 tests/iteg_test1.rs 的内容来创建 tests/iteg_test3.rs ，且从运行结果可以看到各个 IT 之间不会产生命名冲突。")])])])}),[],!1,null,null,null);t.default=e.exports}}]);