//保留4位小数，整数不补全0;
const toDecimal4NoZero = (x) => {
  let f = Math.round(x * 10000) / 10000;
  let s = f.toString();
  return s;
};

//计算过去多少时间;
const formatPassTime = function (startTime,currentTime) {
  let time = Number(currentTime) - Number(startTime);
  let day = parseInt(time / (1000 * 60 * 60 * 24));
  let hour = parseInt(time / (1000 * 60 * 60));
  let min = parseInt(time / (1000 * 60));
  let sec = parseInt(time/1000);
  let month = parseInt(day / 30);
  let year = parseInt(month / 12);
  if(year) {
    return year>1 ? (year + " years ago"):(year + " year ago")
  }
  if(month) {
    return month>1 ? (month + " months ago"):(month + " month ago")
  }
  if(day) {
    return day>1 ? (day + " days ago"):(day + " day ago")
  }
  if(hour) {
    return hour>1 ? (hour + " hours ago"):(hour + " hour ago")
  }
  if(min) {
    return min>1 ? (min + " mins ago"):(min + " min ago")
  }
  if(sec) {
    return sec>1 ? (sec + " secs ago"):(sec + " sec ago")
  }
};

//交易状态
const statusType = (code) => {
  let status = '';
  switch (code) {
    case 0:
      status = 'Fail';
      break;
    case 1 :
      status = 'Success';
      break;
    default:
      status = 'Fail';
  }
  return status;
};

//数字转化千分位
const transAmount = (num) => {
  num+='';
  let arr = num.split('.');
  if (arr.length > 1) {
    return arr[0].replace(/\d{1,3}(?=(\d{3})+$)/g,'$&,') + '.' + arr[1];
  } else {
    return arr[0].replace(/\d{1,3}(?=(\d{3})+$)/g,'$&,');
  }
};
