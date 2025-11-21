import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  GridLegacy as Grid,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AnimatedText from '../../Components/Inputs/AnimatedText';

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const navigate = useNavigate();
  const clientId = '68188a545485188c126d163c';

  useEffect(() => {
    axios
      .get(`https://blog.dprprop.com/clients/${clientId}/blogs`)
      .then((res) => setBlogs(res.data.blogs || []))
      .catch((err) => console.error('Error fetching blogs:', err));
  }, []);

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 4 }}>
        {blogs.map((post) => (
          <Box
            key={post._id}
            onClick={() => navigate(`/blogs/${encodeURIComponent(post.slug)}`)}
            sx={{ cursor: 'pointer', mb: 4 }}
          >
            <Grid item md={12} sm={6} xs={12}>
              <Card
                sx={{
                  border: '1px solid #000',
                  boxShadow: 0,
                  backgroundColor: 'transparent',
                  p: 4
                }}
              >
                <Box sx={{ overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    height="400"
                    src={`https://dprstorage.b-cdn.net${post.imageurl}`}
                    alt={post.title}
                    sx={{ transition: 'transform 0.3s ease-in-out' }}
                  />
                </Box>

                <CardContent sx={{ p: 2, backgroundColor: 'transparent' }}>
                  <AnimatedText
                    sx={{
                      fontWeight: 'bold',
                      mt: { xs: 3, lg: 1 },
                      color: '#ad0505',
                      fontSize: { xs: '44px', lg: '30px' },
                      textAlign: 'left'
                    }}
                  >
                    {post.title}
                  </AnimatedText>

                  <Box
                    sx={{
                      mt: { xs: 5, lg: 2 },
                      borderBottom: '1px solid #74787C',
                      pb: 1,
                      width: { xs: '155px', lg: 'fit-content' }
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 500,
                        fontSize: { xs: '32px', lg: '0.9rem' },
                        color: '#ad0505',
                        '&:hover': { color: '#fc0000' },
                        display: 'block'
                      }}
                    >
                      Read More
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default BlogList;
