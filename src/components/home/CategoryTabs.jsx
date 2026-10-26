import React from 'react';
import { CATEGORIES } from '../../data/coffeeData';
import { useApp } from '../../context/AppContext';

export const CategoryTabs = () => {
  const { selectedCategory, setSelectedCategory } = useApp();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '24px 24px 16px',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
      {CATEGORIES.map((cat) => {
        const isActive = selectedCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              padding: '8px 14px',
              borderRadius: '12px',
              backgroundColor: isActive ? '#C67C4E' : '#EDEDED',
              color: isActive ? '#FFFFFF' : '#2F2D2C',
              fontSize: '13px',
              fontWeight: isActive ? 700 : 500,
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
              boxShadow: isActive ? '0 4px 12px rgba(198, 124, 78, 0.25)' : 'none',
              flexShrink: 0
            }}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
};
