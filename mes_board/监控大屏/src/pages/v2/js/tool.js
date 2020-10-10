function add0(m) { return m < 10 ? '0' + m : m }
function addComma(n) {//数字过千加逗号
    var b = parseInt(n).toString();
    var len = b.length;
    if (len <= 3) { return b; }
    var r = len % 3;
    return r > 0 ? b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : b.slice(r, len).match(/\d{3}/g).join(",");
}
function getDateOfMonthAgo(){//当前往前一个月每天时间
    let numArr = Array.from(Array(30), (v,k) =>k);
         let  nowdate = new Date();
         let datasArr = []
         for(let i=0;i<numArr.length;i++){
            let daysAgo = new Date(nowdate-numArr[i]*24*3600*1000);
            let date = add0(daysAgo.getMonth()+1)+'-'+add0(daysAgo.getDate())
            datasArr.push(date)
         }
         return datasArr.reverse()
}
export {addComma,getDateOfMonthAgo}