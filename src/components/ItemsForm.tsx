import { ReceiptData, Item } from '@/types/receipt';
import { Plus, Trash2, List } from 'lucide-react';

interface Props {
  data: ReceiptData;
  updateData: (newData: Partial<ReceiptData>) => void;
}

export default function ItemsForm({ data, updateData }: Props) {
  const addItem = () => {
    const newItem: Item = {
      id: Date.now().toString(),
      name: '',
      quantity: 1,
      rate: 0,
      amount: 0,
    };
    updateData({ items: [...data.items, newItem] });
  };

  const removeItem = (id: string) => {
    const newItems = data.items.filter((item) => item.id !== id);
    // Ensure at least one item remains
    if (newItems.length === 0) return;
    updateData({ items: newItems });
  };

  const updateItem = (id: string, updates: Partial<Item>) => {
    const newItems = data.items.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, ...updates };
        // Recalculate amount
        updatedItem.amount = updatedItem.quantity * updatedItem.rate;
        return updatedItem;
      }
      return item;
    });
    updateData({ items: newItems });
  };

  return (
    <div className="bg-card text-card-foreground p-6 rounded-2xl shadow-sm border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-primary">
          <List size={20} />
          <h2 className="text-xl font-semibold">Items Section</h2>
        </div>
        <button
          onClick={addItem}
          className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors font-medium text-sm"
        >
          <Plus size={16} />
          Add Item
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border opacity-60 text-sm">
              <th className="py-2 px-1 font-medium">Item Name</th>
              <th className="py-2 px-1 font-medium w-20 text-center">Qty</th>
              <th className="py-2 px-1 font-medium w-28 text-center">Rate ({data.currency})</th>
              <th className="py-2 px-1 font-medium w-28 text-right">Amount</th>
              <th className="py-2 px-1 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.items.map((item) => (
              <tr key={item.id} className="group">
                <td className="py-3 px-1">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(item.id, { name: e.target.value })}
                    className="w-full bg-input border-transparent focus:border-primary rounded-lg px-3 py-1.5 outline-none transition-all"
                    placeholder="Item Name"
                  />
                </td>
                <td className="py-3 px-1">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, { quantity: Number(e.target.value) })}
                    className="w-full bg-input border-transparent focus:border-primary rounded-lg px-3 py-1.5 outline-none transition-all text-center"
                    min="1"
                  />
                </td>
                <td className="py-3 px-1">
                  <input
                    type="number"
                    value={item.rate}
                    onChange={(e) => updateItem(item.id, { rate: Number(e.target.value) })}
                    className="w-full bg-input border-transparent focus:border-primary rounded-lg px-3 py-1.5 outline-none transition-all text-center"
                    min="0"
                  />
                </td>
                <td className="py-3 px-1 text-right font-medium">
                  {data.currency}{item.amount.toLocaleString()}
                </td>
                <td className="py-3 px-1">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50/50 dark:hover:bg-red-950/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    title="Remove Item"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
