function getLowestPrice(nums) {
    // console.log("Piyush Low");
    let min = nums[0].price;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i].price < min) {
            min = nums[i].price;
        }
    }
    return min;
};

function getHighestPrice(nums){
    let max = nums[0].price;
    // console.log("Piyush Max");

    for (let i = 1; i < nums.length; i++) {
        if (nums[i].price > max) {
            min = nums[i].price;
        }
    }
    return max;
}

function getAveragePrice(nums){
    let sum = 0;
    // console.log("Piyush Avg");

    for(let i=0; i<nums.length; i++){
        sum = sum + nums[i].price;
    }
    return sum/nums.length;
}

module.exports = {
    getAveragePrice,
    getHighestPrice,
    getLowestPrice
}
