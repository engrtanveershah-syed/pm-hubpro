
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { templates as initialTemplates, categories, subscriptionPlans } from './data';
import { Template, TemplateCategory, SubscriptionPlan, TemplateType, SubscriptionTier } from './types';
import TemplateCard from './components/TemplateCard';
import AnalyticsCharts from './components/AnalyticsCharts';
import TemplateUploadForm from './components/TemplateUploadForm';
import AiTemplateGenerator from './components/AiTemplateGenerator';
import { FileIcon, Star, Search, UserCircle, Download, Eye, CheckCircle, X, Sparkles } from './components/Icons';

// Helper Components
const PremiumBadge: React.FC = () => (
    <span className="ml-2 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
        <Star className="w-3 h-3" />
        PRO
    </span>
);

const PricingCard: React.FC<{ plan: SubscriptionPlan, onSubscribe: (tier: SubscriptionPlan['tier']) => void }> = ({ plan, onSubscribe }) => {
    const isPro = plan.tier !== 'FREE';
    return (
        <div className={`border rounded-lg p-6 flex flex-col ${isPro ? 'border-primary-500 bg-primary-50' : 'bg-white'}`}>
            <h3 className="text-xl font-bold text-slate-800">{plan.name}</h3>
            <p className="mt-2 text-slate-500">
                <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                {plan.period}
            </p>
            <ul className="mt-6 space-y-3 text-slate-600 flex-grow">
                {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <button
                onClick={() => onSubscribe(plan.tier)}
                className={`mt-8 w-full py-3 px-6 rounded-lg font-semibold text-center transition-colors ${isPro ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-slate-200 text-slate-800 hover:bg-slate-300'}`}
            >
                {isPro ? 'Get Started' : 'Current Plan'}
            </button>
        </div>
    );
};


const TemplatePreviewModal: React.FC<{ template: Template | null; onClose: () => void; }> = ({ template, onClose }) => {
    const { isPremium } = useAuth();
    const navigate = useNavigate();

    if (!template) return null;

    const handleDownload = () => {
        if (template.isPremium && !isPremium) {
            alert('This is a premium template. Please subscribe to download.');
            onClose();
            navigate('/pricing');
        } else {
            alert(`Downloading "${template.name}"...`);
            window.open(template.downloadUrl, '_blank');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full flex flex-col md:flex-row overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className="w-full md:w-1/2">
                    <img src={template.previewImage} alt={template.name} className="w-full h-full object-cover" />
                </div>
                <div className="w-full md:w-1/2 p-6 flex flex-col relative">
                    <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-800">
                        <X className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                        <FileIcon type={template.type} className="w-4 h-4 text-primary" />
                        <span>{template.category}</span>
                        {template.isPremium && <PremiumBadge />}
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">{template.name}</h2>
                    <p className="text-slate-600 flex-grow mb-4">{template.description}</p>
                    <button
                        onClick={handleDownload}
                        className="w-full bg-primary-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <Download className="w-5 h-5" />
                        Download Now
                    </button>
                </div>
            </div>
        </div>
    );
};


// Page Components

const HomePage: React.FC<{ templates: Template[], onPreview: (template: Template) => void }> = ({ templates, onPreview }) => {
    const featuredTemplates = templates.filter(t => t.isPremium).slice(0, 3);
    return (
        <div className="space-y-16 md:space-y-24">
            <section className="text-center py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900">Empower Your Projects</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">Access a vast library of professionally-crafted templates to streamline your project management workflow.</p>
                    <Link to="/templates" className="mt-8 inline-block bg-primary-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-primary-700 transition-transform hover:scale-105">
                        Browse Templates
                    </Link>
                </div>
            </section>
            <section className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-slate-800">Featured Pro Templates</h2>
                <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredTemplates.map(template => (
                        <TemplateCard key={template.id} template={template} onPreview={onPreview} />
                    ))}
                </div>
            </section>
            <section className="container mx-auto px-4">
                 <h2 className="text-3xl font-bold text-center text-slate-800">Explore by Category</h2>
                 <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {categories.slice(0, 5).map(category => (
                        <Link key={category} to={`/templates?category=${category}`} className="block p-6 bg-white rounded-lg shadow text-center hover:shadow-lg hover:text-primary-600 transition-all font-semibold">
                            {category}
                        </Link>
                    ))}
                 </div>
            </section>
        </div>
    );
};

const TemplatesPage: React.FC<{ templates: Template[], onPreview: (template: Template) => void }> = ({ templates, onPreview }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'All'>('All');
    const [filteredTemplates, setFilteredTemplates] = useState(templates);
    
    useEffect(() => {
        let result = templates;
        if (selectedCategory !== 'All') {
            result = result.filter(t => t.category === selectedCategory);
        }
        if (searchTerm) {
            result = result.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        setFilteredTemplates(result);
    }, [searchTerm, selectedCategory, templates]);
    
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-1/4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4">Categories</h3>
                        <ul>
                            <li className="mb-2">
                                <button onClick={() => setSelectedCategory('All')} className={`w-full text-left p-2 rounded ${selectedCategory === 'All' ? 'bg-primary-100 text-primary-700 font-semibold' : 'hover:bg-slate-100'}`}>All</button>
                            </li>
                            {categories.map(cat => (
                                <li key={cat} className="mb-2">
                                    <button onClick={() => setSelectedCategory(cat)} className={`w-full text-left p-2 rounded ${selectedCategory === cat ? 'bg-primary-100 text-primary-700 font-semibold' : 'hover:bg-slate-100'}`}>{cat}</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
                <main className="w-full md:w-3/4">
                    <div className="relative mb-6">
                        <input
                            type="text"
                            placeholder="Search for templates..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border rounded-full focus:ring-2 focus:ring-primary-300 outline-none"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTemplates.map(template => (
                           <TemplateCard key={template.id} template={template} onPreview={onPreview} />
                        ))}
                         {filteredTemplates.length === 0 && (
                            <div className="sm:col-span-2 lg:col-span-3 text-center py-12 text-slate-500">
                                <h3 className="text-xl font-semibold">No Templates Found</h3>
                                <p>Try adjusting your search or category filters.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

const PricingPage: React.FC = () => {
    const { subscribe } = useAuth();
    const navigate = useNavigate();

    const handleSubscribe = (tier: SubscriptionTier) => {
        if (tier !== 'FREE') {
            subscribe(tier);
            alert(`Successfully subscribed to ${tier} plan!`);
            navigate('/dashboard');
        }
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-4xl font-extrabold text-slate-900">Choose Your Plan</h1>
                <p className="mt-4 text-lg text-slate-600">Unlock your full potential with a Pro plan. Get unlimited access to all templates and features.</p>
            </div>
            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {subscriptionPlans.map(plan => (
                    <PricingCard key={plan.tier} plan={plan} onSubscribe={handleSubscribe} />
                ))}
            </div>
        </div>
    );
};

const DashboardPage: React.FC = () => {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated || !user) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold">Please log in to view your dashboard.</h1>
                <Link to="/" className="mt-4 inline-block text-primary-600 hover:underline">Go to Home</Link>
            </div>
        );
    }
    
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Welcome, {user.name}!</h1>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Subscription Status</h2>
                    <p className="text-slate-600">You are currently on the</p>
                    <p className="text-2xl font-bold text-primary-600 my-2">{user.subscriptionTier.charAt(0) + user.subscriptionTier.slice(1).toLowerCase()} Plan</p>
                    {user.subscriptionTier === 'FREE' && (
                         <Link to="/pricing" className="mt-4 inline-block bg-amber-400 text-amber-900 font-bold py-2 px-4 rounded-lg hover:bg-amber-500 transition-colors">
                            Upgrade to Pro
                        </Link>
                    )}
                </div>
                <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">My Library (Coming Soon)</h2>
                    <p className="text-slate-500">Your downloaded and favorite templates will appear here.</p>
                </div>
            </div>
        </div>
    );
};

const AdminPage: React.FC<{
    templates: Template[],
    onAddTemplate: (newTemplate: Template) => void,
    onAddTemplates: (newTemplates: Template[]) => void
}> = ({ templates, onAddTemplate, onAddTemplates }) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Upload Template Manually</h2>
                    <TemplateUploadForm onTemplateAdd={onAddTemplate} />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Generate Templates with AI</h2>
                    <AiTemplateGenerator onTemplatesAdded={onAddTemplates} />
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Analytics</h2>
                <AnalyticsCharts templates={templates} />
            </div>
        </div>
    );
}

// Layout Components

const Header: React.FC = () => {
    const { isAuthenticated, user, logout, login } = useAuth();
    return (
        <header className="bg-white shadow-sm sticky top-0 z-40">
            <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-primary-600">
                    PMHub
                </Link>
                <div className="hidden md:flex items-center gap-6">
                    <NavLink to="/" className={({isActive}) => `text-slate-600 hover:text-primary-600 font-medium ${isActive ? 'text-primary-600' : ''}`}>Home</NavLink>
                    <NavLink to="/templates" className={({isActive}) => `text-slate-600 hover:text-primary-600 font-medium ${isActive ? 'text-primary-600' : ''}`}>Templates</NavLink>
                    <NavLink to="/pricing" className={({isActive}) => `text-slate-600 hover:text-primary-600 font-medium ${isActive ? 'text-primary-600' : ''}`}>Pricing</NavLink>
                    <NavLink to="/admin" className={({isActive}) => `text-slate-600 hover:text-primary-600 font-medium ${isActive ? 'text-primary-600' : ''}`}>Admin</NavLink>
                </div>
                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <div className="flex items-center gap-3">
                            <Link to="/dashboard" className="flex items-center gap-2">
                                <UserCircle className="w-8 h-8 text-slate-500"/>
                                <span className="font-medium text-slate-700 hidden sm:inline">{user?.name}</span>
                            </Link>
                            <button onClick={logout} className="text-slate-500 hover:text-primary-600 font-medium text-sm">Logout</button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <button onClick={login} className="text-slate-600 hover:text-primary-600 font-medium">Log In</button>
                             <Link to="/pricing" className="bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};


const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-800 text-slate-300 mt-16">
            <div className="container mx-auto px-4 py-8 text-center">
                <p>&copy; {new Date().getFullYear()} PM Template Hub. All rights reserved.</p>
            </div>
        </footer>
    );
};

// Main App Component
function App() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [allTemplates, setAllTemplates] = useState<Template[]>(initialTemplates);

  const handlePreview = (template: Template) => {
    setSelectedTemplate(template);
  };

  const handleClosePreview = () => {
    setSelectedTemplate(null);
  };

  const handleAddTemplate = (newTemplate: Template) => {
    setAllTemplates(prevTemplates => [newTemplate, ...prevTemplates]);
  };

  const handleAddTemplates = (newTemplates: Template[]) => {
    setAllTemplates(prevTemplates => [...newTemplates, ...prevTemplates]);
  };

  return (
    <AuthProvider>
        <HashRouter>
            <div className="flex flex-col min-h-screen">
                <Header/>
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<HomePage templates={allTemplates} onPreview={handlePreview} />} />
                        <Route path="/templates" element={<TemplatesPage templates={allTemplates} onPreview={handlePreview} />} />
                        <Route path="/pricing" element={<PricingPage />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/admin" element={<AdminPage templates={allTemplates} onAddTemplate={handleAddTemplate} onAddTemplates={handleAddTemplates} />} />
                    </Routes>
                </main>
                <Footer />
            </div>
            <TemplatePreviewModal template={selectedTemplate} onClose={handleClosePreview} />
        </HashRouter>
    </AuthProvider>
  );
}

export default App;
