
import Breadcrumb from '../../Components/Breadcrumb'
import { breadcrumbbanner } from '../../assets'
import { Box, Container, GridLegacy as Grid, } from '@mui/material'
import AllBlogs from './AllBlogs'
import Categories from './Categories'
import LatestBlogs from './LatestBlogs'
import PopularTags from './PopularTags'


const index = () => {
    return (
        <Box>
            <Breadcrumb
                title="Blog Posts"
                subtitle=" Articles & News"
                backgroundImage={breadcrumbbanner}
                overlayText="Blog Posts"
            />

            <Grid container sx={{ backgroundColor: "#fff",}}>
                <Container maxWidth='xl'>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8} lg={8} mt={6}>
                            <AllBlogs />
                            {/* <LinkedinBlogs/> */}
                            {/* <BlogPagination /> */}
                        </Grid>
                        <Grid item xs={12} md={4} lg={4} mt={6}>
                            <Categories />
                            <LatestBlogs />
                            {/* <GalleryPost /> */}
                            <PopularTags/>
                        </Grid>
                    </Grid>
                </Container>
            </Grid>


        </Box>
    )
}

export default index
