import { NextResponse } from "next/server";

export interface ParsedSms {
  gateway: "bKash" | "Nagad" | "Rocket" | "Unknown";
  trxId: string;
  amount: number;
  senderPhone?: string;
  rawSms: string;
  receivedAt: string;
}

// In-memory ledger of received SMS transactions (persisted across runtime requests)
export const globalSmsLedger: ParsedSms[] = [
  {
    gateway: "bKash",
    trxId: "BK99120485",
    amount: 4490,
    senderPhone: "01711223344",
    rawSms: "You have received Tk 4,490.00 from 01711223344. Ref: ZYNCOO. Fee Tk 0.00. Balance Tk 58,210.35. TrxID BK99120485 at 30/10/2026 01:15",
    receivedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    gateway: "Nagad",
    trxId: "NG88391201",
    amount: 12990,
    senderPhone: "01819331122",
    rawSms: "You have received Tk 12,990.00 from 01819331122. TxnID: NG88391201. Balance: Tk 94,150.00.",
    receivedAt: new Date(Date.now() - 7200000).toISOString(),
  },
];

export function parseTransactionSms(smsText: string): ParsedSms {
  const clean = smsText.trim();
  let gateway: "bKash" | "Nagad" | "Rocket" | "Unknown" = "Unknown";
  let trxId = "";
  let amount = 0;
  let senderPhone = "";

  // 1. Detect Gateway
  if (/bkash|16247/i.test(clean) || /TrxID\s+([A-Za-z0-9]+)/i.test(clean)) {
    gateway = "bKash";
  } else if (/nagad|16167/i.test(clean) || /TxnID\s*:?\s*([A-Za-z0-9]+)/i.test(clean)) {
    gateway = "Nagad";
  } else if (/rocket|16216/i.test(clean)) {
    gateway = "Rocket";
  }

  // 2. Extract Amount: "Tk 1,500.00", "Tk 4490", "Amount: Tk 3,990"
  const amountMatch = clean.match(/(?:Tk|amount:?\s*Tk)\s*([0-9,]+(?:\.[0-9]{1,2})?)/i);
  if (amountMatch) {
    amount = parseFloat(amountMatch[1].replace(/,/g, ""));
  }

  // 3. Extract TrxID / TxnID
  const trxMatch = clean.match(/(?:TrxID|TxnID|TxId|TRX ID|Trx id)\s*:?\s*([A-Za-z0-9]+)/i);
  if (trxMatch) {
    trxId = trxMatch[1].trim().toUpperCase();
  }

  // 4. Extract Sender Phone: "from 017xxxxxxxx" or "from +88017xxxxxxxx"
  const phoneMatch = clean.match(/from\s*(\+?880?1[3-9][0-9]{8})/i);
  if (phoneMatch) {
    senderPhone = phoneMatch[1].trim();
  }

  return {
    gateway,
    trxId,
    amount,
    senderPhone,
    rawSms: clean,
    receivedAt: new Date().toISOString(),
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Support either direct { sms: "..." } or Android SMS Forwarder payloads { sender, message, text }
    const rawSms = body.sms || body.message || body.text || body.content || "";
    
    if (!rawSms) {
      return NextResponse.json(
        { error: "SMS text payload is required." },
        { status: 400 }
      );
    }

    const parsed = parseTransactionSms(rawSms);

    if (!parsed.trxId) {
      return NextResponse.json({
        success: false,
        message: "Could not extract valid bKash/Nagad TrxID from SMS text.",
        parsed,
      }, { status: 422 });
    }

    // Add to global ledger
    globalSmsLedger.unshift(parsed);
    if (globalSmsLedger.length > 50) globalSmsLedger.pop();

    return NextResponse.json({
      success: true,
      message: `Successfully detected ${parsed.gateway} payment of ৳${parsed.amount} with TrxID: ${parsed.trxId}`,
      parsed,
      autoVerified: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to parse webhook SMS", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    totalLogged: globalSmsLedger.length,
    ledger: globalSmsLedger,
  });
}
