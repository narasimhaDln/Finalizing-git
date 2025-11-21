import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  IconButton,
  CircularProgress,
  useMediaQuery,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import gsap from 'gsap';
import { whatsapp } from '../assets';
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PopupForm from '../Components/PopupForm';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isWhatsAppVisible, setIsWhatsAppVisible] = useState(false); // State for WhatsApp button visibility
  const [scrollProgress, setScrollProgress] = useState(0);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const whatsappButtonRef = useRef<HTMLDivElement | null>(null); // Ref for WhatsApp button
  let pulseAnimation = useRef<gsap.core.Tween | null>(null);
  let whatsappAnimation = useRef<gsap.core.Tween | null>(null);  const iconRef = useRef(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [downloadType, setDownloadType] = useState<"ebook" | "brochure">("brochure");

  const handleOpenPopup = (type: "ebook" | "brochure") => {
    setDownloadType(type);
    setIsPopupOpen(true);
  };

  useEffect(() => {
    gsap.to(iconRef.current, {
      y: -10,
      duration: 0.6,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);


  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollProgress(scrolled);
      setIsVisible(scrollTop > 100);
      setIsWhatsAppVisible(scrollTop > 100); // Show WhatsApp button after scrolling 100px
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  useEffect(() => {
    if (isVisible && buttonRef.current) {
      // Button entrance animation
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
      );

      // Pulse and Glow Effect
      pulseAnimation.current = gsap.to(buttonRef.current, {
        scale: 1.1,
        boxShadow: '0px 0px 15px rgba(226, 97, 97, 0.6)',
        duration: 1,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      });
    } else {
      // Fade out and remove animations
      gsap.to(buttonRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        ease: 'power2.inOut',
      });

      pulseAnimation.current?.kill(); // Stop animation when hidden
    }

    return () => {
      pulseAnimation.current?.kill();
    };
  }, [isVisible]);

  useEffect(() => {
    if (isWhatsAppVisible && whatsappButtonRef.current) {
      // WhatsApp button animation
      gsap.fromTo(
        whatsappButtonRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
      );
    } else {
      // Fade out WhatsApp button
      gsap.to(whatsappButtonRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    }

    return () => {
      whatsappAnimation.current?.kill();
    };
  }, [isWhatsAppVisible]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToWhatsApp = () => {
    const customMessage = encodeURIComponent(
      "Hello! I would like to know more about your services. Could you please assist me?"
    ); // Custom message
    window.open(`https://wa.me/7997992885?text=${customMessage}`, '_blank'); // Replace with your WhatsApp number
  };

  return (
    <>
      <Box
        // ref={buttonRef}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 24,
          zIndex: 1000,
          borderRadius: '50%',
          width: isSmallScreen ? 44 : 55,
          height: isSmallScreen ? 44 : 55,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'white',
          boxShadow: '0px 0px 10px rgba(185, 42, 49, 0.3)',
          border: '2px solidrgb(197, 85, 85)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
      >
        <CircularProgress
          variant="determinate"
          value={scrollProgress}
          size={isSmallScreen ? 40 : 55}
          thickness={3}
          sx={{
            color: '#fc0000',
            position: 'absolute',
          }}
        />
        <IconButton
          onClick={scrollToTop}
          sx={{
            color: '#fc0000',
            bgcolor: 'white',
            borderRadius: '50%',
            zIndex: 2,
            '&:hover': {
              bgcolor: 'rgba(219, 19, 19, 0.1)',
            },
          }}
        >
          <ArrowUpwardIcon fontSize={isSmallScreen ? 'small' : 'medium'} />
        </IconButton>
      </Box>
      <Box
        ref={whatsappButtonRef}
        sx={{
          position: 'fixed',
          bottom: {xs:63,md:80,lg:86},
          right: {xs:13,md:30,lg:30},
          zIndex: 1000,
          borderRadius: '50%',
          width: isSmallScreen ? 60 : 50,
          height: isSmallScreen ? 60 : 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isWhatsAppVisible ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        }}
        onClick={navigateToWhatsApp}
      >
        <Box
          component="img"
          src={whatsapp} // Replace with the actual path to your image
          alt="Top digital marketing agency offering SEO and PPC services"
          sx={{
            width: isSmallScreen ? 44 : 50,
            height: isSmallScreen ? 44 : 50,
            zIndex: 2,
          }}
        />
      </Box>
      <Box
       onClick={() => handleOpenPopup("ebook")}
      sx={{
        position: "fixed",
        top: "50%",
        right: 0,
        transform: "translateY(-50%)",
        zIndex: 9999,
        // cursor: "pointer",
      }}
    >
      <Box
        sx={{
          width: {xs:'30px',md:"40px",lg:"40px"},
          height: {xs:'160px',md:"180px",lg:"180px"},
          background: "rgba(145, 9, 9, 0.8)",
          color: "white",
          borderRadius: "10px 0 0 10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: {xs:"20px",md:'15px',lg:'15px'},
          "&:hover": {
            background: "rgba(145, 9, 9, 1)",
          },
        }}
      >
        <Box
          sx={{
            writingMode: "vertical-rl",
            transform: "rotate(360deg)",
            fontSize: {xs:'14px',md:"16px",lg:"16px",},
            textAlign: "center",
            fontWeight:700,
            letterSpacing:'1px'
          }}
        >
        FREE eBook
        </Box>
        <FileDownloadIcon
          ref={iconRef}
          sx={{
            fontSize: {xs:'25px',md:'30px',lg:'30px'},
          }}
        />
      </Box>
      </Box>
      <PopupForm
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        downloadType={downloadType}
      />
    </>
  );
};

export default ScrollToTopButton;
