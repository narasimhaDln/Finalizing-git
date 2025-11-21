
import { Box, Typography,  Container, GridLegacy as Grid } from "@mui/material";

import AnimatedText from "../../Components/Inputs/AnimatedText";

const Expert = () => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
      }}
    >

      <Container maxWidth='xl' >
        <Grid container spacing={4} alignItems="center" pt={5}  pb={8} sx={{px:{xs:6,lg:0}}}>
        

          {/* Right Side: Text Content */}
          <Grid item xs={12} md={6} lg={6}>
            <Box sx={{ color: "#000", zIndex: 2 }}>
            
              <AnimatedText sx={{ fontWeight: "bold", mb: 2 ,textAlign:"start",color:'#ad0505',}}>
              Getting Applied by an Expert Talent

              </AnimatedText>

              <Typography sx={{ color: "#000", mb: 4,textAlign:'start',mt:{xs:3,md:0,lg:0} }}>
              When it comes to landing your dream job, our expert team acts as your personal career matchmaker connecting your unique skills with the perfect opportunity.

              </Typography>
              <Typography sx={{ color: "#000", mb: 4,textAlign:'start' }}>
              Our specialists dive deep into every application, ensuring your potential shines through. Experience a personalized, engaging approach that turns every application into a step toward success!
              </Typography>


            </Box>
          </Grid>

            {/* Left Side: 3D Illustration */}
            <Grid item xs={12} md={6} lg={6}>
            <Box
              component="img"
              src='https://dprstorage.b-cdn.net/dezignshark/carrersimg2.png'
              alt="Top digital marketing agency offering SEO and PPC services"
              sx={{
                width: {xs: "100%", md: "100%", lg: "70%" },
                maxWidth: "600px",
                zIndex: 2,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Expert;
