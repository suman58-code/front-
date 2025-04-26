// src/components/StyledComponents.js
import { Box, Button, Card, Paper, styled } from "@mui/material";

// Glass effect card for dashboard or info panels
export const GlassCard = styled(Card)(({ theme }) => ({
  background: "rgba(255,255,255,0.93)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.14)",
  backdropFilter: "blur(10px)",
  borderRadius: "28px",
  overflow: "hidden",
  border: "1.5px solid #e3eafc",
  transition: "transform 0.3s cubic-bezier(.25,.8,.25,1)",
  "&:hover": {
    transform: "translateY(-6px) scale(1.02)",
    boxShadow: "0 16px 40px 0 rgba(31,38,135,0.16)",
  },
}));

// Gradient button for CTAs (call-to-action) - Sundaram Finance style
export const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(90deg, #005bea 0%, #ffc300 100%)",
  border: 0,
  color: "#fff",
  fontWeight: 800,
  fontSize: "1.15rem",
  borderRadius: "32px",
  padding: "12px 40px",
  boxShadow: "0 3px 12px 2px rgba(0, 45, 98, .13)",
  textTransform: "none",
  letterSpacing: "0.05em",
  transition: "background 0.2s, color 0.2s",
  "&:hover": {
    background: "linear-gradient(90deg, #ffc300 0%, #005bea 100%)",
    color: "#003366",
  },
}));

// Hero section background with Sundaram blue & gold overlay and a subtle image
export const HeroBg = styled(Box)({
  position: "absolute",
  width: "100vw",
  height: "100%",
  left: 0,
  top: 0,
  zIndex: 0,
  background:
    "linear-gradient(120deg, rgba(0,94,184,0.92) 0%, rgba(255,195,0,0.37) 100%), url('https://images.unsplash.com/photo-1515168833906-d2a3b82b1e6b?auto=format&fit=crop&w=1500&q=80') center/cover no-repeat",
  filter: "brightness(0.98)",
  pointerEvents: "none",
});

// Hero section image styling
export const HeroImage = styled("img")({
  width: "90%",
  maxWidth: 540,
  borderRadius: "36px",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.20)",
  border: "4px solid #ffc300",
  marginTop: 32,
  background: "#e3f0ff",
});

// Testimonial card for reviews or quotes
export const TestimonialCard = styled(Paper)(({ theme }) => ({
  background: "linear-gradient(120deg, #f8fafc 0%, #fffbe6 100%)",
  borderRadius: 28,
  padding: theme.spacing(4, 3),
  boxShadow: "0 6px 32px 0 rgba(0,94,184,0.10)",
  minHeight: 260,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "0 8px",
  color: "#003366",
}));

// Footer background with Sundaram blue and gold
export const FooterBg = styled(Box)({
  position: "absolute",
  width: "100vw",
  height: "100%",
  left: 0,
  top: 0,
  zIndex: 0,
  background:
    "linear-gradient(120deg, rgba(0,94,184,0.96) 0%, rgba(255,195,0,0.18) 100%), url('https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1500&q=80') center/cover no-repeat",
  filter: "brightness(0.98)",
  pointerEvents: "none",
});
