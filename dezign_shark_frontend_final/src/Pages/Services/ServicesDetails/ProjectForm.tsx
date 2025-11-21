import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import * as yup from "yup";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import AnimatedText from "../../../Components/Inputs/AnimatedText";
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

const ProjectForm: React.FC = () => {
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
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          p: 3,
          border: "1px solid #ddd",
          background: "white",
          textAlign: "left",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {/* Title */}
        </Typography>
        <AnimatedText
          sx={{
            color: "black",
            textAlign: "center",
            mb: { xs: 5, lg: 3 },
            fontSize: { xs: "14px",md:"24px", lg: "24px" },
          }}
        >
          Struggling online? We’re here to help.
        </AnimatedText>

        {/* Name Input */}
        <TextField
          fullWidth
          placeholder="Your name"
          variant="filled"
          {...register("name")}
          sx={{
            mb: 2,
            background: "#f6f6f6",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { border: "none !important" },
            },
          }}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        {/* Email Input */}
        <TextField
          fullWidth
          placeholder="Your email"
          variant="filled"
          {...register("email")}
          sx={{
            mb: 2,
            background: "#f6f6f6",
            borderRadius: 1,
          }}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        {/* Phone Number Input */}
        <TextField
          fullWidth
          placeholder="Phone number"
          variant="filled"
          {...register("phoneNumber")}
          inputProps={{
            maxLength: 10, // Restrict input to 10 characters
            pattern: "^[6-9]\\d{0,9}$", // Enforce regex at input level
          }}
          sx={{
            mb: 2,
            background: "#f6f6f6",
            borderRadius: 1,
          }}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
        />

        {/* Message Input */}
        <TextField
          fullWidth
          placeholder="Message"
          variant="filled"
          multiline
          rows={4}
          {...register("message")}
          sx={{
            mb: 3,
            background: "#f6f6f6",
            borderRadius: 1,
          }}
          error={!!errors.message}
          helperText={errors.message?.message}
        />

        {/* Submit Button */}
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
          Send Message
        </Button>
      </Box>
    </Container>
  );
};

export default ProjectForm;
