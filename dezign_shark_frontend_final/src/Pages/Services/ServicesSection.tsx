import React, { useEffect } from "react";
import { Box, Typography, IconButton, Container, useMediaQuery, useTheme, styled, Card } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Home } from "../../assets";
import { Swiper as SwiperInstance } from "swiper"; // Import Swiper type

// Define service type
interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string[];
  image: string;
}
const FancyBox = styled(Card)({
  position: "relative",
  // padding: "20px 25px",
  // border: "2px solid transparent",
  // backgroundColor: "#171717",
  // transition: "border 0.4s ease-in-out",
  // overflow: "hidden",
  // display: "flex",
  // flexDirection: "column",
  // justifyContent: "space-between",
  // height: "100%", // Ensure all cards have the same height
  // 

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

// Services Data
const services: Service[] = [
  {
    id: "Search Engine optimization",
    title: "Search Engine Optimization (SEO)",
    subtitle: "We drive engagement & credibility with data-driven social media strategies.",
    description: ["Social media profile optimization.", "Engaging content creation & campaign management."],
    image: Home.seoicon,
  },
  {
    id: "Web Designing Companies",
    title: "Website Design & Development",
    subtitle: "Transform Visitors into Customers with a Stunning Website",
    description: ["UX/UI-optimized website designs.", "SEO-friendly website structure."],
    image: Home.webicon,
  },
  {
    id: "Lead Generation Company Hyderabad",
    title: "Pay-Per-Click (PPC) Advertising",
    subtitle: "Our PPC campaigns drive leads & sales with Google Ads, Facebook Ads & retargeting.",
    description: ["A/B tested high-converting ad creatives.", "Data-driven bid management & audience segmentation."],
    image: Home.ppc,
  },
  {
    id: "Graphic Designing",
    title: "Graphic Designing",
    subtitle: "Make a bold visual impact with cutting-edge designs that capture attention.",
    description: ["SEO-optimized blogs & articles.", "Video scripts & infographics."],
    image: Home.contenticon,
  },
  {
    id: "Branding Agency in Hyderabad",
    title: "Creative Design & Branding",
    subtitle: "We craft creative designs for a strong, distinctive brand presence.",
    description: ["Logo design & complete brand identity.", "Website, social media & ad creatives"],
    image: Home.branding,
  },
  {
    id: "Social Media Marketing Agencies Hyderabad",
    title: "Social Media Optimization (SMO)",
    subtitle: "We drive engagement & credibility with data-driven social media strategies.",
    description: ["Social media profile optimization.", "Engaging content creation & campaign management."],
    image: Home.smmicon,
  },
];

// Animation Variants
const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const ServicesSection: React.FC = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg")); // Mobile detection

  const handleSlideChange = (swiper: SwiperInstance) => {
    const slides = swiper.slides;
    slides.forEach((slide: HTMLElement, index: number) => {
      if (index === swiper.activeIndex) {
        slide.style.transform = "translateZ(50px)"; // Move active slide forward
        slide.style.opacity = "1"; // Ensure active slide is fully visible
        slide.style.filter = "none"; // Remove blur effect
        slide.classList.add("active-slide"); // Add active class for FancyBox hover lines
      } else {
        slide.style.transform = "translateZ(-50px)"; // Move other slides backward
        slide.style.opacity = "0.8"; // Dim non-active slides
        slide.style.filter = "blur(1px)"; // Apply blur effect
        slide.classList.remove("active-slide"); // Remove active class
      }
    });
  };          

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <Box sx={{ pt: 10, pb: 10,   }}>
      <motion.div ref={ref} initial="hidden" animate={controls} variants={slideUp}>
        <Container maxWidth="xl">
          {/* Main Title */}
          <Typography variant="h1" color="#fff" fontWeight={800} textAlign="left" mb={5} sx={{}}>
            Services
          </Typography>

          {/* <AnimatedText sx={{ color: '#fff', textAlign: "left", mb: 5, fontSize: { xs: '5em', lg: '3.2em' } }}>
             Services
          </AnimatedText> */}

        </Container>
      </motion.div>

      <Box
        sx={{
          "& .swiper-pagination-bullet": {
            backgroundColor: "#a19b9b", // Default color for bullets
          },
          "& .swiper-pagination-bullet-active": {
            backgroundColor: "#fc0000", // Red color for active bullet
          },
        }}
      >
        <Swiper
          modules={[Pagination, Mousewheel, Autoplay]} // Added Autoplay module
          slidesPerView={2.5} // Default for desktop
          spaceBetween={20}
          centeredSlides={true}
          loop={true}
          mousewheel={{ invert: true }}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000, // Auto-slide every 3 seconds
            disableOnInteraction: false, // Do not disable autoplay on user interaction
            pauseOnMouseEnter: false, // Pause on hover set to false
          }}
          breakpoints={{
            0: { slidesPerView: 1 }, // ✅ Mobile: Show only 1 card
            768: { slidesPerView: 1 }, // ✅ Tablets: Show 1.5 cards
            1024: { slidesPerView: 2.5 }, // ✅ Larger screens: Show 2.5 cards
          }}
          style={{
            width: "100%",
            height: isMobile ? "500px" : "500px", // ✅ Responsive Swiper height
            cursor: 'none'
          }}
          onSlideChange={handleSlideChange} // Handle slide change
          onSwiper={(swiper: SwiperInstance) => handleSlideChange(swiper)} // Explicitly type swiper
        >
          {services.map((service) => (
            <SwiperSlide key={service.id} id={service.id} >
              <FancyBox elevation={3} className="fancybox-container" sx={{ border: "1px solid #444", width: "100%", cursor: "none !important", backgroundColor: "#171717", position: "relative", }} >
                <Box className="hover-lines"></Box>
                <motion.div
                  initial="hidden"
                  animate={controls}
                  variants={slideUp}
                  onClick={() => navigate(`/services/${service.id.toLowerCase().replace(/\s+/g, '-')}`)}
                  style={{
                    // height: "320px",
                    height: isMobile ? "450px" : "420px",
                    padding: "30px",
                    background: "#eeeeee",
                    borderRadius: "8px",
                    color: "black",
                    textAlign: "left",
                    transition: "0.3s",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    border: "2px solid transparent",
                    backgroundColor: "#171717",
                    boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.1)",
                    cursor: "none",
                  }}
                >
                  {/* Service Title, Subtitle, and Description List */}
                  <Box  >
                    {/* Title in flex */}
                    <Box display="flex" alignItems="center" gap={3} sx={{ mt: 1 }}>
                      <Box
                        sx={{
                          width: { xs: '100px', md: '100px', lg: '100px' },
                          height: { xs: '100px',md: '79px', lg: '100px' },
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          border: "3px solid #fc0000",
                          // backgroundColor: "rgba(255, 255, 255, 0.1)",
                          overflow: "hidden",
                          cursor: 'none'
                        }}
                      >
                        {/* <img src={service.image} alt={service.title} style={{ width: "60px", height: "60px" }} /> */}
                        <Box
                          component="img"
                          src={service.image}
                          alt="Best digital marketing services in Hyderabad"
                          sx={{
                            width: { xs: "60px",md: "40px", lg: "60px" }, // Image size responsive
                            height: { xs: "60px",md: "40px",  lg: "60px" },
                            filter: "brightness(0) invert(1)", // Makes image white
                          }}
                        />
                      </Box>
                      <Typography variant="h5" color="#fff" fontWeight={800}
                        // sx={{
                        //   fontSize: {
                        //     xs: '40px',
                        //     lg: '24px'
                        //   },
                        // }}
                      >
                        {service.title}
                      </Typography>
                    </Box>

                    <Typography variant="body1" color="#fff" fontWeight={500} my={2}
                      sx={{
                        // fontSize: {
                        //   xs: '36px',
                        //   lg: '22px'
                        // },
                      }}>
                      {service.subtitle}
                    </Typography>

                    {/* List with Circular Bullets */}
                    <Box component="ul" sx={{
                      padding: 0, listStyle: "none", margin: 0,
                    }}>
                      {service.description.map((point, i) => (
                        <Box component="li" key={i} sx={{
                          display: "flex", alignItems: "center", gap: {
                            xs: '15px',
                            lg: '10px'
                          }, mb: "8px", color: "#fff"
                        }}>
                          <Box sx={{
                            width: {
                              xs: '8px',
                              md: '8px',
                              lg: '8px'
                            },
                            height: {
                              xs: '8px',
                              md: '8px',
                              lg: '8px'
                            },
                            borderRadius: "50%",
                            backgroundColor: "white",
                            flexShrink: 0
                          }} />
                          <Typography variant="body2" sx={{
                            color: "#fff",
                            // fontSize: {
                            //   xs: '36px',
                            //   lg: '18px'
                            // }
                          }}>
                            {point}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  {/* Get Started Button */}
                  <Box display="flex" alignItems="center" onClick={() => navigate(`/services/${service.id.toLowerCase().replace(/\s+/g, '-')}`)} sx={{ cursor: "none" }}>
                    <Box sx={{
                      color: "white", 
                      // fontSize: {
                      //   xs: '34px',
                      //   lg: '16px'
                      // },
                       fontWeight: 500, cursor: 'none'
                    }}>Read More</Box>
                    <IconButton sx={{
                      color: "#fc0000", ml: 1, fontSize: {
                        xs: '2.5rem',
                        lg: '1.8rem'
                      }
                    }}>
                      <ArrowForward />
                    </IconButton>
                  </Box>
                </motion.div>
              </FancyBox>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default ServicesSection;
