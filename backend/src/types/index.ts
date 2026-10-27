export interface MessageTurn {
  sender: "customer" | "bot" | "user" | "human_agent";
  text: string;
}

export interface ChatRequestPayload {
  message: string;
  channel: "whatsapp" | "facebook" | "instagram";
  storeName?: string;
  conversationHistory?: MessageTurn[];
}

export interface CourierBookingPayload {
  invoice: string;
  recipient_name: string;
  recipient_phone: string;
  recipient_address: string;
  cod_amount: number;
  note?: string;
}

export interface PathaoBookingPayload {
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  amountToCollect: number;
  itemDescription?: string;
}

export interface BkashPaymentPayload {
  orderId: string;
  amount: number;
  phone: string;
  purpose: "advance_delivery_fee" | "full_order";
}
