import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StatusBar } from '../components/common/StatusBar';
import { TopBar } from '../components/common/TopBar';
import { COFFEE_PRODUCTS } from '../data/coffeeData';
import { useApp } from '../context/AppContext';
import { Star, Heart, Bike, Coffee as CoffeeIcon, Milk } from 'lucide-react';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isFavorite, toggleFavorite } = useApp();

  // Find product by id, fallback to first product
  const coffee = COFFEE_PRODUCTS.find((p) => p.id === id) || COFFEE_PRODUCTS[0];

  const [selectedSize, setSelectedSize] = useState('M');
  const [isExpanded, setIsExpanded] = useState(false);

  // Dynamic price calculation based on selected size
  const currentPrice = coffee.sizes ? coffee.sizes[selectedSize] : coffee.price;
  const favorite = isFavorite(coffee.id);

  const handleBuyNow = () => {
    addToCart(coffee, selectedSize, 1);
    navigate('/order');
  };

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
      {/* Top Status Bar (Light) */}
      <StatusBar theme="light" />

      {/* Header with Back, "Detail", and Favorite Icon */}
      <TopBar
        title="Detail"
        light={true}
        rightElement={
          <button
            onClick={() => toggleFavorite(coffee.id)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFFFFF',
              border: '1px solid #EAEAEA',
              color: favorite ? '#ED5151' : '#2F2D2C'
            }}
            aria-label="Toggle favorite"
          >
            <Heart size={20} fill={favorite ? '#ED5151' : 'none'} strokeWidth={2.4} />
          </button>
        }
      />

      {/* Scrollable Content */}
      <div
        className="screen-scrollable-content no-bottom-nav"
        style={{ padding: '0 24px 100px' }}
      >
        {/* Large Coffee Image */}
        <div
          style={{
            width: '100%',
            height: '226px',
            borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: '20px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
          }}
        >
          <img
            src={coffee.image}
            alt={coffee.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>

        {/* Product Title, Subtitle, and Feature Badges */}
        <div style={{ marginBottom: '16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginBottom: '6px'
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#2F2D2C',
                  letterSpacing: '-0.3px',
                  lineHeight: 1.2
                }}
              >
                {coffee.name}
              </h2>
              <p style={{ fontSize: '12px', color: '#9B9B9B', marginTop: '2px' }}>
                Ice / Hot • {coffee.subCategory}
              </p>
            </div>

            {/* Feature Icons Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: '#F9F9F9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#C67C4E'
                }}
                title="Fast Delivery"
              >
                <Bike size={18} strokeWidth={2.2} />
              </div>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: '#F9F9F9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#C67C4E'
                }}
                title="Premium Coffee Beans"
              >
                <CoffeeIcon size={18} strokeWidth={2.2} />
              </div>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: '#F9F9F9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#C67C4E'
                }}
                title="Fresh Steamed Milk"
              >
                <Milk size={18} strokeWidth={2.2} />
              </div>
            </div>
          </div>

          {/* Rating & Reviews */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
            <Star size={16} fill="#FBBE21" color="#FBBE21" />
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#2F2D2C' }}>
              {coffee.rating.toFixed(1)}
            </span>
            <span style={{ fontSize: '12px', color: '#9B9B9B', fontWeight: 400 }}>
              ({coffee.reviewCount})
            </span>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            backgroundColor: '#EAEAEA',
            margin: '16px 0 20px'
          }}
        />

        {/* Description Section with Read More */}
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#2F2D2C',
              marginBottom: '8px'
            }}
          >
            Description
          </h3>
          <p
            style={{
              fontSize: '13px',
              lineHeight: 1.6,
              color: '#9B9B9B'
            }}
          >
            {isExpanded ? coffee.description : `${coffee.description.slice(0, 110)}... `}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              style={{
                color: '#C67C4E',
                fontWeight: 700,
                fontSize: '13px',
                marginLeft: '4px',
                cursor: 'pointer'
              }}
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          </p>
        </div>

        {/* Size Selector */}
        <div>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#2F2D2C',
              marginBottom: '12px'
            }}
          >
            Size
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {['S', 'M', 'L'].map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    height: '43px',
                    borderRadius: '12px',
                    backgroundColor: isSelected ? '#FFF5EE' : '#FFFFFF',
                    border: isSelected ? '1.5px solid #C67C4E' : '1px solid #EAEAEA',
                    color: isSelected ? '#C67C4E' : '#2F2D2C',
                    fontSize: '14px',
                    fontWeight: isSelected ? 700 : 500,
                    transition: 'all 0.15s ease'
                  }}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Bar: Dynamic Price & Buy Now Button */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          boxShadow: '0 -8px 24px rgba(0, 0, 0, 0.06)',
          padding: '16px 24px 22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          zIndex: 40
        }}
      >
        <div>
          <p style={{ fontSize: '12px', color: '#9B9B9B', marginBottom: '2px', fontWeight: 500 }}>
            Price
          </p>
          <p
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#C67C4E',
              letterSpacing: '-0.3px',
              margin: 0
            }}
          >
            $ {currentPrice.toFixed(2)}
          </p>
        </div>

        <button
          onClick={handleBuyNow}
          className="btn-primary"
          style={{
            flex: 1,
            height: '56px',
            fontSize: '16px',
            borderRadius: '16px',
            backgroundColor: '#C67C4E'
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};
