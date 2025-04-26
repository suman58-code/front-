import React from "react";
import {
  Paper,
  Box,
  Typography,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Fade,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  alpha,
  useTheme,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import {
  AttachMoney,
  Home,
  Score,
  Work,
  PictureAsPdf,
} from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import ApplicationCard from "../dashboard/ApplicationCard";

const statusOptions = [
  { value: "", label: "All Statuses" },
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "DISBURSED", label: "Disbursed" },
  { value: "REJECTED", label: "Rejected" },
  { value: "CLOSED", label: "Closed" },
];

function ApplicationsList({
  applications,
  loading,
  error,
  user,
  onFetchDocuments,
  onFetchEMIs,
  setStatusFilter,
  statusFilter,
  setSearchQuery,
  searchQuery,
  onApprove = () => {},
  onReject = () => {},
  loadingAction,
  onViewEMI,
  userRole,
}) {
  const theme = useTheme();

  // Status update handler (admin)
  const handleStatusUpdate = async (applicationId, status) => {
    try {
      await axios.put(
        `http://localhost:8732/api/loans/update-status/${applicationId}`,
        null,
        { params: { status: status.toUpperCase() } }
      );
      toast.success(`Application ${status.toLowerCase()}!`);
      window.location.reload(); // Refresh the page to update the list
    } catch (error) {
      toast.error(error.response?.data?.message || "Status update failed");
    }
  };

  // Disburse loan (admin)
  const handleDisburse = async (applicationId) => {
    try {
      const application = applications.find(
        (app) => app.applicationId === applicationId
      );
      await axios.post(
        `http://localhost:8732/api/loans/disburse/${applicationId}`,
        null,
        { params: { amount: application.loanAmount } }
      );
      toast.success("Loan disbursed!");
      window.location.reload(); // Refresh the page to update the list
    } catch (error) {
      toast.error(error.response?.data?.message || "Disbursement failed");
    }
  };

  return (
    <Paper
      sx={{
        p: { xs: 2, md: 4 },
        borderRadius: 4,
        mb: 4,
        background: "rgba(255, 255, 255, 0.90)",
        boxShadow: 6,
        backdropFilter: "blur(4px)",
      }}
      elevation={0}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", md: "center" },
          gap: 2,
          mb: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
          Loan Applications
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search by name or purpose"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              "aria-label": "search applications",
            }}
            sx={{ minWidth: 180, background: "#f5f7fa", borderRadius: 2 }}
          />
          <TextField
            size="small"
            select
            variant="outlined"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FilterListIcon color="action" />
                </InputAdornment>
              ),
              "aria-label": "filter by status",
            }}
            sx={{ minWidth: 160, background: "#f5f7fa", borderRadius: 2 }}
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>
      {!loading && !error && applications.length > 0 && (
        <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
          {applications.length} application{applications.length > 1 ? "s" : ""} found
        </Typography>
      )}
      {loading ? (
        <Fade in>
          <Grid container spacing={3}>
            {[...Array(3)].map((_, idx) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                <Skeleton height={220} />
              </Grid>
            ))}
          </Grid>
        </Fade>
      ) : error ? (
        <Box sx={{ textAlign: "center", p: 6 }}>
          <ErrorOutlineIcon color="error" sx={{ fontSize: 48, mb: 2 }} />
          <Typography color="error" variant="h6">
            {error}
          </Typography>
        </Box>
      ) : applications.length === 0 ? (
        <Box sx={{ p: 8, textAlign: "center", borderRadius: 2 }}>
          <SentimentDissatisfiedIcon
            color="disabled"
            sx={{ fontSize: 56, mb: 1 }}
          />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No applications found
          </Typography>
        </Box>
      ) : (
        <Fade in>
          <Grid container spacing={3}>
            <AnimatePresence>
              {applications.map((app) => (
                <Grid item xs={12} sm={6} md={4} key={app.applicationId}>
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card
                      sx={{
                        borderRadius: 3,
                        height: "100%",
                        borderLeft: `4px solid ${
                          app.status === "APPROVED"
                            ? theme.palette.success.main
                            : app.status === "REJECTED"
                            ? theme.palette.error.main
                            : app.status === "DISBURSED"
                            ? theme.palette.primary.main
                            : theme.palette.warning.main
                        }`,
                        boxShadow: theme.shadows[1],
                        transition: "all 0.3s ease",
                        "&:hover": {
                          boxShadow: theme.shadows[4],
                        },
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: 600,
                              color: theme.palette.text.primary,
                            }}
                          >
                            {app.name}
                          </Typography>
                          <Chip
                            label={app.status}
                            size="small"
                            sx={{
                              borderRadius: 2,
                              fontWeight: 500,
                              backgroundColor:
                                app.status === "APPROVED"
                                  ? alpha(theme.palette.success.main, 0.1)
                                  : app.status === "REJECTED"
                                  ? alpha(theme.palette.error.main, 0.1)
                                  : app.status === "DISBURSED"
                                  ? alpha(theme.palette.primary.main, 0.1)
                                  : alpha(theme.palette.warning.main, 0.1),
                              color:
                                app.status === "APPROVED"
                                  ? theme.palette.success.main
                                  : app.status === "REJECTED"
                                  ? theme.palette.error.main
                                  : app.status === "DISBURSED"
                                  ? theme.palette.primary.main
                                  : theme.palette.warning.main,
                            }}
                          />
                        </Box>

                        <Stack spacing={1.5} sx={{ mb: 2 }}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Work
                              sx={{
                                mr: 1,
                                color: theme.palette.text.secondary,
                                fontSize: 20,
                              }}
                            />
                            <Typography variant="body2">{app.profession}</Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Home
                              sx={{
                                mr: 1,
                                color: theme.palette.text.secondary,
                                fontSize: 20,
                              }}
                            />
                            <Typography variant="body2">{app.purpose}</Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <AttachMoney
                              sx={{
                                mr: 1,
                                color: theme.palette.text.secondary,
                                fontSize: 20,
                              }}
                            />
                            <Typography variant="body2">
                              ₹{Number(app.loanAmount).toLocaleString()}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Score
                              sx={{
                                mr: 1,
                                color: theme.palette.text.secondary,
                                fontSize: 20,
                              }}
                            />
                            <Typography variant="body2">
                              Credit Score: {app.creditScore}
                            </Typography>
                          </Box>
                        </Stack>

                        {/* Admin actions */}
                        {userRole === "ADMIN" && (
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 1,
                              mt: 2,
                            }}
                          >
                            <Button
                              variant="outlined"
                              startIcon={<PictureAsPdf />}
                              onClick={() => {
                                // Handle document view
                              }}
                              sx={{
                                borderRadius: 2,
                                textTransform: "none",
                                mb: 1,
                                background:
                                  "linear-gradient(90deg, #f8fafc 0%, #e0e7ef 100%)",
                              }}
                              color="secondary"
                            >
                              View Documents
                            </Button>
                            {app.status === "PENDING" && (
                              <Box sx={{ display: "flex", gap: 1 }}>
                                <Button
                                  variant="contained"
                                  color="success"
                                  size="small"
                                  onClick={() =>
                                    handleStatusUpdate(app.applicationId, "APPROVED")
                                  }
                                  sx={{
                                    borderRadius: 2,
                                    flex: 1,
                                    textTransform: "none",
                                  }}
                                >
                                  Approve
                                </Button>
                                <Button
                                  variant="outlined"
                                  color="error"
                                  size="small"
                                  onClick={() =>
                                    handleStatusUpdate(app.applicationId, "REJECTED")
                                  }
                                  sx={{
                                    borderRadius: 2,
                                    flex: 1,
                                    textTransform: "none",
                                  }}
                                >
                                  Reject
                                </Button>
                              </Box>
                            )}
                            {app.status === "APPROVED" && (
                              <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={() => handleDisburse(app.applicationId)}
                                sx={{
                                  borderRadius: 2,
                                  width: "100%",
                                  textTransform: "none",
                                }}
                              >
                                Disburse Loan
                              </Button>
                            )}
                          </Box>
                        )}

                        {/* User EMI button */}
                        {userRole !== "ADMIN" && app.status === "DISBURSED" && (
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            sx={{ borderRadius: 2, mt: 1 }}
                            onClick={() => onViewEMI(app.applicationId)}
                          >
                            View/Pay EMIs
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </AnimatePresence>
          </Grid>
        </Fade>
      )}
    </Paper>
  );
}

export default ApplicationsList;
