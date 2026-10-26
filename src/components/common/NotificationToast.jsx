import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, Heart } from 'lucide-react';

export const NotificationToast = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const renderIcon = () => {
    switch (toast.type) {
      case 'cart':
        return <CheckCircle2 size={18} color="#C67C4E" />;
      case 'favorite':
        return <Heart size={18} color="#ED5151" fill="#ED5151" />;
      case 'error':
        return <AlertCircle size={18} color="#ED5151" />;
      default:
        return <Info size={18} color="#C67C4E" />;
    }
  };

  return (
    <div className={`app-toast ${toast.type}`}>
      {renderIcon()}
      <span>{toast.message}</span>
    </div>
  );
};
