import React from "react";
import Slider from "react-slick";
import { Box, Typography, Container, Card, CardMedia, CardContent, styled, Button } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AnimatedText from "../../Components/Inputs/AnimatedText";
import { useNavigate } from "react-router-dom";
import { blogData } from "../Blog/BlogDetails/BlogData"; // Import blogData
import EastIcon from '@mui/icons-material/East';



const StyledButton = styled(Button)({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  background: "transparent !important", // 🔥 Fully Transparent Background
  color: "white !important", // White text always
  border: "1px solid #fff",
  padding: "20px 35px",
  borderRadius: "10px",
  letterSpacing: "0.005em",
  
  overflow: "hidden",
  transition: "all 0.3s ease-out",
  fontSize: "1.2rem",

  "&:hover": {
    background: "transparent !important", // Slight hover effect
    border: "1px solid #fff !important",
  },

  "&:active": {
    background: "transparent !important", // Ensure it stays transparent on click
    color: "white !important",
  },

  "&:hover .btn-arrow-hover .arrow-first": {
    transform: "translateX(200%) translateY(-200%) translateZ(0)",
  },
  "&:hover .btn-arrow-hover .arrow-second": {
    transform: "translateX(0) translateY(0) translateZ(0)",
  },
});

// Arrow Container
const ArrowContainer = styled(Box)({
  position: "relative",
  overflow: "hidden",
  display: "inline-flex",
  width: "20px",
  height: "20px",
});

const BlogCarousel: React.FC = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle navigation with formatted title
  const handleNavigation = (title: string) => {
    const formattedTitle =   title.toLowerCase()
  .replace(/[|/:]/g, "")
  .replace(/\s+/g, "-")
  .replace(/-+$/, "");
  
    navigate(`/blog/${formattedTitle}`);
  };

  // Slick slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Show exactly 2 slides
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    centerMode: false, // Prevents partial slides from showing
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth='xl'>
        {/* Section Heading */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <AnimatedText >
            Latest Blog
          </AnimatedText>
        </Box>

        {/* Slick Slider Carousel */}
        <Box sx={{}}> {/* Negative margin ensures consistent spacing */}
          <Slider {...sliderSettings}>
            {blogData.map((blog) => (
              <Box key={blog.id} > {/* Adds gap between slides */}
                <Card
                  className="shine-overlay"
                  sx={{
                    borderRadius: "15px",
                    overflow: "hidden",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    position: "relative",
                    transition: "transform 0.4s ease",
                    height: { xs: '550px', md: "500px",lg: "550px" }, // Fixed height for all cards
                    display: "flex",
                    flexDirection: "column", // Ensure content stacks vertically
                    "&:hover .image": {
                      transform: "scale(1.1)",
                    },
                    "&:hover .shine": {
                      animation: "shineAnimation 0.75s linear",
                      display: "block",
                    },
                    backgroundColor: "transparent",
                  }}
                  onClick={() => handleNavigation(blog.title)} // Use handleNavigation
                >
                  {/* Blog Image with Hover Animation */}
                  <Box sx={{ position: "relative", overflow: "hidden", height: "100%" }}> {/* Fixed height for image container */}
                    <CardMedia
                      component="img"
                      image={blog.image}
                      alt="Top digital marketing agency offering SEO and PPC services" // Use blog title as alt text
                      className="image"
                      sx={{
                        width: "100%",
                        height: "100%", // Ensure consistent height for images
                        objectFit: "cover", // Ensure images fit properly
                        transition: "all 0.4s ease",

                      }}
                    />

                    {/* Shine Effect */}
                    <Box
                      className="shine"
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%)",
                        transform: "skewX(-30deg)",
                        opacity: 0,
                        pointerEvents: "none",
                        zIndex: 3,
                        display: "none",
                      }}
                    />
                  </Box>

                  {/* Blog Content */}
                  <CardContent sx={{
                    backgroundColor: "transparent",
                    padding: "20px",
                    border: "1px solid #3c3c3c", // Adds a border to the CardContent
                    borderTop: "none", // Removes border from the top
                    borderBottomLeftRadius: "15px", // Rounds bottom-left corner
                    borderBottomRightRadius: "15px", // Rounds bottom-right corner
                    height: "40%", // Fixed height for content
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center", // Center content vertically
                    py: 5
                  }}>
                    <Typography variant="h6" sx={{ color: "#fff", mb: 1, textAlign: 'left',  }}>
                      By <strong style={{ color: "#fc0000", }}>{blog.author.name}</strong>
                    </Typography>
                    <AnimatedText sx={{ fontWeight: "bold", mt: 1, color: 'white', fontSize: { xs: '18px', md: '20px',lg: '24px' },textAlign:'left' }}>
                      {blog.title}
                    </AnimatedText>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Slider>
        </Box>

        <StyledButton
               onClick={() => navigate("/blog")}
              sx={{
                width: "100%", // Full width within the container
                maxWidth: "1400px", // Ensure it doesn't exceed the container's max width
                height: { xs: '55px', md: '55px', lg: '55px' },
                // fontSize: { xs: "2.2rem", lg: "1.4rem" },
                mt: { xs: 5, lg: 8,md:5 },
                mx: "auto", // Center the button horizontally
              }}
            >
              More Blogs
              <ArrowContainer className="btn-arrow-hover"
              sx={{
                width: { xs: '20px', md: '20px ',lg: '20px ' },
                height: { xs: '20px', md: '20px ',lg: '20px ' },
               }}
              >
                <EastIcon className="arrow-first" sx={{ fontSize: { xs: '48px', lg: '20px ' } }} />
                <EastIcon className="arrow-second" sx={{ fontSize: { xs: '48px', lg: '20px ' } }} />
              </ArrowContainer>
            </StyledButton>
      </Container>

      {/* Keyframes for Shine Effect */}
      <style>
        {`
          @keyframes shineAnimation {
            0% {
              left: -100%;
              opacity: 0;
            }
            50% {
              left: 50%;
              opacity: 0.5;
            }
            100% {
              left: 100%;
              opacity: 0;
            }
          }

          /* Ensures proper spacing between slides */
          .slick-slide > div {
            margin: 0 10px; /* Adjust margin to increase/decrease gap */
          }

          /* Fix alignment issues */
          .slick-list {
            margin: 0 -10px; /* Counteracts extra margin on slides */
          }
        `}
      </style>
    </Box>
  );
};

export default BlogCarousel;
