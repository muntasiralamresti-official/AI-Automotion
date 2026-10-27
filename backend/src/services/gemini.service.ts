import { CONFIG } from "../config/constants.js";
import { MessageTurn } from "../types/index.js";

const BD_PHONE_REGEX = /(?:\+?880|0)?1[3-9]\d{8}/;

const PROMPT_INJECTION_PATTERNS = [
  /ignore (all )?previous instructions/i,
  /system override/i,
  /you are now in developer mode/i,
  /give (me )?(this )?for \d+ (taka|tk|taka only|poisa)/i,
  /jailbreak/i,
  /bypass security/i,
];

export class GeminiService {
  public static processChat(
    message: string,
    channel: "whatsapp" | "facebook" | "instagram",
    storeName: string = "GadgetZone BD",
    conversationHistory: MessageTurn[] = []
  ) {
    // 1. Anti-Prompt Injection Guardrail
    for (const pattern of PROMPT_INJECTION_PATTERNS) {
      if (pattern.test(message)) {
        return {
          success: true,
          channel,
          intent: "blocked_manipulation",
          replyText:
            "আমি শুধুমাত্র আমাদের স্টোরের অফিসিয়াল প্রোডাক্ট, ওয়ারেন্টি ও অর্ডার প্রসেসিং সংক্রান্ত তথ্য দিয়ে সহযোগিতা করতে পারি। ক্যাটালগ দেখতে বা অর্ডার করতে আমাকে জানান!",
          timestamp: new Date().toISOString(),
        };
      }
    }

    const lower = message.toLowerCase();

    // 2. Phone Extraction
    const phoneMatch = message.match(BD_PHONE_REGEX);
    let extractedPhone: string | null = null;
    let rtoRiskLevel: "LOW" | "MEDIUM" | "HIGH" = "LOW";

    if (phoneMatch) {
      extractedPhone = phoneMatch[0].replace(/^\+?880/, "0");
      if (!extractedPhone.startsWith("0")) extractedPhone = "0" + extractedPhone;

      const lastDigits = parseInt(extractedPhone.slice(-2), 10);
      if (lastDigits > 85) {
        rtoRiskLevel = "HIGH";
      } else if (lastDigits > 65) {
        rtoRiskLevel = "MEDIUM";
      }
    }

    // 3. Customer Sentiment
    const isAngry =
      lower.includes("baje") ||
      lower.includes("খারাপ") ||
      lower.includes("scam") ||
      lower.includes("fraud") ||
      lower.includes("ফালতু") ||
      lower.includes("পেলেন না") ||
      lower.includes("ekhono painai") ||
      lower.includes("delivery hoyni");

    // 4. Bargaining Intent
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

    // 5. Human Escalation
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

    // 6. Order Intent
    const isOrderIntent =
      lower.includes("order") ||
      lower.includes("অর্ডার") ||
      lower.includes("নিতে চাই") ||
      lower.includes("পাঠিয়ে দিন") ||
      lower.includes("বুক") ||
      lower.includes("confirm") ||
      Boolean(extractedPhone);

    let replyText = "";
    let orderData = null;
    let intent:
      | "order_confirmation"
      | "product_inquiry"
      | "negotiation"
      | "human_escalation"
      | "payment_inquiry" = "product_inquiry";
    let upsellOffer = null;
    let appliedCoupon = null;

    if (isEscalation) {
      intent = "human_escalation";
      replyText = isAngry
        ? "আপনার সাময়িক অসুবিধার জন্য আমরা আন্তরিকভাবে দুঃখিত ভাইয়া। আপনার অভিযোগটি সর্বোচ্চ গুরুত্ব দিয়ে আমাদের সিনিয়র সাপোর্ট ম্যানেজারের কাছে ফরওয়ার্ড করা হয়েছে। ১-২ মিনিটের মধ্যে লাইভ এজেন্ট আপনার সাথে সরাসরি যুক্ত হচ্ছেন।"
        : "অবশ্যই ভাইয়া! আমাদের একজন সিনিয়র সাপোর্ট প্রতিনিধিকে আপনার চ্যাট নোটিফাই করা হয়েছে। কিছুক্ষণের মধ্যেই প্রতিনিধি সরাসরি আপনার সাথে যুক্ত হয়ে কথা বলবেন।";
    } else if (isOrderIntent && extractedPhone) {
      intent = "order_confirmation";
      const orderId = "ORD-" + Math.floor(1000 + Math.random() * 9000);

      let estimatedAddress = "Customer Address on File";
      if (lower.includes("dhanmondi") || lower.includes("ধানমন্ডি")) estimatedAddress = "Dhanmondi, Dhaka";
      else if (lower.includes("chittagong") || lower.includes("চট্টগ্রাম") || lower.includes("ctg")) estimatedAddress = "Chittagong";
      else if (lower.includes("mirpur") || lower.includes("মিরপুর")) estimatedAddress = "Mirpur, Dhaka";
      else if (lower.includes("uttara") || lower.includes("উত্তরা")) estimatedAddress = "Uttara, Dhaka";
      else if (lower.includes("sylhet") || lower.includes("সিলেট")) estimatedAddress = "Sylhet";

      const catalogItem = CONFIG.CATALOG["ultra watch 9"];
      const totalAmount = catalogItem.price + catalogItem.codInsideDhaka;

      if (rtoRiskLevel === "HIGH") {
        replyText = `ধন্যবাদ ভাইয়া! আপনার Ultra Watch 9 অর্ডারটি প্রসেস করতে কুরিয়ারের জন্য মাত্র ৳১০০ টাকা ডেলিভারি চার্জ অগ্রিম প্রযোজ্য। বিকাশ মারচেন্ট একাউন্টে পে করার লিংক: https://pay.bka.sh/oddo-shield?amt=100&ord=${orderId}`;
      } else {
        replyText = `আলহামদুলিল্লাহ! আপনার অর্ডারটি গ্রহণ করা হয়েছে। 
📦 অর্ডার আইডি: #${orderId}
⌚ পণ্য: ${catalogItem.title}
💰 মোট প্রদেয়: ৳${totalAmount} (ক্যাশ অন ডেলিভারি)
📍 ঠিকানা: ${estimatedAddress}
📞 ফোন: ${extractedPhone}
২-৩ কার্যদিবসের মধ্যে কুরিয়ার মারফত আপনার ঠিকানায় ডেলিভারি পৌঁছাবে।`;
      }

      orderData = {
        orderId,
        product: catalogItem.title,
        amount: totalAmount,
        phone: extractedPhone,
        address: estimatedAddress,
        rtoRisk: rtoRiskLevel,
      };

      upsellOffer = {
        title: catalogItem.upsell.title,
        discountedPrice: catalogItem.upsell.price,
        regularPrice: catalogItem.upsell.regular,
      };
    } else if (isBargaining) {
      intent = "negotiation";
      appliedCoupon = { code: "ODDO100", discountBDT: 100 };
      replyText = `ভাইয়া, আমাদের প্রোডাক্ট কোয়ালিটি ১০০% জেনুইন এবং প্রাইস একদম ফিক্সড। তবে আপনি যেহেতু আজকেই নিতে চাচ্ছেন, আপনার জন্য স্পেশাল ৳১০০ টাকা ক্যাশব্যাক ডিসকাউন্ট কুপন [ODDO100] অ্যাপ্লাই করে দিচ্ছি! 🎉
এখন অর্ডার কনফার্ম করতে শুধু আপনার নাম, সম্পূর্ণ ঠিকানা ও মোবাইল নম্বরটি পাঠিয়ে দিন।`;
    } else {
      replyText = `আসসালামু আলাইকুম ভাইয়া! ${storeName}-এ স্বাগতম। 
আমাদের জনপ্রিয় প্রোডাক্টগুলো:
১. Ultra Watch 9 (Matte Black) - ৳১,৪৯০
২. Wireless ANC Earbuds Pro - ৳২,১৯০
৩. MagSafe Powerbank 10,000mAh - ৳১,৮৫০

ক্যাশ অন ডেলিভারিতে নিতে চাইলে আপনার কাঙ্ক্ষিত পণ্যটির নাম এবং ডেলিভারির ঠিকানা লিখে পাঠান।`;
    }

    return {
      success: true,
      channel,
      intent,
      replyText,
      extractedPhone,
      rtoRiskLevel,
      orderData,
      upsellOffer,
      appliedCoupon,
      timestamp: new Date().toISOString(),
    };
  }
}
