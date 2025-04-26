import {
  AccountCircle,
  AdminPanelSettings,
  Email,
  Lock,
  Person,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
/* import { motion } from "framer-motion";
 */import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
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
        "http://localhost:8732/api/users/register",
        formData
      );
      toast.success(response.data?.message || "Registration successful");

      // Redirect based on role
      if (formData.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        py: 4,
        px: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box
          sx={{
            backdropFilter: "blur(16px)",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: "24px",
            boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
            p: { xs: 3, sm: 5 },
            width: "100%",
            maxWidth: "500px",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <Stack spacing={2} alignItems="center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "linear-gradient(45deg, #4361ee, #3a0ca3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  mb: 2,
                }}
              >
                <Lock sx={{ fontSize: 40 }} />
              </Box>
            </motion.div>

            <Typography
              variant="h4"
              component="h1"
              fontWeight="600"
              sx={{
                background: "linear-gradient(45deg, #4361ee, #3a0ca3)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Create Account
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Join our community today
            </Typography>
          </Stack>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="primary" />
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
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
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

              <TextField
                fullWidth
                select
                label="Account Type"
                name="role"
                value={formData.role}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {formData.role === "ADMIN" ? (
                        <AdminPanelSettings color="primary" />
                      ) : (
                        <AccountCircle color="primary" />
                      )}
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              >
                <MenuItem value="USER">Standard User</MenuItem>
                <MenuItem value="ADMIN">Administrator</MenuItem>
              </TextField>

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
                    mt: 2,
                    py: 1.5,
                    borderRadius: "12px",
                    background: "linear-gradient(45deg, #4361ee, #3a0ca3)",
                    fontSize: "1rem",
                    fontWeight: "600",
                    textTransform: "none",
                    boxShadow: "none",
                  }}
                >
                  Register Now
                </Button>
              </motion.div>

              <Divider sx={{ my: 2 }}>or</Divider>

              <Typography variant="body2" textAlign="center">
                Already have an account?{" "}
                <Button
                  onClick={() => navigate("/login")}
                  sx={{
                    textTransform: "none",
                    fontWeight: "600",
                    color: "#4361ee",
                  }}
                >
                  Sign In
                </Button>
              </Typography>
            </Stack>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
}

export default Register;
