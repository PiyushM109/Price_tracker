import express, { type Request, type Response } from "express";
import { fetchProduct, isAmazonUrl } from "./scrapper.js";
const app = express();

app.use(express.json());

type Data = {
  success: boolean;
  url?: string;
  currency?: string;
  image?: string | undefined;
  title?: string;
  currPrice?: number;
  originalPrice?: number;
  priceHistory: any[];
  discountRate?: number;
  reviewsCount?: number;
  stars?: number;
  isOutOfStock?: boolean;
  lowestPrice?: number;
  highestPrice?: number;
};

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

app.post("/getProduct", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { url }: { url: string } = req.body;
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
  } catch (error) {
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
