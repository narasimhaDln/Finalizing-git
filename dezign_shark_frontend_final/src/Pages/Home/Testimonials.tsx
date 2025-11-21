import React, { useRef } from "react";
import { Box, Typography, IconButton, Container, GridLegacy as Grid, Paper } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HiArrowSmallRight, HiArrowSmallLeft } from "react-icons/hi2";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { Home } from "../../assets"; // Ensure correct import
import AnimatedText from "../../Components/Inputs/AnimatedText";
// import Animated from "../About/Clients";


const testimonials = [
  {
    name: "Jagadeesh Regulavalasa",
    feedback: "Their strategies helped me enhance my online presence, boost engagement, and drive quality leads to my business. A professional and results-driven team—I highly recommend them for anyone looking to grow their brand online. And it is a one-stop solution for all branding services that helps to generate leads and significant growth in any business",
  },
  {
    name: "Karthik Reddy",
    feedback: "We’ve had an amazing experience with Dezign Shark. They don’t just provide services—they truly partner with you to understand your business goals. Their insights and expertise have been invaluable for our growth. Highly recommend them to anyone searching for top-notch digital marketing in Hyderabad.",
  },
  {
    name: "Rohan Mehta",
    feedback: "The team at Dezign Shark is incredibly talented and supportive. They guided us through every step of our SEO and lead generation strategies, ensuring we got excellent results. Their content marketing is top-notch, and the web development they provided is clean and efficient. I also appreciate their innovative approach to real estate marketing and brand strategies. Hands down, the best digital marketing agency in Hyderabad!",
  },
  {
    name: "Srinivas Pragada",
    feedback: "Dezign Shark provides outstanding services in SEO, lead generation, content marketing, and more. Their web development and app development skills are unparalleled. As the best digital marketing agency in Hyderabad, they also specialize in real estate marketing and innovative brand strategies.",
  },
];

const Testimonials: React.FC = () => {
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // 2 cards per row
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false, // Disabled default arrows
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1080,
        settings: { slidesToShow: 1, slidesToScroll: 1 }, // 1 card per row on smaller screens
      },
    ],
  };

  return (
    <Box sx={{ py: 4, position: "relative" }}>
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={12} lg={5} sx={{ mb: 5, textAlign: "left", px: { xs: '3px', lg: '0' } }}>

            <AnimatedText sx={{ mb: { xs: 3, lg: 1 } }} >
              CLIENTS SPEAKS
            </AnimatedText>

          </Grid>

        </Grid>
        {/* Title */}

        {/* Arrows Below Title */}
        <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 4, px: { xs: '3px', lg: '0' } }}>
          <IconButton
            onClick={() => sliderRef.current?.slickPrev()}
            sx={{
              border: "1px solid #3A3A3A",
              "&:hover": { backgroundColor: "#1E1E1E" },
              color: "#fff",
              mr: 2,
            }}
          >
            <HiArrowSmallLeft style={{ fontSize: "35px" }} />
          </IconButton>
          <IconButton
            onClick={() => sliderRef.current?.slickNext()}
            sx={{
              border: "1px solid #3A3A3A",
              "&:hover": { backgroundColor: "#1E1E1E" },
              color: "#fff",
            }}
          >
            <HiArrowSmallRight style={{ fontSize: "35px" }} />
          </IconButton>
        </Box>

        {/* Testimonial Slider */}
        <Slider ref={(slider) => { sliderRef.current = slider; }} {...settings}>
          {testimonials.map((item, index) => (
            <Grid key={index} item xs={12} md={6} lg={6} sx={{ }}>
              <Paper
                sx={{
                  position: "relative",
                  padding: {xs:"60px 40px 65px",md:"100px 40px 65px",lg:"100px 40px 65px"},
                  background: "#1E1E1E",
                  borderRadius: "20px",
                  color: "#fff",
                  textAlign: "left",
                  border: "1px solid #3A3A3A",
                  margin: {xs:"0 15px",md:"0 25px",lg:"0 35px"},
                  height: {
                    xs: '505px',
                    md: '500px',
                    lg: '500px'
                  },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly'
                }}
              >
                {/* Background Image Instead of Quote Icon */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "25px",
                    left: {xs:'-15px',md:"-15px",lg:"-24px"},
                    backgroundImage: `url(${Home.testi})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: {xs:'102.5px',md:"137.5px",lg:"137.5px"},
                    height:  {xs:'70px',md:"88px",lg:"88px"},
                    borderRadius: "20px",
                    display: "flex",   
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FormatQuoteIcon sx={{ fontSize: "40px", color: "#fff" }} />
                </Box>

                {/* Testimonial Text */}
                <Typography variant="h6" sx={{ fontWeight: 400, lineHeight: { xs: '1.5em', lg: '1.5em' }, mb: 4, mt: { xs: 5, lg: 3 } }}>
                  {item.feedback}
                </Typography>

                {/* User Info */}
                {/* <Box sx={{ pt: 2, borderTop: "1px solid #3A3A3A" }}>
                  <Typography variant="h6" sx={{ fontWeight: 600,  color: "#fc0000" ,textAlign:'right'}}>
                    {item.name}
                  </Typography>

                </Box> */}
                <Box
                  sx={{
                    pt: 2,
                    borderTop: "1px solid #3A3A3A",
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    right: "auto",
                    bottom: 20,
                    width: "90%",
                    background: "transparent",
                    px: 4,
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, color: "#fc0000", textAlign: 'right' }}>
                    {item.name}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Slider>
      </Container>
    </Box>
  );
};

export default Testimonials;
