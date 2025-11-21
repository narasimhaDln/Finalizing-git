

import { Box } from '@mui/material'
import { mobilebgshark2, servicessharkbg, sharkbgmaroon } from '../../assets'
import Breadcrumb from '../../Components/Breadcrumb'
import GetMarquee from './GetMarquee'
import { Helmet } from 'react-helmet-async'
import TestimonialSlider from '../AboutUs/TestimonialSlider'
import ServicesSection from './ServicesSection'

const index = () => {
  return (
    <Box>
      <Helmet>
        {/* Title */}
        <title>Best Digital Marketing Services in Hyderabad | Dezign Shark</title>

        {/* Meta Description */}
        <meta
          name="description"
          content="Grow your business with expert digital marketing services in Hyderabad. From SEO to branding, Dezign Shark delivers results that drive traffic and leads."
        />

        {/* Keywords */}
        <meta
          name="keywords"
          content="Best Social Media Marketing company in Hyderabad, Best Search Engine Optimization (SEO) company in Hyderabad, Best PPC Ads company in Hyderabad, Best Content Marketing company in Hyderabad, Best Email Marketing company in Hyderabad, Best Website Design & Development company in Hyderabad, Best Landing Page Design & Optimization company in Hyderabad, Best Google Ads company in Hyderabad, Best Facebook Ads company in Hyderabad, Best Meta Ads company in Hyderabad, Best LinkedIn Marketing company in Hyderabad, Best Influencer Marketing company in Hyderabad, Best Online Reputation Management (ORM) company in Hyderabad, Best Video Marketing company in Hyderabad, Best Marketing Automation company in Hyderabad, Best Lead Generation Campaigns company in Hyderabad, Best Growth Marketing company in Hyderabad, Best Performance Marketing company in Hyderabad, Best WhatsApp Marketing company in Hyderabad, Best SMS Marketing company in Hyderabad, Best Local SEO & GMB Optimization company in Hyderabad, Best Brand Identity & Creative Design company in Hyderabad"
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Best Digital Marketing Services in Hyderabad | Dezign Shark" />
        <meta
          property="og:description"
          content="Grow your business with expert digital marketing services in Hyderabad. From SEO to branding, Dezign Shark delivers results that drive traffic and leads."
        />
        <meta property="og:url" content="services/digital-marketing-hyderabad" />
        <meta property="og:image" content="https://dprstorage.b-cdn.net/dezignshark/aboutshark.png" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Dezign Shark" />

        {/* Canonical Tag */}
        <link rel="canonical" href="services/digital-marketing-hyderabad" />
      </Helmet>
      <Breadcrumb
        title="Services"
        // subtitle="Our Selected Works"
        backgroundImage={servicessharkbg}
        overlayText=" Services"
      />
      <Box
        sx={{
          position: "relative",
          // backgroundImage: `url(${sharkbgmaroon})`,
          backgroundImage: `linear-gradient(rgba(22, 22, 22, 0.5), rgba(0, 0, 0, 0.5)), url(${sharkbgmaroon})`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "100vh",
          // opacity: 0.8,
          "@media (max-width: 1040px)": {
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${mobilebgshark2})`,
            // backgroundAttachment: "scroll",
            backgroundSize: "contain", // Adjust to ensure the full image appears
          },
        }}
      >

        <ServicesSection />
        <GetMarquee />
        {/* <ServiceSlider/> */}
        <TestimonialSlider />
        {/* <Clients/> */}
      </Box>

    </Box>
  )
}

export default index
