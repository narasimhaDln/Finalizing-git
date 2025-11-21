import React from "react";
import { Button, Box, styled, SxProps, Theme } from "@mui/material";
import EastIcon from '@mui/icons-material/East';

// Styled MUI Button
const StyledButton = styled(Button)({
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
});

// Arrow Container
const ArrowContainer = styled(Box)({
  position: "relative",
  overflow: "hidden",
  display: "inline-flex",
  // width: "20px",
  // height: "20px",
});

// Styled MUI Icons
const ArrowIconStyled = styled(EastIcon)({
  transition: "transform 0.3s ease-out",
  color: "white", // Ensures visibility
});

const ArrowIconFirst = styled(ArrowIconStyled)({
  transform: "translateX(0) translateY(0) translateZ(0)",
});

const ArrowIconLast = styled(ArrowIconStyled)({
  position: "absolute",
  top: 0,
  left: 0,
  transform: "translateX(-200%) translateY(200%) translateZ(0)",
});

// ✅ Reusable Button Component with Dynamic `sx`
interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  sx?: SxProps<Theme>; // ✅ Fully dynamic styles per file
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, onClick, sx }) => {
  return (
    <StyledButton onClick={onClick} sx={sx}>
      {children}
      <ArrowContainer className="btn-arrow-hover">
        <ArrowIconFirst className="arrow-first" />
        <ArrowIconLast className="arrow-second" />
      </ArrowContainer>
    </StyledButton>
  );
};

export default CustomButton;
