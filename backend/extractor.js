const cheerio = require("cheerio");

function extractPrice(...elements) {
  for (const element of elements) {
    const priceText = element.text().trim();
    if (priceText) return priceText.replace(/[^\d.]/g, "");
  }

  return "";
}

function extractCurrency(element) {
  const currencyText = element.text().trim().slice(0, 1);
  return currencyText ? currencyText : "";
}

function dataExtractor(response,url){
    console.log("Piyush1");
    const $ = cheerio.load(response.data);
    const title = $("#productTitle").text().trim();
    // const currPrice = $(".priceToPay span.a-price-whole").text().trim();
    const currPrice = extractPrice(
      $(".priceToPay span.a-price-whole"),
      $("a.size.base.a-color-price"),
      $(".a-button-selected .a-color-base"),
      $(".a-price.a-text-price")
    );

    const originalPrice = extractPrice(
      $("#priceblock_ourprice"),
      $(".a-price.a-text-price span.a-offscreen"),
      $("#listprice"),
      $("#priceblock_dealprice"),
      $(".a-size-base.a-color-price")
    );

    const outOfStock =
      $("#availability  span.a-size-medium.a-color-success")
        .text()
        .trim()
        .toLowerCase() === "currently unavailable.";

    const images = $('#imgBlkFront').attr('data-a-dynamic-image') || $('#landingImage').attr('data-a-dynamic-image');
    // const image = $('#landingImage').attr('src');
    const imageUrls = Object.keys(JSON.parse(images))

    const currency = extractCurrency($('.a-price-symbol'));
    const discountRate = $('.savingsPercentage').text().replace(/[-%]/g,"");

    const data = {
      url,
      currency,
      image : imageUrls[0],
      title,
      currPrice :Number(currPrice) || Number(originalPrice) ,
      originalPrice : Number(originalPrice) || Number(currPrice),
      prceHistory : [],
      discountRate : Number(discountRate),
      reviewsCount : 578,
      stars : 4.2,
      isOutOfStock : outOfStock,
      lowestPrice : Number(currPrice),
      highestPrice : Number(originalPrice)
    }
    console.log("Piyush2")
    return data;
}

module.exports=dataExtractor;