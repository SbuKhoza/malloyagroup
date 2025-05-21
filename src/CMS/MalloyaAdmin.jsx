import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase/config'; // Adjust path as needed
import LoginAdmin from './admincomponents/LoginAdmin';
import AdminDashboard from './admincomponents/AdminDashboard';
import { Box, CircularProgress } from '@mui/material';

function MalloyaAdmin() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Show login if user is not authenticated
  if (!user) {
    return <LoginAdmin />;
  }

  // Show dashboard if user is authenticated
  return <AdminDashboard />;
}

export default MalloyaAdmin;