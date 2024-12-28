import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  Typography,
  Button,
  Box,
  TextField,
  useTheme,
  useMediaQuery,
  Chip,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";

const mockClassData = {
  "123": {
    "2024-12-25": [
      {
        subject: "Math",
        timing: "9:00 AM - 10:30 AM",
        faculty: "Mr. A",
        year: "Second Year",
        class: "CSE-A",
        attendance: "present",
      },
      {
        subject: "Physics",
        timing: "11:00 AM - 12:30 PM",
        faculty: "Ms. B",
        year: "Second Year",
        class: "CSE-A",
        attendance: "absent",
      },
    ],
  },
};

const mockStudentData = {
  "123": {
    studentId: "123",
    name: "John Doe",
    subjects: [
      { name: "Math", attendance: 85 },
      { name: "Physics", attendance: 90 },
      { name: "Chemistry", attendance: 78 },
      { name: "Biology", attendance: 92 },
      { name: "English", attendance: 88 },
    ],
  },
};

const ModifyAttendancePage = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [classData, setClassData] = useState([]);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const student = mockStudentData[studentId];
    if (student) {
      setAttendanceData(student.subjects);
    } else {
      alert("Student not found");
      navigate("/");
    }
  }, [studentId, navigate]);

  const handleDateChange = (e) => {
    const selected = new Date(e.target.value);
    setSelectedDate(selected);
    const formattedDate = e.target.value;
    const classesForDate = mockClassData[studentId]?.[formattedDate] || [];
    setClassData(classesForDate);
  };

  const handleAttendanceChange = (index, newAttendance) => {
    setClassData((prevData) =>
      prevData.map((classItem, i) =>
        i === index ? { ...classItem, attendance: newAttendance, modified: true } : classItem
      )
    );
  };

  const handleSave = () => {
    if (window.confirm("Are you sure you want to save the changes?")) {
      alert("Attendance updated successfully!");
    }
  };

  const overallAttendance = Math.round(
    attendanceData.reduce((acc, subject) => acc + subject.attendance, 0) / attendanceData.length
  );

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 2,
        backgroundColor: "#F5FCFA",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="#040D0B"
          >
            Modify Attendance for {mockStudentData[studentId]?.name}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#666", mt: 0.5 }}
          >
            Student ID: {mockStudentData[studentId]?.studentId}
          </Typography>
        </Box>

        <TextField
          type="date"
          value={selectedDate.toISOString().split("T")[0]}
          onChange={handleDateChange}
          sx={{
            width: isMobile ? "100%" : 200,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: "white",
            },
          }}
          InputLabelProps={{ shrink: true }}
          label="Select Date"
        />
      </Box>

      {/* Overall Attendance Section */}
      <Box sx={{ mb: 4 }}>
        <Card
          sx={{
            p: 2,
            boxShadow: 1,
            borderRadius: 4,
            backgroundColor: "#8DBCDF",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: 1,
              color: "#040D0B",
            }}
          >
            Overall Attendance: {overallAttendance}%
          </Typography>
          <Grid container spacing={2}>
            {attendanceData.map((subject, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    p: 2,
                    boxShadow: 1,
                    borderRadius: 4,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      color: "#040D0B",
                    }}
                  >
                    {subject.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#666" }}
                  >
                    Attendance: {subject.attendance}%
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Card>
      </Box>

      {/* Class Attendance Section */}
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: "bold",
          color: "#040D0B",
        }}
      >
        Class Attendance on {selectedDate.toISOString().split("T")[0]}:
      </Typography>

      {classData.length === 0 ? (
        <Card
          sx={{
            p: 3,
            boxShadow: 1,
            borderRadius: 4,
            textAlign: "center",
            backgroundColor: "#6788D5",
            color: "white",
          }}
        >
          <Typography>No classes scheduled for the selected date.</Typography>
        </Card>
      ) : (
        <Grid container spacing={2}>
  {classData.map((classItem, index) => (
    <Grid item xs={12} sm={6} md={4} key={index}>
      <Card
        sx={{
          p: 2,
          boxShadow: 1,
          borderRadius: 4,
          border: classItem.modified ? "2px solid #3EC99F" : "none",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "bold",
            color: "#040D0B",
          }}
        >
          {classItem.subject}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {classItem.timing}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Faculty: {classItem.faculty}
        </Typography>

        {/* Attendance Status Label */}
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold",
              color: "#666",
              mb: 1,
            }}
          >
            Attendance Status:
          </Typography>
          <Chip
            label={classItem.attendance.toUpperCase()}
            color={classItem.attendance === "present" ? "success" : "error"}
            sx={{
              fontWeight: "bold",
              color: "white",
            }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button
            variant="contained"
            color="success"
            sx={{ flex: 1 }}
            onClick={() => handleAttendanceChange(index, "present")}
          >
            <CheckCircleIcon sx={{ mr: 1 }} /> Present
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ flex: 1 }}
            onClick={() => handleAttendanceChange(index, "absent")}
          >
            <CancelIcon sx={{ mr: 1 }} /> Absent
          </Button>
        </Box>
      </Card>
    </Grid>
  ))}
</Grid>

      )}

      {/* Save Button */}
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "#3EC99F",
          }}
          onClick={handleSave}
          disabled={classData.length === 0}
        >
          Save Changes
        </Button>
      </Box>
    </Container>
  );
};

export default ModifyAttendancePage;