// 建楼房，上层比下层小1，每天一个数，只有上层恰好比下层小1的时候那天才会把这个数放上去，并输出当天可建造楼层从大到小的排序，否则输出空行
// function build(arr) {
//   let remains = []
//   let length = arr.length
//   let i = 0
//   let res = []
//   while(i < arr.length) {
//     remains.push(arr[i])
//     remains.sort()
//     let j = remains.length - 1
//     while(remains[j] === length && j >= 0) {
//       res.push(remains[j])
//       remains.pop()
//       length--
//       j--
//     }
//     if (res.length === 0) {
//       console.log('\n')
//     } else {
//       console.log(res.join(' '))
//     }
//     res=[]
//     i++
//   }
 
  
// }

const cases = 1
Array(cases).fill(0).forEach(_ => {
    const count = 6
    const arr = '3 6 4 5 1 2'
        .split(' ')
        .map((v, i) => ({ value: Number(v), day: i }))
        .sort((a,b) => b.value - a.value)
    let pos = 0
    for(let i=0;i<count;i++) {
        let todays = []
        for(let j = pos; j<count;j++) {
            if (arr[j].day <= i) {
                todays.push(arr[j].value)
                pos++
            } else {
                break
            }
        }
        console.log(todays.join(' '))
    }
    
})

// build([3, 6, 4, 5, 1, 2])
// build([3, 1, 2])