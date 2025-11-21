import React, { useEffect, useRef, ReactNode } from "react";
import { Box, Typography, SxProps, Theme } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  children: ReactNode;
  sx?: SxProps<Theme>; // ✅ Accepts Material-UI `sx` prop
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ children, sx }) => {
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Split text into individual letters for animation
    const textElement = textRef.current;
    textElement.innerHTML = textElement.textContent!.replace(/\S/g, "<span class='letter'>$&</span>");

    const letters = textElement.querySelectorAll(".letter");

    gsap.fromTo(
      letters,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textElement,
          start: "top 95%", // Animation starts when component enters viewport
          end: "bottom 20%",
          toggleActions: "play none none reverse", // Plays when scrolling down, reverses when scrolling up
        },
      }
    );
  }, []);

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 800,
          fontSize: { xs: "2em",md:"40px", lg: "40px" },
          wordBreak: "break-word",
          whiteSpace: "normal",
          ...sx, // ✅ Apply custom `sx` styles from props
        }}
      >
        <Box ref={textRef} className="letters" sx={{ display: "inline-block" }}>
          {children}
        </Box>
      </Typography>
    </Box>
  );
};

export default AnimatedText;
