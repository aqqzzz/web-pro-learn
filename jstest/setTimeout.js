// console.log('start')

// setTimeout(function() {
//   console.log(400)
//   new Promise((resolve) => {
//     console.log('settimeout')
//     resolve()
//   }).then(() => {
//     console.log('set time out resolve')
//   })
// }, 400)

// setTimeout(function() {
//   console.log(200)
// }, 200)

// let a = new Promise((resolve, reject) => {
//   console.log('promise')
//   resolve()
// }).then(() => {
//   console.log('then')
// }).then(() => {
//   console.log('then')
// }).then(() => {
//   console.log('then')
// }).then(() => {
//   console.log('then')
// }).then(() => {
//   console.log('then')
// })


// new Promise((resolve, reject) => {
//   console.log('promise2')
//   resolve()
// }).then(() => {
//   console.log('2then')
// }).then(() => {
//   console.log('2then')
// })

// const cur = new Date().getTime()
// while(true) {
//   const time = new Date().getTime()
//   if (time - cur > 1000) {
//     break
//   }
// }

// setTimeout(function() {
//   console.log(100)
// }, 0)

// console.log('end')

var promise1 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 600, 'one');
});

var promise2 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 100, 'two');
});


setTimeout(()=> {
Promise.race([promise1, promise2]).then(function(value) {
  console.log(value);
  });
}, 500)
