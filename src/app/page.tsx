"use client";

import { useState, useEffect, useCallback } from 'react';
import { Item, ReceiptData } from '@/types/receipt';
import BusinessForm from '@/components/BusinessForm';
import ReceiptDetailsForm from '@/components/ReceiptDetailsForm';
import ItemsForm from '@/components/ItemsForm';
import SummarySection from '@/components/SummarySection';
import ReceiptPreview from '@/components/ReceiptPreview';
import { Download, Printer, Moon, Sun, RotateCcw } from 'lucide-react';
import { generatePDF } from '@/utils/pdf-generator';

const initialItems: Item[] = [
  { id: '1', name: 'Chicken Lollipop', quantity: 1, rate: 180, amount: 180 },
];

const initialData: ReceiptData = {
  businessName: 'HopeOF Restaurant',
  phone: '9876543210',
  address: '123, Food Street, Gourmet City, 400001',
  gstin: '27AAACH0000A1Z5',
  invoiceNumber: 'HO-2024-001',
  date: '',
  time: '',
  tokenNumber: '42',
  orderType: 'Dine-In',
  paymentMode: 'UPI',
  items: initialItems,
  subtotal: 180,
  discount: 0,
  tax: 5, // 5% GST
  grandTotal: 189,
  thankYouMessage: 'Thank You for Dining With Us!',
  currency: '₹',
};

export default function Home() {
  const [data, setData] = useState<ReceiptData>(initialData);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');

  useEffect(() => {
    // Check if dark mode class is already present on mount
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    setData(prev => ({
      ...prev,
      date: now.toISOString().split('T')[0],
      time: `${hours}:${minutes}`
    }));
  }, []);

  const updateData = (newData: Partial<ReceiptData>) => {
    setData((prev) => {
      const updated = { ...prev, ...newData };
      
      // Recalculate totals if items or discount/tax changed
      if (newData.items || newData.discount !== undefined || newData.tax !== undefined) {
        const subtotal = updated.items.reduce((sum, item) => sum + item.amount, 0);
        const taxAmount = (subtotal - (updated.discount || 0)) * (updated.tax / 100);
        const grandTotal = subtotal - (updated.discount || 0) + taxAmount;
        
        return {
          ...updated,
          subtotal,
          grandTotal: Math.round(grandTotal),
        };
      }
      
      return updated;
    });
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('receipt-preview');
    if (element) {
      await generatePDF(element, `Receipt-${data.invoiceNumber}`);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  const resetForm = () => {
    if (confirm('Are you sure you want to reset the form?')) {
      setData(initialData);
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 print-hidden">
        <div>
          <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
            <span className="bg-primary text-white p-2 rounded-lg">R</span>
            Digital Receipt Pro
          </h1>
          <p className="text-muted-foreground mt-1 text-slate-500 dark:text-slate-400">
            Professional thermal receipt generator for your business
          </p>
        </div>
        
        <div className="flex gap-2 items-center bg-white dark:bg-slate-800 p-2 rounded-xl shadow-sm border border-border">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white"
            title="Toggle Dark Mode"
          >
            {isDarkMode ? (
              <Sun size={20} className="text-amber-500 dark:text-amber-400" />
            ) : (
              <Moon size={20} className="text-slate-800 dark:text-slate-200" />
            )}
          </button>
          <button 
            onClick={resetForm}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white"
            title="Reset Form"
          >
            <RotateCcw size={20} />
          </button>
          <div className="w-[1px] h-6 bg-border mx-1"></div>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors font-medium hover:text-slate-950 dark:hover:text-white"
          >
            <Printer size={18} />
            <span className="hidden sm:inline">Print</span>
          </button>
          <button 
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium shadow-md shadow-orange-500/20"
          >
            <Download size={18} />
            <span className="hidden sm:inline">Download PDF</span>
          </button>
        </div>
      </header>

      {/* Mobile Tab Switcher */}
      <div className="flex md:hidden mb-6 bg-white dark:bg-slate-800 p-1 rounded-xl shadow-sm border border-border print-hidden">
        <button
          onClick={() => setActiveTab('form')}
          className={`flex-1 py-2 rounded-lg font-medium transition-all ${activeTab === 'form' ? 'bg-primary text-white' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Form
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex-1 py-2 rounded-lg font-medium transition-all ${activeTab === 'preview' ? 'bg-primary text-white' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Preview
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column - Form */}
        <div className={`lg:col-span-7 space-y-6 print-hidden ${activeTab === 'preview' ? 'hidden lg:block' : ''}`}>
          <BusinessForm data={data} updateData={updateData} />
          <ReceiptDetailsForm data={data} updateData={updateData} />
          <ItemsForm data={data} updateData={updateData} />
          <SummarySection data={data} updateData={updateData} />
        </div>

        {/* Right Column - Preview */}
        <div className={`lg:col-span-5 sticky top-8 preview-column ${activeTab === 'form' ? 'hidden lg:block' : ''}`}>
          <div className="bg-slate-50/50 dark:bg-slate-900/5 p-1 md:p-2 rounded-3xl h-fit flex items-start justify-center overflow-auto hide-scrollbar border border-slate-200/30 dark:border-slate-800/10 preview-bg-wrapper">
            <ReceiptPreview data={data} />
          </div>
        </div>
      </div>
    </main>
  );
}
