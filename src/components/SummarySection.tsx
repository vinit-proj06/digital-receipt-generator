import { ReceiptData } from '@/types/receipt';
import { Calculator, MessageSquare, StickyNote, Banknote } from 'lucide-react';

interface Props {
  data: ReceiptData;
  updateData: (newData: Partial<ReceiptData>) => void;
}

export default function SummarySection({ data, updateData }: Props) {
  return (
    <div className="bg-card text-card-foreground p-6 rounded-2xl shadow-sm border border-border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Footer & Notes */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2 text-primary">
            <MessageSquare size={20} />
            <h2 className="text-xl font-semibold">Footer & Notes</h2>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 opacity-70">Thank You Message</label>
            <div className="flex items-center gap-2 bg-input rounded-xl px-4 py-2 border-transparent focus-within:border-primary transition-all border">
              <StickyNote size={16} className="opacity-40" />
              <input
                type="text"
                value={data.thankYouMessage}
                onChange={(e) => updateData({ thankYouMessage: e.target.value })}
                className="w-full bg-transparent outline-none"
                placeholder="Visit Again!"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 opacity-70">Footer Note (Optional)</label>
            <div className="flex items-center gap-2 bg-input rounded-xl px-4 py-2 border-transparent focus-within:border-primary transition-all border">
              <StickyNote size={16} className="opacity-40" />
              <input
                type="text"
                value={data.footerNote}
                onChange={(e) => updateData({ footerNote: e.target.value })}
                className="w-full bg-transparent outline-none"
                placeholder="Powered by Digital Receipt Pro"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1 opacity-70">Currency</label>
            <div className="flex items-center gap-2 bg-input rounded-xl px-4 py-2 border-transparent focus-within:border-primary transition-all border w-32">
              <Banknote size={16} className="opacity-40" />
              <select
                value={data.currency}
                onChange={(e) => updateData({ currency: e.target.value })}
                className="w-full bg-transparent outline-none"
              >
                <option value="₹">₹ INR</option>
                <option value="$">$ USD</option>
                <option value="£">£ GBP</option>
                <option value="€">€ EUR</option>
              </select>
            </div>
          </div>
        </div>

        {/* Calculations */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2 text-primary">
            <Calculator size={20} />
            <h2 className="text-xl font-semibold">Calculations</h2>
          </div>

          <div className="bg-white text-slate-900 border border-slate-200 dark:bg-slate-800 dark:text-white dark:border-slate-700/80 shadow-sm rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm opacity-70 font-medium">Subtotal</span>
              <span className="font-semibold">{data.currency}{data.subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center">
              <label className="text-sm opacity-70 font-medium">Discount</label>
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-700/50 rounded-lg px-2 py-1 border border-slate-200 dark:border-slate-600 focus-within:border-primary transition-all w-28">
                <span className="text-xs opacity-50">{data.currency}</span>
                <input
                  type="number"
                  value={data.discount}
                  onChange={(e) => updateData({ discount: Number(e.target.value) })}
                  className="w-full bg-transparent outline-none text-right font-semibold text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <label className="text-sm opacity-70 font-medium">GST / Tax (%)</label>
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-700/50 rounded-lg px-2 py-1 border border-slate-200 dark:border-slate-600 focus-within:border-primary transition-all w-28">
                <input
                  type="number"
                  value={data.tax}
                  onChange={(e) => updateData({ tax: Number(e.target.value) })}
                  className="w-full bg-transparent outline-none text-right font-semibold text-slate-900 dark:text-white"
                />
                <span className="text-xs opacity-50">%</span>
              </div>
            </div>

            <div className="h-[1px] bg-border my-2"></div>

            <div className="flex justify-between items-center pt-1">
              <span className="text-lg font-bold text-primary">Grand Total</span>
              <span className="text-2xl font-bold text-primary">
                {data.currency}{data.grandTotal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
