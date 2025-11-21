import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { gsap } from "gsap";

// Partner logos
const partnerLogos = [
"https://dprstorage.b-cdn.net/dezignshark/logos/LOGO-01.png",
"https://dprstorage.b-cdn.net/dezignshark/logos/LOGO-02.png",
"https://dprstorage.b-cdn.net/dezignshark/logos/LOGO-03.png",
"https://dprstorage.b-cdn.net/dezignshark/logos/LOGO-04.png",
"https://dprstorage.b-cdn.net/dezignshark/logos/LOGO-05.png",
"https://dprstorage.b-cdn.net/dezignshark/logos/LOGO-06.png",
"https://dprstorage.b-cdn.net/dezignshark/logos/LOGO-07.png",
"https://dprstorage.b-cdn.net/dezignshark/logos/LOGO-08.png",
"https://dprstorage.b-cdn.net/dezignshark/logos/LOGO-09.png",
"https://dprstorage.b-cdn.net/dezignshark/logos/LOGO-10.png",
"https://dprstorage.b-cdn.net/dezignshark/logos/LOGO-11.png",
"https://dprstorage.b-cdn.net/dezignshark/logos/LOGO-12.png",
"https://dprstorage.b-cdn.net/dezignshark/logos/LOGO-13.png",
"https://dprstorage.b-cdn.net/dezignshark/logos/LOGO-14.png",
"https://dprstorage.b-cdn.net/dezignshark/logos/LOGO-15.png",
"https://dprstorage.b-cdn.net/dezignshark/logos/LOGO-16.png",
"https://dprstorage.b-cdn.net/dezignshark/logos/LOGO-17.png",
"https://dprstorage.b-cdn.net/dezignshark/logos/LOGO-18.png",

];

// Styled Components
const PartnerSection = styled(Box)({
  borderStyle: "solid",
  borderWidth: "1px 0px 1px 0px",
  borderColor: "#343434",
  transition: "background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s",
  marginTop: "17px",

  overflow: "hidden", // Ensure the marquee stays within bounds
});

const PartnerImageWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  textAlign: "center",
  img: {
    height: '100px',
    width: 'auto',
    objectFit: 'contain',
    transition: 'all 0.3s',
    [theme.breakpoints.down('lg')]: {
      height: '100px',
      width: 'auto',
    },
    [theme.breakpoints.down('md')]: {
      height: '100px',
      width: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      height: '100px',
      width: 'auto',
    },
  },
  '& img:nth-of-type(2)': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    opacity: 0,
    transform: 'translate(-50%, -150%)',
  },
  '&:hover img:nth-of-type(1)': {
    opacity: 0,
    transform: 'translateY(100%)',
  },
  '&:hover img:nth-of-type(2)': {
    opacity: 1,
    transform: 'translate(-50%, -50%)',
  },
}));
const Client: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (marquee) {
      const totalWidth = marquee.scrollWidth;
      gsap.to(marquee, {
        x: -totalWidth / 2,
        duration: 30, // Increased duration for slower scrolling
        repeat: -1,
        ease: "linear",
      });
    }
  }, []);

  return (
    <PartnerSection sx={{ mt: 8 ,padding:{xs:"10px 0px", md:"40px 0px", lg:"50px 0px"}}}>
      <Box
        ref={marqueeRef}
        sx={{
          display: "flex",
          whiteSpace: "nowrap",
        }}
      >
        {partnerLogos.map((logo, index) => (
          <PartnerImageWrapper key={index}>
            <a href="#">
              {/* Original Image */}
              <img src={logo} alt="Top digital marketing agency offering SEO and PPC services" />
              {/* Hover Image (Same Image for Now) */}
              <img src={logo} alt="Top digital marketing agency offering SEO and PPC services" />
            </a>
          </PartnerImageWrapper>
        ))}
        {/* Duplicate logos for seamless scrolling */}
        {partnerLogos.map((logo, index) => (
          <PartnerImageWrapper key={`duplicate-${index}`}>
            <a href="#">
              <img src={logo} alt="Top digital marketing agency offering SEO and PPC services" />
              <img src={logo} alt="Top digital marketing agency offering SEO and PPC services" />
            </a>
          </PartnerImageWrapper>
        ))}
      </Box>
    </PartnerSection>
  );
};

export default Client;
