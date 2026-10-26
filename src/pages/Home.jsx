import React, { useState } from 'react';
import { StatusBar } from '../components/common/StatusBar';
import { LocationHeader } from '../components/home/LocationHeader';
import { PromoBanner } from '../components/home/PromoBanner';
import { CategoryTabs } from '../components/home/CategoryTabs';
import { CoffeeCard } from '../components/home/CoffeeCard';
import { BottomNav } from '../components/common/BottomNav';
import { COFFEE_PRODUCTS } from '../data/coffeeData';
import { useApp } from '../context/AppContext';
import { Coffee, SearchX } from 'lucide-react';

export const Home = () => {
  const { searchQuery, selectedCategory, setSearchQuery } = useApp();
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  // Filter coffees according to active category and search query
  const filteredProducts = COFFEE_PRODUCTS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      !searchQuery.trim() ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subCategory.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

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
      {/* Scrollable Content Container */}
      <div className="screen-scrollable-content">
        {/* Dark Top Section: Status Bar + Location & Search */}
        <div style={{ background: 'linear-gradient(220deg, #313131 0%, #111111 100%)' }}>
          <StatusBar theme="dark" />
          <LocationHeader onFilterClick={() => setFilterModalOpen(true)} />
        </div>

        {/* Promo Coffee Banner */}
        <PromoBanner />

        {/* Category Tabs: All Coffee, Macchiato, Latte, Americano */}
        <CategoryTabs />

        {/* Product Grid */}
        <div
          style={{
            padding: '0 24px 30px',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px'
          }}
        >
          {filteredProducts.map((coffee) => (
            <CoffeeCard key={coffee.id} coffee={coffee} />
          ))}
        </div>

        {/* Empty Search Result State */}
        {filteredProducts.length === 0 && (
          <div
            style={{
              padding: '40px 24px',
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
                backgroundColor: '#EDEDED',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                color: '#C67C4E'
              }}
            >
              <SearchX size={30} strokeWidth={2} />
            </div>
            <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#2F2D2C', marginBottom: '6px' }}>
              No Coffee Found
            </h4>
            <p style={{ fontSize: '13px', maxWidth: '240px', marginBottom: '16px' }}>
              We couldn't find any coffee matching "{searchQuery}".
            </p>
            <button
              onClick={() => setSearchQuery('')}
              style={{
                padding: '8px 18px',
                borderRadius: '12px',
                backgroundColor: '#C67C4E',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 600
              }}
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Filter Modal */}
      {filterModalOpen && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 80,
            display: 'flex',
            alignItems: 'flex-end'
          }}
          onClick={() => setFilterModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              padding: '24px',
              boxShadow: '0 -8px 30px rgba(0, 0, 0, 0.15)',
              animation: 'slideUp 0.25s ease forwards'
            }}
          >
            <div
              style={{
                width: '40px',
                height: '4px',
                backgroundColor: '#E0E0E0',
                borderRadius: '2px',
                margin: '0 auto 16px'
              }}
            />
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#2F2D2C', marginBottom: '14px' }}>
              Filter Menu
            </h3>
            <p style={{ fontSize: '13px', color: '#9B9B9B', marginBottom: '20px' }}>
              Quickly browse specialty roast and bean types:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
              {['All Blends', 'Dark Roast', 'Medium Roast', 'Single Origin', 'Decaf'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterModalOpen(false)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '12px',
                    backgroundColor: type === 'All Blends' ? '#C67C4E' : '#EDEDED',
                    color: type === 'All Blends' ? '#FFFFFF' : '#2F2D2C',
                    fontSize: '13px',
                    fontWeight: 600
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
            <button
              onClick={() => setFilterModalOpen(false)}
              className="btn-primary"
              style={{ height: '52px' }}
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};
