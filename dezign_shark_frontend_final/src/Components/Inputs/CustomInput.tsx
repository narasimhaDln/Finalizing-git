import { styled } from "@mui/material/styles";
import InputBase, { InputBaseProps } from "@mui/material/InputBase";
import { ReactNode } from "react";
import { SxProps, Theme } from "@mui/material";

interface CustomInputProps extends InputBaseProps {
  endAdornment?: ReactNode;
  sx?: SxProps<Theme>;
}

const CustomInputWrapper = styled(InputBase)<CustomInputProps>(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(2.0),
  },
  "& .MuiInputBase-input": {
    position: "relative",
    backgroundColor: "transparent",
    border: `1.5px solid currentColor`, // ✅ Border color will be inherited from sx
    borderRadius: "6px",
    fontSize: 14,
    color: "white", // ✅ Input text color set to white
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&::placeholder": {
      color: "white", // ✅ Placeholder text color set to white
      opacity: 1, // ✅ Ensures placeholder is fully visible
    },
    "&:focus": {
      borderColor: "#fc0000",
      boxShadow: "0px 3px 6px #7643EB4D",
      backgroundColor: "transparent",
    },
  },
  "& .MuiInputAdornment-positionEnd": {
    marginLeft: theme.spacing(1),
    position: "absolute",
    right: "8px",
    fontSize: "14px",
  },
}));

export default function CustomInput(props: CustomInputProps) {
  const { endAdornment, sx = {}, ...other } = props;

  return (
    <CustomInputWrapper
      {...other}
      sx={{
        "& .MuiInputBase-input": {
          borderColor: (sx as any)?.borderColor || "white", // ✅ Border color
          height: (sx as any)?.height || "auto", // ✅ Preserves height customization
          "&::placeholder": {
            color: "white", // ✅ Placeholder text remains white even with sx overrides
            opacity: 1,
          },
        },
        ...sx,
      }}
      endAdornment={endAdornment}
    />
  );
}
