import React from 'react';
import { StatusBar } from '../components/common/StatusBar';
import { TopBar } from '../components/common/TopBar';
import { BottomNav } from '../components/common/BottomNav';
import { CoffeeCard } from '../components/home/CoffeeCard';
import { COFFEE_PRODUCTS } from '../data/coffeeData';
import { useApp } from '../context/AppContext';
import { Heart, Coffee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Favorites = () => {
  const { favorites } = useApp();
  const navigate = useNavigate();

  const favoriteProducts = COFFEE_PRODUCTS.filter((p) => favorites.includes(p.id));

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#F9F9F9',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <StatusBar theme="light" />
      <TopBar title="Favorites" light={true} onBack={() => navigate('/home')} />

      <div className="screen-scrollable-content" style={{ padding: '0 24px 90px' }}>
        {favoriteProducts.length === 0 ? (
          <div
            style={{
              padding: '60px 20px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: '#9B9B9B'
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#FFF0F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                color: '#ED5151'
              }}
            >
              <Heart size={30} strokeWidth={2} />
            </div>
            <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#2F2D2C', marginBottom: '6px' }}>
              No Favorites Yet
            </h4>
            <p style={{ fontSize: '13px', maxWidth: '240px', marginBottom: '20px' }}>
              Tap the heart icon on any coffee card to save your favorite drinks here.
            </p>
            <button
              onClick={() => navigate('/home')}
              className="btn-primary"
              style={{ width: 'auto', padding: '0 24px', height: '48px', fontSize: '14px' }}
            >
              Explore Coffees
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
              paddingTop: '8px'
            }}
          >
            {favoriteProducts.map((coffee) => (
              <CoffeeCard key={coffee.id} coffee={coffee} />
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};
