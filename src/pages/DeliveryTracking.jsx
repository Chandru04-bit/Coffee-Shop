import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '../components/common/StatusBar';
import { MapCanvas } from '../components/delivery/MapCanvas';
import { useApp } from '../context/AppContext';
import { COURIER_INFO } from '../data/coffeeData';
import { 
  ChevronLeft, 
  Phone, 
  MessageSquare, 
  Bike, 
  Check, 
  MicOff, 
  Volume2, 
  PhoneOff 
} from 'lucide-react';

export const DeliveryTracking = () => {
  const navigate = useNavigate();
  const { address, showToast } = useApp();
  const [callActive, setCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);

  const handleRecenter = () => {
    showToast('Map centered on courier live position', 'info');
  };

  const handleCall = () => {
    setCallActive(true);
  };

  const handleEndCall = () => {
    setCallActive(false);
    showToast('Call ended with Johan Bleas', 'info');
  };

  const handleChat = () => {
    showToast('Chat opened with Courier Johan Bleas', 'info');
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
      {/* Floating Status Bar & Back Button over Map */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 40
        }}
      >
        <StatusBar theme="light" />
        
        {/* Top bar with back button */}
        <div style={{ padding: '0 20px', display: 'flex', alignItems: 'center', height: '48px' }}>
          <button
            onClick={() => navigate('/home')}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#2F2D2C'
            }}
            aria-label="Back to home"
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Map Upper Section */}
      <MapCanvas onRecenter={handleRecenter} />

      {/* Bottom Sheet / Delivery Details Card */}
      <div
        style={{
          position: 'relative',
          marginTop: '-24px',
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.08)',
          padding: '12px 24px 34px',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 30,
          flex: 1
        }}
      >
        {/* Drag handle */}
        <div
          style={{
            width: '44px',
            height: '4px',
            backgroundColor: '#E0E0E0',
            borderRadius: '2px',
            margin: '0 auto 16px'
          }}
        />

        {/* Estimated Time Header */}
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 800,
              color: '#2F2D2C',
              marginBottom: '4px',
              letterSpacing: '-0.3px'
            }}
          >
            10 minutes left
          </h2>
          <p style={{ fontSize: '12px', color: '#888' }}>
            Delivery to{' '}
            <span style={{ color: '#2F2D2C', fontWeight: 600 }}>
              {address?.title || 'Jl. Kpg Sutoyo No. 620'}
            </span>
          </p>
        </div>

        {/* 4-Step Progress Indicator Bar */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
          {/* Step 1: Completed */}
          <div
            style={{
              flex: 1,
              height: '5px',
              backgroundColor: '#36C073',
              borderRadius: '3px'
            }}
          />
          {/* Step 2: Completed */}
          <div
            style={{
              flex: 1,
              height: '5px',
              backgroundColor: '#36C073',
              borderRadius: '3px'
            }}
          />
          {/* Step 3: Active (On the way) */}
          <div
            style={{
              flex: 1,
              height: '5px',
              backgroundColor: '#36C073',
              borderRadius: '3px'
            }}
          />
          {/* Step 4: Pending (Delivered) */}
          <div
            style={{
              flex: 1,
              height: '5px',
              backgroundColor: '#E8E8E8',
              borderRadius: '3px'
            }}
          />
        </div>

        {/* Delivery Status Capsule Card */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '12px 14px',
            borderRadius: '14px',
            border: '1px solid #EAEAEA',
            backgroundColor: '#FAFAFA',
            marginBottom: '18px'
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: '#FFF5EE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#C67C4E',
              flexShrink: 0
            }}
          >
            <Bike size={24} strokeWidth={2.4} />
          </div>

          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#2F2D2C', marginBottom: '2px' }}>
              Delivered your order
            </h4>
            <p style={{ fontSize: '11px', color: '#9B9B9B', lineHeight: 1.35 }}>
              We will deliver your coffee to the specified address with speed and warmth.
            </p>
          </div>
        </div>

        {/* Courier Profile Section */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 'auto'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src={COURIER_INFO.avatar}
              alt={COURIER_INFO.name}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '14px',
                objectFit: 'cover'
              }}
            />
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#2F2D2C', marginBottom: '2px' }}>
                {COURIER_INFO.name}
              </h4>
              <p style={{ fontSize: '12px', color: '#9B9B9B' }}>
                {COURIER_INFO.role}
              </p>
            </div>
          </div>

          {/* Action buttons: Call & Message */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handleChat}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                border: '1px solid #EAEAEA',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2F2D2C',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)'
              }}
              aria-label="Send message to courier"
            >
              <MessageSquare size={18} strokeWidth={2.2} />
            </button>

            <button
              onClick={handleCall}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: '#FFF5EE',
                border: '1.5px solid #C67C4E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#C67C4E',
                boxShadow: '0 4px 12px rgba(198, 124, 78, 0.2)'
              }}
              aria-label="Call courier"
            >
              <Phone size={18} strokeWidth={2.4} />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Phone Call Modal */}
      {callActive && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(15, 15, 17, 0.95)',
            backdropFilter: 'blur(10px)',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '60px 30px 48px',
            color: '#FFFFFF'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '13px', color: '#888', marginBottom: '8px' }}>
              Calling Courier...
            </p>
            <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '6px' }}>
              {COURIER_INFO.name}
            </h3>
            <p style={{ fontSize: '14px', color: '#C67C4E' }}>
              {COURIER_INFO.vehicle}
            </p>
          </div>

          {/* Courier avatar circle */}
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: '0 0 40px rgba(198, 124, 78, 0.4)',
              border: '3px solid #C67C4E'
            }}
          >
            <img
              src={COURIER_INFO.avatar}
              alt={COURIER_INFO.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Call Controls */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', gap: '24px' }}>
              <button
                onClick={() => setIsMuted(!isMuted)}
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  backgroundColor: isMuted ? '#FFFFFF' : 'rgba(255, 255, 255, 0.15)',
                  color: isMuted ? '#111' : '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <MicOff size={22} />
              </button>
              <button
                onClick={() => setIsSpeaker(!isSpeaker)}
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  backgroundColor: isSpeaker ? '#FFFFFF' : 'rgba(255, 255, 255, 0.15)',
                  color: isSpeaker ? '#111' : '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Volume2 size={22} />
              </button>
            </div>

            {/* End Call Button */}
            <button
              onClick={handleEndCall}
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#ED5151',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(237, 81, 81, 0.4)'
              }}
              aria-label="End call"
            >
              <PhoneOff size={28} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
