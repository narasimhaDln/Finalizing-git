import React, { useEffect,  } from "react";
import { Box, Button, Container, GridLegacy as Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Home } from "../../assets";
import AnimatedText from "../../Components/Inputs/AnimatedText";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import EastIcon from '@mui/icons-material/East';


// Styled Content Box for Text Animation
const Content = styled(Box)({
  position: "absolute",
  right: "-1px",
  bottom: 3,
  padding: "15px 25px",
  maxWidth: "320px",
  backgroundColor: "#1e1e1e",
  color: "#fff",
  transformOrigin: "right",
  transform: "perspective(250px) rotateY(-90deg)",
  transition: "all 400ms ease-in-out",
  zIndex: 2,
});

const ImageContainer = styled(Box)({
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "hidden",

  "&:hover .content": {
    transform: "perspective(250px) rotateY(0deg)",
  },
});


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



const images = [
  { src: "https://dprstorage.b-cdn.net/dezignshark/brochure8.png" },
  { src: "https://dprstorage.b-cdn.net/dezignshark/brochure9.png" },
  { src: "https://dprstorage.b-cdn.net/dezignshark/brochure11.png" }, 
  { src: "https://dprstorage.b-cdn.net/dezignshark/brochure2.png" },
  { src: "https://dprstorage.b-cdn.net/dezignshark/brochure3.png" },
  { src: "https://dprstorage.b-cdn.net/dezignshark/brochure5.png" },

];

