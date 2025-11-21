import { useState } from "react";

interface JobDetails {
  datePosted: string;
  location: string;
  salary: string;
  expirationDate: string;
  experience: string;
  gender: string;
  qualification: string;
  careerLevel: string;
}

const useJobDetails = () => {
  const [jobDetails] = useState<JobDetails>({
    datePosted: "May 3, 2021",
    location: "New York",
    salary: "3.5Lpa - 4.0Lpa",
    expirationDate: "May 5, 2025",
    experience: "2 Year",
    gender: "Male",
    qualification: " Degree",
    careerLevel: "Executive",
  });

  return { jobDetails };
};

export default useJobDetails;
