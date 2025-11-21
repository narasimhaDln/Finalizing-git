import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Container,
  Box,
} from "@mui/material";
import {
  LocationOn,
  AccessTime,
  Work,
  People,
  CheckCircle,
  HourglassEmpty,
  
} from "@mui/icons-material";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';


// ✅ Props Interface
interface QualificationProps {
  location: string;
  openings: number;
  status: string;
  minExperience: number;
  maxExperience: number;
  minSalary: number;
  maxSalary: number;
  isInternship: boolean;
  applicationCount: number;
  createdAt: string;
}

const Qualification: React.FC<QualificationProps> = ({
  location,
  openings,
  status,
  minExperience,
  maxExperience,
  minSalary,
  maxSalary,
  isInternship,
  applicationCount,
  createdAt,
}) => {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const details = [
    { icon: <AccessTime />, label: "Posted On", value: formattedDate },
    { icon: <LocationOn />, label: "Location", value: location },
    { icon: <CurrencyRupeeIcon />, label: "Salary", value: `₹${minSalary} - ₹${maxSalary}` },
    { icon: <Work />, label: "Experience", value: `${minExperience} - ${maxExperience} yrs` },
    { icon: <People />, label: "Openings", value: openings },
    { icon: <CheckCircle />, label: "Status", value: status },
    { icon: <HourglassEmpty />, label: "Internship", value: isInternship ? "Yes" : "No" },
    { icon: <People />, label: "Applications", value: applicationCount },
  ];

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 1, md:0,lg: 0 },mb:2 }}>
      <Card
        sx={{
          p: 2,
          borderRadius: 2,
          boxShadow: 3,
          background: "#0E0E0E",
          color: "white",
          mt: 5,
        }}
      >
        <CardContent>
          <Stack spacing={2}>
            {details.map((item, index) => (
              <Stack key={index} direction="row" alignItems="center" spacing={1}>
                <Box sx={{ color: "white", fontSize: { xs: "16px", md: "18px" ,lg: "18px"} }}>
                  {item.icon}
                </Box>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{ textAlign: "justify", flex: 1, fontSize: { xs: "16px", md: "18px" , lg: "18px" } }}
                >
                  {item.label}:
                </Typography>
                <Typography
                  variant="body2"
                  color="white"
                  sx={{ textAlign: "justify", fontSize: { xs: "16px",  md: "18px" ,lg: "18px" } }}
                >
                  {item.value}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Qualification;
