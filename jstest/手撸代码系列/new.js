function objectFactory() {
  let object = new Object()
  Constructor = [].shift.call(arguments) // 将构造函数设置为要创建的对象
  object.__proto__ = Constructor.prototype // 将obj的原型指向构造函数，这样object就可以访问构造函数原型中的属性
  const res = Constructor.apply(object, arguments) // apply改变构造函数的this指向到新的对象，这样object就可以访问 构造函数中的属性
  return typeof res === 'object' ? res : object // 若构造函数有返回值，且返回值类型为object，则覆盖new操作符中创建的object并返回自己的返回值
}
