import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { DeviceFrame } from './components/common/DeviceFrame';
import { NotificationToast } from './components/common/NotificationToast';

import { Onboarding } from './pages/Onboarding';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { Order } from './pages/Order';
import { DeliveryTracking } from './pages/DeliveryTracking';
import { Favorites } from './pages/Favorites';
import { Cart } from './pages/Cart';
import { Notifications } from './pages/Notifications';

export const App = () => {
  return (
    <AppProvider>
      <Router>
        <DeviceFrame>
          <NotificationToast />
          <Routes>
            {/* Screen 1: Onboarding */}
            <Route path="/" element={<Onboarding />} />
            
            {/* Screen 2: Home */}
            <Route path="/home" element={<Home />} />
            
            {/* Screen 3: Product Detail */}
            <Route path="/detail/:id" element={<ProductDetail />} />
            
            {/* Screen 4: Order */}
            <Route path="/order" element={<Order />} />
            
            {/* Screen 5: Delivery Tracking */}
            <Route path="/delivery" element={<DeliveryTracking />} />

            {/* Navigation Tabs */}
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/notifications" element={<Notifications />} />

            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </DeviceFrame>
      </Router>
    </AppProvider>
  );
};

export default App;
