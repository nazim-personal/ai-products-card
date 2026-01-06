import Groq from 'groq-sdk';

export interface ProductDetails {
  title: string;
  description: string;
  keywords: string[];
}

export const generateProductDetails = async (name: string, category: string): Promise<ProductDetails> => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    throw new Error('No Groq API key found. Please add VITE_GROQ_API_KEY to your .env file.');
  }

  try {
    const groq = new Groq({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful marketing assistant that generates premium product descriptions. Return JSON only."
        },
        {
          role: "user",
          content: `Generate a premium product card for a product named "${name}" in the category "${category}".
          Return a JSON object with the following structure:
          {
            "title": "A catchy, premium title for the product",
            "description": "A sophisticated, 2-sentence marketing description",
            "keywords": ["5", "relevant", "one-word", "tags"]
          }`
        }
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0].message.content;
    if (!content) throw new Error('No content received from Groq');

    return JSON.parse(content) as ProductDetails;
  } catch (error: unknown) {
    console.error('Groq API Error:', error);
    throw error;
  }
};
