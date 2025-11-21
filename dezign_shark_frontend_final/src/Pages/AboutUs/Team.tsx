import { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { keyframes } from '@emotion/react';
import { AboutImages } from '../../assets';
import AnimatedText from '../../Components/Inputs/AnimatedText';
import {
  Facebook,
  Instagram,
  LinkedIn,
  YouTube,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import XIcon from '@mui/icons-material/X';

const pop = keyframes`
  0% { opacity: 0; transform: scale(0.5); }
  100% { opacity: 1; transform: scale(1); }
`;

const slideLeft = keyframes`
  0% { opacity: 0; transform: translateX(-40px); }
  100% { opacity: 1; transform: translateX(0); }
`;

const slide = keyframes`
  0% { opacity: 0; transform: translateX(4em); }
  100% { opacity: 1; transform: translateX(0); }
`;

export default function TreesCard() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const teamMembers = [
    {
      id: 1,
      title: 'Meet Our CEO',
      name: 'Rajiv Williams',
      description: [
        'Rajiv Williams is a leading real estate mentor in Hyderabad with over 14 years of experience in marketing, sales, and brand strategy. A licensed RERA Realtor and member of HRA & NAR India, he blends sharp business insight with an MBA in International Business from California, USA.',
        'Renowned for his strategic thinking, Rajiv helps clients optimize costs, maximize profits, and achieve long-term growth. As an entrepreneur and mentor, he is dedicated to guiding startups and real estate professionals toward scalable success and sustainable impact.',
      ],
      image: AboutImages.team,
      socialLinks: {
        facebook: 'https://www.facebook.com/williamsrajiv',
        twitter: 'https://x.com/RajivCWilliams?t=2UnilCIJUvX9kQG1dAaXaw&s=09',
        instagram: 'https://www.instagram.com/williams_rajiv/',
        linkedin: 'https://www.linkedin.com/in/rajivwilliams/',
        youtube: 'https://www.youtube.com/@rajiv-williams',
      },
    },
    {
      id: 2,
      title: 'Meet Our Sales Executive',
      name: 'Priyanka Panda',
      description: [
        'Priyanka Panda is a dedicated sales executive with expertise in driving business growth and client relationships. With a passion for excellence, she brings innovative strategies to achieve outstanding results.',
        'Known for her strong communication skills and customer-focused approach, Priyanka excels in building long-term partnerships and delivering exceptional service.',
      ],
      image:
        'https://dprstorage.b-cdn.net/dezignshark/About/priyaanka_panda_-20251104-0001.heic',
      socialLinks: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
        linkedin: '#',
        youtube: '#',
      },
    },
  ];

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
  };

  const prevCard = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + teamMembers.length) % teamMembers.length,
    );
  };

  const currentMember = teamMembers[currentIndex];

  return (
    <Box
      sx={{
        background: 'white',
        py: 4,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <center>
          {' '}
          <AnimatedText
            sx={{
              color: '#000',
            }}
          >
            Our Team
          </AnimatedText>
        </center>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          px: { xs: 1, md: 2 },
        }}
      >
        <IconButton
          onClick={prevCard}
          sx={{
            position: 'absolute',
            left: { xs: 10, md: 65 },
            zIndex: 10,
            color: 'black',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
            },
            display: { xs: 'none', md: 'flex' }, // Hide on mobile, show on larger screens
          }}
        >
          <ChevronLeft />
        </IconButton>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Box
            sx={{
              width: { xs: '95vw', md: '95vw', lg: '75vw' },
              height: { xs: 'auto', md: '80vh', lg: '80vh' },
              position: 'relative',
              overflow: 'hidden',
              border: { xs: '4px solid', md: '8px solid', lg: '8px solid' },
              display: 'flex',
              flexDirection: { xs: 'column', md: 'column', lg: 'row' },
              justifyContent: 'center',
              alignItems: 'center',
              background: 'black',
              borderImage:
                'linear-gradient(-50deg, black, #ad0505, black, #ad0505) 1',
              transition: '0.3s ease-in-out',
              animation: `${pop} 0.7s ease-out backwards`,
              '&:hover .overlay': {
                transform: 'translateX(-50vw) ',
              },
              '&:hover .overlay-content': {
                opacity: 0,
                pointerEvents: 'none',
                transition: 'opacity 0.3s ease-in-out',
              },
              '&:hover .image-content': {
                width: { xs: '100vw', md: '100vw', lg: '25vw' },
                transform: { xs: 'none', md: 'none', lg: 'scale(1.1)' },
                transition:
                  'width 0.3s ease-in-out, transform 0.3s ease-in-out',
              },
              '&:hover .dots': {
                transform: 'translateX(1rem)',
              },
              '&:hover .dot': {
                background: 'white',
              },
            }}
          >
            {/* Overlay */}
            <Box
              className="overlay"
              sx={{
                position: 'relative',
                display: 'flex',
                width: '100%',
                height: '100%',
                padding: '1rem',
                background: 'black',
                zIndex: 2,
                transition: '0.4s ease-in-out',
              }}
            >
              {/* Overlay Content */}
              <Box
                className="overlay-content"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  width: '40%',
                  height: '100%',
                  paddingLeft: '0.5rem',
                  border: '3px solid',
                  borderImage:
                    'linear-gradient(to bottom, #f5f5f1 5%, #ebf2eb 35% 65%, #f3f3f0 95%) 0 0 0 100%',
                  zIndex: 3,
                  animation: `${slideLeft} 0.7s 0.6s ease-out backwards`,
                  opacity: 1,
                  transition: 'opacity 0.3s ease-in-out',
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: 'start',
                    color: 'white',
                    animation: `${slideLeft} 0.7s 1.2s ease-out backwards, ${pop} 0.7s 1.2s ease-out backwards`,
                  }}
                >
                  {currentMember.title}
                </Typography>

                <Typography
                  variant="h1"
                  sx={{
                    color: 'white',
                    mb: '2.5rem',
                    width: '100%',
                    textAlign: 'start',
                    animation: `${slideLeft} 0.7s 1.5s ease-out backwards, ${pop} 0.7s 1.5s ease-out backwards`,
                  }}
                >
                  {currentMember.name}
                </Typography>
              </Box>

              {/* Background Image (expands on hover) */}
              <Box
                className="image-content"
                sx={{
                  position: { xs: 'static', md: 'static', lg: 'absolute' },
                  top: { xs: 'auto', md: 'auto', lg: 20 },
                  right: 0,
                  width: { xs: '90vw', md: '90vw', lg: '33vw' },
                  height: { xs: '300px', md: '100%', lg: '85%' },
                  transition: '0.3s ease-in-out',
                  zIndex: 1,
                  animation: `${slide} 0.7s 1.5s ease-out backwards`,
                  overflow: 'hidden',
                  marginBottom: { xs: 2, md: 0, lg: 0 },
                  marginTop: { xs: 2, md: 0, lg: 0 },
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  borderRadius: { xs: '8px', md: '0', lg: '0' },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: { xs: 'auto', md: 'auto', lg: 0 }, // Center horizontally on mobile
                }}
              >
                <img
                  src={currentMember.image}
                  alt={`${currentMember.name} - ${currentMember.title}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                    borderRadius: '8px',
                  }}
                  loading="lazy"
                />
              </Box>
            </Box>

            {/* Text Section */}
            <Box
              className="text"
              sx={{
                position: { xs: 'static', md: 'static', lg: 'absolute' },
                top: 0,
                right: 0,
                width: { xs: '90vw', md: '88vw', lg: '45vw' },
                height: { xs: 'auto', md: 'auto', lg: '100%' },
                background: 'black',
                boxShadow: 'inset 1px 1px 15px rgba(0,0,0,0.4)',
                padding: { xs: '16px 16px', md: '20px 20px', lg: '20px 20px' },
                overflowY: { xs: 'visible', md: 'visible', lg: 'scroll' },
                zIndex: 1,
                textAlign: 'left',
                marginTop: { xs: 2, md: 0, lg: 0 },
              }}
            >
              {currentMember.description.map((desc, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{ mb: '1.5rem', lineHeight: 1.4, color: 'white' }}
                >
                  {desc}
                </Typography>
              ))}

              <Box
                sx={{ display: 'flex', gap: 2, mt: 1, mb: 1, flexWrap: 'wrap' }}
              >
                {currentMember.socialLinks.facebook !== '#' && (
                  <IconButton
                    component="a"
                    href={currentMember.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: 'white' }}
                  >
                    <Facebook />
                  </IconButton>
                )}
                {currentMember.socialLinks.twitter !== '#' && (
                  <IconButton
                    component="a"
                    href={currentMember.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: 'white' }}
                  >
                    <XIcon />
                  </IconButton>
                )}
                {currentMember.socialLinks.instagram !== '#' && (
                  <IconButton
                    component="a"
                    href={currentMember.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: 'white' }}
                  >
                    <Instagram />
                  </IconButton>
                )}
                {currentMember.socialLinks.linkedin !== '#' && (
                  <IconButton
                    component="a"
                    href={currentMember.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: 'white' }}
                  >
                    <LinkedIn />
                  </IconButton>
                )}
                {currentMember.socialLinks.youtube !== '#' && (
                  <IconButton
                    component="a"
                    href={currentMember.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: 'white' }}
                  >
                    <YouTube />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        <IconButton
          onClick={nextCard}
          sx={{
            position: 'absolute',
            right: { xs: 10, md: 65 },
            zIndex: 10,
            color: 'black',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
            },
            display: { xs: 'none', md: 'flex' }, // Hide on mobile, show on larger screens
          }}
        >
          <ChevronRight />
        </IconButton>
      </Box>
    </Box>
  );
}
