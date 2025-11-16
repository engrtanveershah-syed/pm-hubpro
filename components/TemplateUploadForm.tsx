
import React, { useState } from 'react';
import { Template, TemplateCategory, TemplateType } from '../types';
import { categories } from '../data';
import { CheckCircle, X } from './Icons';

interface TemplateUploadFormProps {
  onTemplateAdd: (newTemplate: Template) => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = {
  'application/pdf': TemplateType.PDF,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': TemplateType.WORD,
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': TemplateType.EXCEL,
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': TemplateType.POWERPOINT,
};

const getTemplateTypeFromFile = (file: File): TemplateType | null => {
    return ALLOWED_FILE_TYPES[file.type as keyof typeof ALLOWED_FILE_TYPES] || null;
}

const TemplateUploadForm: React.FC<TemplateUploadFormProps> = ({ onTemplateAdd }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TemplateCategory>(categories[0]);
  const [file, setFile] = useState<File | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(null);
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
        setFile(null);
        return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setStatus({ type: 'error', message: `File is too large. Max size is ${MAX_FILE_SIZE / 1024 / 1024}MB.` });
      e.target.value = ''; // Clear the input
      return;
    }
    
    const fileType = getTemplateTypeFromFile(selectedFile);
    if (!fileType) {
        setStatus({ type: 'error', message: 'Invalid file type. Please upload PDF, DOCX, XLSX, or PPTX.' });
        e.target.value = ''; // Clear the input
        return;
    }
    
    setFile(selectedFile);
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setCategory(categories[0]);
    setFile(null);
    setIsPremium(false);
    const fileInput = document.getElementById('template-file-input') as HTMLInputElement;
    if (fileInput) {
        fileInput.value = '';
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name) {
      setStatus({ type: 'error', message: 'Template name and file are required.' });
      return;
    }

    setIsLoading(true);
    setStatus(null);

    // Simulate upload process
    setTimeout(() => {
        const newTemplate: Template = {
            id: Date.now(),
            name,
            description,
            category,
            isPremium,
            type: getTemplateTypeFromFile(file)!,
            previewImage: `https://picsum.photos/seed/${Date.now()}/400/300`,
            downloadUrl: URL.createObjectURL(file),
        };

        onTemplateAdd(newTemplate);
        setIsLoading(false);
        setStatus({ type: 'success', message: `Template "${name}" uploaded successfully!` });
        resetForm();
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status && (
        <div className={`p-4 rounded-md flex justify-between items-center ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <div className="flex items-center gap-2">
                {status.type === 'success' && <CheckCircle className="w-5 h-5" />}
                <p>{status.message}</p>
            </div>
            <button onClick={() => setStatus(null)} type="button">
                <X className="w-5 h-5" />
            </button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="template-name" className="block text-sm font-medium text-slate-700">Template Name</label>
          <input
            type="text"
            id="template-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            required
          />
        </div>
        <div>
          <label htmlFor="template-category" className="block text-sm font-medium text-slate-700">Category</label>
          <select
            id="template-category"
            value={category}
            onChange={(e) => setCategory(e.target.value as TemplateCategory)}
            className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="template-description" className="block text-sm font-medium text-slate-700">Description</label>
        <textarea
          id="template-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        ></textarea>
      </div>

      <div>
        <label htmlFor="template-file-input" className="block text-sm font-medium text-slate-700">Template File</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-slate-600">
                    <label htmlFor="template-file-input" className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                        <span>Upload a file</span>
                        <input id="template-file-input" name="template-file-input" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.docx,.xlsx,.pptx" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-slate-500">PDF, DOCX, XLSX, PPTX up to 10MB</p>
                {file && <p className="text-sm font-semibold text-green-600 mt-2">Selected: {file.name}</p>}
            </div>
        </div>
      </div>
      
      <div className="flex items-start">
        <div className="flex items-center h-5">
            <input
                id="is-premium"
                name="is-premium"
                type="checkbox"
                checked={isPremium}
                onChange={(e) => setIsPremium(e.target.checked)}
                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-slate-300 rounded"
            />
        </div>
        <div className="ml-3 text-sm">
            <label htmlFor="is-premium" className="font-medium text-slate-700">Premium Template</label>
            <p className="text-slate-500">Mark this template as a Pro feature, requiring a subscription to download.</p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </>
          ) : 'Save Template'}
        </button>
      </div>
    </form>
  );
};

export default TemplateUploadForm;
