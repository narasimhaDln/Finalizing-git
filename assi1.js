//1.using map HOF square the elements
// let input = [2, 3, 4, 5];
// function fn(num) {
//   return num*num
// }
// let result = input.map(fn);
// console.log(result)
// //2.using filter HOF printing the only even numbers in array;
// let arr = [1, 2, 3, 4, 5, 6];
// function evenNumbers(num) {
//   return num % 2 === 0;
// }
// let output = arr.filter(evenNumbers);
// console.log(output)
// ////3.using reduce HOF printing total array sum;
// let arr = [5, 10, 15, 20];
// function sumArray(acc,num) {
//   return acc+num
// }
// let result = arr.reduce(sumArray, 0)
// console.log(result)
// //4.by using of HOF filter numbers and square and sum that numbers in array;
// let input = [1, 2, 3, 4, 5];
// function fn(num) {
//   return num%2===0
// }
// let result = input.filter(fn)
// function square(result) {
//   return result*result
// }
// let output = result.map(square);
// function sumOfNUmbers(acc, output) {
//   return acc + output;
// }
// let sum = output.reduce(sumOfNUmbers,0);
// console.log(sum)
