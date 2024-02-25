const express = require("express");
const axios = require("axios");
const cors = require("cors");
const mongoose = require('mongoose');
const dataExtractor = require("./extractor.js")
const Product = require("./models/amazonProduct.js")
const {getLowestPrice, getHighestPrice, getAveragePrice} = require("./utils.js")

const app = express();
app.use(cors());
app.use(express.json());

main().then(()=>{
  console.log("connected to DB");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/PriceTracker');
}

app.get("/scrape", async (req, res) => {
  const url = req.query.url;
  console.log(url);
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);

  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };

  try {
    const response = await axios.get(url, options);
    const data = await dataExtractor(response,url);
    console.log(data);
    let productData ={ ...data};
    console.log(productData);
    const existingProduct = await Product.findOne({url:data.url});
    console.log(existingProduct);

    if(existingProduct){
      let updatedPriceHistory = existingProduct.priceHistory.push({
        price:data.currPrice,
        date : Date.now()
      })
        
      
      // console.log(existingProduct.priceHistory);
    
      
        existingProduct.lowestPrice = getLowestPrice(existingProduct.priceHistory),
        existingProduct.highestPrice = getHighestPrice(existingProduct.priceHistory),
        existingProduct.averagePrice = getAveragePrice(existingProduct.priceHistory)
     
      console.log(existingProduct);
      productData = existingProduct;
      console.log(productData);
    }
    

    const newProduct = await Product.findOneAndUpdate({ url:data.url},
      productData,
      {upsert:true,new:true}
    );

    console.log(newProduct);

    res.send(data);
  } catch (e) {
    res.send(`Failed to scrape product: ${e}`);
  }
});

app.get("/allProduct", async(req,res)=>{
    const allProduct = await Product.find({});
    res.send(allProduct);
})

app.listen(3000, () => {
  console.log(`Proxy server is running on port 3000`);
});
