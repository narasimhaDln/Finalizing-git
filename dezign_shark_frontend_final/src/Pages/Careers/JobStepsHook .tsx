
import { Box, Typography, Stack, Container, GridLegacy as Grid } from "@mui/material";
import {  careersshark1,  } from "../../assets";
import AnimatedText from "../../Components/Inputs/AnimatedText";

const JobStepsHook = () => {
  return (
    <Box
      sx={{
        background:'white'
      }}
    >

      <Container maxWidth='xl' >
        <Grid container spacing={4} alignItems="center" py={5} sx={{}}>
          {/* Left Side: 3D Illustration */}
          <Grid item xs={12} md={6} lg={6}>
            <Box
              component="img"
              src={careersshark1}
              alt="Top digital marketing agency offering SEO and PPC services"
              sx={{
                width: "100%",
                maxWidth: "600px",
                zIndex: 2,
              }}
            />
          </Grid>

          {/* Right Side: Text Content */}
          <Grid item xs={12} md={6} lg={6}>
            <Box sx={{ color: "#74787C", zIndex: 2 }}>
              
              <AnimatedText sx={{ fontWeight: "bold", mb: 2 ,color:'#ad0505',textAlign:'start'}}>
              Discover Your Dream Career in 3 Simple Steps!

              </AnimatedText>

              <Typography sx={{ color: "#000", mb: 4,textAlign:'start', my:{xs:4,md:0,lg:0} }}>
              Looking for your next big career move? We’ve made the process as breezy as a walk in the park. No account sign-ups, no endless forms—just pure, unadulterated opportunity!

              </Typography>

              {/* Steps List */}
              <Stack spacing={2} sx={{mt:4}}>
                {[ 
                  { number: "01", text: "Discover Opportunities : Browse our curated job listings and find roles that excite you." },
                  { number: "02", text: "Apply Effortlessly : Send in your resume with just a click—no hassle, no fuss" },
                  { number: "03", text: "Land Your Dream Job : Connect with top employers and kick-start your new adventure!" },
                ].map((step, index) => (
                  <Stack key={index} direction="row" alignItems="start" spacing={3}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: "#000" ,mt:{xs:2,md:0,lg:0}}}>
                      {step.number}
                    </Typography>
                    <Typography variant="body1" color="#000" sx={{textAlign:'left'}}>{step.text}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default JobStepsHook;
