---
title: '[译] 你还不了解JS：起步 (第二版) 第一章 什么是JS'
date: 2020-08-30T14:40:00+08:00
author: 'waningflow'
draft: false
keywords: 'js,ECMAScript'
slug: 'you-dont-know-js-yet-get-started-chapter-1'
tags: ['js', '翻译']
cover: 'img/you-dont-know-js-yet-get-started-chapter-1-cover.jpg'
# description: '讨论Webpack4中的Tree Shaking的原理和实践'
---

你还不了解 JS，我也不完全了解。我们没有人完全了解，但是我们都可以开始更好的了解 JS。

在“你还不了解 JS（YDKJSY）”系列第一本书的第一章中，我们将花些时间来建立前进的基础。首先，我们会涵盖各种重要的背后的处理细节，消除有关这门语言到底是（和不是）什么的一些误解。

这对于了解 JS 构成维护的特性和过程很有用。所有的 JS 开发者都应该理解。如果你想去了解 JS，那么这就是你踏进这个旅程的第一步。

## 关于本书

我强调旅程这个词，因为了解 JS 并不是一个终点，而是一个方向。不管你在这门语言上花了多少时间，你总能发现一些别的东西去学习和理解。因此，不要将本书视为速成书。相反，在你做这开始几步时，耐心和坚持才是最重要的。

在本背景知识章节后，本书的其余部分列出了你在使用 YDKJSY 书籍深入研究和学习 JS 时会发现的内容的高级路线图。

特别是第四章确定了构成 JS 语言的三个主要支柱：作用域/闭包、原型/对象、类型/强制转换。JS 是一种广泛而复杂的语言，具有许多的功能特性。但所有 JS 都建立在这三个基本支柱上。

记住，即使这本书的标题是“起步”，也不能作为初学者/入门书使用。本书的主要任务是让你为在整个系列的其余部分深入学习 JS 做好准备。写本书时的假设是你在开始读 YDKJSY 之前已经至少有几个月的 JS 经验。因此要充分利用起步，确保你花大量的时间编写 JS 代码来积累经验。

即使您之前已经写了很多 JS，本书也不该只是被快速扫过或者直接跳过。花时间把这里的内容完全消化掉。一个好的开始总取决于坚实的第一步。

## 关于名字？

JavaScript 这个名字可能是最容易让人误解的编程语言名字。

它跟 Java 有关吗？仅仅是 Java 的脚本形式？仅用于编写脚本而不是实际程序吗？

事实上，JavaScript 这个名字是营销手段的产物。在 Brendan Eich 最初构想该语言时，它的代号为 Mocha。在 Netscape 公司内部，用的是 LiveScript。但是当公开命名该语言时，JavaScript 赢得了投票。

为什么？因为该语言最初是主要为了吸引 Java 程序员而设计的，并且“script”一词在当时很流行，指的是轻量级程序。这些轻量级的“script”将是第一种嵌入在 web 页面上的脚本。

换句话说，JavaScript 命名可以说是一种营销策略，将其定位为当时更重也更知名的 Java 的一种不错的替代方案。就这点而言，它很容易被称为“WebJava”。

JavaScript 代码和 Java 代码有些表面的相似之处，这些相似之处并不是来自于共同开发，而是它们对开发者来说具有 C（某种程度上为 C++）的语法期望。

比如说，我们用{和}来表示代码块的开头 和结尾，就跟 C/C++和 Java 一样。我们也用;来标记一个语句的结束。

从某方面来说，JavaScript 和 Java 在法律上的关系比在语法上更深。甲骨文公司（通过收购 SUN）成功 Java 的所有者，同时还拥有 JavaScript 名称的正式商标（SUN 抢在网景之前注册）。该商标几乎从未被强制执行，可能目前还没有被执行过。

由于这些原因，有人建议我们使用 JS 而非 JavaScript。这是一个非常常见的缩写，即使它不是官方语言品牌本身的理想选择。确实，这些书几乎都使用 JS 来指代该语言。

由 TC39 指定并由 ECMA 标准机构正式化的语言的官方名称是 ECMAScript，这使得该语言与 Oracle 拥有的商标区别更大。实际上，自 2016 年以来，官方语言名称也添加了修订年份后缀。在撰写本文是，该名称是 ESMAScript2019，或者缩写成 ES2019。

换句话说，在浏览器和 Node.js 中运行的 JavaScript/JS 是 ES2019 标准的实现。

> NOTE:
>
> 不要使用像 JS6 或 ES8 之类的术语来指代该语言。有些人这么做，但这些术语只会造成更持久的困惑。你应该坚持使用 ES20xx 或直接是 JS。

不管你叫它 JavaScript、JS、ECMAScript 还是 ES2019，他都并不是 Java 的变体！

