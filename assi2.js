function forEachCustom(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i, arr);
  }
}
let arr = [1, 2, 3, 4, 5, 6, 7];
forEachCustom(arr, function (num) {
  console.log(num);
});
