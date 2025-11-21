import React, { useEffect, useRef, useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  GridLegacy as Grid,
  Container,
  Pagination,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { blogData } from './BlogDetails/BlogData';
import AnimatedText from '../../Components/Inputs/AnimatedText';

interface UnifiedBlog {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  slug: string;
  isDynamic: boolean;
  sections?: { description: string }[];
}

const formatStaticSlug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[|/:]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+$/, '');

const CardList: React.FC = () => {
  const [blogs, setBlogs] = useState<UnifiedBlog[]>([]);
  const [page, setPage] = useState(1);
  const blogsPerPage = 4;
  const navigate = useNavigate();

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  // Load static + dynamic blogs
  useEffect(() => {
    const staticBlogs: UnifiedBlog[] = blogData.map((post) => ({
      id: post.id,
      title: post.title,
      category: post.category || '',
      description: post.description || '',
      image: post.image,
      slug: formatStaticSlug(post.title), // Static slug format
      isDynamic: false,
    }));

    axios
      .get('https://blog.dpprop.com/clients/68188a545485188c126d163c/blogs')
      .then((res) => {
        const dynamicBlogs: UnifiedBlog[] = res.data.blogs.map((post: any) => ({
          id: post._id,
          title: post.title,
          category: post.category || '',
          description: post.metaDescription || '',
          image: `https://dprstorage.b-cdn.net${post.imageurl}`,
          slug: post.slug, // ✅ Use slug from API
          isDynamic: true,
          sections: post.sections,
        }));

        const allBlogs = [...staticBlogs, ...dynamicBlogs];
        setBlogs(allBlogs);
      });
  }, []);

  // AOS Init
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

  // Hover effect
  useEffect(() => {
    cardRefs.current.forEach((cardRef, index) => {
      const imgRef = imgRefs.current[index];
      if (!cardRef || !imgRef) return;

      const hoverIn = () =>
        gsap.to(imgRef, { scale: 1.2, duration: 1, ease: 'power2.out' });
      const hoverOut = () =>
        gsap.to(imgRef, { scale: 1, duration: 1, ease: 'power2.out' });

      cardRef.addEventListener('mouseenter', hoverIn);
      cardRef.addEventListener('mouseleave', hoverOut);

      return () => {
        cardRef.removeEventListener('mouseenter', hoverIn);
        cardRef.removeEventListener('mouseleave', hoverOut);
      };
    });
  }, [blogs]);

  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const indexOfLast = page * blogsPerPage;
  const indexOfFirst = indexOfLast - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirst, indexOfLast);

  const handleNavigation = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <Box sx={{ backgroundColor: '#fff' }}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {currentBlogs.map((blog, index) => (
            <Grid
              item
              md={12}
              sm={6}
              xs={12}
              ref={(el: HTMLDivElement | null) => {
                cardRefs.current[index] = el;
              }}
              key={blog.id}
            >
              <Card
                sx={{
                  border: '1px solid #000',
                  boxShadow: 0,
                  backgroundColor: 'transparent',
                  p: { xs: 1, md: 2, lg: 4 },
                }}
                onClick={() => handleNavigation(blog.slug)}
              >
                <Box sx={{ overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    image={blog.image}
                    alt={blog.title}
                    sx={{
                      transition: 'transform 0.3s ease-in-out',
                      height: { xs: '200px', md: '300px', lg: '400px' },
                    }}
                    ref={(el) => {
                      imgRefs.current[index] = el;
                    }}
                  />
                </Box>

                <CardContent sx={{ p: 2, backgroundColor: 'transparent' }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                      fontWeight: 500,
                      fontSize: { xs: '20px', lg: '14px' },
                      textAlign: 'left',
                    }}
                  >
                    {blog.category}
                  </Typography>

                  <AnimatedText
                    sx={{
                      fontWeight: 'bold',
                      mt: { xs: 3, lg: 1 },
                      color: '#ad0505',
                      fontSize: { xs: '18px', md: '20px', lg: '30px' },
                      textAlign: 'left',
                    }}
                  >
                    {blog.title}
                  </AnimatedText>

                  <Typography
                    variant="body2"
                    color="#000"
                    sx={{
                      mt: { xs: 3, lg: 1 },
                      // fontSize: { xs: "21px", lg: "16px" },
                      textAlign: { xs: 'justify', lg: 'left' },
                    }}
                    data-aos="fade-right"
                  >
                    {blog.isDynamic
                      ? blog.sections?.[0]?.description.split('/n')[0]
                      : blog.description}
                  </Typography>

                  <Box
                    sx={{
                      mt: { xs: 5, lg: 2 },
                      borderBottom: '1px solid #74787C',
                      pb: 1,
                      width: {
                        xs: 'fit-content',
                        md: 'fit-content',
                        lg: 'fit-content',
                      },
                    }}
                    onClick={() => handleNavigation(blog.slug)}
                  >
                    <Typography
                      sx={{
                        fontWeight: 500,
                        // fontSize: { xs: "32px", lg: "0.9rem" },
                        color: '#ad0505',
                        '&:hover': { color: '#fc0000' },
                        display: 'block',
                      }}
                    >
                      Read More
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 6, mb: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            shape="rounded"
            sx={{
              '& .MuiPaginationItem-root:not(.MuiPaginationItem-previousNext)':
                {
                  backgroundColor: 'white',
                  color: 'black',
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  fontSize: '1.2rem',
                  margin: '0 4px',
                  transition: 'background 0.2s',
                },
              '& .Mui-selected': {
                backgroundColor: 'rgba(145, 9, 9, 0.8) !important',
                color: 'white !important',
                borderRadius: '50%',
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default CardList;
