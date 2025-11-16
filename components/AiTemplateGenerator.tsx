
import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { Template, TemplateType } from '../types';
import { Sparkles, CheckCircle, X } from './Icons';

interface AiTemplateGeneratorProps {
  onTemplatesAdded: (newTemplates: Template[]) => void;
}

const AiTemplateGenerator: React.FC<AiTemplateGeneratorProps> = ({ onTemplatesAdded }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const getRandomTemplateType = (): TemplateType => {
    const types = Object.values(TemplateType);
    return types[Math.floor(Math.random() * types.length)];
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setStatus(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      
      const responseSchema = {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: {
              type: Type.STRING,
              description: 'The creative name of the template.',
            },
            description: {
              type: Type.STRING,
              description: 'A short, concise description of the template\'s purpose.',
            },
          },
          required: ['name', 'description'],
        },
      };

      const prompt = "Generate a list of 5 unique and free project management templates that could be found on Canva, specifically tailored for telecom projects. For each template, provide a creative 'name' and a concise 'description' of its purpose. Ensure the output is a valid JSON array of objects.";

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: responseSchema,
        },
      });
      
      const generatedData = JSON.parse(response.text);

      if (!Array.isArray(generatedData)) {
          throw new Error("AI did not return a valid array.");
      }

      const newTemplates: Template[] = generatedData.map((item: { name: string; description: string }, index: number) => ({
        id: Date.now() + index,
        name: item.name,
        description: item.description,
        category: 'Telecom',
        isPremium: false,
        type: getRandomTemplateType(),
        previewImage: `https://picsum.photos/seed/ai-${Date.now() + index}/400/300`,
        downloadUrl: '#',
      }));

      onTemplatesAdded(newTemplates);
      setStatus({ type: 'success', message: `${newTemplates.length} templates added successfully!` });

    } catch (error) {
      console.error("Error generating templates:", error);
      setStatus({ type: 'error', message: 'Failed to generate templates. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
       {status && (
        <div className={`p-4 rounded-md flex justify-between items-center ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <div className="flex items-center gap-2">
                {status.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <X className="w-5 h-5" />}
                <p>{status.message}</p>
            </div>
            <button onClick={() => setStatus(null)} type="button">
                <X className="w-5 h-5" />
            </button>
        </div>
      )}
      <p className="text-sm text-slate-600">
        Automatically find and import 5 free telecom project management templates from Canva.
        The AI will generate names and descriptions, and they will be added to the 'Telecom' category.
      </p>
      <div className="flex justify-start">
        <button
          type="button"
          onClick={handleGenerate}
          disabled={isLoading}
          className="inline-flex items-center justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Templates
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AiTemplateGenerator;
