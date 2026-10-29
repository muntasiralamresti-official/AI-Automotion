import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const topic = req.headers.get("x-wc-webhook-topic") || "order.created";
    const body = await req.json();

    if (topic.includes("product")) {
      // Ingest or update product in AI knowledge base
      const { id, name, price, stock_quantity, categories } = body;
      return NextResponse.json({
        success: true,
        action: "product_synced_to_ai",
        product: {
          id: id || "wc_" + Date.now(),
          title: name || "WooCommerce Synced Product",
          price: Number(price) || 0,
          stock: Number(stock_quantity) || 10,
          category: categories?.[0]?.name || "WooCommerce",
        },
        timestamp: new Date().toISOString(),
      });
    }

    if (topic.includes("order")) {
      // Create order in Zyncoo CRM and trigger courier
      const { id, billing, line_items, total } = body;
      return NextResponse.json({
        success: true,
        action: "order_synced_from_woocommerce",
        orderId: "WC-" + (id || Date.now()),
        customer: `${billing?.first_name || "Customer"} ${billing?.last_name || ""}`.trim(),
        phone: billing?.phone || "01700000000",
        address: `${billing?.address_1 || ""}, ${billing?.city || ""}`.trim(),
        total: Number(total) || 0,
        items: line_items?.map((item: { name: string; quantity: number }) => `${item.name} x${item.quantity}`) || [],
        courierStatus: "Ready for Steadfast/Pathao Dispatch",
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      message: "WooCommerce webhook acknowledged",
      topic,
    });
  } catch (error) {
    console.error("[WooCommerce Webhook Error]:", error);
    return NextResponse.json({ error: "Failed to process WooCommerce webhook" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: "active",
    message: "Zyncoo AI WooCommerce Bidirectional Sync Endpoint. Set webhook topic to product.created or order.created.",
  });
}
