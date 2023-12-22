import Carousel from "react-bootstrap/Carousel";
import "./Slider.css";
function Slider({ images }) {
  if (!images || !Array.isArray(images) || images.length === 0 || !images[0]) {
    return null; // or handle the case when images[0] is not available
  }

  return (
    <div className="slider">
      <Carousel>
        {images.map((image, index) => (
          <Carousel.Item className="carousel-item" key={index}>
            <img src={image} className="img" alt={`Slide ${index}`} />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Slider;
