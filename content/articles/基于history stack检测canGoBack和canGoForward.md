---
title: '基于history stack检测canGoBack和canGoForward'
date: 2020-05-09T22:15:44+08:00
draft: false
keywords: 'electron,history stack'
slug: 'detect-cango-using-history-stack'
tags: ['web', 'electron', 'history']
---

最近写的一个应用涉及到路由的跳转，需要加一个像浏览器地址栏一样的“后退”和“前进”的按钮。单纯的控制“后退”和“前进”很简单，[history](https://link.zhihu.com/?target=https%3A//github.com/ReactTraining/history) 库提供了三个接口：

- `history.go(n)`
- `history.goBack()`
- `history.goForward()`

但是为了在不能“后退”或“前进”时 disable 掉相应的按钮，就需要判断 canGo。history 库确实提供了一个方法，但是只能在 createMemoryHistory 时使用：

- `history.canGo(n)`(only in `createMemoryHistory`)

常用的 `createBrowserHistory` 和 `createHashHistory` 并没有提供这个方法，所以只能自己实现。
首先需了解 history stack 的形成过程，参考[这篇文章](https://zhuanlan.zhihu.com/p/28249437)。简单总结如下：

1. history stack 记录一个标签页访问的历史记录序列，指针指向当前激活的历史记录
2. 增加历史记录
   1. 如果指针在栈顶，则新记录直接被推入栈顶 `A [B] -> A B [C]`
   2. 如果指针不在栈顶，则先移除指针后面的所有历史记录，再将新纪录推入栈顶 `A [B] C -> A B [E]`
3. 前进后退，移动指针即可
   1. 后退 `A B [C] -> A [B] C`
   2. 前进 `A [B] C -> A B [C]`

根据这些就可以实现一个 [HistoryStack](https://link.zhihu.com/?target=https%3A//github.com/waningflow/NarutoMusic/blob/master/app/utils/historyStack.ts) 类来模拟真实的 history stack：

```js
class HistoryStack {
  current: any;

  index: number;

  stack: any[];

  constructor() {
    this.current = null;
    this.index = -1;
    this.stack = [];
  }

  pop(loc: any) {
    if (!this.current || this.stack.length === 0) {
      this.current = loc;
      this.index = 0;
      this.stack = [loc];
    } else {
      const index = this.stack.findIndex((v) => v.hash === loc.hash);
      if (index > -1) {
        this.current = this.stack[index];
        this.index = index;
      } else {
        throw new Error('history stack not match!');
      }
    }
  }

  push(loc: any) {
    this.stack.splice(this.index + 1);
    this.stack.push(loc);
    this.current = loc;
    this.index = this.stack.length - 1;
  }

  canGo(num: number) {
    return Boolean(this.stack[this.index + num]);
  }
}
```

通过监听 history 的变化来同步更新 historyStack：

```js
history.listen((loc, action) => {
  if (action === 'POP') {
    historyStack.pop(loc);
  } else if (action === 'PUSH') {
    historyStack.push(loc);
  }
});
```

最后只需要调用 `historyStack.canGo()` 方法即可。比如 `canGoBack()` 等价于 `canGo(-1)`，`canGoForward()`等价于 `canGo(1)`。

注：

因为需要对每个 history 记录有唯一标识，而 hashHistory 不支持 location.key，所以利用了用不上的的 hash 来作为唯一标识
根据实际需要，暂没处理 replace 的相关逻辑
