/* Exercise 1: Capitalize the first letter of each word in string */
testInput1 = "the quick brown fox";
function capitalizeWords(str) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
console.log(capitalizeWords(testInput1));

/* Exercise 2: Find the largest of 3 integers */
testInput2 = [175, 10000, 3264];
function largestOfThree(arr) {
    return Math.max(...arr);
}
console.log(largestOfThree(testInput2));

/* Exercise 3: Move the last 3 letters of a string to the beginning, provided that the string is greater than 3 characters */
testinput3 = "Flipping Out";
function stringFlipper(str) {
    if (str.length > 3) {
        return str.slice(-3) + str.slice(0, -3);
    } else {
        return str;
    }
}
console.log(stringFlipper(testinput3));

/* Exercise 4: Determine the type of a given input angle */
testInput4 = 134;
function determineAngle(angle) {
    if (angle < 90) {
        return "Acute angle";
    } else if (angle === 90) {
        return "Right angle";
    } else if (angle < 180) {
        return "Obtuse angle";
    } else if (angle === 180) {
        return "Straight angle";
    } else {
        return "That is not a valid angle";
    }
}
console.log(determineAngle(testInput4));

/* Exercise 5: Find the maximum sum of k consecutive numbers */
testInputArr = [2,3,5,1,6];
testInputK = 3;
function maxSum( arr, k) {
    for (let i = 0; i <= arr.length - k; i++) {
        let currentSum = 0;
        for (let j = 0; j < k; j++) {
            currentSum += arr[i + j];
        }
        if (i === 0 || currentSum > maxSum) {
            maxSum = currentSum;
        }
    }
    return maxSum;
}
console.log(maxSum(testInputArr, testInputK));

/* Sliding window attempt 2 in a single loop */
function maxSumWindow(arr, k) {
    let n = arr.length
    let maximumSum = 0;
    let currentSum = 0;
    for (let i = 0; i < n; i++) {
        currentSum += arr[i]
        if (i >= k) {
            currentSum -= arr[i - k]
        }
        if (i >= k - 1) {
            maximumSum = Math.max(currentSum, maximumSum)
        }
    }
    return maximumSum
}
InputArray2 = [9, 3, 5, 1, 7];
kVal = 2;
console.log("Sliding Window:")
console.log(maxSumWindow(InputArray2, kVal));

