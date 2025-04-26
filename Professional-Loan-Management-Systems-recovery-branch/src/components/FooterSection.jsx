// src/components/FooterSection.jsx
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Link as MuiLink,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { FooterBg } from "./StyledComponents";

export default function FooterSection() {
  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        background: "linear-gradient(120deg, #005bea 60%, #00c6fb 100%)",
        color: "#fff",
        py: { xs: 6, md: 8 },
        width: "100%",
        mt: "auto",
        overflow: "hidden",
        letterSpacing: 0.2,
      }}
    >
      <FooterBg />
      <Container sx={{ position: "relative", zIndex: 2 }}>
        <Grid container spacing={6}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              sx={{ color: "#fff", fontWeight: 900, mb: 2, letterSpacing: 1 }}
            >
              Sundaram Finance
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: "#e0e8f3" }}>
              Trusted partner for professional and business loans. Empowering
              your financial journey with transparency, speed, and reliability.
            </Typography>
            <Stack direction="row" spacing={2}>
              <IconButton
                component="a"
                href="https://www.facebook.com/SundaramFinanceOfficial"
                target="_blank"
                rel="noopener"
                sx={{ color: "#fff", "&:hover": { color: "#00c6fb" } }}
                aria-label="Facebook"
              >
                <FacebookIcon fontSize="large" />
              </IconButton>
              <IconButton
                component="a"
                href="https://twitter.com/SundaramFinance"
                target="_blank"
                rel="noopener"
                sx={{ color: "#fff", "&:hover": { color: "#00c6fb" } }}
                aria-label="Twitter"
              >
                <TwitterIcon fontSize="large" />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.linkedin.com/company/sundaram-finance-limited/"
                target="_blank"
                rel="noopener"
                sx={{ color: "#fff", "&:hover": { color: "#00c6fb" } }}
                aria-label="LinkedIn"
              >
                <LinkedInIcon fontSize="large" />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.youtube.com/user/SundaramFinanceLtd"
                target="_blank"
                rel="noopener"
                sx={{ color: "#fff", "&:hover": { color: "#00c6fb" } }}
                aria-label="YouTube"
              >
                <YouTubeIcon fontSize="large" />
              </IconButton>
            </Stack>
          </Grid>
          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="subtitle1"
              sx={{ color: "#fff", fontWeight: 700, mb: 2 }}
            >
              Quick Links
            </Typography>
            <Stack spacing={1.5}>
              <MuiLink
                component={Link}
                to="/about"
                underline="hover"
                sx={footerLinkStyle}
              >
                About Us
              </MuiLink>
              <MuiLink
                component={Link}
                to="/services"
                underline="hover"
                sx={footerLinkStyle}
              >
                Services
              </MuiLink>
              <MuiLink
                component={Link}
                to="/apply-loan"
                underline="hover"
                sx={footerLinkStyle}
              >
                Apply for Loan
              </MuiLink>
              <MuiLink
                component={Link}
                to="/faq"
                underline="hover"
                sx={footerLinkStyle}
              >
                FAQ
              </MuiLink>
              <MuiLink
                component={Link}
                to="/contact"
                underline="hover"
                sx={footerLinkStyle}
              >
                Contact Us
              </MuiLink>
            </Stack>
          </Grid>
          {/* Resources */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="subtitle1"
              sx={{ color: "#fff", fontWeight: 700, mb: 2 }}
            >
              Resources
            </Typography>
            <Stack spacing={1.5}>
              <MuiLink
                href="https://www.sundaramfinance.in/investor-relations"
                target="_blank"
                underline="hover"
                sx={footerLinkStyle}
              >
                Investor Relations
              </MuiLink>
              <MuiLink
                href="https://www.sundaramfinance.in/careers"
                target="_blank"
                underline="hover"
                sx={footerLinkStyle}
              >
                Careers
              </MuiLink>
              <MuiLink
                href="https://www.sundaramfinance.in/news"
                target="_blank"
                underline="hover"
                sx={footerLinkStyle}
              >
                News & Events
              </MuiLink>
              <MuiLink
                href="https://www.sundaramfinance.in/privacy-policy"
                target="_blank"
                underline="hover"
                sx={footerLinkStyle}
              >
                Privacy Policy
              </MuiLink>
              <MuiLink
                href="https://www.sundaramfinance.in/terms"
                target="_blank"
                underline="hover"
                sx={footerLinkStyle}
              >
                Terms of Service
              </MuiLink>
            </Stack>
          </Grid>
          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="subtitle1"
              sx={{ color: "#fff", fontWeight: 700, mb: 2 }}
            >
              Contact Info
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Sundaram Finance Ltd, 21, Patullos Road, Chennai - 600002, India
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Phone:{" "}
              <MuiLink href="tel:+914423456789" sx={footerLinkStyle}>
                +91 44 2345 6789
              </MuiLink>
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Email:{" "}
              <MuiLink
                href="mailto:info@sundaramfinance.in"
                sx={footerLinkStyle}
              >
                info@sundaramfinance.in
              </MuiLink>
            </Typography>
            <Typography variant="body2" sx={{ mt: 2, color: "#cfd8e3" }}>
              CIN: L65191TN1954PLC002429
            </Typography>
          </Grid>
        </Grid>
        <Box
          sx={{
            borderTop: "1px solid rgba(255,255,255,0.15)",
            mt: 6,
            pt: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ color: "#e0e8f3" }}>
            © {new Date().getFullYear()} Sundaram Finance Ltd. All rights
            reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

const footerLinkStyle = {
  color: "#e0e8f3",
  fontWeight: 500,
  fontSize: "1rem",
  transition: "color 0.2s",
  "&:hover": {
    color: "#fff",
    textDecoration: "underline",
  },
};
