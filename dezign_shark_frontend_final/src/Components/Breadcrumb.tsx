import React from "react";
import { Box, Container, Typography } from "@mui/material";

interface BreadcrumbProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  overlayText?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ title, subtitle, backgroundImage, overlayText }) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        height: {
          xs:'47vh',
          md:'60vh',
          lg:'90vh'
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
        // paddingTop: { xs: "120px", sm: "60px" },
        // paddingBottom: "60px",
        backgroundSize: "cover",
        backgroundPosition: { xs: '28% center', md: '28% center', lg: 'center' },
        Zindex:-1
      }}
    >
      <Container>
        <Box className="breadcrumb-main-wrapper">
          <Box className="inner">
            {subtitle && (
              <Typography
                variant="subtitle1"
                sx={{
                  color: "#fff",
                  fontSize: { xs: "14px", md: "20px" , lg: "20px"},
                  fontWeight: "500",
                }}
              >
                {subtitle}
              </Typography>
            )}
            <Typography
              variant="h2"
              sx={{
                color: "#fff",
                fontSize: { xs: "28px", md: "60px", lg: "80px" },
                fontWeight: "600",
                mt: { xs: 3, lg: 5 },
                position: "relative",
                left: { xs: "0%", md: "12%", lg: "10%" },
                textAlign: { xs: "center", md: "right", lg: "right" },
                transform: { xs: "none", md: "translateX(-40%)", lg: "translateX(-40%)" },
              }}
            >
              {title}
            </Typography>
            {overlayText && (
              <Typography
                sx={{
                  color: "rgba(255, 255, 255, 0.03)",
                  fontSize: { xs: "65px",md: "100px" , lg: "180px !important" },
                  fontWeight: "400",
                  position: "absolute",
                  left: "50%",
                  zIndex: "10",
                  top: { xs: "58%", sm: "55%", lg: "50%" },
                  transform: "translate(-50%, -50%)",
                  whiteSpace: "nowrap",
                }}
              >
                {overlayText}
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Breadcrumb;
