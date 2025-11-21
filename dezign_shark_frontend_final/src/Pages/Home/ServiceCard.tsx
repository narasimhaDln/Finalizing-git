import React, { useEffect } from "react";
import { Box, GridLegacy as Grid, Card, Typography, Container } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom"; // ✅ Navigation
import AnimatedText from "../../Components/Inputs/AnimatedText";
import { Home } from "../../assets";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import EastIcon from '@mui/icons-material/East';

// TypeScript Props Definition
interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  route: string;
}

// Styled Component for Hover Effect
const FancyBox = styled(Card)({
  position: "relative",
  // padding: "20px 25px",
  border: "2px solid transparent",
  backgroundColor: "#171717",
  transition: "border 0.4s ease-in-out",
  overflow: "hidden",
  // display: "flex",
  // flexDirection: "column",
  // justifyContent: "space-between",
  height: "100%", // Ensure all cards have the same height
  

  "&::before, &::after": {
    content: '""',
    position: "absolute",
    width: "0",
    height: "2px",
    backgroundColor: "#fc0000",
    transition: "width 0.3s ease-in-out",
  },

  "&::before": { top: 0, left: 0, right: 0, margin: "auto" },
  "&::after": { bottom: 0, left: 0, right: 0, margin: "auto" },

  "& .hover-lines::before, & .hover-lines::after": {
    content: '""',
    position: "absolute",
    width: "1px",
    height: "0",
    backgroundColor: "#fc0000",
    transition: "height 0.3s ease-in-out",
  },

  "& .hover-lines::before": { left: 0, top: 0, bottom: 0, margin: "auto" },
  "& .hover-lines::after": { right: 0, top: 0, bottom: 0, margin: "auto" },

  "&:hover": {
    "&::before, &::after": { width: "100%" },
    "& .hover-lines::before, & .hover-lines::after": { height: "100%" },
    // "& img": { transform: "scale(-1) rotate(180deg)" },
  },
});

// Service Card Component
const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, imageUrl, route }) => {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: "ease-in-out", // Smooth animation
      offset: 100, // Trigger animations earlier/later
      once: false, // Allows re-triggering when scrolling up
      mirror: true, // ✅ Ensures animations work when scrolling up
    });

    // Refresh AOS when page content updates
    AOS.refresh();
  }, []);

  return (
    <FancyBox
      elevation={3}
      sx={{
        border: "1px solid #444",
        width: "100%",
        cursor: "none !important",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // Ensures consistent spacing
        height: "100%", // Ensures all cards have the same height
          padding: {xs:'0px 20px',md:"20px 25px",lg:"20px 25px"}
      }}
      onClick={() => navigate(route)}
    >
      <Box className="hover-lines"></Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="start"
        mb={3}
        sx={{ py: { xs: 3, lg: 0 } }}
      >
        <Box
          sx={{
            border: "2px solid red", // ✅ Adds red border
            borderRadius: "50%", // ✅ Optional: Adds rounded corners
            padding: { xs: "0px",md:'10px', lg: "10px" }, // ✅ Optional: Adds space inside the border
            width: { xs: "150px",md:"70px", lg: "70px" }, // ✅ Width for the border
            height: { xs: "150px",md:'70px', lg: "70px" }, // ✅ Height for the border
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2, // Adds spacing below the image
          }}
        >
          <Box
            component="img"
            src={imageUrl}
            alt="Top digital marketing agency offering SEO and PPC services"
            sx={{
              width: { xs: "50%",md: "50px", lg: "50px" }, // ✅ Adjusted width for the image
              height: { xs: "100%",md: "50px", lg: "50px" }, // ✅ Adjusted height for the image
              transition: "500ms ease",
              objectFit: "contain",
              filter: "brightness(0) invert(1)", // Makes image white
            }}
          />
        </Box>
        <Typography
          variant="h5"
          fontWeight={700}
          color="white"
          mb={1}
          textAlign="start"
          data-aos="fade-down"
          sx={{ minHeight: "50px",display: "flex",
            alignItems: "start",
            justifyContent: "start", }} // Ensures consistent height for titles
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          color="white"
          textAlign="left"
          sx={{
            // fontSize: { xs: "30px", lg: "18px" },
            minHeight: "124px", // Ensures consistent height for descriptions
          }}
          data-aos="fade-down"
        >
          {description}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="flex-end" sx={{mt:{xs:0,md:0,lg:0}}}>
        <Typography
          variant="body2"
          color="#fff"
          sx={{
            fontWeight: 600,
            cursor: "none !important",
            // fontSize: { xs: "38px", lg: "18px" },
          }}
        >
          Read More
        </Typography>
        <EastIcon
          sx={{ color: "#fc0000", ml: 1, fontSize: { xs: "48px", lg: "20px" } }}
        />
      </Box>
    </FancyBox>
  );
};

// Services Section Component
const ServicesSection: React.FC = () => {
  const services: ServiceCardProps[] = [
    { title: "Branding", description: "Your brand is your identity. Our expert branding solutions ensure memorable brand positioning, credibility, and impactful design.", imageUrl: Home.branding, route: "/services/branding-agency-in-hyderabad" },
    { title: "SMM", description: "Our engaging content strategies help businesses build strong community connections, boost engagement, and increase brand awareness.", imageUrl: Home.smmicon, route: "/services/social-media-marketing-agencies-hyderabad" },
    { title: "Pay-Per-Click (PPC)", description: "We execute data-driven PPC campaigns that guarantee amplified reach, optimized ad spend, and high-performing conversions.", imageUrl: Home.ppc, route: "/services/lead-generation-company-hyderabad" },
    { title: "SEO", description: "Rank higher on search engines with cutting-edge SEO services that ensure organic growth, targeted visibility, and sustainable digital dominance.", imageUrl: Home.seoicon, route: "/services/search-engine-optimization" },
  ];

  return (
    <Box sx={{  py: 1,  }}>
      <Container maxWidth="xl">
        <Box sx={{ py: 5 }}>
          <Box textAlign="center" mb={5}>
            <AnimatedText sx={{  }}> Digital Marketing Services</AnimatedText>
          </Box>
          <Grid container spacing={3} justifyContent="center">
            {services.map((service, index) => (
              <Grid item key={index} xs={12} md={3} lg={3}sx={{ display: "flex", width: "100%", mt: { xs: 8, lg: 0 }, }}>
                <ServiceCard {...service} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default ServicesSection;
