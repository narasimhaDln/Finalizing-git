import  { useEffect, useRef } from "react";
import { Box,  } from "@mui/material";
import gsap from "gsap";



const Map = () => {
  const locationCardRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (locationCardRef.current) {
      gsap.fromTo(
        locationCardRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
      );
    }

    gsap.fromTo(
      mapRef.current,
      { opacity: 0, scale: 0.8, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <Box>
      {/* ✅ Map Section */}
      <Box position="relative">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.0107425835818!2d78.4018151!3d17.411272099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b43765a51d595d%3A0x888192e0597f0421!2sDezign%20Shark%20%7C%20Branding%20%26%20Digital%20Marketing%20Agency%20in%20Hyderabad!5e0!3m2!1sen!2sin!4v1742038204241!5m2!1sen!2sin" width="100%" height="450"   loading="lazy" ></iframe>
      </Box>

    </Box>
  );
};

export default Map;
