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
        maxWidth: '500px',
        textAlign: 'left',
        animation: 'fadeIn 0.6s ease-out'
      }}
    >
      <h2
        style={{
          marginTop: 0,
          background: 'var(--accent-gradient)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '2rem',
          marginBottom: '1rem'
        }}
      >
        {details.title}
      </h2>

      <p
        style={{
          lineHeight: '1.6',
          color: '#e2e8f0',
          fontSize: '1.1rem',
          marginBottom: '2rem'
        }}
      >
        {details.description}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
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
              border: '1px solid rgba(99, 102, 241, 0.3)'
            }}
          >
            #{keyword}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
