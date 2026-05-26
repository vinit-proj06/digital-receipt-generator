export interface Item {
  id: string;
  name: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface ReceiptData {
  businessName: string;
  phone: string;
  address: string;
  gstin: string;
  logo?: string;
  
  invoiceNumber: string;
  date: string;
  time: string;
  tokenNumber: string;
  orderType: 'Dine-In' | 'Takeaway' | 'Delivery';
  paymentMode: 'Cash' | 'UPI' | 'Card';
  
  items: Item[];
  
  subtotal: number;
  discount: number;
  tax: number;
  grandTotal: number;
  
  thankYouMessage: string;
  
  currency: string;
}
