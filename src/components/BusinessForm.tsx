import { ReceiptData } from '@/types/receipt';
import { Store, Phone, Mail, MapPin, Hash, Image as ImageIcon } from 'lucide-react';

interface Props {
  data: ReceiptData;
  updateData: (newData: Partial<ReceiptData>) => void;
}

export default function BusinessForm({ data, updateData }: Props) {
  return (
    <div className="bg-card text-card-foreground p-6 rounded-2xl shadow-sm border border-border">
      <div className="flex items-center gap-2 mb-4 text-primary">
        <Store size={20} />
        <h2 className="text-xl font-semibold">Business Details</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 opacity-70">Business Name</label>
            <div className="relative">
              <input
                type="text"
                value={data.businessName}
                onChange={(e) => updateData({ businessName: e.target.value })}
                className="w-full bg-input border-transparent focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2 outline-none transition-all"
                placeholder="e.g. My Cafe"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 opacity-70">Phone Number</label>
            <div className="flex items-center gap-2 bg-input rounded-xl px-4 py-2 border-transparent focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all border">
              <Phone size={16} className="opacity-40" />
              <input
                type="text"
                value={data.phone}
                onChange={(e) => updateData({ phone: e.target.value })}
                className="w-full bg-transparent outline-none"
                placeholder="+91 0000000000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 opacity-70">Email (Optional)</label>
            <div className="flex items-center gap-2 bg-input rounded-xl px-4 py-2 border-transparent focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all border">
              <Mail size={16} className="opacity-40" />
              <input
                type="email"
                value={data.email}
                onChange={(e) => updateData({ email: e.target.value })}
                className="w-full bg-transparent outline-none"
                placeholder="hello@business.com"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 opacity-70">Address</label>
            <div className="flex items-start gap-2 bg-input rounded-xl px-4 py-2 border-transparent focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all border h-full max-h-[105px]">
              <MapPin size={16} className="opacity-40 mt-1" />
              <textarea
                value={data.address}
                onChange={(e) => updateData({ address: e.target.value })}
                className="w-full bg-transparent outline-none resize-none h-full"
                placeholder="Street Address, City, State, ZIP"
                rows={3}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 opacity-70">GSTIN / Tax ID</label>
            <div className="flex items-center gap-2 bg-input rounded-xl px-4 py-2 border-transparent focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all border">
              <Hash size={16} className="opacity-40" />
              <input
                type="text"
                value={data.gstin}
                onChange={(e) => updateData({ gstin: e.target.value })}
                className="w-full bg-transparent outline-none uppercase"
                placeholder="27AAACH0000A1Z5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
