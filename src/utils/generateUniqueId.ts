function generateUniqueId() {
  var timestamp = new Date().getTime(); // 获取当前时间戳
  var randomNum = Math.floor(Math.random() * (999 - 1 + 1) + 1); // 生成3位随机数

  return "unique_" + timestamp + "_" + randomNum;
}
export default generateUniqueId;
