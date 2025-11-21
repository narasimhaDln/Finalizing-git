
import Sectionone from './AllServicesDetails'
import { Container, GridLegacy as Grid } from '@mui/material'
import { Box } from '@mui/material'




const index = () => {
  return (
    <Box>
        <Sectionone/>
        <Box sx={{backgroundColor: '#fff', py: 5}}>
          <Container maxWidth="xl">
            <Grid container>
              <Grid item xs={12} sm={8} md={8} lg={8}>
              {/* <SectionTwo/> */}
              {/* <Faqs/> */}
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4}>
                {/* <ServicesList/> */}
                {/* <ProjectForm/>
                <DownloadSection/> */}
              </Grid>
            </Grid>

          </Container>

        </Box>
        
      
    </Box>
  )
}

export default index
