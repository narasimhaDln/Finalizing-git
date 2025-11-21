import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, IconButton, GridLegacy as Grid, Container,  } from "@mui/material";
import { gsap } from "gsap";
import { MdOutlineArrowUpward } from "react-icons/md";
import AnimatedText from "../../Components/Inputs/AnimatedText";
import CustomButton from "../../Components/Inputs/CustomButton";
import { useNavigate } from "react-router-dom";




const faqData = [
    {
        question: "If I can design in Canva, why do I need an agency?",
        answer: "Canva is great—for birthday invites. If you want a brand that actually converts, you might need more than drag-and-drop.",
    },
    {
        question: "Can’t I just post randomly on Instagram and get leads?",
        answer: "Sure, if you believe in miracles. But if you prefer strategy over wishful thinking, that’s where we come in..",
    },
    {
        question: "Why should I pay you when I can just boost my posts?",
        answer: "Because ‘boosting’ without a plan is like throwing money into a bonfire—looks cool but burns fast.",
    },
    {
        question: "My cousin knows SEO. Why should I hire an agency?",
        answer: "If ranking on Google was as easy as ‘adding keywords,’ your cousin would be a billionaire. Spoiler: He’s not.",
    },

];

const FAQSection: React.FC = () => {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const contentRefs = useRef<Array<HTMLDivElement | null>>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (hoverIndex !== null && contentRefs.current[hoverIndex]) {
            gsap.to(contentRefs.current[hoverIndex], {
                height: "auto",
                opacity: 1,
                duration: 0.5,
                ease: "power2.out",
            });
        }

        return () => {
            if (hoverIndex !== null && contentRefs.current[hoverIndex]) {
                gsap.to(contentRefs.current[hoverIndex], {
                    height: 0,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.in",
                });
            }
        };
    }, [hoverIndex]);

    return (
        <Box py={5}>
            <Container maxWidth="xl" sx={{ py: 2 }}>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    {/* Grid Item 1 - Left Side Image */}
                    <Grid item xs={12} md={5} lg={5} sx={{ display: "flex", justifyContent: "center" }}>
                        <Box>

                            <Box
                                component="img"
                                src="https://dprstorage.b-cdn.net/dezignshark/aboutshark.png"
                                alt="Top digital marketing agency offering SEO and PPC services."
                                sx={{
                                    width: { xs: "100%", lg: "100%" },

                                    borderRadius: "8px",
                                    objectFit: "cover",
                                }}
                            />
                        </Box>
                    </Grid>

                    {/* Grid Item 2 - Right Side FAQ Section */}
                    <Grid item xs={12} md={7} lg={7}>
                        <Container maxWidth='xl'>

                            <AnimatedText sx={{ mb: 4, textAlign: "left" }}>
                                FAQ'S
                            </AnimatedText>
                        </Container>
                        <Box
                            sx={{
                                color: "#fff",
                                // padding: "60px",
                                textAlign: "left",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",

                                mt: 1
                            }}
                        >


                            {/* Right Side - FAQ Section */}
                            <Box sx={{ position: "relative" }}>
                                {/* Persistent Vertical Line Running Through FAQs */}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        left: "80px",
                                        top: "0",
                                        bottom: "0",
                                        width: "1px",
                                        backgroundColor: "#2B2B2B",
                                    }}
                                />

                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        // mt: 3,
                                        borderTop: "1px solid #2B2B2B", // Top border line

                                    }}
                                >
                                    {faqData.map((faq, index) => (
                                        <Box key={index} sx={{ position: "relative", cursor: 'none' }}>
                                            {/* Horizontal Separator Line */}
                                            {index !== 0 && (
                                                <Box
                                                    sx={{
                                                        position: "absolute",
                                                        top: 0,
                                                        left: 0,
                                                        width: "100%",
                                                        height: "1px",
                                                        backgroundColor: "#2B2B2B",
                                                    }}
                                                />
                                            )}

                                            {/* Question Section */}
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    cursor: "none",
                                                    padding: "10px 0",
                                                    gap: "15px",
                                                    position: "relative",
                                                }}
                                                onMouseEnter={() => setHoverIndex(index)}
                                                onMouseLeave={() => setHoverIndex(null)}
                                            >
                                                {/* Circular Expand Icon beside Line */}
                                                <Box sx={{ display: "flex", alignItems: "start", gap: "15px" }}>
                                                    <IconButton
                                                        sx={{
                                                            color: "#fff",
                                                            border: "1px solid #2B2B2B",
                                                            borderRadius: "50%",
                                                            transition: "0.3s",
                                                            width: "60px",
                                                            height: "60px",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                        }}
                                                    >
                                                        <MdOutlineArrowUpward
                                                            style={{
                                                                transform: hoverIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                                                                transition: "0.3s",
                                                                fontSize: '50px',
                                                                color: '#2b2b2b'
                                                            }}
                                                        />
                                                    </IconButton>
                                                </Box>

                                                {/* Question Text */}
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        flex: 1,
                                                        // fontSize: { xs: '38px', lg: '20px' },
                                                        fontWeight: 700,
                                                        textTransform: "uppercase",
                                                        pl: { xs: 5, lg: 4 },
                                                        cursor: 'none'
                                                    }}
                                                >
                                                    {faq.question}
                                                </Typography>
                                            </Box>

                                            {/* Answer Section */}
                                            <Box
                                                ref={(el) => {
                                                    contentRefs.current[index] = el as HTMLDivElement | null;
                                                }}
                                                sx={{
                                                    height: 0,
                                                    overflow: "hidden",
                                                    opacity: 0,
                                                    paddingLeft: "30px",
                                                    marginBottom: "10px",
                                                }}
                                            >
                                                <Typography variant='body1'
                                                    sx={{ opacity: 0.8, pl: 10 }}>
                                                    {faq.answer}
                                                </Typography>
                                            </Box>

                                            {/* Bottom Line */}
                                            <Box
                                                sx={{
                                                    width: "100%",
                                                    height: "1px",
                                                    backgroundColor: "#2B2B2B",
                                                    marginTop: "10px",
                                                }}
                                            />
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Grid Item 3 - Read More Button */}
                    <Grid item xs={12}>
                        <Box sx={{ mt: { xs: 5, md: 0, lg: 0 }, textAlign: "center" }}>
                            <CustomButton
                                sx={{
                                    height: { xs: '50px', md: '40px' , lg: '40px'},
                                    width: { xs: '60%', md: '160px' , lg: '160px'},
                                    // fontSize: { xs: '35px', md: '14px' , lg: '14px'}
                                }}
                                onClick={() => navigate("/faqs")}
                            >
                                Read More
                            </CustomButton>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default FAQSection;
