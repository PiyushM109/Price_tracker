import axios from 'axios'
import * as cheerio from 'cheerio';

const scrapeAmazonProduct = async (url)=>{

    if(!url){
        return;
    }
    

    //Bright Data Proxy configuration
    // const username = String("brd-customer-hl_99e77281-zone-unblocker");
    // const password = String("l3l92mb4x0b2");

    // const port = 22225;
    // const session_id = (1000000 * Math.random()) | 0;
    // const options = {
    //     auth : {
    //         username : `${username}-session-${session_id}`,
    //         password,
    //     },
    //     host : 'brd.superproxy.io',
    //     port,
    //     rejectUnauthorized: false,
    // }

    try{
        const response = await axios.get(`http://localhost:3000/scrape?url=${url}`);
        const $ = cheerio.load(response.data);

        const title = $('#productTitle').text().trim();
        console.log(title);
        

    }catch(e){
        throw new Error(`Failed to scrape product: ${e.message}`);
    }

}

export default scrapeAmazonProduct;