import React from 'react';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LocationHeader = ({ onFilterClick }) => {
  const { searchQuery, setSearchQuery, address } = useApp();

  return (
    <div
      style={{
        background: 'linear-gradient(220deg, #313131 0%, #111111 100%)',
        padding: '16px 24px 28px',
        color: '#FFFFFF'
      }}
    >
      {/* Location selector row */}
      <div style={{ marginBottom: '20px' }}>
        <p
          style={{
            fontSize: '12px',
            color: '#B7B7B7',
            marginBottom: '4px',
            fontWeight: 400
          }}
        >
          Location
        </p>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: '#DDDDDD',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
          title="Change location"
        >
          <span>{address?.city || 'Bilzen, Tanjungbalai'}</span>
          <ChevronDown size={14} strokeWidth={2.5} color="#DDDDDD" />
        </button>
      </div>

      {/* Search Bar + Filter Icon Button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: '#2A2A2A',
            borderRadius: '14px',
            padding: '12px 16px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <Search size={18} color="#989898" strokeWidth={2.2} />
          <input
            type="text"
            placeholder="Search coffee"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: 'transparent',
              color: '#FFFFFF',
              fontSize: '14px',
              width: '100%',
              fontWeight: 400
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                color: '#888',
                fontSize: '12px',
                padding: '2px 6px',
                borderRadius: '50%',
                background: '#3A3A3A'
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter button */}
        <button
          onClick={onFilterClick}
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '14px',
            backgroundColor: '#C67C4E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            flexShrink: 0,
            boxShadow: '0 4px 14px rgba(198, 124, 78, 0.4)'
          }}
          aria-label="Filter"
        >
          <SlidersHorizontal size={18} strokeWidth={2.4} />
        </button>
      </div>
    </div>
  );
};
