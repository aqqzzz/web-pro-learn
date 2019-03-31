# React框架相关问题

## React性能优化

http://taobaofed.org/blog/2016/08/12/optimized-react-components/

### 一、shouldComponenUpdate

在组件重新渲染之前调用，返回值确定了组件是否需要重新渲染。

true代表：只要组件的props或者state发生了变化，就会重新构建Virtual DOM，使用diff算法进行比较，再根据比较结果决定是否重新渲染整个组件

在一些不必要重新渲染的时候，将函数的返回结果设置为false

比较方法：

1. **PureRenderMixin**插件：在不必要的情况下让函数shouldComponentUpdate返回false（**浅比较**）

2. **React.PureComponent**基础类
3. 重写shouldComponentUpdate，进行深比较
4. ImmutableJS， ref1 === ref2即可进行比较

### 二、动静分离

隔离变化的属性和不变的属性

### 三、Children对象

对children进行独立

```javascript
class TwoColumnSplit extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div>
                <FloatLeft>{this.props.children[0]}</FloatLeft>
                <FloatRight>{this.props.children[1]}</FloatRight>
            </div>
        );
    }
}

<TwoColumnSplit>
    <TargetContainer/>
    <BudgetContainer/>
</TwoColumnSplit>
```

通过在 `shouldComponentUpdate` 中返回 `false`，组件将不会因为外界的状态变化而发生改变，我们这样做是因为组件 `TargetContainer` 和 `BudgetContainer` 没有从它们的父元素获取任何信息，这样就不需要管外界的变化，把 children 和父组件进行了隔离，其实 `TwoColumnSplit` 就是起了隔离的作用。对于不需要从外界获取数据的组件，可以通过返回 `false` 来隔离外界的变化，减少重新渲染。

### 四、隔离容器和组件

容器是数据层，负责数据交互

组件是渲染层，只负责根据得到的数据渲染响应的组件



