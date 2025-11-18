import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { templates as initialTemplates, categories, subscriptionPlans } from './data';
import { Template, TemplateCategory, SubscriptionPlan, TemplateType, SubscriptionTier } from './types';
import TemplateCard from './components/TemplateCard';
import AnalyticsCharts from './components/AnalyticsCharts';
import TemplateUploadForm from './components/TemplateUploadForm';
import AiTemplateGenerator from './components/AiTemplateGenerator';
import AdminPayPalSettings from './components/AdminPayPalSettings';
import { FileIcon, Star, Search, UserCircle, Download, Eye, CheckCircle, X, PayPal, Visa, MasterCard } from './components/Icons';

// Helper Components
const PremiumBadge: React.FC = () => (
    <span className="ml-2 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
        <Star className="w-3 h-3" />
        PRO
    </span>
);

const PricingCard: React.FC<{ plan: SubscriptionPlan, onSubscribe: (plan: SubscriptionPlan) => void }> = ({ plan, onSubscribe }) => {
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
            {isPro && (
                <div className="mt-6">
                    <p className="text-xs text-center text-slate-500 mb-2">Secure payments with</p>
                    <div className="flex justify-center items-center gap-2">
                        <PayPal className="h-5 w-auto"/>
                        <Visa className="h-5 w-auto" />
                        <MasterCard className="h-5 w-auto" />
                    </div>
                </div>
            )}
            <button
                onClick={() => onSubscribe(plan)}
                disabled={!isPro}
                className={`mt-8 w-full py-3 px-6 rounded-lg font-semibold text-center transition-colors ${isPro ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-slate-200 text-slate-800 cursor-not-allowed'}`}
            >
                {isPro ? 'Choose Plan' : 'Current Plan'}
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

const PayPalCheckoutModal: React.FC<{
    plan: SubscriptionPlan | null;
    onClose: () => void;
    onSuccess: (tier: SubscriptionTier) => void;
}> = ({ plan, onClose, onSuccess }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();
    
    if (!plan) return null;

    const handlePayment = () => {
        setIsProcessing(true);
        // Simulate API call to PayPal
        setTimeout(() => {
            onSuccess(plan.tier);
            setIsProcessing(false);
            onClose();
            navigate('/payment-status?status=success');
        }, 2000);
    };
    
    const handleCancel = () => {
        onClose();
        navigate('/payment-status?status=cancelled');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className="p-8">
                    <div className="text-center mb-6">
                         <h2 className="text-2xl font-bold text-slate-800">Complete Your Subscription</h2>
                         <p className="text-slate-500 mt-1">You are subscribing to the <span className="font-semibold text-primary-600">{plan.name}</span> plan.</p>
                    </div>
                   
                    <div className="bg-slate-100 p-4 rounded-lg mb-6 text-center">
                        <p className="text-slate-600">Total Due Today</p>
                        <p className="text-3xl font-bold text-slate-900">{plan.price}<span className="text-base font-normal">{plan.period}</span></p>
                    </div>

                    <button
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className="w-full bg-[#0070ba] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#005ea6] transition-colors flex items-center justify-center gap-2 disabled:bg-slate-400"
                    >
                        {isProcessing ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                Processing...
                            </>
                        ) : (
                           <PayPal className="w-20" />
                        )}
                    </button>
                    
                    <div className="mt-4 text-center">
                        <p className="text-xs text-slate-500 mb-2">Cards accepted via PayPal:</p>
                        <div className="flex justify-center items-center gap-2">
                            <Visa className="h-8 w-auto" />
                            <MasterCard className="h-8 w-auto" />
                        </div>
                    </div>

                    <button onClick={handleCancel} className="w-full text-center mt-4 text-sm text-slate-500 hover:underline">
                        Cancel Payment
                    </button>
                </div>
            </div>
        </div>
    );
};


// Page Components

