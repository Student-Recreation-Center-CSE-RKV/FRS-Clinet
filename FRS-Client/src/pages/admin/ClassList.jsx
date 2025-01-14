import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Divider,
  Box,
} from '@mui/material';
import { 
  School, 
  AccessTime, 
  People, 
  CheckCircleOutline,
  HighlightOff,
  Phone,
  Email
} from '@mui/icons-material';

const classes = [
  { 
    id: 1, 
    subject: 'Math', 
    faculty: 'Dr. Smith', 
    phone: '+1 (555) 123-4567',
    email: 'smith@school.edu',
    time: '10:00 AM', 
    presents: 20, 
    absents: 5, 
    classFor: 'Sec : A' 
  },
  { 
    id: 2, 
    subject: 'Science', 
    faculty: 'Dr. Jones', 
    phone: '+1 (555) 234-5678',
    email: 'jones@school.edu',
    time: '11:00 AM', 
    presents: 18, 
    absents: 7, 
    classFor: 'Sec : B' 
  },
  { 
    id: 3, 
    subject: 'History', 
    faculty: 'Dr. Brown', 
    phone: '+1 (555) 345-6789',
    email: 'brown@school.edu',
    time: '12:00 PM', 
    presents: 22, 
    absents: 3, 
    classFor: 'Sec : C' 
  },
  { 
    id: 4, 
    subject: 'Art', 
    faculty: 'Ms. Green', 
    phone: '+1 (555) 456-7890',
    email: 'green@school.edu',
    time: '1:00 PM', 
    presents: 15, 
    absents: 10, 
    classFor: 'Sec : D' 
  }
];

const ClassCards = ({year}) => {
  const navigate = useNavigate();

  const getAttendancePercentage = (presents, absents) => {
    const total = presents + absents;
    return Math.round((presents / total) * 100);
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return '#e8f5e9';
    if (percentage >= 75) return '#fff3e0';
    return '#ffebee';
  };

  const handleCardClick = (id) => {
    navigate(`/admin/todayclasses/${year}/${id}`);
  };

  return (
    <Box>
      <Typography 
        variant="h6"
        component="h1" 
        fontWeight="bold"
        color="#1a237e"
      >
        {`${year} class details`}
      </Typography>
      <Grid container spacing={2} sx={{ padding: '16px' }}>
        {classes.map((classItem) => {
          const attendancePercent = getAttendancePercentage(classItem.presents, classItem.absents);
          
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={classItem.id}>
              <Card 
                onClick={() => handleCardClick(classItem.id)}
                sx={{
                  height: '100%',
                  maxWidth: 280,
                  margin: 'auto',
                  borderRadius: '12px',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.12)'
                  },
                  cursor: 'pointer'
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <School sx={{ color: '#1976d2' }} />
                      <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                        {classItem.subject}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="caption" 
                      sx={{
                        bgcolor: '#e3f2fd',
                        color: '#1976d2',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: '12px',
                        fontWeight: 'bold'
                      }}
                    >
                      {classItem.classFor}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 1.5 }} />

                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <People sx={{ color: '#666' }} />
                      <Typography variant="body2" color="text.secondary">
                        {classItem.faculty}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Phone sx={{ color: '#666' }} />
                      <Typography variant="body2" color="text.secondary">
                        {classItem.phone}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Email sx={{ color: '#666' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ 
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {classItem.email}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessTime sx={{ color: '#666' }} />
                      <Typography variant="body2" color="text.secondary">
                        {classItem.time}
                      </Typography>
                    </Box>
                  </Box>

                  <Box 
                    sx={{ 
                      bgcolor: getAttendanceColor(attendancePercent),
                      borderRadius: '8px',
                      p: 1.5,
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <CheckCircleOutline sx={{ color: '#4caf50', fontSize: '1rem' }} />
                          <Typography variant="body2">
                            Present: {classItem.presents}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <HighlightOff sx={{ color: '#f44336', fontSize: '1rem' }} />
                          <Typography variant="body2">
                            Absent: {classItem.absents}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {attendancePercent}%
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Attendance
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ClassCards;