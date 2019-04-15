// 在指定空间中创建对象
// namespace({a: {test: 1, b: 2}}, 'a.b.c.d')
function myNamespace(oNamespace, sPackage) {
  var arr = sPackage.split('.');
  var res = oNamespace;   // 保留对原始对象的引用

  for(var i = 0, len = arr.length; i < len; i++) {
      if(arr[i] in oNamespace) {  // 空间名在对象中
          if(typeof oNamespace[arr[i]] !== "object") {    // 为原始值
              oNamespace[arr[i]] = {};    // 将此属性设为空对象           
          }  
      } else {    // 空间名不在对象中，建立此空间名属性，赋值为空
          oNamespace[arr[i]] = {};
      }
       
      oNamespace = oNamespace[arr[i]];    // 将指针指向下一个空间名属性。
  }

  return res;

}
let namespace = {a: {test: 1, b: 2}}
myNamespace(namespace, 'a.b.c.d')

console.log(namespace)