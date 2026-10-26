import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '../components/common/StatusBar';
import { TopBar } from '../components/common/TopBar';
import { BottomNav } from '../components/common/BottomNav';
import { useApp } from '../context/AppContext';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export const Cart = () => {
  const navigate = useNavigate();
  const { cart, updateCartQuantity, removeCartItem, subtotal, finalTotal, totalItemsCount } = useApp();

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <StatusBar theme="light" />
      <TopBar title="My Cart" light={true} onBack={() => navigate('/home')} />

      <div className="screen-scrollable-content" style={{ padding: '0 24px 110px' }}>
        {cart.length === 0 ? (
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
                backgroundColor: '#FFF5EE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                color: '#C67C4E'
              }}
            >
              <ShoppingBag size={30} strokeWidth={2} />
            </div>
            <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#2F2D2C', marginBottom: '6px' }}>
              Your Cart is Empty
            </h4>
            <p style={{ fontSize: '13px', maxWidth: '240px', marginBottom: '20px' }}>
              Add some of our freshly roasted coffees to start your order.
            </p>
            <button
              onClick={() => navigate('/home')}
              className="btn-primary"
              style={{ width: 'auto', padding: '0 24px', height: '48px', fontSize: '14px' }}
            >
              Browse Coffees
            </button>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: '13px', color: '#9B9B9B', marginBottom: '16px' }}>
              You have {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} in your bag
            </p>

            {cart.map((item, index) => (
              <div
                key={`${item.coffeeId}-${item.size}-${index}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px',
                  borderRadius: '16px',
                  backgroundColor: '#F9F9F9',
                  marginBottom: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '12px',
                      objectFit: 'cover'
                    }}
                  />
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#2F2D2C', marginBottom: '3px' }}>
                      {item.name}
                    </h4>
                    <p style={{ fontSize: '12px', color: '#9B9B9B', marginBottom: '4px' }}>
                      Size: {item.size} • $ {item.price.toFixed(2)}
                    </p>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#C67C4E' }}>
                      $ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={() => updateCartQuantity(index, -1)}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #EAEAEA',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#2F2D2C'
                    }}
                  >
                    <Minus size={14} />
                  </button>
                  <span style={{ fontSize: '14px', fontWeight: 700, minWidth: '16px', textAlign: 'center' }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(index, 1)}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #EAEAEA',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#2F2D2C'
                    }}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            ))}

            {/* Summary Box */}
            <div
              style={{
                marginTop: '20px',
                padding: '16px',
                borderRadius: '16px',
                backgroundColor: '#F9F9F9'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                <span style={{ color: '#888' }}>Subtotal</span>
                <span style={{ fontWeight: 700, color: '#2F2D2C' }}>$ {subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', fontSize: '14px' }}>
                <span style={{ color: '#888' }}>Estimated Total</span>
                <span style={{ fontWeight: 800, color: '#C67C4E', fontSize: '17px' }}>
                  $ {finalTotal.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => navigate('/order')}
                className="btn-primary"
                style={{ height: '52px', fontSize: '15px' }}
              >
                <span>Proceed to Order</span>
                <ArrowRight size={18} style={{ marginLeft: '8px' }} />
              </button>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};
