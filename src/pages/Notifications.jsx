import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '../components/common/StatusBar';
import { TopBar } from '../components/common/TopBar';
import { BottomNav } from '../components/common/BottomNav';
import { Bike, Tag, Sparkles, CheckCircle } from 'lucide-react';

export const Notifications = () => {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      title: 'Courier is On The Way!',
      desc: 'Johan Bleas is riding to your address with your hot Caffe Mocha.',
      time: '5 mins ago',
      icon: Bike,
      color: '#C67C4E',
      bg: '#FFF5EE',
      link: '/delivery'
    },
    {
      id: 2,
      title: 'Promo Activated: Buy 1 Get 1 FREE',
      desc: 'Use voucher code BOGO2026 on your next order before midnight.',
      time: '1 hour ago',
      icon: Tag,
      color: '#ED5151',
      bg: '#FFF0F0',
      link: '/order'
    },
    {
      id: 3,
      title: 'Order Confirmed',
      desc: 'Your payment was successfully received and roasted fresh.',
      time: '2 hours ago',
      icon: CheckCircle,
      color: '#36C073',
      bg: '#E8F8EE',
      link: '/delivery'
    }
  ];

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
      <TopBar title="Notifications" light={true} onBack={() => navigate('/home')} />

      <div className="screen-scrollable-content" style={{ padding: '0 24px 90px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '6px' }}>
          {notifications.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => navigate(item.link)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '14px',
                  borderRadius: '16px',
                  backgroundColor: '#F9F9F9',
                  cursor: 'pointer'
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    backgroundColor: item.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.color,
                    flexShrink: 0
                  }}
                >
                  <Icon size={20} strokeWidth={2.4} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#2F2D2C' }}>
                      {item.title}
                    </h4>
                    <span style={{ fontSize: '11px', color: '#B7B7B7' }}>{item.time}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#888888', lineHeight: 1.4 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};