const HomePage: React.FC<{ templates: Template[], onPreview: (template: Template) => void }> = ({ templates, onPreview }) => {
    const featuredTemplates = templates.filter(t => t.isPremium).slice(0, 3);
    const navigate = useNavigate();
    const [heroSearch, setHeroSearch] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (heroSearch.trim()) {
            navigate(`/templates?search=${encodeURIComponent(heroSearch)}`);
        } else {
             navigate('/templates');
        }
    };

    return (
        <div className="space-y-16 md:space-y-24">
            <section className="text-center py-16 md:py-24 bg-slate-50 relative overflow-hidden">
                 {/* Decorative background blobs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-white rounded-full opacity-50 blur-3xl -z-10"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">Empower Your Projects</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">Access a vast library of professionally-crafted templates to streamline your project management workflow.</p>
                    
                    {/* Prominent Search Bar */}
                    <div className="mt-10 max-w-2xl mx-auto">
                        <form onSubmit={handleSearch} className="relative">
                            <div className="relative flex items-center group transition-all duration-300 transform hover:-translate-y-0.5">
                                <Search className="absolute left-5 w-6 h-6 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                                <input 
                                    type="text"
                                    value={heroSearch}
                                    onChange={(e) => setHeroSearch(e.target.value)}
                                    placeholder="Search for templates (e.g. Agile, Risk Register, Budget)..." 
                                    className="w-full pl-14 pr-36 py-5 rounded-full border-2 border-slate-200 shadow-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none text-lg transition-all placeholder:text-slate-400"
                                />
                                <button 
                                    type="submit"
                                    className="absolute right-2 top-2 bottom-2 bg-primary-600 text-white px-8 rounded-full font-bold hover:bg-primary-700 transition-colors shadow-md flex items-center gap-2"
                                >
                                    Search
                                </button>
                            </div>
                        </form>
                         <div className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-slate-500">
                            <span className="font-medium">Trending Searches:</span>
                            <Link to="/templates?search=Agile" className="hover:text-primary-600 hover:underline decoration-2 decoration-primary-200 underline-offset-4 transition-all">Agile</Link>
                            <Link to="/templates?search=Gantt" className="hover:text-primary-600 hover:underline decoration-2 decoration-primary-200 underline-offset-4 transition-all">Gantt Charts</Link>
                            <Link to="/templates?search=Risk" className="hover:text-primary-600 hover:underline decoration-2 decoration-primary-200 underline-offset-4 transition-all">Risk Log</Link>
                            <Link to="/templates?search=Report" className="hover:text-primary-600 hover:underline decoration-2 decoration-primary-200 underline-offset-4 transition-all">Status Reports</Link>
                        </div>
                    </div>
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
    const [searchParams] = useSearchParams();
    
    // Initialize state from URL parameters
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    
    // Check if category param is valid, otherwise default to 'All'
    const paramCategory = searchParams.get('category');
    const initialCategory = (paramCategory && categories.includes(paramCategory as any)) 
        ? (paramCategory as TemplateCategory) 
        : 'All';
        
    const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'All'>(initialCategory);
    const [filteredTemplates, setFilteredTemplates] = useState(templates);
    
    // Sync state with URL parameters when they change
    useEffect(() => {
        const search = searchParams.get('search');
        const category = searchParams.get('category');
        
        if (search !== null) {
            setSearchTerm(search);
        } else if (!category) {
            // If search param is missing and no category, likely navigated to root /templates
            setSearchTerm('');
        }

        if (category && categories.includes(category as any)) {
            setSelectedCategory(category as TemplateCategory);
        } else if (!category) {
            setSelectedCategory('All');
        }
    }, [searchParams]);
    
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);

    const handleSelectPlan = (plan: SubscriptionPlan) => {
        if (plan.tier !== 'FREE') {
            setSelectedPlan(plan);
            setIsModalOpen(true);
        }
    };

    return (
        <>
            <div className="container mx-auto px-4 py-16">
                <div className="text-center max-w-2xl mx-auto">
                    <h1 className="text-4xl font-extrabold text-slate-900">Choose Your Plan</h1>
                    <p className="mt-4 text-lg text-slate-600">Unlock your full potential with a Pro plan. Get unlimited access to all templates and features.</p>
                </div>
                <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {subscriptionPlans.map(plan => (
                        <PricingCard key={plan.tier} plan={plan} onSubscribe={handleSelectPlan} />
                    ))}
                </div>
            </div>
            <PayPalCheckoutModal 
                plan={selectedPlan} 
                onClose={() => setIsModalOpen(false)}
                onSuccess={subscribe}
            />
        </>
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
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <AdminPayPalSettings />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Analytics</h2>
                <AnalyticsCharts templates={templates} />
            </div>
        </div>
    );
};

const PaymentStatusPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const status = searchParams.get('status');

    if (status === 'success') {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-slate-800">Payment Successful!</h1>
                <p className="text-slate-600 mt-2">Your subscription is now active. Welcome to PMHub Pro!</p>
                <Link to="/dashboard" className="mt-8 inline-block bg-primary-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-700">
                    Go to Dashboard
                </Link>
            </div>
        );
    }
    
    return (
        <div className="container mx-auto px-4 py-16 text-center">
            <X className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-slate-800">Payment Cancelled</h1>
            <p className="text-slate-600 mt-2">Your transaction was not completed. You have not been charged.</p>
            <Link to="/pricing" className="mt-8 inline-block bg-slate-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-slate-700">
                View Pricing Plans
            </Link>
        </div>
    );
};


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
                        <Route path="/payment-status" element={<PaymentStatusPage />} />
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