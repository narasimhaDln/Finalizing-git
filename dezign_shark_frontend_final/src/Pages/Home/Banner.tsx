import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Container, GridLegacy as Grid } from "@mui/material";
import { styled } from "@mui/system";
import gsap from "gsap";
import CloseIcon from '@mui/icons-material/Close';
import {  homearrow } from "../../assets"; // Ensure correct import
import "./Banner.css";

// Styled Components
const HeroSectionWrapper = styled(Box)({
  position: "relative",
  width: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  textAlign: "left",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
});

const ContentWrapper = styled(Box)({
  position: "relative",
  zIndex: 2,
});

const Heading = styled(Typography)({
  // fontSize: "80px",
  fontWeight: 700,
  lineHeight: "60px",
  color: "#FFFFFF",
  textTransform: "uppercase",
});

const OutlineText = styled("span")({
  color: "transparent",
  WebkitTextStroke: "3px #fc0000",
  fontSize: "90px",
  fontFamily: "Arial, sans-serif",
  display: "inline-block",
  lineHeight: "100px",
});


// Video Modal Styles
const VideoModal = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
});

const VideoContainer = styled(Box)({
  width: "100%",
  maxWidth: "900px", // Maximum width for larger screens
  height: "auto",
  display: "flex",
  justifyContent: "center",
});

const VideoElement = styled("video")({
  width: "100%", // Ensures full width
  height: "auto",
  borderRadius: "10px",
});

const CloseButton = styled(Box)(({ theme }) => ({
  position: "absolute",
  color: "white",
  fontSize: "30px",
  
  zIndex: 1001,
  background: "rgba(255, 255, 255, 0.2)",
  borderRadius: "50%",
  transition: "0.3s",
  width: "50px",
  height: "50px",
  display: "flex", // Ensures content is flexed
  alignItems: "center", // Centers vertically
  justifyContent: "center", // Centers horizontally
  "&:hover": {
    background: "rgba(255, 255, 255, 0.5)",
  },
  top: "50px", // Default for desktop
  right: "14%", // Default for desktop
  [theme.breakpoints.down("lg")]: {
    top: "35%", // Adjusted for mobile view
    right: "10px", // Adjusted for mobile view
  },
}));

