import { Box, Container, GridLegacy as Grid } from '@mui/material';
import JobTitle from './JobTitle';
import { breadcrumbbanner } from '../../../assets';
import DeadLine from './DeadLine';
import Qualification from './Qualification';
import Breadcrumb from '../../../Components/Breadcrumb';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getJobById } from '../../../api/services';
import JobDescription from './JobDescription';

const JobDetails = () => {
  const { id } = useParams(); // job ID from URL
  const { data, isLoading, error } = useQuery(['job', id], () =>
    getJobById(id!),
  );

  const job = data?.data;

  if (isLoading) {
    return <Box sx={{ p: 4 }}>Loading job details...</Box>;
  }

  if (error || !job) {
    return <Box sx={{ p: 4, color: 'red' }}>Job not found.</Box>;
  }

  return (
    <Box>
      <Breadcrumb
        title="Job Details"
        subtitle={job.title}
        backgroundImage={breadcrumbbanner}
        overlayText="Careers"
      />

      {/* Main Content */}
      <Box sx={{ position: 'relative', zIndex: 2, background: 'white' }}>
        <Container maxWidth="xl">
          <Grid
            container
            spacing={{ xs: 4, md: 10, lg: 16 }}
            sx={{ mb: { xs: 2, lg: 5 } }}
          >
            <Grid item xs={12} md={7} lg={7}>
              <JobTitle
                title={job.title}
                department={job.department}
                location={job.location}
                createdAt={job.createdAt}
                minSalary={job.minSalary}
                maxSalary={job.maxSalary}
                jobType={job.jobType}
                urgent={job.featured}
                isInternship={job.isInternship}
                applicationCount={job.applicationCount}
                featured={job.featured}
              />
              <JobDescription
                description={job.description}
                responsibilities={job.responsibilities}
                requirements={job.requirements}
              />
            </Grid>
            <Grid item xs={12} md={5} lg={5}>
              <DeadLine applyBy={job.applyBy} />
              <Qualification
                location={job.location}
                openings={job.openings}
                status={job.status}
                minExperience={job.minExperience}
                maxExperience={job.maxExperience}
                minSalary={job.minSalary}
                maxSalary={job.maxSalary}
                isInternship={job.isInternship}
                applicationCount={job.applicationCount}
                createdAt={job.createdAt}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default JobDetails;