> "Java is to JavaScript as ham is to hamster." --Jeremy Keith, 2009

## 语言规范

我提到过 TC39，这是管理 JS 的技术指导委员会。他们的主要工作是管理这门语言的官方规范。他们定期开会，对任何商定的变更进行投票，然后将其提交给标准组织 ECMA。

JS 的语法和行为在 ES 规范中定义。

自 JS 于 1995 年问世以来，ES2019 恰好是第十个主要的编号规范/修订版，因此在 ECMA 托管的规范的官方 URL 中，您会找到“ 10.0”：

[https://www.ecma-international.org/ecma-262/10.0/](https://www.ecma-international.org/ecma-262/10.0/)

TC39 委员会由来自众多公司的 50 至 100 个人组成，包括浏览器制造商（Mozilla，Google，Apple）和设备制造商（三星等）。委员会的所有成员都是志愿者，尽管其中许多人是这些公司的雇员，因此可能会因其在委员会的职责而获得部分补偿。
TC39 通常每隔一个月召开一次会议，通常为期三天，以审查成员自上次会议以来所做的工作，讨论问题并就提案进行投票。 会议地点在愿意主办的成员公司之间轮流举行。

所有 TC39 提案都要经过"5-stage"流程--当然，因为我们是程序员，所以它是从 0 开始计数的！--"Stage 0"到"Stage 4"。您可以在此处阅读有关 Stage 流程的更多信息：[https://tc39.es/process-document/](https://tc39.es/process-document/)。

阶段 0 大致意味着，TC39 里的某人认为这是一个有价值的想法，并计划倡导和开展工作。 也就是说非 TC39 成员通过社交媒体或博客帖子等非正式手段“提出”的许多想法实际上是"pre-stage 0"。 你得找个 TC39 成员拥护该提案才能把它正式推到"Stage 0"。

提案达到"Stage 4"状态后，就可以加入该语言的下一个年度修订中。 一个提案要走完这些阶段，可能需要几个月甚至几年的时间。

所有提案都在 TC39 的 Github 中公开管理：[https://github.com/tc39/proposals/](https://github.com/tc39/proposals/)。

任何人（不管你在不在 TC39）都欢迎参加这些公开讨论以及有关提案的制定过程。 但是，只有 TC39 成员才能参加会议并对提案和更改进行投票。 所以实际上 TC39 成员的声音在 JS 的发展方向上具有举足轻重的地位。

与某些长期存在的说法相反，JavaScript 并没有多个版本。只有一个 JS，那就是 TC39 和 ECMA 维护的官方版本。

早在 21 世纪初的时候，微软曾维护过 JS 的 fork 的逆向工程的版本（也并不完全兼容），被称作"JScript"，那个时候确实有多个版本的 JS。但那些日子都已经过去了，现在再这么说 JS 早就过时了而且不准确。

所有主流浏览器和设备制造商都致力于使其 JS 的实现符合这一主要规范。 当然，各种引擎实现功能的时间可能有先后。 但不可能说 SpiderMonkey 引擎（Mozilla 的 JS 引擎）跟 v8 引擎（Chrome 的 JS 引擎）实现的功能有所不同或不兼容。

也就是说你只要学**一种 JS**，然后在各种地方直接用就好了。

## Web 统治着（JS 的）一切

尽管运行 JS 的环境不断扩充（从浏览器，到服务端（Node.js），再到机器人和灯泡（译注：？），等等），但统治 JS 的环境是 Web。换句话说，Web 浏览器如何实现 JS 才是唯一重要的。

大体上说，在“基于浏览器的 JS 引擎”中运行的 JS 和规范中定义的 JS 是一样的。但还是有一些不同的地方必须得注意。

有时 JS 规范会规定一些新的或者改进的行为，但这跟它在“基于浏览器的 JS 引擎”中的工作方式并不完全匹配。这种不匹配是有历史原因的：JS 引擎在一些特性上已经有超过 20 年的可观测行为，很多 Web 内容都依赖于此。因此，有时 JS 引擎会拒绝遵循规范指示的更改，因为这会破坏这些 Web 内容。

对于这种情况，TC39 往往会回溯，然后简单的去遵守符合当前 web 实际情况的规范。比如说，TC39 曾想给 Array 对象添加 contains(...)方法，但是发现这个名字跟一个已经被一些站点使用的老的 JS 框架冲突了 ，于是他们改用了一个不冲突的名字 includes(...) 。同样的事情也发生在一个被称为"smooshgate"（译注: 事件详情参考）的让人哭笑不得的 JS 社区危机中，原计划命名为 flatten(...)的方法最终被改为 flat(...)。

但是，尽管有时基于浏览器的 JS 引擎的实现可能不太符合标准规范，但 TC39 偶尔也会决定坚持执行这些规范。

解决方案呢？Appendix B（附录 B），“Web 浏览器额外的 ECMAScipt 特性”。JS 规范包含该附录，来详细说明官方 JS 规范与实际的 Web 中 JS 之间所有已知的差异。或者说，这是仅针对 Web JS 才有的例外。而其他的 JS 环境必须严格遵守规范。

B.1 和 B.2 两节包含了 web 端 JS 附加的部分（语法和 API），这也是因为历史原因，TC39 也没计划在核心 JS 中正式支持。比如 0 开头表示八进制数字，全局的 esacpe() 和 unescape()方法，还有字符串的"helpers"像 anchor()和 blink()，还有 RegExp 对象的 compile()方法。

一些代码运行在 web 环境和非 web 环境时，表现会明显的不同，导致不同的结果。B.3 节专门介绍了这些冲突。其中所列的大部分更改在严格模式下会抛出 error。

附录 B 中的坑可能不会被经常踩到。但是为了长久的安全还是避免使用这些结构的好。尽可能遵循 JS 规范，不要依赖仅适用于某些 JS 引擎环境的行为。

## 不都是（Web）JS...

这段代码是 JS 程序吗？

```js
alert('Hello, JS!');
```

取决于你怎么看。这里用到的 alert()方法并不属于 JS 规范，而只存在于 Web 环境下的 JS 中。然而你在附录 B 中并看不到它，这该怎么解释？

不同的 JS 环境（像浏览器 JS 引擎、Node.js 等）会把一些 API 添加到全局作用域，提供一些环境特定的能力，就比如在用户的浏览器弹出一个 alert 窗口。

其实有非常多“类 JS”API，比如 fetch()、 getCurrentLocation()、getUserMedio()都是看起来像 JS 的 web API。在 Node.js，我们能通过各种内建模块访问数百个 API，比如 fs.write()。

还有个很常见的例子是 console.log()（以及所有其他 console.\*方法） 。这些都不是 JS 规范定义的，但是因为它们的通用型，几乎所有的 JS 环境都基于大致的共识实现了这些方法。

所以 alert()和 console.log()并不是 JS 定义的，它们看起来像 JS。它们是函数或对象的方法，它们也遵守 JS 语法规则。它们背后的行为取决于运行 JS 引擎的环境，但是表面上看，它们必须遵守 JS 语法才能像 JS 一样使用。

人们总抱怨跨浏览器之间的差异说“JS 一致性太差了！”，究其原因其实都是那些环境自己的行为导致，而不是 JS 自身。

所以调用 alert()可以称作 JS，但是 alert 本身只是来自环境的实现，不是 JS 官方规范的一部分。

## 不总是 JS

乍一看，在浏览器开发者工具（或者 Node）中使用 console/REPL(Read-Evaluate-Print-Loop)感觉就像一个非常简单的 JS 环境。但其实不是。

开发者工具是...给开发者提供的工具。它们的主要目的是让开发者工作更轻松。它们优先考虑 DX(Developer Experience)。这些工具的目的不是为了准确无误的体现严格 JS 规范的所有细微的行为差别。因此，如果你把控制台视为纯 JS 环境，那你有时可能会踩到一些坑。

不过，这种便利是一件好事。我很高兴开发者工具让开发者更轻松，很高兴有一些不错的交互，比如变量/属性的自动补全，等等。我想说的是，我们不能也不应该期望这些工具始终严格遵守 JS 程序的处理方式， 因为那不是这些工具的目的。

因为这些工具在各种浏览器中表现都不太一样，而且会更新（有时还更新的很频繁），所以我就不在本文中“硬编码”什么具体的细节了，以防本书很快就过时。

但我还是会提一些在不同 JS 控制台环境中的各个地方都适用的奇怪例子，来强调我的观点，即使用它们的时候不要假设原生的 JS 行为：

- 在控制台的顶层“全局作用域”中使用 var 或者 function 的声明是否真的创建了全局变量（以及对应的 window 属性，反之亦然）
- 在顶层“全局作用域”多次使用 let 和 const 声明时发生了什么
- 在一次“行输入”（按了<enter>之后）中使用的 user strict;对该控制台会话的其余部分还生效吗？就像在一个.js 文件的第一行写上时那样 。以及能不能在“第一行”之外使用 use strict;还能在当前会话保持严格模式开启
- 非严格模式下（控制台中直接的）函数调用，this 会默认绑定到全局对象，那这个全局对象包含了预期的全局变量吗
- 在多个“行输入“之间提升（见书 2，作用域和闭包）是怎么运作的
- ...

开发者控制台并没有试图像一个 JS 编译器处理.js 文件一样去处理你输入的代码，而是让你输入几行代码后可以快速看到结果。这是完全不同的用户场景，所以没理由预期一个工具同时处理两种场景。

你在控制台看到的行为并不能代表确切的 JS 语义，如果想了解确切的 JS 语义，应该去阅读规范。把控制台当成一个“JS 友好”的环境，就其本身而言这比较有用。

## 多张面孔

编程语言中的术语“范式”是指广泛的（几乎是通用的）来构造代码的思维方式和方法。在一个范式中有各种风格和形式的变化来区分程序，包括无数不同的库和框架，它们在代码中都留下了独特的印记。

但无论一段程序的个人风格是什么样，在你第一眼看上去的时候，它大体上是属于哪种范式是比较显而易见的。

典型的范式级别代码种类包括过程式，面向对象（OO/classes）和函数式（FP）：

- 过程式风格通过一组预定的操作以自上而下的线性顺序组织代码，通常这些操作集中在称为“过程”的相关单元中。
- OO 风格通过将逻辑和数据集中在“类”中来组织代码。
- FP 风格将代码组织成函数（与过程相对的纯函数），并将这些函数改编为值。

各种范式之间没有对错之分。它们是指引程序员如何解决问题、如何构造维护代码的方向。

有些语言在很大程度上倾向于一种范例-C 是过程式的，Java / C ++几乎完全是面向类的，而 Haskell 一直是 FP。

但是许多语言也支持不同范式混用的代码模式。 所谓的“多范式语言”提供了极大的灵活性。 在某些情况下，你甚至会在单个程序看见两种或更多范式写在一起。

JavaScript 无疑是一种多范式语言。 您可以编写过程、面向类或 FP 风格的代码，而且可以逐行决定，不必被迫选择全有或全无。

## 向后和向前

引导 JS 发展的最基本的特性之一就是向后兼容。很多人对这个术语表示的含义感到迷惑，经常把它跟一个相关联而又不同的词搞混：向前兼容。

让我们来澄清事实吧。

向后兼容的意思是一旦一个东西被认定为是有效的 JS，那么未来对这个语言任何的修改都不能导致这段代码变成无效的 JS。1995 年写的代码--可能非常的原始或受限--到了今天应该还能工作。就像 TS39 成成员经常表明的一点：我们不会破坏 web。

这里主要目的是想说 JS 开发者写代码的时候可以完全不用担心因为某次浏览器的发布升级而导致代码不能正常运行了。因此在未来数年，选择 JS 作为开发语言是一项更明智、更安全的投资。

这个“保证”并不容易。一直保持向后兼容性，时间横跨这门语言近 25 年的历史，这造成了巨大的负担，也带来了一系列独特的挑战。在计算这种向后兼容性的承诺方面，你将很难找到多少其他的例子。（You'd be hard pressed to find many other examples in computing of such a commitment to backwards compatibility.）

坚持这项原则的代价没法被随随便便消除。它必然会对更改或扩展语言设置很高的标准。任何决定都将永久生效，不管是错误还是别的。一旦一个东西变成了 JS 的一部分，它就不能被去除，因为可能破坏现有的程序，即使我们真的非常非常想把它去掉！

这条规则也有一些小的例外。JS 曾有过一些不向后兼容的更改，但 TS39 对于这种事是极度的谨慎的。他们研究了 web 上现存的代码（通过浏览器数据收集）来评估这种破坏性更新的影响，然后浏览器厂商最终会投票决定他们是否愿意牺牲一小部分用户的体验，换取更多的站点（和用户）在某些方面的修复和改进带来的便利。

这类更改很少见，几乎都是一些极端场景的用法，一般不太可能对大多数的站点造成破坏。

与向后兼容相对应的是向前兼容。向前兼容意味着即使在程序中添加一些新的东西也能保证其在旧的 JS 引擎中正常运行。**JS 不是向前兼容的**，尽管很多人希望这样，甚至错误的以为它向前兼容。

相比之下，HTML 和 CSS 是向前兼容而不是向后兼容的。如果你翻出 1995 年写的 HTML 或者 CSS，放在现在的浏览器中完全有可能无法正常运行（也有可能照常运行）。但是如果你在一个 2010 年的浏览器中使用 2019 年的新特性，页面并不会“崩溃”--无法识别的 CSS/HTML 会被跳过，而其余的 CSS/HTML 会被相应的处理。

在设计程序语言的时候考虑向前兼容性似乎是可取的，但是这样做通常是不切实际的。标记语言（HTML）或样式（CSS）本质上是声明性的，因此“跳过”无法识别的声明要容易得多，并且对其他可识别的声明影响也极小。

但是如果编程语言引擎选择性地跳过了它不理解的语句（甚至表达式！），则会导致混乱和不确定性，因为无法确保程序后续的部分是不是依赖这些被跳过的代码的。

尽管 JS 不是也不能做到向前兼容，但认识到 JS 的向后兼容性是非常重要的，包括对 web 持久的好处以及由此给 JS 带来的限制和困难。

## 跨越差距

因为 JS 不是向前兼容的，所以在你所能写的 JS 代码和你的网站应用需要支持的最老的浏览器之间总是存在潜在的隔阂。如果你在一个 2016 年的 JS 引擎中运行使用 ES2019 特性的一段程序，你大概率会看到程序崩溃。

如果这个特性是种新的语法，那么程序一般会完全不能编译和运行，通常会抛出一个系统错误。如果这个特性一个新的 API（比如 ES6 的 Object.is(..)），那么程序可能会运行到一定程度，一旦遇到对未知 API 的引用，就会抛出一个运行时异常并停止执行。

这是否意味着 JS 开发者应该只使用他们所兼容的最老的浏览器上支持的代码，然后总是落后于 JS 发展的进度？不！

但这确实意味着 JS 开发者需要特别注意以解决这种差距。

对于新的不兼容的语法，解决方案就是转译（transpiling）。转译是一个由社区发明的术语，用来描述使用工具将程序的源代码从一种形式转换为另一种形式（但仍然是文本源代码）。通常，有关语法方面的向前兼容的问题都是通过一个转译器（最常用的就是 Babel）来解决，把新的 JS 语法转换为等价的旧语法。

例如，某个开发者可能写出如下代码片段：

```js
if (something) {
  let x = 3;
  console.log(x);
} else {
  let x = 4;
  console.log(x);
}
```

在应用的源代码中是上面这样的。但是当生成要部署在公共网站上的代码时，Babel 可能会把代码转成下面这样：

```js
var x$0, x$1;
if (something) {
  x$0 = 3;
  console.log(x$0);
} else {
  x$1 = 4;
  console.log(x$1);
}
```

原始的代码段依赖 let 在 if 和 else 语句中分别创建块级作用域变量 x ，他们之间互不干扰。Babel 只需选择用唯一的名称命名两个不同的变量，即可产生相同的无干扰结果，这样就可以生成与之前等效的程序（只需很少的工作量）。

> NOTE：
>
> let 关键字是在 ES6（2015 年）添加的。 只有当需要兼容不支持 ES6 语法的 JS 运行环境时，上述示例中的转译才有必要。这里的例子只是为了简化说明。在 ES6 刚出的时候，这种转译的需求非常普遍，但是在 2020 年，需要支持 ES6 之前环境的情况就不那么普遍了。因此用于转译的“目标”是一个滑动的窗口，只有当网站/应用决定不在支持某些老的浏览器/引擎时，它才会向上滑动。

你可能会想：为啥还要弄个工具把新语法转成旧的这么麻烦？我们就不能直接写两个变量，不去用 let 关键字吗？这样做的原因是，强烈建议开发者使用最新版的 JS，以使他们的代码整洁并最有效地传达其思想。

开发者应该专注编写整洁、新的语法形式，让工具帮忙生成需要运行在老旧浏览器上的向前兼容的代码。

## 填补差距

如果不是关于新语法的向前兼容问题，而是缺少了一个最新添加的 API 方法，最常见的解决方式就是给这个缺少的 API 方法添加一个定义，其行为就像旧环境已经对其进行了原生定义一样。这种模式叫做 polyfill（也叫 shim）。

考虑这段代码：

```js
// getSomeRecords() returns us a promise for some
// data it will fetch
var pr = getSomeRecords();

// show the UI spinner while we get the data
startSpinner();

pr.then(renderRecords) // render if successful
  .catch(showError) // show an error if not
  .finally(hideSpinner); // always hide the spinner
```

这段代码使用了 ES2019 的特性，promise 原型上的 finally(..)方法。如果这段代码运行在 ES2019 之前的环境， finally(..)不存在，就会导致报错。

finally(..)在 ES2019 之前环境的一个 polyfill 如下：

```js
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function f(fn) {
    return this.then(
      function t(v) {
        return Promise.resolve(fn()).then(function t() {
          return v;
        });
      },
      function c(e) {
        return Promise.resolve(fn()).then(function t() {
          throw e;
        });
      }
    );
  };
}
```

> WARNING:
>
> 这里只是简单表示下 finally(..)基本（不完全服务规范）的 polyfill 。不要在你的代码中用这个 polyfill。可能的话，始终使用可靠的官方 polyfill，比如 ES-Shim 中提供的 polyfills/shims。

上面的 if 表达式保证当 JS 引擎中已经定义了该方法时不会覆盖原本的定义。在一些较老的环境中，polyfill 的方法就能被定义，而在较新的环境中，if 语句就会被跳过。

像 Babel 这种转译器通常会自动检查你的代码需要哪些 polyfill 并提供出来。但有时你也需要显示的引入/定义，就跟上面的代码段类似。
始终使用最合适的特性编写代码，以便有效地传达其思想和意图。一般来说，这意味着使用最新的稳定 JS 版本。避免因手动调整语法/API 的差距而对代码可读性造成负面影响，这是工具该做的事！

Transpilation 和 polyfilling 是两种非常有效的技术，可以解决使用语言中最新稳定特性的代码与站点/应用仍然需要兼容的旧环境之间的差距。既然 JS 不会停止改进，差距就永远不会消失。这两种技术都应该作为未来每个 JS 项目生产链的标准组成部分。

## “解释“的本质

对于 JS 代码长期争论的一个问题是：它是解释型脚本还是编译型程序。主流的观点似乎是认为 JS 是一种解释型（脚本）语言。但事实更为复杂。
在编程语言的大部分历史中，“解释型”语言和“脚本”语言，与编译型语言相比，被视为低劣语言。造成这种激烈争论的原因是多方面的，包括认为它缺少性能优化，以及某些不喜欢的语言特性，例如脚本语言通常使用动态类型而不是“更成熟”的静态类型。

被视为“编译型”的语言通常会生成程序的可移植（二进制）形式，然后发布去执行。由于我们确实没有看到 JS 有这种模式（我们发布的是源代码，而不是二进制形式），所以很多人认为 JS 不符合这一类别。实际上在过去的几十年，程序“可执行”形式的发布模式已经变得更加多样化，也变得不那么相关。对于当前的问题来说，具体是发布什么形式的程序已经不那么重要了。

这些不准确的说法和批判先放在一边。 清楚地了解 JS 是被解释还是被编译的真正原因与如何处理错误的本质有关。

历史上看，脚本型和解释型语言通常按照从上到下逐行的方式执行。 通常在执行开始之前不会通过程序来对其进行处理（见图 1）。
![1-1](/img/you-dont-know-js-yet-get-started-chapter-1-1.png)
图 1：解释型/脚本型语言执行

在脚本型和解释型语言中，程序第 5 行的一个错误只有在前 4 行执行完了之后才能发现。值得注意的是，第 5 行的错误可能是由于运行时条件引起的，例如某些变量或值不适合某种运算，也可能是由于该行的语句/指令格式错误。根据具体上下文，将错误处理推迟到发生错误的行可能是理想的效果，也可能是不理想的效果。

与之相比，来看下在执行前先经过一个处理环节（通常叫解析（parsing））的语言，如图 2：
![1-2](/img/you-dont-know-js-yet-get-started-chapter-1-2.png)

图 2：解析+编译+执行

在这种处理模式中，第 5 行一个无效的指令（例如语法错误）在解析阶段就能被捕获到，不用等到开始执行，这样整段程序都不会执行。为了捕获语法（或静态）错误，通常最好在任何注定要失败的部分执行之前知道这些错误。

那么“解析型”语言和“编译型”语言有哪些共同点？首先，所有编译型语言都会被解析。所以解析型语言距离被完成编译还是有一段路要走。在经典的编译原理中，在解析之后最后剩下的步骤就是代码生成（code generation）：生成可执行形式。

任何源程序一旦被解析完成，常见的后续操作是以某种方式把程序解析后的形式--通常称为抽象语法树（AST）--转换成可执行形式。

换句话说，解析型语言在代码执行前也会进行代码生成的环节。所以说，从本质上讲，它们是编译语言并不过分。

JS 的源代码在执行前会先解析。规范要求如此之多，因为它要求在代码开始执行之前就报告“早期错误”，即代码中能静态分析出的错误，例如参数名重复。

所以 **JS 是解析型语言**，但他是编译型吗？

答案更接近于“是”。解析后的 JS 代码被转换成优化过的二进制形式，然后这些代码再被执行（图 2）。在完成繁重的解析工作后，引擎通常不会再回到逐行的执行代码的模式（图 1）-- 大部分语言/引擎都不会，因为这样太低效了。

具体来说，“编译”生成（各种）二进制字节码，然后将其交给“JS 虚拟机”执行。有人喜欢说虚拟机是在“解释”字节码。但这意味着 Java 和其他十多种 JVM 驱动的语言是被解释的而不是被编译的。当然，这与 Java 等语言是编译语言的典型主张相矛盾。

有趣的是，尽管 Java 和 JavaScript 是非常不同的语言，但它们之间的解释/编译问题却密切相关！

还有个难题是，JS 引擎会对（解析后）生成的代码进行多次 JIT（Just-In-Time）处理/优化，根据角度不同这既可以说是“编译”也可以说是“解释”。JS 引擎背后确实是一个极度复杂的场景。

那么根据这么多琐碎的细节可以得出什么结论？回过头来想想 JS 源程序处理的整个流程：

1. 程序离开开发人员的编辑器后，由 Babel 进行编译，然后由 Webpack 打包（可能一堆构建过程），然后以完全不同的形式交付给 JS 引擎。
2. JS 引擎将代码转成 AST。
3. 然后引擎将 AST 转成某种字节码，一种二进制的中间形态（intermediate representation (IR)），然后通过优化 JIT 编译器进一步完善/转化。
4. 最后，JS 虚拟机运行程序。

再看一遍这些步骤：
![1-3](/img/you-dont-know-js-yet-get-started-chapter-1-3.png)
图 3：解析、编译、执行 JS

那 JS 的处理方式是更像解释型的逐行执行的脚本（图 1），还是更像在执行前经过一到多个步骤处理的编译型语言（图 2 和图 3）？
我觉得从精神而不是实践上来说已经很清楚了，**JS 是一种编译型语言**。（I think it's clear that in spirit, if not in practice,JS is a compiled language.）

同样，这其中重要的原因是，由于 JS 已编译，因此在执行代码之前会通知我们静态错误（例如语法错误）。与传统的“脚本”程序相比，这是一种完全不同的交互模型，并且可以说更有用！

## Web Assembly (WASM)

推动 JS 发展的一个主要因素是性能，既包括代码解析/编译的速度，也包括编译后的代码执行的速度。

2013 年，Mozilla Firefox 的工程师演示了虚幻 3 游戏引擎从 C 到 JS 的移植。这个代码能够以 60 fps 的速度在浏览器 JS 引擎中运行的能力是基于 JS 引擎可以执行的一系列优化，因为虚幻引擎代码的 JS 版本使用了一种支持 JS 语言子集的风格，叫做“ASM.js”。

该子集是有效的 JS，其编写方式在普通编码中并不常见，但会向引擎发出某些重要的类型信息，从而使其能够进行关键优化。引入 ASM.js 是解决 JS 运行时性能压力的一种方法。

但是需要注意的是，ASM.js 绝不是由开发人员直接编写的代码，而是从其他语言（例如 C）转译过来的程序的形态，其中这些类型的“注释”可以通过工具自动完成。

ASM.js 证明了工具创建的程序版本可以被 JS 引擎更高效的处理，数年之后，另一组工程师（最初也是来自 Mozilla 的）发布了 Web Assembly（WASM）。

WASM 与 ASM.js 很像，最初目的都是提供一种方式把非 JS 程序（C 语言等）转换成一种能运行在 JS 引擎中的形式。与 ASM.js 不同，WASM 选择以完全不同于 JS 的形式表示程序，从而在程序执行之前额外解决了 JS 解析/编译中的某些固有延迟。

WASM 是一种更类似于汇编（Assembly）的表示形式，能直接被 JS 引擎处理而跳过通常做的解析/编译的环节。针对 WASM 的程序的解析/编译会提前处理（ahead of time，AOT）；发布的是一个二进制包，JS 引擎几乎不经过什么处理就可以执行。

WASM 最初的目的很明确是为了潜在的性能提升。除此之外，WASM 又多了一个目标是期望将更多的非 JS 语言引入到 web 平台中。例如，如果一种语言（比如 Go）支持多线程，但 JS 不支持，WASM 就提供把像 Go 这样的语言转换成 JS 引擎能理解的形式的潜力，而不需要给 JS 语言本身添加多线程的特性。

换句话说，WASM 减轻了给 JS 添加那些主要用在其他语言的编译程序中的特性的压力。这意味着 JS 特性开发的决定（通过 TC39），不会受到其他语言生态的兴趣/需求的影响，同时也让这些语言在 web 上有一条可行的道路。

有趣的是，对 WASM 的另一种观点甚至与 web（W）没有直接的关系。WASM 正在发展成为一种跨平台的虚拟机（VM），在这里程序可以编译一次并在各种不同的系统环境中运行。

因此，WASM 不止适用于 web，而且 WASM 也不是 JS。讽刺的是，即使 WASM 在 JS 引擎中运行，但 JS 语言还是最不适合作为 WASM 程序来源的语言之一，因为 WASM 严重依赖于静态类型信息。即使是 TypeScript（TS）—— 表面上看就是 JS+静态类型——也不太适合转换到 WASM，尽管像 AssemblyScript 这样的语言变体正试图弥补 JS/TS 和 WASM 之间的差距。

这本书不是讲 WASM 的，所以我不会花太多时间来讨论，就最后提一点。一些人提议 WASM 未来将 JS 从 web 中移除或弱化。这些人通常对 JS 怀有一些恶意，他们希望一些其他的语言——不管什么语言！——来取代 JS。因为 WASM 可以让其他的语言运行在 JS 引擎中，表面上看这也不是一个完全幻想的童话。

但我就简单说一句：WASM 不会取代 JS。WASM 极大地增强了 web（包括 JS）的功能。这很棒，至于是不是有人借助这种方法来避免写 JS，并没有影响。

## 严格来讲

早在 2009 年，随着 ES5 的发布，JS 添加了严格模式（strict mode）作为一种可选（opt-in）机制，以鼓励更优的 JS 程序。

严格模式带来的好处远大于成本，但是旧习难改，现存（也叫“遗留”（legacy））代码库的使用惯性确实很难改变。不幸的是，十多年后，严格模式的可选性意味着它仍然不一定是 JS 程序员的默认设置。

为什么采用严格模式？ 严格模式不应被视为对你做事的限制，而应作为最佳实践的指南，以便 JS 引擎最有可能优化和高效运行代码。大多数 JS 代码都是由开发团队完成的，所以严格模式的严格性（以及 linters 之类的工具！）通常会避免在非严格模式下出现的一些问题，进而有助于团队协作。

大多数严格模式的控制项是以早期错误（early errors）的形式，就是说这些错误并不是严格的语法错误，但仍然会在编译时（在代码执行之前）抛出。比如，严格模式不允许两个同名的函数参数名，会抛出一个早期错误。也有些严格模式的控制项只能在运行时看到，比如将 this 默认指向 undefined 而不是全局对象。

不要总是反抗或抱怨严格模式，就像小孩子总是喜欢违背父母不让他们做的事一样，最好的观念是严格模式就像一个 linter 一样提醒着你 JS 应该怎样写才能有最高的质量和最好的性能。如果你感到无助，试着使用严格模式，那会给你一个明显的红色警告标志告诉你需要备份并重新思考一下整个方法。

严格模式可以在每个文件中用一种特别的注释来开关（在它前面只允许添加注释和空格）：

```js
// only whitespace and comments are allowed
// before the use-strict pragma
'use strict';
// the rest of the file runs in strict mode

```

> WARNING：
>
> 需要注意的是，即使在严格模式的注释前加个分号;都会导致严格模式失效。它不会报错，因为一个字符串字面量的表达式也是有效的 JS ，但它会导致严格模式关闭！

严格模式也可以在一个函数的作用域中单独控制，其相邻的规则完全相同：

```js
function someOperations() {
  // whitespace and comments are fine here
  'use strict';

  // all this code will run in strict mode

}
```

有趣的是，如果一个文件把严格模式打开，则不再允许函数级别的严格模式注释。所以你只能二选一。

给单个函数添加严格模式唯一可能的原因是正在迁移一个非严格模式的文件，这时需要一点一点得去改成严格模式。除此之外，最好直接给整个文件都开启严格模式。

很多人好奇会不会什么时候 JS 默认开启严格模式？答案几乎肯定是不会。就像我们之前讨论的向后兼容性，如果某次 JS 引擎的更新把那些没有标记为严格模式的代码也视为严格模式，那这些代码很可能会因为严格模式的控制而崩溃。

但是，有一些因素可以减少这种非默认的严格模式的“模糊性”对未来的影响。

首先，即使源代码没有以严格模式来写，但实际上转译后的代码都是在严格模式中的。大多生产环境的 JS 代码都是转译过的，所以这意味着大多数 JS 代码都已经遵循着严格模式。这个假设有可能被推翻，但要做到也很不容易，所以可能性很小。

而且，越来越多的 JS 代码开始用 ES6 模块编写。ES6 模块采用严格模式，因此这些文件中的所有代码都自动默认为严格模式。

综上所述，严格模式在很大程度上是事实上的默认模式，尽管从技术上讲它并不是默认模式。

## 定义

JS 是 ESMAScript 标准（本文撰写时为 ES2019 版本）的一种实现，该标准由 TC39 委员会指导并由 ECMA 托管。它运行在浏览器和其他的 JS 环境中，比如 Node.js。

JS 是一种多范式语言，意味着语法和功能使开发人员可以混合和匹配（以及弯曲和重塑！）（译注：就是说有很大的创造空间）各种主要范式的概念，例如过程式，面向对象（OO/classes）和函数式（FP））。

JS 是编译型语言，意味着工具（包括 JS 引擎）会在程序执行之前先进行处理和验证（抛出各种错误）。

定义了我们的语言之后，让我们开始了解它的来龙去脉。
