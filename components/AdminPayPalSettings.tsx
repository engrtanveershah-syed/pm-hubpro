
import React, { useState } from 'react';
import { CheckCircle, X } from './Icons';

const AdminPayPalSettings: React.FC = () => {
    const [clientId, setClientId] = useState('AbcdeFGH-12345_6789-CLIENT-ID');
    const [secretKey, setSecretKey] = useState('********************');
    const [webhookUrl, setWebhookUrl] = useState('https://pmhub.example.com/api/paypal/webhook');
    const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus({ type: 'success', message: 'Settings updated successfully!' });
        // In a real app, this would make an API call to a secure backend.
        // We're just simulating the UI feedback here.
        setTimeout(() => setStatus(null), 3000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">PayPal Integration Settings</h2>
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
            <div>
                <label htmlFor="paypal-client-id" className="block text-sm font-medium text-slate-700">Client ID</label>
                <input
                    type="text"
                    id="paypal-client-id"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
            </div>
            <div>
                <label htmlFor="paypal-secret-key" className="block text-sm font-medium text-slate-700">Secret Key</label>
                <input
                    type="password"
                    id="paypal-secret-key"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
            </div>
            <div>
                <label htmlFor="paypal-webhook-url" className="block text-sm font-medium text-slate-700">Webhook URL</label>
                <input
                    type="text"
                    id="paypal-webhook-url"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
                <p className="mt-2 text-xs text-slate-500">This endpoint receives events about PayPal transactions.</p>
            </div>
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                    Save Settings
                </button>
            </div>
        </form>
    );
};

export default AdminPayPalSettings;
