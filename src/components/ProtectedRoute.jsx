import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Sementara kita buat status tiruan (false = belum login, true = sudah login)
  const isAuthenticated = false; 

  if (!isAuthenticated) {
    // Jika belum login, tendang paksa ke halaman login
    return <Navigate to="/login" replace />;
  }

  // Jika sudah login, izinkan masuk ke halaman yang dituju
  return children;
};

export default ProtectedRoute;