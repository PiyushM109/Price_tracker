import express, {} from "express";
import { fetchProduct, isAmazonUrl } from "./scrapper.js";
const app = express();
app.use(express.json());
const main = async () => {
    const data = await fetchProduct("https://www.amazon.in/BassHeads-102-Earphones-Multi-Function-Microphone/dp/B07S8PSW59/?_encoding=UTF8&ref_=pd_hp_d_btf_ci_mcx_mr_ca_id_hp_d");
    console.log(data);
};
app.post("/getProduct", async (req, res) => {
    try {
        console.log(req.body);
        const { url } = req.body;
        if (!url) {
            res.status(400).json({
                success: false,
                message: "url not found please try again!",
            });
            return;
        }
        if (!isAmazonUrl(url)) {
            res.status(400).json({
                success: false,
                message: "Invalide url try again",
            });
            return;
        }
        const data = await fetchProduct(url);
        if (!data || !data.success) {
            res.status(404).json({
                success: false,
                message: "product details not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "data fetched successfully!",
            data: data,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: error,
        });
    }
});
app.listen(3001, () => {
    console.log("the app is running on port 3001");
});
//# sourceMappingURL=index.js.map