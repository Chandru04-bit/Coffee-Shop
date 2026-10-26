import React from 'react';
import { useApp } from '../../context/AppContext';
import { PROMO_CODES } from '../../data/coffeeData';

export const PromoBanner = () => {
  const { setAppliedPromo, showToast } = useApp();

  const handleApplyPromo = () => {
    setAppliedPromo(PROMO_CODES[0]);
    showToast('Applied "Buy 1 Get 1 FREE" promo voucher!', 'cart');
  };

  return (
    <div
      style={{
        padding: '0 24px',
        marginTop: '-16px',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div
        onClick={handleApplyPromo}
        style={{
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          height: '142px',
          boxShadow: '0 10px 24px rgba(0, 0, 0, 0.12)',
          cursor: 'pointer'
        }}
      >
        {/* Background Image with rich coffee beans and cup */}
        <img
          src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80"
          alt="Coffee promotion"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />

        {/* Gradient dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(17, 17, 17, 0.92) 0%, rgba(17, 17, 17, 0.5) 55%, rgba(0, 0, 0, 0.1) 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 24px'
          }}
        >
          {/* Promo Tag */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: '#ED5151',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: 700,
              padding: '3px 10px',
              borderRadius: '8px',
              width: 'fit-content',
              marginBottom: '8px',
              letterSpacing: '-0.2px'
            }}
          >
            Promo
          </div>

          {/* Headline */}
          <div style={{ position: 'relative' }}>
            <h2
              style={{
                color: '#FFFFFF',
                fontSize: '26px',
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.5px',
                fontFamily: 'var(--font-family)',
                margin: 0
              }}
            >
              Buy one get
              <br />
              <span style={{ position: 'relative', display: 'inline-block' }}>
                one <span style={{ color: '#FFFFFF', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>FREE</span>
                <span
                  style={{
                    position: 'absolute',
                    bottom: '2px',
                    left: 0,
                    width: '100%',
                    height: '5px',
                    background: 'rgba(198, 124, 78, 0.7)',
                    zIndex: -1,
                    borderRadius: '2px'
                  }}
                />
              </span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
