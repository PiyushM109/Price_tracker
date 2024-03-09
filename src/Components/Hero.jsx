import { Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HeroCarousel from "./HeroCarousel";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";
import scrapeAndStoreProduct from "../../lib/actions";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [searchProduct, setSearchProduct] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const isValidAmazonUrl = (link) => {
    try {
      const parsedUrl = new URL(link);
      const hostname = parsedUrl.hostname;
      if (
        hostname.includes("amazon.com") ||
        hostname.includes("amazon.in") ||
        hostname.includes(".amazon.")
      ) {
        console.log(hostname);
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
    return false;
  };
  const handleSubmit = async () => {
    const isValid = isValidAmazonUrl(searchProduct);
    if (!isValid) {
      setSearchProduct("");
      return alert("Please provide valid product link");
    }
    try {
      setIsLoading(true);
      const product = await scrapeAndStoreProduct(searchProduct);
      console.log(product);
      if(product){
        navigate(`/product/${product?._id}`);
        console.log("Piyush");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
      setSearchProduct("");
    }
  };
  return (
    <div
      style={{
        marginTop: "3rem",
        marginLeft: "1rem",
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
      }}
    >
      <div>
        <div style={{ display: "flex", flexWrap: "nowrap",}}>
          <Typography>Track price of your favorite product</Typography>
          <ArrowForwardIcon />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", color: "" }}>
          <Typography mt={2} style={{ fontSize: "1.5rem", fontFamily:"bold"}}>
            <h1 className="font-bold">
              Unleash the power of<br></br>
              <span
                style={{
                  color: "#616161",
                  fontFamily: "bold",
                  fontSize: "3rem",
                }}

              >{" "}Web Scrapping{" "} 
              </span>
              and{" "}<br></br>
              <span
                style={{
                  color: "#616161",
                  fontFamily: "bold",
                  fontSize: "3rem",
                }}
              >
                React
              </span>
            </h1>
          </Typography>
        </div>
        <div
          style={{ display: "flex", flexWrap: "nowrap", marginBottom: "2rem" }}
        >
          <TextField
            fullWidth
            value={searchProduct}
            onChange={(e) => setSearchProduct(e.target.value)}
            id="outlined-basic"
            label="Product-link"
            size="small"
          />
          <Button
            variant="contained"
            style={{ backgroundColor: "#616161", marginLeft: "4px" }}
            disabled ={searchProduct===""}
            onClick={handleSubmit}
          >
            {isLoading ? "Searching" : "Search"}
          </Button>
        </div>
      </div>
      <HeroCarousel />
    </div>
  );
};

export default Hero;
