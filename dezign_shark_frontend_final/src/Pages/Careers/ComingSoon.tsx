import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const ComingSoon: React.FC = () => {
    return (
        <Container
            maxWidth="md"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: {xs:'30vh',lg:'100vh'},
                p:{xs:8,lg:4},
                textAlign: 'center',
            }}
        >
            <Box>
                <Typography variant="h3" gutterBottom sx={{mb: 2}}>
                    Coming Soon!
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    We are working hard to bring exciting career opportunities to you. Stay tuned!
                </Typography>
            </Box>
        </Container>
    );
};

export default ComingSoon;