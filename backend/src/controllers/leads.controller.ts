import { Request, Response } from "express";

let sampleLeadOrders = [
  {
    id: "LD-801",
    buyerName: "Tanvir Hasan (Dhaka Gadgets)",
    phone: "+880 1712-345678",
    packTitle: "500 Niche Buyer Leads",
    category: "Tech & Gadgets",
    leadsCount: 500,
    method: "bKash",
    trxId: "BK99120485",
    amountBDT: 2490,
    status: "Payment Verified",
    date: "Today, 11:20 AM",
  },
  {
    id: "LD-802",
    buyerName: "Mahinur Begum (Modest Wear BD)",
    phone: "+880 1819-223344",
    packTitle: "1,500 VIP Buyer Leads",
    category: "Fashion & Clothing",
    leadsCount: 1500,
    method: "Nagad",
    trxId: "NG77812903",
    amountBDT: 5990,
    status: "Awaiting Payment",
    date: "Today, 09:45 AM",
  },
];

export class LeadsController {
  public static getOrders(req: Request, res: Response) {
    return res.json({ success: true, data: sampleLeadOrders });
  }

  public static verifyOrder(req: Request, res: Response) {
    const { id } = req.params;
    sampleLeadOrders = sampleLeadOrders.map((o) =>
      o.id === id ? { ...o, status: "Payment Verified" } : o
    );
    return res.json({ success: true, message: `Lead order ${id} verified!` });
  }

  public static dispatchOrder(req: Request, res: Response) {
    const { id } = req.params;
    sampleLeadOrders = sampleLeadOrders.map((o) =>
      o.id === id ? { ...o, status: "Dispatched" } : o
    );
    return res.json({ success: true, message: `Lead order ${id} dispatched via WhatsApp!` });
  }
}
