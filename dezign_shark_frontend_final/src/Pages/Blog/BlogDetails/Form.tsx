import React from "react";
import { Container, GridLegacy as Grid, Typography, TextField, Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { contactForm } from "../../../api/services";

// Define Form Data Type
type FormData = {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
};
// Validation Schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^[6-9]\d{9}$/, "Phone number must start with 6, 7, 8, or 9 and be exactly 10 digits")
    .required("Phone number is required"),
  message: yup.string().required("Message is required"),
});

const CommentForm: React.FC = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (formData: FormData) => contactForm(formData),
    onSuccess: () => {
      toast.success("Successfully submitted!");
      reset();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Submission failed");
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    mutation.mutate(data);
  };


  return (
    <Container maxWidth="xl">
      {/* Title Section */}
      <Grid container spacing={2} sx={{ paddingTop: "50px" }}>
        <Grid item xs={12}>
          <Typography variant="h4" sx={{ fontWeight: 600, textAlign: 'left', color: 'black',  }}>
            Leave a Reply
          </Typography>
          <Typography variant="body2" sx={{ color: "#000", textAlign: 'left', mt: { xs: 4, lg: 3 } }}>
            Your email address will not be published. Required fields are marked *
          </Typography>
        </Grid>
      </Grid>

      {/* Form Section */}
      <Grid container spacing={3} sx={{ marginTop: "30px" }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Name Field */}
        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{ color: "#000",  fontWeight: 500, mb: 1, textAlign: 'left', }}>
            Name*
          </Typography>
          <TextField
            fullWidth
            required
            placeholder="Enter your name"
            {...register("name")}
            InputProps={{
              disableUnderline: true,
              sx: {
                backgroundColor: "#a3a3a33a",
                borderRadius: "5px",
                color: "#fff",
                "&::placeholder": { color: "#fff" }, // Placeholder stays white
                "&:hover, &:focus, &:focus-within": { backgroundColor: "#a3a3a33a", boxShadow: "none" },
              },
            }}
            sx={{
              input: { color: "#000" },
              "& fieldset": { border: "none" }, // No border
            }}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Grid>

        {/* Email Field */}
        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{ color: "#000",  fontWeight: 500, mb: 1, textAlign: 'left' }}>
            Email*
          </Typography>
          <TextField
            fullWidth
            required
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            InputProps={{
              disableUnderline: true,
              sx: {
                backgroundColor: "#a3a3a33a",
                borderRadius: "5px",
                color: "#fff",
                "&::placeholder": { color: "#fff" },
                "&:hover, &:focus, &:focus-within": { backgroundColor: "#a3a3a33a", boxShadow: "none" },
              },
            }}
            sx={{
              input: { color: "#000" },
              "& fieldset": { border: "none" },
            }}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>

        {/* Website Field */}
        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{ color: "#000",  fontWeight: 500, mb: 1, textAlign: 'left' }}>
            Number*
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter your Number"
            InputProps={{
              disableUnderline: true,
              sx: {
                backgroundColor: "#a3a3a33a",
                borderRadius: "5px",
                color: "#fff",
                "&::placeholder": { color: "#fff" },
                "&:hover, &:focus, &:focus-within": { backgroundColor: "#a3a3a33a", boxShadow: "none" },
                maxLength: 10, // Restrict input to 10 characters
                pattern: "^[6-9]\\d{0,9}$",
              },
            }}
            sx={{
              input: { color: "#000" },
              "& fieldset": { border: "none" },
            }}
            {...register("phoneNumber")}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />
        </Grid>

        {/* Comment Field */}
        <Grid item xs={12} sx={{ marginTop: "10px" }}>
          <Typography variant="body2" sx={{ color: "#000",  fontWeight: 500, mb: 1, textAlign: 'left' }}>
            Comment*
          </Typography>
          <TextField
            fullWidth
            required
            multiline
            rows={5}
            placeholder="Write your comment here"
            {...register("message")}
            InputProps={{
              disableUnderline: true,
              sx: {
                backgroundColor: "#a3a3a33a",
                borderRadius: "5px",
                color: "#fff",
                "&::placeholder": { color: "#fff" },
                "&:hover, &:focus, &:focus-within": { backgroundColor: "#a3a3a33a", boxShadow: "none" },
              },
            }}
            sx={{
              input: { color: "#000" },
              "& fieldset": { border: "none" },
            }}
            error={!!errors.message}
            helperText={errors.message?.message}
          />
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'start'
          }}
        >
          {/* <CustomButton
            sx={{
              width: { xs: '330px', lg: '100%' },
              height: { xs: '90px', lg: '55px' },
              fontSize: { xs: "2.2rem", lg: "1.2rem" }
            }}
          >
            Post Comment
          </CustomButton> */}
          <Button
            type="submit"
            sx={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              background: "rgba(145, 9, 9, 0.8)", // 🔥 Red Transparent Background
              backdropFilter: "blur(20px)", // ✨ Blur Effect
              color: "white",
              // padding: "12px 35px",
              border: "none",
              borderRadius: "10px",
              letterSpacing: "0.005em",
              
              boxShadow: "0 4px 30px rgba(89, 100, 255, .1)",
              overflow: "hidden",
              transition: "all 0.3s ease-in-out",
              "&:hover .btn-arrow-hover .arrow-first": {
                transform: "translateX(-100%) translateY(-100%) translateZ(0)", // Adjusted transformation
              },
              "&:hover .btn-arrow-hover .arrow-second": {
                transform: "translateX(0) translateY(0) translateZ(0)", // Ensure it moves into view
              },
              "&:hover": {
                background: "rgba(145, 9, 9, 0.8)", // 🔥 Red Transparent Background
                backdropFilter: "blur(20px)",
                border: "none !important",
                color: "white !important",
              },
              "&:active": {
                background: "transparent !important", // Ensure it stays transparent on click
                color: "white !important",
              },
            }}
          >
            Post Comment
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CommentForm;
