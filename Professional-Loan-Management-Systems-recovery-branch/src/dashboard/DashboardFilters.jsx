import {
  FilterList,
  Pending,
  CheckCircle,
  Cancel,
  AttachMoney,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Stack,
} from "@mui/material";

const DashboardFilters = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  filterAnchorEl,
  setFilterAnchorEl,
}) => {
  // Status filter options
  const statusFilters = [
    {
      value: "ALL",
      label: "All Statuses",
      icon: <FilterList fontSize="small" />,
    },
    {
      value: "PENDING",
      label: "Pending",
      icon: <Pending color="warning" fontSize="small" />,
    },
    {
      value: "APPROVED",
      label: "Approved",
      icon: <CheckCircle color="success" fontSize="small" />,
    },
    {
      value: "REJECTED",
      label: "Rejected",
      icon: <Cancel color="error" fontSize="small" />,
    },
    {
      value: "DISBURSED",
      label: "Disbursed",
      icon: <AttachMoney color="primary" fontSize="small" />,
    },
  ];

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    handleFilterClose();
  };

  return (
    <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by name or purpose..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        size="small"
      />
      <Button
        variant="outlined"
        startIcon={<FilterList />}
        onClick={handleFilterClick}
        size="small"
      >
        {statusFilters.find((f) => f.value === statusFilter)?.label || "Filter"}
      </Button>
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterClose}
      >
        {statusFilters.map((filter) => (
          <MenuItem
            key={filter.value}
            onClick={() => handleStatusFilterChange(filter.value)}
            selected={statusFilter === filter.value}
          >
            <ListItemIcon>{filter.icon}</ListItemIcon>
            <ListItemText>{filter.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  );
};

export default DashboardFilters; 