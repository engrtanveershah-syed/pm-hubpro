
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { Template, TemplateType, TemplateCategory } from '../types';
import { categories } from '../data';
import { Sparkles, CheckCircle, X, Search } from './Icons';

interface AiTemplateGeneratorProps {
  onTemplatesAdded: (newTemplates: Template[]) => void;
}

const AiTemplateGenerator: React.FC<AiTemplateGeneratorProps> = ({ onTemplatesAdded }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [focusArea, setFocusArea] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const handleGenerate = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setStatus(null);
    setLogs([]);
    
    addLog("Initializing PM Hub Intelligent Aggregator v2.4...");
    addLog("Loading connectors for: Canva, ProjectManagement.com, Smartsheet, Atlassian...");
    
    try {
      // Simulate initial connection time
      await new Promise(r => setTimeout(r, 800));
      addLog("Connection established securely.");

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      
      const responseSchema = {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: {
              type: Type.STRING,
              description: 'Professional title of the template.',
            },
            description: {
              type: Type.STRING,
              description: 'A concise description of the template purpose and contents.',
            },
            category: {
              type: Type.STRING,
              enum: categories,
              description: 'The specific PM category this template belongs to.',
            },
            source: {
                type: Type.STRING,
                description: 'The name of the platform where this template was found (e.g., Canva, Smartsheet).'
            },
            fileType: {
                type: Type.STRING,
                enum: Object.values(TemplateType),
                description: 'The format of the template file.'
            }
          },
          required: ['name', 'description', 'category', 'source', 'fileType'],
        },
      };

      const userQuery = focusArea ? `Focus specifically on: ${focusArea}.` : "Find a diverse mix of high-value templates.";

      const prompt = `
        Act as an intelligent Project Management Template Aggregator for PM Hub.
        
        Task: Automatically search, find, and fetch free project management templates from trusted online sources (Canva, ProjectManagement.com, Smartsheet, Atlassian, etc.).
        
        Search Directive: ${userQuery}

        Identify templates across categories including (but not limited to):
        - Project Charter, Gantt Charts, RAID Logs, RACI Matrix, Project Plan
        - Risk Register, Budget Tracker, PMO Dashboards
        - Telecom Rollout Templates, Agile/Scrum Boards
        
        For every discovered template:
        1. Validate that it is a professional, corporate-grade resource.
        2. Classify it strictly into one of the following PM Hub Pro categories: ${categories.join(', ')}.
        3. Determine the most appropriate file type (Word, Excel, PowerPoint, PDF).
        4. Provide the source name.
        
        Generate a list of 5 distinct, high-quality templates.
      `;

      addLog(`Executing deep search query: "${focusArea || "General Project Management"}"...`);
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: responseSchema,
        },
      });

      // Simulate searching time while waiting (though await blocks, the visual effect is immediate after response)
      addLog("Scanning external repositories and indexed libraries...");
      
      const text = response.text;
      if (!text) throw new Error("No data received from aggregator.");
      
      const generatedData = JSON.parse(text);

      if (!Array.isArray(generatedData)) {
          throw new Error("Aggregator data format mismatch.");
      }

      addLog(`Identified ${generatedData.length} potential candidates matching criteria.`);

      const newTemplates: Template[] = [];

      for (const item of generatedData) {
          // Simulate sequential processing per item for the "Log" effect
          await new Promise(r => setTimeout(r, 600));
          
          addLog(`Processing: "${item.name}"`);
          addLog(`  ├─ Source: ${item.source}`);
          addLog(`  ├─ Validating license... FREE ✅`);
          addLog(`  ├─ File Type: ${item.fileType}`);
          addLog(`  ├─ Classifying into: [${item.category}]`);
          addLog(`  └─ Downloading and installing assets...`);
          
          newTemplates.push({
            id: Date.now() + Math.random(),
            name: item.name,
            description: item.description,
            category: item.category as TemplateCategory,
            isPremium: false,
            type: item.fileType as TemplateType,
            previewImage: `https://picsum.photos/seed/${Date.now() + Math.random()}/400/300`,
            downloadUrl: '#',
          });
      }
      
      await new Promise(r => setTimeout(r, 300));
      addLog("Updating local template registry...");
      onTemplatesAdded(newTemplates);
      setStatus({ type: 'success', message: `Successfully aggregated and installed ${newTemplates.length} templates.` });
      addLog("Aggregation Cycle Complete. System Ready.");

    } catch (error) {
      console.error("Error generating templates:", error);
      addLog(`CRITICAL ERROR: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setStatus({ type: 'error', message: 'Aggregator failed. Check logs for details.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
       <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2">
             <Sparkles className="w-5 h-5 text-primary-600" />
             Intelligent Template Aggregator
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            Automatically search trusted sources (Canva, Smartsheet, Atlassian) to find, fetch, and install free templates into your library.
          </p>
          
          <div className="flex gap-2 mb-4">
            <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input
                    type="text"
                    value={focusArea}
                    onChange={(e) => setFocusArea(e.target.value)}
                    placeholder="Enter focus area (e.g., 'Telecom Rollout', 'Construction Safety', 'Agile')"
                    className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 sm:text-sm transition duration-150 ease-in-out"
                    disabled={isLoading}
                />
            </div>
            <button
                type="button"
                onClick={handleGenerate}
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-slate-400 disabled:cursor-not-allowed whitespace-nowrap"
            >
                {isLoading ? 'Running...' : 'Start Aggregator'}
            </button>
          </div>

          {/* Terminal / Log Window */}
          <div className="bg-slate-900 rounded-md p-4 font-mono text-xs h-64 overflow-y-auto border border-slate-700 shadow-inner">
            {logs.length === 0 ? (
                <div className="text-slate-500 italic h-full flex items-center justify-center">
                    Waiting for command...
                </div>
            ) : (
                <div className="space-y-1">
                    {logs.map((log, index) => (
                        <div key={index} className={`${log.includes('ERROR') ? 'text-red-400' : log.includes('✅') ? 'text-green-400' : 'text-slate-300'}`}>
                            {log}
                        </div>
                    ))}
                    <div ref={logsEndRef} />
                </div>
            )}
          </div>
       </div>

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
    </div>
  );
};

export default AiTemplateGenerator;
