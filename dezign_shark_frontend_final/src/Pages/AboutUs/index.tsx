
import { Box } from '@mui/material';
import { sharkbg } from '../../assets';
import ApproachSection from './Approach';
import Faqs from './Faqs';
import BackGroundImageSection from './BackGroundImageSection';
import TestimonialSlider from './TestimonialSlider';

import Breadcrumb from '../../Components/Breadcrumb';
import Team from './Team';
import { Helmet } from 'react-helmet-async';


const About = () => {
  return (
    <Box>
      {/* ✅ SEO Configuration */}

     <Helmet>
        {/* Title */}
        <title>Digital Marketing & Branding Services | Dezign Shark</title>

        {/* Meta Description */}
        <meta
          name="description"
          content="Boost visibility, leads, and conversions with data-driven digital marketing and branding services. Partner with Dezign Shark for results that matter."
        />

        {/* Keywords */}
        <meta
          name="keywords"
          content="best digital marketing agencies, best digital marketing companies, top digital marketing companies, digital marketing firms, performance marketer, best digital marketing firms, digital agency, google digital marketing, internet marketing company, digital marketing consultant, performance marketing agencies, digital marketing for real estate, seo agency near me, performance marketing companies, social media marketing agency near me, seo and digital marketing agency, search engine optimization agencies"
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Digital Marketing & Branding Services | Dezign Shark" />
        <meta
          property="og:description"
          content="Boost visibility, leads, and conversions with data-driven digital marketing and branding services. Partner with Dezign Shark for results that matter."
        />
        <meta property="og:url" content="https://dezignshark.com/about-us" />
        <meta property="og:image" content="https://dprstorage.b-cdn.net/dezignshark/aboutshark.png" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Dezign Shark" />

        {/* Canonical Tag */}
        <link rel="canonical" href="https://dezignshark.com/about-us" />
      </Helmet>

      {/* Content */}
      <Breadcrumb
        title="Our Story"
        backgroundImage={sharkbg}
        overlayText="About Us"
      />

      <Box>
        <ApproachSection />
        <Team />
        <Faqs />
        <BackGroundImageSection />
        <TestimonialSlider />
      </Box>
    </Box>
  );
};

export default About;
