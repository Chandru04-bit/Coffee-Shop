import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Heart, ShoppingBag, Bell } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItemsCount, favorites } = useApp();

  const currentPath = location.pathname;

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/home' },
    { id: 'favorites', label: 'Favorites', icon: Heart, path: '/favorites', badge: favorites.length > 0 ? favorites.length : null },
    { id: 'cart', label: 'Cart', icon: ShoppingBag, path: '/cart', badge: totalItemsCount > 0 ? totalItemsCount : null },
    { id: 'notifications', label: 'Notifications', icon: Bell, path: '/notifications' }
  ];

  return (
    <nav className="bottom-navigation-bar" aria-label="Bottom Navigation">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPath === item.path || (item.id === 'home' && currentPath === '/');

        return (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            aria-label={item.label}
          >
            <Icon
              size={23}
              strokeWidth={isActive ? 2.6 : 2}
              fill={isActive && (item.id === 'favorites' || item.id === 'home') ? 'currentColor' : 'none'}
            />
            {item.badge && (
              <span className="nav-badge">
                {item.badge}
              </span>
            )}
            {isActive && <div className="bottom-nav-indicator" />}
          </button>
        );
      })}
    </nav>
  );
};
