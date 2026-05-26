import { ReceiptData } from '@/types/receipt';

interface Props {
  data: ReceiptData;
}

export default function ReceiptPreview({ data }: Props) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div id="receipt-preview" className="receipt-paper">
      {/* Header */}
      <div className="receipt-header">
        <h2 className="text-2xl font-bold uppercase tracking-tight leading-none">{data.businessName}</h2>
        <p className="text-[12px] mt-1 opacity-80">{data.address}</p>
        <p className="text-[12px] opacity-80">Ph: {data.phone}</p>
        {data.gstin && <p className="text-[12px] font-bold mt-1">GSTIN: {data.gstin}</p>}
      </div>

      <div className="receipt-dashed-line"></div>

      {/* Basic Info */}
      <div className="text-[13px] space-y-1 mb-2">
        <div className="flex justify-between">
          <span className="uppercase">Receipt: <span className="font-bold">{data.invoiceNumber}</span></span>
          <span>Date: {formatDate(data.date)}</span>
        </div>
        <div className="flex justify-between">
          <span className="uppercase">Time: {data.time}</span>
          <span className="uppercase">Table/Token: <span className="font-bold">#{data.tokenNumber}</span></span>
        </div>
        <div className="flex justify-between">
          <span className="uppercase">Type: {data.orderType}</span>
          <span className="uppercase">Pay: {data.paymentMode}</span>
        </div>
      </div>

      <div className="receipt-dashed-line"></div>

      {/* Items Table */}
      <table className="receipt-table mb-1">
        <thead>
          <tr>
            <th className="text-left w-[50%]">ITEM</th>
            <th className="text-center w-[15%]">QTY</th>
            <th className="text-right w-[15%]">RATE</th>
            <th className="text-right w-[20%]">AMT</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item) => (
            <tr key={item.id}>
              <td className="uppercase py-1 leading-tight max-w-[120px] break-words text-left">
                {item.name || '---'}
              </td>
              <td className="text-center">{item.quantity}</td>
              <td className="text-right">{item.rate.toFixed(0)}</td>
              <td className="text-right font-bold">{item.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="receipt-dashed-line"></div>

      {/* Totals Section */}
      <div className="space-y-1 text-[13px] mt-1">
        <div className="flex justify-between">
          <span className="uppercase">Sub Total</span>
          <span>{data.subtotal.toFixed(2)}</span>
        </div>
        {data.discount > 0 && (
          <div className="flex justify-between">
            <span className="uppercase">Discount (-)</span>
            <span>{data.discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="uppercase">GST / Tax ({data.tax}%)</span>
          <span>{((data.subtotal - data.discount) * (data.tax / 100)).toFixed(2)}</span>
        </div>
        
        <div className="receipt-dashed-line"></div>
        
        <div className="flex justify-between receipt-total pt-1 pb-1 uppercase">
          <span>Total</span>
          <span>{data.currency}{data.grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="receipt-dashed-line"></div>

      {/* Footer */}
      <div className="receipt-footer pb-2">
        <p className="text-sm font-bold mb-1 uppercase tracking-wider">{data.thankYouMessage}</p>
        <div className="mt-4 text-[10px] opacity-30 uppercase tracking-widest">
          *** digital receipt ***
        </div>
      </div>
    </div>
  );
}
