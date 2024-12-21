import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Import and register Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, Legend);

// Styling for Chart Cards
const Card = styled("div")(() => ({
  borderRadius: "8px",
  border: "1px solid #ccc",
  padding: "16px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
  height: "250px",
  textAlign: "center",
  background: "linear-gradient(45deg, #f3e5f5, #d1c4e9)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const Card2 = styled(Card)({
  height: "300px",
});
const Card3 = styled(Card)({
  height: "100px",
});

const StyledSelect = styled(Select)({
  height: "40px",
  padding: "2px 10px",
  fontSize: "14px",
  borderRadius: "10px",
  boxShadow: "none",
  backgroundColor: "#333",
  color: "#fff",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#333",
  },
  "& .MuiSelect-icon": {
    color: "#fff",
  },
});

const StyledSelect1 = styled(Select)({
  height: "40px",
  padding: "2px 10px",
  fontSize: "14px",
  borderRadius: "10px",
  boxShadow: "none",
  backgroundColor: "#333",
  color: "#fff",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#333",
  },
  "& .MuiSelect-icon": {
    color: "#fff",
  },
});

export default function AdminDashboard() {
  const [selectedYear, setSelectedYear] = useState("E1");
  const [selectedSemester, setSelectedSemester] = useState("E1 s1");

  const handleYearChange = (e) => setSelectedYear(e.target.value);
  const handleSemesterChange = (e) => setSelectedSemester(e.target.value);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

  const sectionWiseData = {
    E1: { A: 75, B: 70, C: 80, D: 85, E: 78 },
    E2: { A: 80, B: 85, C: 82, D: 88, E: 90 },
    E3: { A: 88, B: 87, C: 90, D: 91, E: 93 },
    E4: { A: 85, B: 89, C: 92, D: 94, E: 96 },
  };

  const averageAttendance =
    Object.values(sectionWiseData[selectedYear] || {}).reduce((sum, val) => sum + val, 0) /
    Object.values(sectionWiseData[selectedYear] || {}).length;

  const monthlyAttendanceData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: `Monthly Attendance - ${selectedYear}`,
        data: [88, 84, 79, 92, 90, 88, 87, 89, 85, 93, 90, 91],
        backgroundColor: "#4caf50",
      },
    ],
  };

  const semesterSubjectsData = {
    "E1 s1": { subjects: ["Math", "Physics", "Chemistry", "Lab 1", "Lab 2", "Lab 3", "Biology"], attendance: [90, 85, 80, 95, 89, 75, 88] },
    "E1 s2": { subjects: ["Math 2", "Physics 2", "Chemistry 2", "Lab 4", "Lab 5", "Lab 6", "English"], attendance: [88, 80, 75, 90, 85, 70, 78] },
    "E2 s1": { subjects: ["DS", "OOP", "DBMS", "Lab 1", "Lab 2", "Lab 3", "Network"], attendance: [80, 72, 89, 88, 77, 80, 90] },
    "E2 s2": { subjects: ["OS", "AI", "Math", "Lab 1", "Lab 2", "Lab 3", "Web"], attendance: [85, 80, 78, 88, 90, 87, 92] },
    "E3 s1": { subjects: ["CN", "SE", "ML", "Lab 1", "Lab 2", "Lab 3", "Testing"], attendance: [92, 88, 90, 87, 84, 89, 94] },
    "E3 s2": { subjects: ["DL", "DM", "Software", "Lab 4", "Lab 5", "Lab 6", "English 2"], attendance: [87, 85, 90, 92, 88, 91, 89] },
    "E4 s1": { subjects: ["Project", "Elective 1", "Elective 2", "Lab 1", "Lab 2", "Seminar", "Viva"], attendance: [94, 92, 89, 91, 88, 93, 90] },
    "E4 s2": { subjects: ["Thesis", "Elective 3", "Lab 1", "Lab 2", "Lab 3", "Presentation", "Final Viva"], attendance: [91, 89, 88, 92, 87, 90, 93] },
  };

  const semesterChartData = {
    labels: semesterSubjectsData[selectedSemester]?.subjects || [],
    datasets: [
      {
        label: `Attendance - ${selectedSemester}`,
        data: semesterSubjectsData[selectedSemester]?.attendance || [],
        backgroundColor: "#42a5f5",
      },
    ],
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f7f7f7" }}>
      <Typography variant="h5" align="center" sx={{ fontWeight: "bold", color: "#333", marginBottom: "20px" }}>
        Admin Dashboard
      </Typography>

      {/* Date Display */}
      <Typography variant="h6" align="center" sx={{ marginBottom: "10px", fontWeight: "bold", color: "#444" }}>
        {`Today's Date: ${formattedDate}`}
      </Typography>

      {/* Year Filter */}
      <Grid container spacing={2} justifyContent="center" sx={{ marginBottom: "10px" }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card3>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginBottom: "5px" }}>
              Filter by Year
            </Typography>
            <StyledSelect fullWidth value={selectedYear} onChange={handleYearChange}>
              {["E1", "E2", "E3", "E4"].map((year) => (
                <MenuItem value={year} key={year}>
                  {year}
                </MenuItem>
              ))}
            </StyledSelect>
          </Card3>
        </Grid>
      </Grid>

      {/* Average Attendance Display */}
      <Typography variant="subtitle1" align="center" sx={{ marginBottom: "20px", fontWeight: "bold", color: "#444" }}>
        {`Average Attendance: ${averageAttendance.toFixed(2)}%`}
      </Typography>

      {/* Circular Discs */}
      <Grid container spacing={2} sx={{ marginBottom: "30px" }} justifyContent="center">
        {Object.entries(sectionWiseData[selectedYear] || {}).map(([section, percentage]) => {
          const totalPresents = Math.round((percentage / 100) * 50);  // Example: Total students = 50
          const totalAbsents = 50 - totalPresents;  // Total absents = 50 - presents

          return (
            <Grid item xs={12} sm={4} md={2.4} key={section}>
              <Card>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Section {section}
                </Typography>

                {/* Circular Progress with percentage inside */}
                <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <CircularProgress
                    variant="determinate"
                    value={percentage}
                    size={120}
                    thickness={5}
                    sx={{ color: "#4caf50" }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      position: "absolute",
                      fontWeight: "bold",
                      color: "#4caf50",
                    }}
                  >
                    {percentage}%
                  </Typography>
                </div>

                {/* Attendance details (Presents & Absents) */}
                <div style={{ marginTop: "20px" }}>
                  <Typography variant="subtitle2" sx={{ marginBottom: "5px" }}>
                    Presents Today: {totalPresents}
                  </Typography>
                  <Typography variant="subtitle2">
                    Absents Today: {totalAbsents}
                  </Typography>
                </div>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Charts */}
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Card2>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Monthly Attendance (Bar Chart)
            </Typography>
            <Bar data={monthlyAttendanceData} />
          </Card2>
        </Grid>

        {/* Semester-wise Attendance */}
        <Grid item xs={12} sm={6}>
          <Card2>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
              Filter by Semester
            </Typography>
            <StyledSelect1 fullWidth value={selectedSemester} onChange={handleSemesterChange} sx={{ marginBottom: "10px" }}>
              {Object.keys(semesterSubjectsData).map((semester) => (
                <MenuItem value={semester} key={semester}>
                  {semester}
                </MenuItem>
              ))}
            </StyledSelect1>
            <Bar data={semesterChartData} />
          </Card2>
        </Grid>
      </Grid>
    </div>
  );
}
