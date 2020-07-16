const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 
 * @param {integer} min 最小数整数
 * @param {integer} max 最大数
 * @param {integer} n 小数点后位数
 */
function random (min, max, n){
  // n位小数
  //let rand0_n = Math.random().toFixed(n);
  let randInt = (Math.random() * max).toFixed(n) % (max - min) + 1 + min;
  console.log(randInt)
  return randInt;
  
  
}
module.exports = {
  formatTime: formatTime,
  random : random
}
