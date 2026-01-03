import { useState, useEffect } from "react";

import "../_styles/Comp_AutoCarousel.css"

export default function AutoCarousel({ images, interval = 3000 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="carousel-container">
      <img
        src={images[index]}
        alt="carousel"
        className="carousel-image"
      />
    </div>
  );
}
