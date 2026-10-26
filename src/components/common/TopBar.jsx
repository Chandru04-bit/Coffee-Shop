import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export const TopBar = ({ title, rightElement, onBack, light = true }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px 16px',
        width: '100%',
        color: light ? '#2F2D2C' : '#FFFFFF',
        position: 'relative',
        zIndex: 20
      }}
    >
      <button
        onClick={handleBack}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: light ? '#FFFFFF' : 'rgba(255, 255, 255, 0.12)',
          border: light ? '1px solid #EAEAEA' : 'none',
          color: light ? '#2F2D2C' : '#FFFFFF',
          boxShadow: light ? '0 2px 6px rgba(0, 0, 0, 0.04)' : 'none'
        }}
        aria-label="Go back"
      >
        <ChevronLeft size={20} strokeWidth={2.5} />
      </button>

      <h1
        style={{
          fontSize: '18px',
          fontWeight: 700,
          letterSpacing: '-0.3px',
          textAlign: 'center',
          margin: 0,
          color: light ? '#2F2D2C' : '#FFFFFF'
        }}
      >
        {title}
      </h1>

      <div
        style={{
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {rightElement || <div style={{ width: '40px' }} />}
      </div>
    </header>
  );
};