const Portfolio: React.FC = () => {



  // ✅ First column (All images with "type")
  const imagesFirstColumn = [
    { img1: "https://dprstorage.b-cdn.net/dezignshark/web1.png", img2: "https://dprstorage.b-cdn.net/dezignshark/web2.png", displacementImage: Home.imageeffect,  title: "Web Development" },
    { slider: [
        "https://dprstorage.b-cdn.net/dezignshark/newSMM-01.webp",
        "https://dprstorage.b-cdn.net/dezignshark/newSMM-02.webp",
        "https://dprstorage.b-cdn.net/dezignshark/newSMM-03.webp",
        "https://dprstorage.b-cdn.net/dezignshark/newSMM-04.webp",
        "https://dprstorage.b-cdn.net/dezignshark/newSMM-05.png",
        "https://dprstorage.b-cdn.net/dezignshark/newSMM-06.png",
        
      ], title: "" },
    { img1: "https://dprstorage.b-cdn.net/dezignshark/portfolio3.jpg", img2: "https://dprstorage.b-cdn.net/dezignshark/portfolio3.jpg", displacementImage: Home.imageeffect,title: "SEO Results" },
  ];

  // ✅ Second column (Video + Images)
  const videoSrc = "https://dprstorage.b-cdn.net/dezignshark/portfolio.mp4";
  const imagesSecondColumn = [
    { type: "video", src: videoSrc, width: "680px", height: "703px", title: "Reels" }, // Video
    { img1: "https://dprstorage.b-cdn.net/dezignshark/portfolio5.jpg", img2: "https://dprstorage.b-cdn.net/dezignshark/portfolio5.jpg", displacementImage: Home.imageeffect, title: "Branding" },
    { img1: "https://dprstorage.b-cdn.net/dezignshark/newportfolio6.webp", img2: "https://dprstorage.b-cdn.net/dezignshark/newportfolio6.webp", displacementImage: Home.imageeffect, title: " Hoardings" },
  ];




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

  const carouselSettings = {
    dots: true,
    dotsClass: "slick-dots custom-dots", // Custom class for dots
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    cssEase: "ease-in-out",
    pauseOnHover: false, // Disable pause on hover
    arrows: false, // Disable default arrows
  };

  return (
    <Box sx={{ py: 10, }}>
      <Container maxWidth="xl" sx={{ position: "relative", overflow: "hidden", }}>
        <Grid container spacing={4} sx={{ mb: 5,  }}>
          <Grid item xs={12} md={6} lg={6}>
            <Box sx={{ textAlign: { xs: "center", md: "left" }, }}>
              <AnimatedText> Unlock Powerful Growth with Dezign Shark</AnimatedText>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Typography variant="body1" color="white" sx={{ textAlign: 'left' }} data-aos="fade-left">
              At Dezign Shark, we go beyond traditional marketing—we craft high-impact, data-driven, and results-oriented digital marketing strategies that maximize ROI, amplify brand visibility, and accelerate business growth. Our 360-degree approach ensures your brand stands out in the competitive digital landscape with cutting-edge technology, creative excellence, and performance-driven campaigns. Ready to transform your digital presence? Let’s make it happen!
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={4} flexDirection="column" alignItems="center">


          {/* Image Grid */}
          <Grid item xs={12} md={12} lg={12}>
            <Grid container spacing={4}>
              {/* First Column */}
              <Grid item xs={12} md={6} lg={6}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
                  {imagesFirstColumn.map((item, idx) => (
                    item.slider && Array.isArray(item.slider) ? (
                      <Box key={idx} sx={{ width: '100%' }}>
                        <Slider {...carouselSettings}>
                          {item.slider.map((imgUrl, i) => (
                            <Box key={i} sx={{ position: 'relative' }}>
                              <Box
                                component="img"
                                src={imgUrl}
                                alt={`Slider Image ${i + 1}`}
                                sx={{ width: '100%', display: 'block' }}
                              />
                            </Box>
                          ))}
                        </Slider>
                        <Content className="content" sx={{ opacity: 1, transition: 'all 400ms ease-in-out', transform: 'perspective(250px) rotateY(0deg)' }}>
                          <Typography variant="h5">{item.title}</Typography>
                        </Content>
                      </Box>
                    ) : (
                      <Box
                        key={idx}
                        sx={{
                          position: 'relative',
                          overflow: 'hidden',
                          transition: 'all 0.3s ease-in-out',
                          '&:hover .hoverImg1': {
                            transform: 'translateX(-50%) scaleX(2)',
                            opacity: 0,
                            filter: 'blur(10px)',
                          },
                          '&:hover .hoverImg2': {
                            transform: 'translateX(0) scaleX(1)',
                            opacity: 1,
                            filter: 'blur(0)',
                          },
                          '&:hover .content': {
                            transform: 'perspective(250px) rotateY(0deg)',
                            opacity: 1,
                          },
                        }}
                      >
                        {/* Image 1 (default visible) */}
                        <Box
                          component="img"
                          src={item.img1}
                          alt="Image 1"
                          className="hoverImg1"
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            transition: 'all 0.9s ease',
                            transform: 'translateX(0) scaleX(1)',
                            opacity: 1,
                            filter: 'blur(0)',
                            zIndex: 1,
                          }}
                        />
                        {/* Image 2 (hover appears) */}
                        <Box
                          component="img"
                          src={item.img2}
                          alt="Image 2"
                          className="hoverImg2"
                          sx={{
                            width: '100%',
                            transition: 'all 0.9s ease',
                            transform: 'translateX(50%) scaleX(2)',
                            opacity: 0,
                            filter: 'blur(10px)',
                            zIndex: 2,
                          }}
                        />
                        <Content className="content" sx={{ opacity: 0, transition: 'all 400ms ease-in-out', transform: 'perspective(250px) rotateY(-90deg)' }}>
                          <Typography variant="h5">{item.title}</Typography>
                        </Content>
                      </Box>
                    )
                  ))}
                </Box>
              </Grid>

              {/* Second Column */}
              <Grid item xs={12} md={6} lg={6}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
                  {imagesSecondColumn.map((item, index) =>
                    item.type === "video" ? (
                      <ImageContainer
                        key={index}
                        sx={{
                          width: { xs: "100%", md: "45vw", lg: item.width }, // 100vw for mobile view, original width for desktop
                          height:  { xs: "100%", md: "45vw", lg: item.height }, // Original image height
                        }}
                      >
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        >
                          <source src={item.src} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        <Content className="content">
                          <Typography variant="h5">{item.title}</Typography> {/* Use the title property */}
                        </Content>
                      </ImageContainer>
                    ) : (
                      <Box
                      sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover .hoverImg1': {
                          transform: 'translateX(-50%) scaleX(2)',
                          opacity: 0,
                          filter: 'blur(10px)',
                        },
                        '&:hover .hoverImg2': {
                          transform: 'translateX(0) scaleX(1)',
                          opacity: 1,
                          filter: 'blur(0)',
                        },
                        '&:hover .content': {
                          transform: 'perspective(250px) rotateY(0deg)',
                          opacity: 1,
                        },
                      }}
                    >
                      {/* Image 1 (default visible) */}
                      <Box
                        component="img"
                        src={item.img1}
                        alt="Image 1"
                        className="hoverImg1"
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          transition: 'all 0.9s ease',
                          transform: 'translateX(0) scaleX(1)',
                          opacity: 1,
                          filter: 'blur(0)',
                          zIndex: 1,
                        }}
                      />
                       <Content className="content" sx={{ opacity: 0, transition: 'all 400ms ease-in-out', transform: 'perspective(250px) rotateY(-90deg)' }}>
                          <Typography variant="h5">{item.title}</Typography> {/* Use the title property */}
                        </Content>
                      {/* Image 2 (hover appears) */}
                      <Box
                        component="img"
                        src={item.img2}
                        alt="Image 2"
                        className="hoverImg2"
                        sx={{
                          width: '100%',
                          transition: 'all 0.9s ease',
                          transform: 'translateX(50%) scaleX(2)',
                          opacity: 0,
                          filter: 'blur(10px)',
                          zIndex: 2,
                        }}
                      />
                      
                    </Box>
                    )
                  )}
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Third Column: Carousel */}
          <Grid item xs={12}>
            <Box
              sx={{
                maxWidth: "100%",
                margin: "auto",
                overflow: "hidden",
                position: "relative",
                paddingBottom: "40px", // Add space for dots below the slider
              }}
            >
              <Slider {...carouselSettings}>
                {images.map((img, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: "relative",
                      animation: "animate 2s ease-in-out",
                    }}
                  >
                    <Box
                      component="img"
                      src={img.src}
                      alt="Top digital marketing agency offering SEO and PPC services"
                      sx={{
                        width: "100%",
                        display: "block",

                      }}
                    />

                  </Box>
                ))}
              </Slider>
              <style>
                {`
                  @keyframes animate {
                    from {
                      transform: scale(1.1) rotateY(10deg);
                    }
                    to {
                      transform: scale(1) rotateY(0deg);
                    }
                  }
                  .slick-dots.custom-dots {
                    position: absolute;
                    bottom: -40px; /* Position dots below the slider */
                    display: flex !important;
                    justify-content: center;
                    width: 100%;
                  }
                  .slick-dots.custom-dots li {
                    margin: 0px 5px;
                  }
                  .slick-dots.custom-dots li button:before {
                    font-size: 14px;
                    color: rgba(173, 216, 230, 0.5); /* Default dot color */
                  }
                  .slick-dots.custom-dots li.slick-active button:before {
                    color: red; /* Active dot color */
                  }
                `}
              </style>
            </Box>
          </Grid>
        </Grid>
        <StyledButton
          onClick={() => window.location.href = "https://portfolio.dezignshark.com/folders"} // Navigate to the specified URL
          sx={{
            width: "100%", // Full width within the container
            maxWidth: "1400px", // Ensure it doesn't exceed the container's max width
            height: { xs: '55px', md: '55px', lg: '55px' },
            // fontSize: { xs: "2.2rem", lg: "1.4rem" },
            mt: { xs: 5, lg: 4 },
            mx: "auto", // Center the button horizontally
          }}
        >
          Click to View Our Works
          <ArrowContainer className="btn-arrow-hover">
            <EastIcon className="arrow-first" sx={{ fontSize: { xs: '20px', lg: '20px ' } }} />
            <EastIcon className="arrow-second" sx={{ fontSize: { xs: '20px', lg: '20px ' } }} />
          </ArrowContainer>
        </StyledButton>
      </Container><style>
        {`
          @keyframes animate {
            from {
              transform: scale(1.1) rotateY(10deg);
            }
            to {
              transform: scale(1) rotateY(0deg);
            }
          }
          .slick-dots li button:before {
            font-size: 14px;
            color: rgba(173, 216, 230, 0.5);
          }
          .slick-dots li.slick-active button:before {
            color: rgba(173, 216, 230, 0.9);
          }
        `}
      </style>

    </Box>
  );
};

export default Portfolio;
