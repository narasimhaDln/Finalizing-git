// src/components/LatestBlogs.tsx
import React, { useEffect, useRef } from "react";
import {GridLegacy as Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom"; // ✅ Replaced Link with useNavigate()
import gsap from "gsap";
import { blogData, BlogPost } from "./BlogDetails/BlogData";
import AnimatedText from "../../Components/Inputs/AnimatedText";

const LatestBlogs: React.FC = () => {
    const latestBlogs = [...blogData]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);

  return (
    <Box sx={{ border: "1px solid #000", padding: "20px", mt: 4 }}>
      <Box textAlign="start" mb={3}>

        <AnimatedText sx={{ color: "#ad0505", textAlign: "center", mt: { xs: 1, lg: 0 },fontWeight: 700, mb: { xs: 1, lg: 1 } ,fontSize: { xs: "18px",md:"24px", lg: "24px" }}}>
            Latest Posts
        </AnimatedText>
      </Box>

      {latestBlogs.map((post, index) => (
      <BlogItem key={index} post={post} />
    ))}
    </Box>
  );
};

// ✅ Blog Item with GSAP Hover Animation & Navigation
const BlogItem: React.FC<{ post: BlogPost }> = ({ post }) => {
  const imgContainerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const navigate = useNavigate(); // ✅ Using useNavigate()


  useEffect(() => {
    if (!imgContainerRef.current || !imgRef.current) return;

    const hoverIn = () => gsap.to(imgRef.current, { scale: 1.2, duration: 0.4, ease: "power2.out" });
    const hoverOut = () => gsap.to(imgRef.current, { scale: 1, duration: 0.4, ease: "power2.out" });

    imgContainerRef.current.addEventListener("mouseenter", hoverIn);
    imgContainerRef.current.addEventListener("mouseleave", hoverOut);

    return () => {
      imgContainerRef.current?.removeEventListener("mouseenter", hoverIn);
      imgContainerRef.current?.removeEventListener("mouseleave", hoverOut);
    };
  }, []);

  // ✅ Handle navigation with formatted title
  const handleNavigation = (title: string) => {
    const formattedTitle = 
  title.toLowerCase()
  .replace(/[|/:]/g, "")
  .replace(/\s+/g, "-")
  .replace(/-+$/, "");

    navigate(`/blog/${formattedTitle}`);
  };

  return (
    <Box sx={{ marginBottom: 3, boxShadow: "none", borderRadius: "10px" ,pb:{xs:1,lg:0}}} onClick={() => handleNavigation(post.title)} style={{  }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4} md={4} lg={4}>
          <ButtonBase>
            <Box ref={imgContainerRef} sx={{ overflow: "hidden", borderRadius: "10px" }}>
              <img alt="Top digital marketing agency offering SEO and PPC services" src={post.image} ref={imgRef} style={{ width: "100%", transition: "transform 0.4s ease-in-out" }} />
            </Box>
          </ButtonBase>
        </Grid>

        <Grid item xs={8} md={8}  lg={8} sx={{mt:{xs:1,lg:0}}}>
          <Typography variant="body2"
            sx={{
              color: "#000",
              // fontSize: {xs:'40px',lg:"0.7rem"},
              textAlign: 'start'
            }}
          >
            {post.date}
          </Typography>
          <Typography variant="caption"
            sx={{
              textDecoration: "none",
              color: "#000",
              // fontSize:  {xs:'30px',lg:"14px"},
              fontWeight: "600",
              textAlign: 'left'
            }}
          >
            {post.title}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LatestBlogs;
