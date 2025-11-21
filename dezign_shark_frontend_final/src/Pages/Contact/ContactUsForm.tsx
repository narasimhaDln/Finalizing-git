import React, { useState } from "react";
import { Box, Container, GridLegacy as Grid, Typography, MenuItem, Select, FormHelperText, Button, FormControl, ListSubheader, Checkbox, OutlinedInput } from "@mui/material";
import CustomInput from "../../Components/Inputs/CustomInput";
import AnimatedText from "../../Components/Inputs/AnimatedText";
import { contactusshark3 } from "../../assets";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-query";
import { contactForm } from "../../api/services";
import { toast } from "react-toastify";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phoneNumber: yup
    .string()
    .matches(/^[6-9]\d{0,9}$/, 'Phone number must start with 6, 7, 8, or 9 and be up to 10 digits')
    .required('Phone number is required'),
  services: yup.array().of(yup.string().required()).required('At least one service must be selected'),
  message: yup.string().optional(),
});

interface LeadData {
  name: string;
  email: string;
  phoneNumber: string;
  services: string[];
  message?: string;
}

const ContactForm: React.FC = () => {
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);

  const handlePropertyChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setSelectedProperties(typeof value === 'string' ? value.split(',') : value);
  };

  const { control, handleSubmit, formState: { errors }, reset } = useForm<LeadData>({
    resolver: yupResolver(schema) as any,
  });

  const mutation = useMutation({
    mutationFn: (newFormData: LeadData) => contactForm(newFormData),
    onSuccess: () => {
      toast.success('Successfully submitted!');
      resetForm();
    },
    onError: (error: any) => {
      toast.error(`${error.response.data.message}`);
    },
  });

  const resetForm = () => {
    reset({
      name: '',
      email: '',
      phoneNumber: '',
      services: [],
      message: '',
    });
  };

  const onSubmit = (data: LeadData) => {
    mutation.mutate(data);
  };

  const propertyTypes = [
    "Search Engine Optimization",
    "Social Media Marketing",
    "Pay-Per-Click Advertising",
    "Website Development",
    " Graphic Designing",
    "Video Marketing",
    "Others"
  ];

  return (
    <Box sx={{ backgroundColor: "black", px: { xs: 6, lg: 0 }, }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <AnimatedText sx={{ color: "white", textAlign: "left", fontWeight: 700, mt: { xs: 5, lg: 4 },  }}>
            Struggling online? We’re here to help.
          </AnimatedText>
        </Box>

        <Grid container spacing={6}>
          <Grid item xs={12} md={6} lg={6} mt={2} mb={4}>
            <Box onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={12} mb={1}>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 2,
                      fontWeight: "bold",
                      color: "white",
                      textAlign: "left",
                      // fontSize: { xs: "35px", lg: "18px" },
                    }}
                  >
                    Name *
                  </Typography>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <>
                        <CustomInput
                          placeholder="Enter Your Name"
                          type="text"
                          fullWidth
                          required
                          size="small"
                          {...field}
                          error={!!errors.name}
                          sx={{
                            height: { xs: '25px', md: '25px', lg: '25px' },
                            "& .MuiInputBase-input::placeholder": {
                              color: "rgba(255, 255, 255, 0.7) !important",
                              // fontSize: { xs: '30px', lg: '14px' },
                            },
                          }}
                        />
                      </>
                    )}
                  />
                  <FormHelperText error>{errors.name?.message}</FormHelperText>
                </Grid>
                <Grid item xs={12} md={6}  lg={6} mb={1}>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 2,
                      fontWeight: "bold",
                      color: "white",
                      textAlign: "left",
                      // fontSize: { xs: "35px", lg: "18px" },
                    }}
                  >
                    Phone Number *
                  </Typography>
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        placeholder="Enter Your Phone Number"
                        fullWidth
                        {...field}
                        error={!!errors.phoneNumber}
                        inputProps={{
                          maxLength: 10,
                        }}
                        sx={{
                          height: { xs: '25px', md: '25px',lg: '25px' },
                          "& .MuiInputBase-input::placeholder": {
                            color: "rgba(255, 255, 255, 0.7) !important",
                            // fontSize: { xs: '30px', lg: '14px' },
                          },
                        }}
                      />
                    )}
                  />
                  <FormHelperText error>{errors.phoneNumber?.message}</FormHelperText>
                </Grid>
                <Grid item xs={12} md={6}  lg={6} mb={1}>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 2,
                      fontWeight: "bold",
                      color: "white",
                      textAlign: "left",
                      // fontSize: { xs: "35px", lg: "18px" },
                    }}
                  >
                    Email *
                  </Typography>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        placeholder="Enter Your Email"
                        fullWidth
                        {...field}
                        error={!!errors.email}
                        sx={{
                          height: { xs: '25px', md: '25px',lg: '25px' },

                          "& .MuiInputBase-input::placeholder": {
                            color: "rgba(255, 255, 255, 0.7) !important",
                            // fontSize: { xs: '30px', lg: '14px' },
                          },
                        }}
                      />
                    )}
                  />
                  <FormHelperText error>{errors.email?.message}</FormHelperText>
                </Grid>
                <Grid item xs={12} md={12}  lg={12}>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 1,
                      fontWeight: "bold",
                      color: "white",
                      textAlign: "left",
                      // fontSize: { xs: "35px", lg: "18px" },
                    }}
                  >
                    Services
                  </Typography>
                  

                  <Controller
                    name="services"
                    control={control}
                    render={({ field }) => (
                      <FormControl sx={{ width: '100%', background: 'black', position: 'relative' }}>
                        {/* Always-visible dropdown icon */}
                        <ArrowDropDownIcon
                          sx={{
                            position: 'absolute',
                            right: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#fff',
                            pointerEvents: 'none',
                            zIndex: 2,
                            // fontSize: { xs: '40px', lg: '20px' }
                          }}
                        />

                        <Select
                          multiple
                          {...field}
                          value={selectedProperties}
                          onChange={handlePropertyChange}
                          displayEmpty
                          input={<OutlinedInput notched={false} />}
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                bgcolor: 'black',
                                color: 'white',
                                maxHeight: { xs: 600, lg: 400 },
                                '& .MuiMenuItem-root': {
                                  color: 'white',
                                  '&:hover': {
                                    bgcolor: '#1a1a1a',
                                  },
                                },
                                '& .Mui-selected': {
                                  bgcolor: '#222 !important',
                                },
                              },
                            },
                          }}
                          renderValue={(selected) => {
                            if ((selected as string[]).length === 0) {
                              return (
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: '#fff',
                                    opacity: 0.6,
                                    // fontSize: { xs: '30px', lg: '14px' },
                                  }}
                                >
                                  Services
                                </Typography>
                              );
                            }

                            return (
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexWrap: 'wrap',
                                  gap: '6px',
                                }}
                              >
                                {(selected as string[]).map((item) => (
                                  <Box
                                    key={item}
                                    sx={{
                                      px: 1,
                                      py: 0.5,
                                      borderRadius: '6px',
                                      backgroundColor: '#fff',
                                      color: '#ad0505',
                                      fontSize: { xs: '20px', md: 'auto', lg: 'auto' },
                                    }}
                                  >
                                    {item}
                                  </Box>
                                ))}
                              </Box>
                            );
                          }}
                          sx={{
                            width: '100%',
                            minHeight: { xs: '25px', md: '25px',lg: '25px'  },
                            borderRadius: '10px',
                            boxShadow: '0px 6px 14px #36408D08',
                            fontSize: '10px',
                            color: '#fff',
                            backgroundColor: 'black',
                            alignItems: 'flex-start',
                            paddingRight: '40px',

                            '& .MuiSelect-select': {
                              display: 'flex',
                              alignItems: 'flex-start',
                              flexWrap: 'wrap',
                              gap: '6px',
                              pt: '10px',
                              backgroundColor: 'black',
                            },

                            // 🚫 Remove white bg + shadow on focus
                            '&.Mui-focused': {
                              backgroundColor: 'black !important',
                              boxShadow: 'none !important',
                            },

                            '& fieldset': {
                              border: '1px solid #fff !important',
                            },
                            '&:hover fieldset': {
                              border: '1px solid #fff !important',
                            },
                            '&.Mui-focused fieldset': {
                              border: '1px solid #fff !important',
                            },
                          }}
                        >
                          <ListSubheader sx={{ background: 'black' }}>
                            <Typography
                              variant="caption"
                              sx={{
                                fontWeight: 500,
                                color: '#fff',
                                fontSize: { xs: '20px', md: '16px',lg: '16px' },
                              }}
                            >
                              Services
                            </Typography>
                          </ListSubheader>

                          {propertyTypes.map((option) => (
                            <MenuItem key={option} value={option}>
                              <Checkbox
                                checked={selectedProperties.indexOf(option) > -1}
                                sx={{  color: '#fff',
                                  width: { xs: 40, lg: 24 },
                                  height: { xs: 40, lg: 24 },
                                  '& svg': {
                                    fontSize: { xs: '40px', lg: '20px' },
                                  }, }}
                                
                              />
                              <Typography
                                variant="caption"
                                sx={{
                                  fontWeight: 500,
                                  color: '#fff',
                                  fontSize: { xs: '20px', md: '16px', lg: '16px' },
                                  ml:{xs:2,lg:0}
                                }}
                              >
                                {option}
                              </Typography>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}

                  />



                  <FormHelperText error>{errors.services?.message}</FormHelperText>
                </Grid>
                <Grid item xs={12} md={12}  lg={12} mb={1}>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 1,
                      fontWeight: "bold",
                      color: "white",
                      textAlign: "left",
                      // fontSize: { xs: "35px", lg: "18px" },
                    }}
                  >
                    Message
                  </Typography>
                  <Controller
                    name="message"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        placeholder="Enter Your Message"
                        fullWidth
                        multiline
                        rows={3}
                        {...field}
                        error={!!errors.message}
                        sx={{

                          "& .MuiInputBase-input::placeholder": {
                            color: "rgba(255, 255, 255, 0.7) !important",
                            // fontSize: { xs: '30px', lg: '14px' },
                          },
                        }}
                      />
                    )}
                  />
                  <FormHelperText error>{errors.message?.message}</FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
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
                        border: "none",
                        borderRadius: "10px",
                        letterSpacing: "0.005em",
                        
                        boxShadow: "0 4px 30px rgba(89, 100, 255, .1)",
                        overflow: "hidden",
                        mt: { xs: 2, lg: 0 },
                        // fontSize: { xs: '40px', lg: '18px' },
                        height: { xs: '45px', md: '30px',lg: '30px' },
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
                      Submit
                    </Button>


                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}  lg={6}>
            <Box sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "end" }}>
              <img
                src={contactusshark3}
                alt="Top digital marketing agency offering SEO and PPC services"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactForm;

