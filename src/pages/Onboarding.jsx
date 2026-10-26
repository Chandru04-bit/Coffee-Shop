import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '../components/common/StatusBar';

export const Onboarding = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/home');
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#050505',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden'
      }}
    >
      {/* Top Status Bar with dark theme (white text) */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 30 }}>
        <StatusBar theme="dark" />
      </div>

      {/* Hero Coffee Image with seamless bottom gradient */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '62%',
          overflow: 'hidden'
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=85"
          alt="Artisan Coffee"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 20%'
          }}
        />

        {/* Multi-stage dark gradient overlays for seamless fade into the black lower section */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.1) 40%, rgba(5, 5, 5, 0.75) 80%, #050505 100%)'
          }}
        />
      </div>

      {/* Content Section at bottom */}
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          marginTop: 'auto',
          padding: '0 30px 42px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        {/* Main Headline */}
        <h1
          style={{
            color: '#FFFFFF',
            fontSize: '32px',
            fontWeight: 700,
            lineHeight: 1.25,
            letterSpacing: '-0.5px',
            marginBottom: '12px',
            maxWidth: '315px'
          }}
        >
          Fall in Love with Coffee in Blissful Delight!
        </h1>

        {/* Subtitle */}
        <p
          style={{
            color: '#A2A2A2',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: 1.5,
            marginBottom: '32px',
            maxWidth: '300px'
          }}
        >
          Welcome to our cozy coffee corner, where every cup is a delightful joy for you.
        </p>

        {/* Get Started Button */}
        <button
          onClick={handleGetStarted}
          className="btn-primary"
          style={{
            height: '62px',
            fontSize: '16px',
            fontWeight: 600,
            borderRadius: '16px',
            backgroundColor: '#C67C4E',
            letterSpacing: '-0.2px'
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};
