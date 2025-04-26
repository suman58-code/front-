import { CssBaseline } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import CreditScoreCheck from "./pages/CreditScoreCheck.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import LoanApplication from "./pages/LoanApplication.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import FooterSection from "./components/FooterSection.jsx";
import UserDocuments from "./components/UserDocuments";

function App() {
  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/credit-score" element={<CreditScoreCheck />} />
        <Route
          path="/apply-loan"
          element={
            <ProtectedRoute roleRequired="USER">
              <LoanApplication />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/documents"
          element={
            <ProtectedRoute>
              <UserDocuments userId={JSON.parse(localStorage.getItem("user") || "{}").id} />
            </ProtectedRoute>
          }
        />
      </Routes>
      <FooterSection />
      <ToastContainer />
    </Router>
  );
}

export default App;
