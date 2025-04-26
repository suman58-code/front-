import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { CheckCircle, Close as CloseIcon } from "@mui/icons-material";

const EMIDialog = ({
  open,
  onClose,
  selectedLoanEMIs,
  loading,
  onPayEmi,
  applicationId,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        EMI Repayment Schedule
        <Button
          onClick={onClose}
          color="inherit"
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </Button>
      </DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : selectedLoanEMIs.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>EMI Number</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedLoanEMIs.map((emi) => (
                  <TableRow key={emi.id}>
                    <TableCell>{emi.emiNumber}</TableCell>
                    <TableCell>
                      {new Date(emi.dueDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>₹{emi.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      {emi.status === "PAID" ? (
                        <Typography color="success.main" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <CheckCircle fontSize="small" /> Paid
                        </Typography>
                      ) : (
                        "Pending"
                      )}
                    </TableCell>
                    <TableCell>
                      {emi.status !== "PAID" && (
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => onPayEmi(emi.id, applicationId)}
                        >
                          Pay Now
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography>No EMI records found.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EMIDialog; 