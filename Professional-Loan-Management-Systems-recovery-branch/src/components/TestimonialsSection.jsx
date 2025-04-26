// src/components/TestimonialsSection.jsx
import { Box, Container, Grid, IconButton, Typography, Avatar } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { TestimonialCard } from "./StyledComponents";
import React, { useState } from "react";

const testimonials = [
  {
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Anil Kumar",
    text: "The loan process was smooth and transparent. Highly recommended!",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Priya Sharma",
    text: "The EMI calculator is transparent and accurate. I planned my finances easily.",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/14.jpg",
    name: "Ravi Menon",
    text: "Excellent customer service and support. Truly a modern loan system.",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    name: "Sonia Patel",
    text: "I love the instant approval and flexible repayment options!",
  },
];

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const handleNextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <Box sx={{ py: 8, width: "100%", backgroundColor: "#fff", position: "relative" }}>
      <Container>
        <Typography variant="h3" align="center" gutterBottom sx={{
          color: "#005bea", fontWeight: 800, mb: 6, position: "relative",
          "&::after": {
            content: '""', position: "absolute", bottom: -10, left: "50%",
            transform: "translateX(-50%)", width: 100, height: 3, backgroundColor: "#00c6fb",
          },
        }}>
          What Our Customers Say
        </Typography>
        <Box sx={{ position: "relative", width: "100%", minHeight: 330 }}>
          <IconButton onClick={handlePrevTestimonial} sx={{
            position: "absolute", top: "50%", left: 0, zIndex: 2,
            background: "#005bea", color: "#fff", "&:hover": { background: "#00c6fb", color: "#005bea" },
            transform: "translateY(-50%)",
          }}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} md={8}>
              <AnimatePresence initial={false}>
                <motion.div key={currentTestimonial}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}>
                  <TestimonialCard elevation={4}>
                    <Avatar src={testimonials[currentTestimonial].avatar}
                      alt={testimonials[currentTestimonial].name}
                      sx={{
                        width: 90, height: 90, mb: 2, border: "3px solid #00c6fb",
                        boxShadow: "0 4px 16px rgba(0,198,251,0.15)",
                      }}
                    />
                    <Typography variant="h6" sx={{ color: "#005bea", mb: 1 }}>
                      {testimonials[currentTestimonial].name}
                    </Typography>
                    <Typography variant="body1" sx={{
                      color: "#666", fontStyle: "italic", mb: 2,
                    }}>
                      "{testimonials[currentTestimonial].text}"
                    </Typography>
                  </TestimonialCard>
                </motion.div>
              </AnimatePresence>
            </Grid>
          </Grid>
          <IconButton onClick={handleNextTestimonial} sx={{
            position: "absolute", top: "50%", right: 0, zIndex: 2,
            background: "#005bea", color: "#fff", "&:hover": { background: "#00c6fb", color: "#005bea" },
            transform: "translateY(-50%)",
          }}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}
