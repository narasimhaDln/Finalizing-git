
import { Box } from "@mui/material";
import Banner from "./Banner";
import { sharkbgmaroon, mobilebgshark2,  } from "../../assets";
import BodyBackground from "../../Components/BodyBackground";
import About from "./About";
import Client from "./Client";
import ServiceCard from "./ServiceCard";
import Portfolio from "./Portfolio";
import Testimonials from "./Testimonials";
import MarqueeText from "./MarqueeText";
import BlogCarousel from "./BlogCarousel";



const Dashboard = () => {
    return (
        <>

            <Box
                sx={{
                    position: "relative",
                    // backgroundImage: `url(${sharkbgmaroon})`,
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${sharkbgmaroon})`,
                    backgroundAttachment: "fixed",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    minHeight: "100vh",
                    // opacity: 0.8,
                    "@media (max-width: 1040px)": {
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${mobilebgshark2})`,
                        // backgroundAttachment: "scroll",
                        backgroundSize: "contain", // Adjust to ensure the full image appears
                    },
                }}
            >
                <BodyBackground />

                <Box sx={{}}>
                    <Banner />
                    {/* <FeatureGrid/> */}
                    <About />
                    <Client />
                    <ServiceCard />
                    <Portfolio />
                    <Testimonials />
                    <MarqueeText />
                    <BlogCarousel />
                </Box>
            </Box>
        </>
    );
};

export default Dashboard;
