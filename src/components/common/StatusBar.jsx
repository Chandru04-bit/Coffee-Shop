import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

export const StatusBar = ({ theme = 'light' }) => {
  const [time, setTime] = useState('9:41');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      // Format 9:41 style or current time
      const formatted = `${hours % 12 || 12}:${minutes}`;
      setTime(formatted);
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`status-bar ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      <span style={{ fontWeight: 700, fontSize: '13px', letterSpacing: '-0.3px' }}>
        {time}
      </span>
      <div className="status-bar-icons">
        <Signal size={14} strokeWidth={2.5} />
        <Wifi size={14} strokeWidth={2.5} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <BatteryMedium size={18} strokeWidth={2.2} />
        </div>
      </div>
    </div>
  );
};
