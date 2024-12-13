import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import "./styles/app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Admin from "./pages/admin/admin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TodayClasses from "./pages/admin/TodayClasses";
import ManageFaculty from "./pages/admin/ManageFaculty";
import StudentVisualisation from "./pages/admin/StudentVisualisation";

import E1Classes from "./pages/admin/E1Classes";
import E2Classes from "./pages/admin/E2Classes";
import E3Classes from "./pages/admin/E3Classes";
import E4Classes from "./pages/admin/E4Classes";

import Faculty from "./pages/admin/faculty";

import theme from "./utils/Theme";

function App() {
  console.log(theme.palette.action.hover);
  console.log(theme.palette);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/admin" element={<Admin />}>
            {/* Nested routes */}
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="todayclasses" element={<TodayClasses />} />
            <Route path="todayclasses/e1" element={<E1Classes />} />
            <Route path="todayclasses/e2" element={<E2Classes />} />
            <Route path="todayclasses/e3" element={<E3Classes />} />
            <Route path="todayclasses/e4" element={<E4Classes />} />
            <Route path="managefaculty" element={<ManageFaculty />} />
            <Route path="studentvisualisation" element={<StudentVisualisation />} />
            <Route path="facultypage" element={<Faculty />} /> 
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
