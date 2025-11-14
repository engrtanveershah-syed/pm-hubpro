
import React from 'react';
import { Template } from '../types';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FileIcon, Star, Download, Eye } from './Icons';

interface TemplateCardProps {
  template: Template;
  onPreview: (template: Template) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onPreview }) => {
  const { isPremium } = useAuth();
  const navigate = useNavigate();

  const handleDownload = () => {
    if (template.isPremium && !isPremium) {
      alert('This is a premium template. Please subscribe to download.');
      navigate('/pricing');
    } else {
      alert(`Downloading "${template.name}"...`);
      // In a real app, this would trigger a file download.
      window.open(template.downloadUrl, '_blank');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
      <div className="relative">
        <img src={template.previewImage} alt={template.name} className="w-full h-48 object-cover" />
        <div className="absolute top-2 right-2 flex items-center gap-2">
          {template.isPremium && (
            <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3" />
              PRO
            </span>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
          <FileIcon type={template.type} className="w-4 h-4 text-primary" />
          <span>{template.category}</span>
        </div>
        <h3 className="text-lg font-semibold text-slate-800 truncate">{template.name}</h3>
        <p className="text-sm text-slate-600 h-10 overflow-hidden text-ellipsis">{template.description}</p>
      </div>
      <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
        <button
          onClick={() => onPreview(template)}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors"
        >
          <Eye className="w-4 h-4" />
          Preview
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>
    </div>
  );
};

export default TemplateCard;
