// Given an array of integers, calculate the cumulative sum of the array

// To get the sum of an array you have to loop over it and store the results in
// another array
const sum = [1, 3, 5, 7, 9, 11].reduce((acc, cur) => acc + cur, 0);  //
//  arguments given to 'reduce' are 'accumulative' and 'cuurent value'
//  console.log(sum)

// Method without built-in array function
export function sum2(arr) {
  let total =
      0;  // using 'let' allows the variable to be updated as opposed to 'const'

  for (let i = 0; i < arr.length;
       i++) {            // loop through each element of the array
    console.log(arr[i])  // print the values one by one
    total += arr[i];     // update the total
  }

  return total;
}

console.log('sum: ', sum2([1, 3, 5, 7, 9, 11]));