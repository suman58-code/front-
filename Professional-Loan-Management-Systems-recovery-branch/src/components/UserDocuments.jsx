import {
  Delete as DeleteIcon,
  Download as DownloadIcon,
  PictureAsPdf,
  Upload as UploadIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DOCUMENT_TYPES = [
  { value: "AADHAR", label: "Aadhar" },
  { value: "PAN", label: "PAN" },
  { value: "BANK_STATEMENT", label: "Bank Statement" },
  { value: "SALARY_SLIP", label: "Salary Slip" },
  { value: "OTHER", label: "Other" },
];

export default function UserDocuments({ userId }) {
  const [file, setFile] = useState(null);
  const [docType, setDocType] = useState("");
  const [uploading, setUploading] = useState(false);
  const [userDocs, setUserDocs] = useState([]);
  const [docsLoadingUser, setDocsLoadingUser] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [docToDelete, setDocToDelete] = useState(null);

  // Fetch user's documents
  const fetchUserDocs = async () => {
    if (!userId) return;
    setDocsLoadingUser(true);
    try {
      const response = await axios.get(
        `http://localhost:8732/api/documents/user/${userId}`
      );
      setUserDocs(response.data || []);
    } catch (e) {
      setUserDocs([]);
      toast.error("Failed to load your documents");
    } finally {
      setDocsLoadingUser(false);
    }
  };

  // Upload document handler
  const handleUpload = async () => {
    if (!file || !docType) {
      toast.error("Please select a file and document type");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File must be under 5MB");
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userId);
      formData.append("documentType", docType);

      await axios.post("http://localhost:8732/api/documents/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Document uploaded successfully!");
      setFile(null);
      setDocType("");
      fetchUserDocs();
    } catch (e) {
      toast.error(e.response?.data || "Failed to upload document");
    } finally {
      setUploading(false);
    }
  };

  // Delete document handler
  const handleDelete = async () => {
    if (!docToDelete) return;
    try {
      await axios.delete(
        `http://localhost:8732/api/documents/${docToDelete.documentId}`
      );
      toast.success("Document deleted!");
      setDeleteDialogOpen(false);
      setDocToDelete(null);
      fetchUserDocs();
    } catch (e) {
      toast.error("Failed to delete document");
    }
  };

  useEffect(() => {
    if (userId) fetchUserDocs();
    // eslint-disable-next-line
  }, [userId]);

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        background: "linear-gradient(120deg, #f5f7fa 0%, #c3cfe2 100%)",
        boxShadow: 4,
        mb: 4,
        maxWidth: 800,
        mx: "auto",
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: 700, mb: 2, color: "#2d3748" }}
      >
        Document Hub
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="center"
        mb={3}
      >
        <input
          accept="application/pdf"
          style={{ display: "none" }}
          id="upload-file"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="upload-file">
          <Button
            variant="outlined"
            component="span"
            startIcon={<PictureAsPdf />}
            sx={{ borderRadius: 2 }}
          >
            Choose PDF
          </Button>
        </label>
        <Box sx={{ minWidth: 180 }}>
          <select
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              width: "100%",
              fontSize: "1rem",
            }}
          >
            <option value="">Select Document Type</option>
            {DOCUMENT_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </Box>
        <Button
          variant="contained"
          color="primary"
          disabled={uploading}
          onClick={handleUpload}
          startIcon={<UploadIcon />}
          sx={{ borderRadius: 2 }}
        >
          {uploading ? "Uploading..." : "Upload"}
        </Button>
        {file && (
          <Typography variant="body2" sx={{ ml: 2 }}>
            {file.name}
          </Typography>
        )}
      </Stack>
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
        My Documents
      </Typography>
      {docsLoadingUser ? (
        <CircularProgress />
      ) : userDocs.length === 0 ? (
        <Typography color="text.secondary">
          No documents uploaded yet.
        </Typography>
      ) : (
        <Stack spacing={2}>
          {userDocs.map((doc) => (
            <Paper
              key={doc.documentId}
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 2,
                background: "#fff",
                boxShadow: 1,
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <PictureAsPdf color="error" fontSize="large" />
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
                    {doc.fileName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {doc.fileType}
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Tooltip title="View">
                  <IconButton
                    color="primary"
                    href={`http://localhost:8732/api/documents/view/${doc.documentId}`}
                    target="_blank"
                  >
                    <ViewIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Download">
                  <IconButton
                    color="success"
                    href={`http://localhost:8732/api/documents/download/${doc.documentId}`}
                    target="_blank"
                  >
                    <DownloadIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    color="error"
                    onClick={() => {
                      setDocToDelete(doc);
                      setDeleteDialogOpen(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Document</DialogTitle>
        <DialogContent>
          Are you sure you want to delete <b>{docToDelete?.fileName}</b>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
