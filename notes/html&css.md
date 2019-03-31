# HTML

### 基础

#### DOCTYPE

document type（文件类型），说明用的XHTML或者HTML是什么版本

DTD：文档类型定义，包含了文档的规则，浏览器根据定义的DTD来解释页面的标识，并展现出来

#### 不怎么见的标签

```
<dl>
<dt>
<dd>
```

dt和dd必须在dl内包裹，dd和dt都是块级元素

# CSS

### CSS关键字：initial、inherit、unset

MDN说，所有的CSS属性都有这三个值

#### initial

用于设置CSS属性为它的默认值，可做用于任何CSS样式（IE不支持）

#### inherit

将CSS属性设置为它继承的值，只有可继承的属性才能设置

#### unset

不设置，其实是initial 和 inherit 的组合

- 如果该属性是默认继承属性，改值等同于 inherit
- 如果该属性是 非继承属性，该值等同于 initial

### BFC 盒模型

BFC：块级格式化上下文。它是一个独立的渲染区域，只有Block-level box 参与，规定了内部的Block-level Box 如何布局，并且与这个区域外部毫不相干

#### BFC布局规则

- 内部的Box会在垂直方向，一个接一个放置
- Box垂直方向的距离由 margin 决定。属于同一个BFC的两个相邻Box 的margin 会发生重叠
- BFC的区域不会与float box 重叠
- BFC就是页面上的一个隔离的独立容器，容器里的子元素不会影响到外面的元素。外面的元素也不会影响到容器里的子元素
- 计算BFC的高度时，浮动元素也参与计算

#### 哪些元素会生成BFC

- 根元素
- float属性 不为 none
- position 为 absolute 或 fixed
- display 为 
  - inline-block
  - table-cell
  - table-caption
  - flex
  - inline-flex
- overflow 不为 visible

#### BFC的作用及原理

1. 自适应两栏布局

   ```html
   <style>
       body {
           width: 300px;
           position: relative;
       }
   
       .aside {
           width: 100px;
           height: 150px;
           float: left;
           background: #f66;
       }
   
       .main {
           height: 200px;
           background: #fcc;
       }
   </style>
   <body>
       <div class="aside"></div>
       <div class="main"></div>
   </body>
   ```

   BFC规则第三条：

   > 每个元素 marginBox的左边，与包含块 borderBox 的左边相接触（对于从左往右的布局模式）

   aside为浮动元素（是一个子BFC），body为父BFC，body子元素main和aside的左边会与包含块的左边相接触

   根据BFC规则第四条：

   > BFC的区域不会与float  box  重叠

   可以通过触发main生成BFC，让它与浮动元素aside分开

   ```css
   .main {
   	overflow: hidden;
   }
   ```

   触发main生成BFC后，这个新的BFC不会与浮动的aside重叠，因此会根据包含块的宽度，和aside的宽度，自动变窄

2. 清除内部浮动

   ```html
   <style>
       .par {
           border: 5px solid #fcc;
           width: 300px;
       }
   
       .child {
           border: 5px solid #f66;
           width:100px;
           height: 100px;
           float: left;
       }
   </style>
   <body>
       <div class="par">
           <div class="child"></div>
           <div class="child"></div>
       </div>
   </body>
   ```

   问题： 两个child浮动，脱离文档流，par高度为0

   根据BFC布局规则：

   > BFC计算高度时，浮动元素也参与计算

   为清除内部浮动，可以触发par生成BFC，那么par在计算高度的时候，par内部的浮动元素child也会参与计算

   ```css
   .par {
   	overflow: hidden
   }
   ```

3. 防止margin重叠

   ```html
   <style>
       p {
           color: #f55;
           background: #fcc;
           width: 200px;
           line-height: 100px;
           text-align:center;
           margin: 100px;
       }
   </style>
   <body>
       <p>Haha</p>
       <p>Hehe</p>
   </body>
   ```

   两个p元素垂直方向上的距离为100px，而不是200px

   根据BFC规则

   > BFC内部垂直方向的距离由margin决定。
   >
   > 属于同一个BFC的两个相邻Box的margin会发生重叠

   解决方案：在p外面包裹一层容器，并触发该容器生成一个BFC，那么两个p就不属于同一个BFC，就不会发生margin重叠了

   ```html
   <style>
       .wrap {
           overflow: hidden;
       }
       p {
           color: #f55;
           background: #fcc;
           width: 200px;
           line-height: 100px;
           text-align:center;
           margin: 100px;
       }
   </style>
   <body>
       <p>Haha</p>
       <div class="wrap">
           <p>Hehe</p>
     </div>
   </body>
   ```

其实以上的例子都体现了BFC布局规则的第五条

> BFC就是页面上一个**隔离的独立容器**，容器里的子元素不会影响到外面的元素，反之也如此

因为BFC内部的元素和外部的元素绝对不会互相影响，所以

- 当BFC外部存在浮动时，它不应该影响BFC内部Box的布局，BFC会通过变窄，而不与浮动元素有重叠
- 当BFC内部有浮动时，为了不影响外部元素的布局，BFC计算高度时会包括浮动的高度