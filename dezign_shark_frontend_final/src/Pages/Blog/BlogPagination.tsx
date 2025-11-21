import React, { useState } from "react";
import { Box, Button, Container, IconButton } from "@mui/material";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";


const CustomPagination: React.FC = () => {
  const [page, setPage] = useState(1);
  const totalPages = 2; // Adjust total pages as needed

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <Container maxWidth='xl'>

      <Box sx={{ display: "flex", gap: 1,my:4 }}>
        {/* Page 1 */}
        <Button
          onClick={() => handlePageChange(1)}
          sx={{
            width: 40,
            height: 40,
            border: "1px solid black",
            borderRadius: "0px",
            backgroundColor: page === 1 ? "black" : "white",
            color: page === 1 ? "white" : "black",
            fontWeight: "bold",
            minWidth: "unset",
            "&:hover": {
              backgroundColor: page === 1 ? "black" : "#f5f5f5",
            },
          }}
        >
          1
        </Button>

        {/* Page 2 */}
        <Button
          onClick={() => handlePageChange(2)}
          sx={{
            width: 40,
            height: 40,
            border: "1px solid black",
            borderRadius: "0px",
            backgroundColor: page === 2 ? "black" : "white",
            color: page === 2 ? "white" : "black",
            fontWeight: "bold",
            minWidth: "unset",
            "&:hover": {
              backgroundColor: page === 2 ? "black" : "#f5f5f5",
            },
          }}
        >
          2
        </Button>

        {/* Next Button */}
        <IconButton
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          sx={{
            width: 40,
            height: 40,
            border: "1px solid black",
            borderRadius: "0px",
            backgroundColor: "white",
            color: "black",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <MdOutlineKeyboardDoubleArrowRight />
        </IconButton>
      </Box>
    </Container>
  );
};

export default CustomPagination;
