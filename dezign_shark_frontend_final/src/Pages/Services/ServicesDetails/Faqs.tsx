import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, GridLegacy as Grid, Divider } from "@mui/material";
import { gsap } from "gsap";
import { Services } from "../../../assets"; // Ensure this path is correct
import AddIcon from "@mui/icons-material/Add"; // "+" Icon
import RemoveIcon from "@mui/icons-material/Remove"; // "-" Icon

// FAQ data
const faqData = [
  {
    question: "What is a market strategy for growth?",
    answer:
      "A Market Strategy For Growth outlines the approach a business takes to expand its reach, customer base, and revenue.",
  },
  {
    question: "How do you identify growth opportunities?",
    answer:
      "Growth opportunities are identified through market research, customer feedback, competitor analysis, and emerging industry trends.",
  },
  {
    question: "What does a typical market strategy include?",
    answer:
      "A market strategy typically includes customer segmentation, competitive positioning, pricing models, and promotional tactics.",
  },
  {
    question: "Do you only focus on customer acquisition?",
    answer:
      "No, market strategy also includes customer retention, engagement, and maximizing lifetime value along with acquisition.",
  },
];

const FAQs: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState<number | false>(0); // ✅ First FAQ open by default

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }
  }, []);

  const handleAccordionChange = (panel: number) => {
    setExpanded(expanded === panel ? false : panel);
  };

  return (
    <Box ref={containerRef} height="100vh">
      <Box p={3}>
        <Grid container spacing={2} alignItems="start">
          {/* Left Side - Image (6 Columns) */}
          <Grid item xs={12} md={6}>
            <img
              src={Services.faqservices} // ✅ Ensure this path is correct
              alt="Top digital marketing agency offering SEO and PPC services"
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </Grid>

          {/* Right Side - FAQ (6 Columns) */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" fontWeight={700} gutterBottom color="black" sx={{ textAlign: "left" }}>
              Market Strategy Growth FAQ
            </Typography>

            {/* Top Divider */}
            <Divider />

            {faqData.map((faq, index) => (
              <Box key={index}>
                {/* Accordion with First One Open */}
                <Accordion
                  expanded={expanded === index}
                  onChange={() => handleAccordionChange(index)}
                  sx={{
                    boxShadow: "none",
                  }}
                >
                  <AccordionSummary
                    expandIcon={expanded === index ? <RemoveIcon /> : <AddIcon />}
                  >
                    <Typography variant="body1" color="black">
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2"  color="#74787C" sx={{ textAlign: "left" }}>
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                {/* Divider below every FAQ */}
                <Divider sx={{ marginY: 1 }} />
              </Box>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default FAQs;
