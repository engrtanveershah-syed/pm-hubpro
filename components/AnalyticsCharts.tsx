
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { templates } from '../data';
import { TemplateCategory } from '../types';

const DownloadsByCategoryChart: React.FC = () => {
    const dataMap = new Map<TemplateCategory, number>();
    templates.forEach(t => {
        const count = dataMap.get(t.category) || 0;
        // Mocking download counts
        dataMap.set(t.category, count + Math.floor(Math.random() * 500) + 50);
    });

    const chartData = Array.from(dataMap.entries()).map(([name, downloads]) => ({ name, downloads }));

    return (
        <div className="w-full h-96 bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">Template Downloads by Category</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-25} textAnchor="end" height={60} interval={0} fontSize={12} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="downloads" fill="#0ea5e9" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DownloadsByCategoryChart;
