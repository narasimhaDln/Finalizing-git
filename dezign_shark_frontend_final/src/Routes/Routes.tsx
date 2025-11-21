import { createBrowserRouter,  } from "react-router-dom";
import Layout from '../Layout';
import { Home, AboutUs,  PrivacyPolicy,Blog ,Contact ,Careers,ServicesDetails,AllBlogDetails,NotFound} from "../Pages/Exports";
import Services from "../Pages/Services";
import JobDetails from "../Pages/Careers/JobDetails";
// import ServicesDetails from "../Pages/Services/ServicesDetails";
// import NotFound from "../Pages/NotFound/NotFound";
// import AllBlogDetails from "../Pages/Blog/BlogDetails/AllBlogDetails";
// import Blog from "../Pages/Blog";
// import Contact from "../Pages/Contact";
// import Careers from "../Pages/Careers";

const router = createBrowserRouter([
  {
    element: <Layout />, // Use updated Layout component
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "services/digital-marketing-hyderabad",
        element: <Services/>,
      },
      {
        path: "/services/:serviceId",
        element: <ServicesDetails/>,
      },
            {
        path: "/blog",
        element: <Blog/>,
      },
            {
        path: "/blog/:slug",
        element: <AllBlogDetails/>,
      },
        {
        path: "/contactus",
        element: <Contact/>,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy/>,
      },
      {
        path: "/careers",
        element: <Careers />,
      },
            {
        path: "/job/:id",
        element: <JobDetails />,
      },
      
    ],
  },

  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

