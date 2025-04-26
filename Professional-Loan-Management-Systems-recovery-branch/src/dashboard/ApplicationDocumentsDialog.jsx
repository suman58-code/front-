import {
  Close as CloseIcon,
  Download as DownloadIcon,
  PictureAsPdf,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip as MuiTooltip,
  Stack,
  Typography,
} from "@mui/material";

function ApplicationDocumentsDialog({
  open,
  onClose,
  docsLoading,
  selectedDocs,
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Stack direction="row" alignItems="center" spacing={1}>
          <PictureAsPdf color="error" />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Application Documents
          </Typography>
        </Stack>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {docsLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        ) : selectedDocs.length === 0 ? (
          <Typography>No documents found.</Typography>
        ) : (
          selectedDocs.map((doc, idx) => (
            <Box
              key={doc.downloadUrl || idx}
              sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}
            >
              <PictureAsPdf color="error" sx={{ fontSize: 32 }} />
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 600 }}>
                  {doc.fileName || doc.documentType || "PDF Document"}
                  <Chip
                    label={doc.documentType}
                    size="small"
                    color="info"
                    sx={{ ml: 1, fontWeight: 500 }}
                  />
                </Typography>
              </Box>
              <MuiTooltip title="Open PDF in new tab" arrow>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ mr: 1, borderRadius: 2 }}
                  onClick={() =>
                    window.open(
                      `http://localhost:8732${doc.downloadUrl}`,
                      "_blank"
                    )
                  }
                >
                  View
                </Button>
              </MuiTooltip>
              <MuiTooltip title="Download PDF" arrow>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  sx={{ borderRadius: 2 }}
                  href={`http://localhost:8732${doc.downloadUrl}`}
                  target="_blank"
                  startIcon={<DownloadIcon />}
                >
                  Download
                </Button>
              </MuiTooltip>
            </Box>
          ))
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ borderRadius: 2 }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ApplicationDocumentsDialog;
