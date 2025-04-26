// src/components/EligibilitySection.jsx
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import DescriptionIcon from "@mui/icons-material/Description";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import {
  Box,
  Container,
  Grid,
  ListItemIcon,
  Tooltip,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { GlassCard } from "./StyledComponents";

const eligibility = [
  {
    icon: <BusinessCenterIcon color="primary" />,
    text: "Business/Professional Background",
    tip: "Applicant must be a self-employed professional or business owner.",
  },
  {
    icon: <AssignmentIndIcon color="primary" />,
    text: "Age 25 to 65 years",
    tip: "Applicant should be within the specified age range at loan maturity.",
  },
  {
    icon: <AccountBalanceIcon color="primary" />,
    text: "Minimum Annual Turnover",
    tip: "Business should have a minimum turnover as per bank policy.",
  },
  {
    icon: <CreditScoreIcon color="primary" />,
    text: "Good Credit Score",
    tip: "A healthy credit score (usually 700+) is required for approval.",
  },
  {
    icon: <DescriptionIcon color="primary" />,
    text: "Valid Financial Documents",
    tip: "Latest ITR, Balance Sheet, Profit & Loss Statement, and Bank Statements.",
  },
  {
    icon: <VerifiedUserIcon color="primary" />,
    text: "Indian Citizenship",
    tip: "Applicant must be an Indian citizen with valid KYC documents.",
  },
];

export default function EligibilitySection() {
  return (
    <Container
      sx={{
        py: 8,
        background: "linear-gradient(120deg, #f8fafc 60%, #e3f0ff 100%)",
        width: "100%",
        position: "relative",
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
            mb: 6,
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
          Professional Loan Eligibility Criteria
        </Typography>
        <Typography
          align="center"
          sx={{
            color: "#4f5b7c",
            mb: 6,
            fontSize: { xs: "1rem", md: "1.15rem" },
            maxWidth: 600,
            mx: "auto",
          }}
        >
          To qualify for a professional loan, applicants must meet the following
          criteria. These ensure responsible lending and help you access the
          right financial support for your business or practice.
        </Typography>
      </motion.div>
      <Grid container spacing={4} justifyContent="center">
        {eligibility.map((item, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 200,
                  boxShadow: "0 4px 24px rgba(0,94,184,0.09)",
                  background: "rgba(255,255,255,0.85)",
                  transition: "box-shadow 0.3s",
                  "&:hover": {
                    boxShadow: "0 8px 32px 0 rgba(0,94,184,0.15)",
                  },
                }}
              >
                <Tooltip title={item.tip} arrow>
                  <Box>
                    <ListItemIcon
                      sx={{
                        justifyContent: "center",
                        mb: 2,
                        "& svg": { fontSize: "2.7rem" },
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                  </Box>
                </Tooltip>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    color: "#005bea",
                    fontSize: "1.13rem",
                  }}
                >
                  {item.text}
                </Typography>
              </GlassCard>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
