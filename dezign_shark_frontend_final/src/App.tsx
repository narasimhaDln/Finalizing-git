import { ThemeProvider } from "@emotion/react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import router from "./Routes/Routes";
import { theme } from "./Theme";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useEffect, useState } from "react";
import Preloader from "./Components/Preloader";
import Cookies from "js-cookie";
import PopupForm from "./Components/PopupForm";
import CustomCursor from "./Components/CustomCursor ";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [downloadType, setDownloadType] = useState<"ebook" | "brochure">("brochure");

  // const handleOpenPopup = (type: "ebook" | "brochure") => {
  //   setDownloadType(type);
  //   setIsPopupOpen(true);
  // };

  useEffect(() => {
    const formModal = Cookies.get("formModal");

    if (!formModal) {
      const firstTimeout = setTimeout(() => {
        setIsPopupOpen(true);
        setDownloadType("brochure"); // Optional: default type
        Cookies.set("formModal", "shown", { expires: 1 });
      }, 25000);

      return () => clearTimeout(firstTimeout);
    } else {
      const interval = setInterval(() => {
        setIsPopupOpen(true);
        setDownloadType("brochure"); // Optional: default type
      }, 30000);

      return () => clearInterval(interval);
    }
  }, []);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  if (isLoading) {
    return (
      <Preloader
        videoSrc="https://dprstorage.b-cdn.net/dezignshark/dsrpreloder.mp4"
        onEnd={() => setIsLoading(false)}
      />
    );
  }

  return (
    <Box className="App">
      {/* <Global
        styles={css`
          ::-webkit-scrollbar {
            width: 4px;
            overflow-x: hidden;
          }
          ::-webkit-scrollbar-thumb {
            background-color: rgba(145, 9, 9, 0.8);
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background-color: ${theme.palette.primary.dark};
          }
          ::-webkit-scrollbar-track {
            background-color: #f1f1f1;
          }
        `}
      /> */}

      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <CustomCursor />

          <PopupForm
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            downloadType={downloadType}
          />

          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </QueryClientProvider>
      </ThemeProvider>
    </Box>
  );
}

export default App;
