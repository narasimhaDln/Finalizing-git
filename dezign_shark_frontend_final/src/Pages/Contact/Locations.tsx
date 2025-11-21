import React from "react";
import { Box, Typography, GridLegacy as Grid,  Container, Card, styled } from "@mui/material";
import { FiSend } from "react-icons/fi";
import { MdLocationOn } from "react-icons/md";
import { IoCallSharp } from "react-icons/io5";
import AnimatedText from "../../Components/Inputs/AnimatedText";

const FancyBox = styled(Card)({
  position: "relative",
  overflow: "hidden",
  backgroundColor: "#171717",
  border: "1px solid #444",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",

  "&::before, &::after, & .hover-lines-left, & .hover-lines-right": {
    content: '""',
    position: "absolute",
    backgroundColor: "#fc0000",
    transition: "all 0.3s ease-in-out",
  },

  "&::before, &::after": {
    width: "0%",
    height: "2px",
  },
  "&::before": { top: 0, left: 0 },
  "&::after": { bottom: 0, right: 0 },

  "& .hover-lines-left, & .hover-lines-right": {
    width: "2px",
    height: "0%",
  },
  "& .hover-lines-left": { left: 0, top: 0 },
  "& .hover-lines-right": { right: 0, bottom: 0 },

  "&:hover": {
    "&::before, &::after": { width: "100%" },
    "& .hover-lines-left, & .hover-lines-right": { height: "100%" },
  },
});

const ContactInfo: React.FC = () => {
  const contactData = [
    {
      id: 1,
      icon: <FiSend color="white" />,
      title: "Email",
      details: [{ text: "info@dezignshark.com", link: "mailto:info@dezignshark.com" }],
    },
    {
      id: 2,
      icon: <MdLocationOn color="white" />,
      title: "Location",
      details: [
        { text: "68, 3rd Floor, Senore Colony, Film Nagar, Hyderabad, Telangana 500008", link: "#" },
      ],
    },
    {
      id: 3,
      icon: <IoCallSharp color="white" />,
      title: "Contacts",
      details: [{ text: "+91 799 799 2885", link: "tel:+91 799 799 2885" }],
    },
  ];

  return (
    <Box sx={{ background: "white",  }}>
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1, py: 10 }}>
          <Grid container spacing={3} justifyContent="center">
            {contactData.map((item) => (
              <Grid item xs={12} md={4} lg={4} key={item.id} sx={{ width: "100%" }}>
                <FancyBox
                  elevation={3}
                  sx={{
                    border: "1px solid #444",
                    width: "100%", // Ensure FancyBox spans full width
                    position: "relative",
                    backgroundColor: "#171717",
                  }}
                >
                  {/* Side Borders for Hover Effect */}
                  <Box className="hover-lines-left"></Box>
                  <Box className="hover-lines-right"></Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      p: 3,
                      borderRadius: 2,
                      textAlign: "center",
                      height: { xs: "280px",md: "250px", lg: "250px" },
                    }}
                  >
                    {/* Icon */}
                    <Box
                      sx={{
                        width: { xs: 80, md: 80 ,lg: 80},
                        height: { xs: 80, md: 80 ,lg: 80},
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        border: "2px solid #fc0000",
                        mb: 2,
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          fontSize: { xs: "50px", md: "40px",lg: "40px" },
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                        }}
                      >
                        {item.icon}
                      </Box>
                    </Box>

                    {/* Title */}
                    {/* <Typography variant="h5" fontWeight="bold" color="white" sx={{ fontSize: { xs: "24px", lg: "20px" } }}>
                      {item.title}
                    </Typography> */}
                    <AnimatedText sx={{ color: "white", textAlign: "center", fontWeight: 700, mt: { xs: 1, lg: 1 }, fontSize: { xs: "18px", md: "25px" ,lg: "25px" }, }}>
                      {item.title}
                    </AnimatedText>

                    {/* Contact Details */}
                    {item.details.map((detail, index) => (
                      <Typography
                        key={index}
                        variant="body2"
                        component="a"
                        href={detail.link}
                        sx={{
                          color: "white",
                          textDecoration: "none",
                          transition: "color 0.3s ease-in-out",
                          "&:hover": { color: "#ad0505" },
                          mt: 1,
                         
                        }}
                      >
                        {detail.text}
                      </Typography>
                    ))}
                  </Box>
                </FancyBox>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactInfo;
