//保留4位小数，整数不补全0;
const toDecimal4NoZero = (x) => {
  x = +x;
  let s = '';
  if (x == 0) {
    s = 0;
  } else {
    let num = Math.round(x * 10000);
    let f = num/10000;
    s = f.toString();
  }
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

//转化大数字数值计数方式
const nFormatter = (num, digits) => {
  const si = [
    { value: 1, symbol: "" },
    { value: 1E3, symbol: "K" },
    { value: 1E6, symbol: "M" },
    { value: 1E9, symbol: "G" },
    { value: 1E12, symbol: "T" },
    { value: 1E15, symbol: "P" },
    { value: 1E18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
};

//折线图Y轴'取整'
const getMax = (arr,method) => {
  let maxY = 0;
  let minY = 0;
  let arrNem = [...arr];
  arrNem.sort((a,b) => {return a-b});
  let max = arrNem[arrNem.length-1];
  let min = arrNem[0];
  let str = max.toString();
  if (method === 'trans') { //交易量曲线
    if (max >= 1 && max < 10) {
      maxY = 10;
    } else if (max >=10) {
      let num = str.substr(0,2);
      let numMax = (5 - num % 5) + (+num);
      str = str.substr(2).replace(/./g,'0');
      maxY = numMax.toString() + str;
      maxY = +maxY;
    }
  } else if (method === 'price') {
    max = (max * 1000).toFixed(1).toString();
    min = (min * 1000).toFixed(1).toString();
    let maxArr = max.split('.');
    let minArr = min.split('.');
    let numMax = +maxArr[0] + 1;
    let numMin = +minArr[0] - 1;
    maxY = numMax.toString() + '.' + maxArr[1].replace(/./g,'0');
    minY = numMin.toString() + '.' + minArr[1].replace(/./g,'0');
    maxY = (maxY / 1000).toFixed(4);
    minY = (minY / 1000).toFixed(4);
  }
  return {maxy: maxY,miny: minY}
};

const overHide = (str) => {
  str =
  this.blockInfo.name = res.data.nodeName ? res.data.nodeName : res.data.miner;
}
