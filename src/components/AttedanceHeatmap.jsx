import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, IconButton, Grid, FormControl, Select, MenuItem } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const MonthCalendar = ({ currentDate, attendanceData, selectedSubject }) => {
  const getMonthData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return { startingDay: firstDay.getDay(), totalDays: lastDay.getDate() };
  };

  const getAttendanceInfo = (date) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    const dayAttendance = attendanceData[dateStr];
    
    if (!dayAttendance || !dayAttendance[selectedSubject]) {
      return { color: '#f5f5f5', periods: null };
    }
    
    const attendance = dayAttendance[selectedSubject];
    
    if (attendance.type === 'consolidated') {
      return {
        color: 'rgba(156, 39, 176, 0.4)', // Purple for consolidated
        periods: attendance.periods,
        reason: attendance.reason
      };
    }

    return {
      color: attendance.status === 'present' ? 'rgba(76, 175, 80, 0.4)' : 'rgba(239, 83, 80, 0.4)',
      periods: attendance.periods
    };
  };

  const { startingDay, totalDays } = getMonthData();
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const weeks = Math.ceil((startingDay + totalDays) / 7);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="subtitle2" sx={{ mb: 1, textAlign: 'center' }}>
        {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
      </Typography>
      <Grid container spacing={0.5}>
        {days.map(day => (
          <Grid item xs={12/7} key={day}>
            <Typography variant="caption" sx={{ textAlign: 'center', display: 'block', color: '#666' }}>
              {day}
            </Typography>
          </Grid>
        ))}
        {Array.from({ length: weeks * 7 }).map((_, index) => {
          const day = index - startingDay + 1;
          const isValidDay = day > 0 && day <= totalDays;
          const attendanceInfo = isValidDay ? getAttendanceInfo(day) : null;
          
          return (
            <Grid item xs={12/7} key={index}>
              <Box 
                sx={{
                  aspectRatio: '1',
                  backgroundColor: isValidDay ? attendanceInfo.color : 'transparent',
                  borderRadius: 0.5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  cursor: attendanceInfo?.reason ? 'help' : 'default',
                }}
                title={attendanceInfo?.reason || ''}
              >
                {isValidDay && (
                  <>
                    <Typography variant="caption" sx={{ fontWeight: '500' }}>{day}</Typography>
                    {attendanceInfo.periods && (
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          fontSize: '0.6rem',
                          position: 'absolute',
                          bottom: '2px',
                          right: '2px'
                        }}
                      >
                        {attendanceInfo.periods}
                      </Typography>
                    )}
                  </>
                )}
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

const AttendanceCalendar = ({ attendanceData }) => {
  console.log(attendanceData)
  const [baseDate, setBaseDate] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState('');

  const getAllSubjects = () => {
    const subjects = new Set();
    Object.values(attendanceData).forEach(dayData => {
      Object.keys(dayData).forEach(subject => subjects.add(subject));
    });
    return Array.from(subjects);
  };

  // Find the earliest date in the attendance data
  useEffect(() => {
    if (attendanceData) {
      const dates = Object.keys(attendanceData).sort();
      if (dates.length > 0) {
        const earliestDate = new Date(dates[0]);
        setBaseDate(earliestDate);
      }
    }
  }, [attendanceData]);

  const handlePreviousMonths = () => {
    setBaseDate(new Date(baseDate.setMonth(baseDate.getMonth() - 3)));
  };

  const handleNextMonths = () => {
    setBaseDate(new Date(baseDate.setMonth(baseDate.getMonth() + 3)));
  };

  const handleSubjectChange = (event) => {
    const newSubject = event.target.value;
    setSelectedSubject(newSubject);
    
    // Find the earliest date for the selected subject
    const datesForSubject = Object.keys(attendanceData)
      .filter(date => attendanceData[date][newSubject]);
    
    if (datesForSubject.length > 0) {
      const earliestDate = new Date(datesForSubject.sort()[0]);
      setBaseDate(earliestDate);
    }
  };
  

  const subjects = getAllSubjects();

  useEffect(() => {
    if (!selectedSubject && subjects.length > 0) {
      setSelectedSubject(subjects[0]);
    }
  }, [subjects]);

  if (!baseDate) return null;

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Side Navigation */}
        <Box sx={{ 
          width: '200px', 
          borderRight: '1px solid #e0e0e0',
          pr: 2
        }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Select Subject</Typography>
          <FormControl fullWidth size="small">
            <Select
              value={selectedSubject}
              onChange={handleSubjectChange}
              displayEmpty
            >
              {subjects.map((subject) => (
                <MenuItem key={subject} value={subject}>
                  {subject}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Legend</Typography>
            {[
              { color: 'rgba(76, 175, 80, 0.4)', label: 'Present' },
              { color: 'rgba(239, 83, 80, 0.4)', label: 'Absent' },
              { color: 'rgba(156, 39, 176, 0.4)', label: 'Consolidated' }
            ].map(({ color, label }) => (
              <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Box sx={{ width: 12, height: 12, backgroundColor: color, borderRadius: 0.5 }} />
                <Typography variant="caption">{label}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Calendar Section */}
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <IconButton onClick={handlePreviousMonths} size="small">
              <ChevronLeft />
            </IconButton>
            <Typography variant="h6">
              {selectedSubject}
            </Typography>
            <IconButton onClick={handleNextMonths} size="small">
              <ChevronRight />
            </IconButton>
          </Box>

          <Grid container spacing={2}>
            {[0, 1, 2].map(offset => (
              <Grid item xs={12} md={4} key={offset}>
                <MonthCalendar 
                  currentDate={new Date(baseDate.getFullYear(), baseDate.getMonth() + offset)} 
                  attendanceData={attendanceData}
                  selectedSubject={selectedSubject}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};

export default AttendanceCalendar;