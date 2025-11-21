import { Box, Tooltip } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const WhatsAppButton = () => {
  const handleClick = () => {
    const message = encodeURIComponent(
      "Hi, I'm interested in your luxury residential project. Could you provide more details about availability, pricing, and amenities?"
    );
    window.open(`https://wa.me/+916309994444?text=${message}`, '_blank'); // Replace with your WhatsApp number
  };

  return (
    <Tooltip title="Chat with us about Luxor Exclusive & Kolla Luxuria!" arrow>
      <Box
        onClick={handleClick}
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          width: 50,
          height: 50,
          backgroundColor: '#25D366',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.4)',
          cursor: 'pointer',
          animation: 'pulse 1.5s infinite',
          zIndex: 1000000000,
          '&:hover': {
            transform: 'scale(1.2)',
            transition: 'transform 0.3s',
          },
          '@keyframes pulse': {
            '0%': {
              boxShadow: '0 0 0 0 rgba(37, 211, 102, 0.7)',
            },
            '70%': {
              boxShadow: '0 0 0 25px rgba(37, 211, 102, 0)',
            },
            '100%': {
              boxShadow: '0 0 0 0 rgba(37, 211, 102, 0)',
            },
          },
        }}
      >
        <WhatsAppIcon sx={{ color: 'white', fontSize: 35 }} />
      </Box>
    </Tooltip>
  );
};

export default WhatsAppButton;
