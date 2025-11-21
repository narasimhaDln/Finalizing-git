
import { Box } from "@mui/material";


const BackGroundImageSection = () => {
  return (
    <Box
      sx={{
        backgroundImage: 'url("https://dprstorage.b-cdn.net/dezignshark/backgroundabout.png")',
        height: "700px",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        paddingY: { xs: "100px", md: "150px" }, // Responsive padding
      }}
      className="rts-video-area-about"
    ></Box>
  );
};

export default BackGroundImageSection;
