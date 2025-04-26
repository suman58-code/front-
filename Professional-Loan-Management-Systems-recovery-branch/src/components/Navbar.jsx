import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import CreditScoreRoundedIcon from "@mui/icons-material/CreditScoreRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PictureAsPdf from "@mui/icons-material/PictureAsPdf";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
}));

const NavButton = styled(Button)(({ theme, active }) => ({
  color: active ? theme.palette.primary.main : "#555",
  fontWeight: 600,
  fontSize: "0.95rem",
  padding: "8px 16px",
  borderRadius: "12px",
  textTransform: "none",
  transition: "all 0.3s ease",
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    background: "rgba(0, 45, 98, 0.05)",
    transform: "translateY(-2px)",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "50%",
    width: active ? "100%" : "0%",
    height: "3px",
    background: "linear-gradient(90deg, #002D62, #F9B233)",
    transition: "all 0.3s ease",
    transform: "translateX(-50%)",
  },
}));

const SignInButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #002D62 30%, #F9B233 90%)",
  border: 0,
  borderRadius: "12px",
  color: "white",
  padding: "8px 24px",
  fontWeight: 600,
  textTransform: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0, 45, 98, 0.2)",
  },
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #dc3545 30%, #ff4d4d 90%)",
  border: 0,
  borderRadius: "12px",
  color: "white",
  padding: "8px 24px",
  fontWeight: 600,
  textTransform: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(220, 53, 69, 0.2)",
  },
}));

const Logo = styled(Typography)(({ theme }) => ({
  background: "linear-gradient(45deg, #002D62, #F9B233)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: 800,
  fontSize: "1.5rem",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.05)",
  },
  transition: "transform 0.3s ease",
}));

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      setIsAuthenticated(!!user.id);
      setUserRole(user.role || null);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getNavItems = () => {
    const items = [{ title: "Home", path: "/", icon: <HomeRoundedIcon /> }];

    if (isAuthenticated) {
      items.push(
        {
          title: "Dashboard",
          path: "/dashboard",
          icon: <DashboardRoundedIcon />,
        },
        {
          title: "Credit Score",
          path: "/credit-score",
          icon: <CreditScoreRoundedIcon />,
        },
        {
          title: "Document Hub",
          path: "/documents",
          icon: <PictureAsPdf />,
        }
      );
      if (userRole === "USER") {
        items.push({
          title: "Apply Loan",
          path: "/apply-loan",
          icon: <AccountBalanceRoundedIcon />,
        });
      }
    }

    return items;
  };

  // Redirect to HOME after logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage"));
    toast.success("Logged out successfully");
    navigate("/", { replace: true });
  };

  const drawer = (
    <Box sx={{ width: 280, pt: 2 }}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", px: 2, mb: 2 }}
      >
        <Logo>SundaramProLoan</Logo>
        <IconButton onClick={handleDrawerToggle}>
          <CloseRoundedIcon />
        </IconButton>
      </Box>
      <List>
        {getNavItems().map((item) => (
          <ListItem
            key={item.title}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{
              mb: 1,
              borderRadius: 2,
              mx: 1,
              "&:hover": {
                backgroundColor: "rgba(0, 45, 98, 0.05)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: location.pathname === item.path ? "#002D62" : "#666",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.title}
              sx={{
                color: location.pathname === item.path ? "#002D62" : "#666",
                "& .MuiListItemText-primary": {
                  fontWeight: location.pathname === item.path ? 600 : 400,
                },
              }}
            />
          </ListItem>
        ))}
        {!isAuthenticated && (
          <>
            <ListItem
              component={Link}
              to="/login"
              onClick={handleDrawerToggle}
              sx={{
                mb: 1,
                borderRadius: 2,
                mx: 1,
                background: "linear-gradient(45deg, #002D62 30%, #F9B233 90%)",
                color: "white",
                "&:hover": {
                  opacity: 0.9,
                },
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>
                <LoginRoundedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Login"
                sx={{
                  "& .MuiListItemText-primary": {
                    fontWeight: 600,
                  },
                }}
              />
            </ListItem>
            <ListItem
              component={Link}
              to="/register"
              onClick={handleDrawerToggle}
              sx={{
                mb: 1,
                borderRadius: 2,
                mx: 1,
                border: "2px solid #002D62",
                "&:hover": {
                  backgroundColor: "rgba(0, 45, 98, 0.05)",
                },
              }}
            >
              <ListItemIcon>
                <PersonAddRoundedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Register"
                sx={{
                  "& .MuiListItemText-primary": {
                    fontWeight: 600,
                  },
                }}
              />
            </ListItem>
          </>
        )}
      </List>
      {isAuthenticated && (
        <Box sx={{ p: 2, mt: "auto" }}>
          <LogoutButton
            fullWidth
            onClick={() => {
              handleLogout();
              handleDrawerToggle();
            }}
            startIcon={<LogoutRoundedIcon />}
          >
            Logout
          </LogoutButton>
        </Box>
      )}
    </Box>
  );

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <StyledAppBar
        position="fixed"
        sx={{
          py: 1,
          transform: scrolled ? "translateY(0)" : "none",
          transition: "transform 0.3s ease",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Logo
              component={Link}
              to="/"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              SundaramProLoan
            </Logo>

            {isMobile ? (
              <IconButton
                color="primary"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ ml: "auto" }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box
                sx={{
                  ml: "auto",
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                {getNavItems().map((item) => (
                  <NavButton
                    key={item.title}
                    component={Link}
                    to={item.path}
                    active={location.pathname === item.path ? 1 : 0}
                    startIcon={item.icon}
                  >
                    {item.title}
                  </NavButton>
                ))}
                {!isAuthenticated ? (
                  <>
                    <SignInButton
                      component={Link}
                      to="/login"
                      startIcon={<LoginRoundedIcon />}
                    >
                      Login
                    </SignInButton>
                    <Button
                      component={Link}
                      to="/register"
                      variant="outlined"
                      startIcon={<PersonAddRoundedIcon />}
                      sx={{
                        borderRadius: "12px",
                        textTransform: "none",
                        fontWeight: 600,
                        borderWidth: 2,
                        "&:hover": {
                          borderWidth: 2,
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      Register
                    </Button>
                  </>
                ) : (
                  <LogoutButton
                    onClick={handleLogout}
                    startIcon={<LogoutRoundedIcon />}
                  >
                    Logout
                  </LogoutButton>
                )}
              </Box>
            )}
          </Toolbar>
        </Container>
      </StyledAppBar>
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
          },
        }}
      >
        {drawer}
      </Drawer>
      <Toolbar />
    </motion.div>
  );
};

export default Navbar;
