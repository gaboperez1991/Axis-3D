import React from "react";

function AdminDashboard() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5f5f5",
      fontFamily: "sans-serif"
    }}>
      <div style={{
        background: "white",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        textAlign: "center"
      }}>
        <h2 style={{ marginBottom: "1rem" }}>
          Panel Admin temporalmente deshabilitado
        </h2>
        <p>
          Estamos migrando la base de datos a Supabase.
        </p>
        <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#777" }}>
          En breve volverá a estar disponible.
        </p>
      </div>
    </div>
  );
}

export default AdminDashboard;









