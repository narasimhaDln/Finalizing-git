
import { Box, Typography, IconButton, List, ListItem, ListItemIcon, ListItemText, Container } from "@mui/material";
import { ImFilePdf } from "react-icons/im";
import { IoDocumentTextOutline } from "react-icons/io5";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

// Import the PDF file
import brochurePDF from "../../../assets/DS_Brochure.pdf";
import seoPDF from "../../../assets/seo-checklist.pdf";
import AnimatedText from "../../../Components/Inputs/AnimatedText";

const downloads = [
  { name: "Our Brochure", file: brochurePDF, icon: <ImFilePdf style={{ color: "black" }} /> },
  { name: "SEO Check List", file: seoPDF, icon: <IoDocumentTextOutline style={{ color: "black" }} /> },
];

const DownloadSection = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      <Box sx={{ p: 2, border: "1px solid #ddd" }}>
        {/* <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ color: "black", textAlign: "left", fontWeight: 700, mb: 1 }}
          gutterBottom
        >
          Download
        </Typography> */}
        <AnimatedText sx={{ color: "black", textAlign: "center", fontWeight: 700, mb: { xs: 1, lg: 1 } , mt: { xs: 4, lg: 1 },fontSize: { xs: "14px",md:"24px", lg: "24px" }}}>
        Download
        </AnimatedText>

        <List>
          {downloads.map((item, index) => (
            <ListItem key={index} sx={{ display: "flex", justifyContent: "space-between", gap: 2, mt: 2 }}>
              <ListItemIcon sx={{ fontSize: { xs: "50px", md: "40px" ,lg: "50px" } }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                  
                    fontWeight="bold"
                    variant="body1"
                    sx={{
                      color: "black",
                      // fontSize: { xs: "38px", lg: "18px" },
                    }}
                  >
                    {item.name}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#74787C",
                      // fontSize: { xs: "28px", lg: "18px" },
                    }}
                  >
                    Download
                  </Typography>
                }
              />
              {/* Download Button */}
              <IconButton
                component="a"
                href={item.file} // Uses the imported PDF file
                download
                sx={{ color: "black" }}
              >
                <DownloadForOfflineIcon sx={{fontSize: { xs: "2.5rem", md: "2.0rem",lg: "2.0rem" }}} />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default DownloadSection;
