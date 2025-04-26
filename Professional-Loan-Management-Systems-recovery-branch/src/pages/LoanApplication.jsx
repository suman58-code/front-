import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Snackbar,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Briefcase,
  CurrencyDollar,
  FileText,
  IdentificationCard,
  Info,
  Upload,
  User,
  X,
} from "@phosphor-icons/react";
import axios from "axios";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function hashCode(str) {
  let hash = 0;
  str = str.toUpperCase();
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

function getCreditScoreFromPan(pan) {
  if (!pan || pan.length < 5) return "";
  return 300 + (hashCode(pan) % 601);
}

const steps = ["Personal Info", "Loan Details", "Documents", "Review & Submit"];

const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

function LoanApplication() {
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    purpose: "",
    loanAmount: "",
    panCard: "",
    tenureInMonths: "", // <-- tenure field added
  });
  const [files, setFiles] = useState({
    pfAccountPdf: null,
    salarySlip: null,
  });
  const [activeField, setActiveField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPDF, setShowPDF] = useState({
    pfAccountPdf: false,
    salarySlip: false,
  });
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const fileInputRefs = {
    pfAccountPdf: useRef(null),
    salarySlip: useRef(null),
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Field validation
  const validateStep = () => {
    if (step === 0) {
      if (!formData.name.trim()) return "Name is required";
      if (!formData.profession.trim()) return "Profession is required";
    }
    if (step === 1) {
      if (!formData.purpose.trim()) return "Purpose is required";
      if (
        !formData.loanAmount ||
        isNaN(formData.loanAmount) ||
        Number(formData.loanAmount) < 1000
      )
        return "Loan amount must be at least ₹1,000";
      if (!formData.panCard.trim()) return "PAN card is required";
      if (!panRegex.test(formData.panCard))
        return "Enter a valid PAN card (e.g. ABCDE1234F)";
      if (
        !formData.tenureInMonths ||
        isNaN(formData.tenureInMonths) ||
        Number(formData.tenureInMonths) < 1
      )
        return "Please enter a valid loan tenure (in months)";
    }
    if (step === 2) {
      if (!files.pfAccountPdf) return "PF Account Statement PDF is required";
      if (!files.salarySlip) return "Salary Slip PDF is required";
    }
    return "";
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "panCard") value = value.toUpperCase();
    setFormData({ ...formData, [name]: value });
  };

  const handleFocus = (fieldName) => setActiveField(fieldName);
  const handleBlur = () => setActiveField(null);

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles && selectedFiles[0]) {
      setFiles({ ...files, [name]: selectedFiles[0] });
    }
  };

  const removeFile = (fileType) => {
    setFiles({ ...files, [fileType]: null });
    if (fileInputRefs[fileType].current) {
      fileInputRefs[fileType].current.value = "";
    }
  };

  const handleNext = () => {
    const err = validateStep();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setStep(step + 1);
  };

  const handleBack = () => {
    setError("");
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validateStep();
    if (err) {
      setError(err);
      return;
    }
    if (!user.id) {
      setError("Please log in to apply for a loan");
      navigate("/login");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    data.append("userId", user.id);
    if (files.pfAccountPdf) data.append("pfAccountPdf", files.pfAccountPdf);
    if (files.salarySlip) data.append("salarySlip", files.salarySlip);

    try {
      await axios.post("http://localhost:8732/api/loans/apply", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("Application submitted successfully!");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Application failed");
    } finally {
      setLoading(false);
    }
  };

  // PDF preview
  const renderPDFPreview = (file) => {
    if (!file) return null;
    const url = URL.createObjectURL(file);
    return (
      <Paper elevation={3} sx={{ mt: 2, p: 1, borderRadius: 2 }}>
        <iframe
          src={url}
          title="PDF Preview"
          width="100%"
          height={isMobile ? "200px" : "350px"}
          style={{ border: "none" }}
        />
      </Paper>
    );
  };

  // Stepper content
  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Tooltip title="Enter your full legal name" arrow>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus("name")}
                  onBlur={handleBlur}
                  variant="outlined"
                  required
                  InputProps={{
                    startAdornment: (
                      <User
                        size={20}
                        color={activeField === "name" ? "#4361ee" : "#64748b"}
                        style={{ marginRight: 12 }}
                      />
                    ),
                  }}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12} md={6}>
              <Tooltip title="Your current profession or occupation" arrow>
                <TextField
                  fullWidth
                  label="Profession"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  onFocus={() => handleFocus("profession")}
                  onBlur={handleBlur}
                  variant="outlined"
                  required
                  InputProps={{
                    startAdornment: (
                      <Briefcase
                        size={20}
                        color={
                          activeField === "profession" ? "#4361ee" : "#64748b"
                        }
                        style={{ marginRight: 12 }}
                      />
                    ),
                  }}
                />
              </Tooltip>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Tooltip title="Purpose for which you are taking the loan" arrow>
                <TextField
                  fullWidth
                  label="Loan Purpose"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  onFocus={() => handleFocus("purpose")}
                  onBlur={handleBlur}
                  variant="outlined"
                  required
                  InputProps={{
                    startAdornment: (
                      <FileText
                        size={20}
                        color={
                          activeField === "purpose" ? "#4361ee" : "#64748b"
                        }
                        style={{ marginRight: 12 }}
                      />
                    ),
                  }}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12} md={6}>
              <Tooltip title="Enter your PAN card (e.g. ABCDE1234F)" arrow>
                <TextField
                  fullWidth
                  label="PAN Card"
                  name="panCard"
                  value={formData.panCard}
                  onChange={handleChange}
                  onFocus={() => handleFocus("panCard")}
                  onBlur={handleBlur}
                  variant="outlined"
                  inputProps={{
                    maxLength: 10,
                    style: { textTransform: "uppercase" },
                  }}
                  required
                  InputProps={{
                    startAdornment: (
                      <IdentificationCard
                        size={20}
                        color={
                          activeField === "panCard" ? "#4361ee" : "#64748b"
                        }
                        style={{ marginRight: 12 }}
                      />
                    ),
                  }}
                  error={!!formData.panCard && !panRegex.test(formData.panCard)}
                  helperText={
                    formData.panCard && !panRegex.test(formData.panCard)
                      ? "PAN must be in format ABCDE1234F"
                      : " "
                  }
                />
              </Tooltip>
              {formData.panCard && formData.panCard.length >= 5 && (
                <Box sx={{ mt: 1 }}>
                  <Chip
                    label={`Credit Score: ${getCreditScoreFromPan(
                      formData.panCard
                    )}`}
                    size="medium"
                    color={
                      getCreditScoreFromPan(formData.panCard) >= 600
                        ? "success"
                        : "error"
                    }
                    icon={<Info />}
                    sx={{
                      borderRadius: 2,
                      fontWeight: 500,
                      fontSize: "1rem",
                      px: 2,
                      py: 1,
                    }}
                  />
                </Box>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Tooltip
                title="Select your desired loan tenure in months (e.g. 12, 24, 36)"
                arrow
              >
                <TextField
                  fullWidth
                  label="Loan Tenure (Months)"
                  name="tenureInMonths"
                  type="number"
                  value={formData.tenureInMonths}
                  onChange={handleChange}
                  onFocus={() => handleFocus("tenureInMonths")}
                  onBlur={handleBlur}
                  variant="outlined"
                  required
                  InputProps={{
                    inputProps: { min: 1, max: 120 },
                  }}
                  error={
                    !!formData.tenureInMonths &&
                    Number(formData.tenureInMonths) < 1
                  }
                  helperText={
                    !!formData.tenureInMonths &&
                    Number(formData.tenureInMonths) < 1
                      ? "Tenure must be at least 1 month"
                      : " "
                  }
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12}>
              <Tooltip
                title="Enter the amount you wish to borrow (minimum ₹1,000)"
                arrow
              >
                <TextField
                  fullWidth
                  label="Loan Amount (₹)"
                  name="loanAmount"
                  type="number"
                  value={formData.loanAmount}
                  onChange={handleChange}
                  onFocus={() => handleFocus("loanAmount")}
                  onBlur={handleBlur}
                  variant="outlined"
                  required
                  InputProps={{
                    startAdornment: (
                      <CurrencyDollar
                        size={20}
                        color={
                          activeField === "loanAmount" ? "#4361ee" : "#64748b"
                        }
                        style={{ marginRight: 12 }}
                      />
                    ),
                    inputProps: { min: 1000 },
                  }}
                  error={
                    !!formData.loanAmount && Number(formData.loanAmount) < 1000
                  }
                  helperText={
                    !!formData.loanAmount && Number(formData.loanAmount) < 1000
                      ? "Minimum loan amount is ₹1,000"
                      : " "
                  }
                />
              </Tooltip>
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Tooltip
                title="Upload your latest PF Account Statement (PDF, max 5MB)"
                arrow
              >
                <Box
                  onClick={() => fileInputRefs.pfAccountPdf.current?.click()}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: files.pfAccountPdf
                      ? "2px solid #10b981"
                      : "2px dashed #94a3b8",
                    backgroundColor: files.pfAccountPdf
                      ? "rgba(16, 185, 129, 0.05)"
                      : "rgba(241, 245, 249, 0.5)",
                    cursor: "pointer",
                    position: "relative",
                  }}
                >
                  <input
                    type="file"
                    name="pfAccountPdf"
                    accept=".pdf"
                    onChange={handleFileChange}
                    ref={fileInputRefs.pfAccountPdf}
                    style={{ display: "none" }}
                    required={!files.pfAccountPdf}
                  />
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: files.pfAccountPdf
                          ? "rgba(16, 185, 129, 0.1)"
                          : "rgba(99, 102, 241, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Upload
                        size={24}
                        color={files.pfAccountPdf ? "#10b981" : "#6366f1"}
                      />
                    </Box>
                    <Box>
                      <Typography variant="body1" fontWeight={500}>
                        PF Account Statement
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {files.pfAccountPdf
                          ? files.pfAccountPdf.name
                          : "PDF file (max 5MB)"}
                      </Typography>
                    </Box>
                  </Stack>
                  {files.pfAccountPdf && (
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile("pfAccountPdf");
                      }}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        color: "error.main",
                      }}
                    >
                      <X size={20} />
                    </IconButton>
                  )}
                  {files.pfAccountPdf && (
                    <Button
                      size="small"
                      sx={{ mt: 1 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowPDF({
                          ...showPDF,
                          pfAccountPdf: !showPDF.pfAccountPdf,
                        });
                      }}
                    >
                      {showPDF.pfAccountPdf ? "Hide Preview" : "Preview"}
                    </Button>
                  )}
                  {showPDF.pfAccountPdf && renderPDFPreview(files.pfAccountPdf)}
                </Box>
              </Tooltip>
            </Grid>
            <Grid item xs={12} md={6}>
              <Tooltip
                title="Upload your latest Salary Slip (PDF, max 5MB)"
                arrow
              >
                <Box
                  onClick={() => fileInputRefs.salarySlip.current?.click()}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: files.salarySlip
                      ? "2px solid #10b981"
                      : "2px dashed #94a3b8",
                    backgroundColor: files.salarySlip
                      ? "rgba(16, 185, 129, 0.05)"
                      : "rgba(241, 245, 249, 0.5)",
                    cursor: "pointer",
                    position: "relative",
                  }}
                >
                  <input
                    type="file"
                    name="salarySlip"
                    accept=".pdf"
                    onChange={handleFileChange}
                    ref={fileInputRefs.salarySlip}
                    style={{ display: "none" }}
                    required={!files.salarySlip}
                  />
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: files.salarySlip
                          ? "rgba(16, 185, 129, 0.1)"
                          : "rgba(99, 102, 241, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Upload
                        size={24}
                        color={files.salarySlip ? "#10b981" : "#6366f1"}
                      />
                    </Box>
                    <Box>
                      <Typography variant="body1" fontWeight={500}>
                        Salary Slip
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {files.salarySlip
                          ? files.salarySlip.name
                          : "PDF file (max 5MB)"}
                      </Typography>
                    </Box>
                  </Stack>
                  {files.salarySlip && (
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile("salarySlip");
                      }}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        color: "error.main",
                      }}
                    >
                      <X size={20} />
                    </IconButton>
                  )}
                  {files.salarySlip && (
                    <Button
                      size="small"
                      sx={{ mt: 1 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowPDF({
                          ...showPDF,
                          salarySlip: !showPDF.salarySlip,
                        });
                      }}
                    >
                      {showPDF.salarySlip ? "Hide Preview" : "Preview"}
                    </Button>
                  )}
                  {showPDF.salarySlip && renderPDFPreview(files.salarySlip)}
                </Box>
              </Tooltip>
            </Grid>
          </Grid>
        );
      case 3:
        // Review & Submit step
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Review Your Application
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography>
                  <b>Name:</b> {formData.name}
                </Typography>
                <Typography>
                  <b>Profession:</b> {formData.profession}
                </Typography>
                <Typography>
                  <b>PAN Card:</b> {formData.panCard}
                </Typography>
                <Typography>
                  <b>Credit Score:</b>{" "}
                  <Chip
                    label={getCreditScoreFromPan(formData.panCard)}
                    color={
                      getCreditScoreFromPan(formData.panCard) >= 600
                        ? "success"
                        : "error"
                    }
                    size="small"
                  />
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography>
                  <b>Purpose:</b> {formData.purpose}
                </Typography>
                <Typography>
                  <b>Loan Amount:</b> ₹{formData.loanAmount}
                </Typography>
                <Typography>
                  <b>Loan Tenure:</b> {formData.tenureInMonths} months
                </Typography>
                <Typography>
                  <b>PF Account PDF:</b>{" "}
                  {files.pfAccountPdf
                    ? files.pfAccountPdf.name
                    : "Not uploaded"}
                </Typography>
                <Typography>
                  <b>Salary Slip:</b>{" "}
                  {files.salarySlip ? files.salarySlip.name : "Not uploaded"}
                </Typography>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
              <Alert severity="info">
                Please verify all details before submitting. Once submitted, you
                cannot edit this application.
              </Alert>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  if (!user.id) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background:
            "radial-gradient(circle at center, #f0f4ff 0%, #d6e3ff 100%)",
        }}
      >
        <Box
          sx={{
            p: 6,
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(20px)",
            borderRadius: 4,
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            maxWidth: 500,
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
            Authentication Required
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
            Please sign in to access the loan application portal
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/login")}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              background: "linear-gradient(90deg, #4361ee 0%, #3a0ca3 100%)",
              textTransform: "none",
              fontSize: "1rem",
            }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #f8f9ff 0%, #e6ecff 100%)",
        py: 8,
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(16px)",
              borderRadius: 4,
              boxShadow: "0 16px 40px rgba(0, 0, 0, 0.08)",
              p: { xs: 3, md: 5 },
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ mb: 4 }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <FileText size={28} weight="fill" />
              </Box>
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    background:
                      "linear-gradient(90deg, #4361ee 0%, #3a0ca3 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Loan Application
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Complete your application in just a few steps
                </Typography>
              </Box>
            </Stack>

            <Stepper activeStep={step} alternativeLabel sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <form onSubmit={handleSubmit}>
              {getStepContent(step)}

              {/* Error/Success Banners */}
              <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={() => setError("")}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert
                  severity="error"
                  onClose={() => setError("")}
                  variant="filled"
                >
                  {error}
                </Alert>
              </Snackbar>
              <Snackbar
                open={!!success}
                autoHideDuration={4000}
                onClose={() => setSuccess("")}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert
                  severity="success"
                  onClose={() => setSuccess("")}
                  variant="filled"
                >
                  {success}
                </Alert>
              </Snackbar>

              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {step > 0 && (
                  <Button
                    variant="outlined"
                    onClick={handleBack}
                    disabled={loading}
                  >
                    Back
                  </Button>
                )}
                {step < steps.length - 1 && (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={loading}
                    sx={{
                      background:
                        "linear-gradient(90deg, #4361ee 0%, #3a0ca3 100%)",
                      fontWeight: 600,
                    }}
                  >
                    Next
                  </Button>
                )}
                {step === steps.length - 1 && (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                      background:
                        "linear-gradient(90deg, #4361ee 0%, #3a0ca3 100%)",
                      fontWeight: 600,
                    }}
                  >
                    {loading ? (
                      <>
                        <CircularProgress
                          size={24}
                          color="inherit"
                          sx={{ mr: 2 }}
                        />
                        Processing...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                )}
              </Box>
              {loading && <LinearProgress sx={{ mt: 2 }} />}
            </form>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

export default LoanApplication;
