export declare const isAmazonUrl: (url: string) => boolean;
export declare const fetchProduct: (url: string) => Promise<{
    success: boolean;
    url: string;
    currency: any;
    image: string | undefined;
    title: string;
    currPrice: number;
    originalPrice: number;
    priceHistory: never[];
    discountRate: number;
    reviewsCount: number;
    stars: number;
    isOutOfStock: boolean;
    lowestPrice: number;
    highestPrice: number;
} | {
    success: boolean;
}>;
//# sourceMappingURL=scrapper.d.ts.map