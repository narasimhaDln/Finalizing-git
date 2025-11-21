import { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Chip } from '@mui/material';
import { gsap } from 'gsap';
import { CiLocationOn } from 'react-icons/ci';
import { SlBriefcase } from 'react-icons/sl';
import { servicebg } from '../../assets';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getAllJobs } from '../../api/services';
import { useQuery } from 'react-query';

// ✅ Job Type Definition
interface Job {
  _id: string;
  title: string;
  department: string;
  location: string;
  jobType: string;
  featured: boolean;
  tags: string[];
  role: string;
  minExperience: number;
  maxExperience: number;
  applyBy?: string;
  createdAt?: string;
}

const JobListing = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const { data, isLoading, error } = useQuery(['all-jobs'], getAllJobs);

  const jobs: Job[] = data?.data?.jobs || [];

  // ✅ Job Role Categories
  const jobRoleCategories = [
    'Web Developer',
    'App Developer',
    'SEO Specialist',
    'SMM Specialist',
    'Content Writer',
    'Accountant',
    'HR Manager',
    'Client Manager',
    'Graphic Designer',
    'Sales Manager',
    'UI/UX Designer',
    'Project Manager',
    'Video Editor',
    'Other',
  ];

  const categories = ['All Categories', ...jobRoleCategories];

  // ✅ Fixed: filter by role (case-insensitive)
  const filteredJobs =
    selectedCategory === 'All Categories'
      ? jobs
      : jobs.filter(
          (job: Job) =>
            job.role.toLowerCase() === selectedCategory.toLowerCase(),
        );

  // ✅ AOS init
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      offset: 100,
      once: false,
      mirror: true,
    });
    AOS.refresh();
  }, []);

  // ✅ GSAP animation
  useEffect(() => {
    gsap.fromTo(
      '.job-card',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
    );
  }, [filteredJobs]);

  const handleNavigation = (jobId: string) => {
    navigate(`/job/${jobId}`);
  };

  if (isLoading) {
    return (
      <Typography sx={{ color: '#fff', textAlign: 'center', mt: 10 }}>
        Loading jobs...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography sx={{ color: '#fff', textAlign: 'center', mt: 10 }}>
        Failed to load jobs.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        p: { xs: 2, lg: 4 },
        minHeight: { xs: '30vh', lg: '100vh' },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `url(${servicebg}) no-repeat center center`,
        backgroundSize: 'cover',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          zIndex: 1,
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '1400px',
        }}
      >
        <Typography
          variant="h4"
          sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold', color: '#fff' }}
          data-aos="fade-down"
        >
          Featured Jobs
        </Typography>

        {/* Main Layout: Sidebar + Jobs */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 3, md: 4 },
            mt: 5,
          }}
        >
          {/* Left Sidebar - Categories */}
          <Box
            sx={{
              width: { xs: '100%', md: '280px' },
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              p: { xs: 2, sm: 2.5, md: 2 },
              boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
              height: 'fit-content',
              position: { xs: 'static', md: 'sticky' },
              top: 20,
              maxHeight: { xs: '50vh', md: '70vh' },
              overflowY: { xs: 'auto', md: 'auto' },
              order: { xs: 2, md: 1 },
            }}
            data-aos="fade-right"
          >
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 'bold',
                color: '#000',
                textAlign: 'center',
                borderBottom: '2px solid #ad0505',
                pb: 1,
                fontSize: { xs: '16px', sm: '18px' },
                fontFamily: 'Futura-Book-font, Arial, sans-serif',
              }}
            >
              Job Categories
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              {categories.map((cat) => (
                <Box
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  sx={{
                    p: { xs: 1.5, sm: 1.5 },
                    borderRadius: '6px',
                    cursor: 'pointer',
                    backgroundColor:
                      selectedCategory === cat ? '#ad0505' : 'transparent',
                    color: selectedCategory === cat ? '#ffffff' : '#000',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor:
                        selectedCategory === cat
                          ? '#ad0505'
                          : 'rgba(173, 5, 5, 0.1)',
                      transform: 'translateX(3px)',
                    },
                    fontWeight: selectedCategory === cat ? 'bold' : 'normal',
                    textAlign: 'center',
                    fontSize: { xs: '13px', sm: '14px' },
                    fontFamily: 'Futura-Book-font, Arial, sans-serif',
                  }}
                >
                  {cat}
                </Box>
              ))}
            </Box>
          </Box>

          {/* Right Side - Jobs List */}
          <Box
            sx={{
              flex: 1,
              width: { xs: '100%', md: '80%' },
              order: { xs: 1, md: 2 },
            }}
          >
            {filteredJobs.length === 0 ? (
              <Box sx={{ width: '100%', textAlign: 'center', mt: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#fff',
                    mb: 2,
                    fontSize: { xs: '16px', sm: '18px' },
                  }}
                >
                  No jobs available for this category.
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#ccc',
                    fontSize: { xs: '14px', sm: '16px' },
                  }}
                >
                  Try selecting a different category or check back later.
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: { xs: 2, sm: 2.5 },
                }}
                data-aos="fade-left"
              >
                {filteredJobs.map((job: Job) => (
                  <Card
                    key={job._id}
                    className="job-card"
                    sx={{
                      width: { xs: '100%', md: '80%' },
                      background: '#ffffff',
                      boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
                      borderRadius: '12px',
                      transition: 'transform 0.3s',
                      '&:hover': { transform: 'scale(1.02)' },
                      cursor: 'pointer',
                    }}
                    onClick={() => handleNavigation(job._id)}
                  >
                    <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'flex-start',
                          gap: { xs: 1, sm: 2 },
                          mb: 2,
                        }}
                      >
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 'bold',
                              color: '#000',
                              mb: 0.5,
                              fontSize: { xs: '16px', sm: '18px' },
                              fontFamily: 'Futura-Book-font, Arial, sans-serif',
                            }}
                          >
                            {job.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: '#757575',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              mb: 1,
                              fontSize: { xs: '13px', sm: '14px' },
                              fontFamily: 'Futura-Book-font, Arial, sans-serif',
                            }}
                          >
                            <SlBriefcase style={{ fontSize: '14px' }} />{' '}
                            {job.department} •
                            <CiLocationOn style={{ fontSize: '14px' }} />{' '}
                            {job.location}
                          </Typography>

                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: { xs: 'column', sm: 'row' },
                              gap: { xs: 1, sm: 2 },
                              mb: 1,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                color: '#666',
                                fontSize: { xs: '13px', sm: '14px' },
                                fontFamily:
                                  'Futura-Book-font, Arial, sans-serif',
                              }}
                            >
                              Experience: {job.minExperience}-
                              {job.maxExperience} yrs
                            </Typography>
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            gap: 1,
                          }}
                        >
                          <Box
                            sx={{
                              alignSelf: 'flex-end',
                              mt: -4,
                            }}
                          >
                            <img
                              src="https://dprstorage.b-cdn.net/dezignshark/email-images/Adcfsdvsset%202.png"
                              alt="Company Logo"
                              width={75}
                              height={75}
                              style={{ objectFit: 'contain' }}
                            />
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: 0.5,
                              alignSelf: 'flex-end',
                            }}
                          >
                            <Chip
                              label={job.jobType}
                              sx={{
                                backgroundColor: '#e3f2fd',
                                color: '#1976d2',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                height: '24px',
                                fontFamily:
                                  'Futura-Book-font, Arial, sans-serif',
                              }}
                            />
                            {job.featured && (
                              <Chip
                                label="Featured"
                                sx={{
                                  backgroundColor: '#fff3cd',
                                  color: '#856404',
                                  fontSize: '12px',
                                  fontWeight: 'bold',
                                  height: '24px',
                                  fontFamily:
                                    'Futura-Book-font, Arial, sans-serif',
                                }}
                              />
                            )}
                          </Box>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 1,
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 1,
                            flexWrap: 'wrap',
                          }}
                        >
                          {job.tags &&
                            job.tags.map((tag, index) => (
                              <Chip
                                key={index}
                                label={tag}
                                sx={{
                                  backgroundColor: '#f0f0f0',
                                  color: '#666',
                                  fontSize: '11px',
                                  height: '20px',
                                  fontFamily:
                                    'Futura-Book-font, Arial, sans-serif',
                                }}
                              />
                            ))}
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          {job.createdAt && (
                            <Typography
                              variant="body2"
                              sx={{
                                color: '#666',
                                fontSize: { xs: '13px', sm: '14px' },
                                fontFamily:
                                  'Futura-Book-font, Arial, sans-serif',
                              }}
                            >
                              {new Date(job.createdAt).toLocaleDateString(
                                'en-US',
                                {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                },
                              )}
                            </Typography>
                          )}
                          <Typography
                            variant="body2"
                            sx={{
                              color: '#ad0505',
                              fontWeight: 'bold',
                              fontSize: { xs: '13px', sm: '14px' },
                              fontFamily: 'Futura-Book-font, Arial, sans-serif',
                            }}
                          >
                            Apply Now →
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default JobListing;
