import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { blogData } from "./BlogData";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Stack,
  Link,
  Avatar,
  CardMedia,
  GridLegacy as Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AnimatedText from "../../../Components/Inputs/AnimatedText";
import Categories from "../Categories";
import LatestBlogs from "../LatestBlogs";
import PopularTags from "../PopularTags";
import Form from "./Form";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { styled } from "@mui/material";

gsap.registerPlugin(ScrollTrigger);

const ThumbnailBanner = styled(Box)({
  position: "relative",
  height: "350px",
  width: "100%",
  overflow: "hidden",
});

const GrowImage = styled("div")({
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundAttachment: "fixed",
  backgroundPosition: "center",
  height: "100%",
  width: "100%",
  transform: "scale(1)",
});

const BlogDetails: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const [blog, setBlog] = useState<any>(null);
  const [isDynamic, setIsDynamic] = useState(false);
  const [expanded, setExpanded] = useState<number | false>(0);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const profile = {
    name: "Dezign Shark",
    description:
      "Empowering businesses through exceptional branding and marketing solutions. Branding, Content Marketing & Social Media",
    avatarUrl: "https://dprstorage.b-cdn.net/dezignshark/linkedinlogo.jpeg",
    linkedInUrl: "https://www.linkedin.com/company/dezignshark/",
  };

  useEffect(() => {
    const formattedSlug = slug?.toLowerCase();
    const staticBlog = blogData.find((b) => {
      const s = b.title
        .toLowerCase()
        .replace(/[|/:]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+$/, "");
      return s === formattedSlug;
    });
    if (staticBlog) {
      setBlog(staticBlog);
      setIsDynamic(false);
    } else {
      axios
        .get("https://blog.dprprop.com/clients/68188a545485188c126d163c/blogs")
        .then((res) => {
          const dynamicBlog = res.data.blogs.find((b: any) => b.slug === slug);
          if (dynamicBlog) {
            setBlog(dynamicBlog);
            setIsDynamic(true);
          }
        });
    }
  }, [slug]);

  useEffect(() => {
    if (!titleRef.current || !blog) return;
    const title = titleRef.current;
    title.innerHTML = "";
    (blog.title?.split(" ") || []).forEach((word: string) => {
      const span = document.createElement("span");
      span.style.display = "inline-block";
      span.style.opacity = "0";
      span.textContent = word + " ";
      title.appendChild(span);
    });
    gsap.to(title.querySelectorAll("span"), { duration: 2, x: -20, autoAlpha: 1, stagger: 0.09 });
  }, [blog]);

  useEffect(() => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1.5,
        duration: 0.5,
        ease: "power1.out",
        scrollTrigger: {
          trigger: imageRef.current,
          scrub: 1,
          start: "top bottom",
          end: "bottom top",
        },
      });
    }
  }, []);

  if (!blog) return <Typography>Loading blog...</Typography>;
  const appUrl = isDynamic ? blog.posturl : `${window.location.origin}/blog/${slug}`;
  const handleAccordionChange = (panel: number) => setExpanded(expanded === panel ? false : panel);

  return (
    <Box sx={{ background: "white" }}>

      {/* Header Title */}
      <Box sx={{ background: "black" }}>
        <Container maxWidth="lg">
          <Grid
            container
            spacing={2}
            alignItems="flex-start"
            sx={{
              height: { xs: "55vh", md: "85vh", lg: "100vh" },
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "center", md: "flex-start", lg: "flex-start" },
              ml: 0,
            }}
          >
            <Grid item xs={12} lg={12}>
              {isDynamic ? (
                <Typography
                  ref={titleRef}
                  data-text={blog.title}
                  sx={{
                    color: "#FFF",
                    fontSize: { xs: 24, md: 40, lg: 60 },
                    fontWeight: 600,
                    lineHeight: { xs: "40px", sm: "60px", md: "70px" },
                    textAlign: { xs: "center", lg: "left" },
                    whiteSpace: "pre-wrap",
                    mt: { xs: 4, lg: 0 },
                  }}
                >
                  {blog.title}
                </Typography>
              ) : (
                <>
                  <Typography
                    sx={{
                      color: "#FFF",
                      fontSize: { xs: "20px", md: "14px", lg: "14px" },
                      textTransform: "uppercase",
                      letterSpacing: 2.6,
                      mb: 2,
                      textAlign: { xs: "center", lg: "left" },
                    }}
                  >
                    {blog.category}
                  </Typography>
                  <Typography
                  variant="h1"
                    ref={titleRef}
                    data-text={blog.title}
                    sx={{
                      color: "#FFF",
                      fontSize: { xs: 24, md: 40, lg: 60 },
                      fontWeight: 600,
                      lineHeight: { xs: "40px", sm: "60px", md: "70px" },
                      textAlign: { xs: "center", lg: "left" },
                      whiteSpace: "pre-wrap",
                      mt: { xs: 4, lg: 0 },
                    }}
                  >
                    {blog.title}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: { xs: "center", lg: "start" },
                      gap: 2,
                      mt: { xs: 6, lg: 4 },
                    }}
                  >
                    <Avatar
                      alt="Top digital marketing agency offering SEO and PPC services"
                      src={blog.author?.avatar}
                      sx={{ width: { xs: 46, md: 56, lg: 56 }, height: { xs: 46, md: 56, lg: 56 } }}
                    />
                    <Box>
                      <Typography
                        sx={{
                          color: "#FFF",
                          fontSize: { xs: "16px", lg: "18px" },
                          fontWeight: 600,
                        }}
                      >
                        {blog.author?.name}
                      </Typography>
                    </Box>
                  </Box>
                </>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container maxWidth={false} sx={{ pb: 8 }}>
        <Box sx={{ mb: 5, px: { xs: 0, md: 1, lg: 1 }, mt: { xs: "40px", md: "10px", lg: "10px" } }}>
          {/* Image */}
          {isDynamic && (
            <CardMedia
              component="img"
              height="auto"
              src={`https://dprstorage.b-cdn.net${blog.imageurl}`}
              alt="Blog"
              sx={{ transition: "transform 0.3s ease-in-out", mt: 16 }}
              loading="lazy"
            />
          )}
          {/* Content for Dynamic Blogs */}
          {isDynamic ? (
            <>
              {blog.sections?.map((section: any) => {
                const Tag = section.type as keyof HTMLElementTagNameMap;
                return (
                  <Box key={section._id} sx={{ marginBottom: "20px", textAlign: "start" }}>
                    {React.createElement(Tag, { style: { marginBottom: "5px", color: "#000" } }, section.title)}
                    {section.description
                      .replace(/\/n/g, "\n")
                      .split("\n")
                      .map((line: string, idx: number) => (
                        <Typography key={idx} variant="body2" sx={{ color: "black", mb: 1 }}>
                          {line}
                        </Typography>
                      ))}
                  </Box>
                );
              })}
            </>
          ) : (
            <>
              <Box
                className="blog-details-main-wrapper"
                sx={{
                  background: "#fff",
                }}
              >
                <Container maxWidth="xl" sx={{ pb: 5 }}>
                  <Grid container>
                    <Box>
                      <Grid container spacing={2} alignItems="flex-start">
                        {/* Left Column (BlogContent - Sticky) */}
                        <Grid item xs={12} md={8} lg={8} sx={{ mt: { xs: 0, md: 4, lg: 6 } }}>
                          {/* <img src={blog.bannerImage} alt="Banner" width="100%" /> */}
                          <ThumbnailBanner sx={{ height: { xs: "180px", md: "250px", lg: "350px" } }}>
                            <GrowImage
                              ref={imageRef}
                              className="grow"
                              style={{
                                backgroundImage: `url(${blog.bannerImage})`,
                                backgroundPosition: "center 0%", // Set the top position to 40%
                              }}
                            />
                          </ThumbnailBanner>

                          <AnimatedText
                            sx={{
                              color: "#ad0505",
                              textAlign: "left",
                              fontWeight: 700,
                              mt: { xs: 5, lg: 4 },
                              fontSize: { xs: "18px", md: "25px", lg: "35px" },
                            }}
                          >
                            {blog.title}
                          </AnimatedText>

                          <Typography
                            variant="body2"
                            sx={{ color: "#000", mt: { xs: 4, lg: 1 }, textAlign: "left" }}
                          >
                            {blog.description}
                          </Typography>
                          {blog.subpoints.map(
                            (subpoint: { title: string; subtitle: string; listtitle: string; list: string[] }, index: number) => (
                              <Box key={index} sx={{ mt: 4, textAlign: "left" }}>
                                {subpoint.title && (
                                  <Typography variant="h4" sx={{ color: "#ad0505", fontWeight: 700, mt: 2 }}>
                                    {subpoint.title}
                                  </Typography>
                                )}
                                {subpoint.subtitle && (
                                  <Typography variant="body2" sx={{ color: "#000", mt: { xs: 4, lg: 1 } }}>
                                    {subpoint.subtitle.split("\n").map((line: string, idx: number) => (
                                      <span key={idx}>
                                        {line}
                                        <br />
                                      </span>
                                    ))}
                                  </Typography>
                                )}
                                {subpoint.listtitle && (
                                  <Typography variant="body2" sx={{ color: "#000", mt: { xs: 4, lg: 1 }, fontWeight: 600 }}>
                                    {subpoint.listtitle}
                                  </Typography>
                                )}
                                <ul style={{ marginTop: "12px", color: "#333" }}>
                                  {subpoint.list.map((point: any, idx: number) => {
                                    // If point is a string, render as plain text
                                    if (typeof point === "string") {
                                      return (
                                        <li key={idx} style={{ marginBottom: "8px", fontSize: "16px" }}>
                                          <Typography
                                            variant="body2"
                                            sx={{
                                              color: "black",
                                              fontWeight: 400,
                                              // fontSize: { xs: "18px", lg: "16px" }
                                            }}
                                          >
                                            {point}
                                          </Typography>
                                        </li>
                                      );
                                    }
                                    // If point is an object, render with styles and link if url exists
                                    return (
                                      <li key={idx} style={{ marginBottom: "8px", fontSize: "16px" }}>
                                        {point.url ? (
                                          <Link
                                            href={point.url}
                                            sx={{
                                              color: point.color || "inherit",
                                              fontWeight: point.bold ? 700 : 400,
                                              // textDecoration: "underline",
                                              cursor: "pointer",
                                              // fontSize: { xs: "18px", lg: "16px" },
                                              "&:hover": {
                                                textDecoration: "none",
                                              },
                                            }}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            <span dangerouslySetInnerHTML={{ __html: point.text }} />
                                          </Link>
                                        ) : (
                                          <Typography
                                            variant="body2"
                                            sx={{
                                              color: point.color || "black",
                                              fontWeight: point.bold ? 700 : 400,
                                              // fontSize: { xs: "18px", lg: "16px" }
                                            }}
                                          >
                                            <span dangerouslySetInnerHTML={{ __html: point.text }} />
                                          </Typography>
                                        )}
                                      </li>
                                    );
                                  })}
                                </ul>
                              </Box>
                            )
                          )}
                          <Grid container spacing={3} sx={{ mt: 6 }}>
                            {blog.blogImages.map((image: string, index: number) => (
                              <Grid item xs={12} md={12} lg={12} key={index}>
                                <img src={image} alt="blog" width="100%" />
                              </Grid>
                            ))}

                            <Grid item xs={12} md={12} lg={12}>
                              {blog.subpoints2.map(
                                (subpoint: { title: string; subtitle: string; listtitle: string; list: string[] }, index: number) => (
                                  <Box key={index} sx={{ mt: 4, textAlign: "left" }}>
                                    {subpoint.title && (
                                      <Typography variant="h4" sx={{ color: "#ad0505", fontWeight: 700, mt: 2 }}>
                                        {subpoint.title}
                                      </Typography>
                                    )}
                                    {subpoint.subtitle && (
                                      <Typography variant="body2" sx={{ color: "#000", mt: { xs: 4, lg: 1 } }}>
                                        {subpoint.subtitle.split("\n").map((line: string, idx: number) => (
                                          <span key={idx}>
                                            {line}
                                            <br />
                                          </span>
                                        ))}
                                      </Typography>
                                    )}
                                    {subpoint.listtitle && (
                                      <Typography variant="body1" sx={{ color: "#000", mt: { xs: 4, lg: 1 }, fontWeight: 600 }}>
                                        {subpoint.listtitle}
                                      </Typography>
                                    )}
                                    <ul style={{ marginTop: "12px", color: "#333" }}>
                                      {subpoint.list.map((point: any, idx: number) => {
                                        // If point is a string, render as plain text
                                        if (typeof point === "string") {
                                          return (
                                            <li key={idx} style={{ marginBottom: "8px", fontSize: "16px" }}>
                                              <Typography
                                                variant="body2"
                                                sx={{
                                                  color: "black",
                                                  fontWeight: 400,
                                                  // fontSize: { xs: "18px", lg: "16px" }
                                                }}
                                              >
                                                {point}
                                              </Typography>
                                            </li>
                                          );
                                        }
                                        // If point is an object, render with styles and link if url exists
                                        return (
                                          <li key={idx} style={{ marginBottom: "8px", fontSize: "16px" }}>
                                            {point.url ? (
                                              <Link
                                                href={point.url}
                                                sx={{
                                                  color: point.color || "inherit",
                                                  fontWeight: point.bold ? 700 : 400,
                                                  // textDecoration: "underline",
                                                  cursor: "pointer",
                                                  // fontSize: { xs: "18px", lg: "16px" },
                                                  "&:hover": {
                                                    textDecoration: "none",
                                                  },
                                                }}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                <span dangerouslySetInnerHTML={{ __html: point.text }} />
                                              </Link>
                                            ) : (
                                              <Typography
                                                variant="body2"
                                                sx={{
                                                  color: point.color || "black",
                                                  fontWeight: point.bold ? 700 : 400,
                                                  // fontSize: { xs: "18px", lg: "16px" }
                                                }}
                                              >
                                                <span dangerouslySetInnerHTML={{ __html: point.text }} />
                                              </Typography>
                                            )}
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </Box>
                                )
                              )}
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              {blog.conclusion && (
                                <Grid item xs={12} lg={12} sx={{ mt: 2 }}>
                                  <Typography variant="h6" color="black" sx={{ textAlign: "left" }}>
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
                                      flexWrap: "wrap",
                                    }}
                                  >
                                    <img src={blog.quoteImage} alt="blog-quote" />
                                    {/* <Typography variant="h6" color="black" sx={{ fontSize: { xs: "28px", lg: "16px" } }}>
                                      {blog.conclusion.content}
                                    </Typography> */}
                                    <Typography variant="h6" color="black" sx={{ textAlign: "left" }}>
                                      <ul style={{ paddingLeft: "20px", margin: 0 }}>
                                        {blog.conclusion.content.split("\n").map((line: string, idx: number) => (
                                          <li key={idx} style={{ marginBottom: "8px" }}>
                                            {line.trim()}
                                          </li>
                                        ))}
                                      </ul>
                                    </Typography>
                                  </Box>
                                </Grid>
                              )}
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                              <Typography variant="h6" color="black" sx={{ textAlign: "left" }}>
                                {blog.extraContent.title}
                              </Typography>
                              <Typography
                                variant="body1"
                                color="#74787c"
                                sx={{ mt: 3, textAlign: "justify" }}
                              >
                                {blog.extraContent.description}
                              </Typography>
                            </Grid>
                          </Grid>

                          <Grid item xs={12} sm={12}>
                            <Box mt={1}>
                              <Typography variant="h2" sx={{ color: "black", textAlign: "left", mt: 4 }}>
                                {blog.faqData.title}
                              </Typography>
                              {blog.faqData.questions.map((faq: { question: string; answer: string }, index: number) => (
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
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          width: "100%",
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        <Typography
                                          variant="body1"
                                          color="black"
                                          sx={{
                                            textAlign: "left",
                                            // fontSize: { xs: "38px", lg: "18px" },
                                            flexGrow: 1, // Makes sure text takes available space
                                            fontWeight: 600,
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
                                          // fontSize: { xs: "34px", lg: "18px" }, // Updated font size
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
                        <Grid item xs={12} md={4} lg={4} mt={6}>
                          <Categories />
                          <LatestBlogs />
                          {/* <GalleryPost /> */}
                          <PopularTags />
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Container>
              </Box>
            </>
          )}
          {/* Social Share Icons */}
          {isDynamic && (
            <Box sx={{ mt: 6 }}>
              <Typography variant="h4" sx={{ mb: 3, textAlign: "start", color: "black" }}>
                Share this story:
              </Typography>
              <Stack direction="row" spacing={1}>
                <IconButton
                  component="a"
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(appUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  sx={{
                    backgroundColor: "#ad0505",
                    borderRadius: "10px",
                    p: 1,
                    "&:hover": {
                      backgroundColor: "#000",
                    },
                  }}
                >
                  <FacebookIcon color="primary" sx={{ fontSize: "30px" }} />
                </IconButton>

                <IconButton
                  component="a"
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(appUrl)}&text=${encodeURIComponent(blog.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  sx={{
                    backgroundColor: "#ad0505",
                    borderRadius: "10px",
                    p: 1,
                    "&:hover": {
                      backgroundColor: "#000",
                    },
                  }}
                >
                  <TwitterIcon color="primary" sx={{ fontSize: "30px" }} />
                </IconButton>

                <IconButton
                  component="a"
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(appUrl)}&title=${encodeURIComponent(blog.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  sx={{
                    backgroundColor: "#ad0505",
                    borderRadius: "10px",
                    p: 1,
                    "&:hover": {
                      backgroundColor: "#000",
                    },
                  }}
                >
                  <LinkedInIcon color="primary" sx={{ fontSize: "30px" }} />
                </IconButton>
              </Stack>
            </Box>
          )}
          {/* Author Profile */}
          {isDynamic && (
            <Link
              href={profile.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ textDecoration: "none" }}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={2}
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  maxWidth: 1000,
                  backgroundColor: "#fff",
                  boxShadow: 1,
                  mt: 5,
                }}
              >
                <Box
                  display="flex"
                  alignItems="start"
                  gap={2}
                  sx={{ flexDirection: { xs: "column", sm: "row" }, width: "100%" }}
                >
                  <Avatar src={profile.avatarUrl} alt={profile.name} sx={{ width: 100, height: 100 }} />
                  <Box>
                    <Typography fontWeight="bold" sx={{ textAlign: "start", color: "black" }}>
                      {profile.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: "start", mt: 1 }}>
                      {profile.description}
                    </Typography>
                  </Box>
                  <Box
                    component="img"
                    src="https://dprstorage.b-cdn.net/RW/LinkedIn-Logo.wine.png"
                    alt="LinkedIn"
                    sx={{ width: 160, height: 100 }}
                  />
                </Box>
              </Box>
            </Link>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default BlogDetails;
