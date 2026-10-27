import { NextRequest, NextResponse } from "next/server";

interface MessageTurn {
  sender: "customer" | "bot" | "user" | "human_agent";
  text: string;
}

interface ChatRequestPayload {
  message: string;
  channel: "whatsapp" | "facebook" | "instagram";
  storeName?: string;
  conversationHistory?: MessageTurn[];
}

// Regex to detect and validate 11-digit Bangladeshi mobile numbers
const BD_PHONE_REGEX = /(?:\+?880|0)?1[3-9]\d{8}/;

// Prompt injection detection patterns
const PROMPT_INJECTION_PATTERNS = [
  /ignore (all )?previous instructions/i,
  /system override/i,
  /you are now in developer mode/i,
  /give (me )?(this )?for \d+ (taka|tk|taka only|poisa)/i,
  /jailbreak/i,
  /bypass security/i,
];

// Server-authoritative catalog (cannot be overwritten by user prompt manipulation)
const FIXED_CATALOG: Record<string, { title: string; price: number; codInsideDhaka: number; codOutsideDhaka: number; upsell: { title: string; price: number; regular: number } }> = {
  "ultra watch 9": {
    title: "Ultra Watch 9 (Matte Black)",
    price: 1490,
    codInsideDhaka: 60,
    codOutsideDhaka: 120,
    upsell: {
      title: "Stainless Steel Milanese Loop Strap",
      price: 200,
      regular: 500,
    },
  },
  "earbuds pro": {
    title: "Wireless ANC Earbuds Pro",
    price: 2190,
    codInsideDhaka: 60,
    codOutsideDhaka: 120,
    upsell: {
      title: "Shockproof Silicone Protective Case",
      price: 150,
      regular: 350,
    },
  },
  "powerbank": {
    title: "Magnetic MagSafe Powerbank 10,000mAh",
    price: 1850,
    codInsideDhaka: 60,
    codOutsideDhaka: 120,
    upsell: {
      title: "Braided 65W Fast Charging Type-C Cable",
      price: 190,
      regular: 490,
    },
  },
};

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequestPayload = await req.json();
    const { message, channel, storeName = "GadgetZone BD", conversationHistory = [] } = body;

    if (!message || !message.trim()) {
      return NextResponse.json({ error: "Message content is required" }, { status: 400 });
    }

    // 1. Anti-Prompt Injection Guardrail
    for (const pattern of PROMPT_INJECTION_PATTERNS) {
      if (pattern.test(message)) {
        console.warn("[Oddo Guardrail Alert] Prompt injection attempt blocked:", message);
        return NextResponse.json({
          success: true,
          channel,
          intent: "blocked_manipulation",
          replyText: "আমি শুধুমাত্র আমাদের স্টোরের অফিসিয়াল প্রোডাক্ট, ওয়ারেন্টি ও অর্ডার প্রসেসিং সংক্রান্ত তথ্য দিয়ে সহযোগিতা করতে পারি। ক্যাটালগ দেখতে বা অর্ডার করতে আমাকে জানান!",
          timestamp: new Date().toISOString(),
        });
      }
    }

    // Truncate conversation history to last 8 turns
    const truncatedHistory = conversationHistory.slice(-8);
    const lower = message.toLowerCase();

    // 2. Phone number extraction & validation
    const phoneMatch = message.match(BD_PHONE_REGEX);
    let extractedPhone: string | null = null;
    let rtoRiskLevel: "LOW" | "MEDIUM" | "HIGH" = "LOW";

    if (phoneMatch) {
      extractedPhone = phoneMatch[0].replace(/^\+?880/, "0");
      if (!extractedPhone.startsWith("0")) extractedPhone = "0" + extractedPhone;

      // Simulated courier RTO return history check
      const lastDigits = parseInt(extractedPhone.slice(-2), 10);
      if (lastDigits > 85) {
        rtoRiskLevel = "HIGH";
      } else if (lastDigits > 65) {
        rtoRiskLevel = "MEDIUM";
      }
    }

    // 3. Customer Sentiment / Frustration Detection
    const isAngry =
      lower.includes("baje") ||
      lower.includes("খারাপ") ||
      lower.includes("scam") ||
      lower.includes("fraud") ||
      lower.includes("ফালতু") ||
      lower.includes("পেলেন না") ||
      lower.includes("ekhono painai") ||
      lower.includes("delivery hoyni");

    // 4. Bargaining / Negotiation Intent Detection
    const isBargaining =
      lower.includes("discount") ||
      lower.includes("ডিসকাউন্ট") ||
      lower.includes("kom") ||
      lower.includes("কম") ||
      lower.includes("komano") ||
      lower.includes("kisu kom") ||
      lower.includes("kisu taka kom") ||
      lower.includes("free delivery") ||
      lower.includes("delivery charge free") ||
      lower.includes("offer");

    // 5. Human escalation detection
    const isEscalation =
      lower.includes("manager") ||
      lower.includes("ম্যানেজার") ||
      lower.includes("মালিক") ||
      lower.includes("মানুষ") ||
      lower.includes("human") ||
      lower.includes("agent") ||
      lower.includes("কথা বলতে চাই") ||
      lower.includes("call me") ||
      isAngry;

    // 6. Order Intent Detection
    const isOrderIntent =
      lower.includes("order") ||
      lower.includes("অর্ডার") ||
      lower.includes("নিতে চাই") ||
      lower.includes("পাঠিয়ে দিন") ||
      lower.includes("বুক") ||
      lower.includes("confirm") ||
      Boolean(extractedPhone);

    // 7. Payment Inquiry Detection
    const isPaymentInquiry =
      lower.includes("bkash") ||
      lower.includes("বিকাশ") ||
      lower.includes("nagad") ||
      lower.includes("নগদ") ||
      lower.includes("advance") ||
      lower.includes("অগ্রিম") ||
      lower.includes("cod");

    let replyText = "";
    let orderData = null;
    let intent: "order_confirmation" | "product_inquiry" | "negotiation" | "human_escalation" | "payment_inquiry" = "product_inquiry";
    let upsellOffer = null;
    let appliedCoupon = null;

    if (isEscalation) {
      intent = "human_escalation";
      if (isAngry) {
        replyText = "আপনার সাময়িক অসুবিধার জন্য আমরা আন্তরিকভাবে দুঃখিত ভাইয়া। আপনার অভিযোগটি সর্বোচ্চ গুরুত্ব দিয়ে আমাদের সিনিয়র সাপোর্ট ম্যানেজারের কাছে ফরওয়ার্ড করা হয়েছে। ১-২ মিনিটের মধ্যে লাইভ এজেন্ট আপনার সাথে সরাসরি যুক্ত হচ্ছেন।";
      } else {
        replyText = "অবশ্যই ভাইয়া! আমাদের একজন সিনিয়র সাপোর্ট প্রতিনিধিকে আপনার চ্যাট নোটিফাই করা হয়েছে। কিছুক্ষণের মধ্যেই প্রতিনিধি সরাসরি আপনার সাথে যুক্ত হয়ে কথা বলবেন।";
      }
    } else if (isOrderIntent && extractedPhone) {
      intent = "order_confirmation";
      const orderId = "ORD-" + Math.floor(1000 + Math.random() * 9000);

      // Extract address heuristics
      let estimatedAddress = "Customer Address on File";
      if (lower.includes("dhanmondi") || lower.includes("ধানমন্ডি")) {
        estimatedAddress = "Dhanmondi, Dhaka";
      } else if (lower.includes("chittagong") || lower.includes("চট্টগ্রাম") || lower.includes("ctg")) {
        estimatedAddress = "Chittagong";
      } else if (lower.includes("mirpur") || lower.includes("মিরপুর")) {
        estimatedAddress = "Mirpur, Dhaka";
      } else if (lower.includes("uttara") || lower.includes("উত্তরা")) {
        estimatedAddress = "Uttara, Dhaka";
      } else if (lower.includes("sylhet") || lower.includes("সিলেট")) {
        estimatedAddress = "Sylhet";
      }

      const catalogItem = FIXED_CATALOG["ultra watch 9"];
      const totalAmount = catalogItem.price + catalogItem.codInsideDhaka;

      // RTO Fraud Alert Handling
      if (rtoRiskLevel === "HIGH") {
        replyText = `তানভীর ভাই, আপনার অর্ডারটি সিস্টেমে গ্রহণ করা হয়েছে (#${orderId})। তবে কুরিয়ার ফ্রড প্রিভেনশন সিকিউরিটি পলিসি অনুযায়ী ডেলিভারি চার্জ বাবদ ১০০ টাকা আমাদের মার্চেন্ট বিকাশ (01700-000000)-এ অগ্রিম পে করে TrxID টি দিন। বাকি ৳১,৪৫০ পণ্য হাতে পেয়ে রাইডারকে দেবেন!`;
      } else {
        replyText = `অসংখ্য ধন্যবাদ তানভীর ভাই! আপনার অর্ডারটি সফলভাবে কনফার্ম হয়েছে (#${orderId})। Steadfast কুরিয়ারের মাধ্যমে ১-২ দিনে মিরপুর ঠিকানায় ডেলিভারি পেয়ে যাবেন।\n\n💡 স্পেশাল অফার: এই ওয়াচের সাথে প্রিমিয়াম মিলানিজ মেটাল স্ট্র্যাপ নিলে মাত্র ২০০ টাকায় পাচ্ছেন (রেগুলার ৫০০ টাকা)। সাথে ১টি যুক্ত করে দেব কি ভাইয়া?`;
      }

      orderData = {
        orderId,
        customerName: "Valued Customer",
        phone: extractedPhone,
        address: estimatedAddress,
        item: catalogItem.title,
        totalAmount,
        rtoRiskLevel,
        courierFulfillmentStatus: rtoRiskLevel === "HIGH" ? "Awaiting ৳100 Advance Fee" : "Dispatched to Steadfast Courier",
      };

      upsellOffer = catalogItem.upsell;
    } else if (isBargaining) {
      intent = "negotiation";
      appliedCoupon = { code: "ODDO100", discountBDT: 100 };
      replyText = `ভাইয়া আমাদের প্রতিটি প্রোডাক্ট ১০০% অরিজিনাল এবং সাথে ১ বছর অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি পাচ্ছেন। তবে আপনার জন্য স্পেশাল অনার হিসেবে ৳১০০ ডিসকাউন্ট কুপন 'ODDO100' অ্যাড করে দিচ্ছি (মাত্র ৳১,৩৯০ টাকা)। ঢাকার ভেতরে ১-২ দিনে ক্যাশ অন ডেলিভারিতে পাবেন। এখনই কি পার্সেলটি বুক করে দেব?`;
    } else if (isPaymentInquiry) {
      intent = "payment_inquiry";
      replyText = `আমরা সম্পূর্ণ ক্যাশ অন ডেলিভারি (COD) সাপোর্ট করি—পণ্য হাতে পেয়ে টাকা দেবেন। তবে আপনি চাইলে বিকাশ মার্চেন্ট (01700-000000) বা কার্ডেও অগ্রিম পে করতে পারেন। অগ্রিম পেমেন্টে ডেলিভারি চার্জ সম্পূর্ণ ফ্রি!`;
    } else if (lower.includes("price") || lower.includes("দাম") || lower.includes("koto")) {
      replyText = "Ultra Watch 9 এর অফার প্রাইস মাত্র ১,৪৯০ টাকা (রেগুলার ২,২০০ টাকা)। সাথে পাচ্ছেন ১ বছরের অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি এবং সম্পূর্ণ ক্যাশ অন ডেলিভারি সুবিধা! আপনি কি অর্ডার কনফার্ম করতে চান?";
    } else if (lower.includes("delivery") || lower.includes("ডেলিভারি") || lower.includes("charge")) {
      replyText = "ঢাকার ভিতরে ডেলিভারি চার্জ ৬০ টাকা (১-২ দিন) এবং ঢাকার বাইরে ১২০ টাকা (২-৩ দিন)। শতভাগ ক্যাশ অন ডেলিভারি—পণ্য দেখে রাইডারকে মূল্য পরিশোধ করবেন!";
    } else {
      replyText = `আসসালামু আলাইকুম! আমি ${storeName}-এর সার্বক্ষণিক এআই অ্যাসিস্ট্যান্ট। পণ্যের মূল্য, অফার বা সরাসরি ক্যাশ অন ডেলিভারিতে অর্ডার করতে আমাকে জানাতে পারেন।`;
    }

    return NextResponse.json({
      success: true,
      channel,
      intent,
      replyText,
      extractedPhone,
      rtoRiskLevel,
      orderData,
      upsellOffer,
      appliedCoupon,
      historyLength: truncatedHistory.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[AI Chat Route Error]:", error);
    return NextResponse.json({ error: "Failed to process AI inference" }, { status: 500 });
  }
}
