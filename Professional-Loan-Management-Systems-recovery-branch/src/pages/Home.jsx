// src/pages/Home.jsx
import { Box, Typography } from "@mui/material";
import EligibilitySection from "../components/EligibilitySection";
import EmiCalculator from "../components/EmiCalculator";
import FaqSection from "../components/FaqSection";
import FooterSection from "../components/FooterSection";
import HeroSection from "../components/HeroSection";
import TestimonialsSection from "../components/TestimonialsSection";

export default function Home() {
  return (
    <Box
      sx={{
        backgroundColor: "#f4f7fb",
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <HeroSection />
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          color: "#005bea",
          fontWeight: 800,
          mb: 4,
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 100,
            height: 3,
            backgroundColor: "#00c6fb",
          },
        }}
      >
        EMI Calculator
      </Typography>
      <EmiCalculator />
      <EligibilitySection />
      <TestimonialsSection />
      <FaqSection />
      <FooterSection />
    </Box>
  );
}
