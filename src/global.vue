<script>
//const srvurl = "http://169.169.41.42:8800";
const srvurl = "http://localhost:8800";

function isEmpty(obj) {
  if (typeof obj == "undefined" || obj == null || obj == "") {
    return true;
  } else {
    return false;
  }
}

function dateToInt(date) {
  let Y = date.getFullYear() + "";
  let M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "";
  let D = (date.getDate() + "").padStart(2, "0");
  return parseInt(Y + M + D);
}

function intToDate(dint) {
  let ds = dint + "";
  let d = new Date(
    ds.substr(0, 4) + "-" + ds.substr(4, 2) + "-" + ds.substr(6, 2)
  );
  return d;
}

function formatDate(date, fmt) {
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
}

export default {
  srvurl,
  isEmpty,
  dateToInt,
  intToDate,
  formatDate
};
</script>
