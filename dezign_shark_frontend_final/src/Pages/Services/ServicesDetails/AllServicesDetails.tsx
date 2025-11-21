import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ✅ Use `useParams`
import {
  Container,
  GridLegacy as Grid,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Stack,

} from "@mui/material";
import { styled } from "@mui/system";
import { pageData } from "./data";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import gsap from "gsap";
import DownloadSection from "./DownloadSection ";
import { FaCircle } from "react-icons/fa6";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AnimatedText from "../../../Components/Inputs/AnimatedText";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EastIcon from '@mui/icons-material/East';
import { shark } from "../../../assets";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet-async";
import ProjectForm from "./ProjectForm";


// Styled Components
const MainContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "relative",
 
  color: "#fff",
});

const Divider = styled(Box)({
  width: "100%",
  height: "1px",
  backgroundColor: "#BBBBBB",
  marginTop: "10px",
});

const CircleWrapper = styled(Box)({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "200px",
  height: "200px",
  borderRadius: "50%",
  background: 'black',
  border: "1px solid rgba(94, 94, 94, 0.18)",
  color: 'white'
});

const RotatingTextContainer = styled(Box)({
  position: "absolute",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const RotatingLetter = styled(Typography)({
  position: "absolute",
  fontSize: "5px",
  transformOrigin: "center",
  textTransform: "uppercase",
  fontWeight: 600,
  letterSpacing: '1px',
  color: 'white'
});

// Services list extracted from JSON
// const services = pageData.map((item) => item.id);
const formatServiceId = (id: string) => id.toLowerCase().replace(/\s+/g, "-");


const ServicesDetails = () => {
  const { serviceId } = useParams(); // ✅ Get `serviceId` from URL
  const navigate = useNavigate();
  const rotatingTextRef = useRef(null);
  const [expanded, setExpanded] = useState<number | false>(0);



  // ✅ Find the correct service based on the `serviceId`
  // const selectedData = pageData.find((item) => item.id === serviceId) || pageData[0];
  // const { marketStrategy, businessSections, faqData } = selectedData;

  const selectedData = pageData.find((item) => formatServiceId(item.id) === formatServiceId(serviceId || "")) || pageData[0];
  const { marketStrategy, businessSections, faqData, metaData } = selectedData;

  // GSAP Animation for Rotating Text
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

  // Handle Accordion Expansion
  const handleAccordionChange = (panel: number) => {
    setExpanded(expanded === panel ? false : panel);
  };

  // ✅ Update URL properly using `navigate`
  // const handleServiceClick = (service: string) => {
  //   navigate(`/services/${service}`); // Updates the route, triggering a re-render
  // };

  const handleServiceClick = (service: string) => {
    navigate(`/services/${formatServiceId(service)}`);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: false
  };


  return (
    <Box sx={{ background: "white" }}>
      <Helmet>
        <title>{metaData.metaTitle}</title>
        <meta name="description" content={metaData.metaDescription} />
        <meta name="keywords" content={metaData.metaKeywords} />

      </Helmet>
      <MainContainer sx={{padding: { xs: "50px 20px", md: "40px 40px", lg: "50px 50px" } }}>
        <Box  width="100%" sx={{pt:{xs:1,md:8,lg:8}  }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item lg={8} md={12} xs={12}>

              <AnimatedText sx={{ color: "#ad0505", fontWeight: 700, textAlign: "left", mb: 4, mt: { xs: 5, md: 0 ,lg: 0} }}>

                {marketStrategy.title}
              </AnimatedText>
              <Divider />
              {/* <Typography sx={{ color: "#74787C", textAlign: "left",mt:3 }}>
                {marketStrategy.description}
              </Typography> */}

              <Typography variant="h1" sx={{ color: "#ad0505", fontWeight: 700, textAlign: "left", mt: 3, mb: { xs: 4, lg: 0 },}}>
                {marketStrategy.subtitle}
              </Typography>

              {Array.isArray(marketStrategy?.description)
                ? marketStrategy.description.map((paragraph, index) => (
                  <Typography
                    key={index}
                    sx={{
                      color: "#000", textAlign: "justify", mt: index === 0 ? 3 : 2,
                      
                    }}
                    data-aos="fade-down"


                  >
                    {paragraph}
                  </Typography>
                ))
                : (
                  <Typography variant="body1" sx={{
                    color: "#000", textAlign: "justify", mt: 1,
                    // fontSize: {
                    //   xs: '17px',
                    //   lg: '18px'
                    // },
                  }} data-aos="fade-down">
                    {marketStrategy?.description ?? "No description available"}
                  </Typography>
                )
              }



              <Box mt={5} data-aos="fade-down">
                {marketStrategy.checklist.map((item, index) => (
                  <Stack key={index} direction="row" spacing={2} alignItems="start">
                    {/* MUI Check Icon */}
                    <CheckCircleIcon sx={{ color: "#000", fontSize: { xs: "22px",md: "20px", lg: "20px" } }} />
                    {/* Checklist Item */}
                    <Typography
                    variant="body1"
                      sx={{
                        color: "#000",
                        // fontSize: { xs: "36px", lg: "18px" }, // Responsive font size
                        textAlign: 'left'
                      }}
                    >
                      {item}
                    </Typography>
                  </Stack>
                ))}
              </Box>

            </Grid>
            <Grid item lg={4} md={4} xs={12} sx={{ display: { xs: "none", lg: 'flex' } }} justifyContent="center">
              <CircleWrapper className="circle-spin">
                <RotatingTextContainer ref={rotatingTextRef}>
                  {marketStrategy.rotatingText.split("").map((char, index) => {
                    const angle = (index / marketStrategy.rotatingText.length) * 360;
                    const radius = 80;
                    return (
                      <RotatingLetter key={index}
                        style={{
                          transform: `translate(${radius * Math.cos((angle * Math.PI) / 180)}px, 
                   ${radius * Math.sin((angle * Math.PI) / 180)}px) rotate(${angle}deg)`,
                          fontSize: '12px',
                        }}
                      >
                        {char}
                      </RotatingLetter>
                    );
                  })}
                </RotatingTextContainer>
                <img
                  src={shark}
                  alt="Top digital marketing agency offering SEO and PPC services"
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
              </CircleWrapper>
            </Grid>
          </Grid>
        </Box>
      </MainContainer>

      <Box>

        <Grid container >
          {/* Business Sections */}
          <Grid item xs={12} md={8} lg={9}>
            <Container maxWidth="xl" sx={{}}>
              <Box sx={{ }}>

                <CardMedia component="img" image={businessSections.images.service1} alt="Business Section" />
                <CardContent>
                  {/* <Typography variant="h3" sx={{ color: "black", fontWeight: 700, mb: 4, textAlign: 'left', }}>{businessSections.title}</Typography> */}

                  <AnimatedText sx={{
                    color: "#ad0505", fontWeight: 700, mb: 4, textAlign: 'left', 
                    // fontSize: {
                    //   xs: '44px',
                    //   lg: '40px'
                    // },
                    mt: { xs: 3, lg: 0 }
                  }}>
                    {businessSections.title}
                  </AnimatedText>

                  <Typography variant="body1" paragraph sx={{
                    color: "#000", textAlign: 'justify', 
                    // fontSize: {
                    //   xs: '18px',
                    //   lg: '18px'
                    // }

                  }}
                    data-aos="fade-left"
                  >{businessSections.description}</Typography>



                </CardContent>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={12} lg={4} data-aos="fade-down">
                    {businessSections.servicesList.map((service, index) => (
                      <Box key={index} sx={{ display: "flex", alignItems: "center", justifyContent: 'start', gap: 2, mt: 1 }}>
                        <FaCircle style={{ color: "#000", fontSize: "8px", marginRight: '5px' }} />
                        <Typography sx={{
                          color: "#000", textAlign: 'left',
                          //  fontSize: {
                          //   xs: '36px',
                          //   lg: '18px'
                          // }
                        }} >{service}</Typography>
                      </Box>
                    ))}
                  </Grid>
                  <Grid item xs={12} md={12} lg={8}>
                    <Typography fontWeight="bold"
                      sx={{
                        color: "#000",

                        borderBottom: "2px solid black",
                        pb: 1,
                        width: {
                          xs: 'auto',
                          lg: "fit-content"
                        },
                        // fontSize: {
                        //   xs: '34px',
                        //   lg: '18px'
                        // },
                        mt: { xs: 3, lg: 0 }

                      }}>
                      {businessSections.challenge.title}
                    </Typography>
                    <Typography sx={{
                      color: "#000", mt: { xs: 5, lg: 2 }, textAlign: "justify", 
                      // fontSize: {
                      //   xs: '18px',
                      //   lg: '18px'
                      // }
                    }}
                      data-aos="fade-down"
                    >{businessSections.challenge.description}</Typography>
                    <Typography sx={{
                      color: "#000", textAlign: "left", 
                      // fontSize: {
                      //   xs: '18px',
                      //   lg: '18px'
                      // },
                      mt: { xs: 4, lg: 0 }
                    }}>{businessSections.challenge.solution}</Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2} mt={4}>
                  <Grid item xs={12} lg={12}>
                    <CardMedia component="img" image={businessSections.images.service2} /></Grid>
                  {/* <Grid item xs={12}><CardMedia component="img" image={businessSections.images.service3} /></Grid> */}

                  <Grid item xs={12} md={12} sx={{ mx: "auto" }}>
                    {businessSections.images?.sliderImages && businessSections.images.sliderImages.length > 0 ? (
                      <Slider {...sliderSettings}>
                        {businessSections.images.sliderImages.map((image: string, index: number) => (
                          <CardMedia
                            key={index}
                            component="img"
                            image={image}
                            alt="Top digital marketing agency offering SEO and PPC services"
                            sx={{ width: "100%", height: "auto", }}
                          />
                        ))}
                      </Slider>
                    ) : (
                      <Typography variant="h6" sx={{ color: "gray", textAlign: "center", mt: 2 }}>

                      </Typography>
                    )}
                  </Grid>
                </Grid>

                {/* Feedback Management Below Images */}
                <CardContent>
                  {/* <Typography variant="h4" fontWeight="bold" sx={{ color: "black", mt: 3, textAlign: "left", fontSize: {
                        xs: '44px',
                        lg: '40px'
                      }}}></Typography> */}
                  <AnimatedText sx={{
                    color: "#ad0505", mt: 3, textAlign: "left", 
                    // fontSize: {
                    //   xs: '44px',
                    //   lg: '40px'
                    // }
                  }}>
                    {businessSections.feedback.title}
                  </AnimatedText>
                  <Typography sx={{
                    color: "#000", mt: { xs: 4, lg: 2 }, textAlign: "justify",
                    //  fontSize: {
                    //   xs: '16px',
                    //   lg: '18px'
                    // }
                  }} > {businessSections.feedback.challenge}</Typography>
                  <Typography variant="h4" fontWeight="bold" sx={{ color: "black", mt: 3, textAlign: "left" }}>{businessSections.feedback.title2}</Typography>
                  <Grid item xs={12} md={12}>
                    {businessSections.feedback.points?.map((point, index) => (
                      <Box key={index} sx={{ display: "flex", alignItems: "center", justifyContent: 'start', gap: 2, mt: 1 }}>
                        <FaCircle style={{ color: "#000", fontSize: "8px", marginRight: '5px' }} />
                        <Typography sx={{
                          color: "#000", textAlign: 'left', 
                          // fontSize: {
                          //   xs: '36px',
                          //   lg: '18px'
                          // }
                        }} >
                          {point}
                        </Typography>
                      </Box>
                    ))}
                  </Grid>
                  <Typography sx={{
                    color: "#000", mt: { xs: 4, lg: 2 }, textAlign: "justify",
                    //  fontSize: {
                    //   xs: '17px',
                    //   lg: '18px'
                    // },
                    fontWeight: 600
                  }}> {businessSections.feedback.solution}</Typography>
                </CardContent>

                <Box mt={6}>
                  <Grid container spacing={2} alignItems="start">
                    {/* Left Side - Image */}
                    <Grid item xs={12} lg={6}>
                      <img
                        src={faqData.image}
                        alt="Top digital marketing agency offering SEO and PPC services"
                        style={{ width: "100%", borderRadius: "10px" }}
                      />
                    </Grid>

                    {/* Right Side - FAQ */}
                    <Grid item xs={12} lg={6}>
                      {/* <Typography variant="h3" fontWeight={700} gutterBottom color="black" sx={{
                          textAlign: "left", mb: 3,
                          fontSize: {
                            xs: '46px',
                            lg: '36px'
                          }
                        }}>
                          {faqData.title}
                        </Typography> */}
                      <AnimatedText sx={{
                        textAlign: "center", mb: 3,
                        // fontSize: {
                        //   xs: '46px',
                        //   lg: '36px'
                        // },
                         color: '#ad0505', mt: { xs: 5, lg: 0 }
                      }}>
                        {faqData.title}
                      </AnimatedText>
                      <Divider />

                      <Box mt={1}>
                        {faqData.questions.map((faq, index) => (
                          <Box key={index}>
                            <Accordion
                              expanded={expanded === index}
                              onChange={() => handleAccordionChange(index)}
                              sx={{ boxShadow: "none" }}
                            >
                              <AccordionSummary
                                expandIcon={expanded === index ? <RemoveIcon /> : <AddIcon />}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                {/* Question & Icon Side by Side */}
                                <Box sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between" }}>
                                  <Typography
                                    variant="body1"
                                    color="black"
                                    sx={{
                                      textAlign: "left",
                                      // fontSize: { xs: "38px", lg: "18px" },
                                      flexGrow: 1, // Makes sure text takes available space
                                      fontWeight: 600
                                    }}
                                  >
                                    {faq.question}
                                  </Typography>
                                </Box>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography
                                  variant="body2"
                                  color="#000"
                                  sx={{
                                    textAlign: "justify",
                                    // fontSize: { xs: "30px", lg: "16px" }, // Ensure consistent font size
                                  }}
                                >
                                  {faq.answer}
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            {/* Divider below every FAQ */}
                            <Divider />
                          </Box>
                        ))}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>



            </Container>
          </Grid>

          {/* Right Side: Services List */}
          <Grid item xs={12} md={4} lg={3} sx={{ mt: { xs: 5,md: 5 , lg: 0 } }}>
            <Container maxWidth="xl">
              <Box sx={{ p: 2, border: "1px solid #ddd" }}>
                {/* <Typography variant="h5" fontWeight="bold" gutterBottom color="black" sx={{ mb: { xs: 5, lg: 0 } }}>
                    All Services
                  </Typography> */}
                <AnimatedText sx={{ mb: { xs: 4,md: 3,  lg: 3 }, mt: { xs: 3,md: 3 ,  lg: 0 }, color: 'black', fontSize: { xs: "14px",md:"24px", lg: "24px" }
                 }}>
                  All Services
                </AnimatedText>
                {pageData.map((service, index) => (
                  <Card
                    key={index}
                    sx={{
                      mb: {
                        xs: 3,
                        md: 1,
                        lg: 1
                      },
                      boxShadow: 0,
                      border: "1px solid #eee",

                      // backgroundColor: serviceId === service ? "#000" : "transparent",
                      backgroundColor: formatServiceId(serviceId || "") === formatServiceId(service.id) ? "#000" : "transparent",
                    }}
                    // onClick={() => handleServiceClick(service)}
                    onClick={() => handleServiceClick(service.id)}
                  >
                    <CardActionArea sx={{ display: "flex", justifyContent: "space-between", p: { xs: '12px',md: '12px', lg: '12px' } }}>
                      <Typography variant="body1"
                        //  sx={{ color: serviceId === service ? "#fff" : "#000" }}
                        sx={{
                          color: formatServiceId(serviceId || "") === formatServiceId(service.id) ? "#fff" : "#000", textAlign: 'left',
                          // fontSize: {
                          //   xs: '38px',
                          //   lg: '18px'
                          // }
                        }}
                      >
                        {service.marketStrategy.title}
                      </Typography>
                      {/* <GoArrowRight style={{ fontSize: {xs:'38px',lg:'12px'} }} color={formatServiceId(serviceId || "") === formatServiceId(service.id) ? "#fff" : "#000"} /> */}
                      <EastIcon
                        sx={{
                          fontSize: { xs: '12px',md: '12px', lg: "12px" },
                          color: formatServiceId(serviceId || "") === formatServiceId(service.id) ? "#fff" : "#000", // Correct way
                        }}
                      />

                    </CardActionArea>
                  </Card>
                ))}
              </Box>
            </Container>
            <DownloadSection />
            <ProjectForm />
          </Grid>
        </Grid>
      </Box>

    </Box>
  );
};

export default ServicesDetails;
