import { useState } from 'react';
import ProductForm from './components/ProductForm';
import ProductCard from './components/ProductCard';
import { generateProductDetails, type ProductDetails } from './services/aiService';


function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState<ProductDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (name: string, category: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const details = await generateProductDetails(name, category);
      setProductData(details);
    } catch (err) {
      setError('Failed to generate details. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2rem',
      width: '100%'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1>AI Product Generator</h1>
        <p style={{ marginBottom: '1rem', fontSize: '1.2rem', color: '#94a3b8' }}>
          Transform your ideas into premium product descriptions instantly.
        </p>
      </div>

      <ProductForm onSubmit={handleGenerate} isLoading={isLoading} />

      {error && (
        <div style={{
          color: '#ef4444',
          padding: '1rem',
          background: 'rgba(239, 68, 68, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          width: '100%',
          maxWidth: '500px'
        }}>
          {error}
        </div>
      )}

      {/* Reserve space for the card to prevent layout shift */}
      <div style={{
        minHeight: isLoading || productData ? '300px' : '0',
        width: '100%',
        maxWidth: '500px',
        transition: 'min-height 0.3s ease'
      }}>
        {isLoading && (
          <div style={{
            background: 'var(--card-bg)',
            padding: '2.5rem',
            borderRadius: '20px',
            boxShadow: 'var(--glass-shadow)',
            border: 'var(--glass-border)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            animation: 'pulse 1.5s ease-in-out infinite'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              border: '3px solid rgba(99, 102, 241, 0.3)',
              borderTop: '3px solid #6366f1',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <p style={{ color: '#94a3b8' }}>Generating amazing content...</p>
          </div>
        )}

        {!isLoading && productData && <ProductCard details={productData} />}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}

export default App;
