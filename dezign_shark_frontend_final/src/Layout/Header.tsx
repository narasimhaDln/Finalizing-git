import React, { useState, useEffect, useRef } from "react";
import {
 Toolbar, Typography, Box, IconButton, Drawer, List, ListItemText, ListItemButton, Divider, Container, useMediaQuery, useTheme, Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import gsap from "gsap";
import { useLocation, useNavigate } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { YouTube } from "@mui/icons-material";
import { dslogo, Home } from "../assets";
import PopupForm from "../Components/PopupForm";
import { MdKeyboardArrowDown } from "react-icons/md";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import "./Header.css";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [downloadType, setDownloadType] = useState<"ebook" | "brochure">("brochure");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const digitalMarketingRef = useRef<HTMLDivElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  

  const navItems = [
    { label: "Home", route: "/" },
    { label: "About", route: "/about-us" },
    {
      label: "Services",
      route: "/services/digital-marketing-hyderabad",
      submenu: [
        { label: "Branding", route: "/services/branding-agency-in-hyderabad" },
        { label: "Social Media Marketing", route: "/services/social-media-marketing-agencies-hyderabad" },
        { label: "Pay-Per-Click (PPC) Advertising", route: "/services/lead-generation-company-hyderabad" },
        { label: "Web Development", route: "/services/web-designing-companies" },
        { label: "Search Engine Optimization (SEO)", route: "/services/search-engine-optimization" },
        { label: "Graphic Designing", route: "/services/graphic-designing" },
      ],
    },
    {
      label: "Gallery",
      route: "https://www.google.com/maps/place/Dezign+Shark+%7C+Branding+%26+Digital+Marketing+Agency+in+Hyderabad/@17.4111823,78.4016813,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipN9OMv3de-XAH8Rt02q0m94SMvLUKqY93opYdkS!2e10!3e12!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipN9OMv3de-XAH8Rt02q0m94SMvLUKqY93opYdkS%3Dw86-h86-k-no!7i1600!8i1600!4m7!3m6!1s0x6b43765a51d595d:0x888192e0597f0421!8m2!3d17.4112721!4d78.4018151!10e5!16s%2Fg%2F11kq3q5yrp?authuser=0&entry=ttu&g_ep=EgoyMDI1MDMxOS4yIKXMDSoASAFQAw%3D%3D",
      external: true,
    },
    { label: "Blogs", route: "/blog" },
    { label: "Careers", route: "/careers" },
    { label: "Contact Us", route: "/contactus" },
  ];

  const handleOpenPopup = (type: "ebook" | "brochure") => {
    setDownloadType(type);
    setIsPopupOpen(true);
  };
  const handleNavigate = (route: string, external?: boolean) => {
    if (external) window.open(route, "_blank");
    else navigate(route);
    setDropdownOpen(null);
    setMobileOpen(false);
  };
  const handleDropdownToggle = (menu: string) => setDropdownOpen(dropdownOpen === menu ? null : menu);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleMobileSubMenuToggle = (menu: string) => setOpenSubMenu(openSubMenu === menu ? null : menu);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (!headerRef.current) return;
      if (currentScroll > lastScrollY && currentScroll > 100) {
        setScrollDirection("down");
        gsap.to(headerRef.current, { transform: "perspective(600px) rotateX(-90deg)", opacity: 0, duration: 0.5, ease: "power2.out" });
      } else if (currentScroll < lastScrollY) {
        setScrollDirection("up");
        gsap.to(headerRef.current, { transform: "perspective(600px) rotateX(0deg)", opacity: 1, boxShadow: "0 3px 18px rgba(2,21,78,0.09)", duration: 0.5, ease: "power2.out" });
      }
      setLastScrollY(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (dropdownOpen && dropdownRef.current) gsap.fromTo(dropdownRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
    if (digitalMarketingRef.current) gsap.fromTo(digitalMarketingRef.current, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" });
  }, [dropdownOpen]);

  useEffect(() => {
    if (mobileOpen && drawerRef.current) gsap.fromTo(drawerRef.current, { x: "-100%", opacity: 0 }, { x: "0%", opacity: 1, duration: 0.5, ease: "power2.out" });
    else if (!mobileOpen && drawerRef.current) gsap.to(drawerRef.current, { x: "-100%", opacity: 0, duration: 0.5, ease: "power2.inOut" });
  }, [mobileOpen]);

  const renderDesktopMenu = () => (
    <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
      {navItems.map((item, index) => {
        const isActive = location.pathname === item.route || (item.label === "Services" && location.pathname.startsWith("/services")) || (item.label === "Home" && location.pathname === "/");
        return (
          <Box key={index} sx={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }} onMouseEnter={() => handleDropdownToggle(item.label)} onMouseLeave={() => setDropdownOpen(null)} className="menu">
            <Typography className={`nav-link ${isActive ? "active" : ""}`} variant="body2" sx={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", paddingLeft: isActive ? "10px" : "0", transition: "padding-left 0.2s ease-in-out", "&:hover": { paddingLeft: "10px" }, cursor: "none !important" }} onClick={() => handleNavigate(item.route, item.external)}>
              {item.label} {item.submenu && <MdKeyboardArrowDown className="dropdown-arrow" />}
            </Typography>
            <Box className="nav-underline" sx={{ position: "absolute", bottom: "-4px", left: 0, width: isActive ? "100%" : "0%", height: "2px", backgroundColor: "white", transition: "width 0.3s ease-in-out" }} />
            {item.submenu && dropdownOpen === item.label && (
              <Box className="dropdown-menu" ref={dropdownRef}>
                {item.submenu.map((subItem, subIndex) => (
                  <Typography key={subIndex} className="dropdown-item" variant="body2" onClick={() => handleNavigate(subItem.route)}>
                    {subItem.label}
                  </Typography>
                ))}
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );

  const renderMobileMenu = () => (
    <Box>
      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle} sx={{ "& .MuiDrawer-paper": { width: "100%", color: "white", border: "none", overflowY: "auto", backgroundColor: "rgba(0, 0, 0, 0.2)", backdropFilter: "blur(10px)", pb: 4 } }}>
        <Box className="drawer-content" sx={{ width: '100%', display: "flex", flexDirection: "column", height: "100%" }}>
          <IconButton onClick={handleDrawerToggle} sx={{ position: "absolute", top: 20, right: 20, backgroundColor: "#fc0000", "&:hover": { backgroundColor: "rgba(223, 10, 10, 0.2)" }, borderRadius: "50%", padding: "5px" }}>
            <CloseIcon sx={{ color: "#FFFFFF", fontSize: "25px" }} />
          </IconButton>
          <Box sx={{ mt: { xs: 8, md: 16 }, mb: 2, display: 'flex', justifyContent: 'center' }}>
            <Box component="img" src={Home.logosidebar} alt="Top digital marketing agency offering SEO and PPC services" sx={{ height: { xs: "auto", md: "auto" }, width: { xs: "60%", md: "auto" }, cursor: "pointer" }} onClick={() => handleNavigate("/")} />
          </Box>
          <List>
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.route || (item.label === "Services" && location.pathname.startsWith("/services")) || (item.label === "Home" && location.pathname === "/");
              return (
                <Box key={index}>
                  <ListItemButton onClick={() => handleNavigate(item.route, item.external)} sx={{ color: "#FFF", transition: "border-left 0.3s ease-in-out", borderLeft: isActive ? "3px solid red" : "3px solid transparent" }}>
                    <ListItemText primary={item.label} primaryTypographyProps={{ sx: { fontWeight: "bold", color: "white", pl: 5 } }} />
                    {item.submenu && (
                      <IconButton onClick={e => { e.stopPropagation(); handleMobileSubMenuToggle(item.label); }}>
                        <ArrowDropDownIcon sx={{ transform: openSubMenu === item.label ? "rotate(180deg)" : "rotate(0deg)", color: "#FFF" }} />
                      </IconButton>
                    )}
                  </ListItemButton>
                  <Divider sx={{ backgroundColor: "#FFFFFF80" }} />
                  {item.submenu && (
                    <Collapse in={openSubMenu === item.label} timeout="auto" unmountOnExit>
                      <List sx={{ pl: 2 }}>
                        {item.submenu.map((subItem, subIndex) => {
                          const isSubActive = location.pathname === subItem.route;
                          return (
                            <Box key={subIndex}>
                              <ListItemButton onClick={() => handleNavigate(subItem.route)} sx={{ color: "#FFF", borderLeft: isSubActive ? "3px solid red" : "3px solid transparent", transition: "border-left 0.3s ease-in-out", "&:hover": { borderLeft: "3px solid red" } }}>
                                <ListItemText primary={subItem.label} primaryTypographyProps={{ sx: { fontWeight: "bold", color: "white" } }} />
                              </ListItemButton>
                              <Divider sx={{ backgroundColor: "#FFFFFF80" }} />
                            </Box>
                          );
                        })}
                      </List>
                    </Collapse>
                  )}
                </Box>
              );
            })}
          </List>
          <Box sx={{ mt: 4 }} />
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 5 }}>
            {[{
              href: "https://youtube.com/@dezignshark?si=7-aInZhNlvvwWfx7 ", icon: <YouTube sx={{ fontSize: "20px" }} />
            }, {
              href: "https://x.com/DezignShark", icon: <XIcon sx={{ fontSize: "20px" }} />
            }, {
              href: "https://www.instagram.com/dezign__shark?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", icon: <InstagramIcon sx={{ fontSize: "20px" }} />
            }, {
              href: "https://www.facebook.com/share/1BZTYjKt2H/", icon: <FacebookIcon sx={{ fontSize: "20px" }} />
            }, {
              href: "https://www.linkedin.com/company/dezignshark/", icon: <LinkedInIcon sx={{ fontSize: "20px" }} />
            }].map((item, i) => (
              <IconButton key={i} component="a" href={item.href} target="_blank" rel="noopener noreferrer" sx={{ color: "#FFFFFF", backgroundColor: "#fc0000", "&:hover": { backgroundColor: "rgba(223, 10, 10, 0.2)" }, borderRadius: "50%", padding: "10px", width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center" }}>{item.icon}</IconButton>
            ))}
          </Box>
          <Typography variant="h6" align="center" sx={{ mt: 4, color: "#FFFFFF80", mb: 2 }}>
            ©2025 All Rights Reserved. Designed by Dezign Shark.
          </Typography>
        </Box>
      </Drawer>
    </Box>
  );

  return (
    <>
      <Box ref={headerRef} className={`header ${scrollDirection === "down" ? "top-up" : "sticky"}`} sx={{ height: { xs: '55px', lg: 'auto', md: 'auto' }, width: '100%', boxShadow: 'none', padding: "1px 0", backgroundColor: "rgba(0, 0, 0, 0.9) !important", backdropFilter: "blur(2px)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Container maxWidth='xl'>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: { xs: '-3px 0px ', md: "5px 10px", lg: "5px 10px" } }}>
            <Box sx={{ display: "flex", alignItems: "center", py: 1 }} onClick={() => handleNavigate("/")}>
              <Box component="img" src={dslogo} alt="Top digital marketing agency offering SEO and PPC services" sx={{ width: { xs: "100px", md: "auto", lg: "auto" }, height: "auto", maxWidth: "100%", cursor: "pointer" }} />
            </Box>
            {!isMobile && renderDesktopMenu()}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 0px", gap: '10px' }}>
              <Box sx={{ width: { xs: 'auto', md: "auto", lg: "auto" } }}>
                <Box onClick={() => handleOpenPopup("brochure")} sx={{ width: { xs: "35px", md: "35px", lg: "216px" }, height: { xs: "30px", md: "40px", lg: "40px" }, fontSize: { xs: "0px", md: "13px", lg: "13px" }, background: "rgba(145, 9, 9, 0.8) !important", color: "white !important", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", borderRadius: "10px", "&:hover": { border: "none", background: "rgba(145, 9, 9, 1) !important" } }}>
                  <Box sx={{ display: { xs: 'none', lg: 'inline' }, fontSize: '13px' }} className="button-text">Download Brochure</Box>
                  <FileDownloadIcon sx={{ fontSize: { xs: '20px', md: '20px', lg: '20px' } }} />
                </Box>
              </Box>
              {isMobile && (
                <IconButton color="inherit" onClick={handleDrawerToggle}>
                  <MenuIcon sx={{ fontSize: { xs: "30px", md: "13px", lg: "50px" } }} />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </Box>
      {isMobile && renderMobileMenu()}
      <PopupForm isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} downloadType={downloadType} />
    </>
  );
};

export default Header;