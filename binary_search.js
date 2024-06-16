// Create a function that takes a sorted array and a target value
// Return the index of the target value in the array
// If the target value is not in the array then return -1

const arr = ['a', 'b', 'c', 'd', 'e', 'x', 'z'];

// This function can work if the array is small but if you loop over thousands of data it not efficient
function search(arr, target) { // using the 'export' term will allow the funtion to be called in other applications
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
    }
}

// Binary search, If you're looking for someone with the letter J in a phonebook, it's easier to just go to the middle of it
// and from there go backwards or forwards depending where you landed

function search2(arr, target, start=0, end=arr.length-1) { //define a start and end as well
    console.log(start, end);

    if (start > end) {
        console.log('value not found');
        return -1;
    }

    const middle = Math.floor((start+end) / 2) // Math.floor() will return an integer instead of a decimal value

    if (arr[middle] === target) { 
        console.log(`${target} Found at index ${middle}`);
        return middle;        
    }
    
    if (arr[middle] > target) {
        return search2(arr, target, start, middle - 1);
    }
    
    if (arr[middle] < target) {
        return search2(arr, target, middle + 1, end);
    }
}

console.log(search(arr, 'z'));
console.log(search2(arr, 'd'));
