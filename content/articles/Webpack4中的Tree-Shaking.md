---
title: 'Webpack4中的Tree Shaking'
date: 2020-08-23T07:31:00+08:00
author: 'waningflow'
draft: false
keywords: 'webpack,tree shaking'
slug: 'tree-shaking-in-webpack4'
tags: ['web', 'webpack']
cover: 'img/tree-shaking-in-webpack4-cover.jpg'
# description: '讨论Webpack4中的Tree Shaking的原理和实践'
---

# 名词解释

## DCE (dead-code elimination)

去除不影响执行结果的代码，包括不会执行到的代码和未使用的变量等，如：

```js
var a = 1;
function b() {
  return 'b';
  return 'b2';
}
var c = b();
```

处理之后结果如下：

```js
function b() {
  return 'b';
}
b();
```

webpack 中实现 DCE 依靠的是代码压缩工具 uglify-es/[terser](https://github.com/terser/terser)（uglify-es 已经不再维护，terser 是其 fork 版本，webpack 从 [4.26.0](https://github.com/webpack/webpack/releases/tag/v4.26.0) 版本从 uglify-es 迁移到 terser）。

## Tree-Shaking

JS 环境中用于实现 DCE 的一种方式，主要用于跨文件（模块）间的 DCE。依赖于 ES2015 的模块语法（import 和 export）。

# 三种场景

为了方便理解 Webpack4 中的 Tree-Shaking 具体是如何实现的，这里总结了三种典型的场景，每种场景都有其相应的配置去处理。

## Unused export

```js
// ./index.js（入口文件）
import { cube, square } from './math';

console.log(cube(2));

// ./math.js
export function square(x) {
  return x * x;
}

export function cube(x) {
  return x * x * x;
}
```

以上代码中`./math.js` 模块导出的函数 `square` 并没有被使用，因此打包的时候会将其删除。

这里用到的配置是 [optimization.usedExports](https://webpack.js.org/configuration/optimization/#optimizationusedexports)，它可以标记出模块中导出的代码有没有被使用（该配置在 `mode=production` 时默认为 `true`） 。具体来说，webpack 在处理一个模块时，会分析当前模块导出了哪些内容（通过 [optimization.providedExports](https://webpack.js.org/configuration/optimization/#optimizationusedexports)，该配置在 `mode=production` 时默认为 `true`），以及导入的内容中哪些是被当前模块使用的，进而可以知道导入的模块中哪些导出的内容是被使用的。以上面的代码为例，在分析`./index.js` 时发现导入了 `square` 但是没有使用，那么在分析 `./math.js` 时就会将 `square` 标记为 `unused harmony export` 。标记了之后再通过 terser 在打包时将其真正删除。

另外一点要提的是这种分析只处理顶层对象，对于对象内部的属性没办法处理，如：

```js
// ./index.js（入口文件）
import obj from './utils';

console.log(obj.a());

// ./utils.js
const obj = {
  a: function () {
    return 'a';
  },
  b: function () {
    return 'b';
  },
};
export default obj;
```

尽管 obj.b 完全没有用到，但是依然会被打包。这是因为属性是可能通过计算得来的，无法通过静态分析代码准确判断出对象的某个属性是否有被使用到，比如它可能是这么用的：

```js
obj[Math.random() > 0.5 ? 'a' : 'b'];
```

## Unused export (deep)

```js
// ./index.js（入口文件）
import { cube } from './math';

console.log(cube(2));

// ./math.js
import { pow } from './utils';

export function square(x) {
  return pow(x);
}

export function cube(x) {
  return x * x * x;
}

// ./utils.js
export function pow(x) {
  return x * x;
}

export function plus(x, y) {
  return x + y;
}
```

对应的依赖关系图：

![Unused-export-(deep)-依赖关系图](/img/tree-shaking-in-webpack4-1.png)

如果根据上一场景中的方法分析，这里`cube`在`./index`中被用到，会被打包。而`pow`在`./math.js`中被用到，也会被打包。但实际上从入口`./index.js`来看的话，`pow` 并不需要，因为依赖`pow`的`square`并没有被用到。但是 webpack 并不知道这一点，因为它没有做相应的作用域分析，去判断模块中导出内容与导入内容间的连接关系。（有个插件 [webpack-deep-scope-analysis-plugin](https://github.com/vincentdchan/webpack-deep-scope-analysis-plugin) 做了这件事，但只是实现了一个大体的思路，并不适合用在生产环境，可能会破坏原有的代码）。

这里用到的配置是[optimization.concatenateModules](https://webpack.js.org/configuration/optimization/#optimizationconcatenatemodules)，根据模块间的依赖关系将各模块中的代码安全的合并到同一个模块中（该配置在`mode=production`时默认为`true`）。然后 terser 就能将未使用的代码删除掉。这种模块合并的行为叫做“作用域提升（scope hoisting）”，这也是依赖于 ES Module 语法的一个特性。

这里有两点要提一下：

一、concatenateModules 并不能处理所有的这种场景，因为有些时候模块是不能被合并的，详细的规则和算法参考 [module-concatenation-plugin](https://webpack.js.org/plugins/module-concatenation-plugin/)。

二、concatenateModules 也不是说专门为了这种场景而配置的，它的用途是将代码放在一个作用域中，提升 js 的执行速度。

## Side Effects

对于某些代码，可能没有被导出和使用，但是却不能删除。因为仅仅是引入这个文件（比如 `import './index.less'` ），或者执行了某个表达式（比如 `Array.prototype.slice = null`），都会对结果造成影响，所以不能被轻易删除。webpack 认为这些代码是有“副作用（Side Effects）”的。

### 对于表达式级别的副作用处理：

```js
// ./index.js（入口文件）
import { cube } from './math';

console.log(cube(2));

// ./math.js
function square(x) {
  Math.stdSquare = 1;
  return x * x;
}

export function cube(x) {
  return x * x * x;
}

export var stdSquare = square(1);
```

上面的代码中导出的`stdSquare` 并没有被外部使用，但是其值是一个函数立即计算的结果，`square`函数内部有一行代码`Math.stdSquare =1`，webpack 无法判断其是否有副作用，所以打包时会将其保留。为了告诉 webpack 可以删除这行代码，可以在函数调用的表达式前加上注释`/*#__PURE__*/`，表示这个函数的调用并不会产生副作用，可以安全地删除：

```js
export var stdSquare = /*#__PURE__*/ square(1);
```

### 对于模块级别的副作用处理：

```js
// ./index.js（入口文件）
import { cube } from './math';

console.log(cube(2));

// ./math.js
import { pow } from './utils';

export function square(x) {
  return pow(x);
}

export function cube(x) {
  return x * x * x;
}

// ./utils.js
import './polyfill';

export function pow(x) {
  return x.pow();
}

// ./polyfill.js
Array.prototype.pow = function (x) {
  return x * x;
};
```

上面的代码中`./utils.js` 中导出的 pow 函数从入口来看实际没有被使用，而引入的`./polyfill.js`（假设这里的 polyfill 只是给`./utils.js`中的函数提供帮助的）其实也是可以不需要打包的，但是 webpack 无法判断`./utils.js`模块内部是否有副作用，于是还是会进一步分析其引入的`./polyfill.js`，最后会把其中无法判断副作用的代码打包进来。

处理这种情况用到的配置是 package.json 中的`sideEffects`字段。 在打包阶段，webpack 无法准确判断某个文件是否有副作用，所以默认认为所有文件都是有副作用的。也就是说这里`sideEffects`默认是`true`。 `sideEffects`可选值如下：

`true`（默认），都有副作用
`false`，都没有副作用
文件列表，列表中的文件有副作用，其他没有。文件路径可以用绝对路径/相对路径/glob 模式（内部用的是 minimatch）
对于上面的代码可以添加如下配置即可：

```js
// package.json
{
 ...
 sideEffects: false,
}

// 或者
{
 ...
 sideEffects: ["./polyfill.js"],
}
```

这样 webpack 会认为`./utils.js` 是没有副作用的，那么当其导出的内容没有使用时，便不会进一步分析`./polyfill.js`。

对于一个模块，webpack 有三种处理方式：

> include it: include the module, evaluate it and continue analysing dependencies
> skip over: don't include it, don't evaluate it but continue analysing dependencies
> exclude it: don't include it, don't evaluate it and don't analyse dependencies

这里总结了一下具体的判断标准如下：

![webpack处理模块方式](/img/tree-shaking-in-webpack4-2.png)

# 实践总结

结合上面的内容，为了在实际项目中达到有效的 tree shaking 效果，需注意以下几点：

- 使用 ES2015 模块，并且注意不要被 babel 转换成 CommonJs
- 生产环境中 webpack 配置中 mode 设置为 production
- package.json 设置合适的`sideEffects`
- 多个对象不要集中在一个变量中导出

# 参考文档

[https://webpack.js.org/guides/tree-shaking/](https://webpack.js.org/guides/tree-shaking/)

[https://webpack.js.org/plugins/module-concatenation-plugin/](https://webpack.js.org/plugins/module-concatenation-plugin/)
