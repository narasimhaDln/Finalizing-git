import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ImageRevealProps {
  imageSrc: string;
  bgColor?: string;
}

const ImageReveal: React.FC<ImageRevealProps> = ({ imageSrc, bgColor = "#fff" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (containerRef.current && imageRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          toggleActions: "restart none none reset",
        },
      });

      tl.set(containerRef.current, { autoAlpha: 1 })
        .from(containerRef.current, { xPercent: -100, duration: 1.5, ease: "power2.out" })
        .from(imageRef.current, { xPercent: 100, scale: 1.3, duration: 1.5, delay: -1.5, ease: "power2.out" });
    }
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        position: "relative",
        backgroundColor: bgColor,
        visibility: "hidden", 
      }}
    >
      <Box
        className="reveal"
        sx={{
          position: "relative",
          width: "80%",
          height: "80%",
          maxWidth: "500px",
          overflow: "hidden",
        }}
      >
        <img
          ref={imageRef}
          src={imageSrc}
          alt="Best apartments in Hyderabad by Kolla Group"
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            transformOrigin: "left",
          }}
        />
      </Box>
    </Box>
  );
};

export default ImageReveal;
