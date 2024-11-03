// app/components/Spinner.js
import React from 'react';
import "./spinner.css"; // Create a CSS file for styling

export default function Spinner() {
  return (
    <div className="backdrop">
      <div className="spinner"></div>
    </div>
  );
}
