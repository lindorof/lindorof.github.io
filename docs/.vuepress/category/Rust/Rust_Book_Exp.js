exports.Rust_Book_Exp = (title) => {
    return [
        '',
        '01 Getting Started/01 Getting Started',
        '02 Programming a Guessing Game/01 Programming a Guessing Game',
        {
            title: '3. 基础',
            collapsable: true,
            children: [
            '03 Common Programming Concepts/01 Variables and Mutability',
            '03 Common Programming Concepts/02 Data Types',
            '03 Common Programming Concepts/03 How Functions Work',
            '03 Common Programming Concepts/04 Comments',
            '03 Common Programming Concepts/05 Contrl Flow'
            ]
        },
        {
            title: '4. 所有权',
            collapsable: true,
            children: [
            '04 Understanding Ownership/01 What is Ownership',
            '04 Understanding Ownership/02 References and Borrowing',
            '04 Understanding Ownership/03 Slices'
            ]
        },
        {
            title: '5. 结构体',
            collapsable: true,
            children: [
            '05 Using Structs to Structure Related Data/01 Defining and Instantiating Structs',
            '05 Using Structs to Structure Related Data/02 An Example Program Using Structs',
            '05 Using Structs to Structure Related Data/03 Method Syntax'
            ]
        },
        {
            title: '6. 枚举',
            collapsable: true,
            children: [
            '06 Enums and Pattern Matching/01 Defining an Enum',
            '06 Enums and Pattern Matching/02 The Match Control Flow Operator',
            '06 Enums and Pattern Matching/03 Concise Control Flow with if let'
            ]
        },
        {
            title: '7. 模块',
            collapsable: true,
            children: [
            '07 Modules/01 mod and the Filesystem',
            '07 Modules/02 Controlling Visibility with pub',
            '07 Modules/03 Referring to Names in Different Modules'
            ]
        },
        {
            title: '8. 集合',
            collapsable: true,
            children: [
            '08 Common Collections/01 Vectors',
            '08 Common Collections/02 Strings',
            '08 Common Collections/03 Hash Maps',
            '08 Common Collections/04 Ownership about Collections'
            ]
        },
        {
            title: '9. 错误处理',
            collapsable: true,
            children: [
            '09 Error Handling/00 Foreword',
            '09 Error Handling/01 Unrecoverable Errors with panic',
            '09 Error Handling/02 Recoverable Errors with Result',
            '09 Error Handling/03 To panic or Not to panic'
            ]
        },
        {
            title: '10. 泛型及生命周期',
            collapsable: true,
            children: [
            '10 Generic Types and Traits and Lifetimes/00 Foreword',
            '10 Generic Types and Traits and Lifetimes/01 Generic Data Types',
            '10 Generic Types and Traits and Lifetimes/02 Traits of Defining Shared Behavior',
            '10 Generic Types and Traits and Lifetimes/03 Validating References with Lifetimes',
            '10 Generic Types and Traits and Lifetimes/04 Thinking in Lifetimes'
            ]
        },
        {
            title: '11. 自动测试',
            collapsable: true,
            children: [
            '11 Writing Automated Tests/00 Foreword',
            '11 Writing Automated Tests/01 How to Write Tests',
            '11 Writing Automated Tests/02 Controlling How Tests Are Run',
            '11 Writing Automated Tests/03 Test Organization',
            '11 Writing Automated Tests/04 Example for Integration Test'
            ]
        },
        {
            title: '12. 命令行',
            collapsable: true,
            children: [
            '12 A Command Line Tool/00 Foreword',
            '12 A Command Line Tool/01 Accepting Command Line Arguments',
            '12 A Command Line Tool/02 Reading a File',
            '12 A Command Line Tool/03 Refactoring to Improve Modularity and Error Handling',
            '12 A Command Line Tool/04 Test Driven Development',
            '12 A Command Line Tool/05 Working with Environment Variables',
            '12 A Command Line Tool/06 Standard Output and Standard Error',
            '12 A Command Line Tool/07 Appendix'
            ]
        },
        {
            title: '13. 闭包及迭代器',
            collapsable: true,
            children: [
            '13 Functional Programming about Closure and Iterator/01 Closures that Anonymous Functions can Capture their Environment',
            '13 Functional Programming about Closure and Iterator/02 Processing a Series of Items with Iterators',
            '13 Functional Programming about Closure and Iterator/03 Improving Our IO Project',
            '13 Functional Programming about Closure and Iterator/04 Comparing Performance about Loop and Iterator'
            ]
        },
        {
            title: '14. Cargo 和 Crates.io',
            collapsable: true,
            children: [
            '14 More about Cargo and Crates.io/01 Customizing Builds with Release Profiles',
            '14 More about Cargo and Crates.io/02 Publishing a Crate to Crates.io',
            '14 More about Cargo and Crates.io/03 Cargo Workspaces',
            '14 More about Cargo and Crates.io/04 Installing Binaries from Crates.io with cargo install',
            '14 More about Cargo and Crates.io/05 Extending Cargo with Custom Commands'
            ]
        },
        {
            title: '15. 智能指针',
            collapsable: true,
            children: [
            '15 Smart Pointers/00 Foreword',
            '15 Smart Pointers/01 Using Box to Point to Data on the Heap',
            '15 Smart Pointers/02 Treating Smart Pointers Like Regular References with the Deref Trait',
            '15 Smart Pointers/03 Running Code on Cleanup with the Drop Trait',
            '15 Smart Pointers/04 Rc the Reference Counted Smart Pointer',
            '15 Smart Pointers/05 RefCell and the Interior Mutability Pattern',
            '15 Smart Pointers/06 Reference Cycles Can Leak Memory'
            ]
        },
        {
            title: '16. 无畏并发',
            collapsable: true,
            children: [
            '16 Fearless Concurrency/00 Foreword',
            '16 Fearless Concurrency/01 Using Threads to Run Code Simultaneously',
            '16 Fearless Concurrency/02 Using Message Passing to Transfer Data Between Threads',
            '16 Fearless Concurrency/03 Shared State Concurrency',
            '16 Fearless Concurrency/04 Extensible Concurrency with the Sync and Send Traits'
            ]
        },
        {
            title: '17. 面向对象',
            collapsable: true,
            children: [
            '17 Object Oriented Programming Features of Rust/01 Characteristics of Object Oriented Languages',
            '17 Object Oriented Programming Features of Rust/02 Using Trait Objects That Allow for Values of Different Types',
            '17 Object Oriented Programming Features of Rust/03 Implementing an Object-Oriented Design Pattern'
            ]
        },
        {
            title: '18. 模式与匹配',
            collapsable: true,
            children: [
            '18 Patterns and Matching/01 All the Places Patterns Can Be Used',
            '18 Patterns and Matching/02 Refutability Whether a Pattern Might Fail to Match',
            '18 Patterns and Matching/03 Pattern Syntax'
            ]
        }
    ]
}