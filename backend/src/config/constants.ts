export const CONFIG = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
  META: {
    VERIFY_TOKEN: process.env.META_VERIFY_TOKEN || "zyncoo_ai_meta_verify_token_2026",
    APP_SECRET: process.env.META_APP_SECRET || "zyncoo_meta_app_secret_production_2026",
  },
  STEADFAST: {
    API_URL: "https://portal.steadfast.com.bd/api/v1",
    API_KEY: process.env.STEADFAST_API_KEY || "mock_steadfast_key",
    SECRET_KEY: process.env.STEADFAST_SECRET_KEY || "mock_steadfast_secret",
  },
  PATHAO: {
    API_URL: "https://api-hermes.pathao.com/aladdin/api/v1",
    CLIENT_ID: process.env.PATHAO_CLIENT_ID || "mock_pathao_id",
  },
  BKASH: {
    CHECKOUT_BASE: "https://checkout.pay.bka.sh/v1.2.0-beta/tokenized/checkout",
  },
  CATALOG: {
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
  },
};
