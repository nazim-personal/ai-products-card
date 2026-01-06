import { useState } from 'react';
import ProductForm from './components/ProductForm';
import ProductCard from './components/ProductCard';
import { generateProductDetails, type ProductDetails } from './services/aiService';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState<ProductDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (name: string, category: string) => {
    setIsLoading(true);
    setError(null);
    setProductData(null);

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
    <>
      <h1>AI Product Generator</h1>
      <p style={{ marginBottom: '2.5rem', fontSize: '1.2rem', color: '#94a3b8' }}>
        Transform your ideas into premium product descriptions instantly.
      </p>

      <ProductForm onSubmit={handleGenerate} isLoading={isLoading} />

      {error && (
        <div style={{ color: '#ef4444', marginTop: '1rem' }}>
          {error}
        </div>
      )}

      {productData && <ProductCard details={productData} />}
    </>
  );
}

export default App;
