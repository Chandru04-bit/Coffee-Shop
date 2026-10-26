import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Plus, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CoffeeCard = ({ coffee }) => {
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, isFavorite } = useApp();

  const handleCardClick = () => {
    navigate(`/detail/${coffee.id}`);
  };

  const handleAddClick = (e) => {
    e.stopPropagation();
    addToCart(coffee, 'M', 1);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(coffee.id);
  };

  const favorite = isFavorite(coffee.id);

  return (
    <div
      onClick={handleCardClick}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        padding: '8px',
        boxShadow: '0 4px 18px rgba(0, 0, 0, 0.04)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
      }}
      className="coffee-card-hover"
    >
      {/* Image container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '132px',
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: '#F0F0F0'
        }}
      >
        <img
          src={coffee.image}
          alt={coffee.name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />

        {/* Rating badge overlaid on top-left */}
        <div
          style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            background: 'rgba(0, 0, 0, 0.35)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            padding: '3px 7px',
            borderRadius: '10px',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 700
          }}
        >
          <Star size={11} fill="#FBBE21" color="#FBBE21" />
          <span>{coffee.rating.toFixed(1)}</span>
        </div>

        {/* Favorite heart on top-right */}
        <button
          onClick={handleFavoriteClick}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: favorite ? '#ED5151' : '#FFFFFF',
            transition: 'transform 0.15s ease'
          }}
          aria-label={favorite ? 'Remove favorite' : 'Add favorite'}
        >
          <Heart size={14} fill={favorite ? '#ED5151' : 'none'} strokeWidth={2.4} />
        </button>
      </div>

      {/* Coffee details */}
      <div style={{ padding: '10px 4px 4px' }}>
        <h3
          style={{
            fontSize: '15px',
            fontWeight: 700,
            color: '#2F2D2C',
            lineHeight: 1.25,
            marginBottom: '3px',
            letterSpacing: '-0.2px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {coffee.name}
        </h3>
        <p
          style={{
            fontSize: '12px',
            color: '#9B9B9B',
            fontWeight: 400,
            marginBottom: '10px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {coffee.subCategory}
        </p>

        {/* Price and Add button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 'auto'
          }}
        >
          <span
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#2F2D2C',
              letterSpacing: '-0.3px'
            }}
          >
            $ {coffee.price.toFixed(2)}
          </span>

          <button
            onClick={handleAddClick}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              backgroundColor: '#C67C4E',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 3px 10px rgba(198, 124, 78, 0.35)'
            }}
            aria-label={`Add ${coffee.name} to cart`}
          >
            <Plus size={18} strokeWidth={2.6} />
          </button>
        </div>
      </div>
    </div>
  );
};
