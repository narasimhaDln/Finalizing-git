import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { shark } from "../assets";

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if the device is a mobile device
    const checkIfMobile = () => {
      const mobileCheck = window.matchMedia("(max-width: 768px)").matches || navigator.maxTouchPoints > 0;
      setIsMobile(mobileCheck);
    };

    checkIfMobile(); // Run on mount
    window.addEventListener("resize", checkIfMobile);

    // Function to move cursor (Only if NOT mobile)
    const moveCursor = (e: MouseEvent) => {
      if (!isMobile) {
        setPosition({ x: e.clientX, y: e.clientY });
      }
    };

    document.addEventListener("mousemove", moveCursor);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("resize", checkIfMobile);
    };
  }, [isMobile]);

  // Completely hide the custom cursor in mobile view
  if (isMobile) return null;

  return (
    <Box
      sx={{
        width: 30,
        height: 30,
        position: "fixed",
        top: position.y,
        left: position.x,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 9999,
        transition: "transform 0.2s ease",
        mt:2
      }}
    >
      <img
        src={shark}
        alt="Top digital marketing agency offering SEO and PPC services"
        style={{
          width: "100%",
          height: "auto",
          transition: "transform 0.3s ease",
        
        }}
      />
    </Box>
  );
};

export default CustomCursor;