// Hero Section Component
const Banner: React.FC = () => {
  const rotatingTextRef = useRef(null);
  const [isDesktopVideoOpen, setIsDesktopVideoOpen] = useState(false);
  const [isMobileVideoOpen, setIsMobileVideoOpen] = useState(false);

  useEffect(() => {
    if (rotatingTextRef.current) {
      gsap.to(rotatingTextRef.current, {
        rotation: 360,
        repeat: -1,
        duration: 10,
        ease: "linear",
      });
    }
  }, []);

  const handlePlayClick = (isMobile: boolean) => (e: React.MouseEvent) => {
    e.stopPropagation();
    isMobile ? setIsMobileVideoOpen(true) : setIsDesktopVideoOpen(true);
  };
  const handleCloseVideo = (isMobile: boolean) => (e: React.MouseEvent) => {
    e.stopPropagation();
    isMobile ? setIsMobileVideoOpen(false) : setIsDesktopVideoOpen(false);
  };

  // Desktop and Mobile Video Modal
  const VideoModalComponent = ({ open, onClose }: { open: boolean; onClose: (e: React.MouseEvent) => void }) => open && (
    <VideoModal onClick={onClose}>
      <CloseButton onClick={onClose}><CloseIcon fontSize="large" /></CloseButton>
      <VideoContainer onClick={e => e.stopPropagation()}>
        <VideoElement src="https://dprstorage.b-cdn.net/dprstorage/dezign_shark.mp4" controls autoPlay />
      </VideoContainer>
    </VideoModal>
  );

  return (
    <Box>
      {/* Desktop View */}
      <HeroSectionWrapper
        sx={{
          backgroundImage: 'url("https://dprstorage.b-cdn.net/dezignshark/newdswebsitebanner.webp")',
          height: { xs: "50vh", md: "130vh", lg: "130vh" },
          backgroundPosition: { xs: "75% center", md: 'center', lg: "center" },
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Container maxWidth="xl">
          <ContentWrapper>
            <Grid container>
              <Grid item xs={6} md={6} lg={7} pb={4}>
                <Heading>
                  <Box sx={{ fontSize: "37px", fontWeight: 700, color: "#FFFFFF" }}>
                    <span>Hyderabad's Most Trusted</span><br />
                    <span><OutlineText>Digital Marketing</OutlineText></span><br />
                    <span>Partner for Real Estate Developers</span>
                  </Box>
                </Heading>
              </Grid>
            </Grid>
          </ContentWrapper>
        </Container>
        {/* Rotating GIF & Play Button */}
        <Box sx={{ position: "absolute", top: "55%", left: "52%", transform: "translate(-50%, -50%)", zIndex: 11 }} onClick={handlePlayClick(false)}>
          <img src="https://dprstorage.b-cdn.net/dezignshark/dsgif1.gif" alt="Top digital marketing agency offering SEO and PPC services" style={{ width: "150px", height: "150px", borderRadius: "50%" ,}} loading="eager" />
        </Box>
        {/* Animated Arrow with Text */}
        <Box sx={{ position: "absolute", top: "63%", left: "48%", transform: "translate(-50%, -50%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", animation: "moveArrow 2s infinite", "@keyframes moveArrow": { "0%": { transform: "translateY(20px)" }, "50%": { transform: "translateY(0)" }, "100%": { transform: "translateY(20px)" } } }}>
          <img src={homearrow} alt="Top digital marketing agency offering SEO and PPC services" style={{ width: "30px", height: "30px", marginBottom: "10px" }} loading="eager"/>
          <Typography variant="h6" sx={{ fontSize: "18px !important ", fontWeight: 600, color: "#FFFFFF", textOrientation: "upright", letterSpacing: '4px' }}>Play Video</Typography>
        </Box>
        <VideoModalComponent open={isDesktopVideoOpen} onClose={handleCloseVideo(false)} />
      </HeroSectionWrapper>
      {/* Mobile View */}
      <Box sx={{ display: { xs: "block", md: 'none' }, textAlign: "center", mt: 2, position: "relative", zIndex: 100 }}>
        <img src="https://dprstorage.b-cdn.net/dezignshark/newmobileviewbanner2.webp" alt="Top digital marketing agency offering SEO and PPC services" style={{ width: "100%", height: "auto" }} loading="eager"/>
        <Box sx={{ position: "absolute", top: { xs: "81%" }, left: { xs: "18%" }, transform: "translate(-50%, -50%)", zIndex: 11 }} onClick={handlePlayClick(true)}>
          <Box component="img" src="https://dprstorage.b-cdn.net/dezignshark/dsgif1.gif" alt="Top digital marketing agency offering SEO and PPC services" sx={{ width: { xs: "150px" }, height: { xs: "150px" } }} loading="eager" />
        </Box>
        <Box sx={{ position: "absolute", top: { xs: "89%" }, left: { xs: "5%" }, transform: "translate(-50%, -50%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", animation: "moveArrow 2s infinite", "@keyframes moveArrow": { "0%": { transform: "translateY(20px)" }, "50%": { transform: "translateY(0)" }, "100%": { transform: "translateY(20px)" } } }}>
          <Box component="img" src={homearrow} alt="Top digital marketing agency offering SEO and PPC services" sx={{ width: { xs: "60px" }, height: { xs: "60px" }, marginBottom: "10px" }} />
          <Typography variant='h6' sx={{ fontWeight: 600, color: "#FFFFFF", textOrientation: "upright" }}>Play Video</Typography>
        </Box>
        <VideoModalComponent open={isMobileVideoOpen} onClose={handleCloseVideo(true)} />
      </Box>
    </Box>
  );
};

export default Banner;
