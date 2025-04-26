import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Box, Grid, Paper, Typography, useTheme } from "@mui/material";

const DashboardCharts = ({ applications }) => {
  const theme = useTheme();

  // Status data for pie chart
  const getStatusData = () => {
    const statusCounts = applications.reduce(
      (acc, app) => {
        acc[app.status] = (acc[app.status] || 0) + 1;
        return acc;
      },
      { PENDING: 0, APPROVED: 0, REJECTED: 0, DISBURSED: 0 }
    );
    return [
      {
        name: "Pending",
        value: statusCounts.PENDING,
        color: theme.palette.warning.main,
      },
      {
        name: "Approved",
        value: statusCounts.APPROVED,
        color: theme.palette.success.main,
      },
      {
        name: "Rejected",
        value: statusCounts.REJECTED,
        color: theme.palette.error.main,
      },
      {
        name: "Disbursed",
        value: statusCounts.DISBURSED,
        color: theme.palette.primary.main,
      },
    ].filter((item) => item.value > 0);
  };

  // Monthly data for area chart
  const getMonthlyData = () => {
    const monthly = {};
    applications.forEach((app) => {
      const date = new Date(app.createdAt || app.applicationDate);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}`;
      if (!monthly[key])
        monthly[key] = { applications: 0, approved: 0, month: key };
      monthly[key].applications += 1;
      if (app.status === "APPROVED" || app.status === "DISBURSED")
        monthly[key].approved += 1;
    });
    return Object.values(monthly).sort((a, b) =>
      a.month.localeCompare(b.month)
    );
  };

  // Loan purpose data for bar chart
  const getPurposeData = () => {
    const purposeSums = applications.reduce((acc, app) => {
      acc[app.purpose] = (acc[app.purpose] || 0) + Number(app.loanAmount);
      return acc;
    }, {});
    return Object.keys(purposeSums).map((purpose) => ({
      purpose,
      amount: purposeSums[purpose],
    }));
  };

  return (
    <Grid container spacing={3}>
      {/* Application Status Distribution */}
      <Grid item xs={12} md={4}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 300,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Application Status Distribution
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={getStatusData()}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {getStatusData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      {/* Monthly Applications Trend */}
      <Grid item xs={12} md={8}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 300,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Monthly Applications Trend
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={getMonthlyData()}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="applications"
                stroke={theme.palette.primary.main}
                fill={theme.palette.primary.light}
              />
              <Area
                type="monotone"
                dataKey="approved"
                stroke={theme.palette.success.main}
                fill={theme.palette.success.light}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      {/* Loan Purpose Distribution */}
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 300,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Loan Amount by Purpose
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={getPurposeData()}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="purpose" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="amount"
                fill={theme.palette.primary.main}
                name="Loan Amount"
              />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DashboardCharts; 