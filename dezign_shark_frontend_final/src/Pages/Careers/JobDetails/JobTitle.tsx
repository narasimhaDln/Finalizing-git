import React from "react";
import {
  Card, CardContent, Box, Typography, Chip, GridLegacy as Grid,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import { shark } from "../../../assets";

// ✅ Define props type
interface JobTitleProps {
  title: string;
  department: string;
  location: string;
  createdAt: string;
  minSalary: number;
  maxSalary: number;
  jobType: string;
  urgent?: boolean;
  isInternship: boolean;
  applicationCount: number;
  featured: boolean;
}

const JobTitle: React.FC<JobTitleProps> = ({
  title,
  department,
  location,
  createdAt,
  minSalary,
  maxSalary,
  jobType,
  isInternship,
  applicationCount,
  featured,
}) => {
  return (
    <Card
      sx={{
        padding: 2,
        background: "#0E0E0E",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Grid container spacing={2} sx={{ pl: { md: 12, xs: 0 } }}>
        {/* Main content */}
        <Grid item xs={12} order={{ xs: 2, md: 1 }}>
          <CardContent sx={{ padding: 0 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              color="white"
              textAlign="start"
              sx={{ fontSize: { xs: "24px", lg: "28px" } }}
            >
              {title}
            </Typography>

            <Grid container spacing={5} alignItems="center" sx={{ mt: 1 }}>
              <Grid item sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <WorkIcon sx={{ fontSize: 16, color: "white" }} />
                <Typography variant="body2" color="white">
                  {department}
                </Typography>
              </Grid>

              <Grid item sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOnIcon sx={{ fontSize: 16, color: "white" }} />
                <Typography variant="body2" color="white">
                  {location}
                </Typography>
              </Grid>

              <Grid item sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CalendarTodayIcon sx={{ fontSize: 16, color: "white" }} />
                <Typography variant="body2" color="white">
                  {new Date(createdAt).toLocaleDateString()}
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant="body2" color="white">
                  ₹{minSalary} - ₹{maxSalary} / month
                </Typography>
              </Grid>
            </Grid>

            {/* Chips */}
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <Chip
                  label={jobType}
                  sx={{
                    backgroundColor: "#dbeafe",
                    color: "#1e40af",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                />
              </Grid>

              {featured && (
                <Grid item xs={12} sm={6} md={4} lg={2}>
                  <Chip
                    label="Featured"
                    sx={{
                      backgroundColor: "#fff3cd",
                      color: "#b45309",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  />
                </Grid>
              )}

              <Grid item xs={12} sm={6} md={4} lg={4} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PeopleIcon sx={{ fontSize: 16, color: "white" }} />
                <Typography variant="body2" color="white">
                  Applications: {applicationCount}
                </Typography>
              </Grid>

              {isInternship && (
                <Grid item xs={12} sm={6} md={4} lg={2}>
                  <Chip
                    label="Internship"
                    icon={<SchoolIcon />}
                    sx={{
                      backgroundColor: "#e0f7fa",
                      color: "#006064",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  />
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Grid>

        {/* Shark Avatar - responsive positioning */}
        <Grid item xs={12} md="auto" order={{ xs: 1, md: 2 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              backgroundImage: `url(${shark})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "50%",
              boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
              position: { xs: "static", md: "absolute" },
              display:{xs:'none', md: 'block',lg: 'block'},
              top: { md: 10 },
              left: { md: 10 },
              mx: { xs: "auto", md: 0 },
              mb: { xs: 2, md: 0 },
            }}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default JobTitle;
