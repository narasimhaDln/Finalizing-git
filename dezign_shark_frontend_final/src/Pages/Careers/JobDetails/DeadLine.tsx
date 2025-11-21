import { Box, Typography } from '@mui/material';
import ApplicationFormPopup from './JobPopupForm/ApplicationFormPopup';
import CustomButton from '../../../Components/Inputs/CustomButton';
import { useState } from 'react';

// ✅ Props Interface
interface DeadLineProps {
  applyBy?: string;
}

const DeadLine: React.FC<DeadLineProps> = ({ applyBy }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // ✅ Format date (e.g., "July 31, 2025") or show default if not available
  const formattedDate = applyBy
    ? new Date(applyBy).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Not specified';

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      gap={2}
      sx={{ width: 'fit-content', px: { xs: 6, md: 0, lg: 0 } }}
    >
      <Typography
        variant="body2"
        sx={{
          color: 'black',
          fontSize: { xs: '18px', md: '18px', lg: '18px' },
        }}
      >
        Application ends:{' '}
        <Typography
          component="span"
          sx={{
            color: 'error.main',
            fontWeight: 500,
            fontSize: { xs: '18px', md: '18px', lg: '18px' },
          }}
        >
          {formattedDate}
        </Typography>
      </Typography>

      {/* Apply Button */}
      <CustomButton onClick={handleOpen}>Apply</CustomButton>

      {/* Application Form Popup */}
      <ApplicationFormPopup open={open} handleClose={handleClose} />
    </Box>
  );
};

export default DeadLine;
