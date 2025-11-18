import React from 'react';
import { TemplateType } from '../types';

export const FileIcon: React.FC<{ type: TemplateType; className?: string }> = ({ type, className = "w-6 h-6" }) => {
  switch (type) {
    case TemplateType.WORD:
      return <FileWord className={className} />;
    case TemplateType.EXCEL:
      return <FileExcel className={className} />;
    case TemplateType.POWERPOINT:
      return <FilePowerpoint className={className} />;
    case TemplateType.PDF:
      return <FilePdf className={className} />;
    default:
      return <FileText className={className} />;
  }
};

export const FileWord = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="M12 18h-1v-5h1a2 2 0 1 1 0 4h-1" /></svg>
);

export const FileExcel = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="m15 13-3 3 3 3" /><path d="m9 13 3 3-3 3" /></svg>
);

export const FilePowerpoint = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="M12 12H8" /><path d="M12 18h-1a2 2 0 1 1 0-4h1" /></svg>
);

export const FilePdf = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="M10 12v6" /><path d="M10 15h1a2 2 0 1 0 0-4h-1" /></svg>
);

export const FileText = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><line x1="10" x2="8" y1="9" y2="9" /></svg>
);

export const Star = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
);

export const Download = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
);

export const Eye = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
);

export const Search = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
);

export const UserCircle = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" /><circle cx="12" cy="10" r="3" /><circle cx="12" cy="12" r="10" /></svg>
);

export const CheckCircle = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
);

export const X = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
);

export const Sparkles = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 3-1.9 5.8-5.8 1.9 5.8 1.9 1.9 5.8 1.9-5.8 5.8-1.9-5.8-1.9z"/></svg>
);

export const PayPal = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 96 27" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M6.333 22.336h10.43c2.478 0 4.223-1.637 4.223-4.148 0-3.153-2.19-4.22-4.821-4.22h-3.483l-.68 4.148h-2.19l3.374-20.463h6.635c3.262 0 5.46 1.856 5.46 4.93 0 2.217-1.183 3.738-3.043 4.33.964.456 1.637 1.664 1.637 3.012 0 3.37-2.67 5.41-5.917 5.41Zm3.375-12.062h2.245c1.474 0 2.245-.654 2.245-1.773 0-1.146-.68-1.747-1.99-1.747h-2.385l-.115 3.52Z" fill="#253B80"/>
        <path d="M33.684 22.336h4.522l-3.375-20.463h-6.745c-2.422 0-3.972 1.448-3.972 3.657 0 2.985 2.502 3.657 4.363 4.094l.592.143c1.02.256 1.353.483 1.353.88 0 .626-.624.962-1.558.962-1.292 0-2.102-.397-2.19-1.584l-4.279.74c.426 3.126 3.262 4.985 6.992 4.985 3.97 0 6.44-1.996 6.44-5.23 0-2.642-1.884-4.12-4.577-4.721l-.592-.143c-.88-.212-1.44-.455-1.44-.88 0-.426.54-.795 1.412-.795 1.048 0 1.692.284 1.94 1.288l4.14-.85Z" fill="#253B80"/>
        <path d="M51.722 22.336h4.522l-5.46-20.463h-4.22l-5.46 20.463h4.52l.967-3.792h4.704l.427 3.792Zm-2.585-7.382 1.692-6.55 1.693 6.55h-3.385Z" fill="#253B80"/>
        <path d="M63.708 2.213c.852 0 1.558-.712 1.558-1.584S64.56.002 63.708.002c-.852 0-1.558.712-1.558 1.583s.706 1.628 1.558 1.628Z" fill="#253B80"/>
        <path d="M60.29 22.336h4.522V5.79h-4.522v16.546Z" fill="#253B80"/>
        <path d="M86.37 12.59c0-3.6-2.19-6.084-5.65-6.084h-5.88l-3.373 20.462h4.522l.624-3.792h2.955c3.627 0 6.8-2.024 6.8-5.626v-.795c0-.626-.084-1.23-.228-1.774Zm-5.344 3.012h-2.19l.51-3.04h1.748c1.32 0 1.996.654 1.996 1.638s-.678 1.402-2.054 1.402Z" fill="#253B80"/>
        <path d="M95.66 12.07c-.17-.993-.824-1.746-1.91-1.746-1.44 0-2.274.966-2.274 2.218 0 1.25.91 1.94 2.42 2.274.966.228 2.053.483 2.053 1.145 0 .74-.796 1.258-2.134 1.258-1.855 0-2.784-.682-2.924-2.19l-4.364.74c.484 3.518 3.545 5.492 7.355 5.492 3.657 0 6.69-2.053 6.69-5.372C98.22 14.5 96.54 12.8 94.03 12.3c-.938-.198-1.855-.425-1.855-1.02 0-.54.625-.938 1.558-.938.994 0 1.558.398 1.718 1.378l4.22-.71Z" fill="#1183D6"/>
    </svg>
);

