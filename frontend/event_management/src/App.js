import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EventManagement from "./pages/EventManagement"
import ProtectedRoute from "./components/ProtectedRoute";
import PurchaseTicket from "./pages/PurchaseTicket";
import UserTickets from "./pages/UserTickets";
import EventTicketSales from "./pages/EventTicketSales";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/events" 
          element={
            <ProtectedRoute>
              <EventManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/purchase/:eventId" 
          element={
            <ProtectedRoute>
              <PurchaseTicket />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/my-tickets" 
          element={
            <ProtectedRoute>
              <UserTickets />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/sales/:eventId" 
          element={
            <ProtectedRoute>
              <EventTicketSales />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
