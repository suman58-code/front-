import { Box, Button, Container, Grid, Typography, Stack } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GradientButton, HeroBg, HeroImage } from "./StyledComponents";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ShieldIcon from "@mui/icons-material/Shield";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import BoltIcon from "@mui/icons-material/Bolt";

const heroContent = [
  {
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=900&q=80",
    title: "Banking for Professionals",
    subtitle: "Empower Your Ambitions with Trusted Finance",
    description:
      "Experience next-gen banking for your business. Fast, secure, and fully digital professional loans from Sundaram Finance. Grow your practice or business with confidence.",
    highlights: [
      {
        icon: <BoltIcon color="primary" />,
        label: "Instant Digital Approvals",
      },
      {
        icon: <VerifiedUserIcon color="success" />,
        label: "100% Secure & Compliant",
      },
      { icon: <TrendingUpIcon color="info" />, label: "Flexible Repayment" },
      {
        icon: <ShieldIcon color="secondary" />,
        label: "Trusted by 1M+ Businesses",
      },
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80",
    title: "Seamless Digital Experience",
    subtitle: "Apply, Track, and Manage Online",
    description:
      "No paperwork, no branch visits. Apply for loans, upload documents, and track your application—all from your dashboard.",
    highlights: [
      { icon: <BoltIcon color="primary" />, label: "Paperless Process" },
      { icon: <TrendingUpIcon color="info" />, label: "Real-Time Status" },
      {
        icon: <VerifiedUserIcon color="success" />,
        label: "Personalized Support",
      },
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1508385082359-f48fa9e4b6c7?auto=format&fit=crop&w=900&q=80",
    title: "Transparent. Reliable. Modern.",
    subtitle: "Banking You Can Trust",
    description:
      "No hidden fees. No surprises. Just clear terms, fair rates, and banking designed for tomorrow’s professionals.",
    highlights: [
      { icon: <ShieldIcon color="secondary" />, label: "Transparent Terms" },
      {
        icon: <VerifiedUserIcon color="success" />,
        label: "Regulatory Compliant",
      },
      { icon: <TrendingUpIcon color="info" />, label: "Growth-Focused" },
    ],
  },
];

const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

export default function HeroSection() {
  const [currentHero, setCurrentHero] = useState(0);
  const [direction, setDirection] = useState(0);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userRole = user.role || null;

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentHero((prev) => (prev + 1) % heroContent.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const { title, subtitle, description, image, highlights } =
    heroContent[currentHero];

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: 600, md: 720 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(145deg, #eaf4ff 0%, #f6fbff 100%)",
        overflow: "hidden",
      }}
    >
      <HeroBg />
      <Container sx={{ position: "relative", zIndex: 2, pt: 10, pb: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h2"
                sx={{
                  color: "#003f88",
                  fontWeight: 800,
                  fontSize: { xs: "2.2rem", md: "3.2rem" },
                  mb: 2,
                  textShadow: "0 2px 4px rgba(0,0,0,0.06)",
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: "#0077cc",
                  fontWeight: 600,
                  mb: 2,
                  fontSize: { xs: "1.1rem", md: "1.3rem" },
                }}
              >
                {subtitle}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#333", mb: 4, lineHeight: 1.6 }}
              >
                {description}
              </Typography>

              <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ mb: 3 }}>
                {highlights.map((h) => (
                  <Box
                    key={h.label}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#f0f8ff",
                      borderRadius: 2,
                      px: 2,
                      py: 1,
                      mr: 1,
                      mb: 1,
                      color: "#005bea",
                      fontWeight: 600,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                    }}
                  >
                    {h.icon}
                    <span style={{ marginLeft: 8 }}>{h.label}</span>
                  </Box>
                ))}
              </Stack>

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {userRole !== "ADMIN" && (
                  <GradientButton as={Link} to="/apply-loan">
                    Get Started
                  </GradientButton>
                )}
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  to="/contact"
                  sx={{
                    borderColor: "#005bea",
                    color: "#005bea",
                    fontWeight: 700,
                    "&:hover": {
                      borderColor: "#0077cc",
                      backgroundColor: "rgba(0,94,184,0.05)",
                      color: "#003f88",
                    },
                  }}
                >
                  Talk to a Banking Advisor
                </Button>
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentHero}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
              >
                <HeroImage src={image} alt={title} loading="eager" />
              </motion.div>
            </AnimatePresence>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
