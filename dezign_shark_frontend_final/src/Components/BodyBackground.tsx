import React from "react";
import { Box, styled } from "@mui/material";
import { GlobalStyles } from "@mui/system";

// interface BodyBackgroundProps {
//     image: string;
// }

// Global animation styles
const GlobalAnimationStyles = () => (
  <GlobalStyles
    styles={`
      @keyframes pxl_grid_fall {
        0% { transform: translateY(-100px); opacity: 1; }
        100% { transform: translateY(100vh); opacity: 0; }
      }
    `}
  />
);

// Styled animated line
const Line = styled("span")({
  position: "relative",
  display: "inline-block",
  width: "1px",
  height: "100%",
  backgroundColor: "#343434",
  mixBlendMode: "difference",
  transition: "none !important",
});

// Styled animation elements inside each line
const AnimatedElement = styled("span")({
  content: '""',
  position: "absolute",
  top: 0,
  left: 0,
  width: "2px",
  height: "80px",
  background: "linear-gradient(0deg, rgba(255,255,255,.7) 0%, rgba(255,255,255,0.2) 100%)",
  animationName: "pxl_grid_fall",
  animationDuration: "3s", // Faster animation
  animationTimingFunction: "linear",
  animationIterationCount: "infinite",
});

// Background container
const BackgroundContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
  position: "absolute",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
});

// Background component
const WptbBackground: React.FC = () => {
  return (
    <>
      <GlobalAnimationStyles />
      <BackgroundContainer>
        {[1, 2, 3].map((index) => (
          <Line
            key={index}
            sx={{
              ...(index === 1 && { marginLeft: "12px" }),
              ...(index === 3 && { marginRight: "10px" }),
            }}
          >
            <AnimatedElement sx={{ animationDelay: `${index * 0.5}s` }} />
            <AnimatedElement sx={{ animationDelay: `${index * 1}s` }} />
          </Line>
        ))}
      </BackgroundContainer>
    </>
  );
};

export default WptbBackground;