export const Visa = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="24" viewBox="0 0 38 24" role="img" aria-labelledby="pi-visa" {...props}>
        <title id="pi-visa">Visa</title>
        <g fill="none">
            <path fill="#142688" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"/>
            <path fill="#fff" d="M28.1 7.2c-.3-.2-.5-.3-.6-.3h-.3c-.2 0-.3.1-.4.4l-1.9 5.8h2.3c0 0 .2-.4.2-.5.1-.2.2-.4.3-.6.1-.2.2-.4.2-.5.1 0 .2-.1.2-.2.5-1.2.8-2.5 1-3.8.1-.3.2-.6.3-.9zm-10.3 5.3c.2-.2.3-.4.4-.6.2-.3.3-.6.3-.9.1-.3.1-.6.1-1s0-.7-.1-1-.1-.6-.2-.8c-.1-.2-.2-.4-.3-.5s-.2-.3-.4-.4c-.1-.1-.3-.2-.4-.2-.2 0-.3 0-.5.1l-2.9 5.8h2.3c.1 0 .2 0 .3-.1.1 0 .2-.1.2-.1zm-5.7.5H9.8c-.1 0-.2 0-.2-.1s-.1-.1-.1-.2l2.1-5.9c.1-.2 0-.4-.1-.5s-.2-.1-.3-.1H9.3c-.1 0-.2 0-.2.1-.1.1-.1.1-.1.2l-2.1 5.9c-.1.2 0 .4.1.5.1.1.2.1.3.1h2.3c.1 0 .2 0 .2-.1zm15.4-5.8h-1.3c-.1 0-.2.1-.2.2l-1.9 5.8h2.3c.1 0 .2-.1.2-.2l1.8-5.8c0-.1-.1-.2-.2-.2zm-14.9-.1c-.1.1-.2.1-.3.1-.1 0-.2 0-.2-.1s-.1-.1-.1-.2L13.1 7c0-.1.1-.2.2-.2h1.3c.1 0 .2.1.2.2l1.9 5.8c0 .1 0 .2-.1.2zm-5-5.9h-2.2c-.1 0-.2.1-.2.2l-2.1 5.9c-.1.2 0 .4.1.5.1.1.2.1.3.1h1.4c.1 0 .2-.1.2-.2l.4-1.2h2.4c.1 0 .2.1.2.2l.4 1.2c.1.1.2.1.3.1h1.4c.1 0 .2-.1.2-.2l-2.1-5.9c-.1-.2 0-.4-.1-.5zm-5.4 5.8c0 .1-.1.2-.2.2H3.8c-.1 0-.2-.1-.2-.2V7c0-.1.1-.2.2-.2h2.2c.1 0 .2.1.2.2v5.8z"/>
        </g>
    </svg>
);

export const MasterCard = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="24" viewBox="0 0 38 24" role="img" aria-labelledby="pi-mastercard" {...props}>
        <title id="pi-mastercard">Mastercard</title>
        <g fill="none">
            <path fill="#222" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"/>
            <circle fill="#EB001B" cx="15" cy="12" r="6"/>
            <circle fill="#F79E1B" cx="23" cy="12" r="6"/>
            <path fill="#FF5F00" d="M21 12a6 6 0 0 1-6 6 6 6 0 1 1 6-6z"/>
        </g>
    </svg>
);
