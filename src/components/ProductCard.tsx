import React from 'react';
import { type ProductDetails } from '../services/aiService';

interface ProductCardProps {
  details: ProductDetails;
}

const ProductCard: React.FC<ProductCardProps> = ({ details }) => {
  return (
    <div
      style={{
        background: 'var(--card-bg)',
        padding: '2.5rem',
        borderRadius: '20px',
        boxShadow: 'var(--glass-shadow)',
        border: 'var(--glass-border)',
        backdropFilter: 'blur(12px)',
        width: '100%',
        textAlign: 'left',
        animation: 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 40px 0 rgba(0, 0, 0, 0.5)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--glass-shadow)';
      }}
    >
      <h2
        style={{
          marginTop: 0,
          background: 'var(--accent-gradient)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '2rem',
          marginBottom: '1rem',
          animation: 'fadeIn 0.6s ease-out 0.1s both'
        }}
      >
        {details.title}
      </h2>

      <p
        style={{
          lineHeight: '1.6',
          color: '#e2e8f0',
          fontSize: '1.1rem',
          marginBottom: '2rem',
          animation: 'fadeIn 0.6s ease-out 0.2s both'
        }}
      >
        {details.description}
      </p>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.8rem',
        animation: 'fadeIn 0.6s ease-out 0.3s both'
      }}>
        {details.keywords.map((keyword, index) => (
          <span
            key={index}
            style={{
              background: 'rgba(99, 102, 241, 0.2)',
              color: '#a5b4fc',
              padding: '0.4rem 1rem',
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: 500,
              border: '1px solid rgba(99, 102, 241, 0.3)',
              transition: 'all 0.2s ease',
              cursor: 'default',
              animation: `fadeIn 0.4s ease-out ${0.4 + index * 0.1}s both`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(99, 102, 241, 0.3)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(99, 102, 241, 0.2)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            #{keyword}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
