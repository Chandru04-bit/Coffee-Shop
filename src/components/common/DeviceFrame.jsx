import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Smartphone, Monitor, Coffee, Sparkles } from 'lucide-react';

export const DeviceFrame = ({ children, statusTheme = 'light' }) => {
  const [deviceMode, setDeviceMode] = useState('iphone'); // 'iphone', 'large', 'fluid'
  const location = useLocation();
  const navigate = useNavigate();

  const screens = [
    { name: '1. Onboarding', path: '/' },
    { name: '2. Home', path: '/home' },
    { name: '3. Detail', path: '/detail/caffe-mocha' },
    { name: '4. Order', path: '/order' },
    { name: '5. Tracking', path: '/delivery' }
  ];

  const getShellStyle = () => {
    if (deviceMode === 'fluid') {
      return {
        maxWidth: '480px',
        height: '92vh',
        borderRadius: '28px'
      };
    }
    if (deviceMode === 'large') {
      return {
        maxWidth: '414px',
        height: '896px',
        borderRadius: '46px'
      };
    }
    // Default 375 x 812 reference
    return {
      maxWidth: '375px',
      height: '812px',
      borderRadius: '44px'
    };
  };

  return (
    <div className="app-viewport-container">
      {/* Desktop Helper Toolbar */}
      <aside className="desktop-toolbar" aria-label="Desktop Preview Controls">
        <div className="desktop-toolbar-brand">
          <div className="brand-dot" />
          <Coffee size={16} color="#C67C4E" />
          <span>Coffee Shop Mobile UI</span>
          <span style={{ fontSize: '11px', color: '#888', fontWeight: 500 }}>
            (Pixel-Perfect Figma)
          </span>
        </div>

        <div className="desktop-nav-shortcuts">
          {screens.map((sc) => {
            const isActive = location.pathname === sc.path ||
              (sc.path === '/detail/caffe-mocha' && location.pathname.startsWith('/detail'));
            return (
              <button
                key={sc.path}
                onClick={() => navigate(sc.path)}
                className={`desktop-nav-btn ${isActive ? 'active' : ''}`}
              >
                {sc.name}
              </button>
            );
          })}
        </div>

        <div className="viewport-mode-toggle">
          <button
            onClick={() => setDeviceMode('iphone')}
            className={`mode-btn ${deviceMode === 'iphone' ? 'active' : ''}`}
            title="Standard iPhone Viewport (375 × 812)"
          >
            375×812
          </button>
          <button
            onClick={() => setDeviceMode('large')}
            className={`mode-btn ${deviceMode === 'large' ? 'active' : ''}`}
            title="Max Mobile Viewport (414 × 896)"
          >
            414×896
          </button>
          <button
            onClick={() => setDeviceMode('fluid')}
            className={`mode-btn ${deviceMode === 'fluid' ? 'active' : ''}`}
            title="Flexible Preview"
          >
            Fluid
          </button>
        </div>
      </aside>

      {/* Mobile Device Mockup Frame */}
      <main className="mobile-device-shell" style={getShellStyle()}>
        {/* Dynamic Island / Notch Pill */}
        <div
          style={{
            position: 'absolute',
            top: '8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '108px',
            height: '24px',
            backgroundColor: '#000000',
            borderRadius: '16px',
            zIndex: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: '8px',
            pointerEvents: 'none'
          }}
        >
          {/* Subtle camera lens reflection */}
          <div
            style={{
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              background: '#0d1527',
              border: '1px solid #1a233a'
            }}
          />
        </div>

        {/* Content area */}
        {children}

        {/* iOS Home Indicator Bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '6px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '134px',
            height: '4px',
            backgroundColor: '#1E1E1E',
            opacity: 0.35,
            borderRadius: '10px',
            zIndex: 55,
            pointerEvents: 'none'
          }}
        />
      </main>
    </div>
  );
};
