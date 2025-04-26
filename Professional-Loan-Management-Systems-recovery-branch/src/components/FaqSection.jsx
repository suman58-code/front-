// src/components/FaqSection.jsx
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";

const faqs = [
  {
    title: "How do I apply for a loan?",
    desc: "You can apply online through our portal or visit any branch. The process is quick and paperless.",
  },
  {
    title: "What documents are required?",
    desc: "Basic KYC documents, proof of income, and address proof are required for most products.",
  },
  {
    title: "How is EMI calculated?",
    desc: "EMI is calculated based on the principal, interest rate, and tenure. Try our calculator above!",
  },
  {
    title: "Is online loan application secure?",
    desc: "Yes, we use advanced encryption and security protocols to protect your data and transactions.",
  },
];

export default function FaqSection() {
  return (
    <Container
      sx={{
        py: 8,
        backgroundColor: "#f9fafc",
        width: "100%",
        position: "relative",
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
            fontWeight: 800,
            mb: 6,
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
          Frequently Asked Questions
        </Typography>
      </motion.div>
      <Grid container spacing={4} justifyContent="center">
        {faqs.map((faq, index) => (
          <Grid item xs={12} md={6} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Accordion
                sx={{
                  borderRadius: "12px !important",
                  mb: 2,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                  "&:before": { display: "none" },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "#005bea" }} />}
                  aria-controls={`panel${index + 1}-content`}
                  id={`panel${index + 1}-header`}
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    "&.Mui-expanded": { borderBottom: "1px solid #e0e0e0" },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "#005bea", fontWeight: 700 }}
                  >
                    {faq.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    backgroundColor: "#f9fafc",
                    borderRadius: "0 0 12px 12px",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ color: "#444", lineHeight: 1.6 }}
                  >
                    {faq.desc}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
