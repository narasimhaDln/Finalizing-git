import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

// ✅ Props Interface
interface JobDescriptionProps {
  description: string;
  responsibilities: string[];
  requirements: string[];
}

const JobDescription: React.FC<JobDescriptionProps> = ({ description, responsibilities, requirements }) => {
  return (
    <Box sx={{  mx: "auto", p: 3 }}>
      {/* Description */}
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        sx={{ color: "#fc0000", textAlign: "start", fontSize: { xs: "28px", lg: "20px" } }}
      >
        Job Overview
      </Typography>

      <Typography variant="body2" sx={{ color: "#555" }} paragraph>
        {description}
      </Typography>

      {/* Responsibilities */}
      {responsibilities?.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#fc0000", textAlign: "start", fontSize: { xs: "24px", lg: "18px" } }}
          >
            Responsibilities
          </Typography>
          <List>
            {responsibilities.map((item, idx) => (
              <ListItem key={idx} sx={{ display: "flex", alignItems: "flex-start" }}>
                <FiberManualRecordIcon sx={{ fontSize: 8, color: "#74787c", mr: 1 ,mt:1}} />
                <Typography variant="body2" sx={{ color: "#74787c" }}>{item}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {/* Requirements */}
      {requirements?.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#fc0000", textAlign: "start", fontSize: { xs: "24px", lg: "18px" } }}
          >
            Requirements
          </Typography>
          <List>
            {requirements.map((item, idx) => (
              <ListItem key={idx} sx={{ display: "flex", alignItems: "flex-start" }}>
                <FiberManualRecordIcon sx={{ fontSize: 8, color: "#74787c", mr: 1 ,mt:1}} />
                <Typography variant="body2" sx={{ color: "#74787c" }}>{item}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default JobDescription;
