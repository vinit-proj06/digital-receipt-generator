import { ReceiptData } from '@/types/receipt';
import { FileText, Calendar, Clock, Tag, ShoppingBag, CreditCard } from 'lucide-react';

interface Props {
  data: ReceiptData;
  updateData: (newData: Partial<ReceiptData>) => void;
}

export default function ReceiptDetailsForm({ data, updateData }: Props) {
  return (
    <div className="bg-card text-card-foreground p-6 rounded-2xl shadow-sm border border-border">
      <div className="flex items-center gap-2 mb-4 text-primary">
        <FileText size={20} />
        <h2 className="text-xl font-semibold">Receipt Details</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 opacity-70">Invoice Number</label>
          <input
            type="text"
            value={data.invoiceNumber}
            onChange={(e) => updateData({ invoiceNumber: e.target.value })}
            className="w-full bg-input border-transparent focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-3 py-1.5 outline-none transition-all text-sm"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1 opacity-70">Date</label>
          <div className="flex items-center gap-2 bg-input rounded-lg px-3 py-1.5 border-transparent focus-within:border-primary transition-all border text-sm">
            <Calendar size={16} className="opacity-40" />
            <input
              type="date"
              value={data.date}
              onChange={(e) => updateData({ date: e.target.value })}
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 opacity-70">Time</label>
          <div className="flex items-center gap-2 bg-input rounded-lg px-3 py-1.5 border-transparent focus-within:border-primary transition-all border text-sm">
            <Clock size={16} className="opacity-40" />
            <input
              type="time"
              value={data.time}
              onChange={(e) => updateData({ time: e.target.value })}
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 opacity-70">Token Number</label>
          <div className="flex items-center gap-2 bg-input rounded-lg px-3 py-1.5 border-transparent focus-within:border-primary transition-all border text-sm">
            <Tag size={16} className="opacity-40" />
            <input
              type="text"
              value={data.tokenNumber}
              onChange={(e) => updateData({ tokenNumber: e.target.value })}
              className="w-full bg-transparent outline-none"
              placeholder="e.g. 42"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 opacity-70">Order Type</label>
          <div className="flex items-center gap-2 bg-input rounded-lg px-3 py-1.5 border-transparent focus-within:border-primary transition-all border text-sm">
            <ShoppingBag size={16} className="opacity-40" />
            <select
              value={data.orderType}
              onChange={(e) => updateData({ orderType: e.target.value as any })}
              className="w-full bg-transparent outline-none appearance-none"
            >
              <option value="Dine-In">Dine-In</option>
              <option value="Takeaway">Takeaway</option>
              <option value="Delivery">Delivery</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 opacity-70">Payment Mode</label>
          <div className="flex items-center gap-2 bg-input rounded-lg px-3 py-1.5 border-transparent focus-within:border-primary transition-all border text-sm">
            <CreditCard size={16} className="opacity-40" />
            <select
              value={data.paymentMode}
              onChange={(e) => updateData({ paymentMode: e.target.value as any })}
              className="w-full bg-transparent outline-none appearance-none"
            >
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
