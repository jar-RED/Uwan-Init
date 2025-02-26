import React, { useState } from "react";
import "./Header.css";
import logo from "../assets/weather-app.png";

export const Header = ({ city, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      setSearchTerm("");
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} className="app-logo" />
        <h1>Uwan-Init</h1>
      </div>

      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search for a city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">
          <i className="fas fa-search"></i>
        </button>
      </form>

      {city && (
        <div className="current-location">
          <i className="fas fa-map-marker-alt"></i>
          <span>{city}</span>
        </div>
      )}
    </header>
  );
};
