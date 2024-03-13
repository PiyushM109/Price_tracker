import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function HeroCarousel() {
  return (
    <div style={{ maxWidth: "500px", borderRadius: "30px" }}>
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={2500}
        showArrows={false}
        showStatus={false}
      >
        <div>
          <img
            style={{ height: "600px", borderRadius: "30px" }}
            src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hhaXJ8ZW58MHx8MHx8fDA%3D"
          />
        </div>
        <div>
          <img
            style={{ height: "600px", borderRadius: "30px" }}
            src="https://images.unsplash.com/photo-1641154748135-8032a61a3f80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJvb2slMjBjb3ZlcnxlbnwwfHwwfHx8MA%3D%3D"
          />
        </div>
        <div>
          <img
            style={{ height: "600px", borderRadius: "30px" }}
            src="https://images.unsplash.com/photo-1544117519-31a4b719223d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D"
          />
        </div>
      </Carousel>
    </div>
  );
}

export default HeroCarousel;
