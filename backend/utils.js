const { Notification, THRESHOLD_PERCENTAGE }  = require("./nodeMailer/node_mailer");

function getLowestPrice(nums) {
    // console.log(nums);
    let min = nums[0]?.price;
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
    // console.log(nums);
    let sum = 0;
    // console.log("Piyush Avg");

    for(let i=0; i<nums.length; i++){
        sum = sum + nums[i].price;
    }
    // console.log(sum);
    return sum/nums.length;
}

const getEmailNotifType = (scrapedProduct, currentProduct) => {
    const lowestPrice = getLowestPrice(currentProduct.priceHistory);
  
    if (scrapedProduct.currentPrice < lowestPrice) {
      return Notification.LOWEST_PRICE;
    }
    if (!scrapedProduct.isOutOfStock && currentProduct.isOutOfStock) {
      return Notification.CHANGE_OF_STOCK;
    }
    if (scrapedProduct.discountRate >= THRESHOLD_PERCENTAGE) {
      return Notification.THRESHOLD_MET;
    }
  
    return null;
};


module.exports = {
    getAveragePrice,
    getHighestPrice,
    getLowestPrice,
    getEmailNotifType,
}
