import { Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HeroCarousel from "./HeroCarousel";


const Hero = () => {
  return (
    <div style={{ margin: "5rem",display: "flex", justifyContent:"space-between", flexWrap:"wrap" }}>
     <div>
     <div style={{ display: "flex", flexWrap: "nowrap", color: "" }}>
        <Typography>Track price of your favorite product</Typography>
        <ArrowForwardIcon />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", color: "" }}>
        <Typography mt={2} style={{fontSize:"1.5rem"}}>
          <h1>Unleash the power of<br></br>
            <span style={{color:"#616161", fontFamily:"bold",fontSize:"3rem"}}> Web Scrapping </span> and <span style={{color:"#616161", fontFamily:"bold",fontSize:"3rem"}}>React</span>
          </h1>
        </Typography>
      </div>
      <div>
        
      </div>
     </div>
      <HeroCarousel />
    </div>
  );
};

export default Hero;
