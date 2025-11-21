import React from "react";
import Marquee from "react-fast-marquee";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { GiSevenPointedStar } from "react-icons/gi";

// Styled Components
const MarqueeContainer = styled(Box)({
  width: "100%",
  backgroundColor: "rgba(255, 0, 0, 0.2)", // Red color with blur effect
  backdropFilter: "blur(10px)", // Apply blur effect
  padding: "5px",
});

const MarqueeContent = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "30px", // Gap between text and icon
  width: "100%", // Ensure items span the full width
});

// Styled Animated Text with hover effect
const AnimatedText = styled(Typography)({
  fontWeight: "bold",
  display: "inline-block",
  color: "white",
  transition: "color 0.3s ease-in-out", // Smooth color transition
  "&:hover": {
    color: "black", // Change to black on hover
  },
});

// Icon Wrapper
const IconWrapper = styled(Box)({
  fontSize: "14px",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const MarqueeText: React.FC = () => {
  const items = [
    "Search Engine Optimization (SEO)",
    "Pay-Per-Click Advertising (PPC)",
    "Social Media Marketing (SMM)",
    "Content Marketing",
    "Branding & Design",
    "Email Marketing",
    "Performance Tracking",
  ];

  return (
    <MarqueeContainer mb={4} sx={{ mt: { xs: 8, lg: 7 } }}>
      <Marquee speed={100} gradient={false}>
        <MarqueeContent sx={{ padding: { xs: "20px 60px", md: "0 30px" ,lg: "0 30px"} }}>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <AnimatedText
                sx={{
                  fontSize: { lg: "20px", xs: "34px" },
                }}
              >
                {item}
              </AnimatedText>

              {/* Star icon placed after every item */}
              <IconWrapper>
                <GiSevenPointedStar size={18} />
              </IconWrapper>
            </React.Fragment>
          ))}
        </MarqueeContent>
      </Marquee>
    </MarqueeContainer>
  );
};

export default MarqueeText;
