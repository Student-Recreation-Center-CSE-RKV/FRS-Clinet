import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";

const colors = {
  text: "#040D0B",
  background: "#F5FCFA",
  primary: "#3EC99F",
  secondary: "#8DBCDF",
  accent: "#6788D5",
  error: "#FF4D4F", // Error color
};

const Card = styled("div")(() => ({
  borderRadius: "8px",
  border: `1px solid ${colors.accent}`,
  padding: "16px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
  height: "auto",
}));

const Modifydata = () => {
  const navigate = useNavigate();
  const [studentDetails, setStudentDetails] = useState({
    studentId: "",
    year: "",
  });
  const [error, setError] = useState(null);

  const { studentId, year } = studentDetails;

  const handleSave = async () => {
    if (!studentId || !year) {
      setError("Please fill in all fields.");
      return;
    }

    setError(null);

    // Simulate a check to see if the student exists (replace with actual API call)
    const studentExists = mockDatabaseCheck(studentId);

    if (studentExists) {
      navigate(`/admin/modifyattendance/${studentId}`);
    } else {
      setError("No student found with this ID.");
    }
  };

  const mockDatabaseCheck = (id) => {
    const mockDatabase = ["123", "456", "789"];
    return mockDatabase.includes(id);
  };

  const handleStudentDetailsChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails({
      ...studentDetails,
      [name]: value,
    });
  };

  return (
    <div style={{ padding: "20px", backgroundColor: colors.background }}>
      <Typography
        variant="h5"
        align="center"
        sx={{
          fontWeight: "bold",
          marginBottom: "20px",
          color: colors.text,
        }}
      >
        Modify Attendance
      </Typography>

      {error && (
        <Alert severity="error" sx={{ marginBottom: "20px" }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Card>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                marginBottom: "10px",
                color: colors.text,
              }}
            >
              Student Details
            </Typography>
            <TextField
              label="Student ID"
              variant="outlined"
              fullWidth
              value={studentId}
              onChange={handleStudentDetailsChange}
              name="studentId"
              sx={{
                marginBottom: "10px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: studentId ? colors.accent : colors.error,
                  },
                  "&:hover fieldset": {
                    borderColor: colors.primary,
                  },
                },
              }}
              aria-label="Student ID"
            />
            <FormControl fullWidth sx={{ marginBottom: "10px" }}>
              <InputLabel sx={{ color: colors.secondary }}>Year</InputLabel>
              <Select
                label="Year"
                value={year}
                onChange={handleStudentDetailsChange}
                name="year"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: year ? colors.accent : colors.error,
                    },
                    "&:hover fieldset": {
                      borderColor: colors.primary,
                    },
                  },
                }}
                aria-label="Year"
              >
                <MenuItem value="Engg-1">Engg-1</MenuItem>
                <MenuItem value="Engg-2">Engg-2</MenuItem>
                <MenuItem value="Engg-3">Engg-3</MenuItem>
                <MenuItem value="Engg-4">Engg-4</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.primary,
                "&:hover": {
                  backgroundColor: colors.secondary,
                },
                color: "#fff",
                width: "100%",
                padding: "10px",
              }}
              onClick={handleSave}
              aria-label="Submit"
            >
              Submit
            </Button>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Modifydata;
