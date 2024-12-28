import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip as ChartTooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, Legend);

// Styling for Chart Cards
const Card = styled("div")(() => ({
  borderRadius: "8px",
  border: "1px solid #ccc",
  padding: "16px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
  textAlign: "center",
  background: "linear-gradient(45deg, #F5FCFA, #8DBCDF)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const Card2 = styled(Card)({
  height: "400px", // Adjusted height for bar charts
});

const Card3 = styled(Card)({
  height: "120px",
});

const StyledSelect = styled(Select)({
  height: "40px",
  padding: "2px 10px",
  fontSize: "14px",
  borderRadius: "10px",
  boxShadow: "none",
  backgroundColor: "#6788D5",
  color: "#fff",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#6788D5",
  },
  "& .MuiSelect-icon": {
    color: "#fff",
  },
});
const getColorForAttendance = (percentage) => {
  if (percentage >= 75) return "#4CAF50"; // Green for excellent attendance
  if (percentage >= 65) return "#FF9800"; // Yellow for good attendance
  return "#F44336"; // Red for low attendance
};

export default function AdminDashboard() {
  const [selectedYear, setSelectedYear] = useState("E1");
  const [selectedSemester, setSelectedSemester] = useState("E1 s1");

  const handleYearChange = (e) => setSelectedYear(e.target.value);
  const handleSemesterChange = (e) => setSelectedSemester(e.target.value);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

  const sectionWiseData = {
    E1: { A: 50, B: 76, C: 80, D: 65, E: 78 },
    E2: { A: 80, B: 85, C: 55, D: 88, E: 74 },
    E3: { A: 88, B: 64, C: 90, D: 73, E: 93 },
    E4: { A: 85, B: 89, C: 73, D: 94, E: 58 },
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
        backgroundColor: "#3EC99F",
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
        backgroundColor: "#6788D5",
      },
    ],
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#F5FCFA" }}>
      <Typography variant="h5" align="center" sx={{ fontWeight: "bold", color: "#040D0B", marginBottom: "20px" }}>
        Admin Dashboard
      </Typography>

      <Typography variant="h6" align="center" sx={{ marginBottom: "10px", fontWeight: "bold", color: "#040D0B" }}>
        {`Today's Date: ${formattedDate}`}
      </Typography>

      <Grid container spacing={2} justifyContent="center" sx={{ marginBottom: "10px" }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card3>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginBottom: "5px", color: "#040D0B" }}>
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

      <Typography variant="subtitle1" align="center" sx={{ marginBottom: "20px", fontWeight: "bold", color: "#040D0B" }}>
        {`Average Attendance: ${averageAttendance.toFixed(2)}%`}
      </Typography>
      <Grid container spacing={2} sx={{ marginBottom: "30px" }} justifyContent="center">
  {Object.entries(sectionWiseData[selectedYear] || {}).map(([section, percentage]) => (
    <Grid item xs={12} sm={4} md={2.4} key={section}>
      <Card>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#040D0B" }}>
          Section {section}
        </Typography>
        <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <CircularProgress
            variant="determinate"
            value={percentage}
            size={120}
            thickness={5}
            sx={{ color: getColorForAttendance(percentage) }}
          />
          <Typography
            variant="h6"
            sx={{
              position: "absolute",
              fontWeight: "bold",
              color: getColorForAttendance(percentage),
            }}
          >
            {percentage}%
          </Typography>
        </div>
      </Card>
    </Grid>
  ))}
</Grid>


      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Card2>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#040D0B" }}>
              Monthly Attendance (Bar Chart)
            </Typography>
            <Bar data={monthlyAttendanceData} />
          </Card2>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card2>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#040D0B" }}>
              Semester Attendance
            </Typography>
            <StyledSelect
              fullWidth
              value={selectedSemester}
              onChange={handleSemesterChange}
              sx={{ marginBottom: "10px" }}
            >
              {Object.keys(semesterSubjectsData).map((sem) => (
                <MenuItem value={sem} key={sem}>
                  {sem}
                </MenuItem>
              ))}
            </StyledSelect>
            <Bar data={semesterChartData} />
          </Card2>
        </Grid>
      </Grid>
    </div>
  );
}