import { useEffect } from 'react';
import {
  GridLegacy as Grid,
  Typography,
  Card,
  CardMedia,
  Box,
  Container,
} from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import AnimatedText from '../../Components/Inputs/AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: 'ease-in-out', // Smooth animation
      offset: 100, // Trigger animations earlier/later
      once: false, // Allows re-triggering when scrolling up
      mirror: true, // ✅ Ensures animations work when scrolling up
    });

    // Refresh AOS when page content updates
    AOS.refresh();
  }, []);
  return (
    <Box>
      <Container
        maxWidth="xl"
        sx={{ p: { xs: 'auto', md: 4, lg: 0 }, py: { xs: 0, md: 5, lg: 5 } }}
      >
        <Box sx={{ color: 'white', position: 'relative', overflow: 'visible' }}>
          <Grid container spacing={4}>
            {/* Left Section - about2 Image */}
            <Grid
              item
              xs={12}
              md={6}
              lg={6}
              sx={{
                position: 'relative',
                overflow: 'visible',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <Card
                sx={{
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  overflow: 'visible',
                }}
              >
                <CardMedia
                  component="img"
                  image="https://drstorage.b-cdn.net/dezignshark/home-about.png"
                  alt="Top digital marketing agency offering SEO and PPC services"
                  sx={{
                    position: 'relative',
                    display: {
                      lg: 'inline',
                      md: 'inline',
                      xs: 'none',
                    },
                  }}
                />
              </Card>
            </Grid>

            {/* Right Section - ABOUT Text */}
            <Grid
              item
              xs={12}
              md={6}
              lg={6}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography
                // ref={aboutRef}
                variant="h2"
                fontWeight="bold"
                sx={{
                  textAlign: 'left',
                  fontSize: { lg: '110px', md: '90px', xs: '50px' },
                  lineHeight: '120px',
                  color: '#937171',
                  whiteSpace: 'nowrap',
                  // display: {
                  //     lg: 'inline',
                  //     xs: 'none'
                  // },
                  mb: { lg: 1, md: 'auto', xs: '0' },
                }}
                data-aos="fade-down"
              >
                ABOUT US
              </Typography>

              <Typography variant="h1">
                <AnimatedText
                  sx={{
                    fontSize: { xs: '24px', md: '1.0em', lg: '1.0em' },
                    textAlign: 'left',
                    mt: { lg: 3, md: 'auto', xs: '0' },
                  }}
                >
                  Dezign Shark – Powering Brands with High-Impact Digital
                  Marketing
                </AnimatedText>
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  mt: { xs: 4, lg: 2 },
                  // fontSize: { xs: "24px", lg: '1.3em' },
                  maxWidth: { xs: '100%', lg: '600px' },
                  textAlign: 'justify',
                  fontWeight: 600,
                }}
                data-aos="fade-left"
              >
                Drive Business Growth with Dezign Shark – A Results-Driven
                Digital Marketing Agency
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: { xs: 4, lg: 2 },
                  // fontSize: { xs: "18px", lg: '1em' },
                  maxWidth: { xs: '100%', lg: '600px' },
                  textAlign: 'justify',
                }}
                data-aos="fade-left"
              >
                At Dezign Shark, we don’t just market—we create powerful,
                high-impact digital marketing strategies that fuel brand growth
                and maximize ROI. As a top digital marketing agency, we leverage
                data-driven insights, innovative branding, and cutting-edge
                advertising solutions to help businesses thrive. Whether you’re
                looking to boost visibility, accelerate lead generation, or
                dominate your industry, we deliver strategic, results-oriented
                solutions that make an impact.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
