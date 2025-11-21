import React from "react";
import { Button, GridLegacy as Grid, IconButton, Typography, styled,  } from "@mui/material";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import CustomInput from "./Inputs/CustomInput";
import { ds_brchure, ebook_brchure,  } from "../assets"; // Ensure this import is correct
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import * as yup from "yup";
import { contactForm } from "../api/services";

interface PopupFormProps {
  isOpen: boolean;
  onClose: () => void;
  downloadType: "ebook" | "brochure";
}

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  message?: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^[6-9]\d{0,9}$/, "Phone number must start with 6, 7, 8, or 9 and be up to 10 digits")
    .required("Phone number is required"),
  message: yup.string().optional(),
});

// Styled Components
const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

const PopupForm: React.FC<PopupFormProps> = ({ isOpen, onClose ,downloadType }) => {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(schema) as any,
  });

  const mutation = useMutation({
    mutationFn: (formData: FormData) => contactForm(formData),
    onSuccess: () => {
      toast.success("Brochure request sent successfully!");
      downloadBrochure();
      reset();
      onClose();
    },
    onError: (error: any) => {
      toast.error(`${error.response?.data?.message || "Submission failed"}`);
    },
  });

  const downloadBrochure = () => {
    const link = document.createElement("a");
    const file = downloadType === "ebook" ? ebook_brchure  : ds_brchure;
    const fileName = downloadType === "ebook" ? "eBook.pdf" : "Brochure.pdf";
  
    link.href = file;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      {/* Close Button (Outside Popup, Top Right Corner) */}
    

      {/* Popup Content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        style={{
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(20px)",
          borderRadius: "15px",
          overflow: "hidden",
          width: "700px",
          maxWidth: "90%",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
          position: "relative",
        }}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <IconButton
          onClick={onClose}
          component={motion.div}
          whileHover={{ scale: 1.2, rotate: 90 }}
          whileTap={{ scale: 0.9, rotate: -90 }}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 1100,
            background: "rgba(255, 255, 255, 0.2)",
            color: "#fff",
            transition: "all 0.3s ease-in-out",
            width: "32px",
            height: "32px",
            "&:hover": {
              background: "rgba(255, 255, 255, 0.4)",
            },
            cursor: "pointer",
          }}
        >
          <CloseIcon sx={{ fontSize: "15px" }} />
        </IconButton>
        <Grid container spacing={0}>
          {/* Left Side - Video Animation (Hidden on Mobile) */}
          <Grid
            item
            md={6}
            sx={{
              display: { xs: "none", lg: "block" }, // Hide on mobile
              position: "relative",
              overflow: "hidden",
            }}
          >
            <img
              src="https://dprstorage.b-cdn.net/dezignshark/downloadbrouchreimg.png" // Ensure this property exists in the Home object
              alt="Top digital marketing agency offering SEO and PPC services"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Grid>

          {/* Right Side - Form (Full Width on Mobile) */}
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              padding: "30px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              background: "black",
              // borderRadius: "10px",
              borderTopLeftRadius: "none",
            }}
          >
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Typography
                variant="h4"
                sx={{
                  color: "#fff",
                  padding: 2,
                  fontWeight: 600,
                  mb: 2,
                  textAlign: "left",
                }}
              >
                Struggling online? We’re here to help.
              </Typography>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <>
                    <CustomInput
                      {...field}
                      placeholder="Name *"
                      type="text"
                      fullWidth
                      required
                      size="small"
                      error={!!errors.name}
                      sx={{
                        // height: { xs: '85px', lg: '20px' },
                        mt: { xs: 5, md: 0 ,lg: 0},
                        "& .MuiInputBase-input::placeholder": {
                          mt: { xs: 5, lg: 0 },
                          // fontSize: { xs: '40px', lg: '18px' }, // Adjust font size for mobile
                        },
                      }}
                    />
                    {errors.name && (
                      <Typography color="error" variant="caption">
                        {errors.name.message}
                      </Typography>
                    )}
                  </>
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <>
                    <CustomInput
                      {...field}
                      placeholder="Email *"
                      type="email"
                      fullWidth
                      required
                      size="small"
                      error={!!errors.email}
                      sx={{
                        // height: { xs: '85px', lg: '20px' },
                        mt: {  xs: 1, md: 0 ,lg: 0},
                        "& .MuiInputBase-input::placeholder": {
                          mt: { xs: 5, lg: 0 },
                          // fontSize: { xs: '40px', lg: '18px' }, // Adjust font size for mobile
                        },
                      }}
                    />
                    {errors.email && (
                      <Typography color="error" variant="caption">
                        {errors.email.message}
                      </Typography>
                    )}
                  </>
                )}
              />
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <>
                    <CustomInput
                      {...field}
                      placeholder="Phone Number *"
                      type="text"
                      fullWidth
                      required
                      size="small"
                      error={!!errors.phoneNumber}
                      sx={{
                        // height: { xs: '85px', lg: '20px' },
                        mt: { xs: 1, md: 0 ,lg: 0},
                        "& .MuiInputBase-input::placeholder": {
                          px: { xs: 0, lg: 0 },
                          // fontSize: { xs: '40px', lg: '18px' }, // Adjust font size for mobile
                        },
                      }}
                    />
                    {errors.phoneNumber && (
                      <Typography color="error" variant="caption">
                        {errors.phoneNumber.message}
                      </Typography>
                    )}
                  </>
                )}
              />
              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    placeholder="Message"
                    type="text"
                    fullWidth
                    size="small"
                    sx={{
                      // height: { xs: '85px', lg: '20px' },
                      mt: {  xs: 1, md: 0 ,lg: 0 },
                      "& .MuiInputBase-input::placeholder": {
                        mt: { xs: 5, lg: 0 },
                        // fontSize: { xs: '40px', lg: '18px' }, // Adjust font size for mobile
                      },
                    }}
                  />
                )}
              />
              <Button type="submit"
                sx={{
                  mt: { xs: 5, lg: 2 },
                  fontSize: { xs: '26px', lg: '18px' },
                  height: { xs: '49px', lg: '30px' },
                }}>
                Send
              </Button>
            </Form>
          </Grid>
        </Grid>
      </motion.div>
    </motion.div>
  );
};

export default PopupForm;
