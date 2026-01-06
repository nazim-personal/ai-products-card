import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Try to load .env.local manually since dotenv doesn't override by default if not configured
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = dotenv.parse(fs.readFileSync(envPath));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
}

async function listModels() {
  const apiKey = process.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.error('❌ No VITE_GEMINI_API_KEY found in .env.local');
    process.exit(1);
  }

  console.log('🔑 Using API Key:', apiKey.substring(0, 10) + '...');

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    // Note: listModels is not directly exposed on the helper, we might need to hit the REST API directly
    // or just try to generate with a few known models.

    // Let's try a direct REST call to list models to be sure
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();

    if (data.error) {
      console.error('❌ API Error:', data.error);
    } else if (data.models) {
      console.log('✅ Available Models:');
      data.models.forEach(m => {
        if (m.supportedGenerationMethods.includes('generateContent')) {
          console.log(`- ${m.name} (${m.displayName})`);
        }
      });
    } else {
      console.log('⚠️ No models found or unexpected response:', data);
    }

  } catch (error) {
    console.error('❌ Script Error:', error);
  }
}

listModels();
