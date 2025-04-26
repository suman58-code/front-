// src/components/EmiCalculator.jsx
import React, { useState } from "react";
import { GlassCard, GradientButton } from "./StyledComponents";
import {
  Grid,
  TextField,
  InputAdornment,
  Typography,
  Tooltip,
  Box,
  Divider,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PercentIcon from "@mui/icons-material/Percent";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { motion } from "framer-motion";

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(10.5);
  const [loanTenure, setLoanTenure] = useState(36);
  const [emi, setEmi] = useState(0);

  const calculateEmi = () => {
    const principal = parseFloat(loanAmount);
    const rateOfInterest = parseFloat(interestRate) / 12 / 100;
    const tenureInMonths = parseFloat(loanTenure);
    if (principal > 0 && rateOfInterest > 0 && tenureInMonths > 0) {
      const emi =
        (principal *
          rateOfInterest *
          Math.pow(1 + rateOfInterest, tenureInMonths)) /
        (Math.pow(1 + rateOfInterest, tenureInMonths) - 1);
      setEmi(emi.toFixed(2));
    } else {
      setEmi(0);
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(120deg, #f8fafc 60%, #e3f0ff 100%)",
        py: 8,
        borderRadius: 5,
        boxShadow: "0 6px 32px 0 rgba(0,94,184,0.06)",
        my: 6,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            color: "#005bea",
            fontWeight: 900,
            mb: 3,
            letterSpacing: 1,
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
          Professional Loan EMI Calculator
        </Typography>
        <Typography
          align="center"
          sx={{
            color: "#4f5b7c",
            mb: 5,
            fontSize: { xs: "1rem", md: "1.13rem" },
            maxWidth: 600,
            mx: "auto",
          }}
        >
          Instantly estimate your monthly EMI for business and professional
          loans. Enter your loan details below to plan your repayments
          efficiently.
        </Typography>
      </motion.div>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={8}>
          <GlassCard
            sx={{
              p: { xs: 2, md: 4 },
              borderRadius: 4,
              background: "rgba(255,255,255,0.95)",
              boxShadow: "0 4px 24px rgba(0,94,184,0.09)",
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Loan Amount (₹)"
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <Tooltip title="Total amount you wish to borrow">
                        <InputAdornment position="end">
                          <InfoOutlinedIcon color="info" />
                        </InputAdornment>
                      </Tooltip>
                    ),
                  }}
                  sx={{
                    mb: 2,
                    background: "rgba(255,255,255,0.98)",
                    borderRadius: 2,
                  }}
                  inputProps={{ min: 10000, step: 1000 }}
                  helperText="E.g. 500,000 for business expansion"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Interest Rate (%)"
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PercentIcon color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <Tooltip title="Annual interest rate offered by the lender">
                        <InputAdornment position="end">
                          <InfoOutlinedIcon color="info" />
                        </InputAdornment>
                      </Tooltip>
                    ),
                  }}
                  sx={{
                    mb: 2,
                    background: "rgba(255,255,255,0.98)",
                    borderRadius: 2,
                  }}
                  inputProps={{ min: 5, max: 24, step: 0.1 }}
                  helperText="Typical range: 8% - 18% for professionals"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Tenure (months)"
                  type="number"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(Number(e.target.value))}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayIcon color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <Tooltip title="Total repayment period in months">
                        <InputAdornment position="end">
                          <InfoOutlinedIcon color="info" />
                        </InputAdornment>
                      </Tooltip>
                    ),
                  }}
                  sx={{
                    mb: 2,
                    background: "rgba(255,255,255,0.98)",
                    borderRadius: 2,
                  }}
                  inputProps={{ min: 12, max: 84, step: 1 }}
                  helperText="Choose between 12 to 84 months"
                />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "center", mt: 2 }}>
                <GradientButton
                  onClick={calculateEmi}
                  sx={{
                    px: 6,
                    py: 1.5,
                    fontSize: "1.1rem",
                    boxShadow: "0 2px 8px rgba(0,94,184,0.11)",
                  }}
                >
                  Calculate EMI
                </GradientButton>
              </Grid>
              {emi > 0 && (
                <>
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                  </Grid>
                  <Grid item xs={12}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          textAlign: "center",
                          mt: 3,
                          color: "#005bea",
                          fontWeight: 700,
                        }}
                      >
                        Your Monthly EMI:{" "}
                        <span style={{ color: "#00c6fb" }}>₹{emi}</span>
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          textAlign: "center",
                          mt: 1,
                          color: "#4f5b7c",
                        }}
                      >
                        *This is an estimate. Actual EMI may vary based on
                        lender policies and additional charges.
                      </Typography>
                    </motion.div>
                  </Grid>
                </>
              )}
            </Grid>
          </GlassCard>
        </Grid>
      </Grid>
    </Box>
  );
}
