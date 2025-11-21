import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box, GridLegacy as Grid, Avatar, styled, Accordion, AccordionSummary, AccordionDetails, Divider } from "@mui/material";
import { blogData } from "./BlogData";
import Categories from "../Categories";
import LatestBlogs from "../LatestBlogs";
import PopularTags from "../PopularTags";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Form from "./Form";
import AnimatedText from "../../../Components/Inputs/AnimatedText";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Helmet } from "react-helmet-async";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Styled Components for Background Image Wrapper
const ThumbnailBanner = styled(Box)({
  position: "relative",
  height: "350px",
  width: "100%",
  overflow: "hidden",
});

// Styled Image for GSAP animation
const GrowImage = styled("div")({
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundAttachment: "fixed",
  backgroundPosition: "center",
  height: "100%",
  width: "100%",
  transform: "scale(1)", // Initial scale
});

const BlogDetails: React.FC = () => {
  const { title } = useParams<{ title?: string }>(); // Extract title from URL
  const titleRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState<number | false>(0);

  const blog = blogData.find((b) => b.title.toLowerCase().replace(/\s+/g, "-") === title); // Match formatted title

  const handleAccordionChange = (panel: number) => {
    setExpanded(expanded === panel ? false : panel);
  };

  useEffect(() => {
    if (!titleRef.current) return;

    const title = titleRef.current;

    // Clear existing content
    title.innerHTML = "";

    // Split title into words (preserving spacing)
    const titleWords = title.dataset.text?.split(" ") || [];
    titleWords.forEach((word) => {
      const span = document.createElement("span");
      span.style.display = "inline-block";
      span.style.opacity = "0";
      span.textContent = word + " "; // Add space after each word
      title.appendChild(span);
    });

    // GSAP animations - Right to Left (x: -70 for title)
    gsap.to(title.querySelectorAll("span"), {
      duration: 2,
      x: -20, // Animate from right to left
      autoAlpha: 1,
      stagger: 0.09, // Animate each word separately
    });
  }, []);

  useEffect(() => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1.5, // Zoom effect
        duration: 0.5,
        ease: "power1.out",
        scrollTrigger: {
          trigger: imageRef.current,
          scrub: 1, // Smooth reverse effect
          start: "top bottom",
          end: "bottom top",
        },
      });
    }
  }, []);

  if (!blog) return <Typography>No blog found</Typography>; // Ensure blog exists before rendering

  // Define metadata variables
  const metaTitle = blog.title || "Blog Details";
  const metaDescription = blog.description || "Read the latest blog details.";
  const metaKeywords = blog.category || "blog, details";

  return (
    <Box>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        {blog.meta?.[0]?.canonicalLink && (
          <link rel="canonical" href={blog.meta[0].canonicalLink} />
        )}
      </Helmet>

      <Container maxWidth="lg">
        <Grid container spacing={2} alignItems="flex-start"
          sx={{
            height: { xs: '45vh', lg: '100vh' },
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Grid item xs={12} lg={12}>
            <Typography
              sx={{
                color: "#FFF",
                fontSize: { xs: '32px', lg: '14px' },
                textTransform: "uppercase",
                letterSpacing: 2.6,
                mb: 2,
                textAlign: { xs: 'center', lg: 'left' },
              }}
            >
              {blog.category}
            </Typography>
            <Typography
              ref={titleRef}
              data-text={blog.title}
              sx={{
                color: "#FFF",
                fontSize: { xs: 66, lg: 60 },
                fontWeight: 600,
                lineHeight: { xs: "40px", sm: "60px", md: "70px" },
                textAlign: { xs: 'center', lg: 'left' },
                whiteSpace: "pre-wrap",
                mt: { xs: 4, lg: 0 },
              }}
            >
              {blog.title}
            </Typography>
            <Box sx={{
              display: "flex", alignItems: "center", justifyContent: { xs: 'center', lg: 'start' }, gap: 2, mt: { xs: 6, lg: 4 },
            }}>
              <Avatar
                alt="Top digital marketing agency offering SEO and PPC services"
                src={blog.author.avatar}
                sx={{ width: 56, height: 56 }}
              />
              <Box>
                <Typography sx={{ color: "#FFF", fontSize: { xs: '32px', lg: '18px' }, fontWeight: 600 }}>
                  {blog.author.name}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Box className="blog-details-main-wrapper"
        sx={{
          background: '#fff'
        }}
      >

        <Container maxWidth="xl" sx={{ pb: 5 }}>
          <Grid container>
            <Container maxWidth="xl">
              <Grid container spacing={2} alignItems="flex-start"

              >
                {/* Left Column (BlogContent - Sticky) */}
                <Grid item xs={12} lg={8} mt={6}

                >
                  {/* <img src={blog.bannerImage} alt="Banner" width="100%" /> */}
                  <ThumbnailBanner>
                    <GrowImage
                      ref={imageRef}
                      className="grow"
                      style={{
                        backgroundImage: `url(${blog.bannerImage})`,
                        backgroundPosition: "center 0%", // Set the top position to 40%
                      }}
                    />
                  </ThumbnailBanner>

                  <AnimatedText sx={{ color: "#ad0505", textAlign: "left", fontWeight: 700, mt: { xs: 5, lg: 4 }, fontSize: { xs: "48px", lg: "35px" } }}>
                    {blog.title}
                  </AnimatedText>

                  <Typography variant="body2" sx={{ color: "#000", mt: { xs: 4, lg: 1 }, textAlign: 'left', fontSize: { xs: "18px", lg: "16px" } }}>
                    {blog.description}
                  </Typography>
                  {blog.subpoints && blog.subpoints.map((subpoint: {
                    title: string;
                    subtitle?: string;
                    listtitle?: string;
                    list: { text: string; url?: string; color?: string; bold?: boolean }[];
                  }, index: number) => (
                    <Box key={index} sx={{ mt: 4, textAlign: 'left' }}>
                      <Typography variant="h5" sx={{ color: "#ad0505", fontWeight: 700, mt: 2 }}>
                        {subpoint.title}
                      </Typography>
                      {subpoint.subtitle && (
                        <Typography variant="body1" sx={{ color: "#000", mt: { xs: 2, lg: 1 }, fontSize: { xs: "18px", lg: "16px" } }}>
                          {subpoint.subtitle}
                        </Typography>
                      )}
                      {subpoint.listtitle && (
                        <Typography variant="body1" sx={{ color: "#000", mt: { xs: 2, lg: 1 }, fontSize: { xs: "18px", lg: "16px" }, fontWeight: 600 }}>
                          {subpoint.listtitle}
                        </Typography>
                      )}
                      {subpoint.list && subpoint.list.length > 0 && (
                        <ul style={{ marginTop: "12px", color: "#333" }}>
                          {subpoint.list.map((point: { text: string; url?: string; color?: string; bold?: boolean }, idx: number) => (
                            <li key={idx} style={{ marginBottom: "8px", fontSize: "16px" }}>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: point.color || "black",
                                  fontSize: { xs: "18px", lg: "16px" },
                                  fontWeight: point.bold ? 700 : 400,
                                  display: 'inline'
                                }}
                              >
                                {point.url ? (
                                  <a href={point.url} style={{ color: point.color || undefined, fontWeight: point.bold ? 700 : 400, textDecoration: 'underline' }}>
                                    {point.text}
                                  </a>
                                ) : (
                                  point.text
                                )}
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      )}
                    </Box>
                  ))}
                  <Grid container spacing={3} sx={{ mt: 6 }}>
                    {blog.blogImages.map((image, index) => (
                      <Grid item xs={12} sm={12} key={index}>
                        <img src={image} alt="blog" width="100%" />
                      </Grid>
                    ))}

                    <Grid item xs={12} sm={12}>
                     {blog.subpoints2 && blog.subpoints.map((subpoint: {
                    title: string;
                    subtitle?: string;
                    listtitle?: string;
                    list: { text: string; url?: string; color?: string; bold?: boolean }[];
                  }, index: number) => (
                    <Box key={index} sx={{ mt: 4, textAlign: 'left' }}>
                      <Typography variant="h5" sx={{ color: "#ad0505", fontWeight: 700, mt: 2 }}>
                        {subpoint.title}
                      </Typography>
                      {subpoint.subtitle && (
                        <Typography variant="body1" sx={{ color: "#000", mt: { xs: 2, lg: 1 }, fontSize: { xs: "18px", lg: "16px" } }}>
                          {subpoint.subtitle}
                        </Typography>
                      )}
                      {subpoint.listtitle && (
                        <Typography variant="body1" sx={{ color: "#000", mt: { xs: 2, lg: 1 }, fontSize: { xs: "18px", lg: "16px" }, fontWeight: 600 }}>
                          {subpoint.listtitle}
                        </Typography>
                      )}
                      {subpoint.list && subpoint.list.length > 0 && (
                        <ul style={{ marginTop: "12px", color: "#333" }}>
                          {subpoint.list.map((point: { text: string; url?: string; color?: string; bold?: boolean }, idx: number) => (
                            <li key={idx} style={{ marginBottom: "8px", fontSize: "16px" }}>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: point.color || "black",
                                  fontSize: { xs: "18px", lg: "16px" },
                                  fontWeight: point.bold ? 700 : 400,
                                  display: 'inline'
                                }}
                              >
                                {point.url ? (
                                  <a href={point.url} style={{ color: point.color || undefined, fontWeight: point.bold ? 700 : 400, textDecoration: 'underline' }}>
                                    {point.text}
                                  </a>
                                ) : (
                                  point.text
                                )}
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      )}
                    </Box>
                  ))}
                    </Grid>
                    <Grid item xs={12} sm={12}>

                      {blog.conclusion && (
                        <Grid item xs={12} lg={12} sx={{ mt: 2 }}>
                          <Typography variant="h6" color="black" sx={{ textAlign: "left", fontSize: { xs: "44px", lg: "35px" } }}>
                            {blog.conclusion.title}
                          </Typography>
                          <Box

                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "25px",
                              padding: "12px 0",
                              borderTop: "1px solid #14141421",
                              borderBottom: "1px solid #14141421",
                              textAlign: { xs: "center", sm: "left" },
                              mt: 5,
                              flexWrap: "wrap"
                            }}
                          >
                            <img src={blog.quoteImage} alt="blog-quote" />
                            <Typography variant="h6" color="black" sx={{ fontSize: { xs: "28px", lg: "16px" } }}>
                              {blog.conclusion.content}
                            </Typography>

                          </Box>
                        </Grid>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Typography variant="h6" color="black" sx={{ textAlign: "left", fontSize: { xs: "44px", lg: "35px" } }}>
                        {blog.extraContent.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="#74787c"
                        sx={{ mt: 3, textAlign: "justify", fontSize: '22px' }}
                      >
                        {blog.extraContent.description}
                      </Typography>
                    </Grid>

                  </Grid>


                  <Grid item xs={12} sm={12}>
                    <Box mt={1}>
                      <Typography variant="h2" sx={{ color: 'black', textAlign: 'left', mt: 4 }}>
                        {blog.faqData.title}
                      </Typography>
                      {blog.faqData.questions.map((faq, index) => (

                        <Box key={index}>
                          <Accordion
                            expanded={expanded === index}
                            onChange={() => handleAccordionChange(index)}
                            sx={{ boxShadow: "none" }}
                          >
                            <AccordionSummary
                              expandIcon={expanded === index ? <RemoveIcon /> : <AddIcon />}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {/* Question & Icon Side by Side */}
                              <Box sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between" }}>
                                <Typography
                                  variant="body1"
                                  color="black"

                                  sx={{
                                    textAlign: "left",
                                    fontSize: { xs: "38px", lg: "18px" },
                                    flexGrow: 1, // Makes sure text takes available space
                                    fontWeight: 600
                                  }}
                                >
                                  {faq.question}
                                </Typography>
                              </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography
                                variant="body2"
                                color="#000"
                                sx={{
                                  textAlign: "justify",
                                  fontSize: { xs: "34px", lg: "18px" }, // Updated font size
                                }}
                              >
                                {faq.answer}
                              </Typography>
                            </AccordionDetails>
                          </Accordion>

                          {/* Divider below every FAQ */}
                          <Divider />
                        </Box>
                      ))}
                    </Box>
                  </Grid>

                  <Box>
                    <Form />
                  </Box>
                </Grid>

                {/* Right Column (Sidebar) */}
                <Grid item xs={12} lg={4} mt={6}
                >
                  <Categories />
                  <LatestBlogs />
                  {/* <GalleryPost /> */}
                  <PopularTags />
                </Grid>
              </Grid>
            </Container>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default BlogDetails;
