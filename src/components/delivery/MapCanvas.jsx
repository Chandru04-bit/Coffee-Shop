import React, { useState, useEffect } from 'react';
import { Coffee, Home, Navigation, Crosshair } from 'lucide-react';

export const MapCanvas = ({ onRecenter }) => {
  const [courierProgress, setCourierProgress] = useState(0.65); // 65% along the route

  // Slight gentle animated sway of courier along the path
  useEffect(() => {
    const timer = setInterval(() => {
      setCourierProgress(prev => {
        const next = prev + 0.02;
        return next > 0.95 ? 0.3 : next;
      });
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  // Route path coordinates from Cafe (top-left: 20%, 30%) to User Home (bottom-right: 78%, 75%)
  // Points: (75, 95) -> (140, 110) -> (210, 190) -> (280, 240)
  const pathData = "M 75,95 C 110,95 130,130 160,145 C 195,160 215,210 270,225";

  // Interpolated courier position for SVG:
  // Using an approximation along the cubic bezier:
  const courierX = 75 + courierProgress * (270 - 75);
  const courierY = 95 + Math.sin(courierProgress * Math.PI) * 45 + courierProgress * (225 - 95);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '380px',
        backgroundColor: '#EBE5DF',
        overflow: 'hidden'
      }}
    >
      {/* Polished Vector Map Background */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 375 380"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0 }}
      >
        <defs>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C67C4E" />
            <stop offset="100%" stopColor="#ED5151" />
          </linearGradient>
          <filter id="mapShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Map Ground base */}
        <rect width="375" height="380" fill="#EAE5DE" />

        {/* Parks / Green spaces */}
        <path
          d="M -20,40 Q 60,30 90,80 T 40,180 T -20,140 Z"
          fill="#D8E8D5"
        />
        <path
          d="M 230,-10 Q 300,10 320,60 T 260,110 T 210,30 Z"
          fill="#D8E8D5"
        />
        <path
          d="M 290,240 Q 380,220 390,320 T 310,380 T 250,300 Z"
          fill="#D8E8D5"
        />

        {/* River / Water Canal */}
        <path
          d="M 0,290 C 80,280 150,310 220,295 C 290,280 340,300 375,290"
          stroke="#C5DCF0"
          strokeWidth="18"
          fill="none"
          strokeLinecap="round"
        />

        {/* City Blocks / Buildings */}
        <g fill="#DFD8CF" stroke="#D3CBC0" strokeWidth="1">
          <rect x="25" y="12" width="45" height="30" rx="3" />
          <rect x="80" y="10" width="35" height="25" rx="3" />
          <rect x="130" y="20" width="55" height="35" rx="3" />
          
          <rect x="20" y="210" width="60" height="40" rx="3" />
          <rect x="100" y="220" width="40" height="45" rx="3" />
          
          <rect x="290" y="120" width="50" height="60" rx="3" />
          <rect x="235" y="130" width="38" height="40" rx="3" />
        </g>

        {/* Secondary Streets */}
        <path
          d="M 0,80 L 375,90 M 0,170 L 375,150 M 0,240 L 375,250 M 110,0 L 95,380 M 240,0 L 255,380 M 320,0 L 310,380"
          stroke="#FFFFFF"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M 40,0 L 50,380 M 175,0 L 180,380"
          stroke="#FFFFFF"
          strokeWidth="5"
        />

        {/* Primary Arterial Road */}
        <path
          d="M -10,120 Q 140,110 180,160 T 385,220"
          stroke="#FFF9E6"
          strokeWidth="14"
          fill="none"
        />

        {/* Delivery Route Glow Path */}
        <path
          d={pathData}
          stroke="#C67C4E"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="6 4"
          fill="none"
          opacity="0.85"
        />

        {/* Coffee Shop Origin Marker */}
        <g transform="translate(60, 75)" filter="url(#mapShadow)">
          <circle cx="16" cy="16" r="16" fill="#C67C4E" />
          <circle cx="16" cy="16" r="19" fill="none" stroke="#C67C4E" strokeWidth="2" opacity="0.4" />
        </g>

        {/* User Destination Marker */}
        <g transform="translate(255, 205)" filter="url(#mapShadow)">
          <circle cx="16" cy="16" r="16" fill="#1E1E1E" />
          <circle cx="16" cy="16" r="19" fill="none" stroke="#1E1E1E" strokeWidth="2" opacity="0.3" />
        </g>
      </svg>

      {/* HTML Icons on top of markers for crisp rendering */}
      {/* Coffee Shop Marker Icon */}
      <div
        style={{
          position: 'absolute',
          left: '64px',
          top: '79px',
          pointerEvents: 'none',
          color: '#FFFFFF'
        }}
        title="Coffee Shop"
      >
        <Coffee size={16} strokeWidth={2.5} />
      </div>

      {/* User Home Marker Icon */}
      <div
        style={{
          position: 'absolute',
          left: '259px',
          top: '209px',
          pointerEvents: 'none',
          color: '#FFFFFF'
        }}
        title="Delivery Destination"
      >
        <Home size={16} strokeWidth={2.5} />
      </div>

      {/* Moving Courier Icon */}
      <div
        style={{
          position: 'absolute',
          left: `${courierX - 16}px`,
          top: `${courierY - 16}px`,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          border: '2px solid #C67C4E',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#C67C4E',
          zIndex: 15,
          transition: 'all 0.8s ease'
        }}
        title="Courier live location"
      >
        <Navigation size={16} strokeWidth={2.6} style={{ transform: 'rotate(45deg)' }} />
      </div>

      {/* GPS Recenter Floating Button */}
      <button
        onClick={onRecenter}
        style={{
          position: 'absolute',
          right: '20px',
          top: '64px',
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#2F2D2C',
          zIndex: 25
        }}
        aria-label="Re-center map"
      >
        <Crosshair size={20} strokeWidth={2.2} />
      </button>
    </div>
  );
};
