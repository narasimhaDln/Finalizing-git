import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Typography,
  IconButton,
  FormControl,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { gsap } from "gsap";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

import CustomInput from "../../../../Components/Inputs/CustomInput";
import FileUploadContainer from "../../../../Components/FileUpload";
import { applicationForm } from "../../../../api/services";

const steps = ["Upload Resume", "My Information", "Experience & CTC", "Social & Cover", "Submit"];

interface ApplicationFormPopupProps {
  open: boolean;
  handleClose: () => void;
  jobId?: string;
}

const ApplicationFormPopup: React.FC<ApplicationFormPopupProps> = ({ open, handleClose, jobId }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const formRef = useRef<HTMLDivElement | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const defaultValues = {
    resumeUrl: "",
    fullName: "",
    email: "",
    phone: "",
    currentLocation: "",
    experience: "",
    noticePeriod: "",
    currentCTC: "",
    expectedCTC: "",
    jobTitle: "",
    companyName: "",
    portfolioLink: "",
    linkedInUrl: "",
    coverLetter: "",
    source: "Career Page",
    consent: true,
  };

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
    watch
  } = useForm({ defaultValues });

  const resumeUrl = watch("resumeUrl");

  useEffect(() => {
    if (open && formRef.current) {
      gsap.fromTo(formRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
    }
  }, [open, activeStep]);

  const { mutate, isLoading } = useMutation(applicationForm, {
    onSuccess: () => {
      toast.success("Application submitted successfully!");
      setSubmitted(true);
      setActiveStep(steps.length - 1);
    },
    onError: () => {
      toast.error("Failed to submit application. Try again.");
    },
  });

  const stepFields: Record<number, Array<keyof typeof defaultValues>> = {
    0: ["resumeUrl"],
    1: ["fullName", "email", "phone", "currentLocation"],
    2: ["experience", "currentCTC", "expectedCTC", "noticePeriod"],
    3: ["portfolioLink", "linkedInUrl", "coverLetter", "source", "consent"],
  };

  const nextStep = async () => {
    const fields = stepFields[activeStep] || [];
    const isValid = await trigger(fields);
    if (isValid) setActiveStep((prev) => prev + 1);
  };

  const prevStep = () => setActiveStep((prev) => prev - 1);

  const onSubmit = (data: any) => {
    const payload = {
      job: jobId || "688a0fd2832adafcb49ec206", // ✅ fallback valid ObjectId
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      currentLocation: data.currentLocation,
      experience: Number(data.experience),
      noticePeriod: data.noticePeriod,
      currentCTC: Number(data.currentCTC),
      expectedCTC: Number(data.expectedCTC),
      portfolioLink: data.portfolioLink,
      linkedInUrl: data.linkedInUrl,
      resumeUrl: data.resumeUrl,
      coverLetter: data.coverLetter,
      source: data.source,
      consent: data.consent,
    };

    mutate(payload);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md" sx={{
      "& .MuiBackdrop-root": { backdropFilter: "blur(10px)", backgroundColor: "rgba(0,0,0,0.3)" },
      "& .MuiPaper-root": { backgroundColor: "black" },
    }}>
      {activeStep > 0 && !submitted && (
        <IconButton onClick={prevStep} sx={{ position: "absolute", top: 15, left: 20, color: "white" }}>
          <ArrowBackIcon /> Back
        </IconButton>
      )}

      <Box display="flex" justifyContent="flex-end" p={2}>
        <IconButton onClick={handleClose} sx={{ backgroundColor: "#ad0505", color: "white" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Typography variant="h4" sx={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
        Job Application
      </Typography>

      <DialogContent ref={formRef}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, i) => (
            <Step key={i}>
              <StepLabel sx={{
                "& .MuiStepIcon-root": {
                  color: "white",
                  backgroundColor: activeStep === i ? "#ad0505" : "gray",
                  borderRadius: "50%", padding: "5px"
                },
                "& .MuiStepLabel-label": {
                  color: activeStep === i ? "#ad0505 !important" : "white",
                  fontSize: "14px",
                },
              }}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2} mt={5}>

            {/* Step 0 */}
            {activeStep === 0 && !submitted && (
              <Box width="500px">
                <Typography sx={{ color: "white", textAlign: "center", mb: 2 }}>
                  Upload your resume (PDF)
                </Typography>
                <FormControl fullWidth>
                  <Controller
                    name="resumeUrl"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <FileUploadContainer
                        existingFile={field.value}
                        onFileSelect={(url: string | null) => field.onChange(url || "")}
                        onDelete={() => field.onChange("")}
                      />
                    )}
                  />
                  {errors.resumeUrl && <Typography sx={{ color: "white" }} variant="caption">Resume is required</Typography>}
                </FormControl>
              </Box>
            )}

            {/* Step 1 */}
            {activeStep === 1 && !submitted && (
              <Box display="flex" flexDirection="column" gap={2} width="500px">
                <Controller name="fullName" control={control} rules={{ required: true }}
                  render={({ field }) => <CustomInput {...field} placeholder="Full Name" fullWidth required error={!!errors.fullName} />} />
                {errors.fullName && <Typography sx={{ color: "white" }} variant="caption">Full Name is required</Typography>}

                <Controller name="email" control={control} rules={{ required: true }}
                  render={({ field }) => <CustomInput {...field} placeholder="Email" fullWidth required error={!!errors.email} />} />
                {errors.email && <Typography sx={{ color: "white" }} variant="caption">Email is required</Typography>}

                <Controller name="phone" control={control} rules={{ required: true }}
                  render={({ field }) => <CustomInput {...field} placeholder="Phone" fullWidth required error={!!errors.phone} />} />
                {errors.phone && <Typography sx={{ color: "white" }} variant="caption">Phone is required</Typography>}

                <Controller name="currentLocation" control={control} rules={{ required: true }}
                  render={({ field }) => <CustomInput {...field} placeholder="Current Location" fullWidth required error={!!errors.currentLocation} />} />
                {errors.currentLocation && <Typography sx={{ color: "white" }} variant="caption">Location is required</Typography>}
              </Box>
            )}

            {/* Step 2 */}
            {activeStep === 2 && !submitted && (
              <Box display="flex" flexDirection="column" gap={2} width="500px">
                <Controller name="experience" control={control} rules={{ required: true }}
                  render={({ field }) => <CustomInput {...field} type="number" placeholder="Years of Experience" fullWidth required error={!!errors.experience} />} />
                {errors.experience && <Typography sx={{ color: "white" }} variant="caption">Experience is required</Typography>}

                <Controller name="noticePeriod" control={control} rules={{ required: true }}
                  render={({ field }) => <CustomInput {...field} placeholder="Notice Period" fullWidth required error={!!errors.noticePeriod} />} />
                {errors.noticePeriod && <Typography sx={{ color: "white" }} variant="caption">Notice Period is required</Typography>}

                <Controller name="currentCTC" control={control} rules={{ required: true }}
                  render={({ field }) => <CustomInput {...field} type="number" placeholder="Current CTC (in ₹)" fullWidth required error={!!errors.currentCTC} />} />
                {errors.currentCTC && <Typography sx={{ color: "white" }} variant="caption">Current CTC is required</Typography>}

                <Controller name="expectedCTC" control={control} rules={{ required: true }}
                  render={({ field }) => <CustomInput {...field} type="number" placeholder="Expected CTC (in ₹)" fullWidth required error={!!errors.expectedCTC} />} />
                {errors.expectedCTC && <Typography sx={{ color: "white" }} variant="caption">Expected CTC is required</Typography>}
              </Box>
            )}

            {/* Step 3 */}
            {activeStep === 3 && !submitted && (
              <Box display="flex" flexDirection="column" gap={2} width="500px">
                <Controller name="portfolioLink" control={control}
                  render={({ field }) => <CustomInput {...field} placeholder="Portfolio Link (optional)" fullWidth />} />

                <Controller name="linkedInUrl" control={control}
                  render={({ field }) => <CustomInput {...field} placeholder="LinkedIn Profile URL" fullWidth />} />

                {/* ✅ Resume File Name White Text */}
                {resumeUrl && (
                  <CustomInput
                    value={resumeUrl.split("/").pop() ?? ""}
                    placeholder="Resume File Name"
                    fullWidth
                    disabled
                    sx={{
                      mt: 1,
                      "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "white" } // ✅ white text
                    }}
                  />
                )}

                <Controller name="coverLetter" control={control}
                  render={({ field }) => <CustomInput {...field} placeholder="Cover Letter" fullWidth multiline minRows={3} />} />

                <Controller name="source" control={control}
                  render={({ field }) => <CustomInput {...field} placeholder="How did you hear about us?" fullWidth />} />

                <Controller name="consent" control={control} rules={{ validate: (val) => val === true }}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} checked={field.value} sx={{ color: "white" }} />}
                      label={<Typography color="white">I consent to the privacy policy</Typography>}
                    />
                  )} />
                {errors.consent && <Typography sx={{ color: "white" }} variant="caption">Consent is required</Typography>}
              </Box>
            )}

            {/* Step 4: Thank You */}
            {activeStep === 4 && submitted && (
              <Typography variant="h6" sx={{ textAlign: "center", color: "white", mt: 3 }}>
                🎉 Thank you for your application!
              </Typography>
            )}
          </Box>

          <Box display="flex" justifyContent="center" mt={3}>
            {!submitted && (
              activeStep < steps.length - 1 ? (
                <Button variant="contained" onClick={nextStep} sx={{ backgroundColor: "#ad0505", color: "white" }}>
                  Continue
                </Button>
              ) : (
                <Button type="submit" variant="contained" sx={{ backgroundColor: "green", color: "white" }} disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              )
            )}
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationFormPopup;
