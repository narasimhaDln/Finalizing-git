import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedImageProps {
  imageSrc: string;
  sx?: object; // Custom styling via sx prop
}

const AnimatedImage: React.FC<AnimatedImageProps> = ({ imageSrc, sx = {} }) => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { xPercent: 100, scale: 1.3, opacity: 0 },
        {
          xPercent: 0,
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%", // Animation triggers when image is 80% in viewport
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <Box
      component="img"
      ref={imageRef}
      src={imageSrc}
      alt="Best apartments in Hyderabad by Kolla Group"
      sx={{
        width: "100%", // Default full width
        height: "auto", // Auto height
        objectFit: "cover", // Keeps aspect ratio
        opacity: 0, // Start hidden, GSAP will fade it in
        ...sx, // Allows custom styles via props
      }}
    />
  );
};

export default AnimatedImage;
