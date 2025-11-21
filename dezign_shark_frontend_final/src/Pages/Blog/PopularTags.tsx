import React from "react";
import Box from "@mui/material/Box";
import {GridLegacy as Grid,} from "@mui/material";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import AnimatedText from "../../Components/Inputs/AnimatedText";

const tags = ["Marketing", "Digital", ];

// Styled tag item with hover effect
const TagItem = styled(Paper)(({  }) => ({
  backgroundColor: "#fff",
  border: "1px solid #E6E9F0",
  padding: '5px',
  textAlign: "center",
  boxShadow: "none",
  fontWeight: "500",
  transition: "all 0.3s ease-in-out",
  borderRadius: "none !important",
  width: '100%',
  "& a": {
    textDecoration: "none",
    color: "#000",
    fontWeight: "600",
  },

}));

const PopularTags: React.FC = () => {
  return (
    <Box
      sx={{
        p: {xs:1,md:3,lg:5},
        border: "1px solid #000",
        mt: 4,
        mb: 4
      }}
    >
      <Box sx={{ textAlign: "start", marginBottom: "12px" }}>

        <AnimatedText sx={{ color: "#ad0505", textAlign: "center", fontWeight: 700, mb: { xs: 1, lg: 4 }, py: { xs: 4, lg: 0 }, fontSize: { xs: "18px",md:"24px", lg: "24px" } }}>
          Post Tags
        </AnimatedText>
      </Box>
      <Grid container spacing={2}>
        {tags.map((tag, index) => (
          <Grid item xs={6} key={index}>
            <TagItem sx={{py:{xs:4,lg:2}}}>
              <Link href="#"  sx={{}}>{tag}</Link>
            </TagItem>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PopularTags;
