import express, {} from "express";
import { fetchProduct, isAmazonUrl } from "./scrapper.js";
const app = express();
app.use(express.json());
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});
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
app.listen(3002, () => {
    console.log("the app is running on port 3002");
});
//# sourceMappingURL=index.js.map