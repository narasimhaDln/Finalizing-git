import { Container, Typography, Box, Link } from '@mui/material';
import { mobilebgshark2, sharkbgmaroon } from '../../assets';

const PrivacyPolicy = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        // bgcolor: "#121212",
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        mt: 8,

        // position: "relative",
        // backgroundImage: `url(${sharkbgmaroon})`,
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${sharkbgmaroon})`,
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        // opacity: 0.8,
        '@media (max-width: 1040px)': {
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${mobilebgshark2})`,
          // backgroundAttachment: "scroll",
          backgroundSize: 'contain', // Adjust to ensure the full image appears
        },
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            // bgcolor: "#1E1E1E",
            p: 4,
            borderRadius: 3,
            color: '#E0E0E0',
            boxShadow: '0px 4px 20px rgba(255, 255, 255, 0.1)',
            textAlign: 'left', // Align text to the left
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#fc0000' }}
          >
            Privacy Policy
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 3 }}>
            Effective Date: <strong> April 2025</strong>
          </Typography>

          <Typography variant="body1" paragraph>
            Dezign Shark ("we," "our," or "us") is committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you visit our website{' '}
            <strong>www.dezignshark.com</strong>. By accessing or using our
            services, you agree to the terms outlined in this policy.
          </Typography>

          <Typography variant="h5" sx={{ mt: 3, mb: 2, color: '#fc0000' }}>
            1. Information We Collect
          </Typography>
          <Typography variant="body1">
            <strong>A. Personal Information</strong>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Business name (if applicable)</li>
              <li>Any other information provided via contact forms</li>
            </ul>
          </Typography>
          <Typography variant="body1">
            <strong>B. Non-Personal Information</strong>
            <ul>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Pages visited on our website</li>
              <li>Date and time of visits</li>
              <li>Device information</li>
            </ul>
          </Typography>

          <Typography variant="h5" sx={{ mt: 3, mb: 2, color: '#fc0000' }}>
            2. How We Use Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            We may use the collected data for the following purposes:
            <ul>
              <li>To provide and improve our services</li>
              <li>To respond to inquiries and customer support requests</li>
              <li>
                To send promotional emails and newsletters (with opt-out
                options)
              </li>
              <li>To analyze website performance and user behavior</li>
              <li>To comply with legal obligations</li>
            </ul>
          </Typography>

          <Typography variant="h5" sx={{ mt: 3, mb: 2, color: '#fc0000' }}>
            3. How We Share Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            We do not sell, trade, or rent your personal information. However,
            we may share data with:
          </Typography>
          <Typography variant="body1">
            <ul>
              <li>
                <strong>Service Providers:</strong> Third-party vendors who
                assist in website operations, analytics, and marketing.
              </li>
              <li>
                <strong>Legal Compliance:</strong> If required by law or in
                response to valid legal requests.
              </li>
              <li>
                <strong>Business Transfers:</strong> In case of a merger,
                acquisition, or sale of company assets.
              </li>
            </ul>
          </Typography>

          <Typography variant="h5" sx={{ mt: 3, mb: 2, color: '#fc0000' }}>
            4. Data Security
          </Typography>
          <Typography variant="body1" paragraph>
            We implement industry-standard security measures to protect your
            personal information. However, no method of transmission over the
            internet is 100% secure.
          </Typography>

          <Typography variant="h5" sx={{ mt: 3, mb: 2, color: '#fc0000' }}>
            5. Your Rights and Choices
          </Typography>
          <Typography variant="body1">
            <ul>
              <li>Access, update, or delete your personal information</li>
              <li>Opt out of marketing communications</li>
              <li>Request details about the data we collect</li>
              <li>Disable cookies through browser settings</li>
            </ul>
          </Typography>

          <Typography variant="h5" sx={{ mt: 3, mb: 2, color: '#fc0000' }}>
            6. Third-Party Links
          </Typography>
          <Typography variant="body1" paragraph>
            Our website may contain links to third-party sites. We are not
            responsible for their privacy practices. Please review their
            policies before providing any personal information.
          </Typography>

          <Typography variant="h5" sx={{ mt: 3, mb: 2, color: '#fc0000' }}>
            7. Changes to This Privacy Policy
          </Typography>
          <Typography variant="body1" paragraph>
            We may update this Privacy Policy periodically. Any changes will be
            posted on this page with an updated effective date.
          </Typography>

          <Typography variant="h5" sx={{ mt: 3, mb: 2, color: '#fc0000' }}>
            8. Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions, contact us at:
          </Typography>
          <Typography variant="h6" sx={{ mt: 3 }}>
            <strong>Dezign Shark</strong>
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            68, 3rd Floor, Senore Colony, Film Nagar, Hyderabad, Telangana
            500008
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Phone:{' '}
            <Link
              href="tel:+91 799 799 2885"
              sx={{
                color: '#fff',
                textDecoration: 'none',
                '&:hover': { color: '#fc0000' },
                fontWeight: 600,
              }}
            >
              +91 799 799 2885
            </Link>
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Email:{' '}
            <Link
              href="mailto:info@dezignshark.com"
              sx={{
                color: '#fff',
                textDecoration: 'none',
                '&:hover': { color: '#fc0000' },
                fontWeight: 600,
              }}
            >
              infodezignshark.com
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
