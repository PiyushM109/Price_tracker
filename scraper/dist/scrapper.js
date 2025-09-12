import axios, { AxiosHeaders } from "axios";
import * as cheerio from "cheerio";
import { userAgents } from "./user-agents.js";
export const isAmazonUrl = (url) => {
    try {
        const parsed = new URL(url);
        const validDomains = [
            "amazon.com",
            "amazon.in",
            "amazon.co.uk",
            "amazon.de",
            "amazon.ca",
            "amazon.com.au",
            "amazon.co.jp",
        ];
        return validDomains.some((domain) => parsed.hostname.endsWith(domain));
    }
    catch (e) {
        return false;
    }
};
const extractPrice = (...elements) => {
    for (const element of elements) {
        const priceText = element.text().trim();
        if (priceText)
            return priceText.replace(/[^\d.]/g, "");
    }
    return "";
};
const extractCurrency = (element) => {
    const currencyText = element.text().trim().slice(0, 1);
    return currencyText ? currencyText : "";
};
export const fetchProduct = async (url) => {
    try {
        const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
        // Set a random User-Agent header to mimic a browser
        const options = {
            headers: {
                "User-Agent": randomUserAgent,
            },
        };
        const res = await axios.get(url, options);
        const $ = cheerio.load(res.data);
        const title = $("#productTitle").text().trim();
        const currPrice = extractPrice($(".priceToPay span.a-price-whole"), $("a.size.base.a-color-price"), $(".a-button-selected .a-color-base"), $(".a-price.a-text-price"));
        const originalPrice = extractPrice($("#priceblock_ourprice"), $(".a-price.a-text-price span.a-offscreen"), $("#listprice"), $("#priceblock_dealprice"), $(".a-size-base.a-color-price"), $(".a-price.a-text-price .a-offscreen"));
        const mrpText = $(".a-price.a-text-price .a-offscreen")
            .first()
            .text()
            .trim();
        // Clean and convert to number
        const mrpValue = parseInt(mrpText.replace(/[^\d]/g, ""), 10);
        console.log({ mrpText, mrpValue });
        let ratingText = $("#averageCustomerReviews .a-icon-alt")
            .text()
            .trim();
        let match = ratingText.match(/[\d.]+/);
        let rating = 0;
        if (match && match.length > 0) {
            rating = parseFloat(match[0]);
        }
        let reviewText = $("#acrCustomerReviewText").text().trim();
        let reviewmatch = reviewText.match(/\d[\d,]*/); // first number with commas
        let reviewCount = reviewmatch
            ? parseInt(reviewmatch[0].replace(/,/g, ""), 10)
            : 0;
        const outOfStock = $("#availability  span.a-size-medium.a-color-success")
            .text()
            .trim()
            .toLowerCase() === "currently unavailable.";
        const images = $("#imgBlkFront").attr("data-a-dynamic-image") ||
            $("#landingImage").attr("data-a-dynamic-image");
        // const image = $('#landingImage').attr('src');
        const imageUrls = Object.keys(JSON.parse(images));
        const currency = extractCurrency($(".a-price-symbol"));
        const discountRate = $(".savingsPercentage").text().replace(/[-%]/g, "");
        const data = {
            success: true,
            url,
            currency,
            image: imageUrls[0],
            title,
            currPrice: Number(currPrice) || Number(originalPrice),
            originalPrice: Number(originalPrice) || mrpValue || Number(currPrice),
            priceHistory: [],
            discountRate: Number(discountRate),
            reviewsCount: reviewCount,
            stars: Number(rating),
            isOutOfStock: outOfStock,
            lowestPrice: Number(currPrice) || Number(originalPrice),
            highestPrice: Number(originalPrice) || mrpValue,
        };
        return data;
    }
    catch (error) {
        console.error("Error fetching product:", error);
        return {
            success: false,
        };
    }
};
//# sourceMappingURL=scrapper.js.map