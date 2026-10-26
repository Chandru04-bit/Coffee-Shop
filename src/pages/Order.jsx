import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '../components/common/StatusBar';
import { TopBar } from '../components/common/TopBar';
import { useApp } from '../context/AppContext';
import { PROMO_CODES } from '../data/coffeeData';
import { 
  Edit3, 
  FileText, 
  Minus, 
  Plus, 
  Percent, 
  ChevronRight, 
  Wallet, 
  Banknote, 
  CheckCircle2, 
  AlertCircle,
  X
} from 'lucide-react';

export const Order = () => {
  const navigate = useNavigate();
  const {
    cart,
    updateCartQuantity,
    subtotal,
    deliveryFee,
    discount,
    finalTotal,
    deliveryType,
    setDeliveryType,
    address,
    setAddress,
    appliedPromo,
    setAppliedPromo,
    paymentMethod,
    setPaymentMethod,
    walletBalance,
    placeOrder
  } = useApp();

  // Modals
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressInput, setAddressInput] = useState(address.title);
  const [addressCityInput, setAddressCityInput] = useState(address.subtitle);

  const [isAddingNote, setIsAddingNote] = useState(false);
  const [noteInput, setNoteInput] = useState(address.note || '');

  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleSaveAddress = () => {
    setAddress({
      ...address,
      title: addressInput,
      subtitle: addressCityInput
    });
    setIsEditingAddress(false);
  };

  const handleSaveNote = () => {
    setAddress({
      ...address,
      note: noteInput
    });
    setIsAddingNote(false);
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderConfirmed(true);
      placeOrder();

      // Navigate to delivery screen after 1.4s confirmation popup
      setTimeout(() => {
        setOrderConfirmed(false);
        navigate('/delivery');
      }, 1400);
    }, 800);
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
      <StatusBar theme="light" />
      <TopBar title="Order" light={true} />

      {/* Main Scrollable Area */}
      <div
        className="screen-scrollable-content no-bottom-nav"
        style={{ padding: '0 24px 120px' }}
      >
        {/* Deliver / Pick Up Segmented Control */}
        <div
          style={{
            display: 'flex',
            backgroundColor: '#EDEDED',
            borderRadius: '14px',
            padding: '4px',
            marginBottom: '20px'
          }}
        >
          <button
            onClick={() => setDeliveryType('deliver')}
            style={{
              flex: 1,
              height: '40px',
              borderRadius: '10px',
              backgroundColor: deliveryType === 'deliver' ? '#C67C4E' : 'transparent',
              color: deliveryType === 'deliver' ? '#FFFFFF' : '#2F2D2C',
              fontSize: '14px',
              fontWeight: 700,
              transition: 'all 0.2s ease'
            }}
          >
            Deliver
          </button>
          <button
            onClick={() => setDeliveryType('pickup')}
            style={{
              flex: 1,
              height: '40px',
              borderRadius: '10px',
              backgroundColor: deliveryType === 'pickup' ? '#C67C4E' : 'transparent',
              color: deliveryType === 'pickup' ? '#FFFFFF' : '#2F2D2C',
              fontSize: '14px',
              fontWeight: 700,
              transition: 'all 0.2s ease'
            }}
          >
            Pick Up
          </button>
        </div>

        {/* Delivery / Store Address Section */}
        <div style={{ marginBottom: '20px' }}>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#2F2D2C',
              marginBottom: '10px'
            }}
          >
            {deliveryType === 'deliver' ? 'Delivery Address' : 'Pick Up Store'}
          </h3>

          <div style={{ marginBottom: '10px' }}>
            <h4
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#2F2D2C',
                marginBottom: '4px'
              }}
            >
              {deliveryType === 'deliver' ? address.title : 'Bilzen Central Coffee Roastery'}
            </h4>
            <p style={{ fontSize: '12px', color: '#9B9B9B', lineHeight: 1.4 }}>
              {deliveryType === 'deliver' ? address.subtitle : 'Jl. Merdeka No. 12, Bilzen, Tanjungbalai'}
            </p>
            {deliveryType === 'deliver' && address.note && (
              <p style={{ fontSize: '11px', color: '#C67C4E', marginTop: '4px', fontStyle: 'italic' }}>
                Note: "{address.note}"
              </p>
            )}
          </div>

          {/* Action Pills */}
          {deliveryType === 'deliver' && (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setIsEditingAddress(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '6px 12px',
                  borderRadius: '16px',
                  border: '1px solid #DEDEDE',
                  backgroundColor: '#FFFFFF',
                  color: '#2F2D2C',
                  fontSize: '12px',
                  fontWeight: 600
                }}
              >
                <Edit3 size={13} color="#2F2D2C" />
                <span>Edit Address</span>
              </button>

              <button
                onClick={() => setIsAddingNote(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '6px 12px',
                  borderRadius: '16px',
                  border: '1px solid #DEDEDE',
                  backgroundColor: '#FFFFFF',
                  color: '#2F2D2C',
                  fontSize: '12px',
                  fontWeight: 600
                }}
              >
                <FileText size={13} color="#2F2D2C" />
                <span>{address.note ? 'Edit Note' : 'Add Note'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: '#EAEAEA', marginBottom: '18px' }} />

        {/* Cart Items List */}
        <div style={{ marginBottom: '20px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px 0', color: '#9B9B9B' }}>
              <p style={{ fontSize: '14px', marginBottom: '10px' }}>Your cart is empty.</p>
              <button
                onClick={() => navigate('/home')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '12px',
                  backgroundColor: '#C67C4E',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: 600
                }}
              >
                Browse Menu
              </button>
            </div>
          ) : (
            cart.map((item, index) => (
              <div
                key={`${item.coffeeId}-${item.size}-${index}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '14px'
                }}
              >
                {/* Item Thumbnail & Details */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '12px',
                      objectFit: 'cover'
                    }}
                  />
                  <div>
                    <h4
                      style={{
                        fontSize: '15px',
                        fontWeight: 700,
                        color: '#2F2D2C',
                        marginBottom: '3px'
                      }}
                    >
                      {item.name}
                    </h4>
                    <p style={{ fontSize: '12px', color: '#9B9B9B' }}>
                      {item.subCategory} • Size: {item.size}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button
                    onClick={() => updateCartQuantity(index, -1)}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      border: '1px solid #EAEAEA',
                      backgroundColor: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#2F2D2C'
                    }}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} strokeWidth={2.4} />
                  </button>

                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#2F2D2C',
                      minWidth: '18px',
                      textAlign: 'center'
                    }}
                  >
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => updateCartQuantity(index, 1)}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      border: '1px solid #EAEAEA',
                      backgroundColor: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#2F2D2C'
                    }}
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} strokeWidth={2.4} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Divider */}
        <div style={{ height: '4px', backgroundColor: '#F4F4F4', margin: '0 -24px 18px', width: 'calc(100% + 48px)' }} />

        {/* Discount / Voucher Section */}
        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={() => setIsPromoModalOpen(true)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 16px',
              borderRadius: '14px',
              border: '1px solid #EAEAEA',
              backgroundColor: '#FFFFFF'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: '#FFF5EE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#C67C4E'
                }}
              >
                <Percent size={15} strokeWidth={2.6} />
              </div>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#2F2D2C' }}>
                {appliedPromo ? `${appliedPromo.title} applied` : 'Select discount coupon'}
              </span>
            </div>

            <ChevronRight size={18} color="#2F2D2C" />
          </button>
        </div>

        {/* Payment Summary */}
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#2F2D2C',
              marginBottom: '12px'
            }}
          >
            Payment Summary
          </h3>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '14px',
              marginBottom: '8px'
            }}
          >
            <span style={{ color: '#2F2D2C' }}>Price</span>
            <span style={{ fontWeight: 700, color: '#2F2D2C' }}>$ {subtotal.toFixed(2)}</span>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '14px',
              marginBottom: '8px'
            }}
          >
            <span style={{ color: '#2F2D2C' }}>Delivery Fee</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {deliveryType === 'deliver' ? (
                <>
                  <span style={{ textDecoration: 'line-through', color: '#9B9B9B', fontSize: '13px' }}>
                    $ 2.00
                  </span>
                  <span style={{ fontWeight: 700, color: '#2F2D2C' }}>$ {deliveryFee.toFixed(2)}</span>
                </>
              ) : (
                <span style={{ fontWeight: 700, color: '#36C073' }}>FREE (Pick Up)</span>
              )}
            </div>
          </div>

          {discount > 0 && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '14px',
                marginBottom: '8px',
                color: '#36C073'
              }}
            >
              <span>Discount</span>
              <span style={{ fontWeight: 700 }}>- $ {discount.toFixed(2)}</span>
            </div>
          )}

          <div
            style={{
              height: '1px',
              backgroundColor: '#EAEAEA',
              margin: '12px 0'
            }}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '15px'
            }}
          >
            <span style={{ fontWeight: 600, color: '#2F2D2C' }}>Total Payment</span>
            <span style={{ fontWeight: 800, color: '#C67C4E', fontSize: '17px' }}>
              $ {finalTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Docked Bottom Bar: Payment Method & Order Button */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          boxShadow: '0 -8px 24px rgba(0, 0, 0, 0.08)',
          padding: '16px 24px 22px',
          zIndex: 40
        }}
      >
        {/* Payment selector row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#FFF5EE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#C67C4E'
              }}
            >
              {paymentMethod === 'cash' ? <Banknote size={17} /> : <Wallet size={17} />}
            </div>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#2F2D2C', margin: 0 }}>
                {paymentMethod === 'cash' ? 'Cash' : 'Coffee Wallet'}
              </p>
              <p style={{ fontSize: '11px', color: '#9B9B9B', margin: 0 }}>
                {paymentMethod === 'cash'
                  ? `$ ${finalTotal.toFixed(2)}`
                  : `Balance: $ ${walletBalance.toFixed(2)}`}
              </p>
            </div>
          </div>

          {/* Toggle payment method button */}
          <button
            onClick={() => setPaymentMethod(paymentMethod === 'cash' ? 'wallet' : 'cash')}
            style={{
              padding: '4px 10px',
              borderRadius: '12px',
              backgroundColor: '#EDEDED',
              fontSize: '12px',
              fontWeight: 600,
              color: '#2F2D2C'
            }}
          >
            Switch to {paymentMethod === 'cash' ? 'Wallet' : 'Cash'}
          </button>
        </div>

        {/* Order Submit Button */}
        <button
          onClick={handlePlaceOrder}
          disabled={cart.length === 0 || isSubmitting}
          className="btn-primary"
          style={{
            height: '56px',
            fontSize: '16px',
            fontWeight: 700,
            borderRadius: '16px',
            backgroundColor: '#C67C4E'
          }}
        >
          {isSubmitting ? 'Processing...' : 'Order'}
        </button>
      </div>

      {/* Edit Address Modal */}
      {isEditingAddress && (
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
          onClick={() => setIsEditingAddress(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              padding: '24px',
              animation: 'slideUp 0.25s ease'
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#2F2D2C', marginBottom: '14px' }}>
              Edit Delivery Address
            </h3>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#888', display: 'block', marginBottom: '4px' }}>
              Street Address
            </label>
            <input
              type="text"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '12px',
                border: '1px solid #DEDEDE',
                marginBottom: '14px',
                fontSize: '14px'
              }}
            />
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#888', display: 'block', marginBottom: '4px' }}>
              City & District
            </label>
            <input
              type="text"
              value={addressCityInput}
              onChange={(e) => setAddressCityInput(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '12px',
                border: '1px solid #DEDEDE',
                marginBottom: '20px',
                fontSize: '14px'
              }}
            />
            <button
              onClick={handleSaveAddress}
              className="btn-primary"
              style={{ height: '50px' }}
            >
              Save Address
            </button>
          </div>
        </div>
      )}

      {/* Add Note Modal */}
      {isAddingNote && (
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
          onClick={() => setIsAddingNote(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              padding: '24px',
              animation: 'slideUp 0.25s ease'
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#2F2D2C', marginBottom: '14px' }}>
              Delivery Instructions
            </h3>
            <textarea
              rows={3}
              placeholder="e.g. Leave by front door, ring bell..."
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '12px',
                border: '1px solid #DEDEDE',
                marginBottom: '20px',
                fontSize: '14px',
                resize: 'none'
              }}
            />
            <button
              onClick={handleSaveNote}
              className="btn-primary"
              style={{ height: '50px' }}
            >
              Save Note
            </button>
          </div>
        </div>
      )}

      {/* Promo Code Modal */}
      {isPromoModalOpen && (
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
          onClick={() => setIsPromoModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              padding: '24px',
              animation: 'slideUp 0.25s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#2F2D2C' }}>
                Select Promo Voucher
              </h3>
              <button onClick={() => setIsPromoModalOpen(false)}>
                <X size={20} color="#888" />
              </button>
            </div>

            {PROMO_CODES.map((promo) => (
              <div
                key={promo.code}
                onClick={() => {
                  setAppliedPromo(promo);
                  setIsPromoModalOpen(false);
                }}
                style={{
                  padding: '14px',
                  borderRadius: '14px',
                  border: appliedPromo?.code === promo.code ? '2px solid #C67C4E' : '1px solid #EAEAEA',
                  backgroundColor: appliedPromo?.code === promo.code ? '#FFF5EE' : '#FFFFFF',
                  marginBottom: '10px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, fontSize: '14px', color: '#2F2D2C' }}>
                    {promo.title}
                  </span>
                  <span style={{ fontWeight: 700, fontSize: '14px', color: '#C67C4E' }}>
                    Save ${promo.discountAmount.toFixed(2)}
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>
                  {promo.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Order Confirmed Animated Popup */}
      {orderConfirmed && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(6px)',
            zIndex: 90,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '30px'
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '32px 24px',
              textAlign: 'center',
              width: '100%',
              maxWidth: '310px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              animation: 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#E8F8EE',
                color: '#36C073',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}
            >
              <CheckCircle2 size={36} strokeWidth={2.5} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#2F2D2C', marginBottom: '6px' }}>
              Order Placed!
            </h3>
            <p style={{ fontSize: '13px', color: '#9B9B9B', lineHeight: 1.5 }}>
              Your barista is preparing your freshly brewed coffee. Heading to delivery tracking...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
