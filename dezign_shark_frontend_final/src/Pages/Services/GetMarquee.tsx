import React, { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import gsap from "gsap";

const useMarquee = (ref: React.RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    if (ref.current) {
      gsap.to(ref.current, {
        x: "-100%",
        repeat: -1,
        duration: 15, // Reduced speed (increase duration)
        ease: "linear",
      });
    }
  }, [ref]);
};

const GetMarquee: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  useMarquee(marqueeRef);

  return (
    <Box
      sx={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        backgroundColor: "#1a1a1a",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        height: {
          xs: 50,
          md: 40,
          lg: 40,
        },
        position: "relative",
        width: "100%",
      }}
    >
      {/* Marquee Scrolling Content */}
      <Box
        ref={marqueeRef}
        sx={{
          display: "flex",
          gap: 6,
          // fontSize: {
          //   xs: '26px',
          //   lg: '14px'
          // },
          fontWeight: "bold",
          textTransform: "uppercase",
          minWidth: "100%",
        }}
      >
        {[...Array(10)].map((_, i) => (
          <Typography variant="body1" key={i} sx={{
            display: "flex", alignItems: "center",
            fontWeight: 600,
            // fontSize: {
            //   xs: '26px',
            //   lg: '14px'
            // },
          }}>
            {/* "Get Now:" (Orange) */}
            <span ><Typography variant="body1" sx={{
              color: "#ad0505", marginRight: "4px",
              // fontSize: {
              //   xs: '26px',
              //   lg: '14px'
              // },
            }}>
              Get Now :&nbsp;
            </Typography>
            </span>
            A Free Consultation For Design
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default GetMarquee;
