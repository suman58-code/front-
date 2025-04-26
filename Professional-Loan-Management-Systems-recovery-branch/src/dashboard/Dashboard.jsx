import {
  Box,
  Container,
  CircularProgress,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardCharts from "./DashboardCharts";
import DashboardFilters from "./DashboardFilters";
import EMIDialog from "./EMIDialog";
import ApplicationsList from "./ApplicationsList";

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [statusFilter, setStatusFilter] = useState("ALL");
  
  // EMI Repayment state
  const [selectedLoanEMIs, setSelectedLoanEMIs] = useState([]);
  const [emiDialogOpen, setEmiDialogOpen] = useState(false);
  const [emiLoading, setEmiLoading] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!user.id || !user.role) {
      setError("User not logged in or invalid session");
      setLoading(false);
      toast.error("Please log in to view your dashboard");
      return;
    }
    fetchApplications();
    // eslint-disable-next-line
  }, []);

  // Fetch applications
  const fetchApplications = async () => {
    setLoading(true);
    try {
      const endpoint =
        user.role === "ADMIN"
          ? "http://localhost:8732/api/loans/all"
          : `http://localhost:8732/api/loans/user/${user.id}`;
      const response = await axios.get(endpoint);
      setApplications(Array.isArray(response.data) ? response.data : []);
      setLoading(false);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to load applications";
      setError(errorMessage);
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  // Fetch EMIs for a specific application
  const fetchEMIs = async (applicationId) => {
    setEmiLoading(true);
    setSelectedApplicationId(applicationId);
    try {
      const response = await axios.get(
        `http://localhost:8732/api/loans/emi/${applicationId}`
      );
      setSelectedLoanEMIs(response.data || []);
      setEmiDialogOpen(true);
    } catch (error) {
      toast.error("Failed to load EMI details");
      setSelectedLoanEMIs([]);
    } finally {
      setEmiLoading(false);
    }
  };

  // Handle EMI payment
  const handlePayEmi = async (repaymentId, applicationId) => {
    try {
      await axios.post(
        `http://localhost:8732/api/loans/emi/pay/${repaymentId}`
      );
      toast.success("EMI payment successful!");
      fetchEMIs(applicationId);
    } catch (error) {
      toast.error("Failed to process EMI payment");
    }
  };

  // Filter applications based on search and status filter
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.purpose?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (error) {
    return (
      <Container>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Container>
    );
  }

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

        <DashboardFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          filterAnchorEl={filterAnchorEl}
          setFilterAnchorEl={setFilterAnchorEl}
        />

        <DashboardCharts applications={applications} />

        <Box sx={{ mt: 4 }}>
          <ApplicationsList
            applications={filteredApplications}
            onViewEMI={fetchEMIs}
            userRole={user.role}
          />
        </Box>

        <EMIDialog
          open={emiDialogOpen}
          onClose={() => setEmiDialogOpen(false)}
          selectedLoanEMIs={selectedLoanEMIs}
          loading={emiLoading}
          onPayEmi={handlePayEmi}
          applicationId={selectedApplicationId}
        />

        <ToastContainer position="bottom-right" />
      </Box>
    </Container>
  );
}

export default Dashboard;
