import React, { useState } from 'react';

interface ProductFormProps {
  onSubmit: (name: string, category: string) => void;
  isLoading: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, isLoading }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && category.trim()) {
      onSubmit(name, category);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: 'var(--card-bg)',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: 'var(--glass-shadow)',
        border: 'var(--glass-border)',
        backdropFilter: 'blur(10px)',
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label htmlFor="productName">Product Name</label>
        <input
          id="productName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Super Sneakers"
          required
          disabled={isLoading}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label htmlFor="category">Category</label>
        <input
          id="category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g. Footwear"
          required
          disabled={isLoading}
        />
      </div>

      <button type="submit" disabled={isLoading || !name || !category}>
        {isLoading ? 'Generating...' : 'Generate Details'}
      </button>
    </form>
  );
};

export default ProductForm;
