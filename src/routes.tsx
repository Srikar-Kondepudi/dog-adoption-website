import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import DogSearch from "./components/DogSearch";
import { useAuth } from "./context/AuthContext";

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <DogSearch /> : <LoginForm />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
} 