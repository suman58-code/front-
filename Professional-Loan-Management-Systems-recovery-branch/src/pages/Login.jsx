import {
  Email,
  Lock,
  Login as LoginIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8732/api/users/login",
        formData
      );
      console.log("Login response:", response.data);
      if (response.data && response.data.id && response.data.role) {
        localStorage.setItem("user", JSON.stringify(response.data));
        toast.success("Login successful!");
        window.dispatchEvent(new Event("storage"));
        navigate("/dashboard");
      } else {
        throw new Error("Invalid user data");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      {/* Left Side - Visual Section */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
          p: 8,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Stack spacing={4} sx={{ color: "white", zIndex: 1 }}>
            <Box>
              <LoginIcon sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h2" fontWeight="800">
                Welcome Back
              </Typography>
              <Typography variant="h5" sx={{ opacity: 0.9, mt: 1 }}>
                Sign in to access your personalized dashboard
              </Typography>
            </Box>

            <Stack spacing={2}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    bgcolor: "white",
                    borderRadius: "50%",
                    mr: 2,
                  }}
                />
                <Typography>Track your progress</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    bgcolor: "white",
                    borderRadius: "50%",
                    mr: 2,
                  }}
                />
                <Typography>Access exclusive content</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    bgcolor: "white",
                    borderRadius: "50%",
                    mr: 2,
                  }}
                />
                <Typography>Manage your account</Typography>
              </Box>
            </Stack>
          </Stack>
        </motion.div>

        {/* Decorative elements */}
        <Box
          sx={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.1)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -150,
            left: -150,
            width: 500,
            height: 500,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.05)",
          }}
        />
      </Grid>

      {/* Right Side - Form Section */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 4, sm: 8, md: 10 },
          background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ width: "100%", maxWidth: 500 }}
        >
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: "16px",
              boxShadow: "0 8px 32px rgba(31, 38, 135, 0.1)",
              p: { xs: 3, sm: 5, md: 6 },
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <Stack spacing={2} alignItems="center" sx={{ mb: 4 }}>
              <Typography
                variant="h3"
                component="h1"
                fontWeight="600"
                sx={{
                  background: "linear-gradient(45deg, #4361ee, #3a0ca3)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Sign In
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Enter your credentials to continue
              </Typography>
            </Stack>

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                  size="medium"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                  required
                />

                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  variant="outlined"
                  size="medium"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                  required
                />

                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    onClick={() => navigate("/forgot-password")}
                    sx={{
                      textTransform: "none",
                      color: "#4361ee",
                      fontWeight: "500",
                    }}
                  >
                    Forgot password?
                  </Button>
                </Box>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{
                      mt: 1,
                      py: 1.5,
                      borderRadius: "12px",
                      background: "linear-gradient(45deg, #4361ee, #3a0ca3)",
                      fontSize: "1rem",
                      fontWeight: "600",
                      textTransform: "none",
                      boxShadow: "0 4px 14px rgba(58, 12, 163, 0.3)",
                    }}
                  >
                    Sign In
                  </Button>
                </motion.div>

                <Divider sx={{ my: 2 }}>or</Divider>

                <Typography variant="body2" textAlign="center">
                  Don't have an account?{" "}
                  <Button
                    onClick={() => navigate("/register")}
                    sx={{
                      textTransform: "none",
                      fontWeight: "600",
                      color: "#4361ee",
                    }}
                  >
                    Register
                  </Button>
                </Typography>
              </Stack>
            </Box>
          </Box>
        </motion.div>
      </Grid>
    </Grid>
  );
}

export default Login;
