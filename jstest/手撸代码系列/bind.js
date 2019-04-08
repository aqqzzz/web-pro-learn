Function.prototype.myBind = function(context) {
  if (typeof this !== 'function') {
    throw new Error('func 必须是一个函数')
  }
  var self = this
  // 获取bind时传入的参数
  var args = Array.prototype.slice.call(arguments, 1)

  const bindCall = function() {
    // 调用apply内部实现，并传递需要的参数
    const callArgs = Array.prototype.slice.call(arguments)
    // 改进：若bind之后，调用bindCall方法的是一个new的构造函数，此时绑定的this应该不生效，但是传入的参数仍然有效
    // 不是很理解，要看一下原型链
    return self.apply(this instanceof bindCall ? this : context, args.concat(callArgs))
  }
  var fOP = function() {}
  /**
   * funcB = funcA.bind(thisobj, args...)
   * funcB.prototype.c = 'xxx'
   * obj = funcB(args...)
   * console.log(obj.c) // 是有值的
   */
  // 改进：将返回函数的prototype指向绑定函数的prototype，实例就可以继承 绑定函数的原型中的值
  // bindCall.prototype = this.prototype
  // 不足之处：修改bindCall的prototype的时候把 绑定函数的prototype也改掉了，可能会覆盖它之前的继承链
  // 改进：用一个空函数当中转，这样就不会在修改bindCall的prototype的时候盖掉绑定函数的prototypes
  fOP.prototype = this.prototype
  bindCall.prototype = new fOP()
  return bindCall
}