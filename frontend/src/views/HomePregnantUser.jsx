import React from "react";
import "../styles/HomePregnantUser.css";


export default function HomePregnantUser() {
  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <h1>Selamat Datang, Ibu 🌸</h1>
        <p>Pantau kondisi kehamilan trimester 2 dengan sistem pakar</p>
      </header>

      {/* Reminder */}
      <section className="reminder-card">
        <h3>🔔 Pengingat Hari Ini</h3>
        <p>Jangan lupa minum vitamin dan periksa gerakan janin</p>
      </section>

      {/* Main Menu */}
      <section className="menu-grid">
        <div className="menu-card">
          <h2>❤️ Diagnosis Keluhan</h2>
          <p>Konsultasikan keluhan yang dirasakan selama kehamilan</p>
          <a href="/diagnosis">Mulai Diagnosis</a>
        </div>


        <div className="menu-card">
          <h2>🩺 Riwayat Konsultasi</h2>
          <p>Lihat hasil diagnosis dan saran dari sistem pakar</p>
          <button className="outline">Lihat Riwayat</button>
        </div>


        <div className="menu-card">
          <h2>📋 Data Kehamilan</h2>
          <p>Catat usia kehamilan, berat badan, dan tekanan darah</p>
          <button className="outline">Kelola Data</button>
        </div>


        <div className="menu-card">
          <h2>📘 Edukasi Kehamilan</h2>
          <p>Artikel dan tips kesehatan untuk ibu hamil trimester 2</p>
          <button className="outline">Baca Artikel</button>
        </div>
      </section>
    </div>
  );
}
